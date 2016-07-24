/**
 * Created by Sam Washington on 12/18/15.
 */


define(['Class', 'Sm'], function (Class) {
    var Sm                    = window.Sm;
    /**
     * @alias Sm.Core.RelationshipIndex
     * @exports RelationshipIndex
     * @class RelationshipIndex
     * Keeps track of the relationships of the class and the MvCombos that are being related. Add, remove, move, locate functions included
     * @property locate             {@link Sm.Core.RelationshipIndex#locate}
     * @property locate             {@link Sm.Core.RelationshipIndex#locate}
     * @property add_new_context    {@link Sm.Core.RelationshipIndex#add_new_context}
     * @property add_item           {@link Sm.Core.RelationshipIndex#add_item}
     * @requires Class
     */
    Sm.Core.RelationshipIndex = Class.extend({
        /**
         * Initialize the Relationship Index
         * @param settings
         * @param {string}              settings.index
         * @param {Array}               settings.linked_entities
         * @param {Sm.Core.MvCombo}     settings.MvCombo
         * @param {string}              settings.is_reciprocal
         * @param {string}              settings.parent_type
         * @param {string}              settings._key
         */
        init:                            function (settings) {
            settings           = settings || {};
            this._meta         = {
                /**
                 * Keeps track of how the items are indexed - by which id?
                 * @type {string}
                 */
                _key:   '',
                _index: settings.index || null,
                _list:  []
            };
            this.parent_type   = settings.parent_type;
            this.is_reciprocal = !!settings.is_reciprocal;
            var l_r            = this.linked_entities = settings.linked_entities || [];
            /**
             *
             * @type {{string:{relationship:Sm.Core.Relationship, index:int}}}
             */
            this.deleted_items = {};
            this.items         = {};
            this._meta._key    = settings._key || (this.is_reciprocal ? l_r[0] : l_r[1]) || false;
            this.operations    = {};
            this.contexts      = {};
            this.add_new_context(0);
            this.MvCombo       = settings.MvCombo;
            this.status        = {
                last_fetched: false
            };
            var self           = this;
            this.Identity      = Sm.Core.Identifier.get_or_init({
                id:       false,
                ent_id:   false,
                type:     'RelationshipIndex',
                Resource: self
            });
            /** @type {object<Sm.Core.Relationship.Identity.r_id, Sm.Core.MvCombo.Identity.r_id> } */
            this.r_id_map      = {};
            this._to_delete    = {};
        },
        /**
         * Get info about the relationship_type_obj object that this is referencing. This gets its info from one of the indices in the Meta relationship_type_obj
         * @see Sm.Core.Meta.relationship_type_obj
         * @return {*}
         */
        get_relationship_type_obj_index: function () {
            if (this.info_index) return this.info_index;
            var index = this._meta._index;
            if (!index) return {error: "No index"};
            var parent_type = this.parent_type;
            var selfSm      = Sm.Entities[parent_type];
            if (!selfSm) return {error: "no self Sm"};
            var Meta_ = selfSm.Meta;
            if (!Meta_) return {error: "No info object for type " + this.parent_type};
            if (!Meta_.relationship_type_obj) return {error: "No info object relationship type obj"};
            if (!Meta_.relationship_type_obj[index]) return {error: "No info object for index " + index + '"'};
            var info_index   = Meta_.relationship_type_obj[index];
            info_index.index = index;
            this.info_index  = info_index;
            return info_index;
        },
        /**
         * Retrieve all of the models from the server that fall under this particular index
         * @alias Sm.Core.RelationshipIndex#fetch
         * @return {Promise}
         */
        fetch:                           function () {
            var info_index = this.get_relationship_type_obj_index();
            if (info_index.error) return Promise.reject(info_index);
            var model_type        = info_index.model_type;
            var is_reciprocal = this.is_reciprocal;
            var lower_mv;
            Sm.Entities[model_type]
            && Sm.Entities[model_type].Meta
            && (lower_mv = Sm.Entities[model_type].Meta.lower_plural[model_type]);
            var url           = Sm.urls.api.generate({
                MvCombo:           this.MvCombo,
                fetch:             lower_mv || model_type,
                find_usages:       is_reciprocal,
                relationship_type: info_index.index
            });
            if (!url || !url.length)return Promise.reject({error: "No URL"});
            this.status.last_fetched = new Date;
            return Promise.resolve($.ajax({
                url:         url,
                contentType: 'application/json; charset=UTF-8',
                method:      "GET"
            })).then(function (response) {
                if (typeof  response == 'object' && response.error && response.error.length) {
                    throw response.error;
                }
                if (!(Object.prototype.toString.call(response) === '[object Array]')) {
                    response = [response];
                }
                var others = [];
                for (var i = 0; i < response.length; i++) {
                    var model        = response[i];
                    Sm.CONFIG.DEBUG && console.log(model);
                    var m_model_type = model._model_type;
                    if (!m_model_type) continue;
                    var other_Sm = Sm.Entities[m_model_type];
                    if (!other_Sm) continue;
                    var OtherMvCombo = other_Sm.Wrapper.init_MvCombo({
                        model: model
                    });
                    others.push(OtherMvCombo);
                }
                return others;
            });
        },
        toJSON:                          function (context_id) {
            var info_index = this.get_relationship_type_obj_index();
            if (typeof info_index === "string") return Promise.reject(info_index);
            var context          = this.contexts[context_id] || this;
            var meta             = context._meta;
            var items            = context.items;
            var operations       = context.operations || {};
            var jsonObj          = {
                _meta:      meta,
                maps:       {},
                identities: {},
                operations: operations,
                context_id: context_id
            };
            var key              = this._meta._key;
            context._meta._index = this._meta._index;

            for (var index_ in operations) {
                if (!operations.hasOwnProperty(index_)) continue;
                var item_index = index_ in items ? items : context.deleted_items;
                var item       = item_index[index_].relationship || item_index[index_];
                if (!item.map) {
                    Sm.CONFIG.DEBUG && console.log(item, items, index_, index_ in items, item_index[index_]);
                    continue;
                }
                var map_link_key = item.get_Identity_at_index(key);
                if (!map_link_key) {
                    Sm.CONFIG.DEBUG && console.log(item);
                    continue;
                }
                jsonObj.maps[index_]       = item.map;
                jsonObj.identities[index_] = map_link_key;
            }

            return jsonObj;
        },
        /**
         * Save a RelationshipIndex
         * @param settings
         * @return {Promise}
         */
        save:                            function (settings) {
            settings       = settings || {};
            var context_id = settings.context_id;
            var context;
            context        = (context_id !== null && context_id !== "undefined") ? this.contexts[context_id] : this;
            if (!context) return Promise.reject({error: "No Context"});
            if (this.is_reciprocal) return Promise.resolve(true);
            var url = Sm.urls.api.generate({MvCombo: this.MvCombo});
            if (!url || !url.length)return Promise.reject({error: "No URL"});
            var self = this;
            return Promise.resolve($.ajax({
                url:         url,
                data:        JSON.stringify(context),
                contentType: 'application/json; charset=UTF-8',
                method:      "PATCH"
            })).then(function (result) {
                Sm.CONFIG.DEBUG && console.log(result);
                var deleted_items = self.deleted_items;
                var r_id;
                //Add back the ones that weren't successful
                if (typeof result === "object") {
                    var message = result.message;
                    var success = result.success;
                    var data    = result.data;
                    for (r_id in data) {
                        if (!data.hasOwnProperty(r_id)) continue;
                        var api_response      = data[r_id];
                        api_response.data.map = api_response.data.map || {};
                        if (api_response.success === true || api_response.success === 0) {
                            var item                 = context.items[r_id];
                            item.setMap(api_response.data.map);
                            context.operations[r_id] = [];
                        } else if (r_id in deleted_items) {
                            self.add_item(deleted_items[r_id], r_id, context_id, false, true)
                        }
                    }
                } else {
                    for (r_id in deleted_items) {
                        if (!deleted_items.hasOwnProperty(r_id)) continue;
                        self.add_item(deleted_items[r_id], r_id, context_id, false, true)
                    }
                }
                self.deleted_items = {};
            });
        },
        /**
         * Add a new potential relationship context to the list for relationships
         * @alias Sm.Core.RelationshipIndex#add_new_context
         * @param {r_id|int}    r_id    The r_id of the new context
         * @return {{_meta: {_list: Array, _index: (*|null)}}}
         */
        add_new_context:                 function (r_id) {
            var index = this._meta.index;
            var key   = this._meta._key;
            var self  = this;
            return this.contexts[r_id] || (this.contexts[r_id] = {
                    _meta:         {
                        /**
                         * A list of the relationships that exist in the main context
                         */
                        _list:  [],
                        _index: index || null,
                        _key:   key || false
                    },
                    deleted_items: {},
                    items:         {},
                    operations:    {},
                    toJSON:        self.toJSON.bind(self, r_id)
                });
        },
        /**
         * Return the index of a item relative to other based on an identifier
         * @alias Sm.Core.RelationshipIndex#locate
         * @param {r_id|Sm.Core.Identifier|Sm.Core.MvCombo}     identifier  The identity we are searching for
         * @param {r_id|int=}                                   context_id  The context to search
         * @returns {int}
         */
        locate:                          function (identifier, context_id) {
            if (!identifier) return -1;
            if (typeof identifier === "string") {
                var context;
                context    = context_id === null ? this : this.contexts[context_id];
                context_id = context_id || 0;

                if (!context || !context._meta || !context._meta._list) return -1;
                return context._meta._list.indexOf(identifier);
            }
            if (identifier.r_id) return this.locate(identifier.r_id, context_id);
            if (identifier.Identity) return this.locate(identifier.Identity);

            return -1;
        },
        sort_incoming:                   function (Relationship_, item_id) {},
        /**
         * Add a relationship to the list of known relationships
         * @alias Sm.Core.RelationshipIndex#add_item
         * @param Relationship_
         * @param item_id       The r_id of the entity that we are adding
         * @param context_id
         * @param update_indices
         * @returns {boolean}
         * @param silent
         */
        add_item:                        function (Relationship_, item_id, context_id, update_indices, silent) {
            var map = Relationship_.map || {};
            if (!map) return false;
            if (Relationship_.relationshipIndexRIDs.indexOf(this.Identity.r_id) < 0) Relationship_.relationshipIndexRIDs.push(this.Identity.r_id);
            var position                               = map.position || 1;
            position                                   = parseInt(position);
            update_indices                             = !!update_indices;
            context_id                                 = context_id || 0;
            var context                                = this.contexts[context_id] || this.add_new_context(context_id);
            var skip_context                           = false, skip_original = false;
            this.r_id_map[Relationship_.Identity.r_id] = item_id;
            //The position has to be at least 0
            (position < 0 && (position = 0));
            //If the item id is already in either of the lists (for some reason) skip adding it
            if (context._meta._list.indexOf(item_id) > -1) skip_context = true;
            if (this._meta._list.indexOf(item_id) > -1) skip_original = true;

            var context_length = context._meta._list.length;
            var length         = this._meta._list.length;
            var t_p;
            if (!skip_original) {
                t_p = position;
                t_p > length && (t_p = length);
                if (!length || (t_p >= length)) {
                    this._meta._list.push(item_id);
                }
                else (this._meta._list.splice(t_p - 1, 0, item_id));
            }
            if (!skip_context) {
                //If the position is greater than the limits of the array, just append it.
                //Otherwise, add it at the position intended. Because the position in the Database is 1 indexed (WHY?) #todo
                t_p = position;
                t_p > context_length && (t_p = context_length);
                if (!context_length || (t_p >= context_length)) {
                    context._meta._list.push(item_id);
                }
                else {
                    t_p || (t_p = 1);
                    context._meta._list.splice(t_p - 1, 0, item_id);
                }
                context.items[item_id] = Relationship_;
            }

            this.items[item_id] = Relationship_;
            if (!silent) {
                context.operations[item_id] = context.operations[item_id] || [];
                context.operations[item_id].push('add');
                this.operations[item_id]    = this.operations[item_id] || [];
                this.operations[item_id].push('add');
            }
            //We are able to decide to update the array indices
            if (update_indices) this.update_indices(context_id);
            this.sort_incoming(Relationship_, item_id);
            return true;
        },

        /**
         * Get an object containing two arrays: one with the items that are being related, one with the
         * @param context_id
         * @return {{relationships: Array, items: Array<Sm.Core.MvCombo>, count: int}}
         */
        get_listed_items:             function (context_id) {
            context_id  = context_id || 0;
            var context = this.contexts[context_id + ''];
            //var items   = context.items;
            var list    = context._meta._list;
            var items   = context.items;
            var ret_obj = {
                relationships: [],
                items:         [],
                count:         0
            };
            for (var i = 0; i < list.length; i++) {
                var item_id = list[i];
                if (!items[item_id]) continue;
                var Relationship = items[item_id];
                var OtherMvCombo = Sm.Core.Identifier.retrieve({r_id: item_id});
                if (!OtherMvCombo) continue;
                OtherMvCombo = OtherMvCombo.getResource();
                ret_obj.items.push(OtherMvCombo);
                ret_obj.relationships.push(Relationship);
            }
            ret_obj.count = ret_obj.items.length;
            return ret_obj;
        },
        /**
         * Update the _list w/r to a specific context. Main context if not specified
         * @alias Sm.Core.RelationshipIndex#update_indices
         * @param {int|r_id=} context_id
         * @return {boolean}
         */
        update_indices:               function (context_id) {
            if (context_id || !context_id) return true; //todo todo todo
            context_id = context_id || 0;
            if (!this.contexts[context_id]) return false;
            var context      = this.contexts[context_id];
            var items        = context.items;
            var list         = context._meta._list;
            var updated_list = [];
            //iterate through the items and add their positions to a list
            for (var item_r_id in items) {
                if (!items.hasOwnProperty(item_r_id)) continue;
                var item = items[item_r_id];
                //get the position from the map/position
                var position = item.position || item.map.position || 1;
                if (!position) continue;
                //Add that position to the list
                updated_list.push({
                    item:     item,
                    r_id:     item_r_id,
                    position: position
                });
            }
            //Sort the list
            updated_list.sort(function (a, b) {
                return a.position - b.position;
            });

            //Iterate through that list and add the items to the right place
            var u_length = updated_list.length;
            u_length && (context._meta._list = []);
            for (var i = 0; i < u_length; i++) {
                var obj1                      = updated_list[i];
                context._meta._list.push(obj1.r_id);
                items[obj1.r_id].map.position = i + 1;
            }
        },
        /**
         * Remove a relationship from the list
         * @alias Sm.Core.RelationshipIndex#remove_item
         * @param {Sm.Core.MvCombo.Identity.r_id|Sm.Core.Relationship|Sm.Core.Identifier}item
         * @param context_id
         * @param update_indices
         * @return {boolean|*}
         */
        remove_item:                  function (item, context_id, update_indices) {
            var all_contexts = this.contexts;
            var other_context_id;
            if (context_id == null) {
                var result = true, last_relationship;
                for (other_context_id in all_contexts) {
                    if (!all_contexts.hasOwnProperty(other_context_id)) continue;
                    result = (last_relationship = this.remove_item(item, other_context_id, update_indices)) && result;
                }
                return result ? last_relationship : false;
            }
            context_id = context_id || 0;
            if (typeof  item === "object") {
                if (item.setMap) {
                    item = this.r_id_map[item.Identity.r_id];
                } else if (item.r_id) {
                    item = item.r_id;
                }
                context_id = context_id || item.context_id || 0;
            }
            if (!this.contexts[context_id]) return false;

            var context = this.contexts[context_id];
            var items   = context.items;
            var list    = context._meta._list;
            if (!item in list) return false;
            var index           = this.locate(item, context_id);
            list.splice(index, 1);
            var can_remove_meta = false;
            for (other_context_id in all_contexts) {
                if (!all_contexts.hasOwnProperty(other_context_id)) continue;
                if (this.locate(item, other_context_id) > -1) {
                    can_remove_meta = true;
                    break;
                }
            }
            can_remove_meta && this._meta._list.splice(this.locate(item, null), 1);

            var relationship = items[item];
            delete items[item];
            if (!!update_indices) {
                this.update_indices(context_id);
            }
            context.operations[item] = context.operations[item] || [];
            context.operations[item].push('delete');
            if (can_remove_meta) {
                this.operations[item] = this.operations[item] || [];
                this.operations[item].push('delete');
            }
            if (this.MvCombo && item in this.MvCombo.relationship_map) {
                delete this.MvCombo.relationship_map[item];
            }
            context.deleted_items[item] = {
                relationship: relationship,
                index:        index
            };
            return relationship || false;
        },
        /**
         * Change the position of an item
         * @alias Sm.Core.RelationshipIndex#move_item
         * @param {r_id}    item_id         The r_id of the item whose position we are changing
         * @param {int}     new_position    The new position to move it to. 0 indexed
         * @param {r_id=}   context_id      The context of the relationship's existence. Main if not specified
         * @param {boolean} update_indices  Should we reindex the _list array? {@see Sm.Core.RelationshipIndex#update_indices}
         * @return {boolean} Were we successful?
         */
        move_item:                    function (item_id, new_position, context_id, update_indices) {
            if (!item_id) return false;
            context_id       = context_id || 0;
            var old_position = this.locate(item_id, context_id);
            if (old_position === -1) return false;

            var context = this.contexts[context_id];
            if (old_position == new_position) return true;
            if (old_position > new_position) {
                context._meta._list.splice(old_position, 1);
                context._meta._list.splice(new_position, 1, item_id);
            } else {
                context._meta._list.splice(new_position, 1, item_id);
                context._meta._list.splice(old_position, 1);
            }
            if (!!update_indices) {
                this.update_indices(context_id);
            }
            context.operations[item_id] = context.operations[item_id] || [];
            context.operations[item_id].push('move');
            if (!context_id) {
                this.operations[item_id] = this.operations[item_id] || [];
                this.operations[item_id].push('move');
            }
            return true;
        },
        /**
         * Return whether or not there exist relationships in one particular conrext
         * @param context_id
         * @return {*}
         */
        has_relationships_in_context: function (context_id) {
            context_id = context_id || 0;
            if (this.contexts[context_id] && this.contexts[context_id]._meta._list.length) {
                return true;
            } else if (this.status.last_fetched) {
                return false;
            } else {
                return 0;
            }
        }
    });
    Sm.loaded.add('Core_RelationshipIndex');
});