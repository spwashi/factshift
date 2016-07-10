/**
 * Created by Sam Washington on 12/19/15.
 */

require([
    'require', 'Sm', 'Sm-Core-Core', 'Sm/Entities/Abstraction/Garage'
], function (require) {
    /**
     * Loads the Dictionary definition (not necessarily on every page)
     * @type {{}}
     */
    Sm.Entities.Dictionary           = Sm.Entities.Dictionary || {};
    Sm.Entities.Dictionary.templates = Sm.Entities.Dictionary.templates || {};
    Sm.Entities.Dictionary.plural    = 'Dictionaries';
    require(['Sm-Entities-Dictionary-MvCombo'], function () {});
    require(['Sm-Entities-Dictionary-Wrapper'], function () {});
    require(['Sm-Entities-Dictionary-View'], function () {});
    require(['Sm-Entities-Dictionary-Garage'], function () {});
    require(['Sm-Entities-Dictionary-Model'], function () {});
    require(['Sm-Entities-Dictionary-Meta'], function () {});
    Sm.loaded.when_loaded([
        'Entities_Dictionary_MvCombo',
        'Entities_Dictionary_Wrapper',
        'Entities_Dictionary_View',
        'Entities_Dictionary_Model',
        'Entities_Dictionary_Meta',
        'Entities_Dictionary_Garage'
    ], function () {
        var $body        = $(document.body);
        var dictionaries = $body.find('.spwashi-dictionary');
        Sm.Entities.Dictionary.Wrapper.hydrate({elements: dictionaries});
        Sm.loaded.add('Dictionary__core');
        Sm.loaded.when_loaded(['Entities_Dictionary_Garage'], function () {Sm.loaded.add('Dictionary')});
        
        for (var d = 0; d < dictionaries.length; d++) {
            var obj      = dictionaries[d];
            var $obj     = $(obj);
            var checkbox = $obj.find('input[type=checkbox]')[0];
            if (!checkbox) continue;
            if (checkbox.checked) {
                var Identity = Sm.Core.Identifier.retrieve(obj.dataset.ent_id);
                if (Identity) {
                    var Mv = Identity.getResource();
                    Mv && Mv.activate();
                }
            }
        }
        Sm.CONFIG.DEBUG && console.log(' --- Dictionary has been loaded!');
        Sm.Extras.visual_debug('Dictionary has been loaded!');
    }, 'Dictionary');
});