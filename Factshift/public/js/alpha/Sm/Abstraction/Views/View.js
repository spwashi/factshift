/**
 * Created by Sam Washington on 11/6/16.
 */
define(['require', 'Sm', 'backbone', 'Sm-Abstraction-Stateful', 'Sm-Abstraction-Permittable'], function (require, Sm, Backbone) {
    Sm.Abstraction.Views = Sm.Abstraction.Views || {};

    /**
     * @class Sm.Abstraction.Views.View
     * @alias Sm.Abstraction.Views.View
     * @augments Sm.Core.Identifier.Identifiable
     * @augments Sm.Abstraction.Stateful
     * @augments Sm.Abstraction.Permittable
     *
     * @property {HTMLElement}      el
     * @property {jQuery}           $el
     * @property {string|Sm.r_id}   cid
     * @property {Function}         delegateEvents
     * @property {Sm.Core.Identifier.Identifiable|Sm.Abstraction.Entity|Sm.Abstraction.Prompt.Promptable|Sm.Abstraction.Relationship|boolean} Resource
     */
    Sm.Abstraction.Views.View = Backbone.View.extend(
        {
            object_type:  'View',
            display_type: 'std',

            events:             {},
            /**
             * @constructor
             * @param {{}}                                      config
             * @param {HTMLElement=}                            config.el
             * @param {Sm.r_id}                                 config.resource_r_id
             * @param {string}                                  config.resource_type
             * @param {string}                                  config.display_type
             * @param {Sm.Core.Identifier.Identifiable=}        config.Resource
             * @param {Sm.Core.Identifier.Identifiable|HTMLElement=}        config.ReferencePoint
             * @param {function}                                config.resolve
             * @param {function}                                config.reject
             */
            initialize:         function (config) {
                config             = config || {};
                this.resource_r_id = this.resource_r_id || config.resource_r_id || (config.Resource && config.Resource.getR_ID && config.Resource.getR_ID());
                this.resource_type = this.resource_type || config.resource_type || this.resource_type;
                this.display_type  = this.display_type || config.display_type || this.display_type;
                this.setReferencePoint(config.ReferencePoint || (this.el && this.el.parentNode ? this.el.parentNode : null));
                this.Identifier = new Sm.Core.Identifier(this, {
                    object_type: this.resource_type + '_View',
                    r_id:        this.cid
                });
                this.setStatus('rendered', !!config.el);
                this.refresh();
                this.initViewElement();
            },
            /**
             * Set the ReferencePoint in which a View exists
             * @param {Sm.Core.Identifier.Identifiable|HTMLElement=}         ReferencePoint
             */
            setReferencePoint:  function (ReferencePoint) {
                this.ReferencePoint = Sm.Core.ReferencePoint.init(ReferencePoint);
            },
            /**
             * Get the ReferencePoint in which an element exists
             * @return {Sm.Core.Identifier.Identifiable|HTMLElement}
             */
            getReferencePoint:  function () {
                return this.ReferencePoint;
            },
            /**
             * Set the Element of the View
             * @param el
             * @return {*}
             */
            setElement:         function (el) {
                var res = Backbone.View.prototype.setElement.apply(this, arguments);
                return res;
            },
            getElement:         function (property) {
                if (!property) return this.el;
                return null;
            },
            isRendered:         function () {
                return this.queryStatus('rendered')
            },
            setDisplayType:     function (display_type) {
                this.display_type = display_type;
            },
            /**
             * Render the View and change the Element
             * @param {{}}          settings
             * @param {boolean}     settings.is_synchronous
             * @param {boolean}     settings.only_unrendered
             * @return {*}
             */
            render:             function (settings) {
                settings           = settings || {};
                var is_synchronous = !!settings.is_synchronous;
                if (!!settings.only_unrendered) {
                    if (this.isRendered()) return is_synchronous ? this.el : Promise.resolve(this.el);
                }
                this.setStatus('rendering', true);
                var outer             = this._generateOuterHTML(is_synchronous);
                var inner             = this._generateInnerHTML(is_synchronous);
                var outer_html, inner_html;
                var Self              = this;
                var when_all_rendered = function () {
                    var html_string = outer_html.replace('__CONTENT__', inner_html);
                    var el          = Sm.Core.Util.createElement(html_string);
                    var old_el      = Self.el;
                    Self.el         = el;
                    Self.setElement(el);
                    Self.refresh();
                    $(old_el).replaceWith(el);
                    Self.content_element = null;
                    Self.initViewElement();
                    Self.emit && Self.emit('render', el);
                    Self.setStatus('rendering', false);
                    Self.setStatus('rendered', true);
                    return Self.el;
                };
                if (!is_synchronous) {
                    return outer.then(function (result) {
                        outer_html = result;
                        return inner.then(function (result) {
                            inner_html = result;
                            return when_all_rendered();
                        })
                    })
                } else {
                    outer_html = outer;
                    inner_html = inner;
                    return when_all_rendered();
                }
            },
            /**
             * Generate the Outer HTML of the View. This is meant to be the stuff that's the same across this Viewtype
             * @alias Sm.Abstraction.Views.View._generateOuterHTML
             * @param is_synchronous
             * @return {*}
             * @private
             */
            _generateOuterHTML: function (is_synchronous) {
                var template = '__CONTENT__';
                return is_synchronous ? template : Promise.resolve(template);
            },
            /**
             * Generate the Inner HTML of the View. This is meant to be the stuff that changes depending on the ViewType
             * @param is_synchronous
             * @return {*}
             * @private
             */
            _generateInnerHTML: function (is_synchronous) {
                var template = "";
                return is_synchronous ? template : Promise.resolve(template);
            },
            /**
             * Initialize the View Element. Delegates events, normalizes the format.
             * @return {HTMLElement}
             */
            initViewElement:    function () {
                this.$el              = this.$el || $(this.el);
                this.el.FactshiftView = this;
                this.delegateEvents(this.events);
                return this.el;
            },
            /**
             * Make sure the View Element is up to date. Delegation of events, establishing relationships, etc.
             */
            refresh:            function () {
                this.delegateEvents(this.events)
            },
            /**
             * Get the Resource that the View refers to
             * @return {*}
             */
            getResource:        function () {
                if (this.resource_r_id) return Sm.Core.Identifier.identify(this.resource_r_id);
                return null;
            }
        });
    Sm.Abstraction.Views.View.element_references = {};
    /**
     * Given a form element, find all attributes in it and create an object that represents the values
     * @param form
     * @param attribute_identifier
     * @return {*}
     */
    Sm.Abstraction.Views.View.get_attributes_from_form = function (form, attribute_identifier) {
        var form_attribute_elements = $(form).find(attribute_identifier);
        var set_thing               = {};
        var found_something         = false;
        for (var i = 0; i < form_attribute_elements.length; i++) {
            found_something = true;
            var $elem       = $(form_attribute_elements[i]);
            var elem        = form_attribute_elements[i];
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
     * Update a form with values
     * @param form
     * @param {string}  attribute_identifier    The
     * @param {{}}      failures                The values that failed and the errors that accompany them
     * @param {{}}      end_values              The values that are resultant
     */
    Sm.Abstraction.Views.View.update_form = function (form, attribute_identifier, failures, end_values) {
        failures                    = failures || {};
        end_values                  = end_values || {};
        var form_attribute_elements = $(form).find(attribute_identifier);
        for (var i = 0; i < form_attribute_elements.length; i++) {
            var elem        = form_attribute_elements[i];
            var $elem       = $(elem);
            var name        = $elem.attr('name');
            /** @type {jQuery} $error_elem */
            var $error_elem = $elem.parents().children('.error');
            if (name in failures) {
                $error_elem.text(failures[name].message);
            } else {
                $error_elem.html(null);
                if (name in end_values) $elem.val(end_values[name])
            }
        }
    };
    /**
     * An interface that labels an object as being able to have a View
     * @class Sm.Abstraction.Views.Viewable
     * @property addView
     */
    Sm.Abstraction.Views.Viewable = {
        isViewable:    true,
        /**
         * Return the VIewType to use for initialization
         * @return {Sm.Abstraction.Views.View}
         */
        getViewType:   function () {return Sm.Abstraction.Views.View;},
        /** @param {Sm.Abstraction.Views.View}   View */
        addView:       function (View) {
            if (Sm.Core.Util.isElement(View)) View = this.convertToView(View);
            this.Views = this.Views || {};
            if (!View || typeof View !== "object") return false;
            if (!View.cid) return false;
            if (View.cid in this.Views) return null;
            this.Views[View.cid] = View;
            return true;
        },
        getView:       function (view_identifier) {
            var Views = this.Views;
            if (!view_identifier) return false;
            for (var cid in Views) {
                if (!Views.hasOwnProperty(cid)) continue;
                if (cid == view_identifier) return Views[cid];
                else if (view_identifier === Views[cid].el) return Views[cid];
                else if (Views[cid] === view_identifier) return Views[cid];
                else if (Sm.Core.ReferencePoint.compare(Views[cid].getReferencePoint(), view_identifier)) return Views[cid];
            }
            return false;
        },
        initNewView:   function (el, ReferencePoint) {
            var View  = this.convertToView(el || null, ReferencePoint);
            var added = this.addView(View);
            return added !== false ? View : false;
        },
        convertToView: function (el, ReferencePoint) {
            var View;
            if ((View = this.getView(el)) || (View = this.getView(ReferencePoint)))return View;
            this.Views    = this.Views || {};
            /**
             * @var  {Sm.Core.Identifier.Identifiable|Sm.Abstraction.Views.Viewable}
             */
            var Self      = this;
            var ViewType  = this.getViewType();
            var view_init = {el: el, ReferencePoint: ReferencePoint || null};
            if (!!Self.isIdentifiable) {
                view_init.resource_type = Self.getObjectType();
                view_init.resource_r_id = Self.getR_ID();
            }
            return new ViewType(view_init);
        }
    };

    Sm.Core.dependencies.on_load(['Core-ReferencePoint'], function () {
        Sm.Core.ReferencePoint.register_object_type_handler(function (item) {return item instanceof Sm.Abstraction.Views.View;}, function (item, identification_obj) {
            identification_obj.r_id = item.cid;
        });
        Sm.Core.ReferencePoint.register_object_type_updater('HTMLElement', function (ReferencePoint) {
            var Resource = ReferencePoint.getResource();
            if (Resource.FactshiftView) return Sm.Core.ReferencePoint.init(Resource.FactshiftView);
            return ReferencePoint;
        });
    });

    Sm.Core.dependencies.on_load(['Core_Identifier', 'Abstraction_Stateful', 'Abstraction_Permittable'], function () {
        Sm.Core.Util.mixin(Sm.Core.Identifier.Identifiable, Sm.Abstraction.Views.View);
        Sm.Core.Util.mixin(Sm.Abstraction.Stateful, Sm.Abstraction.Views.View);
        Sm.Core.Util.mixin(Sm.Abstraction.Permittable, Sm.Abstraction.Views.View);
        // Mark the "abstract view" as being identifiable, stateful, and permittable
        /**
         * @see Sm.Core.Identifier.Identifiable
         * @see Sm.Abstraction.Stateful
         * @see Sm.Abstraction.Permittable
         */
        Sm.Core.dependencies.add('Abstraction_Views_View:Identifiable');
        Sm.Core.dependencies.add('Abstraction_Views_View:Stateful');
        Sm.Core.dependencies.add('Abstraction_Views_View:Permittable');
    }, 'Abstraction_Views_View');
    Sm.Core.dependencies.add('Abstraction_Views')
});