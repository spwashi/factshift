/**
 * Created by Sam Washington on 11/6/16.
 */
define(['require', 'Sm', 'Emitter', 'Sm-Core-Core'], function (require, Sm, Emitter) {
    /**
     *
     * @augments Sm.Abstraction.Views.Viewable
     */
    Sm.Abstraction.RelationshipIndex =
        Emitter.extend(
            {
                /**
                 * @constructor
                 * @param {Sm.r_id}  entity_r_id
                 * @param {string}   relationship_index
                 * @param {{}}       details
                 * @param {boolean}  details.is_reciprocal Whether or not the RelationshipIndex exists to reciprocate relationships
                 */
                init:        function (entity_r_id, relationship_index, details) {
                    /** @type {Sm.r_id} */
                    this.resource_r_id = entity_r_id;
                    /** @type {Sm.relationship_info} */
                    this.relationship_info = details.relationship_info || {};
                    /** @type {string} */
                    this.relationship_index = relationship_index;
                    /** @type {boolean} */
                    this.is_reciprocal = details.is_reciprocal || false;
                    /** @type {Sm.Core.Identifier}  */
                    this.Identifier = new Sm.Core.Identifier(this, {object_type: 'RelationshipIndex'});

                    /** @type {{}} this.self_map_index_details An object to cache information about the way this Entity is related to the rest*/
                    this.self_map_index_details = null;
                    this.items = {};
                    this._list = [];
                    /**
                     * An object container for each RelationshipContext held by this RelationshipIndex
                     * @type {{}}
                     */
                    this.RelationshipContextContainer = {};
                },
                /**
                 * Get the Resource the the RelationshipIndex references
                 * @return {*}
                 */
                getResource: function () {
                    if (this.resource_r_id) return Sm.Core.Identifier.identify(this.resource_r_id);
                    return null;
                },

                /**
                 * I almost KNOW that I'm going to want to change this.
                 * This returns the index of an Entity in a Map relationship (e.g. section_id).
                 *
                 * @todo probably should be broken up
                 * @param {{}|Sm.Core.Identifier.Identifiable=}details
                 * @param {{Sm.json_model}}          details.map
                 * @param {Sm.Abstraction.Entity}    details.Entity
                 * @param {boolean}                  details.find_self
                 * @returns {{entity_type: Sm.entity_type|Sm.entity_type[], map_index:string|string[], id: Sm.id|null, ent_id:Sm.ent_id|null}}
                 */
                get_map_index_details: function (details) {
                    details       = details || {};
                    /** @type {boolean} find_self */
                    var find_self = details.find_self || false;
                    var Entity    = details.Entity || null;

                    /**
                     * The Entity that this RelationshipIndex is referencing
                     * @type {Sm.Core.Identifier.Identifiable}
                     */
                    var SelfEntity       = Sm.Core.Identifier.identify(this.resource_r_id) || null;
                    /**
                     * The type of Entity that we are looking for
                     */
                    var self_entity_type = SelfEntity.getEntityType();

                    /**
                     * If we are looking for an entity that matches the r_id of this, say that we are looking for the entity that we know about
                     */
                    if (Entity && Entity.getR_ID) find_self = (Entity.getR_ID() == this.resource_r_id);
                    /**@type {string|null} entity_type */
                    var entity_type = find_self ? self_entity_type : (Entity ? Entity.getEntityType() : null);
                    /** @type {Sm.Abstraction.Entity} Entity The entity that we are looking for*/
                    Entity = find_self ? SelfEntity : (Entity || null);

                    // if we've already found what we're looking for, return it
                    if (find_self && this.self_map_index_details) return this.self_map_index_details;

                    var map                    = details.map || null;
                    var linked_entities        = this.relationship_info.linked_entities || {};
                    /** @type {boolean} is_reciprocal Whether the RelationshipIndex exists soleley out of reciprocity*/
                    var is_reciprocal          = this.is_reciprocal;
                    /** @type {Array<Sm.entity_type>} potential_entity_types An array of the potential entity_types that could be referenced  */
                    var potential_entity_types = [];
                    /** @type {Array<Sm.map_index>} potential_map_indices */
                    var potential_map_indices  = [];

                    /**
                     * Iterate through an object representing the Entities that can be related via this RelationshipIndex
                     */
                    for (var le_string in linked_entities) {
                        if (!linked_entities.hasOwnProperty(le_string)) continue;
                        /**
                         * An object indexed by a linked_entity_string (e.g. Entity1|Entity2)
                         * that maps a map_index to the entity_type that it holds. entity_type could be an array
                         * @type {Object<Sm.map_index, string|Array>}
                         */
                        var le_object     = linked_entities[le_string];
                        /**
                         * An object indexed by an entity type that contains details about the first and last possible
                         * map index at which the entity that we're looking for could lie
                         * @type {Object<Sm.entity_type, {first:Sm.map_index, last:Sm.map_index}>}
                         */
                        var found_by_type = {};

                        /**
                         * Iterate through each object and see if we can identify whatever we're looking for in it
                         */
                        for (var map_index in le_object) {
                            if (!le_object.hasOwnProperty(map_index)) continue;
                            /** @type {Sm.entity_type} le_entity_type The Entity */
                            var le_entity_type = le_object[map_index];
                            if (entity_type && le_entity_type != entity_type) continue;
                            /** @type {int|null} id See if we can figure out the the ID*/
                            var id     = null;
                            /** @type {string|null} ent_id See if we can figure out the ent_id in the ap */
                            var ent_id = null;
                            /**
                             * If we specified the map that we are going to use to look for the entity,
                             * try to figure out the details of the entity that we're looking for in
                             * relation to the map
                             */
                            if (!!map && !!Entity) {
                                // If the map index isn't in the map that we specified, continue.
                                // We don't know anything, so continue
                                if (!map[map_index]) continue;

                                var item = map[map_index];
                                if (Sm.Core.Meta.isEntId(item)) {
                                    ent_id = item;
                                } else if (Sm.Core.Meta.isId(item)) {
                                    id = item;
                                }
                            }

                            // The found_by_type object is indexed by entity_type and contains info about the first and last map_index of that entity type
                            found_by_type[le_entity_type]       = found_by_type[le_entity_type] || {first: null, last: null};
                            found_by_type[le_entity_type].first = found_by_type[le_entity_type].first || map_index;
                            found_by_type[le_entity_type].last  = map_index;

                            // If we didn't specify the entity type, assume that we're looking for the entity_type that isn't
                            // the same as the Entity Type that holds this RelationshipIndex

                            if (!entity_type && (le_entity_type != self_entity_type)) {
                                potential_map_indices.push(map_index);
                                potential_entity_types.push(le_entity_type);
                            }
                        }

                        if (!entity_type) {
                            // If we didn't specify an entity type, the only thing that we hve to go on is this entity type.
                            // If the first occurrence isn't equal to the last occurrence,
                            // assume that we are looking for the reciprocal index (usually the last one).
                            // todo will this cause issues with reciprocity?
                            if (found_by_type[self_entity_type] && (found_by_type[self_entity_type].first != found_by_type[self_entity_type].last)) {
                                // Say that the last map_index we found that can also reference this entity type is something that we're looking for
                                potential_map_indices.push(is_reciprocal ? found_by_type[self_entity_type].last : found_by_type[self_entity_type].first)
                            }
                        } else if (found_by_type[entity_type]) {
                            // otherwise, look for the entity type in the object that lists the first and last occurrence of map indices for it.
                            // If we are looking reciprocally, return the last occurrence. Otherwise, return the first
                            potential_map_indices.push(is_reciprocal ? found_by_type[entity_type].last : found_by_type[entity_type].first);
                        }
                    }
                    /**
                     * Function to remove any duplicates
                     * @param {string}   value
                     * @param {int}      i
                     * @param {[]}       arr
                     * @return {boolean}
                     */
                    function onlyUnique(value, i, arr) {return arr.indexOf(value) === i;}

                    //remove duplicates
                    potential_entity_types = potential_entity_types.filter(onlyUnique);
                    potential_map_indices  = potential_map_indices.filter(onlyUnique);

                    // If we know the entity type, use that as the potential entity type.
                    // If we don't but there is only one entity type that we could be referring to, return that one or null.
                    // Otherwise, return null
                    potential_entity_types = entity_type ? entity_type : (potential_entity_types.length < 2 ? (potential_entity_types[0] || null) : potential_entity_types);
                    // If there is only one potential map index, return that one. Otherwise, return an array
                    potential_map_indices  = potential_map_indices.length < 2 ? (potential_map_indices[0] || null) : potential_map_indices;

                    return {
                        entity_type: potential_entity_types,
                        map_index:   potential_map_indices,
                        id:          id || null,
                        ent_id:      ent_id || null
                    };
                },

                /**
                 * Return whether this is reciprocal or nah
                 * @return {boolean}
                 */
                isReciprocal:           function () {return !!this.is_reciprocal},
                /**
                 * Get the name of the relationship_index
                 * @return {string}
                 */
                get_relationship_index: function () {return this.relationship_index},
                /**
                 * Get the default ID of the Context in which this Relationship exists
                 * Defaults to the R_ID of the Resource the RelationshipIndex refers to
                 * @return {Sm.r_id}
                 */
                getDefaultContextId:    function () {
                    return Sm.Abstraction.RelationshipIndex.getDefaultContextId();
                },
                /**
                 * Iterate through an object and return an array of its elements in order based on the _list
                 * @param object
                 * @param {Sm.r_id|null} context_id
                 * @return {Array}
                 */
                order_object:           function (object, context_id) {
                    if (!object || !(typeof object === "object")) return [];
                    var ret_arr             = [];
                    context_id              = context_id || this.getDefaultContextId();
                    var RelationshipContext = this.initRelationshipContext(context_id);
                    var list                = RelationshipContext._list;
                    for (var i = 0; i < list.length; i++) {
                        var identifier = list[i];
                        if (object[identifier]) ret_arr.push(object[identifier]);
                        else ret_arr.push(null);
                    }
                    return ret_arr;
                },
                getAllInSeries:         function (as_primary, context_id, return_relationships) {
                    var RelationshipIndex             = this;
                    return_relationships              = !!return_relationships;
                    var SelfEntity                    = RelationshipIndex.getResource();
                    var parentRelationships           = [];
                    var parentEntities                = [];
                    var relationship_index            = RelationshipIndex.get_relationship_index();
                    var reciprocal_relationship_index = (RelationshipIndex.is_reciprocal ? '' : 'reciprocal_') + relationship_index;
                    var getLoopFn                     = function (relationship_index, relationship_container, entity_container, getOtherEntity) {
                        return function (Relationship, index) {
                            var OtherEntity = (getOtherEntity ? getOtherEntity(Relationship, index) : null) || SelfEntity;
                            if (!OtherEntity) return null;
                            var ReciprocalRelationshipIndex = OtherEntity.getRelationshipIndex(relationship_index);
                            relationship_container.push.apply(relationship_container, ReciprocalRelationshipIndex.getItemList(context_id));
                            entity_container.push.apply(entity_container, ReciprocalRelationshipIndex.getOtherEntitiesList(context_id))
                        }
                    };
                    var items                         = RelationshipIndex.getItemList(context_id);
                    var otherEntities                 = RelationshipIndex.getOtherEntitiesList(context_id);
                    var getParents                    = getLoopFn(reciprocal_relationship_index, parentRelationships, parentEntities, function (r, i) {
                        return r.getOneOtherEntity(SelfEntity)
                    });
                    items.forEach(getParents);
                    if (!as_primary) return return_relationships ? parentRelationships : parentEntities;
                    var childrenRelationships = [];
                    var childrenEntities      = [];
                    var getChildren           = getLoopFn(relationship_index, childrenRelationships, childrenEntities, function (r, i) {
                        return parentEntities[i];
                    });
                    parentRelationships.forEach(getChildren);
                    return return_relationships ? childrenRelationships : childrenEntities;
                },
                /**
                 * Get the Relationships held in a context
                 * @param {Sm.r_id=}  context_id
                 * @return {{}}
                 */
                getItems:               function (context_id) {
                    var RelationshipContext = this.initRelationshipContext(context_id);
                    return RelationshipContext.items;
                },
                getOtherEntitiesList:   function (context_id) {
                    var Relationships = this.getItemList(context_id);
                    var EntityList    = [];
                    var SelfEntity    = this.getResource();
                    Relationships.forEach(/** @param {Sm.Abstraction.Relationship} Relationship */function (Relationship) {
                        EntityList.push.apply(EntityList, Relationship.getOtherEntities(SelfEntity));
                    });
                    return EntityList;
                },
                getItemList:            function (context_id) {
                    var items         = this.getItems(context_id);
                    var Relationships = [];
                    for (var i in items) {
                        if (!items.hasOwnProperty(i)) continue;
                        Relationships.push(items[i]);
                    }
                    return Relationships;
                },
                count:                  function (context_id) {
                    var context = this.initRelationshipContext(context_id);
                    return context._list.length;
                },

                /**
                 * Initialize a Context object for us to store relationships in
                 * @param {Sm.r_id} context_id
                 * @param {Array=}  list
                 * @return {Sm.Abstraction.RelationshipIndex.RelationshipContext}
                 */
                initRelationshipContext: function (context_id, list) {
                    context_id = context_id || this.getDefaultContextId();
                    var Identifier;
                    Identifier = Sm.Core.Identifier.retrieve(context_id) || null;
                    if (Identifier) context_id = Identifier.getR_ID();
                    var Context = Sm.Abstraction.RelationshipIndex.getContext(context_id);
                    context_id  = Context.getR_ID();
                    if (this.RelationshipContextContainer[context_id]) return this.RelationshipContextContainer[context_id];
                    /**
                     * @typedef {{}} Sm.Abstraction.RelationshipIndex.RelationshipContext
                     * @property {[]}    _list
                     * @property {{}}    items
                     */

                    /** @type {Sm.Abstraction.RelationshipIndex.RelationshipContext} context */
                    var RelationshipContext = this.RelationshipContextContainer[context_id] = {_list: list || [], items: {}};

                    // If the context is the default context, set this _list and items as that of the relationship context
                    if (context_id == this.getDefaultContextId()) {
                        this._list = RelationshipContext._list;
                        this.items = RelationshipContext.items;
                    }
                    return RelationshipContext;
                },

                createRelationship:        function (OtherEntities, map) {
                    if (!Sm.Core.Util.isArray(OtherEntities)) OtherEntities = [OtherEntities];
                    else if (OtherEntities.length !== 1) throw new Sm.Exceptions.Error("Not sure how to add relationship", {
                        self:    this.getResource(),
                        other:   OtherEntities,
                        rel_ind: this.get_relationship_index()
                    });
                    var Entity            = OtherEntities[0];
                    var RelationshipIndex = this;
                    var SelfEntity        = this.getResource();
                    var RelatedEntities   = {};
                    var map_index_self    = RelationshipIndex.get_map_index_details({map: map, Entity: SelfEntity});
                    var map_index_other   = RelationshipIndex.get_map_index_details({map: map, Entity: Entity});
                    if (!map_index_self || !map_index_other) throw new Sm.Exceptions.Error("Could not link entities to a map index", {
                        self:    SelfEntity,
                        other:   OtherEntities,
                        rel_ind: this.get_relationship_index()
                    });
                    RelatedEntities[map_index_self.map_index]  = SelfEntity;
                    RelatedEntities[map_index_other.map_index] = Entity;
                    return Sm.Abstraction.Relationship.createRelationship([SelfEntity.getR_ID(), Entity.getR_ID()], Map || map);
                },
                /**
                 * Add a Relationship to this RelationshipIndex at a specified RelationshipContext
                 * @param {Sm.Abstraction.Relationship} Relationship
                 * @param {int=0}                       position
                 * @param {Sm.r_id|null=}               context_id
                 * @returns Sm.Promise
                 */
                addRelationship:           function (Relationship, position, context_id) {
                    position   = position || 0;
                    context_id = context_id || this.getDefaultContextId();
                    Relationship.addRelationshipIndexR_Id(this.getR_ID());

                    /**
                     * Where the elements are going to be stored
                     * @type {any}
                     */
                    var index               = this.getRelationshipIdentifier(Relationship);
                    var RelationshipContext = this.initRelationshipContext(context_id);
                    if (this.indexOf(Relationship) > -1) return this.moveRelationship(Relationship, position, context_id);
                    RelationshipContext.items[index] = Relationship;
                    var list                         = RelationshipContext._list;
                    if (position > list.length) list.push(index);
                    else list.splice(position, 0, index);
                    this.emit('add_Relationship', Relationship, position, context_id);
                    return Promise.resolve(Relationship);
                },
                /**
                 * Remove a Relationship from a RelationshipIndex
                 * @param Relationship
                 * @param context_id
                 * @return {boolean}
                 */
                removeRelationship:        function (Relationship, context_id) {
                    var context = this.initRelationshipContext(context_id);
                    var index   = this.indexOf(Relationship, context_id);
                    if (index < 0) return false;
                    context._list.splice(index, 1);
                    return true;
                },
                /**
                 * Get the Identifier used to identify a Relationship in this RelationshipIndex
                 * @param Relationship
                 * @return {string}
                 */
                getRelationshipIdentifier: function (Relationship) {
                    var self_entity_r_id = this.resource_r_id;
                    var related_r_ids    = Relationship.RelatedEntityIdentifiers;
                    return related_r_ids.filter(function (item) {return item == self_entity_r_id ? false : item;}).join('*');
                },
                /**
                 * Find the index of a Relationship in a certain RelationshipContext
                 * @param {Sm.Abstraction.Relationship}  Relationship
                 * @param {Sm.r_id|null=}                context_id
                 * @return {number}
                 */
                indexOf:                   function (Relationship, context_id) {
                    var identifier;
                    if (Relationship && typeof Relationship === "object" && Relationship.getObjectType && Relationship.getObjectType()) {
                        identifier = Relationship.getR_ID();
                    } else {
                        identifier = this.getRelationshipIdentifier(Relationship);
                    }
                    var list = this.initRelationshipContext(context_id)._list;
                    return list.indexOf(identifier);
                },
                getItem:                   function (index, context_id) {
                    var context = this.initRelationshipContext(context_id);
                    var list    = context._list;
                    var items   = context.items;
                    if (index > -1 && index < list.length) return items[list[index]] || null;
                    return null;
                },
                /**
                 * Change the position of a Relationship in a certain RelationshipContext
                 * @param {Sm.Abstraction.Relationship}  Relationship
                 * @param {int}                          position
                 * @param {Sm.r_id|null=}                context_id
                 * @return {*}
                 */
                moveRelationship:          function (Relationship, position, context_id) {
                    var RelationshipContext = this.initRelationshipContext(context_id);
                    var index               = this.indexOf(Relationship, context_id);
                    if (index < 0) return this.addRelationship(Relationship, position, context_id);
                    var identifier = RelationshipContext._list[index];
                    RelationshipContext._list.splice(index, 1);
                    if (position > RelationshipContext._list.length) RelationshipContext._list.push(index);
                    RelationshipContext._list.splice(index, 0, identifier);
                    return Promise.resolve(Relationship);
                },

                getViewType: function () {return Sm.Abstraction.Views.RelationshipIndexView},

                save:    function () {},
                destroy: function () {},
                fetch:   function () {},
                toJSON:  function () {}
            });
    require(['Sm-Abstraction-Views-RelationshipIndexView']);
    require(['Sm-Abstraction-RelationshipIndex-_template']);

    Sm.Abstraction.RelationshipIndex.getDefaultContextId = function () {
        return '-';
    };
    Sm.Abstraction.RelationshipIndex.getContext          = function (context_id) {
        context_id = context_id || Sm.Abstraction.RelationshipIndex.getDefaultContextId();
        if (context_id && context_id.indexOf('Context:') < 0) context_id = 'Context:' + context_id;
        var resource_id = context_id.replace('Context:', '');
        var Context     = Sm.Core.Identifier.retrieve(context_id);
        if (!Context) {
            var Resource = Sm.Core.Identifier.identify(resource_id) || null;
            Context      = new Sm.Core.Identifier(Resource, {r_id: context_id});
            Context.refresh({Resource: Resource})
        }
        return Context;
    };

    Sm.Core.dependencies.on_load(['Abstraction_RelationshipIndex', 'Abstraction_Relationship'], ':Relationships');
    Sm.Core.dependencies.on_load(['Core_Identifier'], function () {
        Sm.Core.Util.mixin(Sm.Core.Identifier.Identifiable, Sm.Abstraction.RelationshipIndex);
    }, 'Abstraction_RelationshipIndex');
    Sm.Core.dependencies.on_load(['Abstraction_RelationshipIndex-_template', 'Abstraction-Garage'], function () {
        Sm.Abstraction.RelationshipIndex.Garage = new (Sm.Abstraction.Garage.extend({template_object: Sm.Abstraction.RelationshipIndex.templates._template}))('RelationshipIndex');
    }, 'Abstraction_RelationshipIndex-Garage');
    Sm.Core.dependencies.on_load(['Abstraction_RelationshipIndex-Garage', 'Abstraction-Views-RelationshipIndexView'], function () {
        Sm.Core.Util.mixin(Sm.Abstraction.Views.Viewable, Sm.Abstraction.RelationshipIndex);
    }, 'Abstraction_RelationshipIndex:Viewable');
});