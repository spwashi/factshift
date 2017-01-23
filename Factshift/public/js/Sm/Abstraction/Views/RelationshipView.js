/**
 * Created by Sam Washington on 12/9/16.
 */
define(['require', 'Sm', 'jquery', 'Emitter', 'Sm-Abstraction-Views-View', 'Sm-Abstraction-Relationship-_template'], function (require, Sm, $, Emitter) {
    Sm.Core.dependencies.on_load(['Abstraction-Views-View', 'Abstraction-Relationship-_template'], function () {
        /**
         * @class Sm.Abstraction.RelationshipView
         * @extends Sm.Abstraction.Views.View
         */
        Sm.Abstraction.Views.RelationshipView = Sm.Abstraction.Views.View.extend(
            {
                object_type:     'RelationshipView',
                initialize:      function (settings) {
                    /** @type {Sm.Abstraction.Relationship}  */
                    this.elements = {items: null};
                    this.ActiveViews = settings.ActiveViews || [];
                    Sm.Abstraction.Views.View.prototype.initialize.apply(this, arguments);

                    var Resource = this.getResource();
                    var Self     = this;

                    Resource.on('update', function (changed) {Self.update(changed);});
                    Resource.on('destroy', function () {Self.destroy();});
                },
                events:          {
                    click: '_click'
                },
                _click:          function (e) {

                    var target            = e.target;
                    var $target           = $(target);
                    var _is_button        = $target.hasClass('button');
                    var is_button_of_type = function (type) {
                        return _is_button && $target.hasClass(type);
                    };
                    var Relationship      = this.getResource();
                    var children          = this.$el.children('.factshift-entity').toArray().map(function (item) {return item.FactshiftView && item.FactshiftView.getResource()}).filter(function (item) {return item});
                    if (is_button_of_type('edit')) {
                        Relationship && Relationship.isEditable && Relationship.prompt_edit(children.length < 2 ? (children[0] || null) : children);
                        this.cancel_event(e);
                        return null;
                    } else if (is_button_of_type('destroy')) {
                        Relationship && Relationship.isDestroyable && Relationship.prompt_destroy();
                        this.cancel_event(e);
                        return null;
                    }
                    this.focus();
                    this.cancel_event(e);
                    return null;
                },
                focus:           function () {
                    this.$el.addClass('focused');
                    Sm.Abstraction.Relationship.focus(this);
                    return this;
                },
                blur:            function () {
                    Sm.Abstraction.Relationship.blur(this);
                    this.$el.removeClass('focused');
                    return this;
                },
                setActiveViews:  function (Views) {
                    this.ActiveViews = Views;
                },
                getItemElements: function () {
                    return this.$el.children();
                },

                _generateOuterHTML:  function (is_synchronous) {
                    var Relationship = this.getResource();
                    var Garage       = Sm.Core.Identifier.getRootObjectAttribute(this, 'Garage');
                    return Garage.generate('body_outer.' + this.display_type, Relationship, {is_synchronous: is_synchronous})
                },
                _generateInnerHTML:  function (is_synchronous) {
                    var Entity = this.getResource();
                    var Garage = Sm.Core.Identifier.getRootObjectAttribute(this, 'Garage');
                    return is_synchronous ? '' : Promise.resolve('');
                },
                /**
                 * Make sure the Views that correspond to the Entities related via this Relationship
                 * (that aren't the Entity holding this Relationship) are initialized properly
                 * @return {*}
                 */
                initRelatedElements: function () {
                    var ActiveViews = this.ActiveViews;
                    for (var i = 0; i < ActiveViews.length; i++) {
                        var View = ActiveViews[i];
                        this.$el.append(View.render({only_unrendered: true, is_synchronous: true}))
                    }
                },
                refresh:             function () {
                    var res  = Sm.Abstraction.Views.View.prototype.refresh.apply(this, arguments);
                    var Self = this;
                    Sm.Core.dependencies.on_load('Abstraction_Entity:Viewable', function () {Self.initRelatedElements();});
                    return res;
                }
            });

        Emitter.mixin(Sm.Abstraction.Views.RelationshipView.prototype);
    }, 'Abstraction-Views-RelationshipView');
});