/**
 * Created by Sam Washington on 11/13/16.
 */
define(['require', 'Sm', 'jquery', 'Sm-Abstraction-Views-View', 'Sm-Abstraction-Action-ReplaceAction'], function (require, Sm, $) {
    Sm.Core.dependencies.on_load(['Abstraction_Views_View'], function () {
        /**
         * @class Sm.Entities.Dimension.View
         * @extends Sm.Abstraction.Views.EntityView
         * @property {Sm.Abstraction.Entity} Resource
         */
        Sm.Entities.Dimension.View = Sm.Abstraction.Views.EntityView.extend(
            {
                _click:                        function (e) {
                    var target = e.target;
                    e.preventDefault();
                    if ($(e.currentTarget || target).hasClass('tab')) {
                        var reference_object = this.findNearestRelationship();
                        var Resource         = this.getResource();
                        Resource && Resource.isEditable && Resource.prompt_edit(reference_object.Relationship);
                        e.stopPropagation();
                    }
                    return Sm.Abstraction.Views.EntityView.prototype._click.apply(this, arguments);
                },
                getRelationshipIndexContainer: function (relationship_index) {
                    var $el    = this.$el || $(this.el);
                    var Entity = this.getResource();
                    var ent_id;
                    if (!Entity || !(ent_id = Entity.getEntId())) return null;
                    if (relationship_index === 'sections') {
                        var $page = $el.parents('.factshift-entity').eq(0);
                        return $page.find('.sections-container[data-ent_id="' + ent_id + '"]')[0];
                    }
                    return Sm.Abstraction.Views.EntityView.prototype.getRelationshipIndexContainer.apply(this, arguments);
                }
            });
    }, 'Entities-Dimension-View');
});