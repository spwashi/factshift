/**
 * Created by Sam Washington on 11/13/16.
 */
define(['require', 'Sm', 'jquery', 'Sm-Abstraction-Views-View'], function (require, Sm, $) {
    Sm.Core.dependencies.on_load('Abstraction-Views-View', function () {
        /**
         * @class Sm.Abstraction.EntityView
         * @alias Sm.Abstraction.Views.EntityView
         * @extends Sm.Abstraction.Views.View
         */
        Sm.Abstraction.Views.EntityView = Sm.Abstraction.Views.View.extend(
            {
                object_type: 'EntityView',

//------------------------
//--    Initialization Functions
//------------------------
                /**
                 *
                 * @param settings
                 */
                initialize:                    function (settings) {
                    this.display_type = 'full';
                    this.elements     = this.elements || {};
                    Sm.Abstraction.Views.View.prototype.initialize.apply(this, arguments);
                    var Resource = this.getResource();
                    if (!Resource || !Resource.on) return;
                    var Self = this;
                    Resource.on('update', function (changed) {
                        Self.update(changed);
                    });
                    Resource.on('destroy', function () {Self.destroy();});
                },
//------------------------
//--    Mixin Functions
//------------------------
                /**
                 * Refresh the View
                 * @return {*}
                 */
                refresh:                       function () {
                    this._initPermissions();
                    return Sm.Abstraction.Views.View.prototype.refresh.apply(this, arguments);
                },
                /**
                 * Return an object that represents the context in which something happens
                 * @return {Sm.context_object}
                 */
                findNearestRelationship:       function () {
                    var Self = this;
                    var $closest_relationship_holder;
                    var OtherEntity;
                    var relationship_r_id, Relationship_, relationship_index;
                    if (($closest_relationship_holder = this.$el.closest('[data-relationship-r_id]')) && $closest_relationship_holder.length) {
                        relationship_r_id = $closest_relationship_holder.data('relationship-r_id');
                        Relationship_     = Sm.Core.Identifier.identify(relationship_r_id);
                    } else {
                        $closest_relationship_holder = this.$el.parents('[data-ent_id]').eq(0);
                        if ($closest_relationship_holder.length) {
                            relationship_index = $closest_relationship_holder.data('relationship_index');
                            var ent_id         = $closest_relationship_holder.data('ent_id');
                            OtherEntity        = Sm.Core.Identifier.identify(ent_id);
                            if (OtherEntity)
                                Relationship_ = OtherEntity.getRelationship(this.getResource(), relationship_index);
                        }
                    }

                    return {
                        Relationship:       Relationship_,
                        OtherEntity:        OtherEntity || null,
                        el:                 $closest_relationship_holder[0],
                        relationship_index: relationship_index
                    }
                },
//------------------------
//--    Mixin Functions
//------------------------
                /**
                 * Check to see the status of a View
                 * First queries the Entity, then this
                 * @param status
                 * @return {*}
                 */
                queryStatus:                   function (status) {
                    var value;
                    var Entity = this.getResource();
                    if (Entity && (value = Entity.queryStatus(status)) !== null) return value;
                    return Sm.Abstraction.Views.View.prototype.queryStatus.apply(this, arguments);
                },
                /**
                 * Check to see the permissions of a View.
                 * First queries the Entity, then this
                 * @param permission
                 * @return {*}
                 */
                queryPermission:               function (permission) {
                    var value;
                    var Entity = this.getResource();
                    if (Entity && (value = Entity.queryPermission(permission)) !== null) return value;
                    return Sm.Abstraction.Views.View.prototype.queryPermission.apply(this, arguments);
                },
//------------------------
//--    Event Functions
//------------------------
                events:                        {
                    click:   function (e) {this._click(e)},
                    keydown: function (e) {this._keydown(e)}
                },
                _keydown:                      function () {return true;},
                _click:                        function (e) {
                    var target            = e.target;
                    var $target           = $(target);
                    var _is_button        = $target.hasClass('button');
                    var is_button_of_type = function (type) {
                        return _is_button && $target.hasClass(type);
                    };
                    var context_object    = this.findNearestRelationship();
                    var SelfEntity        = this.getResource();

                    if (is_button_of_type('edit')) {
                        SelfEntity && SelfEntity.isEditable && SelfEntity.prompt_edit(context_object.Relationship);
                        e.stopPropagation();
                        return null;
                    } else if (is_button_of_type('add')) {
                        SelfEntity && SelfEntity.canRelate && SelfEntity.prompt_add_relationship(context_object.Relationship);
                        e.stopPropagation();
                        return null;
                    } else if (is_button_of_type('destroy')) {
                        SelfEntity && SelfEntity.isDestroyable && SelfEntity.prompt_destroy(context_object.Relationship);
                        e.stopPropagation();
                        return null;
                    } else if (is_button_of_type('debug')) {
                        Sm.CONFIG.DEBUG && console.log(' -------------------------------- ');
                        Sm.CONFIG.DEBUG && console.log(' ---   ', this.cid, ' - ', SelfEntity ? SelfEntity.getR_ID() : ' - ');
                        Sm.CONFIG.DEBUG && console.log(SelfEntity);
                        Sm.CONFIG.DEBUG && console.log(this);
                        Sm.CONFIG.DEBUG && console.log(' -------------------------------- ');
                        e.stopPropagation();
                    }
                    return true;
                },
//------------------------
//--    Element Handling
//------------------------
                _generateOuterHTML:            function (is_synchronous) {
                    var Entity = this.getResource();
                    var Garage = Sm.Core.Meta.getSmEntityAttribute(Entity, 'Garage') || new (Sm.Abstraction.Garage);
                    return Garage.generate('body_outer.' + this.display_type, Entity, {is_synchronous: is_synchronous})
                },
                _generateInnerHTML:            function (is_synchronous) {
                    var Entity = this.getResource();
                    var Garage = Sm.Core.Meta.getSmEntityAttribute(Entity, 'Garage') || new (Sm.Abstraction.Garage);
                    return Garage.generate('body.' + this.display_type, Entity, {is_synchronous: is_synchronous})
                },
                /**
                 * Initialize the things that make this Element interactable in certain contexts.
                 * E.g. editable, destroyable, etc.
                 * @private
                 */
                _initPermissions:              function () {
                    var Self = this;
                    this.queryPermission('destroy') && this.$el.addClass('can-destroy');
                    this.queryPermission('view') && this.$el.addClass('can-view');
                    this.queryPermission('view') && this.$el.addClass('can-focus');
                    Self.queryPermission('edit') && Self.$el.addClass('can-drag');
                    Sm.Core.dependencies.on_load(['Abstraction_Entity:Editable'], function () {
                        Self.queryPermission('relate') && Self.$el.addClass('can-relate');
                        Self.queryPermission('edit') && Self.$el.addClass('can-edit');
                    });
                },
                /**
                 * Destroy the View
                 * @return {Promise}
                 */
                destroy:                       function () {
                    return Promise.resolve(this.remove())
                },
                update:                        function (changed) {
                    var Entity = this.getResource();
                    if (!Entity) return false;
                    var attributes = Entity.getAttributes();
                    if (!!changed && !Sm.Core.Util.isArray(changed)) {
                        if (typeof changed === "object") changed = Object.keys(changed);
                        else changed = [changed];
                    }
                    if (!changed || !changed.length) changed = false;
                    for (var attr in attributes) {
                        if (!attributes.hasOwnProperty(attr)) continue;
                        if (changed && (changed.indexOf(attr) < 0)) continue;

                        this.setAttributeElement(attr, attributes[attr]);
                    }
                    return true;
                },
                /**
                 * Get the HTMLElement that contains a certain RelationshipIndex
                 * @param relationship_index
                 * @return {HTMLElement|null}
                 */
                getRelationshipIndexContainer: function (relationship_index) {
                    var $el = this.$el || $(this.el);
                    return $el.children('.relationship-container[data-relationship_index="' + relationship_index + '"]')[0] || null;
                },
                /**
                 * Set the value of an attribute for this View.
                 * Calls a function like "this.setAttributeElement_(attribute_name)} if it exists,
                 * otherwise just sets the innerHTML
                 * @param attribute
                 * @param value
                 * @return {*}
                 */
                setAttributeElement:           function (attribute, value) {
                    if (this['setAttributeElement_' + attribute]) return this['setAttributeElement_' + attribute](value);

                    var element = this.getElement(attribute);
                    if (!element) return false;
                    if (typeof value === "string" || typeof value === "number") element.innerHTML = value;
                    return true;
                },
                /**
                 * Example for a "class" of functions
                 * @param value
                 * @return {boolean}
                 */
                setAttributeElement_example:   function (value) {
                    var element = this.getElement('example');
                    if (!element) return false;
                    if (typeof value === "string" || typeof value === "number") element.innerHTML = value;
                },
                /**
                 * Initialize the Element that represents this View
                 * @return {HTMLElement}
                 */
                initViewElement:               function () {
                    Sm.Abstraction.Views.View.prototype.initViewElement.apply(this, arguments);
                    // Initialize the permissions of a Relationship
                    this._initPermissions();

                    var Entity                = this.getResource();
                    var Self                  = this;
                    /** @type {Array} relationship_indices An array of the potential relationship types that can be held by a View */
                    var relationship_indices  = (Entity.getPotentialRelationshipTypes && Entity.getPotentialRelationshipTypes(true)) || [];
                    /**
                     * When Relationship Indices are viewable, initialize these relationship_indices
                     */
                    var initRelationshipViews = (function (Entity, relationship_indices) {
                        return function () {
                            for (var i = 0; i < relationship_indices.length; i++) {
                                var relationship_index = relationship_indices[i];
                                // Wait until we've initialized the RelationshipIndex to actually initialize the View
                                Entity.on('init_RelationshipIndex:' + relationship_index, function () {
                                    Self.initElement(relationship_index + '-relationship_index')
                                });
                            }
                        };
                    })(Entity, relationship_indices);

                    Sm.Core.dependencies.on_load(['Abstraction_RelationshipIndex:Viewable'], initRelationshipViews);
                    return this.el;
                },

                /**
                 * Either initialize the View element, or a property element within the View
                 * @param property
                 * @return {*}
                 */
                initElement: function (property) {
                    if (!property) return this.initViewElement();
                    var $el = this.$el || $(this.el);
                    if (property.indexOf('relationship_index') > -1) {
                        var relationship_index = property.split('-')[0];
                        var rel_el             = this.elements[property] = this.getRelationshipIndexContainer(relationship_index) || false;
                        if (!rel_el) return false;
                        var Entity            = this.getResource();
                        var RelationshipIndex = Entity.getRelationshipIndex(relationship_index);
                        var RelIndView        = RelationshipIndex.convertToView(rel_el, this);
                        if (RelIndView.el !== rel_el) {
                            $(rel_el).replaceWith(RelIndView.el);
                            RelIndView.refresh();
                        }
                        RelationshipIndex.addView(RelIndView);
                        return rel_el;
                    }
                    return this.elements[property] = $el.find('[data-attribute="' + property + '"]')[0] || false;
                },
                /**
                 * Get an Element that represents a property
                 * @param property
                 * @return {*}
                 */
                getElement:  function (property) {
                    if (!property) return this.el;
                    return this.elements[property] || this.initElement(property);
                }
///////////////////////////////////
            });
        /**
         * Get the entity type that an element references
         * @param el
         * @return {*}
         */
        Sm.Abstraction.Views.EntityView.getEntityType = function (el) {
            var Resource;
            if (el.FactshiftView) {
                if ((Resource = el.FactshiftView.getResource()) && (!!Resource.getEntityType)) {
                    return Resource.getEntityType()
                }
            }
            if (el.dataset && el.dataset.entity_type) return el.dataset.entity_type;
            if (el.dataset && el.dataset.ent_id) {
                Resource = Sm.Core.Identifier.identify(el.dataset.ent_id);
                if (Resource) return Resource.getEntityType();
            }
            return null;
        };
    }, 'Abstraction-Views-EntityView');
});