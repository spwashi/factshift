/**
 * Created by Sam Washington on 12/19/15.
 */

require([
    'require', 'Sm', 'Sm-Core-Core', 'Sm-Entities-Abstraction-Garage'
], function (require) {
    /**
     * Loads the Collection definition (not necessarily on every page)
     * @type {{}}
     */
    Sm.Entities.Collection           = Sm.Entities.Collection || {};
    Sm.Entities.Collection.templates = Sm.Entities.Collection.templates || {};
    require(['Sm-Entities-Collection-MvCombo'], function () {});
    require(['Sm-Entities-Collection-Garage'], function () {});
    require(['Sm-Entities-Collection-Wrapper'], function () {});
    require(['Sm-Entities-Collection-View'], function () {});
    require(['Sm-Entities-Collection-Model'], function () {});
    require(['Sm-Entities-Collection-Meta'], function () {});
    Sm.loaded.when_loaded([
        'Entities_Collection_MvCombo',
        'Entities_Collection_Wrapper',
        'Entities_Collection_View',
        'Entities_Collection_Model',
        'Entities_Collection_Meta',
        'Entities_Collection_Garage'
    ], function () {
        var $body = $(document.body);
        Sm.Entities.Collection.Wrapper.hydrate({elements: $body.find('.spwashi-collection')});
        Sm.loaded.add('Collection__core');
        Sm.loaded.when_loaded(['Entities_Collection_Garage'], function () {Sm.loaded.add('Collection')});
        Sm.CONFIG.DEBUG && console.log(' --- Collection has been loaded!');
        Sm.Extras.visual_debug('Collection has been loaded!');
    }, 'Collection');
});