/**
 * Created by Sam Washington on 1/25/16.
 */
require(['require', 'Sm-Core-Meta'], function (require) {
    /**
     * @typedef {{}} relationship_type_info_obj
     * @property MvType
     * @property {int|boolean}      id              The ID that correlates to the ID of the relationship type
     * @property {string}           primary_key     The Primary Key (from the perspective of this type - this type's relationship)
     * @property {string}           secondary_key   The Secondary Key (from this perspective - the other type's relationship)
     * @property {boolean}          is_only_reciprocal   Does this relationship exist solely in a reciprocal way? (e.g. sections don't have a generic "section" relationship, but collections do
     * @property {Array}            linked_entities An array of the entity names that are linked in this relationship (in order from primary to)
     * @property {string}           index_singular  The singular name of the index e.g. children => child, sections=>section
     */

    /**
     * @alias Sm.Entities.Section.Meta
     * @extends Sm.Core.Meta
     * @augments Sm.Core.Meta
     * @property  {{}}types
     */
    var SectionMeta = Sm.Core.Meta.base_constructor.extend({
        relationship_type_obj:             {
            /**
             * @type {relationship_type_info_obj}
             */
            children:    {
                MvType:             'Section',
                index_singular:     'child',
                id:                 1,
                primary_key:        'primary_section_id',
                secondary_key:      'secondary_section_id',
                is_only_reciprocal: false,
                linked_entities:    ['Section', 'Section']
            },
            /**
             * @type {relationship_type_info_obj}
             */
            composition: {
                MvType:             'Section',
                index_singular:     'composition',
                id:                 2,
                primary_key:        'primary_section_id',
                secondary_key:      'secondary_section_id',
                is_only_reciprocal: false,
                linked_entities:    ['Section', 'Section']
            },

            /**
             * @type {relationship_type_info_obj}
             */
            micros: {
                MvType:             'Section',
                index_singular:     'micro',
                id:                 4,
                primary_key:        'primary_section_id',
                secondary_key:      'secondary_section_id',
                is_only_reciprocal: false,
                linked_entities:    ['Section', 'Section']
            },

            /**
             * @type {relationship_type_info_obj}
             */
            pivots:       {
                MvType:             'Section',
                index_singular:     'pivot',
                id:                 5,
                primary_key:        'primary_section_id',
                secondary_key:      'secondary_section_id',
                is_only_reciprocal: false,
                linked_entities:    ['Section', 'Section']
            },
            /**
             * @type {relationship_type_info_obj}
             */
            pages:        {
                MvType:             'Page',
                index_singular:     'page',
                primary_key:        'section_id',
                secondary_key:      'page_id',
                is_only_reciprocal: false,
                linked_entities:    ['Section', 'Page']
            },
            /**
             * @type {relationship_type_info_obj}
             */
            collections:  {
                MvType:             'Collection',
                index_singular:     'collection',
                primary_key:        'section_id',
                secondary_key:      'collection_id',
                is_only_reciprocal: false,
                linked_entities:    ['Section', 'Collection']
            },
            /**
             * @type {relationship_type_info_obj}
             */
            dictionaries: {
                MvType:             'Dictionary',
                index_singular:     'dictionary',
                primary_key:        'section_id',
                secondary_key:      'dictionary_id',
                is_only_reciprocal: false,
                linked_entities:    ['Section', 'Dictionary']
            },
            /**
             * @type {relationship_type_info_obj}
             */
            dimensions:   {
                MvType:             'Dimension',
                index_singular:     'dimension',
                primary_key:        'section_id',
                secondary_key:      'dimension_id',
                is_only_reciprocal: false,
                linked_entities:    ['Section', 'Dimension']
            },
            /**
             * @type {relationship_type_info_obj}
             */
            definitions:  {
                MvType:             'Dictionary',
                index_singular:     'definition',
                secondary_key:      'dictionary_id',
                primary_key:        'section_id',
                is_only_reciprocal: true,
                linked_entities:    ['Section', 'Dictionary']
            },
            /**
             * @type {relationship_type_info_obj}
             */
            sections:     {
                MvType:          'Collection|Dimension|Concept',
                index_singular:  'collection|dimension|concept',
                primary_key:     'collection_id|dimension_id|concept_id',
                secondary_key:   'section_id',
                is_reciprocal:   true,
                linked_entities: ['Section', 'Collection|Dimension|Concept']
            },
            concepts:     {
                MvType:          'Concept',
                index:           'concept',
                id:              null,
                primary_key:     'section_id',
                secondary_key:   'concept_id',
                is_reciprocal:   false,
                linked_entities: ['Section', 'Concept']
            }
        },
        /**
         * The types of Sections there could be
         * @alias Sm.Entities.Section.Meta.types
         */
        types:                             {
            standard:   1,
            image:      2,
            video:      3,
            audio:      4,
            definition: 5,
            table:      6,
            list:       7,
            mirror:     8
        },
        get_possible_relationship_indices: function (settings) {
            if (!settings) return [null];
            settings          = settings || {};
            var OtherMvCombo  = settings.OtherMvCombo;
            var type          = (OtherMvCombo ? OtherMvCombo.type : settings.type) || false;
            var is_reciprocal = !!settings.is_reciprocal;
            if (type == "Dictionary" && is_reciprocal) return [null, 'definitions'];
            if (type == "Section") return ['children', 'composition', 'micros', 'pivots'];
            if (type == "Page") return ['pages'];
            if (type == "Collection") return ['collections'];
            if (type == "Dimension") return ['dimensions'];
            if (type == "Concept") return ['concepts'];
            if (type == "Dictionary") return ['dictionaries'];

            return [];
        }
    });
    try {
        Sm.Entities.Section.Meta                  = new SectionMeta({type: 'Section'});
        Sm.Entities.Section.Meta.base_constructor = SectionMeta;
        var self_type                             = 'Section';
        Sm.loaded.add('Entities_' + self_type + '_Meta');
    } catch (e) {
        Sm.CONFIG.DEBUG && console.log(e);
    }

});