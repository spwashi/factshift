/**
 * Created by Sam Washington on 12/19/15.
 */

require([
    'require', 'Sm', 'Sm-Core-Core', 'Sm-Entities-Abstraction-Garage'
], function (require) {
    /**
     * Loads the Page definition (not necessarily on every page)
     * @type {{}}
     */
    Sm.Entities.Page           = Sm.Entities.Page || {};
    Sm.Entities.Page.templates = Sm.Entities.Page.templates || {};
    require(['Sm-Entities-Page-MvCombo'], function () {});
    require(['Sm-Entities-Page-Wrapper'], function () {});
    require(['Sm-Entities-Page-View'], function () {});
    require(['Sm-Entities-Page-Garage'], function () {});
    require(['Sm-Entities-Page-Model'], function () {});
    require(['Sm-Entities-Page-Meta'], function () {});
    Sm.loaded.when_loaded([
        'Entities_Page_MvCombo',
        'Entities_Page_Wrapper',
        'Entities_Page_View',
        'Entities_Page_Model',
        'Entities_Page_Garage',
        'Entities_Page_Meta'
    ], function () {
        var $body = $(document.body);
        Sm.Entities.Page.Wrapper.hydrate({elements: $body.find('.spwashi-page')});
        Sm.loaded.add('Page');
        Sm.loaded.add('Page__core');
        Sm.CONFIG.DEBUG && console.log(' --- Page has been loaded!');
        Sm.Extras.visual_debug('Page has been loaded!');
    }, 'Page');
});