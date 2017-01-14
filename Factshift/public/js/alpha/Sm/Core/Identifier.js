/**
 * Created by Sam Washington on 11/6/16.
 */
require(['require', 'Class', 'Sm', 'underscore', 'inflection', 'Sm-Core-Util'], function (require, Class, Sm, underscore) {
    var Util = Sm.Core.Util;

    /**
     * @typedef {{}} identification_object
     * @property id
     * @property {Sm.ent_id}                                ent_id
     * @property {Sm.object_type}                           object_type
     * @property {entity_type}                              entity_type
     * @property {Sm.Core.Identifier.Identifiable}          Resource
     * @property {Sm.r_id|Sm.ent_id}                        r_id
     */

    /**
     * @class Sm.Core.Identifier
     * @property {Function} init                    {@see Sm.Core.Identifier.init}
     * @property {Function} toJSON                  {@see Sm.Core.Identifier.toJSON}
     * @property {Function} refresh                 {@see Sm.Core.Identifier.refresh}
     * @property {Function} getResource             {@see Sm.Core.Identifier.getResource}
     * @property {Function} getObjectType           {@see Sm.Core.Identifier.getObjectType}
     * @property {Function} getEntityType           {@see Sm.Core.Identifier.getEntityType}
     * @property {Function} getId                   {@see Sm.Core.Identifier.getId}
     * @property {Function} getEntId                {@see Sm.Core.Identifier.getEntId}
     *
     * @property {Sm.r_id|string}           _r_id
     * @property {Sm.ent_id}                _ent_id
     * @property {Sm.id}                    _id
     * @property {Sm.object_type}           _id
     * @property {Sm.entity_type}           entity_type
     */
    var Identifier = Sm.Core.Identifier = Class.extend(
        {
            /**
             * Return an object for serialization
             * @return {*}
             */
            toJSON:  function () {
                //  create a temporary object to return, minus the Resource that comes with it\
                //  We remove the Resource to avoid cyclic serialization
                var faux_merge = Util.merge_objects(this, {});
                if ("Resource" in faux_merge) delete  faux_merge.Resource;
                //  return the object as the serialized object
                return faux_merge;
            },
            /**
             * @constructor
             * @param {Sm.Core.Identifier.Identifiable}     Resource
             * @param {identification_object}               identification_object
             */
            init:    function (Resource, identification_object) {
                identification_object = identification_object || {};
                if (identification_object.ent_id && identification_object.entity_type) {
                    this._r_id = identification_object.ent_id + '|' + identification_object.entity_type;
                } else {
                    this._r_id = identification_object.r_id || Sm.Core.Identifier._generate_r_id(identification_object.object_type || identification_object.object_type || null);
                }
                this.Resource = Resource || false;
                this.refresh(identification_object);
            },
            /**
             * Update the attributes of an Identifier
             * @param {identification_object}    identification_object
             */
            refresh: function (identification_object) {
                this.Resource         = this.Resource || identification_object.Resource;
                identification_object = identification_object || {};
                /** @type {Sm.ent_id} this._ent_id */
                var ent_id            = this._ent_id || identification_object.ent_id || false;
                var id                = this._id || parseInt(identification_object.id) || false;
                var object_type       = this._object_type || identification_object.object_type || false;
                var entity_type       = this.entity_type || identification_object.entity_type;

                id && (this._id = id);
                ent_id && (this._ent_id = ent_id);
                object_type && (this._object_type = object_type);

                if (!entity_type && ent_id && Sm.Core.dependencies.is_loaded('Core_Meta')) {
                    entity_type = Sm.Core.Identifier.getEntityType(ent_id);
                }

                entity_type && (this.entity_type = entity_type);

                if (entity_type && id) this._typed_id = this._typed_id || (this.entity_type + '|' + this._id);
                this.register(this._ent_id).register(this._typed_id).register(this._r_id);
                return this;
            },

            /**
             * Register an Identifier so it can used later
             * @param {string|int|Sm.ent_id|Sm.r_id}   id
             * @return {Sm.Core.Identifier}
             */
            register: function (id) {
                Sm.Core.Identifier._register(id, this);
                return this;
            },

            getResource:   function () { return this.Resource || false; },
            getObjectType: function () { return this._object_type || null; },
            getEntityType: function () { return this.entity_type || null; },
            getId:         function () { return this._id || null; },
            getTypedId:    function () { return this._typed_id || null; },
            getR_ID:       function () { return this._r_id || null; },
            getEntId:      function () { return this._ent_id || null; }
        });
    /**
     * An object that stores the various keys that can be used to uniquely identify an object
     * @type {{}}
     */
    Sm.Core.Identifier.actions = {};
    /**
     * Add an Identity to
     * @param key
     * @param value
     * @return Sm.Core.Identifier
     */
    Sm.Core.Identifier._register = function (key, value) {
        if (!key || !value || !key.length) return Sm.Core.Identifier;
        Sm.Core.Identifier.actions      = (Sm.Core.Identifier.actions || {});
        Sm.Core.Identifier.actions[key] = value;
        return Sm.Core.Identifier;
    };
    /**
     * Make sure whatever we're identifying is in a format that we can use to identify it
     * @param id
     * @return {*}
     */
    Sm.Core.Identifier.normalize_identifier = function (id) {
        if (!id) return {};
        var obj = {};
        if (typeof id === 'object') return id;
        if (Sm.Core.Meta.isEntId(id)) {
            return {ent_id: id};
        } else if (Sm.Core.Meta.isId(id)) {
            return {id: parseInt(id)};
        }
        return obj;
    };
    /**
     * Get the Identifier of something identified by the provided parameter
     * @param {identification_object|string}identification
     * @return {Sm.Core.Identifier|null}
     */
    Sm.Core.Identifier.retrieve = function (identification) {
        var r_id;
        var IdRegistry = Sm.Core.Identifier.actions;
        if (typeof identification === "string") {
            if (identification in IdRegistry) return IdRegistry[identification];
            r_id           = identification;
            identification = {};
            if (Sm.Core.Meta.isEntId(r_id)) identification.ent_id = r_id;
            else identification.r_id = r_id;
        }
        if (!identification) return null;
        identification = Sm.Core.Identifier.normalize_identifier(identification, identification.entity_type || false) || {};
        var ent_id     = identification.ent_id || false;
        r_id           = r_id || identification.r_id;
        if (r_id && r_id in IdRegistry) return IdRegistry[r_id].refresh(identification);
        if (ent_id && ent_id in IdRegistry) return IdRegistry[ent_id].refresh(identification);
        var id       = identification.id || false;
        id           = id ? parseInt(id) : false;
        var type     = identification.entity_type || Sm.Core.Identifier.getEntityType(ent_id) || '';
        var typed_id = type && type.length && id ? type + '|' + id : null;
        if (typed_id && typed_id in IdRegistry) return IdRegistry[typed_id].refresh(identification);
    };
    /**
     * Get the Identifiable object identified by the provided parameter
     * @param identification
     * @return {Sm.Core.Identifier.Identifiable}
     */
    Sm.Core.Identifier.identify = function (identification) {
        var Identity = Sm.Core.Identifier.retrieve(identification);
        return Identity ? Identity.getResource() : null;
    };
    /**
     * Generate an r_id for whatever we're talking about
     * @param {string|Sm.object_type|Sm.entity_type|null=} object_type
     * @return {Sm.r_id}
     * @private
     */
    Sm.Core.Identifier._generate_r_id = function (object_type) {
        if (object_type) object_type = ('' + object_type).charAt(0) + object_type.substr(1).replace(/[aeiou]/ig, '') + '|';
        return object_type + Util.randomString(15);
    };

    Sm.Core.Identifier.getRootObject          = function (item) {
        if (!item) return null;
        if (Sm.Core.dependencies.is_loaded('Core-Meta')) {
            var SmEntity = Sm.Core.Meta.getSmEntity(item);
            if (SmEntity) return SmEntity;
        }
        var object_type;
        if (typeof item === "string") object_type = item;
        else if (typeof  item === "object" && item.isIdentifiable) {
            if (item.getRootObject) return item.getRootObject();
            object_type = item.getObjectType();
        }

        if (!object_type) return null;
        if (object_type in Sm.Abstraction) return Sm.Abstraction[object_type];
        else if (object_type in Sm.Core) return Sm.Core[object_type];
        return null;
    };
    Sm.Core.Identifier.getRootObjectAttribute = function (item, component, only_existent) {
        if (!item) return null;
        if (typeof  item === "object") {
            var getter = 'get' + component;
            if (typeof item[getter] === "function") return item[getter]();
        }
        var RootObject = Sm.Core.Identifier.getRootObject(item);
        if (!RootObject) return null;
        if (RootObject[component]) return RootObject[component];
        return !only_existent ? (Sm.Core.Identifier.getRootObject(component) || null) : null;
    };
    Sm.Core.Identifier.getEntityType          = function (item) {
        var entity_type;
        if (item && typeof item === "object") {
            if (item.isIdentifiable) {
                var tmp;
                if (tmp = item.getEntityType()) entity_type = tmp;
                else if (tmp = item.getEntId()) entity_type = tmp;
            } else {
                if (!!item.entity) return Sm.Core.Identifier.getEntityType(item.entity);
                else if (item._entity_type) entity_type = item._entity_type;
                else if (item.entity_type)  entity_type = item.entity_type;
            }
        } else if (typeof item === "string") {
            if (!Sm.Entities[item]) entity_type = underscore(underscore.titleize(item.replace('_id', ''))).singularize();
            else entity_type = item;
        } else return false;
        return entity_type;
    };

    /**
     * An object that has a registered identity
     * @class Sm.Core.Identifier.Identifiable
     * @property Identifier
     * @property {Sm.object_type}   getObjectType
     * @property {Sm.entity_type}   getEntityType
     * @property {Sm.id}            getId
     * @property {Sm.ent_id}        getEntId
     * @property {Sm.object_type}   _objectType
     */
    var Identifiable = Sm.Core.Identifier.Identifiable = {
        isIdentifiable: true,
        /**
         * @type {Sm.Core.Identifier}
         */
        Identifier:     null,
        /**
         * Get the object type of whatever's being identified
         * @return {string|boolean}
         */
        getObjectType:  function () {
            if (!this.Identifier) return false;
            return this.Identifier.getObjectType();
        },
        /**
         * Get the entity type of whatever's being identified
         * @return {string|boolean}
         */
        getEntityType:  function () {
            if (!this.Identifier) return false;
            return this.Identifier.getEntityType();
        },
        /**
         * Get the id of whatever's being identified
         * @return {int|boolean}
         */
        getId:          function () {
            if (!this.Identifier) return false;
            return this.Identifier.getId();
        },
        /**
         * Get the typed_id of whatever's being identified
         * @return {string|boolean}
         */
        getTypedId:     function () {
            if (!this.Identifier) return false;
            return this.Identifier.getTypedId();
        },
        /**
         * Get the r_id of whatever's being identified
         * @return {Sm.r_id|boolean}
         */
        getR_ID:        function () {
            if (!this.Identifier) return false;
            return this.Identifier.getR_ID();
        },
        /**
         * Get the ent_id of whatever's being identified
         * @return {Sm.ent_id|boolean}
         */
        getEntId:       function () {
            if (!this.Identifier) return false;
            return this.Identifier.getEntId();
        }
    };
    Sm.Core.dependencies.add('Core_Identifier');
});