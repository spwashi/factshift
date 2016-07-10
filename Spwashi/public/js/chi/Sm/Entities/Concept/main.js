/**
 * Created by Sam Washington on 12/19/15.
 */

require([
    'require', 'Sm', 'Sm-Core-Core', 'Sm/Entities/Abstraction/Garage'
], function (require) {
    /**
     * Loads the Concept definition (not necessarily on every concept)
     * @type {{}}
     */
    Sm.Entities.Concept           = Sm.Entities.Concept || {};
    Sm.Entities.Concept.templates = Sm.Entities.Concept.templates || {};
    require(['Sm-Entities-Concept-MvCombo'], function () {});
    require(['Sm-Entities-Concept-Wrapper'], function () {});
    require(['Sm-Entities-Concept-View'], function () {});
    require(['Sm-Entities-Concept-Garage'], function () {});
    require(['Sm-Entities-Concept-Model'], function () {});
    require(['Sm-Entities-Concept-Meta'], function () {});
    Sm.loaded.when_loaded([
        'Entities_Concept_MvCombo',
        'Entities_Concept_Wrapper',
        'Entities_Concept_View',
        'Entities_Concept_Model',
        'Entities_Concept_Meta',
        'Entities_Concept_Garage'
    ], function () {
        var $body = $(document.body);
        Sm.Entities.Concept.Wrapper.hydrate({elements: $body.find('.spwashi-concept')});
        Sm.loaded.add('Concept__core');
        Sm.loaded.when_loaded(['Entities_Concept_Garage'], function () {Sm.loaded.add('Concept')}, 'Concept');
        Sm.CONFIG.DEBUG && console.log(' --- Concept has been loaded!');
        Sm.Extras.visual_debug('Concept has been loaded!');
    }, 'Concept');
});