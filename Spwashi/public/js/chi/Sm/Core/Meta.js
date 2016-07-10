/**
 * Created by Sam Washington on 12/20/15.
 */
define(['Emitter'], function (Emitter) {
    /**
     * @class Meta
     * @alias Sm.Core.Meta
     * @extends Emitter
     * @prop {function} add_MV_as                           {@link Sm.Core.Meta#add_MV_as}
     * @prop {function} remove_MV_as                        {@link Sm.Core.Meta#remove_MV_as}
     * @prop {{}}       relationship_types                  {@link Sm.Core.Meta#relationship_types}
     * @prop {{}}       relationship_type_obj               {@link Sm.Core.Meta#relationship_type_obj}
     * @prop {{}}       types                               {@link Sm.Core.Meta#types}
     * @prop {{}}       relationship_aliases                {@link Sm.Core.Meta#relationship_aliases}
     * @prop {function} get_type                            {@link Sm.Core.Meta#get_type}
     * @prop {function} get_possible_relationship_indices   {@link Sm.Core.Meta#get_possible_relationship_indices}
     * @prop {function} get_relationship_type               {@link Sm.Core.Meta#get_relationship_type}
     *
     */
    var Meta                      = Emitter.extend({
        CONFIG:                            {
            DEBUG:       false,
            EDIT:        false,
            DRAG_N_DROP: false
        },
        MvMaps:                            {},
        init:                              function (settings) {
            this.events         = [];
            this._callbacks     = {};
            this.MvMaps         = {
                loaded_MVs:   {},
                focused_MVs:  {},
                selected_MVs: {},
                active_MVs:   {},
                deleted_MVs:  {}
            };
            this.loaded_ent_ids = {};

            settings            = settings || {};
            this.type           = settings.type;
            this.lower_plural   = this.lower_plural || {};
            this.lower_singular = this.lower_singular || {};

            var entities = Sm.Entities;
            for (var entity_name in entities) {
                if (!entities.hasOwnProperty(entity_name)) continue;
                this.lower_singular[entity_name] =
                    this.lower_singular[entity_name]
                    || entity_name.toLowerCase();
                this.lower_plural[entity_name]   =
                    this.lower_plural[entity_name]
                    || (entities[entity_name].plural || entity_name + 's').toLowerCase();
            }
        },
        relationship_types:                {
            children:    1,
            composition: 2,
            macros:      3,
            micros:      4,
            pivots:      5
        },
        relationship_subtypes:             {
            eli5:            1,
            thing_explainer: 2,
            image:           3,
            video:           4,
            audio:           5,
            text:            6
        },
        relationship_type_obj:             {},
        /**
         * Return an Array containing the possible ways that something can be related to another entity based on some properties
         */
        types:                             {
            standard: 1
        },
        /**
         * Sometimes the relationship will have a different index in the receiving class than we can automatically identify.
         * This is the object that links type:alias
         */
        relationship_aliases:              {},
        /**
         * Get the either the index or the ID of the entity based on a provided index or ID
         * @param what_to_get
         * @param identifier
         * @return {*}
         */
        get_type:                          function (what_to_get, identifier) {
            var types = this.types;
            for (var t in types) {
                if (!types.hasOwnProperty(t)) continue;
                if (t == identifier || types[t] == identifier) return what_to_get == 'index' ? t : types[t];
            }
            return false;
        },
        /**
         * Return an Array containing the possible ways that something can be related to another entity based on some properties
         * @alias Sm.Core.Meta#get_possible_relationship_indices
         * @param settings
         * @param settings.map
         * @param settings.OtherMvCombo
         * @param settings.SelfMvCombo
         * @return {[]}                 This returns an array like [null, {relationship index}, ...] when asking for reciprocal indices, or [{rel ind}, ...] otherwise
         */
        get_possible_relationship_indices: function (settings) {
            return [];
        },
        /**
         * Return the type of relationship something is based on some sort of identifier
         * @param {{}}                                                                              settings
         * @param {boolean}                                                                         settings.sub             Are we looking for a subtype?
         * @param {string}                                                                          settings.type            The type to search for. [index|id]
         * @param {int|string}                                                                      settings.identifier      The relationship type (relationship_type_id or relationship_type name)
         * @param {{collection_id:string, dimension_id: string, dictionary_id: string}=}            settings.map             A map object. Only used as support. Not good. Don't know why I did this.
         * @param {boolean=false}                                                                   settings.is_reciprocal   Whether or not the relationship is reciprocal
         * @param {string|int|*}                                                                    identifier
         * @return {string|boolean|int}
         */
        get_relationship_type:             function (settings, identifier) {
            /** NOTE: this is where iterates over object to find return type**.
             settings                  = settings || {};
             /** @type {boolean} Whether the relationship is reciprocal. If so, could possibly change the guess of what the relationship is based on the map */
            var is_reciprocal         = !!settings.is_reciprocal;
            /** @type {string} The type tp find - index|id */
            var type                  = settings.type || 'index';
            /** @type {string} The identifier that we will use to know what we are looking for. Could be an index or ID of the relationship type */
            identifier                = identifier || settings.identifier || false;
            /** @type {{}} The map object of the relationship. When guessing the IDs of the relationship later, this map is what we'll use for the indices */
            var map                   = settings.map || {};
            /**
             * This is the relationship type object that has information on the relationships
             * @type {Meta.relationship_type_obj|{}}
             */
            var relationship_type_obj = !!settings.sub ? this.relationship_subtypes : this.relationship_type_obj;
            /** @type {boolean} Whether or not we are getting the ID */
            var get_id                = (type == 'id');
            /** @type {string|int} The index of the relationship*/
            var index;
            identifier                = identifier || map.relationship_type || false;
            /** @type {*} The object of the Entities that are in the Sm namespace */
            var SmEntities            = Sm.Entities;
            if (!identifier) return false;
            /**
             * Iterate through the relationship type object to find things that are mapped together
             */
            for (var relationship_type_index in relationship_type_obj) {
                if (!relationship_type_obj.hasOwnProperty(relationship_type_index)) continue;
                var rel_type = relationship_type_obj[relationship_type_index];
                /** @type {string} Either the index or the ID based on what we want to retrieve */
                index        = !!get_id && !!rel_type.id ? rel_type.id : relationship_type_index;

                if (get_id) {
                    if (rel_type.id) index = rel_type.id;
                    else index = parseInt(rel_type);
                }
                if (rel_type == identifier) return index;
                // If the Identifier matches the type index, return what we want because it's a match}
                if (identifier == relationship_type_index) return index;
                if (!(typeof rel_type === "object")) continue;
                rel_type.index_singular = rel_type.index_singular || '';
                rel_type.id             = rel_type.id || '';
                // Same for the singular index. If there is a case where there are multiple indices delimited by pipes, search those for the right index
                if (identifier == rel_type.index_singular || rel_type.index_singular.toLowerCase().search(new RegExp("\\|?" + identifier.toLowerCase() + "\\|?")) > -1) return index;
                // If the identifier matches the id, return that
                if (!!rel_type.id && identifier == rel_type.id) return index;
            }
            /**
             * Search the SmEntities to find out what the other type in the map would be. If it's reciprocal, we return the other type based on the
             */
            for (var entity_type in SmEntities) {
                if (!SmEntities.hasOwnProperty(entity_type) || entity_type != this.type) continue;
                //guess the other type
                var probable_other_id = this.lower_singular[entity_type] + '_id';
                //If that's in the map, return the index of the entity we're on if it's not reciprocal. Otherwise, return the relationship index of this entity
                if (probable_other_id in map) return is_reciprocal ? this.lower_plural[entity_type] : this.lower_plural[this.type];
            }
            if (!!settings.sub) {
                Sm.CONFIG.DEBUG && console.log(rel_type);
            }
            return false;
        },
        get_MVs:                           function (type) {
            //Sm.CONFIG.DEBUG && console.log(type, this.MvMaps[type], /loaded|active|focused|selected|deleted/.test(type));
            if (/loaded|active|focused|selected|deleted/.test(type)) return this.MvMaps[type + "_MVs"];
        },
        /**
         * Add Mv as type (linked, active, deleted, focused, selected)
         * @alias Sm.Core.Meta#add_MV_as
         * @param {string}              type_to_add
         * @param {Sm.Core.Identifier}    Id
         */
        add_MV_as:                         function (type_to_add, Id) {
            if (!Id) return this;
            var ent_id = Id.ent_id || Id.getResource().ent_id;
            var rid    = Id.r_id;
            if (!rid) return this;
            var MvMaps = this.MvMaps;
            this.type !== false && Sm.Core.Meta.add_MV_as(type_to_add, Id);
            switch (type_to_add) {
                case 'loaded':
                    MvMaps.loaded_MVs[rid] = Id;
                    break;
                case 'active':
                case 'focused':
                case 'selected':
                    if (!(type_to_add + '_MVs' in MvMaps)) {
                        Sm.CONFIG.DEBUG && console.log(type_to_add, MvMaps);
                        return this;
                    }
                    MvMaps[type_to_add + '_MVs'][rid] = Id;
                    !(rid in MvMaps.loaded_MVs) && (MvMaps.loaded_MVs[rid] = Id);
                    !(rid in MvMaps.active_MVs) && (MvMaps.active_MVs[rid] = Id);
                    break;
            }
            (!!ent_id) && (this.loaded_ent_ids[ent_id] = Id);
            return this;
        },
        /**
         * Remove Mv as type (linked, active, deleted, focused, selected)
         * @alias Sm.Core.Meta#remove_MV_as
         * @param {string}              type_to_remove
         * @param {Sm.Core.Identifier}    Id
         */
        remove_MV_as:                      function (type_to_remove, Id) {
            var rid = Id.r_id;
            if (!rid) return this;
            var name   = type_to_remove + '_MVs';
            var MvMaps = this.MvMaps;
            if (!MvMaps[name]) return false;
            this.type !== false && Sm.Core.Meta.remove_MV_as(type_to_remove, Id);
            (rid in this.MvMaps[name]) && delete this.MvMaps[name][rid];
            if (name == 'loaded') {
                (rid in this.MvMaps.active_MVs) && delete this.MvMaps.active_MVs[rid];
                (rid in this.MvMaps.selected_MVs) && delete this.MvMaps.selected_MVs[rid];
                (rid in this.MvMaps.focused_MVs) && delete this.MvMaps.focused_MVs[rid];
            } else if (name == 'active') {
                (rid in this.MvMaps.selected_MVs) && delete this.MvMaps.selected_MVs[rid];
                (rid in this.MvMaps.focused_MVs) && delete this.MvMaps.focused_MVs[rid];
            }
            return true;
        }
    });
    /**
     * @property lower_plural
     */
    Sm.Core.Meta                  = new Meta({
        type: false
    });
    Sm.Core.Meta.base_constructor = Meta;
    Sm.loaded.add('Core_Meta');
});