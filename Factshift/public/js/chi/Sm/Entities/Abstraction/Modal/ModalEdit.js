/**
 * Created by Sam Washington on 7/8/16.
 */
require(['require', 'Class', 'Sm', 'Sm/Extras/Modal'], function (require, Class) {
	Sm.loaded.when_loaded(['Extras_Modal'], function () {
		Sm.Entities.Abstraction.Modal = Sm.Entities.Abstraction.Modal || {};
		/**
		 * @alias Sm.Entities.Abstraction.Modal.Edit
		 * @prop {Array} Sm.Entities.Abstraction.Modal.Edit.EntityArr {@see Sm.Entities.Abstraction.Modal.Edit.EntityArr}
		 */
		Sm.Entities.Abstraction.Modal.Edit = Sm.Extras.Modal.extend(
		{
			/**
			 *
			 * @param settings
			 * @param settings.MvCombo
			 * @param settings.self_type
			 * @param settings.display_type             {string}    Contains details about the display type
			 * @param settings.relationship_object      {{}}        An object that contains details about the relationship
			 * @param settings.alternative              {{}}        An object or set of objects that we may want to use to prompt instead
			 */
			init: function (settings) {
				settings                   = settings || {};
				this.alternative           = settings.alternative || false;
				settings.events_to_trigger = [
					'save',
					'before_save',
					'after_save',
					'open',
					'close',
					'view_relationships',
					'add_entity',
					'select',
					'change_edit'];
				this.display_type          = (settings.display_type || "full") + ".modal[edit]";
				return Sm.Extras.Modal.prototype.init.apply(this, arguments);
			},

			generate_element:      function (config) {
				if (this.alternative) {
					var alternative_type    = this.getEntityType(this.alternative);
					config.alternative_type = (alternative_type || false) ? (alternative_type === "MvCombo" ? "Entity" : "Relationship") : false;
				}
				return Sm.Extras.Modal.prototype.generate_element.apply(this, [config]);
			},
			update:                function () {
				//Sm.CONFIG.DEBUG && console.log("Not sure how to update this View");
			},
			/**
			 * @this Sm.Entities.Abstraction.Modal.Edit
			 * @param response
			 * @param changed_attributes
			 */
			success:               function (response, changed_attributes) {
				var $modal_content = this.get_content_element(true);

				/** @type {Sm.Entities.Abstraction.Edit.EntityArr}  */
				var EntityArr = this.EntityArr;
				if (EntityArr.length === 1) {
					var MvCombo_              = EntityArr[0];
					var SelfView              = this.ViewArr[0];
					response                  = response || {
						message: {
							text:      'Undefined error',
							changed:   [],
							defaulted: [],
							deferred:  [],
							errors:    []
						},
						success: false
					};
					response.message          = response.message || {};
					var changed_on_server_arr = response.message.changed || [];
					var response_model        = response.message.model || {};
					var defaulted             = response.message.defaulted || {};

					var errors = response.message.errors || {};
					var _Model = MvCombo_.Model || {};

					_Model.clear({silent: true});
					_Model.set(response_model, {silent: true});
					this.update();
					var changed_arr = [];
					for (var attr in changed_attributes) {
						if (!changed_attributes.hasOwnProperty(attr)) continue;
						if (changed_on_server_arr.indexOf(attr) < 0) {
							var reason = "Unknown error (1)";
							if (defaulted[attr]) {
								reason = defaulted[attr];
							} else if (errors[attr]) {
								reason = errors[attr];
							}
							var actual_value = response_model[attr];
							this.set_errors(attr, reason, actual_value);
						} else {
							changed_arr.push(attr);
						}
					}
					var self = this;
					MvCombo_.forEachView(function () {
						/** @type {Sm.Core.SmView|*}  */
						var View = this;
						if (!View || (SelfView && self.cid == View.cid)) return;
						View.update(changed_arr);
						View.refresh_all();
					});
					return Promise.resolve(changed_arr);
				}
				return Promise.reject("Not sure what to do with multiple MvCombos");
			},
			get_info_from_form:    function (query_selector) {
				query_selector = query_selector || '.model.edit';
				var set_thing  = Sm.Extras.Modal.prototype.get_info_from_form.call(this, query_selector);
				if (this.EntityArr.length === 1) {
					var _Model = this.EntityArr[0].Model;
					for (var n in set_thing) {
						if (!set_thing.hasOwnProperty(n)) continue;
						if (set_thing[n] == _Model.get(n)) {
							delete set_thing[n];
						}
					}
					_Model.set(set_thing);
					return this.changed_attributes = set_thing;
				}
				return set_thing;
			},
			//////////////////////////////////////////////
			/**
			 * @typedef {function}  Sm.Entities.Abstraction.Modal.Edit.on_event
			 */
			on_before_save:        function () {
				this.clear_errors();
				var $content_element = this.get_content_element(true);
				$content_element.addClass('saving');
				this.changed_attributes = this.get_info_from_form();
			},
			/**
			 * @type Sm.Entities.Abstraction.Modal.Edit.on_event
			 */
			on_save:               function () {
				this.emit('before_save', this, this.content_element);
				var SelfModal = this;
				var EntityArr = this.EntityArr;
				if (EntityArr.length === 1) {
					var MvCombo_    = EntityArr[0];
					var type        = MvCombo_.type;
					var P, no_model = false;
					if (type.indexOf('__') && this.relationship_object.Relationship) {
						Sm.CONFIG.DEBUG && console.log(this.relationship_object);
						P = this.relationship_object.Relationship.save();
					} else if (!MvCombo_.Model || !MvCombo_.Model.id) {
						Sm.CONFIG.DEBUG && console.log(MvCombo_.Model);
						Sm.CONFIG.DEBUG && console.log('ModalEdit,on_save,no_save');
						no_model = true;
						P        = !!MvCombo_.Model ? MvCombo_.Model.save() : Promise.resolve({});
					} else {
						P = MvCombo_.save({
							                  silent: true,
							                  patch:  true
						                  })
					}
					var save_result;
					return P.then(function (result) {
						save_result = result;
						return SelfModal.resolve('after_save', result);
					}).then(function (result) {
						if (no_model) {
							Sm.CONFIG.DEBUG && console.log(save_result);
							return MvCombo_.Model ? SelfModal.promise_object.resolve(save_result) : SelfModal.promise_object.resolve({success: true});
						}
						return result;
					});
				}
				return Promise.reject("Not sure what to do with multiple MvCombos yet");
			},
			on_after_save:         function (result) {
				this.$content_element.removeClass('saving');
				var ca = this.changed_attributes;
				result && this.success(result, this.changed_attributes);
				if (this.EntityArr.length !== 1 || (this.EntityArr[0].Model && this.EntityArr[0].Model.id))
					this.changed_attributes = {};
				return ca;
			},
			on_open:               function () {
				var content_element = this.content_element;
				var self            = this;
				this.EntityArr.forEach(function (current_element, index) {
					self.ViewArr.push(current_element.addView(content_element, false, {display_type: self.display_type}));
				});
			},
			on_close:              function () {
				var ViewArr = this.ViewArr;
				for (var i = 0; i < ViewArr.length; i++) {
					var View_ = ViewArr[i];
					View_ && View_.destroy();
				}
			},
			on_change_edit:        function () {
				if (!this.alternative)return false;
				this.close();
				var constructor = this.prototype ? this.prototype.constructor : this.constructor;
				if (!constructor) {
					Sm.CONFIG.DEBUG && Sm.Errors.log("Using nonexistent constructor") && console.log("Could not find constructor");
					return false;
				}
				var settings         = this.settings;
				settings.EntityArr   = this.alternative;
				settings.alternative = this.EntityArr;
				if (settings.MvCombo)delete settings.MvCombo;
				var Modal = new constructor(this.settings);
				Modal.open();
			},
			on_view_relationships: function () {
				if (!this.self_type) {
					Sm.CONFIG.DEBUG && console.log("No self type in this modal!");
					return;
				}
				if (this.EntityArr.length !== 1) {
					Sm.CONFIG.DEBUG && console.log("Not sure what to do in this situation!");
					return;
				}
				var self_type              = this.self_type;
				var MvCombo_               = this.EntityArr[0];
				var $modalContent          = this.get_content_element(true);
				var relationship_container = $modalContent.find('.view_relationship-container')[0];
				Sm.Entities[self_type]
				&& Sm.Entities[self_type].Garage.generate('relationships', MvCombo_).catch(function (errr) {
					Sm.CONFIG.DEBUG && console.log(errr);
				}).then(function (result) {
					if (relationship_container) {
						if (typeof result == 'string') {
							relationship_container.innerHTML = '<hr>' + result;
						} else {
							relationship_container.innerHTML = '<hr>';
							try {
								relationship_container.appendChild(result);
							} catch (e) {
								Sm.CONFIG.DEBUG && console.log(e);
							}
						}

					}
				}).catch(function (e) {
					Sm.CONFIG.DEBUG && console.log(e);
				});
			},
			on_add_entity:         function () {
				Sm.CONFIG.DEBUG && console.log(arguments);
			},
			on_select:             function () {
				var self = this;
				this.resolve('save').then(function (res) {
					self.create_modal_element();
				}).catch(function (res) {
					Sm.CONFIG.DEBUG && console.log(res);
				});
			}
		});
	}, 'Entities_Abstraction_Modal_ModalEdit');
});
