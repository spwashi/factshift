/**
 * Created by Sam Washington on 12/19/15.
 */
require(['require', 'Sm-Core-SmView'], function (require) {
    Sm.loaded.when_loaded('Core_SmView', function () {
        Sm.Entities.Dummy.View = Sm.Core.SmView.extend({
            type:       'Dummy',
            identifier: '.spwashi-dummy'
        });
        Sm.loaded.add('Entities_Dummy_View');
    });
});