/**
 * Created by Sam Washington on 12/19/15.
 */

/**
 * @module Sm/Entities/Section/MvCombo
 * @exports SectionMvCombo
 * @class SectionMvCombo
 * @requires MvWrapper
 * @requires RelationshipIndex
 * @requires Sm-Core-MvCombo
 */
require(['require', 'Sm', 'Sm-Entities-Section-Model', 'Sm-Core-MvCombo'], function (require) {
    /** NOTE: handles prompting for section-creation and childing and such**/
    Sm.loaded.when_loaded('Core_MvCombo', function () {
        /**
         * An MvCombo that represents a Section on the server
         * @alias   Sm.Entities.Section.MvCombo
         * @augments Sm.Core.MvCombo
         * @extends Sm.Core.MvCombo
         * @see     Sm.Core.MvCombo
         * @class   Sm.Entities.Section.MvCombo
         */
        Sm.Entities.Section.MvCombo                                       = Sm.Core.MvCombo.extend({
            /**
             * @alias Sm.Entities.Section.MvCombo.scale
             * @param scale_towards_micros
             * @param context_id
             * @return {*}
             */
            scale:                     function (scale_towards_micros, context_id) {
                var found            = [];
                var get_listed_items = Sm.Entities.Section.MvCombo.generate_standard_get_listed_items_fn('micros', context_id, false, found);
                var result           = Sm.Core.MvCombo.replace_MV({
                    MvCombo:             this,
                    is_reciprocal:       !scale_towards_micros,
                    list_items_fn:       get_listed_items,
                    replacement_indices: 'micros'
                }).then(function (result) {
                    //console.log(found, result);
                    result && (result.found = found);
                    return result;
                });
                result && (result.found = found);
                return Promise.resolve(result);
            },
            pivot:                     function (where, context_id) {
                var is_home          = where.constructor === Array && where[0] == 'home';
                where                = is_home ? (where[1] || false) : Sm.Entities.Section.Meta.get_relationship_type({sub: true, type: 'index'}, where);
                var found            = [];
                var get_listed_items = Sm.Entities.Section.MvCombo.generate_standard_get_listed_items_fn('pivots', context_id, where, found);
                var result           = Sm.Core.MvCombo.replace_MV({
                    MvCombo:             this,
                    replace_effective:   true,
                    is_reciprocal:       is_home,
                    list_items_fn:       get_listed_items,
                    replacement_indices: 'pivots'
                }).then(function (result) {
                    result && (result.found = found);
                    return result;
                });
                return Promise.resolve(result || {});
            },
            /**
             * Based on an MvCombo, find the various relationship subtypes that the MvCombo has
             * @param what_we_on
             * @param context_id
             * @return {{}}
             */
            get_relationship_subtypes: function (what_we_on, context_id) {
                var return_object  = {};
                /**
                 * The Pivots of the MvCombo that this Section is related to
                 * @type {Sm.Entities.Section.Abstraction.Relationship.pivots_RelationshipIndex}
                 */
                var PivotsRelIndex = this.relationships.pivots;
                //If the RelationshipIndex doesn't exist, return a standard object
                if (!PivotsRelIndex) return {};
                /**
                 * An object representing the relationship subtypes that the pivot RelationshipIndex is keeping track of. Links subtypes to
                 * @type {Sm.Entities.Section.Abstraction.Relationship.pivots_RelationshipIndex.relationship_subtype_map|{}}
                 */
                var subtypes = PivotsRelIndex.relationship_subtype_map;
                var max      = false;
                //Iterate through the subtypes of the context
                if (subtypes && subtypes[context_id]) {
                    /** @type {string} The subtype that we are on as of current */
                    var subtype;
                    //When iterating through the subtypes, we don't care about the relationships they hold, only whether or not they exist
                    for (subtype in subtypes[context_id]) {
                        if (!subtypes[context_id].hasOwnProperty(subtype)) continue;
                        //Don't add a subtype if we are already on it
                        if (subtype == what_we_on) continue;

                        //At the time, text is the only subtype type that has multiple entries. Everything else only has the default types
                        if (/eli5|thing_explainer|text/.test(subtype)) {
                            return_object.text = return_object.text || [];
                            //Add to the "types of text entries" array
                            return_object.text.push(subtype);
                        } else if (/audio|video|image/.test(subtype)) {
                            return_object[subtype] = return_object[subtype] || [];
                            //Add to the "types of ___" array. This only happens this way for standardization purposes
                            return_object[subtype].push(subtype);
                            max                    = true;
                        }
                    }
                }

                /**
                 * Example return =
                 * {
                     *  text: ["text", "eli5"]
                     * }
                 */
                if (what_we_on != 'home') {
                    return_object.home = ['home'];
                    max                = true;
                }

                /**
                 * This is the max number of items that any subtype
                 * @type {*|Array|Number|number}
                 */
                return_object.max = (return_object.text && 3) || (max ? 1 : false);

                return return_object;
            },
            _build_other_MV:           function (otherWrapper, settings) {
                settings.model_properties = settings.model_properties || {};
                if (otherWrapper.type == "Section") settings.model_properties.section_type = this.Model.attributes.section_type;
                return otherWrapper.build_MV(settings);
            },
            _relationship_detail_hook: function (type, settings, map, lc) {
                var reciprocity_matters, other_index, self_index;
                switch (type) {
                    case 'Section':
                        reciprocity_matters   = true;
                        other_index           = 'secondary_section_id';
                        self_index            = 'primary_section_id';
                        map.relationship_type = Sm.Entities.Section.Meta.get_relationship_type({type: 'id'}, settings.relationship_index);
                        break;
                    case 'Collection':
                    case 'Concept':
                    case 'Dictionary':
                    case 'Dimension':
                        other_index = lc + '_id';
                        self_index  = 'section_id';
                        break;
                }
                return {
                    map:                 map,
                    reciprocity_matters: reciprocity_matters,
                    self_index:          self_index,
                    other_index:         other_index
                }
            }
        });
        /**
         *
         * @param relationship_index
         * @param context_id
         * @return {Sm.Core.MvCombo~list_items_fn} A function that iterates through the relationships of an MvCombo and returns the items/relationships of them. The index is dependent on the reciprocity
         * @param relationship_subtype
         * @param found
         */
        Sm.Entities.Section.MvCombo.generate_standard_get_listed_items_fn = function (relationship_index, context_id, relationship_subtype, found) {
            return function (MvCombo, is_reciprocal, other_important_items) {
                /** @type {Sm.Core.RelationshipIndex|Sm.Entities.Section.Abstraction.Relationship.pivots_RelationshipIndex|boolean} The RelationshipIndex that we are going to deal with */
                var RelationshipIndex = MvCombo.getRelationshipIndex(relationship_index, is_reciprocal);
                //Sm.CONFIG.DEBUG && console.log(' + find rels+ ', RelationshipIndex.get_listed_items(context_id).items.map(function (im) {return im.r_id;}), is_reciprocal);
                if (!RelationshipIndex) return {relationships: [], items: []};
                var result = relationship_index == 'pivots' ? RelationshipIndex.get_listed_subtype_items(relationship_subindex, context_id) : RelationshipIndex.get_listed_items(context_id);
                for (var i = 0; i < result.items.length; i++) {
                    /** @type {Sm.Core.MvCombo}  */
                    var item = result.items[i];
                    if (!item.queryStatus('completed')) {
                        found.push(item);
                        item.fetch().then(function (MvCombo) {
                            MvCombo && MvCombo.forEachView(function () {
                                Promise.resolve(this.replaceOldElement());
                            })
                        });
                    }
                }
                return result;
            };
        };
        Sm.loaded.add('Entities_Section_MvCombo');
    }, 'Entities_Section_MvCombo');
});