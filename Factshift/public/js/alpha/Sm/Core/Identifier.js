/**
 * Created by Sam Washington on 11/6/16.
 */
require(['require', 'Class', 'Sm', 'Sm-Core-Util'], function (require, Class, Sm) {
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
                this._ent_id = this._ent_id || identification_object.ent_id || false;
                this._id          = this._id || parseInt(identification_object.id) || false;
                this._object_type = this._object_type || identification_object.object_type || false;
                this.entity_type  = this.entity_type || identification_object.entity_type;
                if (!this.entity_type && this._ent_id && Sm.Core.dependencies.is_loaded('Core_Meta')) {
                    this.entity_type = Sm.Core.Meta.getEntityType(this._ent_id);
                }
                if (this.entity_type && this._id)
                    this._typed_id = this._typed_id || (this.entity_type + '|' + this._id);
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
            getObjectType: function () { return this._object_type; },
            getEntityType: function () { return this.entity_type; },
            getId:         function () { return this._id; },
            getTypedId:    function () { return this._typed_id; },
            getR_ID:       function () { return this._r_id; },
            getEntId:      function () { return this._ent_id; }
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
        var type     = identification.entity_type || Sm.Core.Meta.getEntityType(ent_id) || '';
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