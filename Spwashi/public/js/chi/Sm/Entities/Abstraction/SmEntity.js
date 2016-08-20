/**
 * Created by Sam Washington on 7/18/16.
 */
require(['Sm', "Sm-Core-Core"], function (Sm) {
	Sm.loaded.when_loaded("Core", function () {
		/**
		 * A container for the Model/View/ representations
		 * @type {object<string,Sm.Entities.Abstraction.SmEntity>}
		 * @alias Sm.Entities
		 */
		Sm.Entities = {};
		Sm.Entities.Abstraction        = Sm.Entities.Abstraction || {};
		Sm.Entities.Abstraction.mixins = Sm.Entities.Abstraction.mixins || {};
		var entity_obj                 = Sm.spwashi_config.entities;
		var SmEntityProperties         = ['Meta', 'MvCombo', 'Wrapper', 'View', 'Garage', 'Model', 'Abstraction'];
		/**
		 * @class SmEntity
		 * @alias Sm.Entities.Abstraction.SmEntity
		 * @property {Sm.Core.MvCombo}                  MvCombo
		 * @property {Sm.Core.SmView}                   View
		 * @property {Sm.Core.MvWrapper}                Wrapper
		 * @property {Sm.Entities.Abstraction.Garage}   Garage
		 * @property {Sm.Core.SmModel}                  Model
		 * @property {{}}                               Abstraction
		 *
		 * @param {string}  EntityName
		 * @constructor
		 */
		var SmEntity                   = function (EntityName) {
			this.type     = EntityName;
			this.subtypes = {};
			for (var i = 0; i < SmEntityProperties.length; i++) {
				var p_name   = SmEntityProperties[i];
				this[p_name] = null;
			}
		};
		SmEntity.prototype.complete    = function () {
			var EntityType            = this.type;
			this.Model                = this.Model || (function (self) {
				var Model = Sm.Core.SmModel.extend({defaults: Sm.Core.Meta.get_defaults(self.type.replace('__', '|'))});
				Model.tmp = true;
				return Model;
			})(this);
			this.Model.prototype.type = this.type;
			this.Wrapper              = this.Wrapper || (function (self) {
				var MvWrapper = Sm.Core.MvWrapper.extend({
					                                         type:               self.type,
					                                         parentType:         null,
					                                         populate_container: function () {}
				                                         });
				var Wrapper   = new MvWrapper;
				Wrapper.tmp   = true;
				return Wrapper;
			})(this);
			this.templates            = this.templates || {_template: {}, standard: {}};
			this.Garage               = this.Garage || (function (self) {
				var GarageProto = Sm.Entities.Abstraction.Garage.extend({});
				var Garage      = new GarageProto(self.type, self.type.toLowerCase() + '_type')
				Garage.tmp      = true;
				return Garage;
			})(this);
			this.View                 = this.View || (function (self) {
				var View = Sm.Core.SmView.extend({
					                                 type:       self.type,
					                                 identifier: '.spwashi-' + self.type.toLowerCase()
				                                 });
				View.tmp = true;
				return View;
			})(this);
			/**
			 * @type Sm.Core.Meta
			 */
			this.Meta = this.Meta || (function (self) {
				var MetaProto = Sm.Core.Meta.Proto.extend();
				var Meta      = new MetaProto({type: self.type});
				Meta.Proto    = MetaProto;
				Meta.tmp      = true;
				return Meta;
			})(this);
			this.MvCombo      = this.MvCombo || (function (self) {
				var MvCombo = Sm.Core.MvCombo.extend({});
				MvCombo.tmp = true;
				return MvCombo;
			})(this);
			var config        = entity_obj[this.type.replace('__', '|')];
			config.model_type = EntityType;
			this.Meta.configure(config);
		};
		SmEntity.prototype.add_subtype = function (name, object) {
			this.subtypes[name] = object;
		};
		/**
		 * @alias Sm.Entities.Abstraction.SmEntity
		 * @type {SmEntity}
		 */
		Sm.Entities.Abstraction.SmEntity = SmEntity;
		Sm.loaded.add("Entities_Abstraction_SmEntity");
		var has = {
			Section:    [
				'templates-_template', 'templates-standard',
				'Meta', 'Model', 'View', 'Garage', 'MvCombo', 'Wrapper',
				'subtypes-definition-main',
				'Abstraction-Relationship-pivots_RelationshipIndex',
				'Abstraction-Modal-ModalEdit', 'templates-definition'],
			Collection: ['templates-_template', 'templates-standard', 'Meta', 'View'],
			Concept:    ['templates-_template', 'templates-standard', 'Meta', 'View', 'Wrapper'],
			Page:       ['templates-_template', 'templates-standard', 'Meta', 'View', 'Garage'],
			Dictionary: ['templates-_template', 'templates-standard', 'Meta', 'View', 'Garage', 'MvCombo', 'Wrapper'],
			Dimension:  ['templates-_template', 'templates-standard', 'Meta', 'View', 'Wrapper'],
			User:       ['Wrapper']
		};
		for (var EntityType in entity_obj) {
			if (!entity_obj.hasOwnProperty(EntityType)) continue;
			EntityType                       = EntityType.replace('|', '__');
			Sm.Entities[EntityType]          = new SmEntity(EntityType);
			Sm.Entities[EntityType].Identity = new Sm.Core.Identifier({
				r_id:     EntityType,
				Resource: Sm.Entities[EntityType]
			});
			var _entity_has                  = has[EntityType] || [];
			var when_loaded                  = ['Core', 'Entities-Abstraction-Garage'];
			var req                          = ['Sm-Core-Core', 'Sm-Entities-Abstraction-Garage'];

			for (var i = 0; i < _entity_has.length; i++) {
				var wait_for = _entity_has[i];
				var wl       = 'Entities_' + EntityType + '_' + wait_for;
				req.push('Sm-Entities-' + EntityType + '-' + wait_for);
				when_loaded.push(wl);
			}
			if (req.length) require(req);
			Sm.Entities[EntityType]                          = Sm.Entities[EntityType] || {};
			Sm.Entities[EntityType].templates                = Sm.Entities[EntityType].templates || {};
			Sm.Entities[EntityType].Abstraction              = Sm.Entities[EntityType].Abstraction || {};
			Sm.Entities[EntityType].Abstraction.Relationship = Sm.Entities[EntityType].Abstraction.Relationship || {};
			Sm.loaded.when_loaded(when_loaded, (function (EntityType) {
				return function () {
					if (!Sm.Entities[EntityType]) return;
					Sm.Entities[EntityType].complete();

					var $body             = $(document.body);
					var lower_entity_name = EntityType.toLowerCase();
					var to_find           = '.spwashi-' + lower_entity_name;
					var models_json       = document.getElementById(lower_entity_name + "_models");
					Sm.Entities[EntityType].Wrapper.hydrate({
						                                        elements: $body.find(to_find),
						                                        models:   models_json ? JSON.parse(models_json.textContent) : null
					                                        });
					if (EntityType.indexOf("__") !== -1) return;
					Sm.Extras.visual_debug(EntityType + ' has been loaded!');
				}
			})(EntityType), 'entities_' + EntityType).then(function (e, d, r) {}).catch((function (e) {
				Sm.CONFIG.DEBUG && console.log(e, ' could not be loaded ');
			}).bind(null, EntityType));
		}
		Sm.CONFIG.DEBUG && console.log(Sm, Sm.spwashi_config);
	}, 'Sm-Entities-Abstraction-SmEntity');
});