/**
 * Created by Sam Washington on 7/18/16.
 */
require(["Sm-Core-Core"], function () {
	Sm.loaded.when_loaded("Core", function () {
		var SmEntityProperties        = [
			'Meta', 'MvCombo', 'Wrapper', 'View',
			'Garage', 'Model', 'Abstraction'
		];
		var SmEntity                  = function (EntityName, properties) {
			this.type = EntityName;
			for (var prop in properties) {
				if (!properties.hasOwnProperty(prop)) continue;
				this[prop] = properties[prop];
			}
			for (var i = 0; i < SmEntityProperties.length; i++) {
				var p_name   = SmEntityProperties[i];
				this[p_name] = null;
			}
		};
		SmEntity._default_model_props = {};

		SmEntity.prototype.getModelConstructor = function () {

		};
		SmEntity.prototype.complete            = function () {
			var EntityType            = this.type;
			this.Model                = this.Model || (function (self) {
					var Model = Sm.Core.SmModel.extend({defaults: Sm.Core.Meta.get_defaults_of(self.type)});
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
			this.Meta                 = this.Meta || (function (self) {
					var MetaProto = Sm.Core.Meta.Proto.extend();
					var Meta      = new MetaProto({type: self.type});
					Meta.Proto    = MetaProto;
					Meta.tmp      = true;
					return Meta;
				})(this);
			this.MvCombo              = this.MvCombo || (function (self) {
					var MvCombo = Sm.Core.MvCombo.extend({});
					MvCombo.tmp = true;
					return MvCombo;
				})(this);
		};
		Sm.Entities.Abstraction.SmEntity       = SmEntity;
		Sm.loaded.add("Entities_Abstraction_SmEntity");
		Sm.Entities                            = Sm.Entities || {};
		var entities                           = Sm.spwashi_config.entities;

		var has = {
			Section:    ['Meta', 'Model', 'View', 'Garage', 'MvCombo', 'Wrapper', 'Abstraction-Relationship-pivots_RelationshipIndex', 'Abstraction-Modal-ModalEdit', 'templates-definition'],
			Collection: ['Meta', 'Model', 'View', 'Garage', 'MvCombo', 'Wrapper'],
			Concept:    ['Meta', 'Model', 'View', 'Garage', 'MvCombo', 'Wrapper'],
			Page:       ['Meta', 'Model', 'View', 'Garage', 'MvCombo', 'Wrapper'],
			Dictionary: ['Meta', 'Model', 'View', 'Garage', 'MvCombo', 'Wrapper'],
			Dimension:  ['Meta', 'Model', 'View', 'Garage', 'MvCombo', 'Wrapper']
		};


		for (var EntityType in entities) {
			if (!entities.hasOwnProperty(EntityType)) continue;
			var _entity_info        = entities[EntityType];
			EntityType              = EntityType.replace('|', '__');
			Sm.Entities[EntityType] = new SmEntity(EntityType, entities[EntityType] || {});
			var _entity_has         = has[EntityType] || [];
			var when_loaded         = ['Core', 'Entities-Abstraction-Garage'];
			var req                 = ['Sm-Core-Core', 'Sm-Entities-Abstraction-Garage'];

			for (var i = 0; i < _entity_has.length; i++) {
				var wait_for = _entity_has[i];
				var wl       = 'Entities_' + EntityType + '_' + wait_for;
				req.push('Sm-Entities-' + EntityType + '-' + wait_for);
				when_loaded.push(wl);
			}
			if (_entity_has.length) require(req);
			//require(req);
			Sm.Entities[EntityType]                          = Sm.Entities[EntityType] || {};
			Sm.Entities[EntityType].templates                = Sm.Entities[EntityType].templates || {};
			Sm.Entities[EntityType].Abstraction              = Sm.Entities[EntityType].Abstraction || {};
			Sm.Entities[EntityType].Abstraction.Relationship = Sm.Entities[EntityType].Abstraction.Relationship || {};

			Sm.loaded.when_loaded(when_loaded, (function (EntityType) {
				return function () {
					if (!Sm.Entities[EntityType]) return;
					var $body = $(document.body);
					Sm.Entities[EntityType].complete();
					if (Sm.Entities[EntityType].Wrapper) {
						var to_find = '.spwashi-' + EntityType.toLowerCase();
						Sm.Entities[EntityType].Wrapper.hydrate({elements: $body.find(to_find)});
					} else {
						Sm.CONFIG.DEBUG && console.log(EntityType, ' - missing wrapper');
					}
					Sm.CONFIG.DEBUG && console.log(EntityType, Sm.Entities[EntityType]);
					//Sm.CONFIG.DEBUG && console.log(' -- ', EntityType, ' has been loaded');
				}
			})(EntityType), 'entities_' + EntityType).then(function (e, d, r) {
			}).catch((function (e) {
				Sm.CONFIG.DEBUG && console.log(e, ' HHHHHHHHHH ');
			}).bind(EntityType));
		}
		Sm.CONFIG.DEBUG && console.log(Sm, Sm.spwashi_config);
	});
});