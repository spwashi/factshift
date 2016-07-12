/**
 * Created by Sam Washington on 12/19/15.
 */

require([
    'require', 'Sm', 'Sm-Core-Core', 'Sm-Entities-Abstraction-Garage'
], function (require) {
    /**
     * Loads the Section definition (not necessarily on every page)
     * @type {{}}
     */
    Sm.Entities.Section                         = Sm.Entities.Section || {};
    Sm.Entities.Section.templates               = Sm.Entities.Section.templates || {};
    Sm.Entities.Section.RelationshipAbstraction = Sm.Entities.Section.RelationshipAbstraction || {};
    require(['Sm-Entities-Section-Meta'], function () {});
    require(['Sm-Entities-Section-MvCombo'], function () {});
    require(['Sm-Entities-Section-Wrapper'], function () {});
    require(['Sm-Entities-Section-View'], function () {});
    require(['Sm-Entities-Section-Garage'], function () {});
    require(['Sm-Entities-Section-Model'], function () {});
    require(['Sm-Entities-Section-Abstraction-ModalEdit'], function () {});
    require(['Sm-Entities-Section-RelationshipAbstraction-pivots_RelationshipIndex'], function () {});
    Sm.loaded.when_loaded([
        'Entities_Section_MvCombo',
        'Entities_Section_Wrapper',
        'Entities_Section_View',
        'Entities_Section_Model',
        'Entities_Section_Meta',
        'Entities_Section_Garage',
        'Entities_Section_RelationshipAbstraction_pivots_RelationshipIndex'
    ], function () {

        Sm.loaded.add('Section__core');
        Sm.loaded.when_loaded(['Entities_Section_Garage', 'Entities_Section_RelationshipAbstraction_pivots_RelationshipIndex'], function () {Sm.loaded.add('Section')});

        var $body = $(document.body);
        Sm.Entities.Section.Wrapper.hydrate({elements: $body.find('.spwashi-section')});
        Sm.CONFIG.DEBUG && console.log(' --- Section has been loaded!');
        Sm.Extras.visual_debug('Section has been loaded!');
    }, 'Section');
});