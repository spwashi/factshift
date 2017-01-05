/**
 * Created by Sam Washington on 11/6/16.
 */
require(['require', 'Emitter', 'Sm', 'underscore'], function (require, Emitter, Sm, underscore) {
    /**
     * @class Sm.Core.Meta
     */
    var Meta = Emitter.extend(
        {
            init: function (entity_type) {
                /** @type {string|boolean}*/
                this.entity_type = entity_type || this.entity_type || false;
                this.enums = {
                    relationship_types:    {},
                    relationship_subtypes: {}
                };
                var enums  = Sm.Entities._info.enums;
                var lower  = null;
                if (this.entity_type) {
                    lower            = this.entity_type.toLowerCase();
                    this.enums.types = {};
                    this.enums.roles = {};
                    this._config     = Sm.Entities._info.entities[this.entity_type] || {};
                }
                for (var name in enums) {
                    if (!enums.hasOwnProperty(name)) continue;
                    if (lower && name.indexOf('relationship') !== 0) {
                        if (name.indexOf(lower) < 0) {
                            this.enums[name] = enums[name];
                            continue;
                        }
                    } else {
                        this.enums[name] = enums[name];
                        continue;
                    }
                    this.enums[name.replace(lower + '_', '')] = enums[name];
                }
            },

//Identity-based shit
            convertToId:      function (item) {
                var table_name;
                var entity_type = item ? this.entity_type : this.getEntityType(item);
                if (!entity_type) return false;
                table_name = underscore.singularize(entity_type.toLowerCase());
                return table_name + '_id';
            },
            getEnumValue:     function (enum_name, identifier, what_to_get) {
                var enum_object = this.enums[enum_name];
                if (!enum_object) return false;
                for (var t in enum_object) {
                    if (!enum_object.hasOwnProperty(t)) continue;
                    if (t == identifier || enum_object[t].id == identifier) {
                        switch (what_to_get) {
                            default:
                            case 'index':
                                return t;
                            case 'id':
                                return enum_object[t].id;
                            case 'name':
                                return enum_object[t].name;
                        }
                    }
                }
            },
//Attribute functions
            getEntitySubtype: function (Entity, what_to_get) {
                var entity_type = Sm.Core.Meta.getEntityType(Entity) || this.entity_type;
                if (!entity_type || !(typeof Entity.get === "function")) return false;
                var subtype;
                var subtype_identifier = entity_type.toLowerCase() + '_type';
                if (subtype = Entity.get(subtype_identifier)) return this.getEnumValue('types', subtype, what_to_get);
                return false;
            },

            getDefaultAttributes:     function (Entity) {
                var entity_type = this.entity_type;
                if (!entity_type) return {};
                var _config = this._config;
                return !_config ? {} : ((_config.properties || {}).all || {});
            },
            /**
             * Get a list of the attributes that are required in order to create this Entity
             * @param {Sm.Abstraction.Entity=}  Entity
             * @return {Array}
             */
            getRequiredAttributes:    function (Entity) {
                return [];
            },
            getApiSettableAttributes: function (Entity) {
                var _config = this._config;
                var subtype, subtype_config;
                if (Entity && _config.types && (subtype = this.getEntitySubtype(Entity)) && (subtype_config = _config.types[subtype])) {
                    var properties = subtype_config.properties || null;
                    if (!Sm.Core.Util.isArray(properties)) {
                        properties && Sm.CONFIG.DEBUG && console.log('Api properties are malformed in ' + this.entity_type, properties);
                        properties = [];
                    }
                    if (subtype_config && typeof subtype_config === "object") {
                        var OtherMeta;
                        if (subtype_config.entity_type && (OtherMeta = Sm.Core.Meta.getSmEntityAttribute(subtype_config.entity_type, 'Meta'))) {
                            properties._entity_type = [];
                            return (OtherMeta.getApiSettableAttributes(Entity) || []).concat(properties || []);
                        }
                    }
                    if (properties.length) return properties;
                }
                return (_config.properties || {}).api_settable || [];
            },

            getDisplayInformation:  function (attribute) {
                var _config                                      = this._config || {};
                _config.properties                               = _config.properties || {};
                _config.properties.display_types                 = _config.properties.display_types || {};
                _config.properties.display_types[attribute]      = _config.properties.display_types[attribute] || {};
                _config.properties.display_types[attribute].type = _config.properties.display_types[attribute].type || this.guessAttributeDatatype(attribute);
                _config.properties.display_types[attribute].name = _config.properties.display_types[attribute].name || underscore.titleize(attribute.replace('_', ' '));
                return _config.properties.display_types[attribute];
            },
            guessAttributeDatatype: function (attribute) {
                var _config = this._config || {};
                if (_config.properties
                    && _config.properties.display_types
                    && _config.properties.display_types[attribute]
                    && _config.properties.display_types[attribute].type) return _config.properties.display_types[attribute];
                if (/((h|w)a|i|adopt)s_|can_/.test(attribute)) {
                    return "boolean";
                } else if (/(_id)/.test(attribute)) {
                    return "entity";
                } else if (/(_(sub)?type)|role|status/.test(attribute)) {
                    return "enum";
                } else if (attribute === 'description' || attribute === 'content') {
                    return "long";
                }
                return "short";
            },
            getAttributeEnumObject: function (attribute) {
                var split = attribute.split('_');
                if (this.entity_type && this.entity_type.toLowerCase() === split[0]) {
                    split.shift();
                    return this.enums[split.join('_') + 's'];
                }
                var plural = underscore.pluralize(attribute);
                if (this.enums[plural])return this.enums[plural];
                return {};
            },
//Relationship functions
            /**
             * Construct and return a new RelationshipIndex
             * @param {Sm.Abstraction.Entity}   Entity
             * @param {string}                  relationship_index
             * @return {*}
             */
            initRelationshipIndex:  function (Entity, relationship_index) {
                var is_reciprocal = relationship_index.indexOf('reciprocal_') > -1;
                //remove 'reciprocal_' from the relationship_index
                is_reciprocal && (relationship_index = relationship_index.replace('reciprocal_', ''));
                var entity_info = this._config;
                if (!entity_info) throw new Sm.Exceptions.Error("Could not find entity info for " + this.entity_type);
                var relationships_info =
                        (is_reciprocal
                            ? entity_info.reciprocal_relationships
                            : entity_info.relationships);
                if (!relationships_info || !relationships_info[relationship_index])
                    throw new Sm.Exceptions.Error("Could not use " + relationship_index + ' to relate in ' + this.entity_type, [Entity, relationship_index, this, entity_info, is_reciprocal]);
                var details = {
                    is_reciprocal:     is_reciprocal,
                    relationship_info: relationships_info[relationship_index]
                };
                return new Sm.Abstraction.RelationshipIndex(
                    Entity.getR_ID(),
                    relationship_index,
                    details);
            },
            /**
             * Delegates initializing the Entity to the proper Wrapper
             * @alias Sm.Core.Meta.initEntity
             * @param settings
             * @param {Sm.json_model=}   settings.entity
             * @param {Sm.id=}           settings.id
             * @param {Sm.entity_type}   settings.entity_type
             * @param {Sm.ent_id=}       settings.ent_id
             * @throws Sm.Exceptions.Error
             * @returns {Sm.Abstraction.Entity|boolean}
             */
            initEntity:             function (settings) {
                var entity_type = (settings ? settings.entity_type : false) || this.getEntityType(settings) || this.entity_type;
                if (!entity_type) throw  new Sm.Exceptions.Error("Could not find entity type to initialize entity", settings);
                var SmEntity = Sm.Core.Meta.getSmEntity(entity_type);
                if (!SmEntity) throw  new Sm.Exceptions.Error("Could not find SmEntity", settings);
                return SmEntity.Wrapper.initEntity(settings);
            },

            /**
             * Get the entity type of a resource
             * @param {Sm.Core.Identifier.Identifiable|Sm.entity_type|Sm.ent_id|Sm.json_entity}item
             * @return {boolean|Sm.entity_type}
             */
            getEntityType:                   function (item) {
                return Sm.Core.Meta.getEntityType(item);
            },
            getRelationshipType:             function (relationship_identifier, what_to_get) {
                Sm.CONFIG.DEBUG && console.log('implement get relationship type');
                return false;
            },
            getPotentialRelationshipTypes:   function (Entity, do_list) {
                var ret_obj = {}, ret_arr = [];
                if (!this.entity_type) return do_list ? ret_arr : ret_obj;
                var entity_type = !Entity ? false : this.getEntityType(Entity) || null;
                if (entity_type === null)return do_list ? ret_arr : ret_obj;

                var relationships            = this._config.relationships;
                var reciprocal_relationships = this._config.reciprocal_relationships;

                for (var rel_type in relationships) {
                    if (!relationships.hasOwnProperty(rel_type)) continue;
                    if (!entity_type) {
                        ret_obj[rel_type] = relationships[rel_type];
                        ret_arr.push(rel_type);
                    } else {
                        var linked_entities = relationships[rel_type].linked_entities;
                        if (!linked_entities) continue;
                        for (var le_string in linked_entities) {
                            if (!linked_entities.hasOwnProperty(le_string)) continue;
                            if ((new RegExp(le_string)).test(entity_type)) {
                                ret_arr.push(rel_type);
                                ret_obj[rel_type] = relationships[rel_type];
                            }
                        }
                    }
                }
                return do_list ? ret_arr : ret_obj;
            },
            /**
             *
             * @param relationship_index
             * @return {boolean|{}}
             */
            getRelationshipDetails:          function (relationship_index) {
                if (!relationship_index || !this.entity_type) return false;
                var relationships = this._config.relationships;
                if (relationship_index in relationships) return relationships[relationship_index];
                return false;
            },
            getMappedEntities:               function () {
                return !this.entity_type ? {} : this._config.linked_entities || {};
            },
            getMapEntityType:                function (Entity, OtherEntity) {
                //tood consider making this able to map more than two entities
                var map_entity_type_arr = [];
                var Self                = this;
                if (!OtherEntity) {
                    if (!Sm.Core.Util.isArray(Entity)) {
                        map_entity_type_arr.push.apply(map_entity_type_arr, [this.entity_type, this.getEntityType(Entity)]);
                    } else {
                        map_entity_type_arr.push.apply(map_entity_type_arr, Entity.map(function (item) {return Self.getEntityType(item)}));
                    }
                } else {
                    map_entity_type_arr.concat(arguments.map(function (item) {return Self.getEntityType(item)}));
                }
                return map_entity_type_arr.sort().join('|');
            },
            getMapTypeFromRelationshipIndex: function (relationship_index) {
                if (!this.entity_type) return false;
                if (!relationship_index) return false;
                var relationship_details = this.getRelationshipDetails(relationship_index);
                if (!relationship_details) return false;
                var OtherEntityType = relationship_details.entity_type;
                return this.getMapEntityType(OtherEntityType);
            }
        });

    Sm.Core.Meta = new Meta(false);
    /**
     * Run a callback whenever we add a new Entity type
     */
    Sm.Core.Meta.on('add_entity_type', function (entity_type) {
        if (entity_type.indexOf('|')) {
            this.emit('Map:' + entity_type);
            Sm.Core.dependencies.add('Map:' + entity_type);
        }
    });
    /**
     * Run a function when we are able to map two entity types
     * @param entity_types
     * @param fn
     */
    Sm.Core.Meta.on_map = function (entity_types, fn) {
        var entity_string = entity_types.sort().join('|');
        var mapped        = 'Map:' + entity_string;
        if (Sm.Core.dependencies.is_loaded(mapped))fn(entity_string);
        else this.once(mapped, function () {fn(entity_string)})
    };
    /**
     *
     * @param {Sm.entity_type}              entityType
     * @return {Sm.Core.SmEntity|boolean}
     */
    Sm.Core.Meta.getSmEntity = function (entityType) {
        entityType = this.getEntityType(entityType);
        return Sm.Entities && Sm.Entities[entityType] ? Sm.Entities[entityType] : (false);
    };
    Sm.Core.Meta.isEntId = function (id) {
        var ent_id_length = 25;
        var is_ent_id     =
                (typeof item === 'string') &&
                (item.length <= ent_id_length) &&
                (/[0-9]{6}/.test(item.substr(4, 6)));

        if (!is_ent_id) return is_ent_id;
        else {
            Sm.CONFIG.DEBUG && console.log(id, ' - is ent id');
        }
    };
    Sm.Core.Meta.isId    = function (id) {
        return Sm.Core.Util.isNumeric(id);
    };
    /**
     * Get something from an SmEntity
     * @param {string|Sm.Core.Identifier.Identifiable} entityType
     * @param component
     * @return {*|boolean}
     */
    Sm.Core.Meta.getSmEntityAttribute = function (entityType, component) {
        if (typeof entityType !== "string") entityType = Sm.Core.Meta.getEntityType(entityType);
        if (!entityType) return false;
        var SmEntity = Sm.Core.Meta.getSmEntity(entityType);
        if (!SmEntity) return false;
        return SmEntity && SmEntity[component] ? SmEntity[component] : false;
    };
    Sm.Core.Meta.getEntityType = function (item) {
        var entity_type;
        if (item && typeof item === "object") {
            if (item.isIdentifiable) {
                var tmp;
                if (tmp = item.getEntityType()) entity_type = tmp;
                else if (tmp = item.getEntId()) entity_type = tmp;
            } else {
                if (!!item.entity) return Sm.Core.Meta.getEntityType(item.entity);
                else if (item._entity_type) entity_type = item._entity_type;
                else if (item.entity_type)  entity_type = item.entity_type;
            }
        } else if (typeof item === "string") {
            if (!Sm.Entities[item]) entity_type = underscore(underscore.titleize(item.replace('_id', ''))).singularize();
            else entity_type = item;
        } else return false;
        return entity_type;
    };
    /** @type {Sm.Core.Meta|function} Sm.Core.Meta.Proto */
    Sm.Core.Meta.Proto = Meta;
    Sm.Core.dependencies.add('Core_Meta');
});