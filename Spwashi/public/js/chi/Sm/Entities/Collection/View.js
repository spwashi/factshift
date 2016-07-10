/**
 * Created by Sam Washington on 12/19/15.
 */
require(['require', 'Sm-Core-SmView', 'Sm-Entities-Abstraction-mixins-SidebarModule'], function (require) {
    require();
    Sm.loaded.when_loaded(['Core_SmView', 'Sm_Entities_Abstraction_mixins_SidebarModule'], function () {
        Sm.Entities.Collection.View = Sm.Core.SmView.extend({
            type:              'Collection',
            mixins:            [Sm.Entities.Abstraction.mixins.SidebarModule],
            identifier:        '.spwashi-collection',
            additional_events: {
                click: function (e) {
                    var target  = e.target;
                    var $target = $(target);
                    var MvCombo = this.MvCombo;
                    if ($target.hasClass('spwashi-collection')) {
                        !this.MvCombo.queryStatus('focused') ? this.MvCombo.focus(this) : this.MvCombo.blur(this);
                        e.stopPropagation();
                    }
                }
            }
        });
        Sm.loaded.add('Entities_Collection_View');
    }, 'Entities_Collection_View');
});