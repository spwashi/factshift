/**
 * Created by Sam Washington on 1/4/16.
 */
require(['require', 'Sm',
         'Sm-Entities-Dimension-templates-_template',
         'Sm-Entities-Dimension-templates-standard'
], function (require) {
    require('Sm');

    require('Sm-Entities-Dimension-templates-_template');
    require('Sm-Entities-Dimension-templates-standard');

    Sm.loaded.when_loaded([
        'Entities_Abstraction_Garage',
        'Entities_Dimension_Meta',
        'Entities_Dimension_templates__template',
    ], function () {
        /**
         * @alias Sm.Entities.Dimension.Garage
         * @extends Sm.Entities.Abstraction.Garage
         */
        var GarageClass              = Sm.Entities.Abstraction.Garage.extend({});
        Sm.Entities.Dimension.Garage = new GarageClass('Dimension', 'dimension_type');
        Sm.loaded.add('Entities_Dimension_Garage');
    }, 'Entities_Dimension_Garage');
});