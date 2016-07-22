/**
 * Created by Sam Washington on 12/17/15.
 */

/**
 * @module Sm-Core-MvCombo
 */
require(['require', 'Sm', 'Sm-Core-util', 'Emitter'], function (require) {
	var Emitter = require('Emitter');

	/**
	 * @typedef {Object} CONFIG      An object that holds standard configuration details for the entire page
	 * @prop    {Boolean}   EDIT        Is the page in Edit mode?
	 * @prop    {Boolean}   DEBUG       Is the page in debug mode?
	 * @prop    {Boolean}   DRAG_MODE   Is the page in drag and drop mode?
	 */
	/**
	 * @typedef {Object}    EntityStatus
	 * @prop {Boolean}      is_focused      At least one of the MvCombo's Views is focused
	 * @prop {Boolean}      is_selected     At least one of the MvCombo's Views is selected
	 * @prop {Boolean}      is_saving       The MvCombo is in the process of being saved
	 * @prop {Boolean}      is_init         The MvCombo has been initialized
	 * @prop {Boolean}      is_editing         The MvCombo has been initialized
	 * @prop {Boolean}      is_active       The MvCombo is displayed somewhere on the screen
	 * @prop {Boolean}      is_complete     The MvCombo has a Model that has an ID and a ent_id
	 * @prop {Boolean}      has_ent_id        The MvCombo has a ent_id
	 */
	/**
	 * @typedef {Object}    EntityDetails
	 * @prop {Boolean}      is_editable
	 * @prop {Boolean}      is_selectable
	 * @prop {Boolean}      is_viewable
	 * @prop {Boolean}      is_relatable
	 * @prop {Boolean}      is_destroyable
	 * @prop {Boolean}      is_repositionable
	 * @prop {Boolean}      is_copyable
	 * @prop {Boolean}      is_draggable
	 */
	/**
	 * @alias Sm.Core.MvCombo
	 *
	 * An object that wraps Models and Views together under a common identifier
	 * @extends Emitter
	 * @type {Emitter|Function}
	 *
	 * @requires Sm.Core.Identifier
	 *
	 * @property {Object<SmView, string>}                   Views                       An object containing the views the belong to the MvCombo
	 * @property {Sm.Core.MvWrapper}                        Wrapper                     The wrapper object for this type
	 * @property {Array}                                    ViewList                    An array of the cid's belonging to the views of the MvCombo
	 * @property {CONFIG}                                   CONFIG                      An object that details what this page is meant to be
	 * @property {EntityStatus}                             status                      An object containing statuses of the object
	 * @property {EntityDetails}                            details                     An object detailing some of the broad interaction details surrounding this entity
	 * @property {Sm.Core.Identifier}                       Identity                    An object containing details about what this MvCombo represents on the server
	 * @property {{}<string, Sm.Core.RelationshipIndex>}    relationships               The way entities relate to this(this is the primary entity/relationship holder)
	 * @property {{}<string, Sm.Core.RelationshipIndex>}    reciprocal_relationships    The way this relates to entities (this is the secondary+ entity) Reciprocal relationships let us know which relationships must be severed
	 * @property {{}}                                       relationship_map            Matches relationship
	 * @property {Sm.Core.MvCombo.Identity.r_id|string}     r_id
	 * @property {function}                                 _return_relationship    {@link Sm.Core.MvCombo#_create_relationship_holder}
	 * @property {function}                                 focus                   {@link Sm.Core.MvCombo#focus}
	 * @property {function}                                 save                    {@link Sm.Core.MvCombo#save}
	 * @property {function}                                 destroy                 {@link Sm.Core.MvCombo#destroy}
	 * @property {function}                                 _prompt_destroy         {@link Sm.Core.MvCombo#_prompt_destroy}
	 * @property {function}                                 _prompt_save            {@link Sm.Core.MvCombo#_prompt_save}
	 * @property {function}                                 _continue_destroy       {@link Sm.Core.MvCombo#_continue_destroy}
	 * @property {function}                                 _continue_save          {@link Sm.Core.MvCombo#_continue_save}
	 * @property {function}                                 _initModel              {@link Sm.Core.MvCombo#_initModel}
	 * @property {function}                                 removeView              {@link Sm.Core.MvCombo#removeView}
	 * @property {function}                                 getView                 {@link Sm.Core.MvCombo#getView}
	 * @property {function}                                 forEachView             {@link Sm.Core.MvCombo#forEachView}
	 */
	Sm.Core.MvCombo            = Emitter.extend({
		/**
		 * @constructor
		 * @param           settings
		 * @param {CONFIG}  settings.CONFIG
		 * @param {Sm.Core.SmModel=}    settings.Model          An SmModel that is related to this MvCombo
		 * @param {{}}                  settings.model          An object detailing properties of the new SmModel
		 * @param {Backbone.View=}      settings.View           A View that may already be correlated with this MvCombo's Identity
		 * @param {HTMLElement=}        settings.view           An element that is already correlated with this MvCombo' Identity
		 * @param {String=}             settings.type           The type of MvCombo this is. Not sure why this is here
		 * @param {int=}                settings.id             An ID that is meant to correspond with this MvCombo - used as a backup
		 * @param {String=}             settings.ent_id           A ent_id that is meant to correspond with this MvCombo - used as a backup
		 * @param {Sm.Core.Identifier}  settings.Identifier     If there is, for some reason, a preexisting Identity, use that
		 */
		init:                         function (settings) {
			this.type                  = settings.type || this.type || 'MvCombo';
			this.object_type           = "MvCombo";
			settings                   = settings || {};
			this._callbacks            = {};
			this.status                = {};
			this._relationships_to_add = null;
			this._permissions          = {};
			/**
			 * An object containing the views the belong to the MvCombo
			 * @type {{}}
			 */
			this.Views                 = {};
			/**
			 * An object containing information about which of this MvCombo's Views are ___d
			 * @type {{selected_Views: {}, active_Views: {}, focused_Views: {}}}
			 */
			this.ViewMaps              = {
				selected_Views: {},
				active_Views:   {},
				focused_Views:  {}
			};
			/**
			 * An array of the cid's belonging to the views of the MvCombo
			 * @type {Array}
			 */
			this.ViewList              = [];
			/**
			 * An Array of Views that were created just for the sake of having a View - if this can be replaced by a real element, that is preferable.
			 * @type {Array}
			 */
			this.defaultViewList       = [];
			/**
			 * The Model that matches up to the Resource that we are dealing with
			 * @type {Sm.Core.SmModel}
			 */
			this.Model                 = null;
			this.relationship_map      = {};

			/**
			 * Contains the relationships in which this is the primary relationship or relationships that don't have primary/secondary relationships
			 * @type {{_meta: {default_list: Array, contexts: {}}}}
			 */
			this.relationships            = {};
			/**
			 * An index containing the relationships in which this is the secondary relationship
			 * Also contains details about what other Entities this is related to
			 * @type {{_meta: {default_list: Array, contexts: {}}}}
			 */
			this.reciprocal_relationships = {};

			/**
			 * The relationships in which this Model is the primary entity/relationships this MvCombo has
			 * @type {*|Object.<string, Sm.Core.Relationship>|boolean|{}}
			 */
			this.relationships            = this._create_relationship_holder() || {};
			/**
			 * The relationships in which this Model is the secondary entity/How this MvCombo relates to other things
			 * @type {*|Object.<string, Sm.Core.Relationship>|boolean|{}}
			 */
			this.reciprocal_relationships = this._create_relationship_holder(true) || {};

			//todo
			this.CONFIG = Sm.CONFIG;

			this.Wrapper = settings.Wrapper || null;
			//initialize a view from the provided element or just instantiate a default View
			this.addView(settings.view || settings.View || null);
			var Model    = settings.model || settings.Model || null;

			Model = this.Model = this._initModel(Model);

			var self    = this;
			var type    = this.type || settings.type;
			this._cache = {ids: {}};
			var Id      = this.Identity = settings.Identifier || Sm.Core.Identifier.get_or_init({
					id:       Model.id || settings.id || false,
					ent_id:   Model.ent_id || settings.ent_id || false,
					type:     type,
					Resource: self
				});
			this.Model.Identity = Id;

			/**
			 * Add all of the known relationships in their proper indices
			 * @see {Sm.Core.MvCombo._prepare_known_relationships}
			 */
			var prepare_known_relationships = (function (self) {
				return function () {
					//self._relationships_to_add && Sm.CONFIG.DEBUG && console.log(self._relationships_to_add);
					self._prepare_known_relationships(self._relationships_to_add);
					!Sm.CONFIG.DEBUG && (self._relationships_to_add = null);
				}
			})(this);

			/**
			 * Take all of the relationships to add (from initModel) and put them in the right places
			 */
			if (Sm.loaded.is_loaded('entities_' + this.type))prepare_known_relationships();
			else Sm.loaded.when_loaded(['entities_' + this.type], prepare_known_relationships, 'prepare_' + Id.ent_id + '_relationships');

			var get_fn = function (index) {
				return function () {
					if (self._cache.ids[index]) return self._cache.ids[index];
					return self._cache.ids[index] = !self.Identity || !self.Identity[index] ? false : self.Identity[index];
				}
			};

			Object.defineProperties(self, {
				ent_id: {
					get: get_fn('ent_id')
				}, id:  {
					get: get_fn('id')
				},
				/**
				 * @alias Sm.Core.MvCombo.r_id
				 * @type {Sm.Core.MvCombo.Identity.r_id|Sm.Core.Identifier.r_id|*}  */
				r_id:   {
					get: get_fn('r_id')
				}
			});

			if (this.ent_id) this.setStatus('has_ent_id', true);
			this.setStatus('completed', !!(Id.id && Id.ent_id && Id.ent_id.length));

			var _destroy = this.add_bound('_destroy', this.destroy);
			var _focus   = this.add_bound('_focus', this.focus);

			this.on('destroy', _destroy).on('focus', _focus);
			this.setStatus('init', true)
		},
		/**
		 * @alias Sm.Core.MvCombo#_return_relationship
		 * @param is_reciprocal Is the relationship reciprocal?
		 * @return {Object<string, Sm.Core.Relationship>|boolean}
		 * @protected
		 */
		_create_relationship_holder:  function (is_reciprocal) {
			var new_obj = {};

			if (!Sm.Entities[this.type]) return false;

			var Meta_ = Sm.Entities[this.type].Meta;
			if (!Meta_) return false;

			var relationship_obj_obj = Meta_.relationship_type_obj;
			if (!relationship_obj_obj) return false;
			var self_type               = this.type;
			var self                    = this;
			is_reciprocal               = !!is_reciprocal;
			var relationship_types_list = !is_reciprocal ? Meta_.relationship_type_list : Meta_.reciprocal_relationship_type_list;
			/**
			 * Iterate through the known relationships and add a new {@link Sm.Core.RelationshipIndex} for each one
			 */
			for (var i = 0; i < relationship_types_list.length; i++) {
				var r_t = relationship_types_list[i];
				if (!relationship_obj_obj.hasOwnProperty(r_t)) continue;
				var rel_obj = relationship_obj_obj[r_t];
				if (rel_obj.is_only_reciprocal && !is_reciprocal) continue;

				var index = Meta_.get_relationship_type({type: 'index'}, r_t);

				var ModelRelationshipIndex = false;
				Sm.Entities[this.type].Abstraction && Sm.Entities[this.type].Abstraction.Relationship && (ModelRelationshipIndex = Sm.Entities[this.type].Abstraction.Relationship[index + '_RelationshipIndex']);
				ModelRelationshipIndex     = ModelRelationshipIndex || Sm.Core.RelationshipIndex;

				new_obj[r_t] = new ModelRelationshipIndex({
					/**
					 * If the relationship is reciprocal, change the way we relate it
					 */
					_key:            (is_reciprocal ? rel_obj.primary_key : rel_obj.secondary_key),
					is_reciprocal:   is_reciprocal,
					index:           index,
					parent_type:     self_type,
					linked_entities: rel_obj.linked_entities,
					MvCombo:         self
				});
			}
			return new_obj;

		},
		/**
		 * Initialize this MvCombo's Model from a Backbone model or an object of properties
		 * @alias Sm.Core.MvCombo#_initModel
		 * @param Model Either a Backbone Model or a json_encoded PHP Model
		 * @returns {*}
		 * @private
		 */
		_initModel:                   function (Model) {
			var sm_type = Sm.Entities[this.type];
			if (!sm_type) return false;
			var ModelType_ = sm_type.Model;
			if (!ModelType_) return false;

			var id, ent_id;
			if (Model instanceof ModelType_) {
				Model.MvCombo = this;
				id            = Model.get('id');
				ent_id        = Model.get('ent_id');
			} else {
				if (typeof Model === 'string') {
					Model = $.parseJSON(Model);
				} else if (!Model) {
					Model = {};
				}
				var model_props = {};
				id              = Model.id;
				ent_id          = Model.ent_id;
				if (!!Model.id) model_props = _.clone(Model);
				/**
				 * Get details from the permissions
				 */
				if (model_props._permissions) {
					var _permissions = model_props._permissions;
					this.setPermission(_permissions);
				}

				/**
				 * Get the relationships_to_add from the relationships items index
				 */
				if (model_props.relationships && model_props.relationships) {
					this._relationships_to_add = model_props.relationships;
					delete model_props.relationships;
				}

				model_props.MvCombo = this;
				Model               = new ModelType_(model_props);
				Model.MvCombo       = this;
			}
			this.id     = id || false;
			this.ent_id = ent_id || false;
			return (Model || {});
		},
		refresh_model:                function (m) {
			m         = m || {};
			var Model = this.Model;
			if (m._permissions) {
				this.setPermission(m._permissions);
				delete m._permissions;
			}
			Model.set(m, {silent: true});
		},
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
		setPermission:                function (permission, value) {
			if (typeof permission === "string") {
				this._permissions[permission] = value;
			} else if (typeof permission === "object") {
				for (var name in permission) {
					if (!permission.hasOwnProperty(name)) continue;
					this.setPermission(name, permission[name])
				}
			}
		},
		queryPermission:              function (permission) {
			return permission && this._permissions[permission] ? this._permissions[permission] : null;
		},
		setStatus:                    function (status, value) {
			if (typeof status === "string") {
				this.status[status] = value;
			} else if (typeof status === "object") {
				for (var name in status) {
					if (!status.hasOwnProperty(name)) continue;
					this.setStatus(name, status[name])
				}
			}
		},
		queryStatus:                  function (status) {
			return status && this.status[status] ? this.status[status] : null;
		},
		/**
		 * Iterate through the known relationships (usually the relationships that were provided through the query) and prepare them to be linked to MvCombos later
		 * @todo consider changing this to allow relationships between more than two entities
		 * @todo this is sometimes asynchronous, may cause issues later. For now, this is pretty okay.
		 * @param {{}}  relationships   Generally the relationships_to_add from the _initModel
		 * @see Sm.Core.MvCombo._initModel
		 * @private
		 */
		_prepare_known_relationships: function (relationships) {
			relationships = relationships || {};
			var self_type = this.type;
			//Sm.CONFIG.DEBUG && console.log(relationships, ' -- relations for ' + self_type);
			for (var relationship_index in relationships) {
				if (!relationships.hasOwnProperty(relationship_index)) continue;
				var actual_relationship = relationships[relationship_index];
				/**
				 * If the index is not existent or not an object, no usable data is there
				 */
				if (!actual_relationship || !(typeof actual_relationship === "object")) {
					Sm.CONFIG.DEBUG && console.log('mvcombo,pkn,-1', actual_relationship);
					continue;
				}
				/**
				 * The '_meta' index is essential for identifying the mapped object's type (imperfect, I know, but hey)
				 */
				if (!actual_relationship._meta) {
					Sm.CONFIG.DEBUG && console.log('mvcombo,pkn,0-', actual_relationship);
					continue;
				}
				if (!actual_relationship.items) continue;
				var relationship_items = actual_relationship.items;
				for (var other_model_id in relationship_items) {
					if (!relationship_items.hasOwnProperty(other_model_id) || !$.isNumeric(other_model_id)) continue;
					var mapped_props = relationship_items[other_model_id];
					if (!mapped_props || !(typeof mapped_props === "object")) continue;
					var map = mapped_props._map || false;
					if (!map) {
						Sm.CONFIG.DEBUG && console.log('mvcombo,pkn,nomap,', mapped_props);
						continue;
					}
					/** @type {*|{_model_type:string}} */
					var other_model = mapped_props.model;

					/**
					 * @type {string} The Mapped Model type
					 */
					var other_model_type;

					if (!!other_model && !!other_model._model_type) other_model_type = other_model._model_type;

					/**
					 * If there is a '_linked_entities' index in '_meta', use that.
					 * Right now, this only takes into account relationships between two things. Make this stop?
					 */
					if (!other_model_type && !!actual_relationship._meta._linked_entities) {
						var linked_entities = actual_relationship._meta._linked_entities;

						//If there is only one entity type
						if (linked_entities.length === 1) {
							other_model_type = linked_entities[0];
						} else {
							//When there are other entities, check to see the first index that doesn't match the
							other_model_type = linked_entities[0];
							for (var i = 0; i < linked_entities.length; i++) {
								var possible_other_model_type = linked_entities[i];
								if (possible_other_model_type != self_type) {
									other_model_type = possible_other_model_type;
								}
							}
						}
					}
					// If we don't know the other model type, skip it
					if (!other_model_type) {
						Sm.CONFIG.DEBUG && console.log('mvcombo,pkn,omt', other_model);
						continue;
					}
					var self           = this;
					/**
					 * Initialize the MvCombo of the other model and add the relationship to this MvCombo
					 */
					var when_loaded_fn = (function (other_model_type, other_model, id, self, map, relationship_index) {
						return function () {
							var smOtherType = Sm.Entities[other_model_type];
							if (!smOtherType) {
								Sm.CONFIG.DEBUG && console.log('mvcombo,pkn,wlfn,omt', Sm.Entities, other_model_type);
								return;
							}
							/** @type Sm.Core.MvWrapper*/
							var otherWrapper = smOtherType.Wrapper;
							if (!otherWrapper) {
								Sm.CONFIG.DEBUG && console.log('mvcombo,pkn,wlfn,owt', Sm.Entities, other_model_type);
								return;
							}
							/** @type {*|Sm.Core.MvCombo} */
							var other_MV = otherWrapper.init_MvCombo({
								model: other_model,
								id:    id
							});
							/**
							 * Add the relationship
							 */
							if (other_MV && other_MV.Identity) {
								Sm.loaded.when_loaded(['entities_' + self.type, 'entities_' + other_MV.type], function () {
									self.add_relationship(other_MV, {
										map:                map,
										relationship_index: relationship_index,
										position:           map.position || 1,
										silent:             true
									}).catch(function (e) {
										Sm.CONFIG.DEBUG && console.log(e)
									});
								}, 'add_rel_to_' + self.type);
							}
						}
					})(other_model_type, other_model, other_model_id, self, map, relationship_index);

					//When the other model type is loaded, add the relationship
					if (Sm.loaded.is_loaded('entities_' + other_model_type)) {
						when_loaded_fn();
					} else {
						Sm.loaded.when_loaded('entities_' + other_model_type, when_loaded_fn, 'add_rel_to_other_');
					}
				}
				//delete relationships[relationship_index];
			}
			return relationships;
		},
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
		/**
		 * Add a View to the MvCombo
		 * @param View
		 * @param {HTMLElement|Node|boolean=}        context_element           The parent element of the View's element meant to keep track of relationship
		 * @param {{}=}                      settings                  Settings
		 * @param {string=}                  settings.display_type     The display type of the element. I feel like this is a code smell
		 * @return {*}
		 */
		addView:                      function (View, context_element, settings) {
			settings        = settings || {};
			var self_entity = Sm.Entities[this.type];

			var ViewType_ = self_entity.View;
			if (!ViewType_) return false;

			var _MvCombo = this;
			var Model    = this.Model;

			if (View instanceof ViewType_) {
				//set the View's model
				View.model = Model;
				//set the MvCombo of the View
				if (!View.MvCombo) View.setMvCombo(_MvCombo);

				//If we're adding the View, remove the first defaultViewList
				if (!!this.defaultViewList && !!this.defaultViewList.length) this.removeView(this.defaultViewList[0]);

				if (!context_element && document.body.contains(View.el.parentNode))
					context_element = View.el.parentNode;
				View.referenceElement = context_element || View.referenceElement || false;
			} else {
				/** @type {{el:HTMLElement|boolean, model:Sm.Core.SmModel}} Properties to initialize the View */
				var view_props = {
					model:        Model,
					el:           false,
					display_type: settings.display_type || 'full'
				};
				// If it's an element, initialize the View based on that
				if (Sm.Core.util.isElement(View)) {
					view_props.el = View;
					View          = new ViewType_(view_props);
					View.setMvCombo(_MvCombo);
					if (!View.referenceElement) {
						if (!context_element && document.body.contains(View.el.parentNode))
							context_element = View.el.parentNode;
						View.referenceElement = context_element || false;
					}

					if (!!this.defaultViewList && !!this.defaultViewList.length) {
						this.removeView(this.defaultViewList[0])
					}
				} else {
					//If there are any default Views, return the first one
					!this.defaultViewList && (this.defaultViewList = []);
					if (this.defaultViewList.length) return this.defaultViewList[0];
					View = new ViewType_(view_props);
					if (!!context_element && this.ViewList.length) {
						var check    = false;
						var ViewList = this.ViewList;
						for (var i = 0; i < ViewList.length; i++) {
							var view_id = ViewList[i];
							var newView = this.Views[view_id];
							if (newView.referenceElement == context_element) {
								check = true;
								return newView;
							}
						}
					}
					this.defaultViewList.push(View.cid);
					View.setMvCombo && View.setMvCombo(_MvCombo);
					if (!context_element && document.body.contains(View.el.parentNode))
						context_element = View.el.parentNode;
					View.referenceElement = context_element;
				}
			}
			if (!(View.cid in this.ViewList)) {
				this.Views[View.cid] = View;
				this.ViewList.push(View.cid);
			}
			return View;
		},
		/**
		 * No longer relate this MvCombo to the View with cid ____
		 * @alias Sm.Core.MvCombo#removeView
		 * @param cid
		 */
		removeView:                   function (cid) {
			if (cid in this.Views) delete  this.Views[cid];

			var ViewToRemove;
			if (this.defaultViewList && (ViewToRemove = this.defaultViewList.indexOf(cid)) > -1) {
				this.defaultViewList.splice(ViewToRemove, 1);
			}

			if (this.ViewList && (ViewToRemove = this.ViewList.indexOf(cid)) > -1) {
				this.ViewList.splice(ViewToRemove, 1);
			}
		},
		/**
		 * Retrieve a view based on the cid, or a reference element
		 * @alias Sm.Core.MvCombo#getView
		 * @param {{}=}             settings
		 * @param {string=}         settings.cid                  The cid, unique id created by Backbone.js, of the View
		 * @param {HTMLElement=}    settings.reference_element    An element that is related to this View in the desired way
		 * @param {boolean=false}   settings.strict               Should we create the View if we couldn't find it?
		 * @param {string=}         settings.display_type         How should the view be displayed
		 * @return {*}
		 */
		getView:                      function (settings) {
			settings              = settings || {};
			var cid               = settings.cid || false;
			var reference_element = settings.reference_element || false;
			var strict            = !!settings.strict;
			var display_type      = settings.display_type;
			var View;
			//If there is a CID and we are being strict, return false if there is no match and true otherwise
			if (cid) {
				if (this.Views[cid]) return this.Views[cid];
				if (strict) return false;
			}
			var returnView = false;
			if (reference_element && !!this.ViewList.length) {
				var potential_view = false;
				/** @this {Sm.Core.SmView} */
				this.forEachView(function () {
					if (!View && this.referenceElement == reference_element) View = this;
					if (!this.referenceElement) potential_view = this;
				});
				if (View) {
					returnView = View;
				} else if (!View && !strict) {
					returnView = potential_view ? potential_view : this.addView(null, reference_element, {display_type: display_type});
				}
			}
			returnView = !returnView ? this.addView(null, reference_element, {
				display_type: display_type
			}) : returnView;
			if (typeof  returnView == "string") {
				return this.getView({
					cid:    returnView,
					strict: true
				});
			}
			return returnView;
		},
		/**
		 * Apply a callback to each View associated with this MvCombo with the View being used as the 'this' parameter
		 * @alias Sm.Core.MvCombo#forEachView
		 * @param {function}    callback        The function to be run
		 * @param {Array=}      callback_args   Arguments to be applied to the function
		 */
		forEachView:                  function (callback, callback_args) {
			if (typeof callback === "function") {
				var view_ids = this.ViewList;
				for (var v = 0; v < view_ids.length; v++) {
					var v_i = view_ids[v];
					!!this.Views[v_i] && callback.apply(this.Views[v_i], callback_args)
				}
			}
		},
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
		focus:                        function (settings, View) {
			this.do_standard_interaction('focus', settings, View);
		},
		blur:                         function (settings, View) {
			this.do_standard_interaction('blur', settings, View);
		},
		activate:                     function (settings, View) {
			this.do_standard_interaction('activate', settings, View);
		},
		select:                       function (settings, View) {
			this.do_standard_interaction('select', settings, View);
		},
		deselect:                     function (settings, View) {
			this.do_standard_interaction('deselect', settings, View);
		},
		deactivate:                   function (settings, View) {
			this.do_standard_interaction('deactivate', settings, View);
		},
		do_standard_interaction:      function (action, settings, View) {
			action                       = action || 'focus';
			var status_name, is_negative = false;
			var action_index             = action;
			var action_category          = action;
			switch (action) {
				case "blur":
					is_negative = true;
				case "focus":
					action_category = "focus";
					action_index    = 'focused_Views';
					status_name     = 'focused';
					break;
				case "deselect":
					is_negative = true;
				case "select":
					action_category = "select";
					action_index    = 'selected_Views';
					status_name     = 'selected';
					break;
				case "deactivate":
					is_negative = true;
				case "activate":
					action_category = "activate";
					action_index    = 'activated_Views';
					status_name     = 'active';
					break;
				default :
					return false;
			}
			if ((arguments.length == 2 || typeof View == "undefined") && typeof settings === "object" && settings.cid) View = settings;
			var self_type               = this.type;
			/**
			 * @type {Sm.Core.MvWrapper|*}
			 */
			var Wrapper                 = this.Wrapper || Sm.Entities[self_type].Wrapper;
			var self                    = this;
			var obj                     = {MvCombo: self};
			this.ViewMaps[action_index] = this.ViewMaps[action_index] || {};
			var view_map_action         = this.ViewMaps[action_index];
			var count                   = 0;
			for (var prop in view_map_action) {
				if (!view_map_action.hasOwnProperty(prop)) continue;
				count++;
			}
			var act_on_view = function () {
				/** @this {Sm.Core.SmView}  */
				if (!this[action]) return;
				var p_q_res = this.queryPermission(action_category);
				if (p_q_res === null) p_q_res = this.queryPermission('view');
				if (!p_q_res && p_q_res !== null) {
					Sm.CONFIG.DEBUG && console.log(action_category, p_q_res);
					return false;
				}
				if (action == 'focus' && !!View && View != this) {
					return self.blur(this);
				}
				if (is_negative) {
					if (view_map_action[this.cid]) {
						count--;
						delete view_map_action[this.cid]
					}
				} else {
					view_map_action[this.cid] = this.Identity;
					count++;
				}
				this[action]();
			};
			if (!!View) act_on_view.call(View);
			else this.forEachView(act_on_view);
			if (this.queryStatus(status_name) !== !!count) {
				this.setStatus(status_name, !!count);
				if (Wrapper[action + '_MV']) {
					if (action == 'focus') {
						//Make sure there are no other focused Views
						var focused_MVs = Wrapper.MvMaps.focused_MVs;
						for (var MV_r_id in focused_MVs) {
							if (!focused_MVs.hasOwnProperty(MV_r_id)) continue;
							if (MV_r_id != this.Identity.r_id) {
								var Mv = focused_MVs[MV_r_id].getResource();
								if (Mv) Mv.blur();
							}
						}
					}
					Wrapper[action + '_MV'](obj);
				}
			}
		},
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
		/**
		 * Because MvCombos can only be related to something in one way (flawed? Maybe...) Return the Relationship
		 * @param MvIdentity {string|{}|Sm.Core.MvCombo|*|Sm.Core.Identity} The Identity, MvCombo, or r_id of the Identity of the MvCombo that we are looking for
		 * @return {Sm.Core.Relationship|boolean}
		 */
		getRelationship:              function (MvIdentity) {
			if (!MvIdentity) return false;

			if (MvIdentity.Identity) MvIdentity = MvIdentity.Identity;
			var r_id = typeof MvIdentity === "string" ? MvIdentity : MvIdentity.r_id;
			return this.relationship_map[r_id] || false;
		},
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
		/**
		 * Get the details about how two entities should be related to each other
		 * @param {object}              settings
		 * @param {string}              settings.map_index
		 * @param {Sm.Core.MvCombo}     settings.MvCombo
		 * @param {{}}                  settings.map
		 * @param {boolean}             settings.is_reciprocal
		 * @return {{relationship: Sm.Core.Relationship|boolean, self_map_index: string|boolean, secondary_map_index: string|boolean}}
		 * @private
		 */
		_get_relationship_details:    function (settings) {
			settings          = settings || {};
			var Mv            = settings.MvCombo;
			var type          = Mv.type;
			var self_type     = this.type;
			var is_reciprocal = !!settings.is_reciprocal;
			var self_map_index, secondary_map_index, relationship;
			var map           = settings.map || {};

			var lc           = type.toLowerCase();
			/**
			 * The result of the hook. This should have details about whether or not it matters that the relationship is reciprocal (i.e. primary_ and secondary_ stuff)
			 * The index of this in the relationship
			 * The index of the other one in the relationship
			 * An object to be used as the map. This is not touched right now, but might be useful if mutating the actual map object
			 * @type {*|{map, reciprocity_matters, self_index, other_index}|{map: *, reciprocity_matters: boolean, self_index: string, other_index: string}}
			 * @private
			 */
			var _hook_result = this._relationship_detail_hook(type, settings, map, lc);

			var reciprocity_matters = !!_hook_result.reciprocity_matters;
			var self_index          = _hook_result.self_index;
			var other_index         = _hook_result.other_index;

			if (is_reciprocal && reciprocity_matters) {
				self_map_index      = other_index;
				secondary_map_index = self_index;
			} else {
				self_map_index      = self_index;
				secondary_map_index = other_index;
			}

			//If both indices exist (this and the other one) instantiate a relationship
			if (self_map_index && secondary_map_index) {
				relationship = new Sm.Core.Relationship({
					linked_entities: [self_type, type],
					rel_indexes:     [self_map_index, secondary_map_index]
				});
				(map[self_map_index] = this.Identity.id);
				(map[secondary_map_index] = Mv.Identity.id);
			}

			return {
				relationship:        relationship || false,
				self_map_index:      self_map_index || false,
				secondary_map_index: secondary_map_index || false
			}
		},
		/**
		 * A customizable hook that returns some details based on the type of the other MvCombo, the settings, map and the lowercase type of the other MvCombo
		 * By default, the indices are based on the type. We just convert the entity type to lowercase, add _id, and call it a day.
		 * If there is reciprocity, we add primary_ and secondary_ prefixes. Sometimes we might need to use the map or mutate it, so that's why that's there
		 * @param {string}  type                The type of the other MvCombo
		 * @param {object}  settings            settings
		 * @param {object}  map                 The map object of the relationship
		 * @param {string}  lowercase_type      Lowercase version of the other MvCombo's type
		 * @return {{map: *, reciprocity_matters: boolean, self_index: string, other_index: string}}
		 * @private
		 */
		_relationship_detail_hook:    function (type, settings, map, lowercase_type) {
			var reciprocity_matters = false;
			var other_index         = lowercase_type + '_id';
			var self_index          = this.type.toLowerCase() + '_id';
			if (other_index == self_index) {
				reciprocity_matters = true;
				if (!!settings.is_reciprocal) {
					self_index  = 'secondary_' + self_index;
					other_index = 'primary_' + other_index;
				} else {
					self_index  = 'primary_' + self_index;
					other_index = 'secondary_' + other_index;
				}
			}
			return {
				map:                 map,
				reciprocity_matters: reciprocity_matters,
				self_index:          self_index,
				other_index:         other_index
			}
		},
		/**
		 * Create a relationship between two entities, then create a
		 * @see Sm.Core.Relationship
		 * @see Sm.Core.MvCombo.relationships
		 * @see Sm.Core.MvCombo.reciprocal_relationships
		 * @see Sm.Core.MvCombo._prompt_relationship_add
		 *
		 * @param {Sm.Core.MvCombo|Sm.Core.Identifier|*}     OtherMvCombo
		 * @param {{}}                  settings
		 * @param {string=}             settings.type                       The type of MvCombo the other entity is
		 * @param {{}}                  settings.map                        The map (if existent) between the two entities
		 * @param {boolean=}            settings.is_reciprocal              Is the relationship only being reciprocated?
		 * @param {boolean=}            settings.update_indices             Should we update the indices of the RelationshipIndex?
		 * @param {boolean=}            settings.silent                     Is the relationship on the server?
		 * @param {boolean=}            settings.prompt                     Should we prompt for information about the Relationship?
		 * @param {string}              settings.relationship_index         Where to add the relationship
		 * @param {int}                 settings.position                   The position at which to add the relationship
		 * @param {int=0}               settings.context_r_id               If there is a context, this is the r_id of it
		 * @param {Sm.Core.SmView}      settings.OtherView
		 * @param {Sm.Core.Relationship=}ReciprocalRelationship            The other relationship. What are we reciprocating?
		 * @return {Promise}
		 */
		add_relationship:             function (OtherMvCombo, settings, ReciprocalRelationship) {
			this.relationship_map  = this.relationship_map || {};
			settings               = settings || {};
			var silent             = !!settings.silent;
			var map                = settings.map || {};
			var relationship_index = settings.relationship_index;
			var prompt             = settings.prompt || !OtherMvCombo || !relationship_index;
			var update_indices     = typeof settings.update_indices !== "undefined" ? !!settings.update_indices : true;
			if (prompt) {return this._prompt_relationship_add(OtherMvCombo, settings);}

			var is_reciprocal                 = !!settings.is_reciprocal;
			var reciprocal_relationship_index = false;
			var self_type                     = this.type;
			// This needs type-hinting
			var selfSm = Sm.Entities[self_type];
			if (!!OtherMvCombo && OtherMvCombo.r_id && OtherMvCombo.getResource) {
				OtherMvCombo = OtherMvCombo.getResource();
			}
			if (!selfSm) throw  "No Sm for " + this.type;

			/** @type {Sm.Core.Meta} */
			var selfSmMeta;
			selfSmMeta = selfSm.Meta;
			if (!selfSmMeta) throw  "No Meta for " + this.type + " trying to add relationship";

			//If there is a nickname for a particular relationship, get that nickname (e.g. the nickname for "sections" is "definitions" in the dictionary
			if (selfSmMeta.relationship_aliases[relationship_index]) {
				relationship_index = selfSmMeta.relationship_aliases[relationship_index];
			}

			//Try to figure out the possible relationships this MvCombo could be in if we don't know the index

			var potential_relationships = selfSmMeta.get_possible_relationship_indices({is_reciprocal: is_reciprocal, OtherMvCombo: OtherMvCombo});
			//if (this.type == 'Section' && OtherMvCombo.type == 'Dictionary') Sm.CONFIG.DEBUG && console.log(this.type, ' - ', potential_relationships, ' - ', is_reciprocal);
			if (potential_relationships.length == 1) {
				//If there is only one possible relationship type,
				if (!relationship_index) relationship_index = potential_relationships[0];
			} else if (potential_relationships.length && !potential_relationships[0]) {
				//If the first index of the relationship is "null", then we are dealing with the relationship indices that are reciprocal (this Mv can reciprocate relationships in this index)
				//E.g. 'dictionaries' in Dictionary. Dictionary doesn't have relationships in this index, but it can be in this index for other Entities
				relationship_index = relationship_index || potential_relationships[1];

				//These relationships are the relationships opposite of the other one
				//todo Is this right?
				var anti_reciprocal_potential_relationships = selfSmMeta.get_possible_relationship_indices({is_reciprocal: !is_reciprocal, OtherMvCombo: OtherMvCombo});
				if (is_reciprocal && potential_relationships[0] === null && !!anti_reciprocal_potential_relationships.length) {
					if (anti_reciprocal_potential_relationships.length == 1)
						reciprocal_relationship_index = anti_reciprocal_potential_relationships[0];

				}
			}
			if (!selfSm) throw  "No Sm for " + this.type;
			if (!selfSmMeta) throw  "No Meta for " + this.type + " trying to add relationship";
			if (!map) throw  "No Map for " + this.type;
			if (!relationship_index) throw  "No RelationshipIndex for " + this.type;
			if (!OtherMvCombo) throw  "No OtherMvCombo for " + this.type;

			//This is a cheat. Sometimes instead of saying "micros" or something, we could just say "reciprocal_micros". This means that the relationship will be reciprocal by definition
			if (relationship_index.indexOf('reciprocal_') === 0) {
				is_reciprocal               = true;
				settings.relationship_index = relationship_index = relationship_index.split('_')[1];
			}
			/**
			 * The first index that we're adding at. This is going to add at either the reciprocal or non-reciprocal index
			 * @type {{}<string, Sm.Core.RelationshipIndex>} */
			var self_relationships      = !is_reciprocal ? this.relationships : this.reciprocal_relationships;
			/**
			 * The second index we're adding at. This is going to be the index opposite the first one
			 * @type {Sm.Core.MvCombo.relationships|Sm.Core.MvCombo.reciprocal_relationships} */
			var secondary_relationships = !!is_reciprocal ? this.relationships : this.reciprocal_relationships;
			/**
			 * This is the first relationship index, the one that aligns with the reciprocity
			 * @type {Sm.Core.RelationshipIndex}
			 */
			var RelationshipIndex_      = self_relationships[relationship_index];
			if (!OtherMvCombo.Identity) return Promise.reject('There is no Identity to accompany the MvCombo');

			if (!RelationshipIndex_) return Promise.reject('No relationship index to match ' + relationship_index + ' in ' + this.type);

			var self              = this;
			/**
			 * This is the object to use when resolving the promise
			 * @type {{result: boolean, SelfMvCombo: Sm.Core.MvCombo, OtherMvCombo: (Sm.Core.MvCombo|Sm.Core.Identifier|*), RelationshipIndex: Sm.Core.RelationshipIndex, OtherView: Sm.Core.SmView}}
			 */
			var resolution_object = {
				result:            false,
				SelfMvCombo:       self,
				OtherMvCombo:      OtherMvCombo,
				RelationshipIndex: RelationshipIndex_,
				OtherView:         settings.OtherView,
				map_indices:       []
			};


			/**
			 * This is the secondary relationship index.
			 * This is the one that does not align with the reciprocity.
			 * Sometimes we need to have relationships in both reciprocal and main indices
			 *      (e.g. 'dictionaries' is reciprocating a 'definition' relationship, but there is also a 'definitions' index in Dictionary)
			 */
			var SecondaryRelationshipIndex;
			if (!!reciprocal_relationship_index) SecondaryRelationshipIndex = secondary_relationships[reciprocal_relationship_index];
			//If we are reciprocating the relationship, add the relationship in the reciprocal
			if (!!ReciprocalRelationship) {
				//Add at the reciprocal index
				resolution_object.result = !!RelationshipIndex_.add_item(ReciprocalRelationship, OtherMvCombo.Identity.r_id, settings.context_r_id || 0, update_indices, silent);
				//Add at the secondary relationship index if the relationship can also be non-reciprocal
				if (SecondaryRelationshipIndex) SecondaryRelationshipIndex.add_item(ReciprocalRelationship, OtherMvCombo.Identity.r_id, settings.context_r_id || 0, update_indices, silent);

				//Add the relationship to the relationship map
				this.relationship_map[OtherMvCombo.Identity.r_id] = ReciprocalRelationship;
				resolution_object.Relationship                    = ReciprocalRelationship;
				return Promise.resolve(resolution_object);
			}

			/**
			 * Based on the MvCombo, map, and reciprocity, get
			 * * the constructor for the relationship object that will be used to link the two MvCombos
			 * * The index at which the first relationship will be added
			 */
			var relationshipDetails = this._get_relationship_details({
				map:                map,
				MvCombo:            OtherMvCombo,
				is_reciprocal:      is_reciprocal,
				relationship_index: relationship_index
			});
			/** @type {Sm.Core.Relationship} */
			var Relationship_       = relationshipDetails.relationship || new Sm.Core.Relationship;
			var self_map_index      = relationshipDetails.self_map_index;
			var secondary_map_index = relationshipDetails.secondary_map_index;

			if (OtherMvCombo.Identity === this.Identity) {
				var ent_id = this.Identity.ent_id;
				Sm.CONFIG.DEBUG && console.log(ent_id, arguments);
				return Promise.reject('Cannot add the same MV - ::' + ent_id);
			}
			map.position                   = settings.position || map.position;

			//Initialize the relationship's details
			Relationship_
				.setMap(map)
				.link_Mv(this, self_map_index)
				.link_Mv(OtherMvCombo, secondary_map_index);
			resolution_object.Relationship = Relationship_;
			resolution_object.map_indices  = [
				self_map_index,
				secondary_map_index
			];
			var result_of_rel_add          = resolution_object.result = !!RelationshipIndex_.add_item(Relationship_, OtherMvCombo.Identity.r_id, settings.context_r_id || 0, update_indices, silent);

			//todo does this do anything? I think so
			if (SecondaryRelationshipIndex) SecondaryRelationshipIndex.add_item(Relationship_, OtherMvCombo.Identity.r_id, settings.context_r_id || 0, update_indices, silent);

			//If the relationship is not reciprocal, add it to the other MvCombo as well
			settings.is_reciprocal = !is_reciprocal;
			//Add the relationship to the relationship map
			this.relationship_map[OtherMvCombo.Identity.r_id] = Relationship_;
			return OtherMvCombo.add_relationship(this, settings, Relationship_).then(function (e) {
				self.emit('add_relationship', resolution_object);
				if (result_of_rel_add && !!e.result) return resolution_object;
				Sm.CONFIG.DEBUG && console.log(e, result_of_rel_add);
				throw "Could not add relationship index";
			});
		},
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
		/**
		 * Build the MvCombo in a "new relationship" scenario. Called from Sm.Core.MvCombo._prompt_relationship_add
		 * Meant to be overridden
		 * @see Sm.Core.MvCombo._prompt_relationship_add
		 * @param otherWrapper
		 * @param settings
		 * @return {Promise}
		 * @private
		 */
		_build_other_MV:              function (otherWrapper, settings) {
			return otherWrapper.build_MV(settings);
		},
		/**
		 * Prompt the addition of the relationship.
		 * This is called by the MvCombo add_relationship function, and either throws an error or fills in all of the blanks before continuing to add the relationship
		 * @see Sm.Core.MvCombo.add_relationship
		 * @param OtherMvCombo
		 * @param settings
		 * @return {*}
		 * @private
		 */
		_prompt_relationship_add:     function (OtherMvCombo, settings) {
			settings          = settings || {};
			settings.map      = settings.map || {};
			settings.position = settings.map.position = (settings.position || settings.map.position);
			var self        = this;
			settings.prompt = false;
			self.blur();
			var Modal;
			var P           = new Promise(function (resolve, reject) {
				var MvCombo_ = self;
				//See if this class has an AddRelationship Modal Dialog. If not, use the default
				var type =
					    Sm.Entities[self.type].Abstraction &&
					    Sm.Entities[self.type].Abstraction.Modal &&
					    Sm.Entities[self.type].Abstraction.Modal.AddRelationship
						    ? Sm.Entities[self.type].Abstraction.Modal.AddRelationship
						    : Sm.Entities.Abstraction.Modal.AddRelationship;
				//Create the Modal Dialog
				Modal = new type({
					MvCombo:        [MvCombo_],
					self_type:      MvCombo_.type,
					display_type:   'full',
					promise_object: {
						resolve: resolve,
						reject:  reject
					}
				});

				//Try to open the Dialog
				try {
					Modal.open();
				} catch (e) {
					Sm.CONFIG.DEBUG && console.log('core_MvCombo,pra,-1', e);
				}
			});
			var self_Sm     = Sm.Entities[this.type];
			if (!self_Sm) return Promise.reject('No SM');
			var Meta_ = self_Sm.Meta;

			var opposite = false;
			Sm.CONFIG.DEBUG && console.log(arguments);

			return P.catch(function (e) {
				//DEBUG
				Sm.CONFIG.DEBUG && console.log('core_MvCombo,pra,0', e);
				throw e;
			}).then(function (r) {
				settings.map                      = settings.map || {};
				settings.map.relationship_subtype = Meta_.get_relationship_type({type: 'id', sub: true}, r.relationship_subindex);

				var relationship_index = r.relationship_index || false;

				if (relationship_index.indexOf('reciprocal_') === 0 || relationship_index.indexOf('!') === 0) {
					relationship_index = relationship_index.replace('reciprocal_', '').replace('!', '');
					opposite           = true;
				}
				settings.relationship_index = Meta_.get_relationship_type({type: 'index'}, relationship_index);
				settings.OtherMvComboType   = Meta_.get_relationship_type({type: 'model_type'}, relationship_index);
				if (r.relationship_subindex) delete r.relationship_subindex;
				if (r.relationship_index) delete r.relationship_index;
				settings.position = parseInt(r.position || 0);
				settings.map      = Sm.Core.util.merge_objects(settings.map, r);
				return settings;
			}).catch(function (e) {
				//DEBUG
				Sm.CONFIG.DEBUG && console.log('core_MvCombo,pra,1', e);
				throw e;
			}).then(function (add_relationship_settings) {
				Sm.CONFIG.DEBUG && console.log(add_relationship_settings, opposite);
				var OtherMvComboType = add_relationship_settings.OtherMvComboType || false;
				var P2;
				if (OtherMvCombo) P2 = Promise.resolve(OtherMvCombo);
				else {
					var OtherSm = Sm.Entities[OtherMvComboType];
					if (OtherSm && OtherSm.Wrapper) P2 = self._build_other_MV(OtherSm.Wrapper, settings);
					else P2 = Promise.reject("Could not resolve the MvCombo type " + OtherMvComboType);
				}
				Modal && Modal.close();
				return P2.then(function (OtherMvCombo) {
					Sm.CONFIG.DEBUG && console.log('core_MvCombo,pra,1.5', OtherMvCombo);
					//If this relationship is reciprocal, add it to the Other MvCombo
					if (add_relationship_settings && opposite) {
						Sm.CONFIG.DEBUG && console.log(add_relationship_settings, OtherMvCombo);
						return OtherMvCombo.add_relationship(self, add_relationship_settings);
					} else {
						return self.add_relationship(OtherMvCombo, add_relationship_settings);
					}
				});
			}).catch(function (error) {
				//DEBUG
				Sm.CONFIG.DEBUG && console.log('core_MvCombo,pra,2', error);
				throw error;
			});
		},
		/**
		 * @alias Sm.Core.MvCombo#_prompt_destroy
		 * @param settings{{}=}
		 * @param settings.View
		 * @return {Promise}
		 * @private
		 */
		_prompt_destroy:              function (settings) {
			var self = this;
			var Modal;
			var P    = new Promise(function (resolve, reject) {
				var MvCombo_ = self;
				var type     =
					    Sm.Entities[self.type].Abstraction &&
					    Sm.Entities[self.type].Abstraction.Modal &&
					    Sm.Entities[self.type].Abstraction.Modal.Destroy
						    ? Sm.Entities[self.type].Abstraction.Modal.Destroy
						    : Sm.Entities.Abstraction.Modal.Destroy;

				Modal = new type({
					MvCombo:        [MvCombo_],
					self_type:      MvCombo_.type,
					display_type:   settings.display_type,
					promise_object: {
						resolve: resolve,
						reject:  reject
					}
				});
				Modal.open();
			});
			return P.catch(function (e) {
				Sm.CONFIG.DEBUG && console.log('core_MvCombo,destroy', e);
				throw e;
			}).then(function (b) {
				Sm.CONFIG.DEBUG && console.log(b);
				Modal.close();
				return self._continue_destroy(settings);
			}).catch(function (boon) {
				Modal.close();
				Sm.CONFIG.DEBUG && console.log(boon);
				Sm.CONFIG.DEBUG && console.log("Rejected the promise");
				throw boon;
			});
		},
		/**
		 * @alias Sm.Core.MvCombo#_prompt_alias
		 * @param settings {{}=}
		 * @param settings.View
		 * @return {Promise}
		 * @private
		 */
		_prompt_save:                 function (settings) {
			if (confirm('Are you sure you want to save ' + this.type + ' ' + this.Identity.ent_id)) {
				return this._continue_save(settings)
			}
			return Promise.reject('Canceled save');
		},
		/**
		 * @alias Sm.Core.MvCombo#_continue_save
		 * @param settings
		 * @param settings.silent
		 * @returns {*}
		 * @private
		 */
		_continue_save:               function (settings) {
			var Model = this.Model;
			if (!Model) return Promise.reject(Sm.Errors.NonexistentModelError);
			var s    = Model.save(null, {patch: true, wait: true, silent: !!settings.silent}).then(function (res) {
				Sm.CONFIG.DEBUG && console.log(res);
				return res;
			});
			var self = this;
			return (s ? s : Promise.reject('Could not save the model'));
		},
		/**
		 * @alias Sm.Core.MvCombo#_continue_destroy
		 * @param settings{{}=}
		 * @return {Promise}
		 * @private
		 */
		_continue_destroy:            function (settings) {
			var Model = this.Model;
			if (!Model) return Promise.reject(Sm.Errors.NonexistentModelError);
			var Wrapper = Sm.Entities[this.type].Wrapper;
			var d       = Model.destroy();
			var self    = this;
			return (d ? d : Promise.reject()).then(function (response) {
				if (response && response.success) return response;
				throw response.error;
			}).then(Wrapper.destroy_MV.bind(Wrapper, this)).then(function () {self.setStatus('destroyed', true);});
		},
		/**
		 *
		 * @param {{}=}settings
		 * @param settings.prompt
		 * @param settings.success
		 * @param settings.fail
		 * @param settings.
		 * @return {Promise}
		 */
		save:                         function (settings) {
			try {
				settings     = settings || {};
				var prompt   = !!settings.prompt;
				var Wrapper_ = Sm.Entities[this.type].Wrapper;
				if (!Wrapper_) return Promise.reject('No Wrapper to match ' + this.type);
				if (prompt) return this._prompt_save(settings);
				return this._continue_save(settings);
			} catch (e) {
				Sm.CONFIG.DEBUG && console.log(e);
				return Promise.reject(e);
			}
		},
		/**
		 *
		 * @param settings
		 * @param settings.prompt
		 * @param settings.success
		 * @param settings.fail
		 * @param View
		 * @return {*}
		 */
		destroy:                      function (settings, View) {
			var prompt   = !!settings.prompt;
			var Wrapper_ = Sm.Entities[this.type].Wrapper;
			var self     = this;
			if (!Sm.Entities[this.type].Wrapper) return Promise.reject('No Wrapper to match ' + this.type);
			return (prompt ? this._prompt_destroy({View: View}) : this._continue_destroy(settings)).then(function (results) {
				self.forEachView(function () {this.destroy();});
				return results;
			});
		},
		fetch:                        function () {
			var Identity = this.Identity;
			var type     = this.type;
			var Wrapper  = Sm.Entities[this.type].Wrapper;
			return Promise.resolve($.ajax({
				method: "GET",
				url:    Sm.urls.api.generate({
					type:    type,
					MvCombo: this,
					id:      Identity.id
				})
			})).then(function (result) {
				if (result && result.success) {
					var MvCombo = Wrapper.init_MvCombo({
						model: result.data
					});
					return Promise.resolve(MvCombo);
				}
				return Promise.reject("Could not save model");
			}).catch(function (e) {
				Sm.CONFIG.DEBUG && console.log(e);
			});
		},
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
		/**
		 * Return a relationship index or false
		 * @param {string}                              type
		 * @param {boolean=false}                       is_reciprocal
		 * @return {Sm.Core.RelationshipIndex|boolean}
		 */
		getRelationshipIndex:         function (type, is_reciprocal) {
			is_reciprocal = !!is_reciprocal;
			if (type.indexOf('reciprocal') > -1) {
				is_reciprocal = true;
				type          = type.replace('reciprocal_', '');
				Sm.CONFIG.DEBUG && console.log(type);
			}
			var relationships = is_reciprocal ? this.reciprocal_relationships : this.relationships;
			if (relationships[type]) return relationships[type];
			return false;
		},
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
		toJSON:                       function () {
			var Model = this.Model;
			return Model.attributes;
		}
	});
	/**
	 * Based on a function that returns the MvCombos that need to be accounted for, generate an array of all of the MvCombos that are going to replace another MvCombo,
	 * and the MvCombos that they will be replacing. At the end, this replacement is registered (might be moved later).
	 * In this, there may be a function that is called on each MvCombo that returns a list of what it should be replaced by
	 * @alias Sm.Core.MvCombo.replace_MV
	 * @param parameters
	 * @param {Sm.Core.MvCombo}                 parameters.MvCombo
	 * @param {boolean}                         parameters.replace_effective
	 * @param {boolean=}                        parameters.is_reciprocal                Whether or not we are doing this reciprocally. If we are, we should adjust the Array that we are adding it to, because it should be different than the MvCombo that requested this information
	 * @param {Sm.Core.Relationship=}           parameters.relationship                 The relationship that corresponds to why we are replacing this MvCombo
	 * @param {int=0}                           parameters.iterations                   The iteration that we are on. Because this function is recursive, we must keep track of the iterations to prevent any excessive looping. Capped at 10 iterations ATM
	 * @param {Sm.Core.MvCombo~list_items_fn}                        parameters.list_items_fn                A function that returns an object {
	 * @param {Array<Sm.Core.MvCombo>=}         parameters.replaced_MVs
	 * @param {Array<Sm.Core.MvCombo>=}         parameters.replacement_MVs
	 * @param {Array<Sm.Core.Relationship>=}    parameters.replaced_relationships
	 * @param {Array<Sm.Core.Relationship>=}    parameters.replacement_relationships
	 * @param {Array<Sm.Core.MvCombo.r_id>}     parameters.items
	 * @param {string}                          parameters.replacement_index
	 * @param parameters.is_not_first
	 * @return {{
            items:                      Array<Sm.Core.MvCombo>,
            replacement_MVs:            Array<Sm.Core.MvCombo>,
            replaced_MVs:               Array<Sm.Core.MvCombo>,
            replacement_relationships:  Array<Sm.Core.Relationship>,
            replaced_relationships:     Array<Sm.Core.Relationship>
        }}
	 */
	Sm.Core.MvCombo.replace_MV = function (parameters) {
		var relationship_array_to_add;
		var array_to_add, array_to_search;
		var MvCombo           = parameters.MvCombo;
		var replace_effective = parameters.replace_effective;
		//If the action is reciprocal, this is what distinguishes it as such
		var is_reciprocal = !!parameters.is_reciprocal;
		//This is the relationship that caused this MvCombo to be brought up in this context
		var relationship              = parameters.relationship;
		/**
		 * A function that returns an object of lists (relationships and items) based on what an MvCombo should be replaced by.
		 * @callback Sm.Core.MvCombo~list_items_fn
		 * @param MvCombo
		 * @param {boolean=false}   is_reciprocal
		 * @param {{items:  Array<Sm.Core.MvCombo>,replacement_MVs:  Array<Sm.Core.MvCombo>,replaced_MVs: Array<Sm.Core.MvCombo>,replacement_relationships:  Array<Sm.Core.Relationship>,replaced_relationships: Array<Sm.Core.Relationship>}}
		 * @return {{relationships: [], items: []}}
		 */
		var list_items_fn             = parameters.list_items_fn || function () {};
		parameters.replaced_MVs       = parameters.replaced_MVs || [];
		parameters.replacement_MVs    = parameters.replacement_MVs || [];
		parameters.items              = parameters.items || {};
		var is_not_first              = parameters.is_not_first || false;
		var replaced_relationships    = parameters.replaced_relationships || [];
		var replacement_relationships = parameters.replacement_relationships || [];
		/**
		 * There is an error in which the arrays are opposite of what they should be if we start out reciprocally.
		 * This function swaps the return value if that is the case. I'm sure there is a way to fix this, but for now, I'm just going to leave it
		 * @param is_final_return
		 * @return {{items, replacement_MVs, replaced_MVs, replacement_relationships: Array, replaced_relationships: Array}}
		 */
		var get_return_value          = function (is_final_return) {
			var obj = {
				items:                     parameters.items,
				replacement_MVs:           is_reciprocal ? parameters.replaced_MVs : parameters.replacement_MVs,
				replaced_MVs:              is_reciprocal ? parameters.replacement_MVs : parameters.replaced_MVs,
				replacement_relationships: is_reciprocal ? replaced_relationships : replacement_relationships,
				replaced_relationships:    is_reciprocal ? replacement_relationships : replaced_relationships
			};
			if (!!is_final_return && !is_not_first) {
				if (replace_effective && obj.replaced_MVs.length > 1) {
					var r_id = MvCombo.r_id;
					var pos  = obj.replaced_MVs.indexOf(r_id);
					if (pos > -1) {
						obj.replaced_MVs.splice(pos, 1);
						obj.replaced_relationships.splice(pos, 1);
					}
				}
				Sm.Core.MvWrapper.register_MV_replacement(obj.replaced_MVs, obj.replacement_MVs, parameters.replacement_indices);
			}

			return Promise.resolve(obj);
		};

		if (parameters.iterations > 10) return get_return_value();
		var rel_obj       = list_items_fn(MvCombo, is_reciprocal, get_return_value());
		var relationships = rel_obj.relationships || [];
		var MvComboList   = rel_obj.items || [];


		array_to_search           = is_reciprocal ? parameters.replaced_MVs : parameters.replacement_MVs;
		array_to_add              = !is_reciprocal ? parameters.replaced_MVs : parameters.replacement_MVs;
		relationship_array_to_add = !is_reciprocal ? replaced_relationships : replacement_relationships;


		//Add this r_id to an array of things to keep ore remove (depending on what we're doing)

		if (replace_effective) {
			//Prevent recursion
			parameters.replace_effective = false;
			//Get the effective MvCombos, iterate through them, and add them as being used
			var mv_obj = Sm.Core.MvWrapper.get_effective_MV(MvCombo);
			var Mvs    = mv_obj.MVs;
			//Sm.CONFIG.DEBUG && console.log('--- Effective ', Mvs, ' - this - ', [MvCombo.r_id]);
			//Sm.CONFIG.DEBUG && console.log(" --- List ", MvComboList.map(function (t) {return t.r_id;}));
			for (var i = 0; i < Mvs.length; i++) {
				var OtherMvCombo_r_id               = Mvs[i];
				if (parameters.items[OtherMvCombo_r_id]) continue;
				array_to_add.push(OtherMvCombo_r_id);
				parameters.items[OtherMvCombo_r_id] = Sm.Core.MvWrapper.convert_to_MvCombo(OtherMvCombo_r_id);
				relationship_array_to_add.push(relationship || null);
			}
		} else {
			//Keep track of the items that we have accessed (makes things a little bit easier I think)
			parameters.items[MvCombo.r_id] = MvCombo;
			array_to_add.push(MvCombo.r_id);
			relationship_array_to_add.push(relationship || null);
		}

		//Iterate through all of this MvCombo's items/relationships to see if they need to be added to an array
		var all = [];
		for (var j = 0; j < MvComboList.length; j++) {
			/** @type {Sm.Entities.Section.MvCombo} */
			var SecondMvCombo = MvComboList[j];
			Sm.CONFIG.DEBUG && console.log(SecondMvCombo.r_id);

			if (array_to_search.indexOf(SecondMvCombo.Identity.r_id) < 0) {
				parameters.MvCombo       = SecondMvCombo;
				parameters.is_reciprocal = !is_reciprocal;
				parameters.relationship  = relationships[j];
				parameters.is_not_first  = true;
				all.push(Sm.Core.MvCombo.replace_MV(parameters));
			}
		}
		return Promise.all(all).then(get_return_value.bind(this, true));
	};
	Sm.loaded.when_loaded('Core_MvWrapper', function () {
		Sm.loaded.add('Core_MvCombo');
	}, 'Core_MvCombo');
});