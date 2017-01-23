/**
 * Created by Sam Washington on 11/13/16.
 */
define(['require', 'Sm', 'Sm-Abstraction-Views-View'], function (require, Sm) {
    Sm.Core.dependencies.on_load(['Abstraction_Views_View'], function () {
        /**
         * @class Sm.Entities.Page.View
         * @extends Sm.Abstraction.Views.EntityView
         * @property {Sm.Abstraction.Entity} Resource
         */
        Sm.Entities.Page.View = Sm.Abstraction.Views.EntityView.extend(
            {
                setAttributeElement_description: function (value) {
                    var $el    = this.$el;
                    var Entity = this.getResource();
                    if (!Entity) return false;
                    var ent_id = Entity.getEntId();
                    if (!ent_id) return false;
                    var $description_element = $el.find('[data-ent_id="' + ent_id + '"] [data-attribute="description"]');
                    if (!$description_element.length) return false;
                    $description_element.text(value);
                    return true;
                }
            });
    }, 'Entities-Page-View');
});