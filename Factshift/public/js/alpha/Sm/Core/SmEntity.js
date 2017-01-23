/**
 * Created by Sam Washington on 11/8/16.
 */
define(['require', 'Sm', 'Emitter', 'Sm-Core-Core'], function (require, Sm, Emitter) {
    var entity_config_object = Sm.Entities._info.entities || {};

    /**
     * @class Sm.Core.SmEntity
     *
     * @property {Sm.Core.Meta} Meta
     */
    Sm.Core.SmEntity = Emitter.extend(
        {
            register:                 function (name, item) {
                this[name] = item;
            },
            init:                     function (entity_type) {
                Sm.Entities[entity_type] = this;
                this.entity_type         = entity_type || this.entity_type || false;
                this.Abstraction         = this.Abstraction || {};
                this.templates           = this.templates || {};
                this._info               = entity_config_object[entity_type];
                if (this.entity_type) {
                    this._createDefaultProperties();
                    Sm.Core.dependencies.add('SmEntity:' + this.entity_type);
                    Sm.Core.Meta.emit('add_entity_type', this.entity_type);
                }
                else throw new Sm.Exceptions.Error("Trying to initialize non-existent SmEntity", entity_type);
            },
            _createDefaultProperties: function () {
                var Self       = this;
                var EntityType = Self.entity_type && Self.entity_type.indexOf('|') > -1 ? Sm.Abstraction.MapEntity : Sm.Abstraction.Entity;

                /**
                 * @var {Sm.Core.Meta}
                 */
                this.Meta = this.Meta || (function (Self) {
                        var Meta = new Sm.Core.Meta.Proto(Self.entity_type);
                        Sm.Core.dependencies.add('Entities-' + Self.entity_type + '-Meta');
                        return Meta;
                    })(Self);

                Self.Model = Self.Model || (function (Self) {
                        var Model = Sm.Abstraction.Model.extend({defaults: Self.Meta.getDefaultAttributes()});
                        Sm.Core.dependencies.add('Entities-' + Self.entity_type + '-Model');
                        return Model;
                    })(Self);

                Self.Wrapper = Self.Wrapper || (function (Self) {
                        var Wrapper = new Sm.Core.Wrapper(Self.entity_type);
                        Sm.Core.dependencies.add('Entities-' + Self.entity_type + '-Wrapper');
                        return Wrapper;
                    })(Self);

                Self.Entity = Self.Entity || (function (Self) {
                        var Entity = EntityType.extend({entity_type: Self.entity_type});
                        Sm.Core.dependencies.add('Entities-' + Self.entity_type + '-Entity');
                        return Entity;
                    })(Self);

                Self.Garage = Self.Garage || (function (Self) {
                        return new (Sm.Abstraction.Garage.extend({}))(Self.entity_type)
                    })(this);

                Self.View = Self.View || (function (Self) {
                        var View = Sm.Abstraction.Views.EntityView.extend({
                                                                              entity_type:   Self.entity_type,
                                                                              resource_type: Self.entity_type + '_Entity'
                                                                          });
                        Sm.Core.dependencies.add('Entities-' + Self.entity_type + '-View');
                        return View;
                    })(Self);

                Self.templates = Self.templates || {};
            }
        });

    Sm.Core.SmEntity._get_config = function (entity_name) {
        entity_name = entity_name.split('|').sort().join('|');
        return Promise.resolve(entity_config_object[entity_name] || null)
    };

    Sm.Core.SmEntity._on_entity_load = function (entity_name) {
        Sm.Core.dependencies.add(entity_name);
        var lower           = entity_name.toLowerCase();
        var html_identifier = '.factshift-' + lower;
        var models_string   = document.getElementById(lower + '_models');
        var SmEntity        = Sm.Core.Meta.getSmEntity(entity_name);
        var elements        = lower.indexOf('|') > 0 ? [] : $(html_identifier).toArray();
        var models_json     = models_string ? JSON.parse(models_string.textContent) : null;
        try { SmEntity.Wrapper.hydrate(models_json, elements);} catch (e) {Sm.CONFIG.DEBUG && console.log(e, models_json); }
    };
    Sm.Core.SmEntity._require_entity = function (entity_name, dependencies) {
        dependencies = dependencies || [];
        if (dependencies.indexOf(entity_name + 'Entity') < 0) new Sm.Core.SmEntity(entity_name);
        var r  = dependencies.map(function (t) {return 'Sm-Entities-' + entity_name + '-' + t;});
        var wl = dependencies.map(function (t) {return 'Entities-' + entity_name + '-' + t;});
        r.length && require(r);
        return Sm.Core.dependencies.on_load(wl, Sm.Core.SmEntity._on_entity_load.bind(null, entity_name), entity_name);
    };
    Sm.Core.SmEntity.load_entity     = function (entity_name, dependencies) {
        return Sm.Core.SmEntity._get_config(entity_name).then(function (entity_config) {
            return Sm.Core.SmEntity._require_entity(entity_name, dependencies);
        }).catch(function (e) {
            Sm.CONFIG.DEBUG && console.log(e);
        });
    };

    Sm.Core.dependencies.add('Core_SmEntity');
});