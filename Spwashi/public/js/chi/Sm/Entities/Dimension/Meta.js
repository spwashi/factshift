/**
 * Created by Sam Washington on 1/25/16.
 */
require(['require', 'Sm-Core-Meta'], function (require) {
    var DimensionMeta                           = Sm.Core.Meta.Proto.extend({
        relationship_type_obj            : {
            /**
             * @type {relationship_type_info_obj}
             */
            sections: {
                MvType            : 'Section',
                index_singular    : 'section',
                primary_key       : 'dimension_id',
                secondary_key     : 'section_id',
                is_only_reciprocal: false,
                linked_entities   : ['Dimension', 'Section']
            },
            /**
             * @type {relationship_type_info_obj}
             */
            pages   : {
                MvType            : 'Page',
                index_singular    : 'page',
                primary_key       : 'dimension_id',
                secondary_key     : 'page_id',
                is_only_reciprocal: false,
                linked_entities   : ['Dimension', 'Page']
            },

            /**
             * @type {relationship_type_info_obj}
             */
            dimensions: {
                MvType            : 'Section',
                index_singular    : 'section',
                primary_key       : 'section_id',
                secondary_key     : 'dimension_id',
                is_only_reciprocal: true,
                linked_entities   : ['Dimension', 'Section']
            }
        },
        get_possible_relationship_indices: function (settings) {
            if (!settings) return [];
            settings          = settings || {};
            var OtherMvCombo  = settings.OtherMvCombo;
            var type          = (OtherMvCombo ? OtherMvCombo.type : settings.type) || false;
            var is_reciprocal = !!settings.is_reciprocal;
            if (is_reciprocal) {return [null, 'dimensions']}
            if (type == "Section") return ['sections'];
            if (type == "Page") return ['pages'];
            return [];
        }
    });
    Sm.Entities.Dimension.Meta                  = new DimensionMeta({type: 'Dimension'});
    Sm.Entities.Dimension.Meta.Proto = DimensionMeta;
    var self_type                               = 'Dimension';
    Sm.loaded.add('Entities_' + self_type + '_Meta');
});