/**
 * Created by Sam Washington on 1/25/16.
 */
require(['require', 'Sm-Core-Meta'], function (require) {
    /**
     * @typedef {{}} relationship_type_info_obj
     * @property model_type
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
    var SectionMeta = Sm.Core.Meta.Proto.extend({
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
        get_named_relationship_indices:    function (settings) {
            var res      = Sm.Core.Meta.Proto.prototype.get_named_relationship_indices.apply(this, arguments);
            res["Macro"] = "reciprocal_micros";
            return res;
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
        Sm.Entities.Section.Meta.Proto = SectionMeta;
        var self_type                             = 'Section';
        Sm.loaded.add('Entities_' + self_type + '_Meta');
    } catch (e) {
        Sm.CONFIG.DEBUG && console.log(e);
    }

});