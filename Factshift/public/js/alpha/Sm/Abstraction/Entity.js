/**
 * Created by Sam Washington on 11/6/16.
 */
define(['require', 'Sm',
        'Emitter', 'Sm-Core-Identifier',
        'Sm-Abstraction-Stateful', 'Sm-Abstraction-Permittable',
        'Sm-Abstraction-Editable', 'Sm-Abstraction-Prompt-AddRelationshipPrompt',
        'Sm-Abstraction-Prompt-EditEntityPrompt'
       ], function (require, Sm, Emitter) {
    //noinspection JSCheckFunctionSignatures
    /**
     * @class Sm.Abstraction.Entity
     * @augments Sm.Abstraction.Views.Viewable
     * @extends Sm.Core.Identifier.Identifiable
     * @augments Sm.Abstraction.Stateful
     * @augments Sm.Abstraction.Permittable
     * @implements Sm.Abstraction.Editable
     * @mixes Sm.Abstraction.Prompt.Promptable
     *
     * @property {Sm.Abstraction.Model} Model
     */
    Sm.Abstraction.Entity = Emitter.extend(
        {
            /**
             * @var {string|Sm.object_type}
             */
            object_type:                   'Entity',
            canRelate:                     true,
//------------------------
//--    Initialization Functions
//------------------------
            /**
             *
             * @param {Sm.json_entity}           entity
             * @param {identification_object}   identification_object
             * @param config
             */
            init:                          function (entity, identification_object, config) {
                this.relationships                = {};
                this._relationships               = {};
                this.reciprocal_relationships     = {};
                this.RelationshipIndices          = [];
                identification_object             = identification_object || {};
                this.entity_type                  = this.entity_type || identification_object.entity_type;
                identification_object.object_type = this.object_type;
                var SmEntity                      = this.SmEntity = Sm.Core.Meta.getSmEntity(this.entity_type);
                this.Identifier = new Sm.Core.Identifier(this, identification_object);
                this.Model      = null;
                if (entity._permissions) {
                    this._initPermissions(entity._permissions);
                    delete entity._permissions;
                }
                this._initModel(entity.attributes || entity);
                var relationships = entity.relationships || false;
                if (relationships) {
                    this._initRelationships(relationships);
                    delete  entity.relationships;
                }
            },
            /**
             * Initialize the Model of the entity, or set the properties of the Model based on the attributes retrieved from the server (or somewhere else)
             * @param {Sm.json_model|{}}model
             * @return {Sm.Abstraction.Model}
             * @private
             */
            _initModel:                    function (model) {
                model = model || {};
                // If the model already exists, silently set the properties
                if (this.Model) this.Model.set(model, {silent: true});
                // Otherwise, create a new Model
                else this.Model = new (this.SmEntity.Model)(model || {});
                // The Entity of the Model is this
                this.Model.setEntity(this);
                return this.Model;
            },
            /**
             * Given a RelationshipIndex from the server
             * @param relationships
             * @private
             */
            _initRelationships:            function (relationships) {
                var Self                    = this;
                /**
                 * Callback to run once we have all components necessary for relationships
                 */
                var when_relationship_index = function () {
                    for (var relationship_index in relationships) {
                        if (!relationships.hasOwnProperty(relationship_index)) continue;
                        Self._initRelationshipIndex(relationship_index);
                        var server_RelationshipIndex = relationships[relationship_index];
                        var items                    = server_RelationshipIndex.items || {};
                        for (var id in items) {
                            if (!items.hasOwnProperty(id)) continue;
                            /** @type {Object<string, Sm.json_entity>} OtherEntities */
                            var OtherEntities = items[id].Entities || {};
                            var map           = items[id].attributes || {};
                            for (var oe_identifier in OtherEntities) {
                                if (!OtherEntities.hasOwnProperty(oe_identifier)) continue;
                                /** @type {Sm.json_entity} other_entity */
                                var other_entity = OtherEntities[oe_identifier];
                                if (!other_entity._entity_type) {
                                    Sm.CONFIG.DEBUG && console.log('no other entity type', other_entity, Self);
                                    continue;
                                }
                                var other_entity_type = other_entity._entity_type;
                                if (other_entity_type == Self.entity_type) {
                                    if (!other_entity.attributes) {
                                        Sm.CONFIG.DEBUG && console.log('no attributes for ' + other_entity);
                                        continue;
                                    }
                                    if (!other_entity.attributes.ent_id) {
                                        Sm.CONFIG.DEBUG && console.log('no ent_id for ' + other_entity);
                                        continue;
                                    }
                                    if (!other_entity.attributes.ent_id == Self.Identifier.getEntId()) {
                                        Sm.CONFIG.DEBUG && console.log('same', other_entity);
                                        continue;
                                    }
                                }

                                var when_loaded_func = (function (other_entity, relationship_index, map) {
                                    return function () {
                                        var OtherEntity = Sm.Core.Meta.initEntity({entity: other_entity});
                                        Self.addRelationship(OtherEntity, relationship_index, map);
                                        return [other_entity.attributes.ent_id];
                                    }
                                })(other_entity, relationship_index, map);

                                Sm.Core.dependencies.on_load(other_entity_type, when_loaded_func, null, 10000, id);
                            }
                        }
                    }
                };
                Sm.Core.dependencies.on_load(':Relationships', when_relationship_index.bind(this));
            },
            /**
             * Refresh the details of an Entity based on a model (probably from a server)
             *
             * @param {Sm.json_model}   model
             * @return {Sm.Abstraction.Entity}
             */
            refresh:                       function (model) {
                this._initModel(model);
                return this;
            },
            /**
             * Initialize a relationship index given a string
             *
             * @alias Sm.Abstraction.Entity._initRelationshipIndex
             * @this Sm.Abstraction.Entity
             *
             * @param {string} relationship_index
             *
             * @return {Sm.Abstraction.RelationshipIndex}
             */
            _initRelationshipIndex:        function (relationship_index) {
                // If the relationship exists, return it
                if (this.RelationshipIndices[relationship_index]) return this.RelationshipIndices[relationship_index];

                /** @type {Sm.Abstraction.RelationshipIndex} RelationshipIndex */
                var RelationshipIndex                        = this.SmEntity.Meta.initRelationshipIndex(this, relationship_index);
                // Whether or not this RelationshipIndex exists out of reciprocity
                var isReciprocal                             = RelationshipIndex.isReciprocal();
                this.RelationshipIndices[relationship_index] = RelationshipIndex;

                // Get the actual name of he relationship index
                relationship_index = RelationshipIndex.get_relationship_index();

                if (!isReciprocal) this.relationships[relationship_index] = RelationshipIndex;
                else this.reciprocal_relationships[relationship_index] = RelationshipIndex;

                // Emit two events - one for initializing *a* RelationshipIndex, another for initializing *this* RelationshipIndex
                this.emit('init_RelationshipIndex', RelationshipIndex);
                this.emit_once('init_RelationshipIndex:' + relationship_index, RelationshipIndex);

                return RelationshipIndex;
            },
            /**
             * Initialize the permissions of this User
             * @param permissions
             * @private
             */
            _initPermissions:              function (permissions) {
                this.setPermission(permissions);
                if ('edit' in permissions) this.setPermission('relate', permissions.edit);
            },
//------------------------
//--    Getters and Setters
//------------------------
            /**
             * Get an attribute from this Entity
             * @param name
             * @return {*|null}
             */
            get:                           function (name) {
                return this.Model ? this.Model.get(name) : null;
            },
            /**
             * Check to see if this entity has an attribute
             * @param name
             * @return {boolean}
             */
            hasAttribute:                  function (name) {
                return name && this.Model ? !!(name in this.Model.attributes) : false;
            },
            /**
             * Get all attributes from an Entity
             * @return {*|{}}
             */
            getAttributes:                 function () {
                // Don't return a reference to the object
                return Sm.Core.Util.merge_objects({}, this.Model.attributes);
            },
            getModifiableAttributes:       function () {
                return this.SmEntity.Meta.getApiSettableAttributes(this);
            },
            /**
             * Get the attributes that were set before the Entity was saved
             * @return {null}
             */
            getPreviousAttributes:         function () {
                return this.Model ? this.Model.previousAttributes() : null;
            },
            /**
             * Set attributes on an object
             * @param attributes
             * @param {{}=}      settings
             * @param {boolean} settings.silent
             */
            setAttributes:                 function (attributes, settings) {
                settings = settings || {};
                this.Model && this.Model.set(attributes, {silent: !!settings.silent});
            },
//------------------------
//--    Mixin Functions
//------------------------
            /**
             * @inheritDoc
             * @return {Sm.Abstraction.EntityView}
             */
            getViewType:                   function () {return this.SmEntity.View;},
//------------------------
//--    Relationship Functions
//------------------------
            /**
             * Get a list or object of the relationship types that an object can have
             * @param do_list
             * @return {{}|[]}
             */
            getPotentialRelationshipTypes: function (do_list) {
                return Sm.Core.Meta.getSmEntityAttribute(this, 'Meta').getPotentialRelationshipTypes(this, do_list);
            },
            /**
             * Function to add a relationship to the MvCombo's Relationship Index
             * todo There's an error in which two entities can be related via 4 relationship_indices. Fix that.
             * @param {Sm.Abstraction.Entity}               Entity
             * @param {string}                              relationship_index
             * @param {{}}                                  map
             * @param {int=}                                map.position
             * @param {Sm.r_id=}                            map.context_id
             * @param {Sm.Abstraction.Relationship=}        Relationship
             * @returns {Sm.Promise}
             */
            addRelationship:               function (Entity, relationship_index, map, Relationship) {
                map            = map || {};
                map.position   = map.position || 0;
                map.context_id = map.context_id || null;
                var Map;
                if (map.object_type == 'Entity') {
                    Map = map;
                    map = Map.getAttributes();
                }
                var relationship_already_exists      = false;
                var potential_previous_relationships = this.getRelationship(Entity);
                var tmp_rel;
                var Self                             = this;
                if (potential_previous_relationships.length) {
                    for (var i = 0; i < potential_previous_relationships.length; i++) {
                        tmp_rel         = potential_previous_relationships[i];
                        var rel_indices = tmp_rel.getRelationshipIndices_R_IDs().map(function (r_id) {return Sm.Core.Identifier.identify(r_id);});
                        for (var _rel_ind in this.RelationshipIndices) {
                            if (!this.RelationshipIndices.hasOwnProperty(_rel_ind)) continue;
                            if (rel_indices.indexOf(this.RelationshipIndices[_rel_ind]) > -1) {
                                relationship_already_exists = true;
                                break;
                            }
                        }
                        if (relationship_already_exists) break;
                    }
                }
                // Sm.CONFIG.DEBUG && console.log(this.getR_ID(), ' -- ', relationship_index, ' -- ', Entity.getR_ID());
                if (relationship_already_exists) {
                    return Promise.resolve(tmp_rel);
                }
                var RelationshipIndex     = this.getRelationshipIndex(relationship_index);
                var is_reciprocal         = RelationshipIndex.isReciprocal();
                /**
                 * Whether we are adding the Relationship on the second go-round or not
                 * @type {boolean}
                 */
                var is_being_reciprocated = !!Relationship;
                if (!Relationship) {
                    var RelatedEntities = {};
                    var map_index_self  = RelationshipIndex.get_map_index_details({map: map, Entity: this});
                    var map_index_other = RelationshipIndex.get_map_index_details({map: map, Entity: Entity});
                    if (!map_index_self || !map_index_other) throw new Sm.Exceptions.Error("Could not link entities to a map index", {
                        self:    this,
                        other:   Entity,
                        rel_ind: relationship_index
                    });
                    RelatedEntities[map_index_self.map_index]  = this;
                    RelatedEntities[map_index_other.map_index] = Entity;
                    Relationship                               = Sm.Abstraction.Relationship.createRelationship([this.getR_ID(), Entity.getR_ID()], Map || map);
                    // Sm.CONFIG.DEBUG && console.log(Relationship);
                }
                this.registerRelationship(Entity, Relationship, relationship_index);
                var possible_others = this.SmEntity.Meta.getPotentialRelationshipTypes(Entity, true);
                //This is here because sometimes we add a relationship from one entity only,
                //  and doing that could mean that the relationship is only represented from one direction.
                //  An example would be the relationship between sections and dimensions -
                //      If we only added the relationship through sections, we'd get [Section]->dimensions and [Dimension]->reciprocal_dimensions
                //      which completely ignores the fact that dimensions aren't just related to sections that way ([Dimension]->sections)
                if (possible_others.length === 1 && possible_others[0] !== relationship_index) this.addRelationship(Entity, possible_others[0], map, Relationship);

                var add_other_relationship = is_being_reciprocated ? Promise.resolve.bind(Promise, Relationship) : function (Relationship) {
                    return Entity.addRelationship(
                        Self,
                        (!is_reciprocal ? 'reciprocal_' : '') + RelationshipIndex.get_relationship_index(),
                        map,
                        Relationship)
                };
                this.emit('add_Relationship', Relationship, relationship_index, Entity);
                return RelationshipIndex.addRelationship(Relationship, map.position, map.context_id).then(add_other_relationship);
            },
            /**
             *
             * @param {Sm.Abstraction.Entity}               Entity
             * @param {Sm.Abstraction.Relationship}         Relationship
             * @param {string}                              relationship_index
             * @return {boolean}
             */
            registerRelationship:          function (Entity, Relationship, relationship_index) {
                var entity_r_id       = Entity.getR_ID();
                var relationship_r_id = Relationship.getR_ID();
                var rels              = this._relationships[entity_r_id] = this._relationships[entity_r_id] || {};
                if (relationship_index in rels) return true;
                rels[relationship_index] = Relationship;
                return false;
            },
            /**
             * Remove a Relationship, return whether it was successful
             * @param Relationship
             * @return {boolean}
             */
            removeRelationship:            function (Relationship) {
                Sm.CONFIG.DEBUG && console.log('Implement');
                return false;
            },
            /**
             * Return a RelationshipIndex based on a relationship_index
             * @param relationship_index
             * @return Sm.Abstraction.RelationshipIndex
             */
            getRelationshipIndex:          function (relationship_index) {
                return this._initRelationshipIndex(relationship_index);
            },
            /**
             * Get a Relationship based on an entity identifier (anything that can uniquely identify an entity)
             * @param EntityIdentifier
             * @param relationship_index
             * @return {boolean|[]}
             */
            getRelationship:               function (EntityIdentifier, relationship_index) {
                relationship_index = relationship_index || false;
                var ent_id         = EntityIdentifier.getR_ID();
                if (!ent_id || !(ent_id in this._relationships)) return false;
                var relationship_object = this._relationships[ent_id];
                var end_rels            = [];
                /**
                 * Iterate through the Relationships that are held between these two objects and push them onto an Array
                 */
                for (var r_i in relationship_object) {
                    if (!relationship_object.hasOwnProperty(r_i)) continue;
                    // If there is a relationship index specified as a parameter, but it isn't the same as what this Relationship is continue
                    if (relationship_index && r_i != relationship_index) continue;
                    end_rels.push(relationship_object[r_i]);
                }
                return end_rels.length - 1 ? end_rels : end_rels[0];
            },
//------------------------
//--    Interact via Server
//------------------------
            /**
             * Retrieve an Entity from the Server
             * @return {Promise}
             */
            fetch:                         function () {return Promise.resolve(null)},
            /**
             * Save an Entity
             * @return {Promise}
             */
            save:                          function () {
                var Error;
                var Self = this;
                // Can't save an Entity without a Model
                if (!this.Model) {
                    Error = new Sm.Exceptions.Error("Could not find Model for Resource", this);
                    return Promise.reject(Error);
                }
                /** @type {{}} The attributes of the Entity that existed from the last save */
                var previous = this.getPreviousAttributes() || {};

                return Promise.resolve(this.Model.save()).then(/** @param {Sm.api_response} response*/function (response) {
                    if (!response || !response.data) throw new Sm.Exceptions.Error("No results to report on", response);
                    /** @type {Sm.edit_api_response_data} data */
                    var data = response.data;
                    if (!data.entity) throw new Sm.Exceptions.Error("Not sure how to update entity", response);
                    var attributes = data.entity.attributes;
                    var changed    = [];

                    /**
                     * Iterate through the attributes returned from the server to see which ones are actually different
                     */
                    for (var attr in attributes) {
                        if (!attributes.hasOwnProperty(attr)) continue;
                        //ignore things like _object_type
                        if (attr.indexOf('_') !== 0 &&
                            Self.hasAttribute(attr) &&
                            previous[attr] != attributes[attr]) {
                            changed.push(attr);
                        }
                    }

                    Self.setAttributes(data.entity.attributes, {silent: true});

                    /**
                     * If their were any changed attributes, emit the "update" event to notify any Views or whatnot
                     */
                    changed.length && Self.emit('update', changed);

                    /**
                     * Make sure the Identity of this Entity is up to date
                     */
                    Self.Identifier.refresh(data.entity.attributes);
                    return response;
                }).catch(function (response) {
                    /**
                     * Revert the attributes if there were any errors
                     */
                    Self.setAttributes(previous);
                    return response;
                });
            },
            /**
             * Destroy the Entity on the server
             * @return {Promise}
             */
            destroy:                       function () {
                var Self = this;
                if (!this.Model) {
                    Error = new Sm.Exceptions.Error("Could not find Model for Resource", this);
                    return Promise.reject(Error);
                }
                return Promise.resolve(this.Model.destroy()).then(function (response) {
                    if (!response || !response.success) throw  new Sm.Exceptions.Error("Unsuccessful", response);
                    Self.emit('destroy');
                    return response;
                });
            },
            /**
             * Generate a URL fragment that uniquely refers to this Entity.
             * If we can't uniquely identify this entity. Return the URL to use to create it.
             *
             * @todo consider changing this to enforce a unique identifier
             * @return {string}
             */
            url:                           function () {
                var url = this.entity_type + '/';
                var id  = (this.getEntId() || this.getId());
                if (id) url += id + '/';
                return url;
            },
            /**
             * Prompt the addition of a Relationship
             * @param {Sm.Core.Identifier.Identifiable} ReferencePoint An object to serve as a reference frame for the action
             * @return {Promise}
             */
            prompt_add_relationship:       function (ReferencePoint) {
                var Self = this;
                return Sm.Core.dependencies.on_load(['Abstraction-Prompt-AddRelationshipPrompt'], function () {
                    var Prompt = new Sm.Abstraction.Prompt.AddRelationshipPrompt({Resource: Self, ReferencePoint: ReferencePoint || null});
                    return Prompt.open();
                }, 'prompt_AddRelationship');
            },
            /**
             * Prompt the Editing of this Entity
             * key difference is the Prompt used to do so
             * @param ReferencePoint
             * @return {Promise}
             */
            prompt_edit:                   function (ReferencePoint) {
                var Self = this;
                return Sm.Core.dependencies.on_load(['Abstraction-Prompt-EditEntityPrompt'], function () {
                    var Prompt = new Sm.Abstraction.Prompt.EditEntityPrompt({Resource: Self, ReferencePoint: ReferencePoint || null});
                    return Prompt.open();
                }, 'prompt_edit');
            }

        });

    /**
     * Wait until we can make Entities Identifiable, Stateful, and Permittable
     */
    Sm.Core.dependencies.on_load(['Core-Identifier', 'Abstraction-Stateful', 'Abstraction-Permittable'], function () {
        Sm.Core.Util.mixin(Sm.Core.Identifier.Identifiable, Sm.Abstraction.Entity);
        Sm.Core.Util.mixin(Sm.Abstraction.Stateful, Sm.Abstraction.Entity);
        Sm.Core.Util.mixin(Sm.Abstraction.Permittable, Sm.Abstraction.Entity);

        // Mark the "abstract entity" as being identifiable, stateful, and permittable
        /**
         * @see Sm.Core.Identifier.Identifiable
         * @see Sm.Abstraction.Stateful
         * @see Sm.Abstraction.Permittable
         */
        Sm.Core.dependencies.add('Abstraction_Entity:Identifiable');
        Sm.Core.dependencies.add('Abstraction_Entity:Stateful');
        Sm.Core.dependencies.add('Abstraction_Entity:Permittable');
    }, 'Abstraction_Entity');

    /**
     * Make sure the Entity is Editable
     */
    Sm.Core.dependencies.on_load(['Abstraction-Editable'], function () {
        Sm.Core.Util.mixin(Sm.Abstraction.Editable, Sm.Abstraction.Entity)
    }, 'Abstraction_Entity:Editable');

    /**
     * Make sure the Entity is Viewable
     */
    Sm.Core.dependencies.on_load(['Abstraction-Views'], function () {
        Sm.Core.Util.mixin(Sm.Abstraction.Views.Viewable, Sm.Abstraction.Entity);
    }, 'Abstraction_Entity:Viewable');

});