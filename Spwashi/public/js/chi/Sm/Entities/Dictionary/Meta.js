/**
 * Created by Sam Washington on 1/25/16.
 */
require(['require', 'Sm-Core-Meta'], function (require) {
    /**
     * @alias Sm.Entities.Dictionary.Meta
     * @augments Sm.Core.Meta
     */
    var DictionaryMeta                           = Sm.Core.Meta.base_constructor.extend({
        relationship_type_obj            : {
            /**
             * @type {relationship_type_info_obj}
             */
            definitions: {
                MvType            : 'Section',
                index_singular    : 'definition',
                id                : null,
                primary_key       : 'dictionary_id',
                secondary_key     : 'section_id',
                is_only_reciprocal: false,
                linked_entities   : ['Dictionary', 'Section']
            },

            /**
             * @type {relationship_type_info_obj}
             */
            dictionaries: {
                MvType            : 'Page|Section',
                index_singular    : 'page|section',
                id                : null,
                primary_key       : 'page_id|section_id',
                secondary_key     : 'dictionary_id',
                is_only_reciprocal: true,
                linked_entities   : ['Section|Page', 'Dictionary']
            }
        },
        relationship_aliases             : {
            sections: 'definitions'
        },
        /**
         * @alias Sm.Entities.Dictionary.Meta.get_possible_relationship_indices
         * @param settings
         * @return {[]}
         */
        get_possible_relationship_indices: function (settings) {
            if (!settings) return [];
            settings          = settings || {};
            var OtherMvCombo  = settings.OtherMvCombo;
            var type          = (OtherMvCombo ? OtherMvCombo.type : settings.type) || false;
            var is_reciprocal = !!settings.is_reciprocal;
            if (is_reciprocal) {return [null, 'dictionaries']}
            if (type == "Section") return ['definitions'];
            if (type == "Page") return ['pages'];
            return [];
        }

    });
    Sm.Entities.Dictionary.Meta                  = new DictionaryMeta({type: 'Dictionary'});
    Sm.Entities.Dictionary.Meta.base_constructor = DictionaryMeta;
    var self_type                                = 'Dictionary';
    Sm.loaded.add('Entities_' + self_type + '_Meta');
});