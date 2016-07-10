/**
 * Created by Sam Washington on 1/4/16.
 */
require(['require', 'Sm',
         'Sm-Entities-Concept-templates-_template',
         'Sm-Entities-Concept-templates-standard'
], function (require) {
    require('Sm');

    require('Sm-Entities-Concept-templates-_template');
    require('Sm-Entities-Concept-templates-standard');

    Sm.loaded.when_loaded([
        'Entities_Abstraction_Garage',
        'Entities_Concept_Meta',
        'Entities_Concept_templates__template',
    ], function () {
        /**
         * @alias Sm.Entities.Concept.Garage
         * @extends Sm.Entities.Abstraction.Garage
         */
        var GarageClass            = Sm.Entities.Abstraction.Garage.extend({
            relationships: function (Mv_, is_synchronous, settings) {
                settings                         = settings || {};
                settings.display_type            = 'preview';
                settings.relationship_index_list = settings.relationship_index_list || ['sections', 'concepts'];
                return Sm.Entities.Abstraction.Garage.prototype.relationships.apply(this, [
                    Mv_,
                    is_synchronous,
                    settings
                ]);
            }
        });
        Sm.Entities.Concept.Garage = new GarageClass('Concept', 'concept_type');
        Sm.loaded.add('Entities_Concept_Garage');
    });
});