/**
 * Created by Sam Washington on 9/17/16.
 */
require(['require', 'backbone', 'jquery',
         'underscore', 'Cocktail', 'Emitter',
         'Sm-Entities-Abstraction-Modal-ModalEdit',
         'Sm-Entities-Abstraction-Modal-AddRelationship',
         'Sm-Entities-Abstraction-Modal-ModalDestroy'],
    /**
     * @lends Cocktail
     * @lends Backbone
     * @lends $
     * @lends _
     */
    function (require, Backbone, $, _, Cocktail, Emitter) {
        require(['require', 'Sm/Extras/DraggableMixin'], function () {});
        require(['require', 'Sm/Extras/Modal'], function () {});

        Sm.Core.Abstraction                               = Sm.Core.Abstraction || {};
        Sm.Core.Abstraction.View                          = Backbone.View.extend({
            type:              '',
            identifier:        '',
            /**
             * An object used to keep track of the elements of the View
             * (name => Element)
             *
             */
            elements:          {},
            /**
             * Default events of the Views
             */
            initial_events:    {},
            /**
             * This is what's used to override the default, useful for inheriting classes
             * @alias Sm.Core.Abstraction.View.additional_events
             */
            additional_events: {},
            handle:            true,
            ReferencedObject:  {},

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
                this._permissions = this._permissions || {};
                return (permission in this._permissions) ? this._permissions[permission] : false;
            },
            queryStatus:     function (status) {
                return status in this.status ? this.status[status] : null;
            },

            /**
             * Return the outerHTML for the View's element
             * @return {string}
             */
            outerHTML:           function () {
                return this.get_rendered('Element').outerHTML;
            },
            /**
             * Based on the Permissions that we already know about hte View, reflect them on the View
             * @param {{}=}             settings
             * @param {boolean=false}   settings.if_not_init
             * @return {Sm.Core.Abstraction.View}
             */
            init_permissions:    function (settings) {
                settings    = settings || {};
                this.status = this.status || {};
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
            setReferencedObject: function (RefObj) {
                this.ReferencedObject = RefObj;
            },
            initialize:          function (settings) {
                settings              = settings || {};
                this.ReferencedObject = settings.MvCombo || settings.ReferencedObject || false;
                this.object_type      = 'View';
                this.elements         = {};
                /**
                 * @alias Sm.Core.Abstraction.View#_rendering_callbacks
                 * @type {{}}
                 * @private
                 */
                this._rendering_callbacks = this._rendering_callbacks || {};
                this._permissions = {};
                this._cache       = {};
                /**
                 * @private
                 * @type {{}}
                 */
                this.status = {};

                var self      = this;
                var self_type = this.type;
                _.extend(this, Backbone.Events);
                this.Identity = Sm.Core.Identifier.get_or_init({
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
                    this.old_el = settings.el;
                    this.init_elements();
                    if (this.Identity) settings.el.dataset.view_r_id = this.Identity.r_id;
                }
                /**
                 * A hash of properties of this View that have to be changed. IDKY it's here, but I'm sure it's a good idea.
                 * @type {Array}
                 * @private
                 */
                this._to_update = [];
                this.display_type = settings.display_type ? settings.display_type : (this.display_type ? this.display_type : 'full');
                this.setStatus('modal', (this.display_type.indexOf("modal") >= 0));
                _.extend(this, Backbone.Events);

                Sm.loaded.when_loaded('Extras_Draggable', function () {
                    Sm.Extras.Draggable.mixin.call(self, {
                        can_reorder: true,
                        can_start:   function () {
                            return Sm.CONFIG.DRAG_MODE && !self.queryStatus('modal');
                        },
                        can_accept:  function (dragged, data) {
                            return true;
                        },
                        check_mark:  function (ele) {
                            return ele.className.indexOf('relationship-container') > -1;
                        },
                        data:        self
                    });
                    var el = settings.el || self.el;
                    self.makeElementDraggable && self.makeElementDraggable(settings.el || self.el, true);
                }, '_SmView_Init', 20000);
                this.init_button_control_events();
            },

            /**
             * Get the events of the View
             * @see {Backbone.View}
             * @return {*}
             */
            events:          function () {
                this.initial_events    = this.initial_events || {};
                this.additional_events = this.additional_events || {};
                return Sm.Core.util.merge_objects(this.initial_events, this.additional_events);
            },
            remove:          function () {
                this.setStatus('rendered', false);
                this.mark_unrendered();
                this.undelegateEvents();
                return Backbone.View.prototype.remove.apply(this, arguments);
            },
            /**
             * Render all of the elements of this View
             */
            init_elements:   function () {
                var elements = this._rendering_callbacks;
                for (var name in elements) {
                    if (!elements.hasOwnProperty(name)) continue;
                    this.get_rendered(name);
                }
            },
            setElement:      function (element) {
                element && (element = element.jquery ? element[0] || false : element);
                element && (element.sm_View = this);
                if (!element) {
                    Sm.CONFIG.DEBUG && console.log('no element', arguments);
                    return false;
                }
                if (this.Identity) {
                    if (!element.dataset) {
                        Sm.CONFIG.DEBUG && console.log(element);
                        element.dataset = {};
                    }
                    element.dataset.view_r_id = this.Identity.r_id;
                }
                /**
                 * An element (usually the parent) of this element that can be used as a reference.
                 * When trying to get another view, check to see if this node is its reference.
                 * @type {Node|null}
                 */
                this.referenceElement = element.parentNode ? element.parentNode : null;
                var self = this;
                Backbone.View.prototype.setElement.apply(this, arguments);
                this.init_permissions();
                Sm.loaded.when_loaded('Extras_Draggable', function () {
                    self.makeElementDraggable && self.makeElementDraggable(null, self.handle || self.handle === undefined ? self.handle : true);
                }, '_SmView_SetElement', 20000);
                return element;
            },
            delegateEvents:  function () {
                return Backbone.View.prototype.delegateEvents.apply(this, arguments);
            },
            /**
             * Refresh all of the Views that are related to this
             * @param settings
             * @param {Array=}      ignore      An array of CID's to ignore (prolly because they've already been rendered)
             * @returns {Sm.Core.Abstraction.View}
             */
            refresh_all:     function (settings, ignore) {},
            refresh_element: function (element) {},

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
                this.setStatus({rendered: true});
                this.init_button_control_events();
                this.ReferencedObject && this.ReferencedObject.addView && this.ReferencedObject.addView(this);
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
            render:          function (settings) {},
            /**
             * @alias Sm.Core.Abstraction.View#get_rendered
             * @param what
             * @return {*}
             * @param do_not_cache True if we want to re-render the element
             */
            get_rendered:    function (what, do_not_cache) {
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
                    if (this.elements[w_grand_scheme_of_things] && do_not_cache) {
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

            accept_drop:      function (droppedView) {},
            renderDragMirror: function (el) {
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

            _button_onclick:            function () {},
            init_button_control_events: function () {},

            /**
             * Clone the View: duplicate the view and some of its properties/its element, register it with the ReferencedObject
             * @return {Function}
             */
            clone:             function () {
                var clone_element = this.get_rendered('Element').cloneNode(true);
                var constructor_  = this.prototype ? this.prototype.constructor : this.constructor;

                var ReferencedObject = this.ReferencedObject;

                var type       = this.type;
                var clonedView = new constructor_({
                    type:             type,
                    ReferencedObject: ReferencedObject,
                    el:               clone_element
                });
                var self       = this;
                Sm.loaded.when_loaded('Extras_Draggable', function () {
                    self.setDraggingStatus(false);
                });

                if (ReferencedObject && !!ReferencedObject.addView)
                    ReferencedObject.addView(clonedView, this.referenceElement);
                return clonedView;
            },
            /**
             * Refresh the old element, replace it with a new one
             */
            replaceOldElement: function () {
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
             * Remove the View from existence
             * @method
             * @returns Sm.Core.Abstraction.View
             */
            destroy:                    function () {
                this.undelegateEvents();
                this.$el.removeData().unbind();
                this.remove();
                Backbone.View.prototype.remove.call(this);
                return this;
            },
            update:                     function (changed_attributes) {return this;},
            _updateElementFromProperty: function (property, element) {return this;},

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
                if (_self !== null) fn = fn.bind(_self || this);
                return this._fns[name] = this._fns[name] || fn;
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
        Sm.Core.Abstraction.View.get_attributes_from_form = function (form_el) {
            var set_thing       = {};
            var found_something = false;
            for (var i = 0; i < form_el.length; i++) {
                found_something = true;
                var $elem       = $(form_el[i]);
                var elem        = form_el[i];
                var val         = $elem.val();
                if (elem.multiple) val = val || [];
                val && val.trim && (val = val.trim());
                var name = $elem.attr('name');
                if (name == 'has_title') val = !!elem.checked ? 1 : 0;
                if (!!name) set_thing[name] = val;
            }
            return found_something ? set_thing : false;
        };
        /**
         * Make it so the object can handle having Views in a standardized way
         * Poooorly named
         * @param self The Object that is going to be having Views
         */
        Sm.Core.Abstraction.View.mixin = function (self) {
            /**
             * An object containing the views the belong to the MvCombo
             * @type {{}}
             */
            self.Views = {};
            /**
             * An object containing information about which of self MvCombo's Views are ___d
             * @type {{selected_Views: {}, active_Views: {}, focused_Views: {}}}
             */
            self.ViewMaps = {
                selected_Views: {},
                active_Views:   {},
                focused_Views:  {}
            };
            /**
             * An array of the cid's belonging to the views of the MvCombo
             * @type {Array}
             */
            self.ViewList = [];
            /**
             * An Array of Views that were created just for the sake of having a View - if self can be replaced by a real element, that is preferable.
             * @type {Array}
             */
            self.defaultViewList = [];

            var ViewType_;
            var createView = (self.createView || function (parameters) {
                Sm.CONFIG.DEBUG && console.log('abstract');
                ViewType_ = Sm.Core.Abstraction.View;
                return new ViewType_(parameters);
            }).bind(self);

            /**
             * @typedef ViewHaver
             *
             */
            var ViewHaver = {
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                /**
                 * Add a View to the ReferencedObject
                 * @param View
                 * @param {HTMLElement|Node|boolean=}        context_element           The parent element of the View's element meant to keep track of relationship
                 * @param {{}=}                      settings                  Settings
                 * @param {string=}                  settings.display_type     The display type of the element. I feel like this is a code smell
                 * @return {*}
                 */
                addView:     function (View, context_element, settings) {
                    settings = settings || {};

                    var _ReferencedObject = this;
                    var Model             = this.Model;

                    if (!!View && typeof View === "object" && View.cid) {
                        if (!context_element && document.body.contains(View.el.parentNode))context_element = View.el.parentNode;
                        View.referenceElement = context_element || View.referenceElement || false;
                        if (this.ViewList.indexOf(View.cid) > -1) {
                            var in_def = this.defaultViewList.indexOf(View.cid);
                            if (in_def > -1) this.defaultViewList.splice(in_def, 1);
                            return View;
                        }
                        //set the View's model
                        View.model = Model;
                        //set the ReferencedObject of the View
                        if (!View.ReferencedObject) View.setReferencedObject(_ReferencedObject);
                    } else {
                        /** @type {{el:HTMLElement|boolean, model:Sm.Core.SmModel}} Properties to initialize the View */
                        var view_props = {
                            model:        Model,
                            el:           false,
                            display_type: settings.display_type || 'full'
                        };
                        // If it's an element, initialize the View based on that
                        if (Sm.Core.util.isElement(View)) {
                            view_props.el = View;
                            View          = createView(view_props);
                            View.setReferencedObject(_ReferencedObject);
                            if (!View.referenceElement) {
                                if (!context_element && document.body.contains(View.el.parentNode))
                                    context_element = View.el.parentNode;
                                View.referenceElement = context_element || false;
                            }

                            if (!!this.defaultViewList && !!this.defaultViewList.length) {
                                this.removeView(this.defaultViewList[0])
                            }
                        } else {
                            //If there are any default Views, return the first one
                            !this.defaultViewList && (this.defaultViewList = []);
                            if (this.defaultViewList.length) return this.defaultViewList[0];
                            View = createView(view_props);
                            if (!!context_element && this.ViewList.length) {
                                var check    = false;
                                var ViewList = this.ViewList;
                                for (var i = 0; i < ViewList.length; i++) {
                                    var view_id = ViewList[i];
                                    var newView = this.Views[view_id];
                                    if (newView.referenceElement == context_element) {
                                        check = true;
                                        return newView;
                                    }
                                }
                            }
                            this.defaultViewList.push(View.cid);
                            View.setReferencedObject && View.setReferencedObject(_ReferencedObject);
                            if (!context_element && document.body.contains(View.el.parentNode))
                                context_element = View.el.parentNode;
                            View.referenceElement = context_element;
                        }
                    }
                    if (!(this.ViewList.indexOf(View.cid) > -1)) {
                        this.Views[View.cid] = View;
                        this.ViewList.push(View.cid);
                    }
                    this.Model && this.Model.attributes &&
                    this.mark_view_as_subtype(View, Sm.Entities.Section.Meta.get_type(this.Model.attributes.section_type, 'index'));
                    return View;
                },
                /**
                 * No longer relate this ReferencedObject to the View with cid ____
                 * @alias Sm.Core.ReferencedObject#removeView
                 * @param cid
                 */
                removeView:  function (cid) {
                    if (cid in this.Views) delete  this.Views[cid];

                    var ViewToRemove;
                    if (this.defaultViewList && (ViewToRemove = this.defaultViewList.indexOf(cid)) > -1) {
                        this.defaultViewList.splice(ViewToRemove, 1);
                    }

                    if (this.ViewList && (ViewToRemove = this.ViewList.indexOf(cid)) > -1) {
                        this.ViewList.splice(ViewToRemove, 1);
                    }
                },
                /**
                 * Retrieve a view based on the cid, or a reference element
                 * @alias Sm.Core.ReferencedObject#getView
                 * @param {{}=}             settings
                 * @param {string=}         settings.cid                  The cid, unique id created by Backbone.js, of the View
                 * @param {HTMLElement=}    settings.reference_element    An element that is related to this View in the desired way
                 * @param {boolean=false}   settings.strict               Should we create the View if we couldn't find it?
                 * @param {string=}         settings.display_type         How should the view be displayed
                 * @return {*}
                 */
                getView:     function (settings) {
                    settings              = settings || {};
                    var cid               = settings.cid || false;
                    var reference_element = settings.reference_element || false;
                    var strict            = !!settings.strict;
                    var display_type      = settings.display_type;
                    var View;
                    //If there is a CID and we are being strict, return false if there is no match and true otherwise
                    if (cid) {
                        if (this.Views[cid]) return this.Views[cid];
                        if (strict) return false;
                    }
                    var returnView = false;
                    if (reference_element && !!this.ViewList.length) {
                        var potential_view    = false;
                        var ReferencedObject_ = this;
                        //Sm.CONFIG.DEBUG && console.log('mvcombo,gv,0', this.defaultViewList, ' - ', this.Identity.id);
                        /** @this {Sm.Core.Abstraction.View} */
                        this.forEachView(function () {
                            if (strict && ReferencedObject_.defaultViewList.indexOf(this.cid) >= 0) {
                                return;
                            }
                            if (!View && this.referenceElement == reference_element) View = this;
                            if (!this.referenceElement) potential_view = this;
                        });
                        if (View) {
                            returnView = View;
                        } else if (!View && !strict) {
                            returnView = potential_view ? potential_view : this.addView(null, reference_element, {display_type: display_type});
                        } else {
                            return false;
                        }
                    }
                    returnView = !returnView ? this.addView(null, reference_element, {
                        display_type: display_type
                    }) : returnView;
                    if (typeof  returnView == "string") {
                        return this.getView({
                            cid:    returnView,
                            strict: true
                        });
                    }
                    return returnView;
                },
                /**
                 * Apply a callback to each View associated with this ReferencedObject with the View being used as the 'this' parameter
                 * @alias Sm.Core.ReferencedObject#forEachView
                 * @param {function}    callback        The function to be run
                 * @param {Array=}      callback_args   Arguments to be applied to the function
                 */
                forEachView: function (callback, callback_args) {
                    if (typeof callback === "function") {
                        var view_ids = this.ViewList;
                        for (var v = 0; v < view_ids.length; v++) {
                            var v_i = view_ids[v];
                            !!this.Views[v_i] && callback.apply(this.Views[v_i], callback_args)
                        }
                    }
                }
            };

            for (var prop in ViewHaver) {
                if (!ViewHaver.hasOwnProperty(prop)) continue;
                if (typeof ViewHaver[prop] === "function")self[prop] = ViewHaver[prop];
                else self[prop] = ViewHaver[prop];
            }
        };
        Emitter.mixin(Sm.Core.Abstraction.View);
        Sm.loaded.add('Core_Abstraction_View');
    });