/**
 * Created by Sam Washington on 1/25/16.
 */
require(['require', 'Sm-Core-Meta'], function (require) {
    var ConceptMeta                           = Sm.Core.Meta.base_constructor.extend({
        relationship_type_obj            : {

            /**
             * @type {relationship_type_info_obj}
             */
            sections: {
                MvType         : 'Section',
                index          : 'section',
                id             : null,
                primary_key    : 'concept_id',
                secondary_key  : 'section_id',
                is_reciprocal  : false,
                linked_entities: ['Concept', 'Section']
            },

            /**
             * @type {relationship_type_info_obj}
             */
            concepts: {
                MvType         : 'Section|Page|Concept',
                index          : 'section|page|concept',
                id             : null,
                primary_key    : 'section_id|page_id|primary_concept_id',
                secondary_key  : 'concept_id|concept_id|primary_concept_id',
                is_reciprocal  : true,
                linked_entities: ['Concept', 'Section|Page|Concept']
            },

            /**
             * @type {relationship_type_info_obj}
             */
            pages: {
                MvType         : 'Page',
                index          : 'page',
                id             : null,
                primary_key    : 'concept_id',
                secondary_key  : 'page_id',
                is_reciprocal  : false,
                linked_entities: ['Page', 'Concept']
            }
        },
        get_possible_relationship_indices: function (settings) {
            if (!settings) return [];
            settings          = settings || {};
            var OtherMvCombo  = settings.OtherMvCombo;
            var type          = (OtherMvCombo ? OtherMvCombo.type : settings.type) || false;
            var is_reciprocal = !!settings.is_reciprocal;
            if (is_reciprocal) {return [null, 'concepts']}
            if (type == "Page") return ['pages'];
            if (type == "Collection") return ['collections'];
            if (type == "Section") return ['sections'];
            if (type == "Dimension") return ['dimensions'];
            if (type == "Concept") return ['concepts'];

            return [];
        }
    });
    Sm.Entities.Concept.Meta                  = new ConceptMeta({type: 'Concept'});
    Sm.Entities.Concept.Meta.base_constructor = ConceptMeta;
    var self_type                             = 'Concept';
    Sm.loaded.add('Entities_' + self_type + '_Meta');
});