/**
 * Created by Sam Washington on 12/17/15.
 */
define(['Class', 'Sm'], function (Class) {
	/**
	 * Contains details about the relationship between one entity and one or more others
	 * @exports Relationship
	 * @class   Relationship
	 * @alias   Sm.Core.Relationship
	 * @extends Class
	 *
	 * @property map
	 * @property {Sm.Core.Identifier}       Identity                    An object containing details about what this Relationship represents on the server
	 * @property get_Mv                     Get the MvCombo corresponding to a particular map index {@link Sm.Core.Relationship#get_Mv}
	 * @property register_view_relationship Link Views together in a specific relationship          {@link Sm.Core.Relationship#register_view_relationship}
	 * @property link_Mv                    Link an MvCombo to a proper map index                   {@link Sm.Core.Relationship#link_Mv}
	 * @property get_view                   Retrieve a view based on another and a map index        {@link Sm.Core.Relationship#getView}
	 * @property setMap                     Retrieve a view based on another and a map index        {@link Sm.Core.Relationship#setMap}
	 */
	Sm.Core.Relationship = Class.extend(
	{
		number_of_links:                  2,
		/**
		 *
		 * @param settings
		 * @param settings.linked_entities
		 * @param settings.rel_indexes
		 * @param settings.context_id
		 */
		init:                             function (settings) {
			settings = settings || {};
			/**
			 * An array of the RelationshipIndices that this Relationship belongs to
			 * @type {Array}
			 */
			this.relationshipIndexRIDs = [];
			/**
			 * An array of things that need to be deleted (by RID)
			 * @type {{}}
			 */
			this._to_delete = {};
			/**
			 * An object containing the index that is being referenced in the map (e.g. collection_id) and the MvCombo's Identifier
			 * @link Sm.Core.Identifier
			 * @link Sm.Core.MvCombo
			 * @alias Sm.Core.Relationship#_map_links
			 * @type {Object<string, Sm.Core.Identifier>}
			 * @private
			 */
			this._map_links = {};
			/**
			 * An object that connects specific Views to the relationship. Useful if there are multiple instances of a relationship being displayed in multiple different places
			 * @type {{}}
			 * @private
			 */
			this._view_associations = {};
			/**
			 * The Entities that are allowed to be linked (right now, this is not enforced. Honesty policy!)
			 * @type {*|Array}
			 */
			this.linked_entities = settings.linked_entities || this.linked_entities || ['', ''];
			/** @type {Sm.Entities.Abstraction.SmEntity}  */
			var MapEntity = Sm.Entities[Sm.Core.Meta.get_map_between(this.linked_entities)];
			this.Map      = MapEntity.Wrapper.init_MvCombo({model: settings.map || {}});

			/**
			 * The indexes of each different id in the relationship (e.g. dimension_id)
			 * @type {*|string[]}
			 */
			this.rel_indexes = settings.rel_indexes || this.rel_indexes || ['', ''];
			var self        = this;
			this.Identity   = Sm.Core.Identifier.get_or_init({
				                                                 type:     'Relationship',
				                                                 Resource: self
			                                                 });
			this.context_id = settings.context_id || 0; //todo need to have a way to look for the context ID of the relationship
		},
		/**
		 * Get the Identifier of an MvCombo that resides at a specific index in the map_links map
		 * @param key
		 * @return {Sm.Core.Identifier|boolean}
		 */
		get_Identity_at_index:            function (key) {
			return this._map_links[key] || false
		},
		/**
		 * Set the map of the relationships, fill in the blank with defaults
		 * @alias Sm.Core.Relationship#setMap
		 * @param map
		 */
		setMap:                           function (map) {
			map      = map || {};
			this.map = Sm.Core.util.merge_objects(this.map, map);
			this.Map.Identity.refresh(map);
			this.Map.Model.set(map, {silent: true});
			return this;
		},
		toJSON:                           function () {
			var r = {
				map:   this.Map || this.map,
				_meta: this._meta
			};
			Sm.CONFIG.DEBUG && console.log(r);
			return r;
		},
		/**
		 * Save the relationship
		 * todo
		 * @param settings
		 */
		save:                             function (settings) {
			var url = Sm.urls.api.generate({Relationship: this});
			Sm.CONFIG.DEBUG && console.log(JSON.stringify(this));
			var self = this;
			Sm.CONFIG.DEBUG && console.log(this.Map && this.Map.Model.get('id'), 'Rel,save');
			return Promise.resolve($.ajax({
				                              url:         url,
				                              data:        JSON.stringify(this),
				                              contentType: 'application/json; charset=UTF-8',
				                              method:      this.Map && this.Map.Model.get('id') ? "PATCH" : "POST"
			                              })).then(function (result) {
				if (result && result.success && result.data && result.data.map) {
					if (result.data.map.id) self.setMap(result.data.map);
				}
			});
		},
		remove_from_relationship_indices: function () {
			var RelationshipIndices = this.relationshipIndexRIDs;
			for (var i = 0; i < RelationshipIndices.length; i++) {
				var r_id              = RelationshipIndices[i];
				/** @type {Sm.Core.RelationshipIndex|*}  */
				var RelationshipIndex = Sm.Core.Identifier.identify(r_id);
				if (RelationshipIndex) {
					var res = RelationshipIndex.remove_item(this, this.context_id);
					if (!!res) {
						RelationshipIndices.splice(i, 1);
						i--;
					}
				}
			}
		},
		/**
		 * Remove the relationship, destroy the Views associated with it
		 * @param {{}=}settings
		 * @param {boolean=true} settings.silent Should we update the relationship indexes? (save them)
		 * @param {boolean=true} settings.secondary_key (The key of the view that we are removing
		 * @param {boolean=true} settings.primary_key (The key of the view that we should probably remain)
		 */
		destroy:                          function (settings) {
			Sm.CONFIG.DEBUG && console.log('Not able to destroy this relationship');
			settings          = settings || {};
			var silent        = ("silent" in settings) ? settings.silent : true;
			var related_views = this._view_associations;
			//Get the ID where the secondary relationship is being stored
			var secondary_key = settings.secondary_key || this.rel_indexes[1];
			//If the secondary key exists and is not just the default empty string, iterate through all of the linked views and remove the secondary view
			if (secondary_key && secondary_key.length) {
				for (var view_cid in related_views) {
					if (!related_views.hasOwnProperty(view_cid)) continue;
					this._to_delete[view_cid] = related_views[view_cid][secondary_key];
				}
			}
			var url  = Sm.urls.api.generate({Relationship: this});
			var self = this;
			return Promise.resolve($.ajax({
				                              url:         url,
				                              data:        JSON.stringify(this),
				                              contentType: 'application/json; charset=UTF-8',
				                              method:      "DELETE"
			                              })).then(function (result) {
				Sm.CONFIG.DEBUG && console.log(result);
				if (result && result.success) {
					self.remove_from_relationship_indices();
				} else {
					throw result.error;
				}
			});
		},
		/**
		 * Link an MvCombo to a map_index (e.g. collection_id)
		 * @alias Sm.Core.Relationship#link_Mv
		 * @param {Sm.Core.MvCombo} Mv
		 * @param map_index
		 * @returns {Sm.Core.Relationship}
		 */
		link_Mv:                          function (Mv, map_index) {
			if (!Mv || !map_index) return this;
			if (this.linked_entities.length < 2) {
				this.linked_entities.push(Mv.type);
			}
			this._map_links[map_index] = Mv.Identity;
			return this;
		},
		/**
		 * Retrieve a linked resource by map index or, if there are only two being related, by the MvCombo that is not wanted (get the other)
		 * @alias Sm.Core.Relationship#get_Mv
		 * @param identification
		 * @param {string=}                 identification.map_index            The Index in the map to retrieve
		 * @param {Sm.Core.MvCombo=}        identification.SelfMvCombo          The MvCombo that is known, opposite the one that is wanted
		 * @param {Sm.Core.Identifier=}     identification.Identity             The Identifier that is known, opposite of the MvCombo that is wanted
		 * @return {Sm.Core.MvCombo|boolean|*}
		 */
		get_Mv:                           function (identification) {
			var map_index = identification.map_index;
			if (!$.isArray(map_index))                 map_index = (map_index || '').split('|');

			var Id = (identification.SelfMvCombo) ? identification.SelfMvCombo.Identity : identification.Identity;

			for (var i = 0; i < map_index.length; i++) {
				var m_index = map_index[i];
				if (m_index && m_index.length && this._map_links[m_index]) {
					return this._map_links[m_index].getResource();
				}
			}
			if (Id && this.number_of_links == 2) {
				var map_links = this._map_links;
				for (var index in map_links) {
					if (!map_links.hasOwnProperty(index)) continue;
					if (!map_links[index]) continue;
					if (map_links[index] != Id) {
						return map_links[index].getResource();
					}
				}
			}
			return false;
		},
		/**
		 * Find out the index in the map at which the MvCombo resides (e.g. collection_id)
		 * @param identification
		 * @return {string|boolean}
		 */
		get_map_index_of_Mv:              function (identification) {
			var Id = (identification.SelfMvCombo) ? identification.SelfMvCombo.Identity : identification.Identity;
			if (Id && this.number_of_links == 2) {
				var map_links = this._map_links;
				for (var index in map_links) {
					if (!map_links.hasOwnProperty(index)) continue;
					if (!map_links[index]) continue;
					if (map_links[index] == Id) {
						return index;
					}
				}
			}
			return false;
		},
		/**
		 * Return an object that represents the default properties of the map that we are dealing with.
		 * The Map depends on the type.
		 * @returns {{id: null}}
		 * @private
		 */
		_get_default_map_properties:      function () {
			return {
				id: null
			}
		},
		/**
		 * Connect Views together in a predictable way based on the entities they represent.
		 * @alias Sm.Core.Relationship#register_view_relationship
		 * @param {Object<string, Sm.Core.SmView>} relationship_obj     An object representing the views mapped to their correct indices in the map (e.g. {section_id : View})
		 */
		register_view_relationship:       function (relationship_obj) {
			relationship_obj = relationship_obj || {};
			var rel_indexes  = this.rel_indexes;
			for (var i = 0; i < rel_indexes.length; i++) {
				var rel               = rel_indexes[i];
				relationship_obj[rel] = relationship_obj[rel] || false;
			}
			for (var index in relationship_obj) {
				if (!relationship_obj.hasOwnProperty(index)) continue;
				var View = relationship_obj[index];
				if (!View || !View.cid) continue;
				this._view_associations[View.cid] = relationship_obj;
			}
		},
		/**
		 * Return a View based on a provided c_id and the desired relationship type
		 * @param {Sm.Core.SmView}      self_View       The View that is known
		 * @param {string=}              other_index       The map_index to search for the View
		 * @param {boolean=}             strict
		 * @return {boolean|Sm.Core.SmView}
		 */
		getView:                          function (self_View, other_index, strict) {
			var self_cid = self_View.cid;
			if (!other_index) {
				var self_MvCombo = self_View.MvCombo;
				other_index      = this.get_map_index_of_Mv(this.get_Mv({
					                                                        SelfMvCombo: self_MvCombo
				                                                        }));
			}
			if (!self_cid || !other_index || (!!strict && !this._view_associations[self_cid])) return false;
			if (this._view_associations[self_cid] && this._view_associations[self_cid][other_index]) return this._view_associations[self_cid][other_index];
			if (!!strict) return false;
			var rel_indices = this.rel_indexes;
			var self_index;
			if (rel_indices.length == 2) {
				for (var i = 0; i < rel_indices.length; i++) {
					var index = rel_indices[i];
					if (index != other_index) {
						self_index = index;
						break;
					}
				}
			}
			if (self_index) {
				var OtherMvCombo     = this.get_Mv({
					                                   SelfMvCombo: self_View.MvCombo,
					                                   map_index:   other_index
				                                   });
				var v_r_obj          = {};
				v_r_obj[self_index]  = self_View;
				v_r_obj[other_index] = OtherMvCombo.getView({
					                                            reference_element: self_View.referenceElement,
					                                            strict:            strict
				                                            });
				this.register_view_relationship(v_r_obj);
				return this.getView(self_View, other_index, true);
			}
			Sm.CONFIG.DEBUG && console.log(other_index, self_index);
			return false;
		}
	});
	Sm.loaded.add('Core_Relationship');
});