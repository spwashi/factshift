/**
 * Created by Sam Washington on 12/18/15.
 */

require(['require', 'Emitter', 'Sm', 'Sm-Core-Identifier'], function (require, Emitter, Sm) {
	require('Sm');
	require('Sm-Core-Identifier');
	/**
	 * @class MvWrapper
	 * @alias Sm.Core.MvWrapper
	 * @extends Emitter
	 * @property {function} activate_MV         {@link Sm.Core.MvWrapper#activate_MV}
	 * @property {function} deactivate_MV       {@link Sm.Core.MvWrapper#deactivate_MV}
	 * @property {function} focus_MV            {@link Sm.Core.MvWrapper#focus_MV}
	 * @property {function} build_MV            {@link Sm.Core.MvWrapper#build_MV}
	 * @property {function} blur_MV             {@link Sm.Core.MvWrapper#blur_MV}
	 * @property {function} select_MV           {@link Sm.Core.MvWrapper#select_MV}
	 * @property {function} deselect_MV         {@link Sm.Core.MvWrapper#deselect_MV}
	 * @property {function} destroy_MV          {@link Sm.Core.MvWrapper#destroy_MV}
	 */
	Sm.Core.MvWrapper = Emitter.extend(
	{
		type:       null,
		parentType: null,
		init:       function (settings) {
			settings              = settings || {};
			this.MvMaps           = {
				loaded_MVs:    {},
				focused_MVs:   {},
				selected_MVs:  {},
				active_MVs:    {},
				destroyed_MVs: {}
			};
			this.CONFIG           = settings.CONFIG || {};
			this.CONFIG.EDIT      = this.CONFIG.EDIT || Sm.CONFIG.EDIT || false;
			this.CONFIG.DRAG_MODE = this.CONFIG.DRAG_MODE || Sm.CONFIG.DRAG_MODE;
			this.CONFIG.DEBUG     = this.CONFIG.DEBUG || Sm.CONFIG.DEBUG;
			this._callbacks       = {};
			this.events           = [];
			this.loaded_ent_ids   = {};
		},
		get_MVs:    function (type) {
			if (/loaded|active|focused|selected|destroyed/.test(type)) return this.MvMaps[type];
		},

		/**
		 * Pull all of the elements from an Array and initialize the MvCombos one-by-one.
		 * Also instantiate correctly formatted relationships
		 * @param           settings
		 * @param           settings.models     An array of objects
		 * @param {Array}   settings.elements   An array of the elements to hydrate
		 * @return {Sm.Core.MvWrapper}
		 */
		hydrate: function (settings) {
			settings = settings || {};

			var json_models = settings.models;
			if (json_models) {
				if (json_models.constructor === Array) {
					for (var j = 0; j < json_models.length; j++) {
						var _model = json_models[j];
						this.init_MvCombo({model: _model});
					}
				} else {
					this.init_MvCombo({model: json_models});
				}
			}

			var element_arr = settings.elements || false;
			if (!element_arr || !element_arr.length) return this;

			var el, i, data_set, $el;
			/** Begin the iteration through the element array */
			for (i = 0; i < element_arr.length; i++) {
				el  = element_arr[i];
				$el = $(el);
				/** The dataset attached to the element */
				data_set = el.dataset || {
					/**
					 * ID for the entity in its table on the server (if applicable)
					 */
					id:     null,
					/**
					 * Unique ID for the entity on the server
					 */
					ent_id: null,
					/**
					 * A raw model that is pulled directly from the server. Pure JSON object or JSON string.
					 */
					model:  null
				};
				var raw_model = data_set.model;
				if (!raw_model) continue;
				/**
				 * A pure JS object that contains information about the Model on the server. Parsed from a string.
				 * @type {{}}
				 */
				var model_properties = $.parseJSON(raw_model);
				//Once we have this, remove it from the element.
				delete data_set.model;
				//Initialize the MvCombo from the element and model properties
				var _Mv = this.init_MvCombo({
					                            model: model_properties,
					                            view:  el
				                            });

				//todo there should be a way to register view relationships? At the moment, this is unimplemented
				//If the element has the active class, add it as active. Otherwise, just add it as loaded.
				var add_as = $el.hasClass('active') ? 'active' : 'loaded';
				this.add_MV_as(add_as, _Mv.Identity);
				//Just for good measure, delete the model from the dataset
				'model' in el.dataset && delete el.dataset.model;
			}
			return this;
		},

		/**
		 * Initialize an MvCombo based on a few different settings
		 * If one with a matching Identity already exists, merge the settings
		 * @param settings
		 * @param {int=}                settings.id
		 * @param {{}=}                 settings.model          A raw object containing details about the model
		 * @param {SmModel=}            settings.Model          A Sm.Core.SmModel that corresponds to the MvCombo
		 * @param {HTMLElement=}        settings.view           An element that is to be linked to the MvCombo
		 * @param {Sm.Core.SmView=}     settings.View           A View that corresponds to this MvCombo (why would this exist?)
		 * @param {Sm.Core.Identifier=} settings.Identifier     The Identity of the Model being referenced
		 * @param {}                    settings.CONFIG
		 * @param {}                    settings.Wrapper
		 * @return {Sm.Core.MvCombo | boolean|*}
		 */
		init_MvCombo:  function (settings) {
			var _model_Identifier = settings.model || settings.Model || (settings.id ? {id: settings.id} : {});
			if (!_model_Identifier) Sm.CONFIG.DEBUG && console.log('no mi - ', _.clone(settings));
			settings         = settings || {};
			settings.CONFIG  = this.CONFIG;
			settings.Wrapper = this;
			settings.type    = this.type;
			var Id           = settings.Identifier || Sm.Core.Identifier.retrieve(
			{
				id:      _model_Identifier.id || false,
				ent_id:  _model_Identifier.ent_id || false,
				MvCombo: _model_Identifier.MvCombo || false,
				type:    this.type
			});
			var m            = settings.model || settings.Model || settings;

			if (Id) {
				if (Id.r_id in this.MvMaps.loaded_MVs) {
					var OldMv = Id.getResource();
					Id.refresh({
						           id:     m.id || false,
						           ent_id: m.ent_id || false
					           });
					OldMv.refresh_model(m);
					OldMv.setStatus("completed", true);
					var view = settings.View || settings.view;
					OldMv.addView(view);
					return OldMv;
				}
			}
			/**
			 *
			 * @type {Sm.Entities.Abstraction.SmEntity}
			 */
			var SelfEntity = Sm.Entities[this.type];
			if (!SelfEntity) return false;
			settings.type   = this.type;
			/**
			 * @type {Sm.Core.MvCombo|Function}
			 */
			var MvComboType = SelfEntity.MvCombo;

			if (!MvComboType) return false;

			/**
			 * @type {Sm.Core.MvCombo}
			 */
			var NewMvCombo  = new MvComboType(settings);
			NewMvCombo.type = this.type;
			var Model       = NewMvCombo.Model;
			//todo, change this to something a bit less specific
			if (Model && Model.attributes && Model.attributes.section_type) {
				var type = Sm.Entities.Section.Meta.get_type(Model.attributes.section_type, 'index');
				this.mark_as_type(NewMvCombo, type);
			}
			if (!NewMvCombo.Identity) return false;
			if (!NewMvCombo.queryStatus('init')) return false;
			var events = ['blur', 'destroy', 'focus', 'select', 'deselect', 'edit', 'activate', 'deactivate'];
			for (var i = 0; i < events.length; i++) {
				var event_name   = events[i];
				var self_fn_name = event_name + '_MV';
				this[self_fn_name] && NewMvCombo.on(event_name, this[self_fn_name]);
			}
			if (NewMvCombo.type == this.type) this.add_MV_as('loaded', NewMvCombo);

			return NewMvCombo;
		},
		/**
		 *
		 * @param {Sm.Core.MvCombo} MvCombo_
		 * @param {string}          type
		 */
		mark_as_type:  function (MvCombo_, type) {
			if (!!type && !!Sm.Entities[this.type].subtypes[type]) {
				var subtype = Sm.Entities[this.type].subtypes[type];
				for (var attr_name in subtype) {
					if (!subtype.hasOwnProperty(attr_name)) continue;
					//skip the View index because Views are kept in an array in the MvCombo
					if (attr_name === "View") continue;
					var attr_value   = subtype[attr_name];
					var mv_attr_type = typeof MvCombo_[attr_name];
					var av_type      = typeof attr_value;
					if (MvCombo_[attr_name] && (mv_attr_type === "function" || mv_attr_type === "object") && (av_type === "object" || av_type === "function")) {
						for (var a in attr_value) {
							if (!attr_value.hasOwnProperty(a)) continue;
							MvCombo_[attr_name][a] = attr_value[a];
						}
					} else {
						MvCombo_[attr_name] = attr_value;
					}
				}
				//todo is this tight coupling? Quite possibly
				/** @this Sm.Core.SmView*/
				var m_as_subtype = function () {
					MvCombo_.mark_view_as_subtype(this, type);
				};
				MvCombo_.forEachView(m_as_subtype);
			}
		},
		/**
		 * Check to see if an MV is loaded, active, focused, selected, etc.
		 * @param {string}                                              type_to_check   The Index to look in (loaded, active, focused, selected, etc.)
		 * @param {Sm.Core.Identifier|Sm.Core.SmView|Sm.Core.MvCombo}   Id              The ID, MvCombo, or a View with the Identity to search for
		 * @return {boolean}
		 */
		MV_is:         function (type_to_check, Id) {
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
		add_MV_as:     function (type_to_add, Id) {
			//  If there is no Identity, continue
			if (!Id) return this;
			//  It's possible that either a View or an MvCombo were passed in. If that's the case, get the Identity accordingly
			if (Id.Identity) {
				Id = Id.Identity;
			} else if (Id.MvCombo) {
				Id = Id.MvCombo.Identity;
			}

			//  Get the R_ID of the MvCombo's Identity
			var rid = Id.r_id;
			//  If the R_ID doesn't exist, we can't do anything
			if (!rid) return this;

			//  Assure that there is an Entity object that corresponds to this type
			var selfSm = Sm.Entities[this.type];
			//  The Entity object should also have a Meta Class
			selfSm && selfSm.Meta && selfSm.Meta.add_MV_as(type_to_add, Id);
			var MvMaps = this.MvMaps;
			switch (type_to_add) {
				case 'destroyed':
					MvMaps.destroyed_MVs[rid] = true;
					break;
				case 'loaded':
					MvMaps.loaded_MVs[rid] = Id;
					break;
				case 'active':
				case 'focused':
				case 'selected':
					//  The index of operation is going to be the "type to add" + _MVs (e.g. loaded => loaded_MVs)
					//  If that index doesn't exist, continue
					if (!(type_to_add + '_MVs' in MvMaps)) {
						Sm.CONFIG.DEBUG && console.log(type_to_add, MvMaps);
						return this;
					}
					MvMaps[type_to_add + '_MVs'][rid] = Id;

					//  In order for something to be active, focused, or selected, it must be loaded. Add it to the loaded stuff too
					!(rid in MvMaps.loaded_MVs) && (MvMaps.loaded_MVs[rid] = Id);
					break;
			}
			/*  Most of the time we are going to be dealing with entities from the database
			 *  Add the entity id to a map of loaded entity IDs just in case.
			 */
			var ent_id = Id.ent_id;
			if (Id.getResource) ent_id = ent_id || (Id.getResource() || {}).ent_id || false;

			(!!ent_id) && (type_to_add != 'destroyed') && (this.loaded_ent_ids[ent_id] = Id);

			//If this Wrapper is a conceptual Wrapper, add the Entity to its parent, too
			if (this.parentType) {
				var t_sm_type = Sm.Entities[this.parentType];
				if (!t_sm_type)return this;
				var p_wrapper = t_sm_type.Wrapper;
				p_wrapper.add_MV_as(type_to_add, Id);
			}
			return this;
		},
		remove_MV_as:  function (type_to_remove, Id) {
			//  If there is no Identity, continue
			if (!Id) return this;
			//  It's possible that either a View or an MvCombo were passed in. If that's the case, get the Identity accordingly
			if (Id.Identity) {
				Id = Id.Identity;
			} else if (Id.MvCombo) {
				Id = Id.MvCombo.Identity;
			}
			//  Assure that there is an Entity object that corresponds to this type
			var selfSm = Sm.Entities[this.type];
			//  The Entity object should also have a Meta Class
			selfSm && selfSm.Meta && selfSm.Meta.remove_MV_as(type_to_remove, Id);
			//  Get the R_ID of the MvCombo's Identity
			var rid = Id.r_id;
			//  If the R_ID doesn't exist, we can't do anything
			if (!rid) return this;

			//  The index of operation is going to be the "type to remove" + _MVs (e.g. loaded => loaded_MVs)
			var name   = type_to_remove + '_MVs';
			var MvMaps = this.MvMaps;

			//  If the name doesn't exist, we can't do anything
			if (!MvMaps[name]) return false;

			//  Remove the R_ID from the MvMap index
			(rid in this.MvMaps[name]) && delete this.MvMaps[name][rid];

			//  If the Entity is no longer loaded, it must also not be active, selected, or focused
			if (name == 'loaded') {
				(rid in this.MvMaps.active_MVs) && delete this.MvMaps.active_MVs[rid];
				(rid in this.MvMaps.selected_MVs) && delete this.MvMaps.selected_MVs[rid];
				(rid in this.MvMaps.focused_MVs) && delete this.MvMaps.focused_MVs[rid];
			}

			//  If this Wrapper is a conceptual Wrapper, remove the Entity from its parent, too
			if (this.parentType) {
				var t_sm_type = Sm.Entities[this.parentType];
				if (!t_sm_type)return this;
				var p_wrapper = t_sm_type.Wrapper;
				p_wrapper.remove_MV_as(type_to_remove, Id);
			}
			return true;
		},
///////////////////////////////////////////////////////////////////////////////
		/**
		 * Add focus to an MvCombo
		 * @param settings
		 * @param settings.MvCombo {Sm.Core.MvCombo}
		 * @param settings.View {Sm.Core.SmView}
		 * @return {Promise}
		 */
		focus_MV:      function (settings) {
			settings          = settings || {};
			var _Mv           = settings.MvCombo;
			var focused       = this.MvMaps.focused_MVs;
			var SpecifiedView = settings.View;
			if (this.MV_is('focused', _Mv)) return (new Promise(function (r) {
				r();
			}));
			this.blur_MV();
			SpecifiedView && SpecifiedView.focus();
			this.add_MV_as('focused', {MvCombo: _Mv});
			this.emit('focus', _Mv, settings.View);
			return Promise.resolve();
		},
		/**
		 * activate an MvCombo
		 * @param settings
		 * @param settings.MvCombo {Sm.Core.MvCombo}
		 * @param settings.View {Sm.Core.SmView}
		 * @return {Promise}
		 */
		activate_MV:   function (settings) {
			settings = settings || {};
			var _Mv  = settings.MvCombo;
			_Mv && this.add_MV_as('active', {MvCombo: _Mv});
			var P = new Promise(function (resolve) {resolve()});
			return P;
		},
		/**
		 * Select an MvCombo
		 * @param settings
		 * @param settings.MvCombo {Sm.Core.MvCombo}
		 * @param settings.View {Sm.Core.SmView}
		 * @return {Promise}
		 */
		select_MV:     function (settings) {
			settings = settings || {};
			var _Mv  = settings.MvCombo;
			_Mv && this.add_MV_as('selected', {MvCombo: _Mv});
			var P = new Promise(function (resolve) {resolve()});
			return P;
		},
		/**
		 * Deselect an MvCombo
		 * @param settings
		 * @param settings.MvCombo {Sm.Core.MvCombo}
		 * @param settings.View {Sm.Core.SmView}
		 * @return {Promise}
		 */
		deselect_MV:   function (settings) {
			settings = settings || {};
			var _Mv  = settings.MvCombo;
			_Mv && this.remove_MV_as('selected', {MvCombo: _Mv});
			var P = new Promise(function (resolve) {resolve()});
			return P;
		},
		/**
		 * Remove focus from an MvCombo
		 * @param settings
		 * @param settings.MvCombo {Sm.Core.MvCombo}
		 * @param settings.View {Sm.Core.SmView}
		 * @return {Promise}
		 */
		blur_MV:       function (settings) {
			settings = settings || {};
			var _Mv  = settings.MvCombo;
			_Mv && this.remove_MV_as('focused', {MvCombo: _Mv});
			if (!_Mv) {
				var focused = this.MvMaps.focused_MVs;
				for (var MvIdentity_r_id in focused) {
					if (!focused.hasOwnProperty(MvIdentity_r_id)) continue;
					var focused_MV_Identity = focused[MvIdentity_r_id];
					var focused_MV          = focused_MV_Identity.getResource();
					focused_MV.blur();
				}
			}
			var P = new Promise(function (resolve) {resolve()});
			return P;
		},
		/**
		 * Deactivate an MvCombo
		 * @param settings
		 * @param settings.MvCombo {Sm.Core.MvCombo}
		 * @param settings.View {Sm.Core.SmView}
		 * @return {Promise}
		 */
		deactivate_MV: function (settings) {
			settings = settings || {};
			var _Mv  = settings.MvCombo;
			_Mv && this.remove_MV_as('active', {MvCombo: _Mv});
			var P = new Promise(function (resolve) {resolve()});
			return P;
		},
		get_active:    function (all) {
			all                   = !!all;
			var active_dimensions = this.MvMaps.active_MVs;
			var ret               = [];
			for (var dimension in active_dimensions) {
				if (!active_dimensions.hasOwnProperty(dimension)) continue;
				var a = active_dimensions[dimension].getResource();
				if (all) ret.push(a);
				else return a;
			}
			return ret;
		},
///////////////////////////////////////////////////////////////////////////////
		/**
		 * @alias Sm.Core.MvWrapper.build_MV
		 * @param settings
		 * @param settings.MvCombo
		 * @param settings.model_properties
		 * @param settings.prompt
		 * @return {*}
		 */
		build_MV:      function (settings) {
			settings     = !!settings && typeof  settings === 'object' ? settings : {};
			settings     = settings || {};
			var _Wrapper = this;
			var sm_type  = Sm.Entities[this.type];
			if (!sm_type) return Promise.reject("No SmType to accompany " + this.type);
			var ModelType = sm_type.Model;
			if (!ModelType) return Promise.reject("No Model type");

			var Model_  = new ModelType({});
			Model_.type = this.type;
			Model_.set(settings.model_properties || {});
			var NewMv = _Wrapper.init_MvCombo({
				                                  Wrapper: _Wrapper,
				                                  model:   Model_,
				                                  CONFIG:  _Wrapper.CONFIG
			                                  });
			/** @type {Promise}  */
			var P;
			if (!!settings.prompt) P = this.prompt('edit', NewMv, {display_type: 'inline'});
			else P = Promise.resolve(Model_.save());
			return P.then(function (response) {
				response         = response || {};
				response.success = response.success || false;
				if (!response.success) throw  response.message || "Unknown error occurred, mvw";
				response.data = response.data || {};
				if (!NewMv) return Promise.reject("No new Mv");
				NewMv.refresh_model(response.data.model);
				NewMv.Identity.refresh(response.data.model);
				NewMv.getView({}).render();
				_Wrapper.add_MV_as('loaded', {
					MvCombo: NewMv,
					id:      Model_.get('id'),
					ent_id:  Model_.get('ent_id')
				});
				settings.MvCombo = NewMv;
				return NewMv;
			});
		},
		destroy_MV:    function (MvCombo) {
			if (!MvCombo)   return Promise.reject();

			var MvMaps = this.MvMaps;
			this.add_MV_as('destroyed', MvCombo);
			this.remove_MV_as('loaded', MvCombo);
			Sm.CONFIG.DEBUG && console.log(MvMaps, MvMaps.destroyed_MVs);
			return Promise.resolve(true);
		},
///////////////////////////////////////////////////////////////////////////////
		prompt:        function (action, parameters, config) {
			config     = config || {};
			parameters = parameters || {};
			if (parameters.object_type == 'MvCombo') parameters = {MvCombo: parameters};
			var EntityArr      = parameters.EntityArr || [];
			var MvCombo        = parameters.MvCombo || false;
			var s_OtherMvCombo = config.OtherMvCombo;
			if (MvCombo) EntityArr.push(MvCombo);
			if (!/destroy|edit|add_relationship/.test(action)) return Promise.reject("Not sure how to interact with this");
			var P, Modal, self = this;
			var ModalType;

			/**
			 * Return a Modal Dialog constructor based on the request
			 * @param modal_name
			 * @return {*}
			 */
			var _Modal = function (modal_name) {
				return Sm.Entities[self.type].Abstraction &&
				Sm.Entities[self.type].Abstraction.Modal &&
				Sm.Entities[self.type].Abstraction.Modal[modal_name]
				? Sm.Entities[self.type].Abstraction.Modal[modal_name]
				: (Sm.Entities.Abstraction.Modal[modal_name] || function () {
					Sm.CONFIG.DEBUG && console.log("Default constructor made for " + modal_name);
				});
			};

			function destroy() {
				P = new Promise(function (resolve, reject) {
					ModalType = _Modal('Destroy');
					Modal     = new ModalType({
						MvCombo:        EntityArr,
						self_type:      self.type || 'Entity',
						display_type:   config.display_type,
						promise_object: {resolve: resolve, reject: reject}
					});
					Modal.open();
				});
				return P.catch(function (e) {
					Sm.CONFIG.DEBUG && console.log('core_MvCombo,destroy', e);
				}).then(function () {
					var all_destroy = [];
					for (var i = 0; i < EntityArr.length; i++) {
						var Entity = EntityArr[i];
						if (typeof Entity.destroy !== "function") {
							Sm.CONFIG.DEBUG && console.log(Entity, 'Does not have a method to destroy');
						} else {
							all_destroy.push(Entity.destroy());
						}
					}
					return Promise.all(all_destroy);
				}).then(function () {
					Modal.close();
				}).catch(function (boon) {
					Sm.CONFIG.DEBUG && console.log("Rejected the promise", boon);
					throw boon;
				});
			}

			function edit() {
				P = new Promise(function (resolve, reject) {
					ModalType = _Modal('Edit');
					Modal     = new ModalType({
						MvCombo:             EntityArr,
						self_type:           self.type || 'Entity',
						display_type:        config.display_type,
						relationship_object: config.relationship_object,
						promise_object:      {resolve: resolve, reject: reject}
					});
					Modal.open();
				});
				return P.then(function (result) {
					Modal.close();
					return result;
				});
			}

			function add_relationship() {
				if (EntityArr.length === 1 && EntityArr[0].object_type && EntityArr[0].object_type == 'MvCombo') {
					/** @type {Sm.Core.MvCombo}  */
					var SelfMvCombo = EntityArr[0];
					P               = SelfMvCombo.prompt_relationship_add(s_OtherMvCombo, config || {});
					return P.then(function (_args) {
						/** @type {Sm.Core.MvCombo}  */
						var OtherMvCombo = _args.OtherMvCombo;
						var ar_settings  = _args.add_relationship_settings;
						//Whether we're adding the relationship the other way
						var is_opposite  = !!ar_settings.opposite;
						//If this relationship is reciprocal, add it to the Other MvCombo
						if (ar_settings && is_opposite) {
							return OtherMvCombo.add_relationship(SelfMvCombo, ar_settings);
						} else {
							return SelfMvCombo.add_relationship(OtherMvCombo, ar_settings);
						}
					});
				} else {
					Sm.CONFIG.DEBUG && console.log('MvWrapper,prompt,ar,fail', EntityArr, arguments)
				}
			}

			switch (action) {
				case "destroy":
					return destroy();
					break;
				case "edit":
					return edit();
					break;
				case "add_relationship":
					return add_relationship();
					break;
			}
			return Promise.reject("Not sure how to interact with this entity");
		}
///////////////////////////////////////////////////////////////////////////////
	});
	Sm.Core.MvWrapper.replacements = {
		replaced_MVs:    {},
		replacement_MVs: {}
	};
	/**
	 *
	 * @param mv_combo
	 * @return {Sm.Core.MvCombo|Array<Sm.Core.MvCombo|boolean>|boolean|*}
	 */
	Sm.Core.MvWrapper.convert_to_MvCombo = function (mv_combo) {
		if (!mv_combo) return false;
		if (mv_combo.constructor == Array) {
			return mv_combo.map(function (item) {
				return Sm.Core.MvWrapper.convert_to_MvCombo(item);
			})
		}
		//Try to convert whatever we're talking about into an Identity
		if (mv_combo.r_id) mv_combo = mv_combo.r_id;
		if (mv_combo.Identity) mv_combo = mv_combo.Identity.r_id;
		if (typeof mv_combo === "string") {
			if (mv_combo in Sm.Core.Meta.MvMaps.loaded_MVs) {
				return Sm.Core.Meta.MvMaps.loaded_MVs[mv_combo].getResource();
			} else {
				var Identity = Sm.Core.Identifier.retrieve(mv_combo);
				//Doesn't Exist
				if (!Identity) return false;
				var Resource = Identity.getResource();
				//Doesn't exist
				if (!Resource) return false;
				//It's an MvCombo
				if (Resource.addView) return Resource;
				//It's a View or Model
				if (Resource.MvCombo) return Resource.MvCombo;
			}
		}
		return false;
	};
	/**
	 * Get an array of r_ids that represent what this MvCombo effectively is. The array contains the r_ids of other MvCombos that can replace the content of whatever this one is.
	 * @param {Sm.Core.MvCombo.Identity.r_id|Sm.Core.MvCombo}    MvCombo_in_question     This is the r_id of the MvCombo that we are asking about
	 * @param {boolean=false}                           get_original            Are we trying to return what this Mv is replacing?
	 * @param {boolean=false}                           false_if_same           Should we false if we don't find anything? Makes us return a boolean, probably for the better
	 * @param {{}=}                                     found                   An object whose items we've already found
	 *  @return {{MVs:Array<Sm.Core.MvCombo.Identity.r_id>, replacement_indices: {}|string}|boolean}
	 */
	Sm.Core.MvWrapper.get_effective_MV = function (MvCombo_in_question, get_original, false_if_same, found) {
		found         = found || {};
		var MvWrapper = Sm.Core.MvWrapper;
		get_original  = !!get_original;
		/**
		 * This is the r_id of the MvCombo that we are asking about
		 */
		var r_id;
		if (typeof  MvCombo_in_question === "string") {
			r_id = MvCombo_in_question;
		} else {
			var MvCombo = MvWrapper.convert_to_MvCombo(MvCombo_in_question);
			if (!MvCombo) return false_if_same ? false : {
				MVs:                 MvCombo_in_question,
				replacement_indices: {}
			};
			r_id = MvCombo.Identity.r_id;
		}
		/** An array of the r_ids that compose this one (or that this one composes)
		 * @type {Array<Sm.Core.MvCombo.Identity.r_id>}
		 */
		var list;
		/**
		 * If we are trying to get whatever this MvCombo is replacing, we should look in the "replacement MVs". Otherwise, we look in the "replaced MVs"
		 * @type {string}
		 */
		var where_to_look = !get_original ? MvWrapper.replacements.replaced_MVs : MvWrapper.replacements.replacement_MVs;
		var list_obj      = where_to_look[r_id];
		list              = list_obj ? list_obj.MVs : false;

		//If the list doesn't exist or is empty or is just an array that points back to itself, ignore it and move on
		if (!list || !list.length || (list.length === 1 && list[0] == r_id)) return false_if_same ? false : {MVs: [r_id], replacement_indices: {}};
		var replacement_index;
		var repl_indices = list_obj.replacement_indices;
		for (var rep_r_id in repl_indices) {
			if (!repl_indices.hasOwnProperty(rep_r_id)) continue;
			if (!replacement_index) replacement_index = repl_indices[rep_r_id];
		}
		var actual_list = [];
		var obj         = {};
		for (var i = 0; i < list.length; i++) {
			var item = list[i];
			if (found[item]) {
				delete where_to_look[r_id];
				list.splice(i, 1);
				i--;
				continue;
			}
			found[item]  = found;
			var resp_obj = Sm.Core.MvWrapper.get_effective_MV(item, get_original, true, found);
			if (!resp_obj && !obj[item]) {
				if (item == r_id) continue;
				actual_list.push(item);
				obj[item] = true;
			} else {
				var resp  = resp_obj.MVs;
				var items = resp_obj.replacement_indices;
				if (!replacement_index) {
					for (var obj1 in items) {
						if (!items.hasOwnProperty(obj1)) continue;
						if (!replacement_index) replacement_index = items[obj1];
					}
				}
				for (var j = 0; j < resp.length; j++) {
					var name = resp[j];
					if (!obj[name] && name != r_id) {
						obj[name] = true;
						actual_list.push(name);
					}
				}
			}
		}
		return {
			MVs:                 actual_list,
			replacement_indices: replacement_index
		};
	};
	/**
	 * Mark a list of MvCombo r_ids as being effectively replaced by the content of another list
	 * @param {Array<Sm.Core.MvCombo.Identity.r_id>|Sm.Core.MvCombo}    D_ReplacedMvComboList
	 * @param {Array<Sm.Core.MvCombo.Identity.r_id>|Sm.Core.MvCombo}    M_ReplacementMvComboList
	 * @param {string}                                                  replacement_indices
	 * @return {boolean}
	 */
	Sm.Core.MvWrapper.register_MV_replacement = function (D_ReplacedMvComboList, M_ReplacementMvComboList, replacement_indices) {
		if (!replacement_indices) {
			return false;
		}
		if (!M_ReplacementMvComboList || !D_ReplacedMvComboList) return false;
		var MvWrapper = Sm.Core.MvWrapper;
		if (D_ReplacedMvComboList.Identity) D_ReplacedMvComboList = [D_ReplacedMvComboList.Identity.r_id];
		if (M_ReplacementMvComboList.Identity) M_ReplacementMvComboList = [M_ReplacementMvComboList.Identity.r_id];
		//Sort the arrays to make comparison easier (just compare the joined arrays to see if they are the same)
		D_ReplacedMvComboList    = D_ReplacedMvComboList.sort();
		M_ReplacementMvComboList = M_ReplacementMvComboList.sort();

		var m_replacement_object = {};
		var d_replaced_object    = {};


		/**
		 * MVs that the wrapper already knows have been replaced
		 * @type {Sm.Core.MvWrapper.replacements.replaced_MVs|{}}
		 */
		var wrapper_replaced      = MvWrapper.replacements.replaced_MVs;
		/**
		 * Mvs that are replacing something
		 * @type {Sm.Core.MvWrapper.replacements.replacement_MVs|{}}
		 */
		var wrapper__replacements = MvWrapper.replacements.replacement_MVs;

		//Convert the replaced/replacements to a sorted string of the r_ids. This will be used as a quick comparison method
		var rep_d_to_string        = D_ReplacedMvComboList.join(',');
		var replacements_to_string = M_ReplacementMvComboList.join(',');
		var removed_mvs            = [];
		//We first iterate through the MvCombos that we've already replaced to see if what replaces them is equal to what we are now replacing (if we are undoing an action)
		for (var replaced_id in wrapper_replaced) {
			if (!wrapper_replaced.hasOwnProperty(replaced_id)) continue;
			//If the strings match
			var known_rep_d_string = wrapper_replaced[replaced_id].MVs.join(',');
			if (rep_d_to_string == known_rep_d_string && M_ReplacementMvComboList.indexOf(replaced_id) > -1) {
				delete wrapper_replaced[replaced_id];
				removed_mvs.push(replaced_id);
			}
		}
		var to_sort_string = removed_mvs.join(',');
		//If we have just undone a replacement (all of the MVs that were doing the replacing had already been replaced my the MVs that we were going to replace just now)
		//Delete the r_ids of the MVs that are now being replaced out of the "replacements" map
		if (to_sort_string == replacements_to_string) {
			for (var k = 0; k < D_ReplacedMvComboList.length; k++) {
				var replacement_r_id = D_ReplacedMvComboList[k];
				if (wrapper__replacements[replacement_r_id]) {
					delete wrapper__replacements[replacement_r_id];
				}
			}
			removed_mvs = false;
		}
		if (!removed_mvs) return true;

		var mv;
		for (var i = 0; i < D_ReplacedMvComboList.length; i++) {
			mv                    = D_ReplacedMvComboList[i];
			d_replaced_object[mv] = replacement_indices;
			var possible_MV_obj   = MvWrapper.get_effective_MV(mv, false, true);
			/** @type {Array}  */
			var possible_MvCombo  = possible_MV_obj ? possible_MV_obj.MVs : false;
			//If we are replacing something that has already been replaced, get the r_ids of the MV that replace it to say that those are now going to be replaced by whatever this one was
			if (!possible_MvCombo) {
				var pos = M_ReplacementMvComboList.indexOf(mv);
				if (mv > 0) M_ReplacementMvComboList.splice(pos, 1);
				if (!M_ReplacementMvComboList.length) {
					if (wrapper_replaced[mv]) delete wrapper_replaced[mv];
				} else {
					wrapper_replaced[mv] = {
						MVs:                 M_ReplacementMvComboList,
						replacement_indices: m_replacement_object
					};
				}
			} else {
				Sm.CONFIG.DEBUG && console.log('reps', possible_MvCombo);
				MvWrapper.register_MV_replacement(possible_MvCombo, M_ReplacementMvComboList, replacement_indices);
			}
		}
		var reps = [];
		//Iterate through the r_ids of the MVs that we are going to replace with
		//We want to get a list of r_ids that we are truly going to be replacing, and say that those are now replacing whatever we just replaced
		M_ReplacementMvComboList.forEach(function (currentValue) {
			m_replacement_object[currentValue] = replacement_indices;
			var eff_obj                        = MvWrapper.get_effective_MV(currentValue);
			var eff                            = eff_obj.MVs;
			if (eff) {
				for (var i = 0; i < eff.length; i++) {
					var r_id = eff[i];
					reps.push(r_id);
				}
			} else {
				reps.push(currentValue);
			}
		});
		for (var j = 0; j < reps.length; j++) {
			mv                        = reps[j];
			wrapper__replacements[mv] = {
				MVs:                 D_ReplacedMvComboList,
				replacement_indices: d_replaced_object
			};
		}
		return true;
	};

	Sm.loaded.when_loaded('Core_Identifier', function () {
		Sm.loaded.add('Core_MvWrapper');
	}, 'Core_MvWrapper');
});