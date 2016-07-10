/**
 * Created by Sam Washington on 12/19/15.
 */
require(['require', 'Sm-Entities-Collection-main', 'Sm-Core-MvWrapper'], function (require) {
    Sm.loaded.when_loaded('Core_MvWrapper', function () {
        var CollectionWrapper          = Sm.Core.MvWrapper.extend({
            type:               'Collection',
            parentType:         null,
            populate_container: function (settings) {}
        });
        Sm.Entities.Collection.Wrapper = new CollectionWrapper;
        Sm.loaded.add('Entities_Collection_Wrapper');
    }, 'Entities_Collection_Wrapper');
});