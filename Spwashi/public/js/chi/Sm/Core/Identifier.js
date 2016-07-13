/**
 * Created by Sam Washington on 12/17/15.
 */

require(['require', 'Class', 'Sm-Core-util'], function (require) {
    var u = Sm.Core.util;
    /**
     * @typedef {string} r_id
     * Randomly generated string of characters meant to be used as identification for a resource. Stands for random id
     */
    /**
     * An object containing identification details about a particular resource
     * @alias Sm.Core.Identifier
     * @class Sm.Core.Identifier
     * @property {string|r_id|Sm.Core.Identifier.r_id}  r_id
     */
    var Identifier = Sm.Core.Identifier = Class.extend({
        /**
         * Return an object for serialization
         * @return {*}
         */
        toJSON:        function () {
            //  create a temporary object to return, minus the Resource that comes with it\
            //  We remove the Resource to avoid cyclic serialization
            var faux_merge = Sm.Core.util.merge_objects(this, {});
            if ("Resource" in faux_merge) delete  faux_merge.Resource;
            //  return the object as the serialized object
            return faux_merge;
        },
        /**
         * Initialize the Identifier with properties (id, ent_id, MvCombo/Resource, and an optional r_id if you want to set that manually)
         * @param {SmModel|{r_id: string, ent_id:string, id: int, MvCombo:Sm.Core.MvCombo, type:string, Resource:{}}|Sm.Core.MvCombo|*=}        id_obj          The first object to check for properties
         * @returns {Sm.Core.Identifier|boolean}
         */
        init:          function (id_obj) {
            id_obj          = id_obj || {};
            id_obj.Resource = id_obj.Resource || id_obj.MvCombo || false;

            /**
             * Unique, randomly database generated string held by all entities. Begins with a 4 letter prefix.
             * @type {String}
             */
            this.ent_id   = this.ent_id || id_obj.ent_id || false;
            /**
             * The ID of the record in the table
             * @type {int}
             */
            this.id       = this.id || id_obj.id || false;
            this.id       = this.id ? parseInt(this.id) : false;
            this.r_id     = id_obj.r_id || this.r_id || false;
            /**
             * The type of resource that is being discussed
             * @type {String|*|null}
             */
            this.type     = this.type || id_obj.type || Identifier.guess_type(this.ent_id) || null;
            /**
             * A string that includes the type and ID of a resource
             * @type {String|*}
             */
            this.typed_id = this.typed_id || (this.type && this.type.length ? this.type + '|' + this.id : null);
            /**
             * A randomly generated string meant to uniquely identify this Identifier in the instance that the ent_id or ID aren't there
             * @type {r_id}
             * @prop
             */
            this.r_id     = this.r_id || this.ent_id || this.generate_r_id();
            this.Resource = this.Resource || id_obj.Resource || null;
            if (!this.ent_id) delete this.ent_id;
            if (!this.id) {
                delete this.typed_id;
                delete this.id;
            }
            Identifier.register(this.r_id, this)
                .register(this.typed_id, this)
                .register(this.ent_id, this);
            //if (!/Relationship|View/.test(this.type))Sm.CONFIG.DEBUG && console.log(this.type, this);
            return this;
        },
        /**
         * Generate the randomized ID
         * @return {*}
         */
        generate_r_id: function () {
            return u.randomString(15);
        },
        /**
         * If we ever find out more information about the resource, this updates the properties of the class accordingly
         * @param id_obj
         */
        refresh:       function (id_obj) {
            if (typeof id_obj !== "object") return this;
            if (!this.id && id_obj.id && (!!id_obj.type || !!this.type)) {
                this.id       = id_obj.id;
                this.typed_id = (id_obj.type || this.type) + '|' + this.id;
                Identifier.register(this.typed_id, this)
            }
            if (!this.ent_id && id_obj.ent_id) {
                this.ent_id = id_obj.ent_id;
                Identifier.register(this.ent_id, this)
            }

            if (!this.Resource && !!id_obj.Resource || !!id_obj.MvCombo) {
                this.Resource = id_obj.Resource || id_obj.MvCombo;
            }
            return this;
        },
        /**
         * Return the MvCombo associated with this identity
         * @returns {{}|Sm.Core.MvCombo|boolean}
         */
        getResource:   function () {
            return this.Resource || false;
        }
    });

    /**
     * This is an object linking Identifiers to typed_ids, ent_ids, or r_ids
     * @type {{}}
     */
    Identifier.registry             = {};
    /**
     * Save the Identity under a certain key. Meant to save the Ent_id, r_id, and typed_id of the resource in a map with the Identity itself
     * Return the Identifier to chain
     * @param {string}      key
     * @param {Identifier}    value
     */
    Identifier.register             = function (key, value) {
        if (!key || !value || !key.length) return Identifier;
        Identifier.registry      = (Identifier.registry || {});
        Identifier.registry[key] = value;
        return Identifier;
    };
    Identifier.get_or_init          = function (id_obj) {
        return Identifier.retrieve(id_obj) || (new Identifier(id_obj))
    };
    /**
     * Determine whether a string is probably a ent_id
     * @param {string|*}    item    The Item to check
     * @returns {boolean}
     */
    Identifier.is_ent_id            = function (item) {
        //The length is 25 chars
        //The 6 characters after the 4th character are integers between 0 and 9 (the date)
        var ent_id_length = 25;
        return (typeof item === 'string') && item.length === ent_id_length && /[0-9]{6}/.test(item.substr(4, 6));
    };
    /**
     * Turn something into an object (the format used by everything)
     * @param {Sm.Core.Identifier|int|string|{}|Sm.Core.SmModel|Sm.Core.MvCombo}   id      The entity that we are turning into an object. id, typed_id, or ent_id
     * @param {string=}         type    The type of entity it is
     * @returns {{ent_id: string, type: string}|string|object|{typed_id:string, type:string, id:int}}
     */
    Identifier.normalize_identifier = function (id, type) {
        if (!id) return {};
        var obj = {};
        if (typeof id === 'object') return id;

        if (typeof id === 'string' && id.indexOf('|')) {
            return {typed_id: id};
        }

        if (Identifier.is_ent_id(id)) {
            return {ent_id: id, type: type};
        } else if ($.isNumeric(id)) {
            obj.id   = parseInt(id);
            obj.type = type;
            if (typeof type === "string") {
                obj.typed_id = type + '|' + id;
            }
        }

        return obj;
    };
    /**
     *
     * @param {Sm.Core.Identifier|{}|Sm.Core.SmModel|Sm.Core.MvCombo|{ent_id: string, type: string}|string|object|{typed_id:string, type:string, id:int}}      id_obj          The first object to check for properties
     * @returns {Sm.Core.Identifier|boolean}
     */
    Identifier.retrieve             = function (id_obj) {
        var r_id;
        var bb         = false;
        var IdRegistry = Identifier.registry;
        if (typeof id_obj === "string") {
            bb = true;
            if (id_obj in IdRegistry) return IdRegistry[id_obj];
            r_id   = id_obj;
            id_obj = {};
            if (Identifier.is_ent_id(r_id)) id_obj.ent_id = r_id;
            else id_obj.r_id = r_id;
        }
        id_obj     = Identifier.normalize_identifier(id_obj, id_obj.type || false) || {};
        bb && Sm.CONFIG.DEBUG && console.log(id_obj);
        var ent_id = id_obj.ent_id || false;
        r_id       = r_id || id_obj.r_id;
        if (r_id && r_id in IdRegistry) {
            return IdRegistry[r_id].refresh(id_obj);
        }
        if (ent_id && ent_id in IdRegistry) {
            return IdRegistry[ent_id].refresh(id_obj);
        }
        var id       = id_obj.id || false;
        id           = id ? parseInt(id) : false;
        var type     = id_obj.type || Identifier.guess_type(ent_id) || '';
        var typed_id = type && type.length && id ? type + '|' + id : null;
        if (typed_id && typed_id in IdRegistry) {
            return IdRegistry[typed_id].refresh(id_obj);
        }
    };
    /**
     *
     * @param {Sm.Core.Identifier|{}|Sm.Core.SmModel|Sm.Core.MvCombo|{ent_id: string, type: string}|string|object|{typed_id:string, type:string, id:int}} id_obj
     * @return {boolean|Sm.Core.MvCombo|Sm.Core.SmView|Sm.Core.Relationship|*}
     */
    Identifier.identify             = function (id_obj) {
        var identity = Identifier.retrieve(id_obj);
        if (identity) {return identity.getResource()}
        return false;
    };
    /**
     * Guess the type based on the ent_id
     * todo consider moving Identifier to the meta object? Maybe not, actually
     * @param ent_id
     * @return {boolean|string}
     */
    Identifier.guess_type           = function (ent_id) {
        if (!ent_id || !ent_id.length) return false;
        var begin = ent_id.substr(0, 4);
        switch (begin) {
            case 'sec_':
                return 'Section';
            case 'dim_':
                return 'Dimension';
            case 'page':
                return 'Page';
            case 'coll':
                return 'Collection';
            case 'dic_':
                return 'Dictionary';
            default :
                return false;
        }
    };
    Sm.loaded.add('Core_Identifier');
});