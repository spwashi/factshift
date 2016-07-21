/**
 * Created by Sam Washington on 12/19/15.
 */
require(['require', 'Sm-Core-MvWrapper'], function (require) {
    Sm.loaded.when_loaded('Core_MvWrapper', function () {
        var PageWrapper          = Sm.Core.MvWrapper.extend({
            type:               'Page',
            parentType:         null,
            populate_container: function (settings) {}
        });
        Sm.Entities.Page.Wrapper = new PageWrapper;
        Sm.loaded.add('Entities_Page_Wrapper');
    }, 'Entities_Page_Wrapper');
});