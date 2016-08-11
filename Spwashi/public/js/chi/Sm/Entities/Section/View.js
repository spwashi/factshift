/**
 * Created by Sam Washington on 12/19/15.
 */
require(['require'], function (require) {
	Sm.loaded.when_loaded('Core_SmView', function () {
		/**
		 * @augments Sm.Core.SmView
		 * @class
		 * @alias Sm.Entities.Section.View
		 */
		Sm.Entities.Section.View = Sm.Core.SmView.extend(
		{
			relationship_index_obj: {
				collections: false,
				children:    'child_holder',
				composition: 'composition',
				micros:      false,
				pivots:      'pivot_holder'
			},
			type:                   'Section',
			identifier:             '.spwashi-section',
			setElement:             function (elem) {
				if (elem) elem = elem[0] || elem;
				if (!elem || !elem.addEventListener) {return false;}
				return Sm.Core.SmView.prototype.setElement.apply(this, arguments);
			},
			_rendering_callbacks:   {
				button_control:           function () {
					if (!!this.elements.button_control) return this.elements.button_control;
					var matching = this.get_rendered('$Element').children('.button-control');
					return this.elements.button_control = (matching[0] ? matching[0] : false);
				},
				title_element:            function () {
					if (!!this.elements.title) return this.elements.title;
					var matching = this.get_rendered('$Element').children('.title');
					return this.elements.title = (matching[0] ? matching[0] : false);
				},
				subtitle_element:         function () {
					if (!!this.elements.subtitle) return this.elements.subtitle;
					var matching = this.get_rendered('$Element').children('.subtitle');
					return this.elements.subtitle = (matching[0] ? matching[0] : false);
				},
				content_element:          function () {
					if (!!this.elements.content) return this.elements.content;
					var matching = this.get_rendered('$Element').children('.content');
					return this.elements.content = (matching[0] ? matching[0] : false);
				},
				description_element:      function () {
					if (!!this.elements.description) return this.elements.description;
					var matching = this.get_rendered('$Element').children('.description');
					return this.elements.description = (matching[0] ? matching[0] : false);
				},
				content_location_element: function () {
					if (!!this.elements.content_location) return this.elements.content_location;
					var matching = this.get_rendered('$Element').children('.content_location');
					return this.elements.content_location = (matching[0] ? matching[0] : false);
				},
				child_holder_element:     function () {
					if (!!this.elements.child_holder) return this.elements.child_holder;
					var matching = this.get_rendered('$Element').children('.children-container');
					var content_element;
					if (matching[0]) return this.elements.child_holder = matching[0];
					else if (content_element = this.get_rendered('content_element')) {
						var child_holder       = document.createElement('div');
						child_holder.className = 'children-container';
						Sm.Core.util.insertAfter(child_holder, content_element);
						this.elements.child_holder = child_holder;
						return this.elements.child_holder;
					}
					return false;
				},
				pivot_holder_element:     function () {
					if (!!this.elements.pivot_holder) return this.elements.pivot_holder;

					var Relationship_Obj = this.find_closest_relationship();
					var Relationship_    = Relationship_Obj.Relationship;
					var relElem          = Relationship_Obj.el;
					var $relElem         = $(relElem);

					var matching = false;
					if ($relElem.hasClass('definition-relationship')) {
						$relElem.addClass('pivot-container');
						matching = relElem;
					}
					this.elements.pivot_holder = matching;
					return this.elements.pivot_holder;
				},
				composition_element:      function () {
					if (!!this.elements.composition_holder) return this.elements.composition_holder;
					var matching = this.get_rendered('$Element').children('.composition-container');
					var content_element;
					if (matching[0]) return this.elements.composition_holder = matching[0];
					else if (content_element = this.get_rendered('content_element')) {
						var composition_holder       = document.createElement('div');
						composition_holder.className = 'composition-container';
						Sm.Core.util.insertAfter(composition_holder, content_element);
						this.elements.composition_holder = composition_holder;
						return this.elements.composition_holder;
					}
					return false;
				},
				focus_element:            function () {
					if (!!this.elements.focus) return this.elements.focus;
					var matching = this.$el.children('.focus');
					if (!matching.length) {
						var focus       = document.createElement('div');
						focus.className = 'focus upper';
						var parent      = this.el;
						if (!parent) return false;
						var reference = parent.childNodes[0];
						if (!reference) return false;
						parent.insertBefore(focus, reference);
						return this.elements.focus = focus;
					}
					return this.elements.focus = matching[0];
				}
			},
			initialize:             function (settings) {
				this._touch_data = {
					start:        {
						x:    0,
						y:    0,
						time: 0
					},
					threshold:    150, //required min distance traveled to be considered swipe
					allowed_time: 200 // maximum time allowed to travel that distance
				};
				this.what_we_on  = 'home';
				Sm.Core.SmView.prototype.initialize.apply(this, arguments);
			},

			update:                     function (changed_attributes) {
				if (this.display_type.indexOf('modal') > -1) return this;
				var triggers = ["section_type", "content_location"];
				for (var i = 0; i < triggers.length; i++) {
					var t = triggers[i];
					if (changed_attributes.indexOf(t) > -1) {
						this.mark_unrendered();
						this.replaceOldElement();
						return this;
					}
				}
				return Sm.Core.SmView.prototype.update.apply(this, arguments);
			},
			handle:                     true,
			/**
			 * This is a basic click handler that operates based only on the target of the click.
			 * This one in particular handles
			 *  * scaling
			 *  * debugging
			 *  * deleting
			 *  * adding relationships
			 * @param target The target of the click
			 * @return {boolean}
			 * @param e
			 */
			handle_click:               function (target, e) {
				var $target = $(target);
				if (!this.MvCombo) return false;
				var self             = this;
				var Relationship_Obj = this.find_closest_relationship();
				var Relationship_    = Relationship_Obj.Relationship;
				var relElem          = Relationship_Obj.el;
				var other_MV_type    = Relationship_Obj.other_MV_type;
				Relationship_        =
				!Relationship_ || Relationship_ === null || Relationship_ === undefined
				? false
				: Relationship_;


				if (this.queryStatus('modal')) return true;
				if ($target.closest('.pan')[0]) {
					//CONTROL - SCALE, SCALING
					var direction = $target.hasClass('left') ? true : ($target.hasClass('right') ? false : null);
					if (typeof direction === "boolean") this.scale(direction);
				} else if (e.ctrlKey) {
					//CONTROL - SELECT, SELECTING
					!this.MvCombo.queryStatus('selected') ? this.MvCombo.select(this) : this.MvCombo.deselect(this);
				} else {
					//CONTROL - FOCUS, FOCUSING, DEFINITION, NAVIGATING
					if (Relationship_ !== null && Relationship_ && other_MV_type == "Dictionary") {
						var content_location = this.MvCombo.Model.get('content_location');
						if (content_location && content_location.length) {
							Sm.Core.util.follow_link(content_location, false);
						}
					}
					this.MvCombo.focus(this);
				}
			},
			/**
			 * Initialize the standard procedure for dealing with the button controls on the side of the Entities
			 */
			init_button_control_events: function () {
				var Element  = this.el;
				var type     = this.type;
				var selfSm   = Sm.Entities[type];
				var $Element = $(Element);
				if (!$Element[0]) return false;
				/** @type {jQuery} The $ that represents the button control element */
				var $buttonControl = $(this.get_rendered('button_control', true));
				/** @type {Sm.Extras.ViewAid} A ViewAid that helps us pivot Sections */
				this.PivotViewAid = null;
				var pivot_object = {
					$pivot_display: false,
					on:             false,
					original:       {},
					what_we_on:     'home'
				};
				var self         = this;
				$buttonControl.on({
					                  mouseenter: self._get_pd_creation_fn(pivot_object, $buttonControl, "0"),
					                  mouseleave: self._get_pd_close_fn(pivot_object)
				                  });
				return Sm.Core.SmView.prototype.init_button_control_events.apply(this, arguments);
			},
			_get_pd_creation_fn:        function (pivot_object, $button_control, context_id) {
				var self        = this;
				var selfSm      = Sm.Entities.Section;
				pivot_object.on = false;
				var what_we_on  = this.what_we_on || "home";
				context_id      = context_id || 0;

				return function (event) {
					event.stopPropagation();
					if (self.PivotViewAid && self.PivotViewAid.status.is_open) {
						pivot_object.on = true;
					}
					if (pivot_object.on) return true;
					var referenced_mv_obj = Sm.Core.MvWrapper.get_effective_MV(self.MvCombo.r_id, true, true) || {};
					var ReferencedMvCombo = referenced_mv_obj.MVs || false;

					//If what we're dealing with is not a pivot, we aren't going to need to have a reference MvCombo
					if (typeof referenced_mv_obj.replacement_indices === "string" && referenced_mv_obj.replacement_indices != 'pivots') ReferencedMvCombo = false;

					var reference_used = false;
					what_we_on         = self.what_we_on;

					if (!ReferencedMvCombo) {
						what_we_on        = 'home';
						ReferencedMvCombo = self.MvCombo;
					} else {
						//Else we just use the first MvCombo as the relative for the pivots
						ReferencedMvCombo = Sm.Core.MvWrapper.convert_to_MvCombo(ReferencedMvCombo)[0];
						reference_used    = true;
					}
					//If the Vew aid is already made and open, we don't need to instantiate a new one
					pivot_object.on = true;
					/** @type {jQuery} The button control jquery object */
					var $this       = $(this);

					var is_different                     = false;
					var self_relationship_subtype_object = ReferencedMvCombo.get_relationship_subtypes(what_we_on, context_id) || {};
					for (var subtype_category in self_relationship_subtype_object) {
						if (!self_relationship_subtype_object.hasOwnProperty(subtype_category)) continue;
						var count = self_relationship_subtype_object[subtype_category].length;
						if (pivot_object.original[subtype_category] != count) {
							is_different                            = true;
							pivot_object.original[subtype_category] = count;
						}
					}

					//If the View_Aid doesn't already exist, create one. If it does, just use that.
					//todo Cache the View aid and have it updatable
					//Sm.CONFIG.DEBUG && console.log("diff = ", is_different);
					if (self.PivotViewAid && is_different) {
						delete self.PivotViewAid;
					}
					if (!self.PivotViewAid) {
						/** @type {string} This is the template that will be used to create the View aid */
						var generated_view_aid_template = selfSm.Garage.generate({
							                                                         type:        'pivot_display.',
							                                                         synchronous: true,
							                                                         data:        self_relationship_subtype_object
						                                                         });
						//Create an actual element for the pivot display
						/** @type {jQuery} An element for the pivot display */
						pivot_object.$pivot_display = !pivot_object.$pivot_display ? $($(generated_view_aid_template)[0]) : pivot_object.$pivot_display;
						/** @type {int} The number of elements across to display the View Aid. This is not perfect, but hey */
						var number   = self_relationship_subtype_object.max || 1;
						/** @type {Array<HTMLElement>} An array of relationship_subtype elements that we've found */
						var rel_sub  = pivot_object.$pivot_display.find('.relationship-subtype');
						var $rel_sub = $(rel_sub[0]);
						//If the first relationship subtype element exists, multiply its width with the number of elements across that there'll be
						//Fixes an issue with improper width being shown
						if ($rel_sub[0]) {
							var one_width   = 75;
							var rel_sub_cat = pivot_object.$pivot_display.find('.relationship-subtype-category');
							//Using the relationship-subtype-category, make the width of the first one n times the width of one of its n children
							if (rel_sub_cat[0]) {
								var $rel_sub_cat = $(rel_sub_cat[0]);
								var width        = one_width * number;
								$rel_sub_cat.width(width);
							}
						}
						self.PivotViewAid = new Sm.Extras.ViewAid({
							element: pivot_object.$pivot_display[0],
							events:  {
								pivot: function (data, dataset) {
									var View = self;
									if (reference_used && data !== 'home') {
										View = ReferencedMvCombo.getView({
											                                 reference_element: self.referenceElement,
											                                 strict:            true
										                                 });
										Sm.CONFIG.DEBUG && console.log('-------------------');
										if (View) View.pivot(data, false, context_id);
										else Sm.CONFIG.DEBUG && console.log(ReferencedMvCombo);
									} else {
										if (data == 'home') data = ['home', what_we_on];
										self.pivot(data, false, context_id);
									}
								},
								open:  function () {
									if (!self_relationship_subtype_object.max) {
										return;
									}
									//Depending on how close we are to the window, add the "left" class to the view aid.
									//This controls if we put it on the left or the right of the screen
									var offset = $(window).width() - ($this.offset().left + $this.outerWidth());
									if (offset < 200) pivot_object.$pivot_display.addClass('left');
									//Append the button control to the screen
									$button_control.append(pivot_object.$pivot_display);
								}
							}
						});
					}
					//Open the View aid
					self.PivotViewAid.open();
				};
			},
			_get_pd_close_fn:           function (pivot_object) {
				var self = this;
				//If we have a pivot display existent and open, close it
				return function () {
					pivot_object.on = false;
					if (pivot_object.$pivot_display) {
						//We wait a little bit in case the mouse has accidentally left
						setTimeout(function () {
							if (!pivot_object.on && self.PivotViewAid.status.is_open) {
								self.PivotViewAid.close();
							}
						}, 250);
					}
				};
			},


			remove: function () {
				this.PivotViewAid && this.PivotViewAid.status.is_open && this.PivotViewAid.close();
				return Sm.Core.SmView.prototype.remove.apply(this, arguments);
			},
			/**
			 * Scale the complexity/summary of a section
			 * @param {boolean} scale_towards_micros      This is meant to be less concise, more detailed
			 * @param context_id
			 */
			scale:  function (scale_towards_micros, context_id) {
				if (this.queryStatus('modal')) return Promise.reject("Cannot scale Modal Dialogs");
				var self    = this;
				/** @type {Sm.Entities.Section.MvCombo|*} The MvCombo that we are going to be dealing with */
				var MvCombo = this.MvCombo;
				return MvCombo.scale(scale_towards_micros, context_id || 0).then(function (result) {
					Sm.Core.SmView.replace_with_elements({
						                                     items:            result.items || [],
						                                     referenceElement: self.referenceElement,
						                                     replacement_MVs:  result.replacement_MVs || [],
						                                     replaced_MVs:     result.replaced_MVs || []
					                                     }).catch(function (res) {
						Sm.CONFIG.DEBUG && console.log(res);
						//If we tried to scale one way, remove the direction as a possibility for scaling
						var className = scale_towards_micros ? 'can-pan-left' : 'can-pan-right';
						self.get_rendered('focus_element') && $(self.get_rendered('focus_element'))
						.removeClass(className)
						.removeClass('maybe-' + className);
					});
				});
			},
			/**
			 * Replace this View with a pivot of this section or the pivot of another section
			 * @param {string}                  where           The pivot subtype that we are looking for
			 * @param {string|boolean}          is_reciprocal
			 * @param context_id
			 * @return {*}
			 */
			pivot:  function (where, is_reciprocal, context_id) {
				if (this.queryStatus('modal')) return Promise.reject("Cannot scale Modal Dialogs");
				context_id = context_id || 0;
				var self   = this;
				return this.MvCombo.pivot(where, context_id || 0).then(function (result) {
					Sm.Core.SmView.replace_with_elements({
						                                     referenceElement:          self.referenceElement,
						                                     items:                     result.items || {},
						                                     replacement_MVs:           result.replacement_MVs || [],
						                                     replaced_MVs:              result.replaced_MVs || [],
						                                     replacement_relationships: result.replacement_relationships || [],
						                                     replaced_relationships:    result.replaced_relationships || [],
						                                     name:                      'pivots.' + where,
						                                     forEachView:               function () {
							                                     this.what_we_on = where;
						                                     }
					                                     }).catch(function (res) {
						Sm.CONFIG.DEBUG && console.log(res);
					});
				})
			},

			/**
			 * @override
			 * @alias Sm.Entities.Section.View.additional_events
			 */
			additional_events: {
				//swipe support
				touchstart: function (e) {
					/** @alias e.changedTouches */
					var changedTouches          = e.changedTouches || e.originalEvent.changedTouches;
					var touch_obj               = changedTouches[0];
					this._touch_data.start.x    = touch_obj.pageX;
					this._touch_data.start.y    = touch_obj.pageY;
					this._touch_data.start.time = new Date().getTime(); // record time when finger first makes contact with surface
					e.preventDefault();
				},
				//swipe support
				touchend:   function (e) {
					/** @alias e.changedTouches */
					var changedTouches = e.changedTouches || e.originalEvent.changedTouches;
					var touch_obj      = changedTouches[0];
					//horizontal distance traveled
					var dist           = touch_obj.pageX - this._touch_data.start.x;
					//check that time elapsed is in threshold, swipe distance is within threshold
					var time_elapsed   = new Date().getTime() - this._touch_data.start.time; // get time elapsed
					if (time_elapsed <= this._touch_data.allowed_time
					&& Math.abs(touch_obj.pageY - this._touch_data.start.y) <= 100
					&& Math.abs(dist) >= this._touch_data.threshold) {
						var left = true;
						if (dist < 0) left = false;
						this.scale(!!left);

					} else if (this.MvCombo) {
						e.stopPropagation();
						this.handle_click(e.target, e);
					}
					this._touch_data.start = {
						x:    0,
						y:    0,
						time: 0
					};
					e.preventDefault();
					e.stopPropagation();
				},
				click:      function (e) {
					var isRightMB = (e.which && e.which == 3) || (e.button && e.button == 2);
					if (isRightMB) Sm.CONFIG.DEBUG && console.log(this);

					if (this.MvCombo) {
						this.handle_click(e.target, e);
						e.stopPropagation();
					}
				}
			},
			/**
			 * Render the Mirror that is to be dragged when adding this to another entity
			 * @param el
			 * @return {*}
			 */
			renderDragMirror:  function (el) {
				var Mv_ = this.MvCombo;
				if (!Mv_) return false;
				var clone                 = el.cloneNode(true);
				var wrap_thing            = document.createElement('div');
				wrap_thing.style.position = 'absolute';
				wrap_thing.appendChild(clone);
				wrap_thing.className    = 'sm-mirror';
				wrap_thing.style.cursor = 'grabbing';
				return wrap_thing;
			},
			blur:              function () {
				if (!this.queryStatus('focused')) return this;
				this.add_bound && document.removeEventListener('click', this.add_bound('blur', this.MvCombo.blur.bind(this.MvCombo, {}, this)));
				document.removeEventListener('keydown', this.get_bound('scale_handler'));
				return Sm.Core.SmView.prototype.blur.apply(this, arguments);
			},
			focus:             function () {
				//if (this.queryStatus('focused')) return this;
				var self          = this;
				/**
				 * This is the <=   => handler for scaling the section
				 * @param e
				 */
				var scale_handler = function (e) {
					if (!self.queryStatus('focused')) {
						Sm.CONFIG.DEBUG && console.log('View is not focused, will not scale');
						return false;
					}
					var keyCode   = e.which;
					var direction = keyCode == 37 ? true : (keyCode == 39 ? false : null);
					if (typeof direction == "boolean") {
						self.scale(direction).catch(function (err) {Sm.CONFIG.DEBUG && console.log(err);});
						e.stopPropagation();
					}
				};
				this.add_bound && document.addEventListener('click', this.add_bound('blur', this.MvCombo.blur.bind(this.MvCombo, {}, this)));
				document.addEventListener('keydown', this.add_bound('scale_handler', scale_handler));
				Sm.Core.SmView.once('click', function (MvCombo_) {
					if (MvCombo_ && (MvCombo_.r_id != self.MvCombo.r_id)) self.get_bound('blur')();
				});
				Sm.Entities.Section.Wrapper.once('focus', function (MvCombo_) {
					if (MvCombo_ && (MvCombo_.r_id != self.MvCombo.r_id)) self.get_bound('blur')();
				});
				var $focus_element = this.$el.children('.focus');
				if ($focus_element[0]) {
					var context_id = 0;
					var MvCombo_   = this.MvCombo;
					var MicroIndex = MvCombo_.relationships['micros'];
					var MacroIndex = MvCombo_.reciprocal_relationships['micros'];
					var can_left   = MicroIndex && MicroIndex.has_relationships_in_context(context_id);
					var can_right  = MacroIndex && MacroIndex.has_relationships_in_context(context_id);

					if (can_left) $focus_element.addClass('can-pan-left');
					else if (can_left === 0) $focus_element.addClass('maybe-can-pan-left');
					else $focus_element.removeClass('maybe-can-pan-left').removeClass('can-pan-left');

					if (can_right) $focus_element.addClass('can-pan-right');
					else if (can_right === 0) $focus_element.addClass('maybe-can-pan-right');
					else $focus_element.removeClass('maybe-can-pan-right').removeClass('can-pan-right');
				}
				return Sm.Core.SmView.prototype.focus.apply(this, arguments);
			},


			undelegateEvents: function () {
				Sm.Core.SmView.prototype.undelegateEvents.apply(this, arguments);
			},

			wrap_element_for_relationship: function (View, relationship_index, Relationship_, container_template) {
				var def_container_string = container_template || '<div></div>';
				if (Relationship_.linked_entities && 'Dictionary' in Relationship_.linked_entities) {
					def_container_string      = def_container_string.replace('__R_ID__', Relationship_.Identity.r_id);
					var $definition_container = $(def_container_string);
					if ($definition_container[0]) {
						$definition_container[0].appendChild(OtherView.get_rendered('Element'));
						return $definition_container[0];
					}
				}
				return View.get_rendered('Element');
			}
		});
		Sm.loaded.add('Entities_Section_View');
	}, 'Entities_Section_View');
});