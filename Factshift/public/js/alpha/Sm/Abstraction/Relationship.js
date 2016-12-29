/**
 * Created by Sam Washington on 11/6/16.
 */
define(['require', 'Sm', 'Emitter', 'Sm-Abstraction-MapEntity', 'Sm-Abstraction-Editable'], function (require, Sm, Emitter) {
    /**
     * @class Sm.Abstraction.Relationship
     * @augments Sm.Core.Identifier.Identifiable
     * @mixes Sm.Abstraction.Editable
     */
    Sm.Abstraction.Relationship = Emitter.extend(
        {
            /**
             * @constructor
             * @param {Array<Sm.r_id>}      entity_r_ids
             * @param {Sm.json_model}       map
             */
            init:                         function (entity_r_ids, map) {
                this.RelatedEntityIdentifiers = entity_r_ids;
                this.relationship_index_r_ids = [];
                /** @type {Sm.Abstraction.Map} */
                this.Map = null;
                this.Identifier = new Sm.Core.Identifier(
                    this,
                    {
                        object_type: 'Relationship',
                        entity_type: Sm.Core.Meta.getMapEntityType(this.getEntityTypesArray())
                    });
                this._initMap(map);
            },
            /**
             * Initialize a Map when we can
             * @param {Sm.json_model}        map
             * @return {Promise}
             * @private
             */
            _initMap:                     function (map) {
                this.Map             = null;
                var entity_array     = this.getEntityTypesArray();
                var Self             = this;
                var refresh_identity = function (MapEntityType) {
                    Self.Identifier.refresh({entity_type: MapEntityType});
                };
                if (map && map.object_type && map.object_type == 'Entity') {
                    this.Map = map;
                    return this.Map;
                }

                /**
                 * Wait until we have a way to map these two entities to initialize the Map of this Relationship
                 */
                return Sm.Core.Meta.on_map(entity_array, function (linked_entity_string) {
                    /** @type {string} map_entity_type The name of the Map Entity that we should initialize */
                    var map_entity_type = Sm.Core.Meta.getMapEntityType(entity_array);
                    /** @type {Sm.Core.SmEntity} MapEntity */
                    var MapSmEntity     = Sm.Core.Meta.getSmEntity(map_entity_type);
                    if (!MapSmEntity) {
                        throw new Sm.Exceptions.Error(
                            "Could not map the two Entities",
                            [
                                map_entity_type,
                                entity_array,
                                linked_entity_string,
                                this.RelatedEntityIdentifiers
                            ]);
                    }

                    // Refresh the Identity of the Relationship
                    refresh_identity(map_entity_type);

                    /** @type {Sm.Abstraction.Entity} this.Map The Entity that represents this Relationship */
                    this.Map = MapSmEntity.Meta.initEntity({
                                                               entity: {
                                                                   attributes:  map,
                                                                   entity_type: linked_entity_string
                                                               }
                                                           });
                    return this.Map;
                }.bind(this));
            },
//
            /**
             * This Relationship can belong to more than one RelationshipIndex
             * @param relationship_index_r_id
             * @return {boolean}
             */
            addRelationshipIndexR_Id:     function (relationship_index_r_id) {
                this.relationship_index_r_ids.push(relationship_index_r_id);
                return true;
            },
            /**
             * Get the r_ids of the RelationshipIndices this belongs to
             * @return {Array}
             */
            getRelationshipIndices_R_IDs: function () {
                return this.relationship_index_r_ids;
            },
            /**
             * Mark that this Relationship no longer belongs to a RelationshipIndex
             * @param relationship_index_r_id
             * @return {boolean}
             */
            removeRelationshipIndexR_Id:  function (relationship_index_r_id) {
                var r_ids = this.relationship_index_r_ids;
                var i_o   = r_ids.indexOf(relationship_index_r_id);
                if (i_o > -1) relationship_index_r_id.splice(i_o);
                return true;
            },
//
            /**
             * Set the Attributes of the Map Entity belonging to the Relationship
             * @param {{}}  attributes
             */
            setAttributes:                function (attributes) {
                this.Map && this.Map.setAttributes(attributes);
            },
            /**
             * Get the attributes of the Relationship
             * @return {*}
             */
            getAttributes:                function () {
                return this.Map ? this.Map.getAttributes() : null;
            },
            getModifiableAttributes:      function () {
                if (!this.Map) return {};
                return this.Map.getModifiableAttributes();
            },
            /**
             * Return an array of the Entities held in this Relationship
             * @return {Array<Sm.Abstraction.Entity>}
             */
            getEntityArray:               function () {
                var Entities = [];
                for (var i = 0; i < this.RelatedEntityIdentifiers.length; i++) {
                    var id = this.RelatedEntityIdentifiers[i];
                    Entities.push(Sm.Core.Identifier.identify(id));
                }
                return Entities;
            },
            /**
             * Get the Entities that are not identified by this r_id
             * @param {Sm.r_id} entity_r_id
             * @return {Array}
             */
            getOtherEntities:             function (entity_r_id) {
                var Entities = [];
                for (var i = 0; i < this.RelatedEntityIdentifiers.length; i++) {
                    var id = this.RelatedEntityIdentifiers[i];
                    if (entity_r_id === id) continue;
                    Entities.push(Sm.Core.Identifier.identify(id));
                }
                return Entities;
            },
            /**
             * An array of the entity types represented by the related Entities
             * @return {Array<Sm.entity_type>}
             */
            getEntityTypesArray:          function () {
                return this.getEntityArray().map(function (item) {return item.getEntityType();});
            },
//
            save:                         function () {
                var url  = Sm.urls.api.generate('save', this);
                var data = JSON.stringify(this);
                var Self = this;
                Sm.CONFIG.DEBUG && console.log(Self.Map, Self.Map.get('id'));
                var ajax = $.ajax({
                                      url:    url,
                                      method: (!Self.Map || !Self.Map.get('id')) ? 'POST' : 'PUT',
                                      data:   data
                                  });
                return Promise.resolve(ajax).then(function (data) {
                    Sm.CONFIG.DEBUG && console.log(data);
                    return data;
                });
            },
            /**
             * Convert this Relationship to a URL
             */
            url:                          function () {
                var EntityArr  = this.getEntityArray();
                var url        = '';
                var rel_index  = false;
                var relIndices = this.relationship_index_r_ids;
                for (var j = 0; j < relIndices.length; j++) {
                    var rel_ind_r_id = relIndices[j];
                    /** @type {Sm.Abstraction.RelationshipIndex}  */
                    var RelIndex     = Sm.Core.Identifier.identify(rel_ind_r_id);
                    if (!RelIndex) continue;
                    var locate = RelIndex.indexOf(this);
                    if (locate === false || locate < 0) continue;
                    rel_index = RelIndex.get_relationship_index();
                    break;
                }
                for (var i = 0; i < EntityArr.length; i++) {
                    var Entity = EntityArr[i];
                    if (i === 0)
                        url += Entity.url();
                    else {
                        url += rel_index + '/';
                        var id = Entity.getEntId() || Entity.getId();
                        if (id) url += id + '/';
                    }
                }
                return url;
            },
            toJSON:                       function () {return this.getAttributes()}
//
        });
    /**
     * Serves to initialize a relationship.
     *
     * @param {Array<Sm.r_id>}  RelatedEntities
     * @param {Sm.json_model}   map
     * @returns {Sm.Abstraction.Relationship}
     */
    Sm.Abstraction.Relationship.createRelationship = function (RelatedEntities, map) {
        return new Sm.Abstraction.Relationship(RelatedEntities, map);
    };

    /**
     * Make sure Relationships are Identifiable
     */
    Sm.Core.dependencies.on_load(['Core_Identifier'], function () {
        Sm.Core.Util.mixin(Sm.Core.Identifier.Identifiable, Sm.Abstraction.Relationship);
    }, 'Abstraction_Relationship');

    /**
     * Make the Relationship Editable
     */
    Sm.Core.dependencies.on_load(['Abstraction-Editable'], function () {
        Sm.Core.Util.mixin(Sm.Abstraction.Editable, Sm.Abstraction.Relationship)
    }, 'Abstraction_Relationship:Editable');
});