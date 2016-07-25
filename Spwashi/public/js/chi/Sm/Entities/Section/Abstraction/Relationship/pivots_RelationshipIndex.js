/**
 * Created by Sam Washington on 6/15/16.
 */
require(['require', 'Emitter', 'Sm'], function (require, Emitter) {
	require('Sm');
	require(['require', 'Sm/Extras/ViewAid'], function () {});
	Sm.loaded.when_loaded('Core_RelationshipIndex', function () {
		Sm.Entities.Section.Abstraction              = Sm.Entities.Section.Abstraction || {};
		Sm.Entities.Section.Abstraction.Relationship = Sm.Entities.Section.Abstraction.Relationship || {};

		/**
		 * A class to hold the pivot relationships that a Section might have
		 * @alias Sm.Entities.Section.Abstraction.Relationship.pivots_RelationshipIndex
		 * @extends Sm.Core.RelationshipIndex
		 */
		Sm.Entities.Section.Abstraction.Relationship.pivots_RelationshipIndex = Sm.Core.RelationshipIndex.extend({
			relationship_subtype_map: {},
			init:                     function (settings) {
				this.relationship_subtype_map = {};
				return Sm.Core.RelationshipIndex.prototype.init.apply(this, arguments);
			},
			/**
			 * Get all of the relationships that gall under a certain subtype
			 * @param subtype
			 * @param context_id
			 * @return {*}
			 */
			get_listed_subtype_items: function (subtype, context_id) {
				var subtypes = this.relationship_subtype_map[context_id];
				if (!subtypes || !subtypes[subtype]) return false;
				var items   = subtypes[subtype];
				var ret_obj = {
					relationships: [],
					items:         []
				};
				for (var p_r_id in items) {
					if (!items.hasOwnProperty(p_r_id)) continue;
					var section_relationship = items[p_r_id];
					var section              = Sm.Core.Identifier.retrieve(p_r_id);
					if (!section) continue;
					section = section.getResource();
					ret_obj.items.push(section);
					ret_obj.relationships.push(section_relationship);
				}
				return ret_obj;
			},
			sort_incoming:            function (Relationship_, item_id, context_id) {
				context_id = context_id || 0;
				var subtype;
				if (subtype = Relationship_.map.relationship_subtype) {
					subtype = Sm.Entities.Section.Meta.get_relationship_type({sub: true, type: 'index'}, subtype);
					if (!subtype) return;
					this.relationship_subtype_map[context_id]                   = this.relationship_subtype_map[context_id] || {};
					this.relationship_subtype_map[context_id][subtype]          = this.relationship_subtype_map[context_id][subtype] || {};
					this.relationship_subtype_map[context_id][subtype][item_id] = Relationship_;
				} else {
					Sm.CONFIG.DEBUG && console.log('sec/piv_relind/si/no-relationship-subtype', Relationship_);
				}
			},
			/**
			 *
			 * @param {Sm.Core.MvCombo.Identity.r_id|Sm.Core.Relationship|Sm.Core.Identifier}item_id
			 * @param context_id
			 * @param update_indices
			 * @return {boolean|*}
			 */
			remove_item:              function (item_id, context_id, update_indices) {
				context_id = context_id || 0;
				//If we could successfully remove the relationship, try to remove
				var success = this.relationship_subtype_map[context_id] && Sm.Core.RelationshipIndex.prototype.remove_item.apply(this, arguments);
				if (!success) return false;

				var rel_subs_context = this.relationship_subtype_map[context_id];
				if (typeof  item_id === "object") {
					if (item_id.setMap) {
						item_id = this.r_id_map[item_id.Identity.r_id];
					} else if (item_id.r_id) {
						item_id = item_id.r_id;
					}
				}
				for (var subtype in rel_subs_context) {
					if (!rel_subs_context.hasOwnProperty(subtype)) continue;
					if (rel_subs_context[subtype][item_id]) {
						var r_s_c_subtype = rel_subs_context[subtype];
						delete r_s_c_subtype[item_id];
						var has_something = false;
						for (var items in r_s_c_subtype) {
							//noinspection JSUnfilteredForInLoop
							has_something = r_s_c_subtype.hasOwnProperty(items);
							if (has_something)break;
						}
						if (!has_something) {
							delete rel_subs_context[subtype];
						}
					}
				}

			}
		});
		Sm.loaded.add('Entities_Section_Abstraction_Relationship_pivots_RelationshipIndex');
	}, 'Entities_Section_Abstraction_Relationship_pivots_RelationshipIndex');
});