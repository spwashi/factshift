/**
 * Created by Sam Washington on 12/19/15.
 */

require([
    'require', 'Sm', 'Sm-Core-Core'
], function (require) {
    /**
     * Loads the Dummy definition (not necessarily on every page)
     * @type {{}}
     */
    Sm.Entities.Dummy = Sm.Entities.Dummy || {};
    require(['Sm/Entities/Dummy/MvCombo'], function () {});
    require(['Sm/Entities/Dummy/Wrapper'], function () {});
    require(['Sm/Entities/Dummy/View'], function () {});
    require(['Sm/Entities/Dummy/Model'], function () {});
    require(['Sm/Entities/Dummy/Meta'], function () {});
    Sm.loaded.when_loaded([
        'Entities_Dummy_MvCombo',
        'Entities_Dummy_Wrapper',
        'Entities_Dummy_View',
        'Entities_Dummy_Model',
        'Entities_Dummy_Garage',
        'Entities_Dummy_Meta'
    ], function () {
        var $body = $(document.body);
        Sm.Entities.Dummy.Wrapper.hydrate({elements: $body.find('.spwashi-dummy')});
        Sm.loaded.add('Dummy');
        Sm.CONFIG.DEBUG && console.log(' --- Dummy has been loaded!');
        Sm.Extras.visual_debug('Dummy has been loaded!');
    }, 'Dummy');
});