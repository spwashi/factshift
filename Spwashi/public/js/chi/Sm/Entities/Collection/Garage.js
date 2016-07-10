/**
 * Created by Sam Washington on 1/4/16.
 */
require(['require', 'Sm',
         'Sm-Entities-Collection-templates-_template',
         'Sm-Entities-Collection-templates-standard'
], function (require) {
    require('Sm');

    require('Sm-Entities-Collection-templates-_template');
    require('Sm-Entities-Collection-templates-standard');

    Sm.loaded.when_loaded([
        'Entities_Abstraction_Garage',
        'Entities_Collection_Meta',
        'Entities_Collection_templates__template',
        'Entities_Collection_templates_standard'
        //'Entities_Collection_templates_',
        //'Entities_Collection_templates_',
        //'Entities_Collection_templates_',
    ], function () {
        /**
         * @alias Sm.Entities.Collection.Garage
         * @extends Sm.Entities.Abstraction.Garage
         */
        var GarageClass            = Sm.Entities.Abstraction.Garage.extend({});
        Sm.Entities.Collection.Garage = new GarageClass('Collection', 'collection_type');
        Sm.loaded.add('Entities_Collection_Garage');
    }, 'Entities_Collection_Garage');
});