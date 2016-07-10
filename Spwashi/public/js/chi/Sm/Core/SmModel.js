/**
 * Created by Sam Washington on 12/17/15.
 */
define(['backbone', 'Sm/urls/main'], function (Backbone) {
    /**
     * @alias Sm.Core.SmModel
     */
    Sm.Core.SmModel = Backbone.Model.extend({
        defaults:   {
            _permissions: {
                edit:    false,
                view:    false,
                destroy: false
            }
        },
        initialize: function (settings) {
            settings     = settings || {};
            /**
             *
             * @type {*|Sm.Core.MvCombo}
             */
            this.MvCombo = settings.MvCombo || null;
            if ('MvCombo' in this.attributes) {
                delete this.attributes.MvCombo;
                delete settings.MvCombo;
            }
            Object.defineProperties(this, {
                id:     {
                    get: function () {
                        return this.attributes.id;
                    }
                },
                ent_id: {
                    get: function () {
                        return this.attributes.ent_id;
                    }
                }
            });
        },
        toJSON:     function () {
            var ret_obj = Sm.Core.util.merge_objects({}, this.attributes);
            if ('MvCombo' in ret_obj) {
                delete ret_obj.MvCombo;
            }
            return ret_obj;
        },
        url:        function () {
            var self    = this;
            var context = this.context;
            return Sm.urls.api.generate({
                MvCombo: self,
                context: context
            });
        }
    });
    Sm.loaded.add('Core_SmModel');
});