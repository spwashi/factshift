/**
 * Created by Sam Washington on 11/6/16.
 */
define(['require', 'Sm', 'backbone'], function (require, Sm, Backbone) {
    Sm.Abstraction.Model = Backbone.Model.extend({
        defaults:    {
            id:     0,
            ent_id: null
        },
        entity_type: false,
        /**
         *
         * @param settings
         * @param settings.defaults
         * @param settings.entity_r_id
         * @param settings.entity_type
         */
        initialize:  function (settings) {
            settings           = settings || {};
            this.object_type   = 'Model';
            this.entity_type   = settings.entity_type || this.entity_type;
            this.resource_r_id = settings.resource_r_id;
            if ('entity_r_id' in this.attributes) delete this.attributes.resource_r_id;
            if ('entity_type' in this.attributes) delete this.attributes.entity_type;
        },
        setEntity:   function (Entity) {this.Entity = Entity || this.Entity || null;},
        toJSON:      function () {
            var ret_obj = Sm.Core.Util.merge_objects({}, this.attributes);
            if ('Entity' in ret_obj) delete ret_obj.Entity;
            return ret_obj;
        },
        url:         function () {
            if (!this.Entity) return false;
            var url = Sm.urls.api.generate('save', this.Entity || false);
            if (!url) throw new Sm.Exceptions.Error("Could not find URL for Resource", this);
            return url;
        }
    });
    Sm.Core.dependencies.add('Abstraction_Model');
});