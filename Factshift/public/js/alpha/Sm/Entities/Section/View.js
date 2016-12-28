/**
 * Created by Sam Washington on 11/13/16.
 */
define(['require', 'Sm', 'Sm-Abstraction-Views-View', 'Sm-Abstraction-Action-ReplaceAction'], function (require, Sm) {
    Sm.Core.dependencies.on_load(['Abstraction_Views_View'], function () {
        var OneView;
        var TwoView;
        /**
         * @class Sm.Entities.Section.View
         * @extends Sm.Abstraction.Views.EntityView
         * @property {Sm.Abstraction.Entity} Resource
         */
        Sm.Entities.Section.View = Sm.Abstraction.Views.EntityView.extend(
            {
                initViewElement:                  function () {
                    var el = Sm.Abstraction.Views.EntityView.prototype.initViewElement.apply(this, arguments);
                    return el;
                },
                setAttributeElement_section_type: function (value) {
                    var Entity = this.getResource();
                    var Meta   = Sm.Core.Meta.getSmEntityAttribute(Entity, 'Meta');
                    if (!Meta) return false;
                    var subtype = Meta.getEntitySubtype(Entity);
                    Sm.CONFIG.DEBUG && console.log(subtype);
                    this.render({is_synchronous: false});
                    return false;
                },
                _click:                           function (e) {
                    var result = Sm.Abstraction.Views.EntityView.prototype._click.apply(this, arguments);
                    result && this.focus();
                    return result;
                },
                _keydown:                         function (e) {
                    var result = Sm.Abstraction.Views.EntityView.prototype._click.apply(this, arguments);
                    /**@this Sm.Entities.Section.View */
                    var Entity = this.getResource();

                    return result;
                },
                focus:                            function () {
                    this.$el.addClass('focused');
                    OneView = this;
                    TwoView = TwoView || this;
                    Sm.Entities.Section.Wrapper.focusView(this);
                    var Entity = this.getResource();
                    if (Entity) {
                        var Micros     = Entity.getRelationshipIndex('micros');
                        var MicroItems = Micros.getItems();
                        for (var section_r_id in MicroItems) {
                            if (!MicroItems.hasOwnProperty(section_r_id)) continue;
                            /** @type {Sm.Abstraction.Relationship} Micro */
                            var Micro       = MicroItems[section_r_id];
                            var OtherEntity = Sm.Core.Identifier.identify(section_r_id);
                        }
                    }
                    return this;
                },
                blur:                             function () {
                    Sm.Entities.Section.Wrapper.blurView(this);
                    this.$el.removeClass('focused');
                    return this;
                }
            });
        var b = function (e) {
            var to_left = (e.keyCode === 37 ? true : (e.keyCode === 39 ? false : null));
            if (!(OneView && TwoView)) return;
            var Action = new Sm.Abstraction.Action.ReplaceAction(to_left ? OneView : TwoView, !to_left ? OneView : TwoView);
            Action.execute();
        };
    }, 'Entities-Section-View');
});