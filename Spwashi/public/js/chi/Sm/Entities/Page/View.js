/**
 * Created by Sam Washington on 12/19/15.
 */
require(['require'], function (require) {
    Sm.loaded.when_loaded('Core_SmView', function () {
        Sm.Entities.Page.View = Sm.Core.SmView.extend({
            type:                 'Page',
            identifier:           '.spwashi-page',
            _rendering_callbacks: {
                button_control_element: function () {
                    if (!!this.elements.button_control) return this.elements.button_control;
                    var matching = this.get_rendered('$Element').children('.button-control');
                    return this.elements.button_control = (matching[0] ? matching[0] : false);
                },
            },
            additional_events:    {
                click: function (e) {
                    if (this.MvCombo) {
                        this.handle_click(e.target);
                        e.stopPropagation();
                    }
                }
            },
            /**
             * This is a basic click handler that operates based only on the target of the click.
             * This one in particular handles
             *  * scaling
             *  * prompting edits
             *  * debugging
             *  * deleting
             *  * adding relationships
             * @param target The target of the click
             * @return {boolean}
             */
            handle_click:         function (target) {
                var $target = $(target);
                if (!this.MvCombo) return false;
                var Relationship_Obj = this.find_closest_relationship();
                var Relationship_    = Relationship_Obj.Relationship;

                if (this.queryPermission('edit') && $target.hasClass('edit') && $target.hasClass('button')) {
                    this.prompt_edit({display_type: 'inline'});
                } else if (this.queryPermission('relate') && $target.hasClass('add') && $target.hasClass('button')) {
                    this.begin_add_relationship({
                        type: 'Dictionary'
                    });
                } else if ($target.hasClass('add-section-button')) {
                    var Dimension = Sm.Entities.Dimension.Wrapper.get_active();
                    if (Dimension) {
                        var dView = Dimension.getView();
                        dView.begin_add_relationship({type: 'Section'});
                    }
                }

                // DEBUG    */
                else if ($target.hasClass('debug') && $target.hasClass('button') && Sm.CONFIG.DEBUG) {
                    console.log(this.cid, ' -- ', this.MvCombo, this.MvCombo.Model.attributes);
                }
                // DELETE   */
                else if (this.queryPermission('destroy') && $target.hasClass('delete') && $target.hasClass('button')) {
                    /** If this is in a relationship container ... */
                    if (Relationship_) {
                        Relationship_.destroy({silent: false});
                    } else {
                        this.MvCombo.destroy({prompt: true}, this);
                    }
                }
            }
        });
        Sm.loaded.add('Entities_Page_View');
    }, 'Entities_Page_View');
});