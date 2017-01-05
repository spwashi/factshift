/**
 * Created by Sam Washington on 12/5/16.
 */
define(['require', 'Sm', 'jquery', 'Sm-Abstraction-Prompt-Prompt', 'Sm-Abstraction-Modal-Modal'], function (require, Sm, $) {
    Sm.Core.dependencies.on_load(['Abstraction-Modal-Modal', 'Abstraction-Prompt-Prompt'], function () {
        Sm.Abstraction.Prompt.AddRelationshipPrompt = Sm.Abstraction.Modal.Modal.extend(
            {
                action:                       'add_relationship',
                /**
                 *
                 * @param settings
                 * @param settings.OtherEntity
                 * @param settings.Map
                 * @return {*}
                 */
                initialize:                   function (settings) {
                    settings = settings || {};
                    var ret  = Sm.Abstraction.Modal.Modal.prototype.initialize.apply(this, arguments);
                    if (settings.OtherEntity) this.OtherEntity = settings.OtherEntity || null;
                    this.Map                = settings.Map || null;
                    this.relationship_index = null;
                    return ret;
                },
                _generateInnerHTML:           function (is_synchronous) {
                    var Entity            = this.getResource();
                    var Garage            = Sm.Core.Meta.getSmEntityAttribute(Entity, 'Garage') || new (Sm.Abstraction.Garage);
                    var outer             = Garage.generate('modal_outer.add_relationship', {Resource: Entity, ReferencePoint: this.getReferencePoint()}, {is_synchronous: is_synchronous});
                    var inner             = Garage.generate('modal.add_relationship', Entity, {is_synchronous: is_synchronous});
                    var outer_html, inner_html;
                    var when_all_rendered = function () {
                        return outer_html.replace('__CONTENT__', inner_html);
                    };
                    if (!is_synchronous) {
                        return outer.then(function (result) {
                            outer_html = result;
                            return inner.then(function (result) {
                                inner_html = result;
                                return when_all_rendered();
                            })
                        })
                    } else {
                        outer_html = outer;
                        inner_html = inner;
                        return when_all_rendered();
                    }

                },
                on_add_relationship:          function (data, e) {
                    var form_attributes      = Sm.Abstraction.Views.View.get_attributes_from_form(
                        this.get_content_element(true).find('#map-form'),
                        '[data-attribute]');
                    var Entity               = this.getResource();
                    var Meta                 = Sm.Core.Meta.getSmEntityAttribute(Entity, 'Meta') || (Sm.Core.Meta);
                    var relationship_details = Meta.getRelationshipDetails(this.relationship_index) || null;
                    var OtherEntity          = this.OtherEntity || null;
                    var relationship_index   = this.relationship_index;
                    var OtherEntityType      = OtherEntity ? OtherEntity.entity_type : relationship_details.entity_type;
                    var map_type             = Meta.getMapEntityType(OtherEntityType) || null;

                    var MapSmEntity = Sm.Core.Meta.getSmEntity(map_type);
                    if (!MapSmEntity) return Promise.reject("Could not map relationship index");
                    var Map = this.Map || MapSmEntity.Meta.initEntity();
                    Map.setAttributes(form_attributes);
                    var Self = this;

                    var complete_add_relationship = function () {
                        return Entity.addRelationship(OtherEntity, relationship_index, Map).then(function (Relationship) {
                            if (Relationship) return Relationship.save().then(function () {Self.close()});
                            return null;
                        });
                    };

                    if (!OtherEntity) {
                        if (typeof OtherEntityType !== "string") return Promise.reject("Could not resolve other entity type");
                        var OtherSmEntity = Sm.Core.Meta.getSmEntity(OtherEntityType);
                        if (!OtherSmEntity) return Promise.reject("Could not resolve other entity type");
                        var OtherMeta = OtherSmEntity.Meta;
                        var create_entity;
                        OtherEntity   = OtherSmEntity.Meta.initEntity();
                        if (OtherMeta.getRequiredAttributes().length) {
                            create_entity = OtherEntity
                                && OtherEntity.isEditable
                                && OtherEntity.prompt_create();
                        }
                        create_entity = create_entity || OtherEntity.save();

                        return create_entity.then(complete_add_relationship);
                    }
                    return Promise.resolve(complete_add_relationship());
                },
                _getMap:                      function (relationship_index) {
                    if (!relationship_index) if (!this.Map) throw new Sm.Exceptions.Error("Not sure how to map these entities");

                    var Entity               = this.getResource();
                    /** @type {Sm.Core.Meta} Meta */
                    var Meta                 = Sm.Core.Meta.getSmEntityAttribute(Entity, 'Meta') || (Sm.Core.Meta);
                    var relationship_details = Meta.getRelationshipDetails(relationship_index) || null;
                    Sm.CONFIG.DEBUG && console.log(relationship_details);
                    var map_type = Meta.getMapTypeFromRelationshipIndex(relationship_index) || null;

                    if (map_type === Sm.Core.Meta.getEntityType(this.Map))  return this.Map;

                    var MapSmEntity = Sm.Core.Meta.getSmEntity(map_type);
                    if (!MapSmEntity) return Promise.reject("Could not map relationship index");

                    return this.Map = MapSmEntity.Meta.initEntity();
                },
                on_change_relationship_index: function (relationship_index, e) {
                    var select   = e.target || e;
                    var $select  = $(select);
                    var Entity   = this.getResource();
                    var $element = this.get_content_element(true);
                    if (!relationship_index) return Promise.resolve();
                    this.relationship_index = relationship_index;
                    var Garage              = Sm.Core.Meta.getSmEntityAttribute(Entity, 'Garage') || new (Sm.Abstraction.Garage);

                    var Map               = this._getMap(relationship_index);
                    var position;
                    var RelationshipIndex = Entity.getRelationshipIndex(relationship_index);
                    var context_id        = RelationshipIndex.getDefaultContextId();
                    position              = RelationshipIndex.count(context_id);
                    Map.setAttributes({'position': position});
                    return Garage
                        .generate(
                            'modal.add_relationship_type.[' + relationship_index + ']',
                            {Entity: Entity, Map: Map})
                        .then(function (map_form) {
                            var $el             = $(map_form);
                            var $change_element = $element.find('#map-form').eq(0);
                            if ($change_element[0]) {
                                $change_element.replaceWith($el);
                            } else {
                                $el.insertAfter($select.parent());
                            }
                        });
                }
            });
        Sm.Abstraction.Prompt.makePrompt(Sm.Abstraction.Prompt.AddRelationshipPrompt);
    }, 'Abstraction-Prompt-AddRelationshipPrompt');
});