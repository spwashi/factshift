/**
 * Created by Sam Washington on 12/19/15.
 */

require([
    'require', 'Sm', 'Sm-Core-Core'
], function (require) {
    /**
     * Loads the Dimension definition (not necessarily on every page)
     * @type {{}}
     */
    Sm.Entities.Dimension           = Sm.Entities.Dimension || {};
    Sm.Entities.Dimension.templates = Sm.Entities.Dimension.templates || {};
    require(['Sm-Entities-Dimension-MvCombo'], function () {});
    require(['Sm-Entities-Dimension-Wrapper'], function () {});
    require(['Sm-Entities-Dimension-View'], function () {});
    require(['Sm-Entities-Dimension-Garage'], function () {});
    require(['Sm-Entities-Dimension-Model'], function () {});
    require(['Sm-Entities-Dimension-Meta'], function () {});
    Sm.loaded.when_loaded([
        'Entities_Dimension_MvCombo',
        'Entities_Dimension_Wrapper',
        'Entities_Dimension_View',
        'Entities_Dimension_Model',
        'Entities_Dimension_Meta'
    ], function () {
        var $body      = $(document.body);
        Sm.Entities.Dimension.Wrapper.hydrate({elements: $body.find('.spwashi-dimension')});
        var active_MVS = Sm.Entities.Dimension.Wrapper.MvMaps.active_MVs;
        for (var MV_ID in active_MVS) {
            if (!active_MVS.hasOwnProperty(MV_ID)) continue;
            if (active_MVS[MV_ID].MvCombo) {
                active_MVS[MV_ID].MvCombo.focus();
                break;
            }
        }
        Sm.loaded.add('Dimension__core');
        Sm.loaded.when_loaded(['Entities_Dimension_Garage'], function () {Sm.loaded.add('Dimension')});
        Sm.CONFIG.DEBUG && console.log(' --- Dimension has been loaded!');
        Sm.Extras.visual_debug('Dimension has been loaded!');
    }, 'Dimension');
});