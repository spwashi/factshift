/**
 * Created by Sam Washington on 11/6/16.
 */
/**
 * @typedef {string} Sm.ent_id
 */
/**
 * @typedef {string} Sm.Sm.object_type
 */
/**
 * @typedef {string} Sm.entity_type
 */
/**
 * @typedef {string} Sm.map_index
 */
/**
 * @typedef {string} Sm.linked_entity_string
 */
/**
 * @typedef {string} Sm.r_id
 */
/**
 * @typedef {int} Sm.id
 */
/**
 * @class {Promise}Sm.Promise
 */
/**
 * @typedef {{}} Sm.json_model
 * @property {Sm.id}            id
 * @property {Sm.ent_id}        ent_id
 * @property {Sm.entity_type}   _model_type
 * @property {[]}               relationships
 */
/**
 * @typedef {{}} Sm.json_entity
 * @property {Sm.entity_type}   _entity_type
 * @property {{}}               _permissions
 * @property {{Sm.json_model}}  attributes
 * @property {[]}               relationships
 */
/**
 * @typedef {Sm.json_model} Sm.json_map
 * @property {Sm.id}            id
 * @property {Sm.ent_id}        ent_id
 * @property {Sm.entity_type}   entity_type
 */
/**
 * @typedef {{}} Sm.json_relationship
 * @property {Sm.json_model|null}    model
 * @property {{}}                    _meta
 */
/**
 * An object representing configuration information for a RelationshipIndex
 * @typedef {{}}                                    Sm.relationship_info
 * @property {Sm.relationship_info.linked_entities} linked_entities
 */
/**
 * @typedef {Object<string, Object<Sm.map_index, Sm.entity_type|Array>>} Sm.relationship_info.linked_entities
 * @property
 */
/**
 * @typedef {{}} Sm.context_object
 * @property {Sm.Abstraction.Relationship}  Relationship
 * @property {Sm.Abstraction.Entity}        OtherEntity
 * @property {Sm.relationship_index}        relationship_index
 * @property {any}                          el
 */

/**
 * @typedef {{}}                                    Sm.edit_api_response_data
 * @property {{success:[],failed:[],adjusted:[]}}   changed_attributes
 * @property {Sm.json_entity}                       entity
 */
/**
 * @typedef {{}}                                Sm.api_response
 * @property {Sm.edit_api_response_data}        data
 * @property {string}                           message
 * @property {bool|int}                         success
 */

/**
 *
 */
