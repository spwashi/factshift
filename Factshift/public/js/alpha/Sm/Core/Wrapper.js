/**
 * Created by Sam Washington on 11/6/16.
 */
require(['require', 'Sm', 'Emitter', 'jquery'], function (require, Sm, Emitter, $) {
    Sm.Core.Wrapper = Emitter.extend(
        {
            object_type:     'Wrapper',
            init:            function (entity_type) {
                this.entity_type    = entity_type;
                this.entityStatuses = {
                    selected:  {},
                    focused:   {},
                    active:    {},
                    loaded:    {},
                    destroyed: {}
                }
            },
            /**
             *
             * @param json_models
             * @param {Array<HTMLElement>}elements
             * @return {Sm.Core.Wrapper}
             */
            hydrate:         function (json_models, elements) {
                json_models  = json_models || false;
                elements     = elements || false;
                var _model   = json_models;
                var Self     = this;
                var SmEntity = Sm.Core.Meta.getSmEntity(this.entity_type);
                if (!SmEntity) throw new Sm.Exceptions.Error("No SmEntity for " + this.entity_type, arguments);
                if (json_models) {
                    if (Sm.Core.Util.isArray(json_models)) {
                        for (var i = 0; i < json_models.length; i++) {this.hydrate_entity(json_models[i]); }
                    } else this.hydrate_entity(_model);
                }
                if (!elements || !elements.length) return this;
                var el, j;
                try {
                    for (j = 0; j < elements.length; j++) {this.hydrate_element(elements[j]);}
                } catch (e) {
                    Sm.CONFIG.DEBUG && console.log(e);
                }
                return this;
            },
            hydrate_entity:  function (entity) {
                var Self        = this;
                var when_loaded = function () {
                    try {
                        return Self.initEntity({entity: entity});
                    } catch (e) {
                        Sm.CONFIG.DEBUG && console.log(e);
                        return false;
                    }
                };
                return Sm.Core.dependencies.on_load('Entities-' + this.entity_type + '-Entity', when_loaded);
            },
            hydrate_element: function (el, ReferencePoint) {
                var Self      = this;
                var data_set  = el.dataset || {id: null, ent_id: null, model: null};
                var raw_model = data_set.model || "null";
                var _model    = JSON.parse(raw_model);
                // Once we have this, remove the model from the element
                delete data_set.model;

                var when_loaded_fn = (function (_model, data_set) {
                    return function () {
                        var Entity = _model ? Self.initEntity({entity: _model}) : Self.initEntity(data_set);
                        if (!Entity) return Promise.reject("Could not initialize element without an entity");
                        try {
                            var View = Entity.getView(ReferencePoint) || Entity.convertToView(el);
                            Entity.addView(View);
                            View.refresh();
                            return View;
                        } catch (e) {
                            throw new Sm.Exceptions.Error(e.message, [Entity, el], null, e);
                        }
                    }
                })(_model, data_set);

                return Sm.Core.dependencies.on_load(['Abstraction_Entity:Viewable'], when_loaded_fn).then(function (result) {
                    'model' in el.dataset && delete el.dataset.model;
                    return result;
                });
            },
            /**
             *
             * @param {{}=}              settings
             * @param {Sm.json_entity=}  settings.entity
             * @param {Sm.id=}           settings.id
             * @param {Sm.ent_id=}       settings.ent_id
             * @throws Sm.Exceptions.Error
             * @returns {Sm.Abstraction.Entity|boolean}
             */
            initEntity:      function (settings) {
                settings        = settings || {};
                /** @type {Sm.json_entity|boolean}  */
                var entity      = settings.entity || false;
                var entity_type = this.entity_type || Sm.Core.Meta.getEntityType(entity);
                entity          = entity || {};
                var model       = entity.attributes || {};
                /**
                 *
                 * @type {Sm.Abstraction.Entity}
                 */
                var Entity      = Sm.Core.Identifier.identify({
                                                                  id:          model.id || settings.id || false,
                                                                  ent_id:      model.ent_id || settings.ent_id || false,
                                                                  entity_type: entity_type
                                                              });
                if (Entity) {
                    Entity.refresh(model);
                    return Entity;
                }

                var SmEntity = Sm.Core.Meta.getSmEntity(entity_type);
                if (!SmEntity) throw Sm.Exceptions.Error("Could not match model to entity type", [settings, SmEntity]);
                /** @type {Sm.Abstraction.Entity} EntityType */
                var EntityType = SmEntity.Entity;
                if (!EntityType) throw Sm.Exceptions.Error("Could not initialize entity (entity type missing)", [settings, Object.keys(SmEntity), Object.keys(Sm.Entities), entity_type]);
                Entity                                        = new EntityType(entity, {
                    id:          model.id || settings.id || false,
                    ent_id:      model.ent_id || settings.ent_id || false,
                    entity_type: entity_type
                });
                this.entityStatuses.loaded[Entity.getEntId()] = Entity;
                return Entity;
            },

            checkEntityStatus:    function (entity, status) {Sm.CONFIG.DEBUG && console.log('implement')},
            registerEntityStatus: function (entity, status) {Sm.CONFIG.DEBUG && console.log('implement')},
            removeEntityStatus:   function (entity, status) {Sm.CONFIG.DEBUG && console.log('implement')}

        });
    require(['Sm-Abstraction-Selector']);
    Sm.Core.dependencies.on_load(['Abstraction-Stateful', 'Abstraction-Selector'], function () {
        Sm.Core.Util.mixin(Sm.Abstraction.Selector, Sm.Core.Wrapper);
        Sm.Core.Util.mixin(Sm.Abstraction.Stateful, Sm.Core.Wrapper);
    }, 'Core_Wrapper');
});