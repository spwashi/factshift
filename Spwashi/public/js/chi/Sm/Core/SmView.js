/**
 * Created by Sam Washington on 12/17/15.
 */
require(['require', 'backbone', 'jquery',
        'underscore', 'Cocktail',
        'Sm-Entities-Abstraction-Modal-ModalEdit',
        'Sm-Entities-Abstraction-Modal-AddRelationship',
        'Sm-Entities-Abstraction-Modal-ModalDestroy'],
        /**
         * @lends Cocktail
         * @lends Backbone
         * @lends $
         * @lends _
         */
        function (require, Backbone, $, _, Cocktail) {
            require(['require', 'Sm/Extras/DraggableMixin'], function () {});
            require(['require', 'Sm/Extras/Modal'], function () {});
            var Sm                               = window.Sm;
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
            Sm.Core.SmView                       = Backbone.View.extend({
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
                        Sm.CONFIG.DEBUG && console.log(this);
                    }
                },
                /**
                 * This is what's used to override the default, useful for inheriting classes
                 * @alias Sm.Core.SmView.additional_events
                 */
                additional_events: {
                    click: function () {
                        Sm.CONFIG.DEBUG && console.log(this);
                    }
                },

                setPermission:   function (permission, value) {
                    if (typeof permission === "string") {
                        this._permissions[permission] = value;
                    } else if (typeof permission === "object") {
                        for (var name in permission) {
                            if (!permission.hasOwnProperty(name)) continue;
                            this.setPermission(name, permission[name])
                        }
                    }
                },
                setStatus:       function (status, value) {
                    this.status = this.status || {};
                    if (typeof status === "string") {
                        this.status[status] = value;
                    } else if (typeof status === "object") {
                        for (var name in status) {
                            if (!status.hasOwnProperty(name)) continue;
                            this.setStatus(name, status[name])
                        }
                    }
                },
                queryPermission: function (permission) {
                    if (!this.MvCombo) return false;
                    if (permission == 'relate') permission = 'edit';
                    if (permission in this._permissions)
                        return this._permissions[permission];
                    var res = this.MvCombo.queryPermission(permission);
                    if (res != null) this._permissions[permission] = res;
                    return permission in this._permissions ? this._permissions[permission] : null;
                },
                queryStatus:     function (status) {
                    if (!this.MvCombo) return null;
                    if (status == 'relate') status = 'edit';
                    if (status in this.status)
                        return this.status[status];
                    var res = this.MvCombo.queryStatus(status);
                    if (res != null) this.status[status] = res;
                    return status in this.status ? this.status[status] : null;
                },


                /**
                 * Return the outerHTML for the View's element
                 * @return {string}
                 */
                outerHTML:        function () {
                    return this.get_rendered('Element').outerHTML;
                },
                /**
                 *
                 * @param {{}=}             settings
                 * @param {boolean=false}   settings.if_not_init
                 * @return {Sm.Core.SmView}
                 */
                init_permissions: function (settings) {
                    if (!this.MvCombo) return this;
                    settings                        = settings || {};
                    if (this.status.is_permissions_init && !!settings.if_not_init) return this;
                    this.queryPermission('destroy') && this.$el.addClass('can-delete');
                    this.queryPermission('view') && this.$el.addClass('can-view');
                    this.queryPermission('relate') && this.$el.addClass('can-relate');
                    this.queryPermission('edit') && this.$el.addClass('can-edit');
                    this.queryPermission('edit') && this.$el.addClass('can-drag');
                    this.queryPermission('focus') && this.$el.addClass('can-focus');
                    this.status.is_permissions_init = true;
                    return this;
                },
                /**
                 * Initialize the View
                 * @param settings
                 * @param {HTMLElement}     settings.el
                 * @param {Backbone.Model}  settings.model
                 * @param {string}          settings.display_type
                 */
                initialize:       function (settings) {
                    settings                  = settings || {};
                    this.object_type          = "SmView";
                    _.extend(this, Backbone.Events);
                    this.elements             = {};
                    /**
                     * @alias Sm.Core.SmView#_rendering_callbacks
                     * @type {{}}
                     * @private
                     */
                    this._rendering_callbacks = this._rendering_callbacks || {};
                    this._permissions         = {};
                    this._cache               = {};
                    /**
                     * @private
                     * @type {{}}
                     */
                    this.status               = {};
                    /**
                     * When we got to this View through another MvCombo, this is an array that keeps track of that movement
                     * * rel_type.[rel_subtype].MvCombo_r_id
                     * * pivots.eli5.sec_xxxxxxxxxxxxxxxxxxxxx
                     * @type {Array}
                     */
                    this.reference_to         = [];
                    var self                  = this;
                    var self_type             = this.type;
                    this.Identity             = Sm.Core.Identifier.get_or_init({
                        id:       false,
                        r_id:     self.cid,
                        type:     self_type + 'View',
                        Resource: self
                    });
                    if (!!settings.el) {
                        this.setStatus({
                            rendered:     true,
                            up_to_date:   true,
                            init_from_el: true,
                        });
                        settings.el.sm_View = this;
                        settings.el.parentNode && (this.referenceElement = settings.el.parentNode);
                        this.old_el         = settings.el;
                        this.init_elements();
                        if (this.Identity) settings.el.dataset.view_r_id = this.Identity.r_id;
                    }
                    if (!!settings.model) {
                        this.setStatus('has_model', true);
                    }

                    //noinspection JSValidateTypes
                    /**
                     * A hash of properties of this View that have to be changed. IDKY it's here, but I'm sure it's a good idea.
                     * @type {Array}
                     * @private
                     */
                    this._to_update                = [];
                    /**
                     * A list of Views by relationship type that are related. {'relationship_index'=>{...r_id=>View...}}
                     * @type {{}}
                     * @private
                     */
                    this._relationships            = {};
                    this._reciprocal_relationships = {};
                    /**
                     *
                     * @type {HTMLElement|SmView}   _parent_reference
                     * @private
                     */
                    /**
                     * The MvCombo that is attached to this View
                     * @type {*|Sm.Core.Relationship|null}
                     */
                    this.MvCombo = settings.MvCombo || null;

                    this.display_type = settings.display_type ? settings.display_type : (this.display_type ? this.display_type : 'full');
                    this.setStatus('modal', (this.display_type.indexOf("modal") >= 0));
                    _.extend(this, Backbone.Events);
                    Sm.loaded.when_loaded('Extras_Draggable', function () {
                        Sm.Extras.Draggable.mixin.call(self, {
                            can_start:  function () {
                                return Sm.CONFIG.DRAG_MODE && !self.queryStatus('modal');
                            },
                            can_accept: function (dragged, data) {
                                return true;
                            },
                            data:       self
                        });
                        var el = settings.el || self.el;
                        self.makeElementDraggable && self.makeElementDraggable(settings.el || self.el, true);
                    }, '_SmView_Init', 20000);
                    this.init_button_control_events();
                },


                /**
                 * Render all of the elements of this View
                 */
                init_elements:  function () {
                    var elements = this._rendering_callbacks;
                    for (var name in elements) {
                        if (!elements.hasOwnProperty(name)) continue;
                        this.get_rendered(name);
                    }
                },
                /**
                 * Get the events of the View
                 * @see {Backbone.View}
                 * @return {*}
                 */
                events:         function () {
                    this.initial_events    = this.initial_events || {};
                    this.additional_events = this.additional_events || {};
                    return Sm.Core.util.merge_objects(this.initial_events, this.additional_events);
                },
                /**
                 * Set the MvCombo of the View
                 * @param Mv
                 */
                setMvCombo:     function (Mv) {
                    if (!Mv) return;
                    this.MvCombo = Mv;
                },
                delegateEvents: function () {
                    return Backbone.View.prototype.delegateEvents.apply(this, arguments);
                },
                remove:         function () {
                    this.MvCombo.blur(this);
                    this.setStatus('rendered', false);
                    this.mark_unrendered();
                    this.undelegateEvents();
                    return Backbone.View.prototype.remove.apply(this, arguments);
                },
                /**
                 * Refresh all of the Views that are related to this
                 * @param settings
                 * @param {Array=}      ignore      An array of CID's to ignore (prolly because they've already been rendered)
                 * @returns {Sm.Core.SmView}
                 */
                refresh_all:    function (settings, ignore) {
                    settings    = settings || {};
                    ignore      = ignore || [];
                    var Element = this.get_rendered('Element');
                    this.delegateEvents(this.events());
                    var self    = this;

                    var MvCombo = this.MvCombo;
                    if (!MvCombo) return this;
                    var refresh               = function (relationship_index, holder_element) {
                        if (relationship_index && !!holder_element) {
                            holder_element.innerHTML = '';
                            //iterate through this backwards to avoid any positioning mistakes
                            for (var i = relationship_index._meta._list.length; i--;) {
                                var rel_r_id = relationship_index._meta._list[i];
                                self.add_relationship({
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

                /**
                 * Identify the View as unrendered. Useful for seeing if it's on the screen properly
                 */
                mark_unrendered: function () {
                    this.setStatus({
                        rendered:         false,
                        permissions_init: false
                    });
                    var elements = this.elements;
                    for (var index in elements) {
                        if (!elements.hasOwnProperty(index)) continue;
                        elements[index] = null;
                    }
                },
                mark_added:      function () {
                    this.setStatus({
                        rendered: true
                    });
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
                    var MvCombo_    = this.MvCombo;
                    var self_type   = this.type;
                    var self        = this;

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
                 * @alias Sm.Core.SmView#get_rendered
                 * @param what
                 * @return {*}
                 * @param no_cache
                 */
                get_rendered:    function (what, no_cache) {
                    if (!what) return false;
                    if (what == 'Element') {
                        if (!this.queryStatus('rendered')) {
                            (this.render({
                                synchronous:     true,
                                if_not_rendered: true
                            }));
                        }
                        return this.el;
                    } else if (what == '$Element') {
                        return (this.$el = $(this.get_rendered('Element')));
                    }
                    if (this._rendering_callbacks[what]) {
                        var w_grand_scheme_of_things = what.replace(/rendered_|_element/, "");
                        if (this.elements[w_grand_scheme_of_things] && no_cache) {
                            delete this.elements[w_grand_scheme_of_things];
                        }
                        return this._rendering_callbacks[what].call(this);
                    }
                    if (what.indexOf('_element') < 0) what += '_element';
                    if (this._rendering_callbacks[what]) return this._rendering_callbacks[what].call(this);
                    if (what.indexOf('rendered_') < 0) what = 'rendered_' + what;
                    if (this._rendering_callbacks[what]) return this._rendering_callbacks[what].call(this);
                    return false;
                },

                /**
                 * Start the process to adding a relationship based an existing other View or MvCombo. This adds the relationship on the server
                 * @param {{}=}settings
                 * @param settings.View     {Sm.Core.SmView=}   If we know the View that is being added to this one, use it
                 * @param settings.type     {string=}           The Entity type that we are going to be adding
                 * @param settings.MvCombo  {}
                 * @return {*}
                 */
                begin_add_relationship: function (settings) {
                    settings = settings || {};
                    var View_, MvCombo_;
                    if (!!settings.View) {
                        View_    = settings.View;
                        MvCombo_ = settings.MvCombo || View_.MvCombo;
                    } else if (!!settings.MvCombo) {
                        MvCombo_ = settings.MvCombo;
                        View_    = MvCombo_.getView({reference_element: this.referenceElement});
                    }
                    var self = this;

                    /**
                     * Create the Relationship on the server
                     */
                    return this.MvCombo.add_relationship(MvCombo_, {
                        type:      settings.type,
                        OtherView: View_,
                        prompt:    !!settings.prompt
                    }).catch(function (e) {
                        /**
                         * todo temporary
                         * Catch the error, log it, throw it
                         */
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
                                reg_obj[self_map_index]  = self;
                                reg_obj[other_map_index] = otherView || View_;
                                Relationship_.register_view_relationship(reg_obj);
                                self.add_relationship({
                                    render:            true,
                                    Relationship:      Relationship_,
                                    RelationshipIndex: RelationshipIndex_
                                }).catch(function (error) {
                                    Sm.CONFIG.DEBUG && console.log('error - ', error);
                                });
                            }
                            return result;
                        }
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
                                /**NOTE: saving mechanism**/
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
                 * todo comment this, Sam
                 * @return {Promise|boolean|*}
                 */
                add_relationship:       function (settings) {
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
                        settings.is_reciprocal  = true;
                        settings.render         = false;
                        settings.map_index      = other_map_index;
                        settings.self_map_index = self_map_index;
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
                    position = (position || 0);
                    var P    = Promise.resolve([null]);

                    //In some cases, we are doing this for the future and might not need to actually render the Relationship yet.
                    //We could also be doing some behind the scenes stuff and need to know what something is related to. Either way, this is where we leave if we aren't rendering
                    if (!render) return P;

                    var otherElement = this.wrap_element_for_relationship(OtherView, relationship_type_index, Relationship_, container_template);
                    var selfElement  = this.get_rendered('Element');
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
                        Sm.CONFIG.DEBUG && console.log(Refs, other_r_id);
                        if (Refs) {
                            return Sm.Core.SmView.replace_with_elements({
                                referenceElement:          self_index_element,
                                replacement_MVs:           Refs.MVs,
                                replaced_MVs:              [other_r_id],
                                replaced_relationships:    [],
                                replacement_relationships: []
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
                 * @return {*}
                 */
                accept_drop:            function (droppedView) {
                    return this.begin_add_relationship({View: droppedView})
                },

                /**
                 * Initialize the standard procedure for dealing with the button controls on the side of the Entities
                 */
                init_button_control_events: function () {
                    var self                   = this;
                    var button_control_element = this.get_rendered('button_control', true);
                    //Sm.CONFIG.DEBUG && console.log(button_control_element);
                    if (button_control_element && typeof button_control_element === "object") {
                        button_control_element.onclick = function (e) {
                            var target  = e.target;
                            var $target = $(target);

                            var Relationship_Obj = self.find_closest_relationship();
                            var Relationship_    = Relationship_Obj.Relationship;
                            var relElem          = Relationship_Obj.el;
                            var other_MV_type    = Relationship_Obj.other_MV_type;

                            if (self.queryPermission('edit') && $target.hasClass('edit') && $target.hasClass('button')) {
                                var edit_config = {};
                                if (Relationship_) {
                                    edit_config.display_type        = 'preview';
                                    edit_config.relationship_object = {
                                        Relationship:  Relationship_,
                                        other_MV_type: other_MV_type
                                    }
                                }
                                self.prompt_edit(edit_config);
                            } else if ($target.hasClass('debug') && $target.hasClass('button') && Sm.CONFIG.DEBUG) {
                                Sm.CONFIG.DEBUG && console.log(self.cid, ' -- ', self.MvCombo, self.MvCombo.Identity.r_id, self.MvCombo.Model.attributes);
                            } else if (self.queryPermission('relate') && $target.hasClass('add') && $target.hasClass('button')) {
                                self.begin_add_relationship();
                            } else if (self.queryPermission('destroy') && $target.hasClass('delete') && $target.hasClass('button')) {
                                /** If self  is in a relationship container ... */
                                if (Relationship_) {
                                    Relationship_.destroy({silent: false}).then(function () {
                                        /** Check to see what we're deleting the section from [Section, Dictionary, ...] */
                                        if (Relationship_.linked_entities) {
                                            /** Always remove the View itself */
                                            self.destroy();
                                            /** Then remove the relationship element */
                                            relElem && relElem.parentNode.removeChild(relElem);
                                            /** If we are deleting it from  a Section */
                                            if (Relationship_.linked_entities[0] == 'Section' && Relationship_.linked_entities[1] == 'Section') {}
                                            /** If we are deleting it from a Dictionary */
                                            else if (Relationship_.linked_entities[0] == 'Dictionary' || Relationship_.linked_entities[1] == 'Dictionary') {}
                                        }
                                    });
                                } else {
                                    self.MvCombo.destroy({prompt: true}, self);
                                }

                            }
                        }
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
                    element && (element = element[0] || element);
                    element && (element.sm_View = this);
                    if (this.Identity) {
                        element.dataset.view_r_id = this.Identity.r_id;
                    }
                    /**
                     * An element (usually the parent) of this element that can be used as a reference.
                     * When trying to get another view, check to see if this node is its reference.
                     * @type {Node|null}
                     */
                    this.referenceElement = element.parentNode ? element.parentNode : null;
                    var self              = this;
                    Backbone.View.prototype.setElement.apply(this, arguments);
                    this.init_permissions();
                    Sm.loaded.when_loaded('Extras_Draggable', function () {
                        self.makeElementDraggable && self.makeElementDraggable(null, self.handle || self.handle === undefined ? self.handle : true);
                    }, '_SmView_SetElement', 20000);
                },
                renderDragMirror:              function (el) {
                    if (this.queryStatus('modal')) return false;
                    var clone                 = el.cloneNode(true);
                    var rect                  = clone.getBoundingClientRect();
                    var wrap_thing            = document.createElement('div');
                    wrap_thing.style.position = 'absolute';
                    clone.style.width         = rect.width + 'px';
                    wrap_thing.appendChild(clone);
                    wrap_thing.className      = 'sm-mirror';
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
                    var $closest_relationship_holder = this.$el.closest('[data-relationship-r_id]');
                    var self                         = this;
                    var Relationship_                = false;
                    if ($closest_relationship_holder.length) {
                        var relationship_r_id = $closest_relationship_holder.data('relationship-r_id');
                        Relationship_         = Sm.Core.Identifier.identify({r_id: relationship_r_id});
                    }
                    var other_relationship_type = false;
                    if (Relationship_) {
                        if (Relationship_.linked_entities[0] != this.type) {
                            other_relationship_type = Relationship_.linked_entities[0];
                        } else if (Relationship_.linked_entities[1] && Relationship_.linked_entities[1] != this.type) {
                            other_relationship_type = Relationship_.linked_entities[1];
                        }
                    }
                    return {
                        Relationship:  Relationship_,
                        el:            $closest_relationship_holder[0],
                        other_MV_type: other_relationship_type
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
                    Sm.CONFIG.DEBUG && console.log("removing - ", this.cid);
                    this.$el.removeData().unbind();
                    this.remove();
                    this.MvCombo.removeView(this.cid);
                    Backbone.View.prototype.remove.call(this);
                    return this;
                },

                /**
                 * Open up a Modal dialog for editing the Entity
                 * @param settings
                 */
                prompt_edit: function (settings) {
                    settings              = settings || {};
                    settings.display_type = settings.display_type || 'full';
                    var MvCombo_          = this.MvCombo;
                    if (!MvCombo_) return;
                    var selected = Sm.Core.Meta.get_MVs('selected');
                    var MvCombos = [];
                    for (var mv_combo_r_id in selected) {
                        if (!selected.hasOwnProperty(mv_combo_r_id)) continue;
                        /**
                         * @type Sm.Core.Identifier
                         */
                        var Identity = selected[mv_combo_r_id];
                        MvCombos.push(Identity.getResource())
                    }
                    var type =
                            Sm.Entities[this.type].Abstraction &&
                            Sm.Entities[this.type].Abstraction.Modal &&
                            Sm.Entities[this.type].Abstraction.Modal.Edit
                                ? Sm.Entities[this.type].Abstraction.Modal.Edit
                                : Sm.Entities.Abstraction.Modal.Edit;

                    var Modal = new type({
                        MvCombo:             [MvCombo_],
                        self_type:           MvCombo_.type,
                        display_type:        settings.display_type,
                        relationship_object: settings.relationship_object
                    });
                    this.blur();
                    Modal.open();
                },

                /**
                 * Based on the model, update this view
                 * @param {[]=} changed_attributes
                 * @return {Sm.Core.SmView}
                 */
                update:                          function (changed_attributes) {
                    if (this.display_type.indexOf('modal') > -1) return this;
                    if (!this.MvCombo) return this;
                    this.model          = this.model || this.MvCombo.Model;
                    if (!this.model) {
                        Sm.CONFIG.DEBUG && console.log("There was no model!");
                        return this;
                    }
                    if (!changed_attributes) {
                        this.init_elements();
                        changed_attributes = Object.keys(this.elements)
                    }
                    Sm.CONFIG.DEBUG && console.log('SmView,update,2', changed_attributes);
                    var type            = this.type.toLowerCase();
                    var type_identifier = type + '_type';
                    Sm.CONFIG.DEBUG && console.log('SmView,update,2', type_identifier);
                    if (changed_attributes.indexOf(type_identifier) > -1) {
                        this.mark_unrendered();
                        this.replaceOldElement();
                        return this;
                    }

                    for (var i = 0; i < changed_attributes.length; i++) {
                        var name = changed_attributes[i];
                        this._updateElementFromModelProperty(name, this.get_rendered(name));
                    }
                    return this;
                },
                /**
                 * Update an element based on the properties of the Model it is based on
                 * @param model_property
                 * @param element
                 * @private
                 */
                _updateElementFromModelProperty: function (model_property, element) {
                    if (!!element) {
                        var attr = this.model.get(model_property);
                        if (attr != undefined) {
                            element.innerHTML = this.model.escape(model_property);
                        }
                    }
                },

                /**
                 * Keep a version of a function named to be referenced otherwise, useful for referencing functions with a "this" attribute bound to them.
                 * @param name      The name of the function that we are dealing with
                 * @param fn        The function that we are naming/binding
                 * @param _self     What are we binding to the function? Defaults to this
                 * @return {*}
                 */
                add_bound: function (name, fn, _self) {
                    this._fns = this._fns || {};
                    if (!(typeof fn === "function") && !this._fns[name]) {
                        Sm.CONFIG.DEBUG && console.log(fn, name);
                        return function () {};
                    }
                    return this._fns[name] = this._fns[name] || fn.bind(_self || this);
                },
                /**
                 *
                 * @param name    {string}  The name of the function that we are looking for
                 * @param strict  {boolean=false} If we don't find the function, should we return false (strict) or a dummy function (not strict)
                 * @return {*}
                 */
                get_bound: function (name, strict) {
                    this._fns = this._fns || {};
                    return this._fns[name] ? this._fns[name] : (strict ? false : function () {}.bind(this));
                }
            });
            Sm.Core.SmView.replace_with_elements = function (parameters) {
                var referenceElement          = parameters.referenceElement;
                var replaced_MVs              = parameters.replaced_MVs || [];
                var replacement_MVs           = parameters.replacement_MVs || [];
                var replaced_relationships    = parameters.replaced_relationships || [];
                var replacement_relationships = parameters.replacement_relationships || [];
                var items                     = parameters.items || {};
                var forEachView               = typeof parameters.forEachView === "function" ? parameters.forEachView : false;

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
                    if (!RemovedFirstView) {
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
                    if (!ReplacementMvCombo || !ReplacementMvCombo.getView) {
                        return last_promise;
                    }
                    /** @type {Sm.Core.SmView} The View in question */
                    var CurrentView   = ReplacementMvCombo.getView({reference_element: referenceElement});
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
                            if (!PreviousView) {
                                Sm.CONFIG.DEBUG && console.log("Previous View does not exist ", PreviousView, CurrentView);
                            }
                            var last_el                  = PreviousView.el;
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
                            Sm.CONFIG.DEBUG && console.log(res);
                            throw res;
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