/**
 * Created by Sam Washington on 12/20/15.
 */
define(['Emitter'], function (Emitter) {
	/**
	 * @class Meta
	 * @alias Sm.Core.Meta
	 * @extends Emitter
	 * @prop {function} add_MV_as                           {@link Sm.Core.Meta#add_MV_as}
	 * @prop {function} remove_MV_as                        {@link Sm.Core.Meta#remove_MV_as}
	 * @prop {{}}       relationship_types                  {@link Sm.Core.Meta#relationship_types}
	 * @prop {{}}       relationship_type_obj               {@link Sm.Core.Meta#relationship_type_obj}
	 * @prop {{}}       types                               {@link Sm.Core.Meta#types}
	 * @prop {{}}       relationship_aliases                {@link Sm.Core.Meta#relationship_aliases}
	 * @prop {function} get_type                            {@link Sm.Core.Meta#get_type}
	 * @prop {function} get_possible_relationship_indices   {@link Sm.Core.Meta#get_possible_relationship_indices}
	 * @prop {function} get_relationship_type               {@link Sm.Core.Meta#get_relationship_type}
	 * @prop {function} get_defaults_of                     {@link Sm.Core.Meta#get_defaults_of}
	 * @prop {function} configure                           {@link Sm.Core.Meta#configure}
	 *
	 */
	var Meta           = Emitter.extend({
		CONFIG:          {
			DEBUG:       false,
			EDIT:        false,
			DRAG_N_DROP: false
		},
		MvMaps:          {},
		init:            function (settings) {
			this.events         = [];
			this._callbacks     = {};
			this.MvMaps         = {
				loaded_MVs:    {},
				focused_MVs:   {},
				selected_MVs:  {},
				active_MVs:    {},
				destroyed_MVs: {}
			};
			this.loaded_ent_ids = {};

			settings            = settings || {};
			this.type           = settings.type;
			this.lower_plural   = this.lower_plural || {};
			this.lower_singular = this.lower_singular || {};

			var entities = Sm.Entities;
			for (var entity_name in entities) {
				if (!entities.hasOwnProperty(entity_name)) continue;
				this.lower_singular[entity_name] =
					this.lower_singular[entity_name]
					|| entity_name.toLowerCase();
				this.lower_plural[entity_name]   =
					this.lower_plural[entity_name]
					|| (entities[entity_name].plural || entity_name + 's').toLowerCase();
			}
		},
		/**
		 * @alias Sm.Core.Meta.configure
		 * @param config
		 */
		configure:       function (config) {
			//if (!config.relationships) Sm.CONFIG.DEBUG && console.log("Config for " + config.type + " does not have any relationships");
			var rto = this.relationship_type_obj = Sm.Core.util.merge_objects_recursive(config.relationships || {}, config.reciprocal_relationships || {});
			this.reciprocal_relationship_type_list = Object.keys(config.reciprocal_relationships || {});
			this.relationship_type_list            = Object.keys(config.relationships || {});
			//if (!config.properties) Sm.CONFIG.DEBUG && console.log("Config for " + config.type + " does not have any properties");
			var properties = this.properties = config.properties || {all: {ent_id: null, id: null}};
			properties.all            = properties.all || {};
			properties.api_settable   = properties.api_settable || {};
			properties.api_settable   = properties.api_settable || {};
			this.prefix               = config.prefix || null;
			var relationship_subtypes = config.relationship_subtypes || false;
			if (relationship_subtypes)
				for (var rel_type in relationship_subtypes) {
					if (!relationship_subtypes.hasOwnProperty(rel_type)) continue;
					var relationship = relationship_subtypes[rel_type];
					if (relationship && relationship.id) {
						this.relationship_subtypes[rel_type] = relationship;
					}
				}
		},
		/**
		 * @alias Sm.Core.Meta.get_defaults_of
		 * @param type
		 * @return {*}
		 */
		get_defaults_of: function (type) {
			var spwashi_entities = Sm.spwashi_config.entities;
			var _entity          = spwashi_entities[type];
			if (!_entity) return {};
			return (spwashi_entities.properties || {}).all || {};
		},


		relationship_types:                {
			children:    1,
			composition: 2,
			macros:      3,
			micros:      4,
			pivots:      5
		},
		relationship_subtypes:             {
			eli5:            1,
			thing_explainer: 2,
			image:           3,
			video:           4,
			audio:           5,
			text:            6
		},
		relationship_subtype_obj:          {
			eli5:            {
				name: 'ELI5',
				id:   1
			},
			thing_explainer: {
				name: 'Thing Explainer',
				id:   2
			},
			image:           {
				name: 'Image',
				id:   3
			},
			video:           {
				name: 'Video',
				id:   4
			},
			audio:           {
				name: 'Audio',
				id:   5
			},
			text:            {
				name: 'Text',
				id:   6
			}
		},
		/**
		 * Return an Array containing the possible ways that something can be related to another entity based on some properties
		 */
		types:                             {
			standard: 1
		},
		/**
		 * Sometimes the relationship will have a different index in the receiving class than we can automatically identify.
		 * This is the object that links type:alias
		 */
		relationship_aliases:              {},
		/**
		 * Get the either the index or the ID of the entity based on a provided index or ID
		 * @param identifier
		 * @param what_to_get
		 * @return {*}
		 */
		get_type:                          function (identifier, what_to_get) {
			var types = this.types;
			if (!!types[identifier]) {
				return what_to_get == 'index' ? identifier : types[identifier];
			}
			for (var t in types) {
				if (!types.hasOwnProperty(t)) continue;
				if (t == identifier || types[t] == identifier) return what_to_get == 'index' ? t : types[t];
			}
			return false;
		},
		/**
		 * @alias Sm.Core.Meta.get_named_relationship_indices
		 * @param {{}=}         settings
		 * @param {boolean}     settings.sub
		 * @return {{}}
		 */
		get_named_relationship_indices:    function (settings) {
			settings                       = settings || {};
			var sub                        = !!settings.sub;
			var relationship_type_obj      = sub ? this.relationship_subtype_obj : this.relationship_type_obj;
			var named_relationship_indices = {};
			for (var index in relationship_type_obj) {
				if (!relationship_type_obj.hasOwnProperty(index)) continue;
				var rel_obj = relationship_type_obj[index];
				var name    = rel_obj.name || rel_obj.index_singular || false;
				name        = Sm.Core.util.uc_first(name);
				if (name && !rel_obj.is_only_reciprocal) named_relationship_indices[name] = index;
			}
			return named_relationship_indices;
		},
		/**
		 * Return an Array containing the possible ways that something can be related to another entity based on some properties
		 * @alias Sm.Core.Meta#get_possible_relationship_indices
		 * @param settings
		 * @param settings.map
		 * @param settings.OtherMvCombo
		 * @param settings.SelfMvCombo
		 * @return {[]}                 This returns an array like [null, {relationship index}, ...] when asking for reciprocal indices, or [{rel ind}, ...] otherwise
		 */
		get_possible_relationship_indices: function (settings) {
			return [];
		},
		/**
		 * Return the type of relationship something is based on some sort of identifier
		 * @param {{}}                                                                              settings
		 * @param {boolean}                                                                         settings.sub             Are we looking for a subtype?
		 * @param {string}                                                                          settings.type            The type to search for. [index|id]
		 * @param {int|string}                                                                      settings.identifier      The relationship type (relationship_type_id or relationship_type name)
		 * @param {{collection_id:string, dimension_id: string, dictionary_id: string}=}            settings.map             A map object. Only used as support. Not good. Don't know why I did this.
		 * @param {boolean=false}                                                                   settings.is_reciprocal   Whether or not the relationship is reciprocal
		 * @param {string|int|*}                                                                    identifier
		 * @return {string|boolean|int}
		 */
		get_relationship_type:             function (settings, identifier) {
			var self_type             = this.type || false;
			/** NOTE: this is where iterates over object to find return type**.
			 settings                  = settings || {};
			 /** @type {boolean} Whether the relationship is reciprocal. If so, could possibly change the guess of what the relationship is based on the map */
			var is_reciprocal         = !!settings.is_reciprocal;
			/** @type {string} The type tp find - index|id */
			var type                  = settings.type || 'index';
			/** @type {string} The identifier that we will use to know what we are looking for. Could be an index or ID of the relationship type */
			identifier                = identifier || settings.identifier || false;
			/** @type {{}} The map object of the relationship. When guessing the IDs of the relationship later, this map is what we'll use for the indices */
			var map                   = settings.map || {};
			/**
			 * This is the relationship type object that has information on the relationships
			 * @type {Meta.relationship_type_obj|{}}
			 */
			var relationship_type_obj = !!settings.sub ? this.relationship_subtypes : this.relationship_type_obj;
			/** @type {string|int|boolean} The index of the relationship*/
			var index;
			identifier                = identifier || map.relationship_type || false;
			/** @type {*} The object of the Entities that are in the Sm namespace */
			var SmEntities            = Sm.Entities;
			if (!identifier) return false;
			/**
			 * Iterate through the relationship type object to find things that are mapped together
			 */
			for (var relationship_type_index in relationship_type_obj) {
				if (!relationship_type_obj.hasOwnProperty(relationship_type_index)) continue;
				var rel_type = relationship_type_obj[relationship_type_index];
				if (type == 'id') {
					index = rel_type.id || false;
					if (rel_type.id) index = rel_type.id;
					else index = parseInt(rel_type);
				} else if (type == 'model_type') {
					index = rel_type.model_type || self_type || false;
				} else if (type == 'name') {
					index = rel_type.name || rel_type.index_singular || false;
					index = Sm.Core.util.uc_first(index);
				} else {
					index = relationship_type_index;
				}


				if (rel_type == identifier) return index;
				// If the Identifier matches the type index, return what we want because it's a match}
				if (identifier == relationship_type_index) return index;
				if (!(typeof rel_type === "object")) continue;
				rel_type.index_singular = rel_type.index_singular || '';
				rel_type.id             = rel_type.id || '';
				// Same for the singular index. If there is a case where there are multiple indices delimited by pipes, search those for the right index
				var rel_ind_singular = rel_type.index_singular.constructor === Array ? rel_type.index_singular.join('|') : rel_type.index_singular;
				rel_ind_singular     = (rel_ind_singular || '').toLowerCase();
				if (identifier == rel_ind_singular || rel_ind_singular.toLowerCase().search(new RegExp("\\|?" + identifier.toLowerCase() + "\\|?")) > -1) return index;
				// If the identifier matches the id, return that
				if (!!rel_type.id && identifier == rel_type.id) return index;
			}
			//todo see if this next part makes sense
			/**
			 * Search the SmEntities to find out what the other type in the map would be. If it's reciprocal, we return the other type based on the
			 */
			for (var entity_type in SmEntities) {
				if (!SmEntities.hasOwnProperty(entity_type) || entity_type != this.type) continue;
				//guess the other type
				var probable_other_id = this.lower_singular[entity_type] + '_id';
				//If that's in the map, return the index of the entity we're on if it's not reciprocal. Otherwise, return the relationship index of this entity
				if (probable_other_id in map) {
					if (type == 'id') return false;
					else if (type == 'model_type' || type == 'name') return entity_type;
					else return (is_reciprocal ? this.lower_plural[entity_type] : this.lower_plural[this.type]) || false;
				}
			}
			if (!!settings.sub) {
				Sm.CONFIG.DEBUG && console.log('core_meta,grt,0', rel_type);
			}
			return false;
		},
		get_MVs:                           function (type) {
			//Sm.CONFIG.DEBUG && console.log(type, this.MvMaps[type], /loaded|active|focused|selected|destroyed/.test(type));
			if (/loaded|active|focused|selected|destroyed/.test(type)) return this.MvMaps[type + "_MVs"];
		},
		/**
		 * Check to see if an MV is loaded, active, focused, selected, etc.
		 * @param {string}                                              type_to_check   The Index to look in (loaded, active, focused, selected, etc.)
		 * @param {Sm.Core.Identifier|Sm.Core.SmView|Sm.Core.MvCombo}   Id              The ID, MvCombo, or a View with the Identity to search for
		 * @return {boolean}
		 */
		MV_is:                             function (type_to_check, Id) {
			if (!Id) return false;
			if (Id.Identity) {
				Id = Id.Identity;
			} else if (Id.MvCombo) {
				Id = Id.MvCombo.Identity;
			}
			var rid = Id.r_id;
			if (!rid) return false;

			type_to_check = type_to_check + '_MVs';

			return (this[type_to_check] && this[type_to_check][rid]);
		},
		/**
		 * Add Mv as type (linked, active, destroyed, focused, selected)
		 * @alias Sm.Core.Meta#add_MV_as
		 * @param {string}              type_to_add
		 * @param {Sm.Core.Identifier}    Id
		 */
		add_MV_as:                         function (type_to_add, Id) {
			if (!Id) return this;
			var ent_id = Id.ent_id || Id.getResource().ent_id;
			var rid    = Id.r_id;
			if (!rid) return this;
			var MvMaps = this.MvMaps;
			this.type !== false && Sm.Core.Meta.add_MV_as(type_to_add, Id);
			switch (type_to_add) {
				case 'destroyed':
					MvMaps.destroyed_MVs[rid] = true;
					return this;
					break;
				case 'loaded':
					MvMaps.loaded_MVs[rid] = Id;
					break;
				case 'active':
				case 'focused':
				case 'selected':
					if (!(type_to_add + '_MVs' in MvMaps)) {
						Sm.CONFIG.DEBUG && console.log(type_to_add, MvMaps);
						return this;
					}
					MvMaps[type_to_add + '_MVs'][rid] = Id;
					!(rid in MvMaps.loaded_MVs) && (MvMaps.loaded_MVs[rid] = Id);
					!(rid in MvMaps.active_MVs) && (MvMaps.active_MVs[rid] = Id);
					break;
			}
			(!!ent_id) && (this.loaded_ent_ids[ent_id] = Id);
			return this;
		},
		/**
		 * Remove Mv as type (linked, active, destroyed, focused, selected)
		 * @alias Sm.Core.Meta#remove_MV_as
		 * @param {string}              type_to_remove
		 * @param {Sm.Core.Identifier}    Id
		 */
		remove_MV_as:                      function (type_to_remove, Id) {
			var rid = Id.r_id;
			if (!rid) return this;
			var name   = type_to_remove + '_MVs';
			var MvMaps = this.MvMaps;
			if (!MvMaps[name]) return false;
			this.type !== false && Sm.Core.Meta.remove_MV_as(type_to_remove, Id);
			(rid in this.MvMaps[name]) && delete this.MvMaps[name][rid];
			if (name == 'loaded') {
				(rid in this.MvMaps.active_MVs) && delete this.MvMaps.active_MVs[rid];
				(rid in this.MvMaps.selected_MVs) && delete this.MvMaps.selected_MVs[rid];
				(rid in this.MvMaps.focused_MVs) && delete this.MvMaps.focused_MVs[rid];
			} else if (name == 'active') {
				(rid in this.MvMaps.selected_MVs) && delete this.MvMaps.selected_MVs[rid];
				(rid in this.MvMaps.focused_MVs) && delete this.MvMaps.focused_MVs[rid];
			}
			return true;
		}
	});
	/**
	 * @property lower_plural
	 */
	Sm.Core.Meta       = new Meta({
		type: false
	});
	Sm.Core.Meta.Proto = Meta;
	Sm.loaded.add('Core_Meta');
});