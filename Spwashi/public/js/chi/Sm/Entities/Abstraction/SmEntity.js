/**
 * Created by Sam Washington on 7/18/16.
 */
require(["Sm-Core-Core"], function () {
	Sm.loaded.when_loaded("Core", function () {
		var entity_obj                   = Sm.spwashi_config.entities;
		var SmEntityProperties           = ['Meta', 'MvCombo', 'Wrapper', 'View', 'Garage', 'Model', 'Abstraction'];
		var SmEntity                     = function (EntityName) {
			this.type = EntityName;
			for (var i = 0; i < SmEntityProperties.length; i++) {
				var p_name   = SmEntityProperties[i];
				this[p_name] = null;
			}
		};
		SmEntity.prototype.complete      = function () {
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
			/**
			 * @type Sm.Core.Meta
			 */
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
			var config                = entity_obj[this.type.replace('__', '|')];
			config.model_type         = EntityType;
			this.Meta.configure(config);
		};
		Sm.Entities.Abstraction.SmEntity = SmEntity;
		Sm.loaded.add("Entities_Abstraction_SmEntity");
		var has                          = {
			Section:    ['templates-_template', 'templates-standard', 'Meta', 'Model', 'View', 'Garage', 'MvCombo', 'Wrapper', 'Abstraction-Relationship-pivots_RelationshipIndex', 'Abstraction-Modal-ModalEdit', 'templates-definition'],
			Collection: ['templates-_template', 'templates-standard', 'Meta', 'View'],
			Concept:    ['templates-_template', 'templates-standard', 'Meta', 'View'],
			Page:       ['templates-_template', 'templates-standard', 'Meta', 'View', 'Garage'],
			Dictionary: ['templates-_template', 'templates-standard', 'Meta', 'View', 'Garage', 'MvCombo', 'Wrapper'],
			Dimension:  ['templates-_template', 'templates-standard', 'Meta', 'View', 'Wrapper']
		};
		for (var EntityType in entity_obj) {
			if (!entity_obj.hasOwnProperty(EntityType)) continue;
			EntityType              = EntityType.replace('|', '__');
			Sm.Entities[EntityType] = new SmEntity(EntityType);
			var _entity_has         = has[EntityType] || [];
			var when_loaded         = ['Core', 'Entities-Abstraction-Garage'];
			var req                 = ['Sm-Core-Core', 'Sm-Entities-Abstraction-Garage'];

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
					(EntityType.indexOf("__") === -1) && Sm.Extras.visual_debug(EntityType + ' has been loaded!');
				}
			})(EntityType), 'entities_' + EntityType).then(function (e, d, r) {}).catch((function (e) {
				Sm.CONFIG.DEBUG && console.log(e, ' could not be loaded ');
			}).bind(null, EntityType));
		}
		Sm.CONFIG.DEBUG && console.log(Sm, Sm.spwashi_config);
	});
});