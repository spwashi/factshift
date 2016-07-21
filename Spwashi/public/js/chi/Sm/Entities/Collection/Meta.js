/**
 * Created by Sam Washington on 1/25/16.
 */
require(['require', 'Sm-Core-Meta'], function (require) {
    var CollectionMeta                           = Sm.Core.Meta.Proto.extend({
        relationship_type_obj:             {

            /**
             * @type {relationship_type_info_obj}
             */
            sections:    {
                model_type:             'Section',
                index_singular:     'section',
                id:                 null,
                primary_key:        'collection_id',
                secondary_key:      'section_id',
                is_only_reciprocal: false,
                linked_entities:    ['Collection', 'Section']
            },
            /**
             * @type {relationship_type_info_obj}
             */
            collections: {
                model_type:             'Section',
                index_singular:     'section',
                id:                 null,
                primary_key:        'section_id',
                secondary_key:      'collection_id',
                is_only_reciprocal: true,
                linked_entities:    ['Collection', 'Section']
            }
        },
        get_possible_relationship_indices: function (settings) {
            if (!settings) return [];
            settings         = settings || {};
            var OtherMvCombo = settings.OtherMvCombo;
            var type         = (OtherMvCombo ? OtherMvCombo.type : settings.type) || false;
            if (type == "Section") return ['sections'];
            return [];
        }
    });
    Sm.Entities.Collection.Meta                  = new CollectionMeta({type: 'Collection'});
    Sm.Entities.Collection.Meta.Proto = CollectionMeta;
    var self_type = 'Collection';
    Sm.loaded.add('Entities_' + self_type + '_Meta');
});