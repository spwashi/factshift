/**
 * Created by Sam Washington on 1/4/16.
 */
require(['require', 'underscore', 'Sm',
    'Sm-Entities-Section-templates-_template',
    'Sm-Entities-Section-templates-standard',
    'Sm-Entities-Section-templates-definition',
    'Sm-Entities-Section-templates-image'
], function (require) {
    require('Sm');
    require('Sm-Entities-Section-templates-_template');
    require('Sm-Entities-Section-templates-standard');
    require('Sm-Entities-Section-templates-definition');
    require('Sm-Entities-Section-templates-image');

    Sm.loaded.when_loaded([
        'Entities_Abstraction_Garage',
        'Entities_Section_Meta',
        'Entities_Section_templates__template'
    ], function () {
        /**
         * @alias Sm.Entities.Section.Garage
         * @extends Sm.Entities.Abstraction.Garage
         */
        var GarageClass            = Sm.Entities.Abstraction.Garage.extend({
            relationships: function (Mv_, is_synchronous, settings) {
                settings                         = settings || {};
                settings.display_type            = 'preview';
                settings.relationship_index_list = settings.relationship_index_list || ['children', 'micros', 'pivots', 'composition', 'concepts'];
                return Sm.Entities.Abstraction.Garage.prototype.relationships.apply(this, [
                    Mv_,
                    is_synchronous,
                    settings
                ]);
            }
        });
        Sm.Entities.Section.Garage = new GarageClass('Section', 'section_type');
        Sm.loaded.add('Entities_Section_Garage');
    }, 'Entities_Section_Garage');
});