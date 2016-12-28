/**
 * Created by Sam Washington on 12/17/15.
 */
require(['require', 'backbone', 'jquery',
	        'underscore', 'Cocktail', 'Emitter',
	        'Sm-Entities-Abstraction-Modal-ModalEdit',
	        'Sm-Entities-Abstraction-Modal-AddRelationship',
	        'Sm-Entities-Abstraction-Modal-ModalDestroy',
	        'Sm-Core-Abstraction-View'],
        /**
         * @lends Cocktail
         * @lends Backbone
         * @lends $
         * @lends _
         */
        function (require, Backbone, $, _, Cocktail, Emitter) {
	        require(['require', 'Sm/Extras/DraggableMixin'], function () {});
	        require(['require', 'Sm/Extras/Modal'], function () {});
	        var Sm = window.Sm;
	        Sm.loaded.when_loaded('Core_Abstraction_View', function () {
		        /**
		         * @alias Sm.Core.SmView
		         * @class SmView
		         * @extends Backbone.View
		         * @augments Sm.Extras.Draggable.mixin
		         * @augments Backbone.Events
		         * @property {string}           type                The type of entity it represents
		         * @property {string}           identifier          A query selector meant to identify an element of this type
		         * @property {{}}               status              How the view is displayed
		         * @property {function}         refresh_all         Refresh all of the views that are related to this
		         * @property {$}                $Element            {@link Sm.Core.SmView#$Element}
		         * @property {HTMLElement}      Element             {@link Sm.Core.SmView#Element}
		         * @property {HTMLElement|Node} referenceElement
		         * @property {string}           cid
		         * @property {{}}               _rendering_callbacks {@link Sm.Core.SmView#_rendering_callbacks}
		         * @property {function}         undelegateEvents
		         * @property {function}         delegateEvents
		         * @property {function}         remove
		         * @property {HTMLElement}      el
		         * @property {$}                $el
		         * @property {{}}               _relationships
		         * @property {Backbone.Model}   model
		         * @property {function}         events
		         * @property {Sm.Core.MvCombo}  MvCombo
		         */
		        Sm.Core.SmView = Sm.Core.Abstraction.View.extend(
		        {
			        type:                   '',
			        identifier:             '.spwashi-entity',
			        /**
			         * An object relating the relationship index to the name of the element in the elements object
			         * @see Sm.Core.SmView.elements
			         */
			        relationship_index_obj: {
				        collections: false,
				        children:    'child_holder',
				        composition: 'composition',
				        micros:      false,
				        pivots:      false
			        },
			        /**
			         * An object used to keep track of the elements of the View
			         * (name => Element)
			         *
			         */
			        elements:               {},

			        /**
			         * Default events of the Views
			         */
			        initial_events:    {
				        click: function () {
					        Sm.CONFIG.DEBUG && console.log('boon');
				        }
			        },
			        /**
			         * This is what's used to override the default, useful for inheriting classes
			         * @alias Sm.Core.SmView.additional_events
			         */
			        additional_events: {
				        click: function () {}
			        },


			        queryPermission: function (permission) {
				        if (!this.MvCombo) return false;
				        this._permissions = this._permissions || {};
				        if (permission == 'relate') permission = 'edit';
				        if (permission in this._permissions)
					        return this._permissions[permission];
				        var res = this.MvCombo.queryPermission(permission);
				        if (res != null) this._permissions[permission] = res;
				        return permission in this._permissions ? this._permissions[permission] : null;
			        },
			        queryStatus:     function (status) {
				        if (!this.MvCombo) return false;
				        this.status = this.status || {};
				        if (status == 'relate') status = 'edit';
				        if (status in this.status)
					        return this.status[status];
				        var res = this.MvCombo.queryStatus(status);
				        if (res != null) this.status[status] = res;
				        return status in this.status ? this.status[status] : null;
			        },


			        /**
			         * Initialize the View
			         * @param settings
			         * @param {HTMLElement}     settings.el
			         * @param {Backbone.Model}  settings.model
			         * @param {string}          settings.display_type
			         */
			        initialize: function (settings) {
				        settings         = settings || {};
				        this.object_type = "SmView";
				        var self         = this;
				        var self_type    = this.type;

				        Sm.Core.Abstraction.View.prototype.initialize.apply(this, arguments);
				        /**
				         * The MvCombo that is attached to this View
				         * @type {*|Sm.Core.Relationship|null}
				         */
				        this.MvCombo = this.ReferencedObject || settings.MvCombo || false;
				        /**
				         * When we got to this View through another MvCombo, this is an array that keeps track of that movement
				         * * rel_type.[rel_subtype].MvCombo_r_id
				         * * pivots.eli5.sec_xxxxxxxxxxxxxxxxxxxxx
				         * @type {Array}
				         */
				        this.reference_to = [];
				        if (!!settings.model) this.setStatus('has_model', true);
				        /**
				         * A list of Views by relationship type that are related. {'relationship_index'=>{...r_id=>View...}}
				         * @type {{}}
				         * @private
				         */
				        this._relationships = {};
				        this._reciprocal_relationships = {};
			        },


			        /**
			         * Set the MvCombo of the View
			         * @param _MvCombo
			         */
			        setReferencedObject: function (_MvCombo) {
				        this.ReferencedObject = _MvCombo;
				        this.MvCombo          = _MvCombo;
			        },
			        remove:              function () {
				        this.MvCombo.blur(this);
				        return Sm.Core.Abstraction.View.prototype.remove.apply(this, arguments);
			        },
			        /**
			         * Refresh all of the Views that are related to this
			         * @param settings
			         * @param {Array=}      ignore      An array of CID's to ignore (prolly because they've already been rendered)
			         * @returns {Sm.Core.SmView}
			         */
			        refresh_all:         function (settings, ignore) {
				        settings    = settings || {};
				        ignore      = ignore || [];
				        var Element = this.get_rendered('Element');
				        this.delegateEvents(this.events());
				        /** @type {Sm.Core.SmView}*/
				        var SelfView = this;

				        var MvCombo = this.MvCombo;
				        if (!MvCombo) return this;
				        var refresh = function (relationship_index, holder_element) {
					        if (relationship_index && !!holder_element) {
						        holder_element.innerHTML = '';
						        //iterate through this backwards to avoid any positioning mistakes
						        for (var i = relationship_index._meta._list.length; i--;) {
							        var rel_r_id = relationship_index._meta._list[i];
							        SelfView.add_relationship({
								                                  render:            true,
								                                  Relationship:      relationship_index.items[rel_r_id],
								                                  RelationshipIndex: relationship_index
							                                  }).then(function (result) {
								        if (result.OtherView) {
									        result.OtherView.refresh_element(result.otherElement);
									        result.OtherView.refresh_all(settings, ignore);
								        }
							        }).catch(function (error) {
								        Sm.CONFIG.DEBUG && console.log('error - ', error);
							        });
						        }
					        } else {
						        Sm.CONFIG.DEBUG && console.log('refresh no', relationship_index, holder_element);
					        }
				        };
				        this.refresh_element(Element);
				        var MvCombo_relationships = MvCombo.relationships;
				        for (var relationship_index in MvCombo_relationships) {
					        if (!MvCombo_relationships.hasOwnProperty(relationship_index)) continue;
					        var RelationshipIndex = MvCombo_relationships[relationship_index];
					        var holder_element    = this.get_rendered(this.relationship_index_obj[relationship_index]);
					        if (!holder_element) continue;
					        refresh(RelationshipIndex, holder_element)
				        }

				        return this;
			        },

			        mark_added:      function () {
				        this.setStatus({rendered: true});
				        this.init_button_control_events();
				        //remove the MvCombo as default View
				        this.MvCombo.addView(this);
				        this.post_add_hook();
			        },
			        /**
			         * Re-render the Element, reinitialize the events, get everything back to normal
			         * @param element
			         */
			        refresh_element: function (element) {
				        if (!element) return;
				        this.undelegateEvents();
				        this.setElement(element);
				        this.init_elements();
				        this.setStatus({
					                       rendered:   true,
					                       up_to_date: true
				                       });
				        this.delegateEvents(this.events());
				        this.init_button_control_events();
				        this.post_add_hook();
			        },
			        post_add_hook:   function () {
				        var self = this;
				        Sm.loaded.when_loaded('Vendor_MathJax', function () {
					        self.setStatus && self.setStatus('math_init', true);
					        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
				        });
				        Sm.loaded.when_loaded('Entities_Dictionary_Wrapper', function () {
					        Sm.Entities.Dictionary.Wrapper.highlight_word(null, {
						        element: self.get_rendered('Element')
					        })
				        });
			        },
			        /**
			         * Render the Element
			         * @param settings
			         * @param settings.if_not_rendered      Should we only do this if the Element has not already been rendered?
			         * @param settings.display_type         How are we displaying the View? full
			         * @param settings.synchronous          Return a promise (true) or a rendered element (false)
			         * @return {Promise|HTMLElement|*}
			         */
			        render:          function (settings) {
				        settings        = settings || {};
				        var synchronous = !!settings.synchronous;
				        if (!this.MvCombo || (this.queryStatus('destroyed'))) {
					        //Sm.CONFIG.DEBUG && console.log(this, ' Does not have an MvCombo unless ', this.queryStatus('destroyed'));
					        return synchronous ? false : Promise.reject("There is no longer an existent MvCombo for this View");
				        }
				        if ((this.queryStatus('rendered') && !!settings.if_not_rendered) || this.queryStatus('rendering')) {
					        Sm.CONFIG.DEBUG && console.log('ignore');
					        return synchronous ? this.el : Promise.resolve(this.el);
				        }
				        this.setStatus('rendering', true);
				        var MvCombo_  = this.MvCombo;
				        var self_type = this.type;
				        /**@type {Sm.Core.SmView}*/
				        var self      = this;

				        var post_render_func = function (result) {
					        var el_1    = $(result);
					        self.old_el = self.el;
					        self.setElement(el_1, 'render');
					        self.setStatus({
						                       rendered:   true,
						                       rendering:  false,
						                       up_to_date: true
					                       });
					        self.init_elements();
					        self.delegateEvents(self.events());
					        self.init_button_control_events();
					        MvCombo_.addView(this);
					        return el_1[0];
				        };
				        var Garage_          = Sm.Entities[self_type].Garage;
				        this.display_type    = settings.display_type || this.display_type || 'full';
				        this.setStatus('modal', (this.display_type.indexOf("modal") >= 0));
				        if (!synchronous) {
					        return Garage_.generate(this.display_type, MvCombo_).then(post_render_func).catch(function (error) {
						        Sm.CONFIG.DEBUG && console.log(error);
					        });
				        } else {
					        return post_render_func(Garage_.generate(this.display_type, MvCombo_, {synchronous: true}))
				        }
			        },

			        /**
			         * Start the process to adding a relationship based an existing other View or MvCombo. This adds the relationship on the server
			         * @param {{}=}settings
			         * @param settings.View     {Sm.Core.SmView=}   If we know the View that is being added to this one, use it
			         * @param settings.type     {string=}           The Entity type that we are going to be adding
			         * @param settings.MvCombo  {}
			         * @param settings.relationship_index {string=}
			         * @return {*}
			         */
			        prompt_add_relationship:    function (settings) {
				        settings = settings || {};
				        var View_, MvCombo_;
				        if (!!settings.View) {
					        View_ = settings.View;
					        delete settings.View;
					        MvCombo_ = settings.MvCombo || View_.MvCombo;
				        } else if (!!settings.MvCombo) {
					        MvCombo_ = settings.MvCombo;
					        View_    = MvCombo_.getView({reference_element: this.referenceElement});
				        }
				        var SelfView = this;
				        var Wrapper  = Sm.Entities[this.type].Wrapper;
				        /**
				         * Create the Relationship on the server
				         */
				        return Wrapper.prompt('add_relationship', this.MvCombo, {OtherMvCombo: MvCombo_, relationship_index: settings.relationship_index || false}).catch(function (e) {
					        Sm.CONFIG.DEBUG && console.log('SmView,bar,1', e);
					        throw e;
				        }).then(function (result) {
					        /**
					         * Given the result of the add_relationship, add the relationship to the View and register the View relationship in it.
					         */
					        if (result && result.RelationshipIndex) {
						        var selfMV             = result.SelfMvCombo;
						        var OtherMvCombo       = result.OtherMvCombo;
						        var otherView          = result.OtherView;
						        var Relationship_      = result.Relationship;
						        var RelationshipIndex_ = result.RelationshipIndex;
						        var self_map_index     = result.map_indices[0];
						        var other_map_index    = result.map_indices[1];
						        if (Relationship_) {
							        var reg_obj              = {};
							        reg_obj[self_map_index]  = SelfView;
							        reg_obj[other_map_index] = otherView || View_;
							        Relationship_.register_view_relationship(reg_obj);
							        SelfView.add_relationship({
								                                  render:            true,
								                                  Relationship:      Relationship_,
								                                  RelationshipIndex: RelationshipIndex_
							                                  }).catch(function (error) {
								        Sm.CONFIG.DEBUG && console.log('error - ', error);
							        });
						        }
						        return result;
					        }
					        return false;
				        }).catch(function (e) {
					        Sm.CONFIG.DEBUG && console.log(e);
					        throw e;
				        }).then(function (result) {
					        /**
					         * Save the relationshipIndex,
					         * todo this is not a good thing.
					         * Work out the logistics of saving
					         */
					        if (result && result.RelationshipIndex) {
						        if (result.Relationship) {
							        return result.Relationship.save();
						        }
						        var RelationshipIndex = result.RelationshipIndex;
						        var context_id        = 0;
						        RelationshipIndex.save({
							                               context_id: context_id
						                               }).catch(function (e) {
							        Sm.CONFIG.DEBUG && console.log(e);
							        throw e;
						        });
					        }
				        }).catch(function (e) {
					        console.log(e);
					        throw e;
				        });
			        },
			        /**
			         * Physically add the relationship to the View, regardless of whether or not it exists on the server
			         * @alias Sm.Core.SmView.add_relationship
			         * @param settings
			         * @param {boolean=}                            settings.render
			         * @param {boolean=}                            settings.is_reciprocal
			         * @param {Sm.Core.Relationship=}               settings.Relationship               The Relationship to add
			         *                                                                                  (we assume that this has
			         *                                                                                  already been
			         *                                                                                  instantiated/Mv linked)
			         * @param {Sm.Core.RelationshipIndex=}          settings.RelationshipIndex          =
			         * @param {Sm.Core.MvCombo=}                    settings.MvCombo                    The MvCombo being related
			         * @param {string=}                             settings.map_index                  Where to search for the
			         *                                                                                  MvCombo (e.g. collection_id)
			         *                                                                                  If undefined, assume
			         *                                                                                  reciprocity
			         * @param {string=}                             settings.relationship_type_index    Where are we adding this
			         *                                                                                  entity? children? micros?
			         * @param {string=}                             settings.self_map_index             The map index at which we
			         *                                                                                  can find this View
			         * @param {object<string, Sm.Core.SmView>=}     settings.relationship_obj           An object representing the
			         *                                                                                  View relationships. This is a map_index: View.
			         * @param {r_id=}                               settings.context_r_id               The context in which the
			         *                                                                                  relationship exists
			         * @param {string=}                              settings.container_template         The template to use in
			         *                                                                                  wrapping the relationship
			         * @this Sm.Core.SmView
			         * @return {Promise|boolean|*}
			         */
			        add_relationship:           function (settings) {
				        /** @type {boolean} */
				        var render                  = !!settings.render;
				        /** @type {string|boolean} */
				        var relationship_type_index = settings.relationship_type_index || false;
				        /** @type {string|boolean} */
				        var other_map_index         = settings.map_index || false;
				        /** @type {string|boolean} */
				        var self_map_index          = settings.self_map_index || false;
				        /** @type {Sm.Core.Relationship|boolean} */
				        var Relationship_           = settings.Relationship || false;
				        /** @type {Sm.Core.MvCombo} */
				        var SelfMvCombo             = this.MvCombo;
				        /** @type {Sm.Core.RelationshipIndex|boolean} */
				        var RelationshipIndex_      = settings.RelationshipIndex || false;
				        /** @type {boolean} */
				        var is_reciprocal           = !!settings.is_reciprocal;
				        /** @type {Sm.Core.MvCombo} */
				        var OtherMvCombo;
				        /**
				         * This is a string that we will wrap the Relationship with if need be.
				         * @type {string|boolean} */
				        var container_template      = settings.container_template || false;

				        //If we know both the relationship and the RelationshipIndex, get the MvCombo and the map indices from them.
				        if (Relationship_ && RelationshipIndex_) {
					        !relationship_type_index &&
					        RelationshipIndex_._meta &&
					        RelationshipIndex_._meta._index &&
					        (relationship_type_index = RelationshipIndex_._meta._index);

					        OtherMvCombo = settings.MvCombo || Relationship_.get_Mv({
						                                                                SelfMvCombo: SelfMvCombo,
						                                                                map_index:   other_map_index
					                                                                });

					        !other_map_index && OtherMvCombo && (other_map_index = Relationship_.get_map_index_of_Mv(OtherMvCombo));
					        !self_map_index && SelfMvCombo && (self_map_index = Relationship_.get_map_index_of_Mv(SelfMvCombo));
				        }

				        //We must know the map indices, the relationship type, the Relationship, and the MvCombo of the Current View
				        if (!other_map_index || !self_map_index || !relationship_type_index || !Relationship_ || !SelfMvCombo) {
					        return Promise.reject('Could not identify details');
				        }

				        var self                          = this;
				        /**
				         * An object used for Relationship.register_view_relationship
				         * @type {{}}
				         */
				        var relationship_obj              = settings.relationship_obj || {};
				        relationship_obj[other_map_index] = null;
				        relationship_obj[self_map_index]  = this;

				        //This is the only other way for us to get the OtherMvCombo. Not entirely sure why the Relationship.get_Mv function is duplicated, but eh.
				        //I assume that if the other one was called, this wouldn't be and vice-versa. Let's leave it.
				        OtherMvCombo = OtherMvCombo || settings.MvCombo || Relationship_.get_Mv({
					                                                                                SelfMvCombo: SelfMvCombo,
					                                                                                map_index:   other_map_index
				                                                                                });
				        if (OtherMvCombo.queryStatus('destroyed')) return Promise.reject(OtherMvCombo.r_id, " - does not exist");
				        if (!OtherMvCombo) return Promise.reject('There is no other MV');

				        /**
				         * Get the other View based on the Current one from the relationship
				         * @type {*|boolean|Sm.Core.SmView}
				         */
				        var OtherView = Relationship_.getView(this, other_map_index);
				        //If we couldn't find it, try to get one from the actual Other MvCombo. Afterwards, register the View relationship
				        if (!OtherView) {
					        OtherView = OtherMvCombo.getView({
						                                         reference_element: self.referenceElement
					                                         });
					        if (!OtherView) return Promise.reject('There is no other View');
					        relationship_obj[other_map_index] = OtherView;
					        Relationship_.register_view_relationship(relationship_obj);
				        }
				        this[relationship_type_index]                             = this[relationship_type_index] || {};
				        this[relationship_type_index][OtherMvCombo.Identity.r_id] = OtherView;
				        //If we are not reciprocally adding this relationship, try to do it with the Other View. This is mostly meant for us to keep track of what this View is being related to
				        if (!settings.is_reciprocal) {
					        settings.is_reciprocal                                                   = true;
					        settings.render                                                          = false;
					        settings.map_index                                                       = other_map_index;
					        settings.self_map_index                                                  = self_map_index;
					        //The View keeps track of its relationships this way
					        this._relationships[relationship_type_index]                             = this._relationships[relationship_type_index] || {};
					        this._relationships[relationship_type_index][OtherMvCombo.Identity.r_id] = OtherView;
					        OtherView.add_relationship(settings).catch(console.log);
				        } else {
					        this._reciprocal_relationships[relationship_type_index]                             = this._reciprocal_relationships[relationship_type_index] || {};
					        this._reciprocal_relationships[relationship_type_index][OtherMvCombo.Identity.r_id] = OtherView;
				        }
				        //Get the actual RelationshipIndex
				        /**
				         * The actual RelationshipIndex of the Relationship
				         * @type {Sm.Core.RelationshipIndex}
				         */
				        var SelfRelationshipIndex = is_reciprocal
				        ? SelfMvCombo.reciprocal_relationships[relationship_type_index]
				        : SelfMvCombo.relationships[relationship_type_index];
				        if (!SelfRelationshipIndex) return Promise.reject('There is no index to match ' + relationship_type_index + ' in ' + SelfMvCombo.type);

				        //Find out where we should add the relationship
				        var position = SelfRelationshipIndex.locate(OtherMvCombo.Identity, settings.context_r_id || 0);
				        //Just in case there is an invalid response, normalize it by making the position the first position
				        position     = (position || 0);
				        var P        = Promise.resolve([null]);

				        //In some cases, we are doing this for the future and might not need to actually render the Relationship yet.
				        //We could also be doing some behind the scenes stuff and need to know what something is related to. Either way, this is where we leave if we aren't rendering
				        if (!render) return P;

				        var otherElement       = this.wrap_element_for_relationship(OtherView, relationship_type_index, Relationship_, container_template);
				        var selfElement        = this.get_rendered('Element');
				        //Get the element (using Sm.Core.SmView.get_rendered) that corresponds to a relationship type index
				        var r_index            = this.relationship_index_obj[relationship_type_index];
				        var self_index_element = this.get_rendered(r_index);
				        if (!otherElement) return Promise.reject('There is no other element');

				        if (self_index_element) {
					        var $self_index_element   = $(self_index_element);
					        var content_element_array = $self_index_element.children('.content');
					        if (content_element_array[0]) $self_index_element = $(content_element_array[0]);

					        var children                     = $self_index_element.children();
					        var existing_relationship_length = children.length;
					        var reference_node, subsections;
					        //If the existing relationship type is valid, insert it at the specified position. Otherwise, try to append it
					        if (existing_relationship_length && (position < existing_relationship_length)) {
						        subsections    = children;
						        reference_node = subsections[position];
						        reference_node.parentNode.insertBefore(otherElement, reference_node);
						        OtherView.mark_added();
					        } else {
						        try {
							        self_index_element.appendChild(otherElement);
							        OtherView.mark_added();
						        } catch (e) {
							        Sm.CONFIG.DEBUG && console.log(e);
							        throw e;
						        }
					        }
				        }
				        return Promise.resolve({
					                               self_index_element: self_index_element,
					                               OtherView:          OtherView,
					                               otherElement:       otherElement
				                               }).then(function (result) {
					        var other_r_id = OtherMvCombo.r_id;
					        var Refs       = Sm.Core.MvWrapper.get_effective_MV(other_r_id, false, true);
					        //For some reason, this fixes an error. Will look into it later
					        //There's an issue with recursion I believe. Might be solved by adding to a list of relationships so we don't go over the same thing twice
					        if (!0) return result;
					        //^Just put !0 there to always return false and stop the IDE from complaining
					        if (Refs) {
						        Sm.CONFIG.DEBUG && console.log(Refs, other_r_id);
						        return Sm.Core.SmView.replace_with_elements({
							                                                    referenceElement: self_index_element,
							                                                    replacement_MVs:  Refs.MVs,
							                                                    replaced_MVs:     [other_r_id],
						                                                    }).then(function () {return result}).catch(function (res) {
							        Sm.CONFIG.DEBUG && console.log(res);
						        });
					        }
					        return result;
				        });
			        },
			        /**
			         * What to do when a View is dropped onto another one
			         * @param droppedView
			         * @param location
			         * @param marked
			         * @return {*}
			         */
			        accept_drop:                function (droppedView, location, marked) {
				        var OtherMvCombo    = droppedView.MvCombo;
				        var context_id      = 0;
				        var prompt_settings = {View: droppedView};
				        if (location !== true)
					        for (var j = 0; j < marked.length; j++) {
						        var rel_ele = marked[j];
						        var ent_id  = rel_ele.dataset.ent_id || false;
						        if (!ent_id) continue;
						        var SelfMvCombo        = Sm.Core.Identifier.identify(ent_id);
						        var relationship_index = rel_ele.dataset.relationship_index;
						        Sm.CONFIG.DEBUG && console.log(relationship_index);
						        prompt_settings.relationship_index = relationship_index;
						        var RelationshipIndex              = SelfMvCombo.relationships[relationship_index];
						        if (!RelationshipIndex) continue;
						        var position               = RelationshipIndex.locate(this.MvCombo.r_id, context_id);
						        var existent_relationships = SelfMvCombo.getRelationships(OtherMvCombo);
						        var Relationship;
						        if (existent_relationships && existent_relationships[relationship_index]) {
							        existent_relationships = existent_relationships[relationship_index];
							        if (existent_relationships.length === 1) Relationship = existent_relationships[0];
						        }
						        if (Relationship) {
							        Sm.CONFIG.DEBUG && console.log(RelationshipIndex._meta._list);
							        RelationshipIndex.move_item(OtherMvCombo.r_id, location == 'after' ? position + 1 : (position - 1) || 0, context_id)
							        Sm.CONFIG.DEBUG && console.log(RelationshipIndex._meta._list);
							        return Promise.resolve();
						        }
						        Sm.CONFIG.DEBUG && console.log(existent_relationships);
					        }
				        var relationships        = this.MvCombo.getRelationships(OtherMvCombo);
				        var entity               = Sm.Core.Meta.get_entity(this.MvCombo.type);
				        var Garage               = entity.Garage;
				        var relationship_indices = Object.keys(relationships);
				        var rels                 = [];
				        for (var i = 0; i < relationship_indices.length; i++) {
					        var rel_index = relationship_indices[i];
					        var pretty    = entity.Meta.get_relationship_type({type: 'name'}, rel_index);
					        rels.push([rel_index, pretty]);
				        }
				        var Meta = entity.Meta;
				        /*var template = Garage.generate('.relationship', this.MvCombo, {
				         synchronous: true, relationship_indices: Meta.get_possible_relationship_indices({
				         OtherMvCombo: OtherMvCombo
				         })
				         });*/
				        return this.prompt_add_relationship(prompt_settings)
			        },
			        _button_onclick:            function () {
				        var SelfView = this;
				        return function (e) {
					        var target  = e.target;
					        var $target = $(target);

					        var Relationship_Obj = SelfView.find_closest_relationship();
					        var Relationship_    = Relationship_Obj.Relationship;
					        var relElem          = Relationship_Obj.el;
					        var other_MV_type    = Relationship_Obj.other_MV_type;
					        var Wrapper_         = Sm.Entities[SelfView.type].Wrapper;

					        if (SelfView.queryPermission('edit') && $target.hasClass('edit') && $target.hasClass('button')) {
						        var edit_config = {};
						        if (Relationship_) {
							        edit_config.display_type                    = 'preview';
							        edit_config.SelfMvCombo                     = SelfView.MvCombo;
							        edit_config.relationship_object             = Relationship_Obj;
							        edit_config.relationship_object.SelfMvCombo = SelfView.MvCombo;

							        edit_config.alternative = Relationship_.Map;

						        }
//						        Wrapper_ = Relationship_ ? Sm.Entities[Relationship_.Map.type].Wrapper : Wrapper_;
						        Wrapper_.prompt('edit', SelfView.MvCombo, edit_config);
					        } else if ($target.hasClass('debug') && $target.hasClass('button') && Sm.CONFIG.DEBUG) {
						        Sm.CONFIG.DEBUG && console.log(SelfView.cid, ' -- ', SelfView.MvCombo, SelfView.MvCombo.Identity.r_id, SelfView.MvCombo.Model.attributes);
					        } else if (SelfView.queryPermission('relate') && $target.hasClass('add') && $target.hasClass('button')) {
						        SelfView.prompt_add_relationship();
					        } else if (SelfView.queryPermission('destroy') && $target.hasClass('delete') && $target.hasClass('button')) {
						        /** If self  is in a relationship container ... */
						        if (Relationship_) {
							        Relationship_.destroy({silent: false}).then(function () {
								        /** Check to see what we're deleting the section from [Section, Dictionary, ...] */
								        if (Relationship_.linked_entities) {
									        /** Always remove the View itself */
									        SelfView.destroy();
									        /** Then remove the relationship element */
									        relElem && relElem.parentNode.removeChild(relElem);
									        /** If we are deleting it from  a Section */
									        if (Relationship_.linked_entities[0] == 'Section' && Relationship_.linked_entities[1] == 'Section') {}
									        /** If we are deleting it from a Dictionary */
									        else if (Relationship_.linked_entities[0] == 'Dictionary' || Relationship_.linked_entities[1] == 'Dictionary') {}
								        }
							        });
						        } else {
							        Wrapper_.prompt('destroy', SelfView.MvCombo);
						        }

					        }
				        };
			        },
			        /**
			         * Initialize the standard procedure for dealing with the button controls on the side of the Entities
			         */
			        init_button_control_events: function () {
				        var button_control_element = this.get_rendered('button_control', true);
				        if (button_control_element && typeof button_control_element === "object") {
					        button_control_element.onclick = this._button_onclick();
				        }
			        },

			        /**
			         * Clone the View: duplicate the view and some of its properties/its element, register it with the MvCombo
			         * @return {Function}
			         */
			        clone:                         function () {
				        var clone_element = this.get_rendered('Element').cloneNode(true);
				        var constructor_  = this.prototype ? this.prototype.constructor : this.constructor;
				        var selfMvCombo   = this.MvCombo;
				        var type          = this.type;
				        var clonedView    = new constructor_({
					        type:    type,
					        MvCombo: selfMvCombo,
					        el:      clone_element
				        });
				        var self          = this;
				        Sm.loaded.when_loaded('Extras_Draggable', function () {
					        self.setDraggingStatus(false);
				        });
				        selfMvCombo.addView(clonedView, this.referenceElement);
				        return clonedView;
			        },
			        /**
			         * Handle to be used for the DraggableMixin
			         */
			        handle:                        true,
			        /**
			         * Set the element of the Backbone View. Also connects this object to it and sets the reference element
			         * @param element
			         */
			        setElement:                    function (element) {
				        element = Sm.Core.Abstraction.View.prototype.setElement.apply(this, arguments)
				        element && element.addEventListener('click', function () {
					        Sm.Core.SmView.emit('click', self.MvCombo);
				        });
			        },
			        renderDragMirror:              function (el, settings) {
				        settings = settings || {};
				        if (this.queryStatus('modal')) return false;
				        var clone                 = el.cloneNode(true);
				        var rect                  = el.getBoundingClientRect();
				        var wrap_thing            = document.createElement('div');
				        wrap_thing.style.position = 'absolute';
				        clone.style.width         = rect.width + 'px';
				        wrap_thing.appendChild(clone);
				        wrap_thing.className = 'sm-mirror';
				        return wrap_thing;
			        },
			        /**
			         * Sometimes the relationship needs to be prepared differently before we can use it effectively.
			         * This is a function that does that, needs work
			         * todo WTF?!?
			         * @param View                  {Sm.Core.SmView}         The View that is being wrapped
			         * @param relationship_index    {string}                 The relationship index being referenced
			         * @param Relationship_         {Sm.Core.Relationship}   The actual Relationship that is being referenced
			         * @param container_template    {string=}                A template to use for wrapping the element. First child is the wrap
			         * @see Sm.Core.Relationship
			         * @return {HTMLElement|Element|{get}}
			         */
			        wrap_element_for_relationship: function (View, relationship_index, Relationship_, container_template) {
				        return View.get_rendered('Element');
			        },
			        /**
			         * Find the closest parent element relative to this View that is defined a parent Element
			         * @return {{Relationship: *, el: *, other_MV_type: string|boolean}}
			         */
			        find_closest_relationship:     function () {
				        var self                        = this;
				        /**
				         * @type {Sm.Core.Relationship|boolean}
				         */
				        var Relationship_               = false;
				        var $closest_relationship_holder;
				        var default_relationship_object = {
					        Relationship:          false,
					        el:                    false,
					        other_MV_type:         false,
					        relationship_index:    false,
					        relationship_subindex: false
				        };
				        var relationship_r_id;
				        var SelfMvCombo;
				        var OtherMvCombo;
				        var other_mv_type               = false,
				            relationship_index          = false;
				        if (($closest_relationship_holder = this.$el.closest('[data-relationship-r_id]')) && $closest_relationship_holder.length) {
					        relationship_r_id = $closest_relationship_holder.data('relationship-r_id');
					        Relationship_     = Sm.Core.Identifier.identify({r_id: relationship_r_id});
				        } else if (($closest_relationship_holder = this.$el.closest('[data-relationship_index-r_id]')) && $closest_relationship_holder.length) {
					        var other_mv_ent_id = $closest_relationship_holder.data('ent_id');
					        relationship_index  = $closest_relationship_holder.data('relationship_index');
					        OtherMvCombo        = Sm.Core.Identifier.identify(other_mv_ent_id);
					        SelfMvCombo         = this.MvCombo;
					        if (!SelfMvCombo || !OtherMvCombo) return default_relationship_object;
					        var _potential_relationships = OtherMvCombo.getRelationships(SelfMvCombo, true);
					        if (_potential_relationships[relationship_index] && _potential_relationships[relationship_index].length === 1) {
						        Relationship_ = _potential_relationships[relationship_index][0];
					        } else {
						        Relationship_ = _potential_relationships;
					        }
				        } else {
					        return default_relationship_object;
				        }

				        if (Relationship_) {
					        if (Relationship_.linked_entities[0] != this.type)
						        other_mv_type = Relationship_.linked_entities[0];
					        else if (Relationship_.linked_entities[1] && Relationship_.linked_entities[1] != this.type)
						        other_mv_type = Relationship_.linked_entities[1];
					        else
						        other_mv_type = this.type;

					        OtherMvCombo      = Relationship_.get_Mv(this.MvCombo);
					        var Relationships = this.MvCombo.getRelationships(OtherMvCombo);
					        if (Relationships) {
						        for (var rel_ind in Relationships) {
							        if (!Relationships.hasOwnProperty(rel_ind)) continue;
							        if (!relationship_index && Relationships[rel_ind].length === 1) relationship_index = rel_ind;
							        else {
								        var arr = Relationships[rel_ind];
								        for (var i = 0; i < arr.length; i++) {
									        var _relationship = arr[i];
									        if (Relationship_.Identity.r_id === _relationship.Identity.r_id) {
										        relationship_index = rel_ind;
									        }
								        }
							        }
						        }
					        }
					        var subtype = Relationship_.Map.Model.get('relationship_subtype');
					        if (subtype) subtype = Sm.Core.Meta.get_relationship_type({sub: true, type: 'index'}, subtype);
				        }
				        return {
					        Relationship:          Relationship_,
					        el:                    $closest_relationship_holder[0],
					        other_MV_type:         other_mv_type,
					        relationship_index:    relationship_index,
					        relationship_subindex: subtype || false
				        }
			        },
			        /**
			         * Refresh the old element, replace it with a new one
			         */
			        replaceOldElement:             function () {
				        var old_el           = this.el;
				        var rendered_element = this.render({
					                                           display_type: this.display_type,
					                                           synchronous:  true
				                                           });
				        if (this.old_el && this.old_el != rendered_element && this.old_el.parentNode) {
					        this.old_el.parentNode.replaceChild(rendered_element, this.old_el);
				        }
				        this.old_el = old_el;
				        this.refresh_element(rendered_element);
				        this.refresh_all();
				        if (this.queryStatus('focused')) this.focus();
				        if (this.queryStatus('selected')) this.select();
				        return [this.el, rendered_element, old_el];
			        },

			        /**
			         * Focus the View
			         * @method
			         * @returns Sm.Core.SmView
			         */
			        focus:      function () {
				        //if (this.queryStatus('focused')) return this;
				        this.init_permissions({if_not_init: true});
				        this.setStatus('focused', true);
				        this.get_rendered('$Element').addClass('focused');
				        return this;
			        },
			        /**
			         * Blur the View
			         * @method
			         * @returns Sm.Core.SmView
			         */
			        blur:       function () {
				        //if (!this.queryStatus('focused')) return this;
				        this.setStatus('focused', false);
				        this.$el.removeClass('focused');
				        return this;
			        },
			        /**
			         * Select the View
			         * @method
			         * @returns Sm.Core.SmView
			         */
			        select:     function () {
				        this.setStatus('selected', true);
				        this.get_rendered('$Element').addClass('selected');
				        return this;
			        },
			        /**
			         * Deselect the View
			         * @method
			         * @returns Sm.Core.SmView
			         */
			        deselect:   function () {
				        this.setStatus('selected', false);
				        this.get_rendered('$Element').removeClass('selected');
				        return this;
			        },
			        /**
			         * Activate the View
			         * @method
			         * @returns Sm.Core.SmView
			         */
			        activate:   function () {
				        this.setStatus('active', true);
				        this.get_rendered('$Element').addClass('activated');
				        return this;
			        },
			        /**
			         * Deactivate the View
			         * @method
			         * @returns Sm.Core.SmView
			         */
			        deactivate: function () {
				        this.setStatus('active', false);
				        this.get_rendered('$Element').removeClass('activated');
				        return this;
			        },
			        /**
			         * Remove the View from existence
			         * @method
			         * @returns Sm.Core.SmView
			         */
			        destroy:    function () {
				        this.undelegateEvents();
				        this.$el.removeData().unbind();
				        this.remove();
				        this.MvCombo.removeView(this.cid);
				        Backbone.View.prototype.remove.call(this);
				        return this;
			        },

			        /**
			         * Based on the model, update this view
			         * @param {[]=} changed_attributes
			         * @return {Sm.Core.SmView}
			         */
			        update:                     function (changed_attributes) {
				        if (this.display_type.indexOf('modal') > -1) return this;
				        if (!this.MvCombo) return this;
				        this.model = this.model || this.MvCombo.Model;
				        if (!this.model) {
					        Sm.CONFIG.DEBUG && console.log("There was no model!");
					        return this;
				        }
				        if (!changed_attributes) {
					        this.init_elements();
					        changed_attributes = Object.keys(this.elements)
				        }
				        var type            = this.type.toLowerCase();
				        var type_identifier = type + '_type';
				        if (changed_attributes.indexOf(type_identifier) > -1) {
					        this.mark_unrendered();
					        this.replaceOldElement();
					        return this;
				        }

				        for (var i = 0; i < changed_attributes.length; i++) {
					        var name = changed_attributes[i];
					        this._updateElementFromProperty(name, this.get_rendered(name));
				        }
				        return this;
			        },
			        /**
			         * Update an element based on the properties of the Model it is based on
			         * @param model_property
			         * @param element
			         * @private
			         */
			        _updateElementFromProperty: function (model_property, element) {
				        if (!!element) {
					        var attr = this.model.get(model_property);
					        if (attr != undefined) {
						        element.innerHTML = this.model.escape(model_property);
					        }
				        }
			        },
		        });
		        /**
		         *
		         * @param parameters
		         * @param parameters.referenceElement
		         * @internal parameters.items
		         * @param parameters.replacement_MVs
		         * @param parameters.replaced_MVs   {Array<ViewHaver>}
		         * @return {*}
		         */
		        Sm.Core.SmView.replace_with_elements = function (parameters) {
			        var referenceElement = parameters.referenceElement;
			        var replaced_MVs     = parameters.replaced_MVs || [];
			        var replacement_MVs  = parameters.replacement_MVs || [];
			        var items            = parameters.items || {};
			        var forEachView      = typeof parameters.forEachView === "function" ? parameters.forEachView : false;

			        //If there are no relationships to VERB to, reject this as unsuccessful
			        if (!replacement_MVs.length) return Promise.reject('No replacement Views specified');
			        //-------------------
			        /** @type {Sm.Core.SmView} */
			        var RemovedFirstView;
			        /**
			         * Iterate through the Mvs that are being replaced and remove all of them but the last one, which we will save to append children after it.
			         * We remove that View later
			         */
			        for (var j = replaced_MVs.length; j--;) {
				        var replaced_MV_r_id = replaced_MVs[j];
				        /** @type {Sm.Core.MvCombo} */
				        var RemovedMV        = items[replaced_MV_r_id] || Sm.Core.Identifier.identify(replaced_MV_r_id);
				        if (!RemovedMV) continue;
				        /** @type {Sm.Core.SmView} */
				        var ReplacedView = RemovedMV.getView({strict: true, reference_element: referenceElement});
				        if (!ReplacedView) continue;
				        if (!RemovedFirstView && ReplacedView) {
					        RemovedFirstView = ReplacedView;
					        continue;
				        }
				        ReplacedView.remove();
			        }
			        /** @type {Promise} First Promise, meant to be used as the starter value for that reduce Array function*/
			        var first_promise            = Promise.resolve(RemovedFirstView);
			        /** @type {boolean} A simple check to see whether or not the RemovedFirstView has been removed from the screen yet*/
			        var has_been_removed         = false;
			        /** @type {Sm.Core.SmView}  The first View from that one array, Adding sections after this one is the game.*/
			        var FirstView;
			        /**
			         * The function that is run for each View. This takes a promise as a parameter and follows it up by rendering itself and appending itself after the previous element
			         * @param {Promise|*|{then:function}}           last_promise
			         * @param {Sm.Core.MvCombo}                     ReplacementMvCombo
			         * @param                                       currentIndex
			         * @return {Promise<Sm.Core.SmView>}
			         */
			        var array_reduction_function = function (last_promise, ReplacementMvCombo, currentIndex) {
				        if (!currentIndex && !ReplacementMvCombo) return last_promise;
				        if (typeof ReplacementMvCombo === "string") {
					        if (items[ReplacementMvCombo])
						        ReplacementMvCombo = items[ReplacementMvCombo];
					        else {
						        var RepIdentity = Sm.Core.Identifier.retrieve(ReplacementMvCombo);
						        if (RepIdentity) ReplacementMvCombo = RepIdentity.getResource();
					        }
				        }
				        if (!ReplacementMvCombo || !ReplacementMvCombo.getView) return last_promise;
				        /** @type {Sm.Core.SmView} The View in question */
				        var CurrentView = ReplacementMvCombo.getView({reference_element: referenceElement});
				        if (!CurrentView) return last_promise;
				        /**
				         *
				         * @param PreviousView {Sm.Core.SmView} The View that we dealt with before this one
				         * @return {Promise<Sm.Core.SmView>}
				         */
				        var for_this_view = function (PreviousView) {
					        //Asynchronously render the View, refresh the View's components, and insert it on the screen after the PreviousView
					        return CurrentView.render({
						                                  if_not_rendered: true,
						                                  synchronous:     false
					                                  }).then(function (el) {
						        CurrentView.refresh_all();
						        if (!PreviousView) Sm.CONFIG.DEBUG && console.log("Previous View does not exist ", PreviousView, CurrentView);
						        var last_el = PreviousView.el;
						        //this is where we are appending the View
						        Sm.Core.util.insertAfter(CurrentView.el, last_el);
						        CurrentView.referenceElement = el.parentNode;
						        CurrentView.mark_added();
						        //Remove the View that we haven't removed yet, say that we have removed it
						        if (!has_been_removed && PreviousView.cid == RemovedFirstView.cid) {
							        RemovedFirstView.remove();
							        has_been_removed = true;
						        }
						        //If the First View has not been declared, mark this one as it and carry on
						        if (!FirstView) FirstView = CurrentView;
						        if (forEachView) forEachView.call(CurrentView);
						        return CurrentView;
					        }).catch(function (res) {
						        Sm.CONFIG.DEBUG && console.log('smview,arf,ftw,3', res, PreviousView);
						        return PreviousView;
					        });

				        };
				        return last_promise.then(for_this_view);
			        };
			        return replacement_MVs.reduce(array_reduction_function, first_promise).then(function () {
				        //Focus the First View
				        FirstView && FirstView.MvCombo.focus(FirstView);
				        return true;
			        });
		        };

		        Emitter.mixin(Sm.Core.SmView);
		        Sm.loaded.add('Core_SmView');
//-----------------------------------------------------------------------------------------------------------
		        //Initialize the global events
		        (function (document) {
			        /** @type {int|boolean} */
			        var timer           = false;
			        var prompt_deletion = function (what_we_gon_delete) {
				        var end_arr = [];
				        for (var i = 0; i < what_we_gon_delete.length; i++) {
					        var Identity = what_we_gon_delete[i];
					        end_arr.push(Identity.ent_id ? Identity.type + ': ' + Identity.ent_id : Identity.type + ": " + (Identity.id ? Identity.id : Identity.r_id));
				        }
				        if (end_arr.length && confirm("Are you sure you want to delete " + end_arr.join(', ')))
					        return Promise.resolve();
				        return Promise.reject();
			        };

			        var on_delete_press = function () {
				        Sm.CONFIG.DEBUG && console.log('Not yet implemented');
				        return false;
				        var selected  = Sm.Core.Meta.MvMaps.selected_MVs;
				        var to_remove = [];
				        for (var r_id in selected) {
					        if (!selected.hasOwnProperty(r_id)) continue;
					        /** @type {Sm.Core.MvCombo} Selected MvCombo */
					        var MvCombo        = selected[r_id].getResource();
					        var Views          = MvCombo.ViewMaps.selected_Views;
					        var has_been_added = false;
					        for (var view_cid in Views) {
						        if (!Views.hasOwnProperty(view_cid)) continue;
						        var selected_View       = Views[view_cid].getResource();
						        var relationship_object = selected_View.find_closest_relationship();
						        /** @type {Sm.Core.Relationship}  */
						        var Relationship;
						        if (relationship_object && (Relationship = relationship_object.Relationship)) {
							        to_remove.push(Relationship.Identity);
						        } else {
							        if (!has_been_added) to_remove.push(MvCombo.Identity);
						        }
					        }
				        }
				        prompt_deletion(to_remove).then(function () {
					        for (var i = 0; i < to_remove.length; i++) {
						        var Identity = to_remove[i];
						        var Resource = Identity.getResource();
						        Resource.destroy({silent: false});
					        }
				        });
				        Sm.CONFIG.DEBUG && console.log(to_remove);

			        };
			        document.addEventListener('keydown', function (e) {
				        if (e.keyCode == 76 && e.shiftKey) {
					        if (timer == false) {
						        timer = setTimeout(function () {
							        timer = false;
						        }, 500);
					        } else {
						        timer = false;
						        clearTimeout(timer);
						        Sm.CONFIG.DEBUG && console.log(' ---------------------------------------- ');
						        Sm.CONFIG.DEBUG && console.log(' ');
					        }
				        } else if (e.keyCode == 46) {
					        //If we are deleting
					        on_delete_press();
				        }
			        });
			        document.addEventListener('keyup', function (e) {
				        if (e.keyCode == 16) {
					        if (timer !== false) {
						        clearTimeout(timer);
						        timer = false;
					        }
				        }
			        });
		        })(document);
	        });
        });