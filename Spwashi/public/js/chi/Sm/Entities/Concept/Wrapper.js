/**
 * Created by Sam Washington on 12/19/15.
 */
require(['require', 'Sm-Core-MvWrapper'], function (require) {
    Sm.loaded.when_loaded('Core_MvWrapper', function () {
        var ConceptWrapper          = Sm.Core.MvWrapper.extend({
            type:               'Concept',
            parentType:         null,
            populate_container: function (settings) {}
        });
        Sm.Entities.Concept.Wrapper = new ConceptWrapper;
        Sm.loaded.add('Entities_Concept_Wrapper');
    }, 'Entities_Concept_Wrapper');
});