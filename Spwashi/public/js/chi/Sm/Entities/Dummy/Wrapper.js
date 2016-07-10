/**
 * Created by Sam Washington on 12/19/15.
 */
require(['require', 'Sm/Entities/Dummy/main', 'Sm-Core-MvWrapper'], function (require) {
    Sm.loaded.when_loaded('Core_MvWrapper', function () {
        var DummyWrapper          = Sm.Core.MvWrapper.extend({
            type:               'Dummy',
            parentType:         null,
            populate_container: function (settings) {}
        });
        Sm.Entities.Dummy.Wrapper = new DummyWrapper;
        Sm.loaded.add('Entities_Dummy_Wrapper');
    });
});