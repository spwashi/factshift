/**
 * Created by Sam Washington on 1/25/16.
 */
require(['require', 'Sm-Core-Meta'], function (require) {
    var PageMeta                           = Sm.Core.Meta.base_constructor.extend({
        relationship_type_obj            : {
            concepts  : {
                MvType         : 'Concept',
                index          : 'concept',
                id             : null,
                primary_key    : 'page_id',
                secondary_key  : 'concept_id',
                is_reciprocal  : false,
                linked_entities: ['Page', 'Concept']
            },
            /**
             * @type {relationship_type_info_obj}
             */
            dimensions: {
                MvType         : 'Dimension',
                index          : 'dimension',
                id             : null,
                primary_key    : 'page_id',
                secondary_key  : 'dimension_id',
                is_reciprocal  : false,
                linked_entities: ['Page', 'Dimension']
            },

            /**
             * @type {relationship_type_info_obj}
             */
            pages: {
                MvType         : 'Section|Concept',
                index          : 'section|concept',
                id             : null,
                primary_key    : 'section_id|concept_id',
                secondary_key  : 'page_id',
                is_reciprocal  : true,
                linked_entities: ['Page', 'Section|Concept']
            }
        },
        get_possible_relationship_indices: function (settings) {
            if (!settings) return [];
            settings          = settings || {};
            var OtherMvCombo  = settings.OtherMvCombo;
            var type          = (OtherMvCombo ? OtherMvCombo.type : settings.type) || false;
            var is_reciprocal = !!settings.is_reciprocal;
            if (is_reciprocal) {return [null, 'pages']}
            if (type == "Page") return ['pages'];
            if (type == "Collection") return ['collections'];
            if (type == "Section") return ['sections'];
            if (type == "Dimension") return ['dimensions'];
            if (type == "Concept") return ['concepts'];

            return [];
        }

    });
    Sm.Entities.Page.Meta                  = new PageMeta({type: 'Page'});
    Sm.Entities.Page.Meta.base_constructor = PageMeta;
    var self_type                          = 'Page';
    Sm.loaded.add('Entities_' + self_type + '_Meta');
});