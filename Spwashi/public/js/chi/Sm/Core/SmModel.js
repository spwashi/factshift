/**
 * Created by Sam Washington on 12/17/15.
 */
define(['backbone', 'Sm/urls/main'], function (Backbone) {
	/**
	 * @alias Sm.Core.SmModel
	 */
	Sm.Core.SmModel = Backbone.Model.extend({
		defaults:   function () {
			var _obj          = Sm.Core.Meta.get_defaults(this.prototype.type);
			_obj._permissions = {
				edit:    false,
				view:    false,
				destroy: false
			};
			return _obj;
		},
		set:        function (attributes, options) {
			var is_relationships = function (str) {
				return str.indexOf('-relationships') > 0;
			};
			var SelfMvCombo      = this.MvCombo;


			function difference(a1, a2) {
				var result = [];
				for (var i = 0; i < a1.length; i++) {
					if (a2.indexOf(a1[i]) === -1) {
						result.push(a1[i]);
					}
				}
				return result;
			}

			function check(attr, value, self) {
				value = value || [];
				if (typeof value !== "string" && !!value.indexOf) {
					var arr                = attr.split('-');
					var relationship_index = arr[0];
					var context_id         = 0;
					var RelationshipIndex  = SelfMvCombo.getRelationshipIndex(relationship_index);
					if (!RelationshipIndex) return;
					var listed_items           = RelationshipIndex.get_listed_items(context_id);
					var previous_items         = (listed_items || {}).items || [];
					var current_items          = value.map(function (r_id) {
						var other = Sm.Core.Identifier.identify(r_id);
						if (other) return other;
					});
					var r_id_map_fn            = function (s) {
						if (s)return s.r_id;
					};
					var item_r_id_list         = previous_items.map(r_id_map_fn);
					var current_item_r_id_list = current_items.map(r_id_map_fn);
					var removed                = difference(item_r_id_list, current_item_r_id_list);
					var kept                   = difference(current_item_r_id_list, item_r_id_list);
					Sm.CONFIG.DEBUG && console.log(removed, kept);
					var have_added             = false;
					var all_promise            = [];
					for (var i = 0; i < kept.length; i++) {
						var other_mvcombo_r_id = value[i];
						have_added             = true;
						/** @type {Sm.Core.MvCombo}  */
						var OtherMvCombo       = Sm.Core.Identifier.identify(other_mvcombo_r_id);
						var r                  = SelfMvCombo.add_relationship(OtherMvCombo, {relationship_index: relationship_index, context_id: context_id});
						all_promise.push(r);
					}
					Promise.all(all_promise).then(function (res) {
						Sm.CONFIG.DEBUG && console.log(res);
						if (!res || !res.length) return false;
						if (res.length === 1) res[0].Relationship && res[0].Relationship.save();
						else RelationshipIndex.save(context_id);
					});
					for (var j = 0; j < removed.length; j++) {
						var removed_mvcombo_r_id = removed[j];
						var index                = listed_items.items.indexOf(Sm.Core.Identifier.identify(removed_mvcombo_r_id));
						Sm.CONFIG.DEBUG && console.log(index, listed_items);
						if (index > -1) {
							/** @type {Sm.Core.Relationship}  */
							var relationship = listed_items.relationships[index] || false;
							if (relationship) relationship.destroy();
						}
					}
				} else {
					Sm.CONFIG.DEBUG && console.log(value);
				}
			}

			if (typeof attributes === "string" && is_relationships(attributes)) {
				check(attributes, options, this);
				return;
			} else {
				for (var attr_name in attributes) {
					if (!attributes.hasOwnProperty(attr_name)) continue;
					var value = attributes[attr_name];
					if (is_relationships(attr_name)) {
						check(attr_name, value || [], this);
						delete attributes[attr_name];
					}
				}
			}
			return Backbone.Model.prototype.set.call(this, attributes, options);
		},
		initialize: function (settings) {
			settings         = settings || {};
			this.object_type = "SmModel";
			/**
			 *
			 * @type {Sm.Core.MvCombo}
			 */
			this.MvCombo     = settings.MvCombo || null;
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
			if ('MvCombo' in ret_obj) delete ret_obj.MvCombo;
			if ('relationships' in ret_obj) delete ret_obj.relationships;
			if ('_permissions' in ret_obj) delete ret_obj._permissions;
			if ('Wrapper' in ret_obj) delete ret_obj.Wrapper;
			if ('CONFIG' in ret_obj) delete ret_obj.CONFIG;
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