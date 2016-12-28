/**
 * Created by Sam Washington on 11/8/16.
 */
define(['require', 'Sm', 'Emitter', 'Sm-Core-Core'], function (require, Sm, Emitter) {
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
                this._info               = Sm.Entities._info.entities[entity_type];
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
    Sm.Core.dependencies.add('Core_SmEntity');
});