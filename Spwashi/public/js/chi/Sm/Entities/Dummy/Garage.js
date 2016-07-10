/**
 * Created by Sam Washington on 1/4/16.
 */
require(['require', 'Sm',
         'Sm-Entities-Dummy-templates-_template',
         'Sm-Entities-Dummy-templates-standard'
], function (require) {
    require('Sm');

    require('Sm-Entities-Dummy-templates-_template');
    require('Sm-Entities-Dummy-templates-standard');

    Sm.loaded.when_loaded([
        'Entities_Abstraction_Garage',
        'Entities_Dummy_Meta',
        'Entities_Dummy_templates__template',
        'Entities_Dummy_templates_standard'
        //'Entities_Dummy_templates_',
    ], function () {
        /**
         * @alias Sm.Entities.Dummy.Garage
         * @extends Sm.Entities.Abstraction.Garage
         */
        var GarageClass            = Sm.Entities.Abstraction.Garage.extend({});
        Sm.Entities.Dummy.Garage = new GarageClass('Dummy', 'dummy_type');
        Sm.loaded.add('Entities_Dummy_Garage');
    });
});