/**
 * Created by Sam Washington on 12/20/15.
 */
define(['Emitter', 'Sm', 'jquery', 'underscore', 'inflection'], function (Emitter, Sm, $) {
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
	 * @prop {function} get_defaults_of                     {@link Sm.Core.Meta#get_defaults}
	 * @prop {function} configure                           {@link Sm.Core.Meta#configure}
	 *
	 */
	var Meta = Emitter.extend(
	{
		CONFIG:                            {
			DEBUG:       false,
			EDIT:        false,
			DRAG_N_DROP: false
		},
		MvMaps:                            {},
		init:                              function (settings) {
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

			settings = settings || {};
			/**
			 * @property Sm.Core.Meta.type
			 * @alias Sm.Core.Meta.type
			 * @type {string}
			 */
			this.type = settings.type;
			this.lower_plural   = this.lower_plural || {};
			this.lower_singular = this.lower_singular || {};

			var entities = Sm.Entities;
			for (var entity_name in entities) {
				if (!entities.hasOwnProperty(entity_name)) continue;
				this.lower_singular[entity_name] =
				this.lower_singular[entity_name]
				|| entity_name.toLowerCase();
				if (entity_name == 'Dictionary') this.lower_plural['Dictionary'] = 'dictionaries';
				this.lower_plural[entity_name] =
				this.lower_plural[entity_name]
				|| (entities[entity_name].plural || entity_name + 's').toLowerCase();
			}
		},
		/**
		 * @alias Sm.Core.Meta.configure
		 * @param config
		 */
		configure:                         function (config) {
			//if (!config.relationships) Sm.CONFIG.DEBUG && console.log("Config for " + config.type + " does not have any relationships");
			var rto = this.relationship_type_obj = Sm.Core.util.merge_objects_recursive(config.relationships || {}, config.reciprocal_relationships || {});
			this.reciprocal_relationship_type_list = Object.keys(config.reciprocal_relationships || {});
			this.relationship_type_list            = Object.keys(config.relationships || {});
			//if (!config.properties) Sm.CONFIG.DEBUG && console.log("Config for " + config.type + " does not have any properties");
			var properties                         = this.properties = config.properties || {all: {ent_id: null, id: null}};
			properties.all            = properties.all || {};
			properties.api_settable   = properties.api_settable || {};
			properties.api_settable   = properties.api_settable || {};
			this.prefix               = config.prefixes || null;
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
		get_defaults:                      function (type) {
			type                 = type || this.type;
			var spwashi_entities = Sm.spwashi_config.entities;
			var _entity          = spwashi_entities[type.replace('__', '|')];
			if (!_entity) return {};
			return (_entity.properties || {}).all || {};
		},
		is_api_settable:                   function (attribute) {
			var spwashi_entities = Sm.spwashi_config.entities;
			var _entity          = spwashi_entities[this.type.replace('__', '|')];
			if (!_entity) return false;
			var api = (_entity.properties || {}).api_settable || {};
			return (attribute in api || (api.indexOf && api.indexOf(attribute) > -1));
		},
		get_display_information:           function (attribute) {
			var spwashi_entities                             = Sm.spwashi_config.entities;
			var _entity                                      = spwashi_entities[this.type.replace('__', '|')];
			_entity.properties                               = _entity.properties || {};
			_entity.properties.display_types                 = _entity.properties.display_types || {};
			_entity.properties.display_types[attribute]      = _entity.properties.display_types[attribute] || {};
			_entity.properties.display_types[attribute].type = _entity.properties.display_types[attribute].type || this.get_datatype_of(attribute);
			_entity.properties.display_types[attribute].name = _entity.properties.display_types[attribute].name || _.titleize(attribute.replace('_', ' '));
			return _entity.properties.display_types[attribute];
		},
		get_datatype_of:                   function (attribute) {
			var spwashi_entities = Sm.spwashi_config.entities;
			var _entity          = spwashi_entities[this.type.replace('__', '|')];
			if (!_entity) return false;
			if (/((h|w)a|i|adopt)s_/.test(attribute)) {
				return "boolean";
			} else if (/(_id)/.test(attribute)) {
				return "entity";
			} else if (/(_(sub)?type)/.test(attribute)) {
				return "enum";
			}
			return "short";
		},
		get_attribute_enum_object:         function (attribute) {
			var split = attribute.split('_');
			if (this.type && this.type.toLowerCase() === split[0]) return this.types;
			else if (this[attribute + '_obj']) return this[attribute + '_obj'];
			else if (this[attribute + 's']) return this[attribute + 's'];
			return {};
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
		types:                             {standard: 1},
		/**
		 * Sometimes the relationship will have a different index in the receiving class than we can automatically identify.
		 * This is the object that links type:alias
		 */
		relationship_aliases:              {},
		/**
		 * Get the either the index or the ID of the entity based on a provided index or ID
		 * @alias Sm.Core.Meta.get_type
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
		 * @param {{}}            settings.map             A map object. Only used as support. Not good. Don't know why I did this.
		 * @param {boolean=false}                                                                   settings.is_reciprocal   Whether or not the relationship is reciprocal
		 * @param {string|int|*}                                                                    identifier
		 * @return {string|boolean|int}
		 */
		get_relationship_type:             function (settings, identifier) {
			var self_type     = this.type || false;
			settings          = settings || {};
			/** @type {boolean} Whether the relationship is reciprocal. If so, could possibly change the guess of what the relationship is based on the map */
			var is_reciprocal = !!settings.is_reciprocal;
			/** @type {string} The type tp find - index|id */
			var type          = settings.type || 'index';
			/** @type {string} The identifier that we will use to know what we are looking for. Could be an index or ID of the relationship type */
			identifier = identifier || settings.identifier || false;
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
				var rel_ind_singular    = rel_type.index_singular.constructor === Array ? rel_type.index_singular.join('|') : rel_type.index_singular;
				rel_ind_singular        = (rel_ind_singular || '').toLowerCase();
				if (identifier == rel_ind_singular || rel_ind_singular.toLowerCase().search(new RegExp("\\|?" + identifier.toLowerCase() + "\\|?")) > -1) return index;
				// If the identifier matches the id, return that
				if (!!rel_type.id && identifier == rel_type.id) return index;
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
		},
		get_self_type_identifier:          function () {
			if (!this.type) return false;
			return this.type.toLowerCase() + '_type';
		},
//
//
//
//
		is_id:                             function (id) {
			return $.isNumeric(id);
		},

		is_ent_id:             function (item) {
			Sm.CONFIG.DEBUG && console.log(item);
			//The length is 25 chars
			//The 6 characters after the 4th character are integers between 0 and 9 (the date)
			var ent_id_length = 25;
			var is_ent_id     = (typeof item === 'string') && item.length === ent_id_length && /^[a-zA-Z_]{4}[0-9]{6}/.test(item);
			Sm.CONFIG.DEBUG && console.log(is_ent_id, item);
			return is_ent_id;
		},
		prefix_to_model_type:  function (prefix) {
			return (prefix in Sm.spwashi_config.prefixes) ? Sm.spwashi_config.prefixes[prefix] : false;
		},
		/**
		 *
		 * @param item
		 * @return {string|boolean}
		 */
		convert_to_model_type: function (item) {
			var t_name;
			var prefix, table_name, model_type, ent_id;
			if (typeof item === "object") {
				ent_id     = item.ent_id || false;
				model_type = item.model_type || item.type || false;
			} else if (typeof  item === "string") {
				if (item in Sm.Entities) return item;
				model_type = _(_.titleize(item.replace('_id', ''))).singularize();
			}
			if (!model_type) {
				if (ent_id || (typeof item === "string")) {
					if (!ent_id && this.is_ent_id(item)) { ent_id = item}
					prefix = ent_id.substr(0, 4);
				}
				model_type = this.prefix_to_model_type(prefix);
			}
			return model_type && model_type in Sm.Entities ? model_type : false;
		},
		convert_to_id:         function (item) {
			var table_name;
			var model_type = this.convert_to_model_type(item);
			if (!model_type) return false;
			table_name = _.singularize(model_type.toLowerCase());
			return table_name + '_id';
		},
		get_map_between:       function (one, two) {
			if (!two && typeof one === "object" && one[1] && one[0]) {
				two = one[1];
				one = one[0];
			}
			var m_1 = this.convert_to_model_type(one);
			var m_2 = this.convert_to_model_type(two);
			if (!m_1 || !m_2) return false;
			var try_1 = m_1 + '__' + m_2;
			if (try_1 in Sm.Entities) return try_1;
			var try_2 = m_2 + '__' + m_1;
			if (try_2 in Sm.Entities) return try_2;
			return false;
		}
	});
	/**
	 * @property lower_plural
	 */
	Sm.Core.Meta = new Meta({
		type: false
	});
	Sm.Core.Meta.get_entity = function (type) {
		var entities = Sm.Entities;
		return entities && entities[type] ? entities[type] : false;
	};
	Sm.Core.Meta.Proto      = Meta;
	Sm.loaded.add('Core_Meta');
});