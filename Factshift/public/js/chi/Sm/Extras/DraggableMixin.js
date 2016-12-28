/**
 * Created by Sam Washington on 12/21/15.
 */


require(['require', 'Sm', 'crossvent'], function (require) {
	var el_documentElement = window.document.documentElement;
	var el_body            = document.body;
	var $_window           = $(window);

	Sm.loaded.when_loaded(['Core', 'Core_util_crossvent'], function () {
		var crossvent = Sm.Core.util.crossvent;

		/**
		 * @name dragUtil
		 * @type {{getNextElement: Function, getRectHeight: Function, getRectWidth: Function, is_input: Function, getScroll: Function, getParent: Function, which_mouse_button: Function, always: Function, never: Function}}
		 */
		var dragUtil  = {
			getNextElement:     function (el) {
				return el.nextElementSibling || manually();
				function manually() {
					var sibling = el;
					do {
						sibling = sibling.nextSibling;
					} while (sibling && sibling.nodeType !== 1);
					return sibling;
				}
			},
			getPreviousElement: function (el) {
				return el.previousElementSibling || manually();
				function manually() {
					var sibling = el;
					do {
						sibling = sibling.previousSibling;
					} while (sibling && sibling.nodeType !== 1);
					return sibling;
				}

			},
			getRectHeight:      function (rect) {
				return rect.height || (rect.bottom - rect.top);
			},
			getRectWidth:       function (rect) {
				return rect.width || (rect.right - rect.left);
			},
			getOffset:          function (el, minus_scroll) {
				var rect = el.getBoundingClientRect();
				var self = this;
				var s_x;
				var s_y;

				if (!!minus_scroll) {
					s_x = 0;
					s_y = 0;
				} else {
					s_x = self.getScroll('scrollLeft', 'pageXOffset');
					s_y = self.getScroll('scrollTop', 'pageYOffset');
				}

				return {
					left: rect.left + s_x,
					top:  rect.top + s_y
				};
			},
			get_event_host:     function (e) {
				// on touchend event, we have to use `e.changedTouches`
				// see http://stackoverflow.com/questions/7192563/touchend-event-properties
				// see https://github.com/bevacqua/dragula/issues/34
				if (e.targetTouches && e.targetTouches.length) {
					return e.targetTouches[0];
				}
				if (e.changedTouches && e.changedTouches.length) {
					return e.changedTouches[0];
				}
				return e;
			},
			get_coordinate:     function (coordinate, e) {
				var host    = this.get_event_host(e);
				var missMap = {
					pageX: 'clientX', // IE8
					pageY: 'clientY' // IE8
				};
				if (coordinate in missMap && !(coordinate in host) && missMap[coordinate] in host) {
					coordinate = missMap[coordinate];
				}
				return host[coordinate];
			},
			is_input:           function (el) {
				return el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT';
			},
			getScroll:          function (scrollProp, offsetProp) {
				if (typeof global[offsetProp] !== 'undefined') {
					return global[offsetProp];
				}
				if (el_documentElement.clientHeight) {
					return el_documentElement[scrollProp];
				}
				return document.body[scrollProp];
			},
			getParent:          function (el) {
				return (!el || !el.parentNode || el.parentNode == document) ? null : el.parentNode;
			},
			which_mouse_button: function (e) {
				if (e.touches !== void 0) { return e.touches.length; }
				if (e.buttons !== void 0) { return e.buttons; }
				if (e.which !== void 0) { return e.which; }
				var button = e.button;
				if (button !== void 0) { // see https://github.com/jquery/jquery/blob/99e8ff1baa7ae341e94bb89c3e84570c7c3ad9ea/src/event.js#L573-L575
					//noinspection JSBitwiseOperatorUsage
					return button & 1 ? 1 : button & 2 ? 3 : (button & 4 ? 2 : 0);
				}
			},
			getElOffset:        function (element) {
				var top = 0, left = 0;
				do {
					top += element.offsetTop || 0;
					left += element.offsetLeft || 0;
					element = element.offsetParent;
				} while (element);

				return {
					top:  top,
					left: left
				};
			},
			always:             function () {return true;},
			never:              function () {return false;},
			pn_touch:           function (el, op, type, fn) {
				var touch     = {
					mouseup:   'touchend',
					mousedown: 'touchstart',
					mousemove: 'touchmove'
				};
				var microsoft = {
					mouseup:   'MSPointerUp',
					mousedown: 'MSPointerDown',
					mousemove: 'MSPointerMove'
				};
				if (global.navigator.msPointerEnabled) {
					crossvent[op](el, microsoft[type], fn);
				}
				crossvent[op](el, touch[type], fn);
				crossvent[op](el, type, fn);
			}
		};
		var Draggable = Sm.Extras.Draggable = {
			position:             {
				mouse: {
					x: 0,
					y: 0
				}
			},
			mouse_event_listener: function (e) {
				this.position.mouse.x = e.clientX;
				this.position.mouse.y = e.clientY;
			},
			/**
			 * @alias Sm.Extras.Draggable.mixin
			 * @param settings
			 * @param settings.can_start
			 * @param settings.can_accept
			 * @param settings.can_reorder
			 * @param settings.data
			 * @param settings.check_mark
			 * @param settings.el
			 */
			mixin:                function (settings) {
				settings           = settings || {};
				this.el            = this.el || settings.el || null;
				this.$el           = this.$el || $(this.el);
				var d_self         = this;
				d_self.can_reorder = settings.can_reorder || false;
				var can_start      = dragUtil.never;
				var can_accept     = dragUtil.never;
				var check_mark     = settings.check_mark || dragUtil.never;
				if (!settings.can_start) {
					can_start = dragUtil.never;
				} else if (settings.can_start === true) {
					can_start = dragUtil.always;
				} else if (typeof settings.can_start === "function") {
					can_start = settings.can_start;
				}
				if (!settings.can_accept) {
					can_accept = dragUtil.never;
				} else if (settings.can_accept === true) {
					can_accept = dragUtil.always;
				} else if (typeof settings.can_accept === "function") {
					can_accept = settings.can_accept;
				}
				var s_data = settings.data || {};


				this.makeElementDraggable   = function (elem, handle) {
					var el   = elem || this.el;
					this.$el = this.$el || $(el);
					if (typeof  handle == "boolean") {
						handle && (handle = this.$el.find('.handle')[0]);
					} else if (typeof  handle == 'string') {
						handle = this.$el.find(handle)[0];
					} else if (Sm.Core.util.isElement(handle)) {} else {
						handle = false;
					}
					handle = typeof handle !== "undefined" ? handle : el;

					el.sm_Draggable         = this;
					el.dataset.sm_draggable = true;
					this._draggable.data    = s_data;
					if (handle)
						dragUtil.pn_touch(handle, 'add', 'mousedown', this.add_bound('grab', this._draggable.grab, this._draggable));
				};
				this.removeElementDraggable = function (elem, handle) {
					var el                  = elem || this.el;
					el.sm_Draggable         = false;
					el.dataset.sm_draggable = false;
					this._draggable.data    = {};

					if (typeof  handle == "boolean") {
						handle && (handle = this.$el.find('.handle')[0]);
					} else if (typeof  handle == 'string') {
						handle = this.$el.find(handle)[0];
					} else if (Sm.Core.util.isElement(handle)) {} else {
						handle = false;
					}
					handle = handle !== "undefined" ? handle : el;
					if (handle)
						dragUtil.pn_touch(handle, 'remove', 'mousedown', this.add_bound('grab', this._draggable.grab, this._draggable));
				};
				this.setDraggingStatus      = function (set_to_on) {
					if (!set_to_on) {
						this.$el.removeClass('sm-transit');
					} else {
						this.$el.addClass('sm-transit');
					}
				};

				var shift_key    = function (e) {
					if (e.keyCode === 27) d_self._draggable.release(e, true);
					if (e.keyCode !== 16) return;
					d_self.can_reorder = true;
					var last_el        = d_self._draggable.elements.last_drop_target;
					last_el && $(last_el).removeClass('sm-hover');
				};
				var no_shift_key = function (e) {
					if (e.keyCode !== 16) return;
					d_self.can_reorder = false;
					d_self.cp && d_self.cp.parentNode && d_self.cp.parentNode.removeChild(d_self.cp);
					var last_el = d_self._draggable.elements.last_drop_target;
					last_el && $(last_el).addClass('sm-hover');
				};

				/**
				 * @param {HTMLElement} el
				 * @type {Function|*}
				 */
				this.renderDragMirror = this.renderDragMirror || function (el) {
					Sm.CONFIG.DEBUG && console.log('render');
					/** @type {HTMLElement|Node} */
					var _mirror            = el.cloneNode(true);
					_mirror.style.position = 'absolute';
					_mirror.style.width    = el.offsetWidth;
					_mirror.style.height   = el.offsetHeight;
					return _mirror;
				};
				/**
				 * Keep a version of a function named to be referenced otherwise, useful for referencing functions with a "this" attribute bound to them.
				 * @type {Function|*}
				 */
				this.add_bound = this.add_bound || function (name, fn, _self) {
					this._fns = this._fns || {};
					if (!(typeof fn === "function")) {
						Sm.CONFIG.DEBUG && console.log(fn, name);
						return function () {};
					}
					return this._fns[name] = this._fns[name] || fn.bind(_self || this);
				};
				this.get_bound   = this.get_bound || function (name) {
					return this._fns[name] ? this._fns[name] : function () {}.bind(this);
				};
				this._draggable  = {
					status:   {
						is_draggable:          false,
						is_dragging:           false,
						is_grabbed:            false,
						_grab_has_been_called: false,
						is_animated:           false
					},
					position: {
						offset:       {x: 0, y: 0},
						latest_mouse: {x: 0, y: 0}
					},
					elements: {
						last_hover:       null,
						last_drop_target: null
					},
					/**
					 * Is the element in the mirror?
					 * @param ele
					 * @return {boolean}
					 */

					/**
					 * An object containing the random id of elements that we know can receive this element
					 * Later, we can add functionality to vary the droppability, but not right now.
					 */
					known_droppables:   {},
					/**
					 * The information that will get dropped
					 */
					data:               {},
					marked:             [],
					mirror_contains:    function (ele) {
						if (!ele) return false;
						if (!!this.elements.mirror) {
							if (ele == this.elements.mirror) return true;
							if (ele.dataset && (ele.dataset.sm_drag_is_in_mirror == true)) {
								return true;
							}
							var test = true, p_node;
							while (test) {
								p_node = ele.parentNode;
								if (p_node == this.elements.mirror) {
									ele.dataset && (ele.dataset.sm_drag_is_in_mirror = true);
									return true;
								}
								if ((!!p_node) && ((p_node !== el_body) && (p_node !== document))) {
									( ele = p_node)
								} else {
									test = false;
								}
							}
						}
						ele.dataset && (ele.dataset.sm_drag_is_in_mirror = false);
						return false
					},
					/**
					 * Find the next drop target based on the mouse position
					 * @return {*|boolean}
					 */
					find_drop_target:   function () {
						var pos_obj = Draggable.position.mouse;
						var x       = pos_obj.x;
						var y       = pos_obj.y;
						var list    = [];
						var display = [];
						var ele     = document.elementFromPoint(x, y);

						var drop            = false;
						var potential_drops = [];
						var rand_id;
						var self            = this;
						this.marked         = [];
						var check           = function (ele) {
							if (ele == d_self.cp) {return ele;}
							if (!!ele.dataset.sm_drag_find_drop_rand_id) {
								rand_id = ele.dataset.sm_drag_find_drop_rand_id;
								if (self.known_droppables[rand_id]) {
									return ele;
								}
							}
							if (self.mirror_contains(ele)) return false;
							if (!!ele.sm_Draggable && (!!can_accept && can_accept.call(ele.sm_Draggable, self, self.data))) {
								potential_drops.push(ele);
								rand_id = ele.dataset.sm_drag_find_drop_rand_id = Sm.Core.util.randomString(7);
								self.known_droppables[rand_id] = ele;
							}
							check_mark(ele) && self.marked.push(ele);
							return false;
						};

						while (!drop && ele && (ele !== el_body) && (ele !== window) && (ele !== document) && (ele !== document.documentElement)) {
							if (drop = check(ele)) break;
							list.push(ele);
							display.push(ele.style.visibility);
							ele.style.visibility = "hidden";
							ele                  = document.elementFromPoint(x, y);
						}

						// restore display property
						for (var i = 0; i < list.length; i++) {
							list[i].style.visibility = display[i];
						}
						drop.parentNode && check_mark(drop.parentNode) && self.marked.push(drop.parentNode);
						return drop || false;
					},
					/**
					 * Get the first element under the cursor that isn't part of the mirror
					 * @return {*|boolean}
					 */
					find_first_element: function () {
						var pos_obj = Draggable.position.mouse;
						var x       = pos_obj.x;
						var y       = pos_obj.y;
						var v;
						var m;
						(m = this.elements.mirror ) && (v = m.style.visibility) && (m.style.visibility = 'hidden');
						var test_element = document.elementFromPoint(x, y);
						(!!m) && (m.style.visibility = v);

						var actual;

						var list         = [];
						var visibilities = [];
						while (!actual && !!test_element && (test_element !== el_body) && (test_element !== window) && (test_element !== document) && (test_element !== el_documentElement)) {
							test_element = document.elementFromPoint(x, y);
							if (!this.mirror_contains(test_element)) {
								actual = test_element;
								break;
							}
							visibilities.push(test_element.style.visibility);
							test_element.style.visibility = 'hidden';
							list.push(test_element);
						}

						for (var i = 0; i < list.length; i++) {
							var ele              = list[i];
							ele.style.visibility = visibilities[i];
						}
						return actual || false;
					},

					/**
					 *
					 * @param {SharedKeyboardAndMouseEventInit|Event}   e
					 */
					grab:                 function (e) {
						if (this.status._grab_has_been_called) {
							return;
						}

						!this.position && Sm.CONFIG.DEBUG && console.log(this);
						this.position.latest_mouse.x = Draggable.position.mouse.x;
						this.position.latest_mouse.y = Draggable.position.mouse.y;

						/**
						 * Only respond to actual left clicks  or touch events
						 * @type {boolean}
						 */
						var is_false_alarm = (dragUtil.which_mouse_button(e)) !== 1 || !!e.metaKey || !!e.ctrlKey;
						if (is_false_alarm || !can_start(e)) {
							return;
						}
						e.stopPropagation();

						if (e.type === "mousedown") {
							var target = e.target;
							if (dragUtil.is_input(target)) return;
						}

						this.manual_grab(e);
					},
					/**
					 * When dragging multiple elements, manually "grab" them to initialize the process.
					 * todo at the moment, this clobbers the animate droppability function
					 * @param e
					 * @return {boolean}
					 */
					manual_grab:          function (e) {
						document.selection && document.selection.empty && document.selection.empty();
						window.getSelection && window.getSelection().removeAllRanges();

						document.addEventListener('keydown', shift_key);
						document.addEventListener('keyup', no_shift_key);

						this.status._grab_has_been_called = true;
						this.status.is_grabbed            = true;

						var $el     = d_self.$el;
						var el      = d_self.el;
						d_self.cp   = document.createElement('div');
						d_self.cp.className += 'sm-copy';
						var rand_id = d_self.cp.dataset.sm_drag_find_drop_rand_id = Sm.Core.util.randomString(7);
						this.known_droppables[rand_id] = d_self.cp;
						/** @type {HTMLElement|Node} */
						var _mirror                    = this.elements.mirror = d_self.renderDragMirror(el);

						if (!_mirror) {
							this.release(e, false);
							return false
						}
						d_self.can_reorder = e.shiftKey;
						!!e && e.preventDefault && e.preventDefault();

						el_documentElement.appendChild(_mirror);
						d_self.can_reorder && el.parentNode.insertBefore(d_self.cp, el);
						$el.addClass('sm-transit');

						var w = _mirror.offsetWidth;
						var h = _mirror.offsetHeight;

						_mirror.style.left = Draggable.position.mouse.x - w * .8 + 'px';
						_mirror.style.top  = Draggable.position.mouse.y - h / 2 + 'px';

						//Problem with unbinding this?
						dragUtil.pn_touch(el_documentElement, 'add', 'mousemove', d_self.add_bound('drag', this.drag, this));
						dragUtil.pn_touch(el_documentElement, 'add', 'mouseup', d_self.add_bound('release', this.release, this));
					},
					drag:                 function (e) {
						var clientX = dragUtil.get_coordinate('clientX', e);
						var clientY = dragUtil.get_coordinate('clientY', e);
						this.cache  = this.cache || {};
						var xx      = this.cache.window_height || $_window.innerHeight();

						this.status.is_dragging = true;

						var last_x    = this.position.latest_mouse.x;
						var last_y    = this.position.latest_mouse.y;
						var current_x = Draggable.position.mouse.x;
						var current_y = Draggable.position.mouse.y;

						var change_x = current_x - last_x;
						var change_y = current_y - last_y;
						var change   = Math.sqrt(change_x * change_x + change_y * change_y);
						if (change < 4) {
							return;
						}
						this.position.latest_mouse.x = current_x;
						this.position.latest_mouse.y = current_y;
						if (Math.abs(xx - e.clientY) < 70) {
							window.scrollBy(e.clientX, 20);
						} else if (e.clientY < 70) {
							window.scrollBy(e.clientX, -20);
						}

						var _mirror = this.elements.mirror;
						if (!_mirror)    return;

						!this.status.is_animated && this.animate_droppability();

						var drop_target = this.find_drop_target();
						var last_el     = this.elements.last_drop_target;

						if (!drop_target) {
							if (!!last_el) {
								last_el && $(last_el).removeClass('sm-hover');
								this.elements.last_drop_target = null;
								$(_mirror).removeClass('sm-dropping');
							}
							return;
						}
						if (drop_target == d_self.cp) return;

						var quadrant_matters = d_self.can_reorder;

						var quadrant, mouse_offset = Draggable.position.mouse;
						if (quadrant_matters) {
							var os   = dragUtil.getOffset(drop_target);
							var rect = drop_target.getBoundingClientRect();
							var w    = dragUtil.getRectWidth(rect);
							var h    = dragUtil.getRectHeight(rect);
							var mo   = {
								x: dragUtil.getScroll('scrollLeft', 'pageXOffset') + mouse_offset.x,
								y: dragUtil.getScroll('scrollTop', 'pageYOffset') + mouse_offset.y
							};


							var pw = 100. * ((mo.x - os.left) / w).toPrecision(4);
							var ph = 100. * ((mo.y - os.top) / h).toPrecision(4);

							if (ph < 50) {
								if (pw < 50)quadrant = 1;
								else quadrant = 2;
							} else {
								if (pw > 50)quadrant = 3;
								else quadrant = 4;
							}


							this.position.quadrant = quadrant;
							this.hover(drop_target, mouse_offset, quadrant);
						}
						if (drop_target == last_el) return;
						last_el && $(last_el).removeClass('sm-hover');
						$(_mirror).addClass('sm-dropping');
						this.elements.last_drop_target = drop_target;
						!d_self.can_reorder && $(drop_target).addClass('sm-hover');
					},
					hover:                function (drop_target, mouse_offset, quadrant) {
						if (!d_self.can_reorder) return;

						var previousElement = dragUtil.getPreviousElement(drop_target);
						var nextElement     = dragUtil.getNextElement(drop_target);
						if (drop_target == d_self.cp) return;

						var rect  = drop_target.getBoundingClientRect();
						var w     = dragUtil.getRectWidth(rect);
						var h     = dragUtil.getRectHeight(rect);
						var os    = dragUtil.getOffset(drop_target);
						os.right  = os.left + dragUtil.getRectWidth(rect);
						os.bottom = os.top + dragUtil.getRectHeight(rect);

						var check = function (element) {
							if (!element) return [null, null];
							var rect1 = element.getBoundingClientRect();
							var oo    = dragUtil.getOffset(element);
							oo.right  = oo.left + dragUtil.getRectWidth(rect1);
							oo.bottom = dragUtil.getRectHeight(rect1);
							if (oo.right == 0 || oo.bottom == 0) return [0, 0];
							return [oo.left < os.left + (w / 2) ? oo.right < os.left ? 'L' : 'M' : oo.right > os.right ? 'R' : 'M',
								oo.top < os.top + (h / 2) ? oo.bottom < os.top ? 'T' : 'M' : oo.bottom > os.bottom ? 'B' : 'M'];
						};

						var p = check(previousElement);
						var n = check(nextElement);

						this.position.location = true;

						switch (quadrant) {
							case 1:
							case 2:
								this.position.location = 'before';
								drop_target.parentNode.insertBefore(d_self.cp, drop_target);
								break;
							case 3:
							case 4:
								this.position.location = 'after';
								Sm.Core.util.insertAfter(d_self.cp, drop_target);
								break;
						}

					},
					/**
					 * Animate the element's motion as the mouse is dragged
					 * @type {Function}
					 * @return {boolean}
					 */
					animate_droppability: function () {
						var _mirror = this.elements.mirror;

						var left = _mirror.style.left;
						var top  = _mirror.style.top;
						// Strip the px, convert to float
						top      = parseFloat(top.substring(0, top.length - 2));
						left     = parseFloat(left.substring(0, left.length - 2));
						var mouse_top;
						var mouse_left;

						var status = this.status;

						var rect = _mirror.getBoundingClientRect();
						var w    = rect.width;
						var h    = rect.height;

						//todo make some sort of setting to set the offset
						var mid_left = left + (w * .95);
						var mid_top;
						mid_top      = top - (h / 2);
						var counter  = 0;
						var work     = function (delta_t, now) {
							if (!status.is_dragging) return false;

							mouse_top          = Draggable.position.mouse.y;
							mouse_left         = Draggable.position.mouse.x;
							var diff_top       = mouse_top - mid_top;
							var diff_left      = mouse_left - mid_left;
							status.is_animated = true;

							delta_t      = (delta_t || 16) / 2;
							var left_add = Math.round(diff_left / delta_t);
							var top_add  = Math.round(diff_top / delta_t);

							left += left_add;
							mid_left += left_add;
							top += top_add;
							mid_top += top_add;

							_mirror.style.top  = top + 'px';
							_mirror.style.left = left + 'px';
						};
						Sm.Core.util.create_animation_loop(work);
						return true;
					},
					drop:                 function () {
						var drop_target = this.elements.last_drop_target;
						if (!drop_target) return false;
						var otherDraggable = drop_target.sm_Draggable;
						if (!otherDraggable) return false;
						d_self.setDraggingStatus(false);
						typeof otherDraggable.accept_drop === "function" && (otherDraggable.accept_drop(this.data, this.position.location || true, this.marked));
					},
					release:              function (e, cancel) {
						el_documentElement.style.pointer = "auto";
						var last_drop                    = this.elements.last_drop_target;
						!!last_drop && $(last_drop).removeClass('sm-hover');
						!cancel && this.drop();
						this.elements.mirror && this.elements.mirror.parentNode.removeChild(this.elements.mirror);
						if (d_self.cp && d_self.cp.parentNode) {
							d_self.cp.parentNode.insertBefore(d_self.el, d_self.cp);
							d_self.cp.parentNode.removeChild(d_self.cp);
						}


						this.elements.mirror =
						this.elements.last_hover =
						this.elements.last_drop_target =
						this.status.is_animated =
						d_self.cp =
						this.position.location =
						this.position.quadrant =
						this.status.is_dragging =
						this.status._grab_has_been_called = false;

						var k_i = this.known_droppables;
						for (var sm_d_r_id in k_i) {
							if (!k_i.hasOwnProperty(sm_d_r_id)) continue;
							var elem = k_i[sm_d_r_id];
							elem && elem.dataset && (elem.dataset.sm_drag_find_drop_rand_id = false);
						}

						var $el = d_self.$el;
						$el.removeClass('sm-transit');
						dragUtil.pn_touch(el_documentElement, 'remove', 'mousemove', d_self.add_bound('drag', this.drag, this));
						dragUtil.pn_touch(el_documentElement, 'remove', 'mouseup', d_self.add_bound('release', this.release, this));
						document.removeEventListener('keydown', shift_key);
						document.removeEventListener('keyup', no_shift_key);
					}
				};
				this.grabElement = this._draggable.manual_grab.bind(this._draggable);
			}
		};

		Sm.loaded.add('Extras_Draggable');
		document.addEventListener('mousemove', Draggable.mouse_event_listener.bind(Draggable));
	}, 'Extras_Draggable');
});