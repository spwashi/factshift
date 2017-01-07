/**
 * Created by Sam Washington on 12/9/16.
 */
define(['require', 'Sm', 'jquery', 'Emitter', 'Sm-Abstraction-Views-View', 'Sm-Abstraction-RelationshipIndex-_template'], function (require, Sm, $, Emitter) {
    Sm.Core.dependencies.on_load(['Abstraction-Views-View', 'Abstraction-RelationshipIndex-_template'], function () {
        /**
         * @class Sm.Abstraction.RelationshipIndexView
         * @extends Sm.Abstraction.Views.View
         */
        Sm.Abstraction.Views.RelationshipIndexView = Sm.Abstraction.Views.View.extend(
            {
                object_type:       'RelationshipIndexView',
                initialize:        function (settings) {
                    /** @type {Sm.Abstraction.RelationshipIndex}  */
                    this.elements = {items: null};
                    Sm.Abstraction.Views.View.prototype.initialize.apply(this, arguments);

                    var RelationshipIndex = this.getResource();
                    var Self              = this;

                    RelationshipIndex.on('add_Relationship', function (Relationship, position, context_id) {
                        Self.initRelatedElements();
                    })
                },
                setReferencePoint: function (ReferencePoint) {
                    if (!ReferencePoint || !(typeof ReferencePoint === "object") || !ReferencePoint.isIdentifiable) {
                        var Resource = this.getResource();
                        var res;
                        if (res = this.setReferencePoint(Resource)) return res;
                    }
                    this.ReferencePoint = null;
                },
                getItemElements:   function () {
                    return this.$el.children();
                },

                getGarage: function () {
                    return Sm.Abstraction.RelationshipIndex.getGarage();
                },

                /**
                 * Make sure the elements that are already under the RelationshipIndexView are initialized and
                 * all that Jazz.
                 *
                 * @param end_item_elements
                 * @return {*|Promise}
                 * @private
                 */
                _initExistentElements:    function () {
                    var end_item_elements = this.elements.items = this.elements.items || {};
                    var children                 = this.getItemElements();
                    var children_count           = children.length;
                    var RelationshipIndex        = this.getResource();
                    var context_id               = null;
                    var Self                     = this;
                    /**
                     * Callback to run when the entity_type of the element has been loaded
                     * @param {Sm.entity_type}  entity_type         The Entity Type of the element that we are going to try to initialize
                     * @param {HTMLElement}     el                  The Element that we are going to hydrate
                     * @param {{}}              end_item_elements   An object that will contain the elements that have been initialized already
                     * @return {*}
                     */
                    var get_when_loaded_callback = function (entity_type, el, end_item_elements) {
                        return function () {
                            return Sm.Core.Meta.getSmEntity(entity_type).Wrapper
                                     .hydrate_element(el, Self)
                                     .then(function (View) {
                                         var Entity = View.getResource();
                                         if (!Entity) return null;
                                         var Relationship               = RelationshipIndex.getItem(RelationshipIndex.indexOf(Entity, context_id), context_id);
                                         /** @type {Sm.r_id} entity_r_id */
                                         var entity_r_id                = Entity.getR_ID();
                                         end_item_elements[entity_r_id] = {
                                             View:         View,
                                             Relationship: Relationship
                                         };

                                         return View.el;
                                     });
                        }
                    };

                    var promise_array = [];

                    /**
                     *
                     */
                    for (var i = 0; i < children_count; i++) {
                        var el          = children[i];
                        var entity_type = Sm.Abstraction.Views.EntityView.getEntityType(el);
                        if (!entity_type) continue;

                        /**
                         * Function to run once the entity type has been loaded
                         * @type {function} when_loaded
                         * @return {Promise<HTMLElement>}
                         */
                        var when_loaded       = get_when_loaded_callback(entity_type, el, end_item_elements);
                        var on_entity_promise = Sm.Core.dependencies
                                                  .on_load(entity_type, when_loaded)
                                                  .catch(function (e) {
                                                      Sm.CONFIG.DEBUG && console.log(e);
                                                      return null;
                                                  });

                        promise_array.push(on_entity_promise);
                    }
                    return Promise.all(promise_array);
                },
                _initNonexistentElements: function () {
                    var end_item_elements = this.elements.items = this.elements.items || {};
                    var ReferencePoint = this.getReferencePoint();
                    var reference_id   = ReferencePoint && ReferencePoint.getR_ID && ReferencePoint.getR_ID();

                    var RelationshipIndex = this.getResource();
                    var related_items     = RelationshipIndex.getItems(reference_id || null);
                    var RelIndEntity      = RelationshipIndex.getResource();
                    var promise_array     = [];
                    /**
                     * Iterate through the items that are /supposed/ to be in the RelationshipIndex, seeing if they have already been initialized.
                     * If so, skip them and continue.
                     * Otherwise, render them and add them to an object indexed by r_id
                     */
                    for (var related_r_id in related_items) {
                        if (!related_items.hasOwnProperty(related_r_id)) continue;
                        if (related_r_id in end_item_elements) continue;
                        // If we've already initialized the elements, don't do it again

                        var Relationship = related_items[related_r_id];

                        // Get the entities that are not the one that holds this RelationshipIndex
                        var other_entities = Relationship.getOtherEntities(RelIndEntity.getR_ID());

                        // Not entirely sure how to deal with Relationships that hold more than two relations
                        if (other_entities.length > 1) return Promise.reject("Not sure how to handle relationships between more than two Entities!");

                        /** @type {Sm.Abstraction.Entity} OtherEntity The Entity that isn't the one holding this RelationshipIndex */
                        var OtherEntity = other_entities[0];
                        if (!OtherEntity) continue;

                        /** @type {Sm.Abstraction.Views.View} OtherView A View belonging to the OtherEntity */
                        var OtherView = OtherEntity.initNewView(null, this);
                        if (!OtherView) continue;
                        var relationship_obj = {
                            View:         OtherView,
                            Relationship: Relationship
                        };
                        OtherView.setDisplayType(this.display_type);
                        // Render the Other View and add it to the end_item_elements
                        var render_promise = OtherView.render().then((function (related_r_id, relationship_obj) {
                            return function (res) {
                                end_item_elements[related_r_id] = relationship_obj;
                                return res;
                            }
                        })(related_r_id, relationship_obj)).catch(function (e) {
                            Sm.CONFIG.DEBUG && console.log(e);
                            return null;
                        });

                        //Render the Other View
                        promise_array.push(render_promise);
                    }

                    return Promise.all(promise_array);
                },
                _generateOuterHTML:       function (is_synchronous) {
                    var Entity = this.getResource();
                    var Garage = this.getGarage();
                    return Garage.generate('body_outer.' + this.display_type, Entity, {is_synchronous: is_synchronous})
                },
                _generateInnerHTML:       function (is_synchronous) {
                    var Entity = this.getResource();
                    var Garage = this.getGarage();
                    return Garage.generate('body.' + this.display_type, Entity, {is_synchronous: is_synchronous})
                },
                /**
                 * Make sure the Views that correspond to the Entities related via this RelationshipIndex
                 * (that aren't the Entity holding this Relationship) are initialized properly
                 * @return {*}
                 */
                initRelatedElements:      function () {
                    var Self              = this;
                    var RelationshipIndex = this.getResource();
                    var RelIndEntity      = RelationshipIndex.getResource();
                    if (!RelIndEntity) return Promise.reject("The relation;ship index is not complete without an Entity");

                    var end_item_elements;

                    end_item_elements = this.elements.items = this.elements.items || {};

                    var render_el;
                    if (this.display_type === "preview") {
                        render_el = function (ViewObject) {
                            var View = ViewObject.View;
                            View.setDisplayType(Self.display_type);
                            var Relationship     = ViewObject.Relationship;
                            var RelationshipView = Relationship.convertToView(null, Self);
                            Sm.CONFIG.DEBUG && console.log(RelationshipView);
                            RelationshipView.setDisplayType(Self.display_type);
                            RelationshipView.setActiveViews([View]);
                            return RelationshipView.render();
                        }
                    } else {
                        render_el = function (ViewObject) {
                            return ViewObject.View.getElement();
                        }
                    }

                    return this._initExistentElements()
                               .then(function (res) {
                                   return Self._initNonexistentElements();
                               })
                               .then(function () {
                                   var ReferencePoint        = Self.getReferencePoint();
                                   var context_id            = ReferencePoint && ReferencePoint.getR_ID && ReferencePoint.getR_ID();
                                   var Views                 = RelationshipIndex.order_object(end_item_elements, context_id);
                                   var all_elements_rendered = [];
                                   for (var i = 0; i < Views.length; i++) {
                                       all_elements_rendered.push(render_el(Views[i]));
                                   }
                                   return Promise.all(all_elements_rendered);
                               })
                               .then(function (elements) {
                                   Self.$el.append(elements);
                                   elements.forEach(function (item) {
                                       if (!item || typeof  item !== "object") return;
                                       if (item.FactshiftView) item.FactshiftView.refresh();
                                   });
                                   Self.emit('init_RelatedElements');
                               });
                },
                refresh:                  function () {
                    var res  = Sm.Abstraction.Views.View.prototype.refresh.apply(this, arguments);
                    var Self = this;
                    Sm.Core.dependencies.on_load('Abstraction_Entity:Viewable', function () {
                        Self.initRelatedElements();
                    });
                    return res;
                }
            });

        Emitter.mixin(Sm.Abstraction.Views.RelationshipIndexView.prototype);
    }, 'Abstraction-Views-RelationshipIndexView');
});