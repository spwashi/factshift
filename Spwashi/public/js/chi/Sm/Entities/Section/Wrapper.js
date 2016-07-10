/**
 * Created by Sam Washington on 12/19/15.
 */
require(['require'], function (require) {
    Sm.loaded.when_loaded('Core_MvWrapper', function () {
        var SectionWrapper          = Sm.Core.MvWrapper.extend({
            type:               'Section',
            parentType:         null,
            populate_container: function (settings) {}
        });
        Sm.Entities.Section.Wrapper = new SectionWrapper;
        Sm.loaded.add('Entities_Section_Wrapper');
    }, 'Entities_Section_Wrapper');
});