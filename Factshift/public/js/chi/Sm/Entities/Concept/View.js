/**
 * Created by Sam Washington on 12/19/15.
 */
require(['require', 'Sm-Entities-Abstraction-mixins-SidebarModule'], function (require) {
    Sm.loaded.when_loaded(['Core_SmView', 'Sm_Entities_Abstraction_mixins_SidebarModule'], function () {
        Sm.Entities.Concept.View = Sm.Core.SmView.extend({
            type:              'Concept',
            mixins:            [Sm.Entities.Abstraction.mixins.SidebarModule],
            identifier:        '.spwashi-concept',
            additional_events: {
                click: function (e) {
                    var target  = e.target;
                    var $target = $(target);
                    var MvCombo = this.MvCombo;
                    if ($target.hasClass('spwashi-concept')) {
                        !this.MvCombo.queryStatus('focused') ? this.MvCombo.focus(this) : this.MvCombo.blur(this);
                        e.stopPropagation();
                    }
                }
            },
        });
        Sm.loaded.add('Entities_Concept_View');
    }, 'Entities_Concept_View');
});