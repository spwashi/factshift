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
                setAttributeElement_section_type: function (value) {
                    var Entity = this.getResource();
                    var Meta   = Sm.Core.Identifier.getRootObjectAttribute(Entity, 'Meta');
                    if (!Meta) return false;
                    var subtype = Meta.getEntitySubtype(Entity);
                    Sm.CONFIG.DEBUG && console.log(subtype);
                    this.render({is_synchronous: false});
                    return false;
                },
                _click:                           function (e) {
                    var result = Sm.Abstraction.Views.EntityView.prototype._click.apply(this, arguments);
                    if (result && this.display_type === 'full' || this.display_type === 'std') {
                        this.focus();
                        e.stopPropagation();
                        return null;
                    }
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
                    Sm.Entities.Section.Wrapper.focus(this);
                    return this;
                },
                blur:                             function () {
                    Sm.Entities.Section.Wrapper.blur(this);
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