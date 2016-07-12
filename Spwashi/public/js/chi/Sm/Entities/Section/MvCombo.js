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
            scale:                             function (scale_towards_micros, context_id) {
                var get_listed_items = Sm.Entities.Section.MvCombo.generate_standard_get_listed_items_fn('micros', context_id);
                var result           = Sm.Core.MvCombo.replace_MV({
                    MvCombo:             this,
                    is_reciprocal:       !scale_towards_micros,
                    list_items_fn:       get_listed_items,
                    replacement_indices: 'micros'
                });
                return Promise.resolve(result);
            },
            pivot:                             function (where, context_id) {
                //Sm.CONFIG.DEBUG && console.log('ORIGINAL_WHERE', where);
                var is_home          = where.constructor === Array && where[0] == 'home';
                where                = is_home ? (where[1] || false) : Sm.Entities.Section.Meta.get_relationship_type({sub: true, type: 'index'}, where);
                var get_listed_items = Sm.Entities.Section.MvCombo.generate_standard_get_listed_items_fn('pivots', context_id, where);
                //Sm.CONFIG.DEBUG && console.log('Attempt ', [this.Identity.r_id], ' - ', where);
                var result = Sm.Core.MvCombo.replace_MV({
                    MvCombo:             this,
                    replace_effective:   true,
                    is_reciprocal:       is_home,
                    list_items_fn:       get_listed_items,
                    replacement_indices: 'pivots'
                });
                //Sm.CONFIG.DEBUG && console.log('Replaced ', result.replaced_MVs, is_home);
                //Sm.CONFIG.DEBUG && console.log('New ones ', result.replacement_MVs);
                return Promise.resolve(result || {});
            },
            /**
             * Based on an MvCombo, find the various relationship subtypes that the MvCombo has
             * @param what_we_on
             * @param context_id
             * @return {{}}
             */
            get_relationship_subtypes:         function (what_we_on, context_id) {
                var return_object  = {};
                /**
                 * The Pivots of the MvCombo that this Section is related to
                 * @type {Sm.Entities.Section.RelationshipAbstraction.pivots_RelationshipIndex}
                 */
                var PivotsRelIndex = this.relationships.pivots;
                //If the RelationshipIndex doesn't exist, return a standard object
                if (!PivotsRelIndex) return {};
                /**
                 * An object representing the relationship subtypes that the pivot RelationshipIndex is keeping track of. Links subtypes to
                 * @type {Sm.Entities.Section.RelationshipAbstraction.pivots_RelationshipIndex.relationship_subtype_map|{}}
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
            _build_other_MV:                   function (otherWrapper, settings) {
                settings.model_properties = settings.model_properties || {};
                var definition_type       = Sm.Entities.Section.Meta.types.definition;
                if (otherWrapper.type == "Section" && this.Model.attributes.section_type == definition_type) {
                    settings.model_properties.section_type = definition_type;
                }
                return otherWrapper.build_MV(settings);
            },
            _continue_prompt_relationship_add: function (OtherMvCombo, settings) {
                /**NOTE: Handles prompting of section-type and position as well as validation and transform from input
                 * to relationship type
                 **/
                var self_Sm = Sm.Entities[this.type];
                if (!self_Sm) return Promise.reject('No SM');
                var Meta_     = self_Sm.Meta;
                var otherType = OtherMvCombo.type;
                var opposite  = false;
                return (new Promise(function (resolve, reject) {
                    reject                      = reject || function (error) {return Sm.CONFIG.DEBUG && console.log(error) && false;};
                    var potential_relationships = Meta_.get_possible_relationship_indices({OtherMvCombo: OtherMvCombo});
                    if (potential_relationships.length == 1) settings.relationship_index = potential_relationships[0];
                    if (!settings.relationship_index) {
                        if (!Meta_ || !Meta_.get_relationship_type) return reject('The relationship type is not established');

                        settings.relationship_index = prompt('What is the relationship type?');
                        if (settings.relationship_index.indexOf('reciprocal_') === 0 || settings.relationship_index.indexOf('!') === 0) {
                            settings.relationship_index = settings.relationship_index.replace('reciprocal_', '').replace('!', '');
                            opposite                    = true;
                            Sm.CONFIG.DEBUG && console.log(settings.relationship_index, opposite);
                        }
                        settings.relationship_index = Meta_.get_relationship_type({type: 'index'}, settings.relationship_index);
                    }
                    if (!settings.relationship_index) return reject('There is no established relationship type');

                    if (settings.relationship_index == "pivots") {
                        settings.map.relationship_subtype = Meta_.get_relationship_type({type: 'id', sub: true}, prompt('What is the relationship subtype?'));
                    }
                    /*
                     * 1) determine pivot type requested
                     * 2) determine types of pivots available
                     * 3) determine define pivot subtype if valid request
                     * 4) continue creating pivot
                     */
                    else if (!settings.position && otherType != 'Concept') {
                        settings.position     = prompt('At which position should we add the relationship?');
                        settings.position     = settings.position || 0;
                        settings.map.position = settings.position;
                    }

                    if (!!settings.OtherView && !!settings.OtherView.MvCombo) {
                        var clone = true || parseInt(prompt('Clone?'));
                        settings.OtherView.MvCombo.blur();
                        if (!!clone) (settings.OtherView = settings.OtherView.clone());
                    }
                    return resolve({
                        opposite: opposite
                    });
                }));
            },
            _relationship_detail_hook:         function (type, settings, map, lc) {
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
         */
        Sm.Entities.Section.MvCombo.generate_standard_get_listed_items_fn = function (relationship_index, context_id, relationship_subtype) {
            return function (MvCombo, is_reciprocal, other_important_items) {
                /** @type {Sm.Core.RelationshipIndex|Sm.Entities.Section.RelationshipAbstraction.pivots_RelationshipIndex|boolean} The RelationshipIndex that we are going to deal with */
                var RelationshipIndex = MvCombo.getRelationshipIndex(relationship_index, is_reciprocal);
                //Sm.CONFIG.DEBUG && console.log(' + find rels+ ', RelationshipIndex.get_listed_items(context_id).items.map(function (im) {return im.r_id;}), is_reciprocal);
                if (!RelationshipIndex) return {relationships: [], items: []};
                return relationship_index == 'pivots' ? RelationshipIndex.get_listed_subtype_items(relationship_subtype, context_id) : RelationshipIndex.get_listed_items(context_id);
            };
        };
        Sm.loaded.add('Entities_Section_MvCombo');
    }, 'Entities_Section_MvCombo');
});