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
                object_type:       'RelationshipView',
                initialize:        function (settings) {
                    /** @type {Sm.Abstraction.Relationship}  */
                    this.elements = {items: null};
                    this.ActiveViews = settings.ActiveViews || [];
                    Sm.Abstraction.Views.View.prototype.initialize.apply(this, arguments);

                    var Resource = this.getResource();
                    var Self     = this;

                    Resource.on('update', function (changed) {Self.update(changed);});
                    Resource.on('destroy', function () {Self.destroy();});
                },
                setReferencePoint: function (ReferencePoint) {
                    if (!ReferencePoint || !(typeof ReferencePoint === "object") || !ReferencePoint.isIdentifiable) {
                        var Resource = this.getResource();
                        var res;
                        if (res = this.setReferencePoint(Resource)) return res;
                    }
                    this.ReferencePoint = null;
                },
                setActiveViews:    function (Views) {
                    this.ActiveViews = Views;
                },
                getItemElements:   function () {
                    return this.$el.children();
                },

                getGarage:           function () {
                    return Sm.Abstraction.Relationship.getGarage();
                },
                _generateOuterHTML:  function (is_synchronous) {
                    var Relationship = this.getResource();
                    var Garage       = this.getGarage();
                    return Garage.generate('body_outer.' + this.display_type, Relationship, {is_synchronous: is_synchronous})
                },
                _generateInnerHTML:  function (is_synchronous) {
                    var Entity = this.getResource();
                    var Garage = this.getGarage();
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