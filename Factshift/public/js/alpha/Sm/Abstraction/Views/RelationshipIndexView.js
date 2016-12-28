/**
 * Created by Sam Washington on 12/9/16.
 */
define(['require', 'Sm', 'jquery', 'Emitter', 'Sm-Abstraction-Views-View'], function (require, Sm, $, Emitter) {
    Sm.Core.dependencies.on_load('Abstraction-Views-View', function () {
        /**
         * @class Sm.Abstraction.RelationshipIndexView
         * @extends Sm.Abstraction.Views.View
         */
        Sm.Abstraction.Views.RelationshipIndexView = Sm.Abstraction.Views.View.extend(
            {
                object_type:     'RelationshipIndexView',
                initialize:      function (settings) {
                    /** @type {Sm.Abstraction.RelationshipIndex}  */
                    this.elements = {items: null};
                    Sm.Abstraction.Views.View.prototype.initialize.apply(this, arguments);

                    var RelationshipIndex = this.getResource();
                    var Self              = this;

                    RelationshipIndex.on('add_Relationship', function (Relationship, position, context_id) {
                        var self_context_id = Self.getContext && Self.getContext() && Self.getContext().getR_ID();
                        Self.initRelatedElements();
                    })
                },
                setContext:      function (Context) {
                    if (!Context || !(typeof Context === "object") || !Context.isIdentifiable) {
                        var Resource = this.getResource();
                        var res;
                        if (res = this.setContext(Resource)) return res;
                    }
                    this.Context = null;
                },
                getItemElements: function () {
                    return this.$el.children();
                },

                /**
                 * Make sure the elements that are already under the RelationshipIndexView are initialized and
                 * all that Jazz.
                 *
                 * @param end_item_elements
                 * @return {*|Promise}
                 * @private
                 */
                _initExistentElements:    function (end_item_elements) {
                    var children                 = this.getItemElements();
                    var children_count           = children.length;
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
                                     .hydrate_element(el)
                                     .then(function (View) {
                                         var Entity = View.getResource();
                                         if (!Entity) return null;

                                         /** @type {Sm.r_id} entity_r_id */
                                         var entity_r_id                = Entity.getR_ID();
                                         end_item_elements[entity_r_id] = View.el;

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
                _initNonexistentElements: function (end_item_elements) {
                    var Context    = this.getContext();
                    var context_id = Context && Context.getR_ID && Context.getR_ID();

                    var RelationshipIndex = this.getResource();
                    var related_items     = RelationshipIndex.getItems(context_id || null);
                    var RelIndEntity      = RelationshipIndex.getResource();
                    var promise_array     = [];
                    /**
                     * Iterate through the items that are /supposed/ to be in the RelationshipIndex, seeing if they have already been initialized.
                     * If so, skip them and continue.
                     * Otherwise, render them and add them to an object indexed by r_id
                     */
                    for (var related_r_id in related_items) {
                        if (!related_items.hasOwnProperty(related_r_id)) continue;

                        // If we've already initialized the elements, don't do it again
                        if (related_r_id in end_item_elements) continue;

                        var relationship = related_items[related_r_id];

                        // Get the entities that are not the one that holds this RelationshipIndex
                        var other_entities = relationship.getOtherEntities(RelIndEntity.getR_ID());

                        // Not entirely sure how to deal with Relationships that hold more than two relations
                        if (other_entities.length > 1) return Promise.reject("Not sure how to handle relationships between more than two Entities!");

                        /** @type {Sm.Abstraction.Entity} OtherEntity The Entity that isn't the one holding this RelationshipIndex */
                        var OtherEntity = other_entities[0];
                        if (!OtherEntity) continue;

                        /** @type {Sm.Abstraction.Views.View} OtherView A View belonging to the OtherEntity */
                        var OtherView = OtherEntity.initNewView();
                        if (!OtherView) continue;

                        // Render the Other View and add it to the end_item_elements
                        var render_promise = OtherView.render({is_synchronous: false}).then(function (res) {
                            end_item_elements[related_r_id] = res;
                            return res;
                        }).catch(function (e) {
                            Sm.CONFIG.DEBUG && console.log(e);
                            return null;
                        });

                        //Render the Other View
                        promise_array.push(render_promise);
                    }

                    return Promise.all(promise_array);
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
                    if (!RelIndEntity) return Promise.reject("The relationship index is not complete without an Entity");

                    var end_item_elements = Sm.Core.Util.merge_objects({}, this.elements.items);

                    return this._initExistentElements(end_item_elements)
                               .then(function (res) {
                                   return Self._initNonexistentElements(end_item_elements);
                               })
                               .then(function () {
                                   var Context         = Self.getContext();
                                   var context_id      = Context && Context.getR_ID && Context.getR_ID();
                                   Self.elements.items = end_item_elements;
                                   Self.$el.append(RelationshipIndex.order_object(end_item_elements, context_id));
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