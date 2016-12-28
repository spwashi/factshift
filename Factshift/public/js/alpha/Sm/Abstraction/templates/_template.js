/**
 * Created by Sam Washington on 11/14/16.
 */
define(['require', 'Sm'], function (require, Sm) {
    Sm.Abstraction.templates = Sm.Abstraction.templates || {};

    var Template = Sm.Abstraction.templates._template = {
        modal_outer:    {
            /**
             *
             * @param data
             * @param data.Resource
             * @param data.Context
             * @return {string}
             */
            edit:   function (data) {
                var Resource      = data.Resource || false;
                var Context       = data.Context || false;
                var resource_type = typeof Resource === "object" && Resource.getObjectType ? Resource.getObjectType() : null;
                var context_type  = typeof Context === "object" && Context.getObjectType ? Context.getObjectType() : null;

                var is_entity = (resource_type === "Entity");
                var template  = [
                    '<header><h3>Edit ' + (is_entity ? Resource.getEntityType() : resource_type) + '</h3></header>',
                    '<div class="content form aligned ">',
                    '__BUTTON_CONTROL__\n    __CONTENT__',

                    '<div class="button-container control_group">',
                    Template.modal.action_button({text: 'Save', action: 'save'})
                ];
                if (is_entity && context_type === 'Relationship') template.push(Template.modal.action_button({text: 'Edit Relationship', action: 'edit_relationship'}));
                template.push('</div>', '</div>');
                return template.join('');
            },
            create: function (data) {
                var Resource  = data.Resource || false;
                var type      = typeof Resource === "object" && Resource.getObjectType ? Resource.getObjectType() : '';
                var is_entity = (type === "Entity");
                var template  = [
                    '<header><h3>Create New ' + (is_entity ? Resource.getEntityType() : type) + '</h3></header>',
                    '<div class="content form aligned ">',
                    '__CONTENT__',

                    '<div class="button-container control_group">',
                    Template.modal.action_button({text: 'Create', action: 'save'}),
                    '</div>',

                    '</div>'
                ];
                template.push('</div>', '</div>');
                return template.join('');
            },

            destroy:          function (data) {
                var Resource  = data.Resource || false;
                var type      = typeof Resource === "object" && Resource.getObjectType ? Resource.getObjectType() : '';
                var is_entity = (type === "Entity");
                var template  = [
                    '<header><h3>Are you sure you want to delete this ' + (is_entity ? Resource.getEntityType() : type) + '?</h3></header>',
                    '<div class="content form aligned ">',

                    '<div class="button-container control_group">',
                    Template.modal.action_button({text: 'Destroy', action: 'destroy'}),
                    Template.modal.action_button({text: 'Cancel', action: 'cancel'}),
                    '</div>',

                    '</div>'
                ];
                template.push('</div>', '</div>');
                return template.join('');
            },
            add_relationship: function (data) {
                var Entity = data.Resource || false;
                if (!Entity) throw new Sm.Exceptions.Error("Could not figure out which relationship to add!");
                var type = typeof Entity === "object" && Entity.getEntityType ? Entity.getEntityType() : false;
                if (!type) throw new Sm.Exceptions.Error("No type!");

                var template = '<header>\n    <h3>Add relationship to ' + type + '</h3>\n</header>\n<div class="content form aligned no-button-control">\n    __CONTENT__\n</div>';
                return template;
            }
        },
        modal:          {
            /**
             *
             * @param button_config
             * @param button_config.text
             * @param button_config.action
             * @private
             */
            action_button:         function (button_config) {
                var inside = button_config.text;
                var action = button_config.action;

                return '<button class="action modal-button ' + action + '" data-action="' + action + '">' + inside + '</button>';
            },
            destroy:               '<div class="content">Are you sure you want to destroy these entities?</div>',
            /**
             * @this Sm.Abstraction.Garage
             * @return {string}
             */
            //
            add_relationship_type: function (data) {
                var Entity             = data.Entity || false;
                var OtherEntity        = data.OtherEntity || false;
                var relationship_index = data.relationship_index || null;
                var map_properties     = data.map_properties || false;
                var MapMeta            = Sm.Core.Meta;
                var Map                = data.Map || null;

                if (Map) {
                    var MapSmEntity = Sm.Core.Meta.getSmEntity(Map);
                    if (MapSmEntity) MapMeta = MapSmEntity.Meta;
                    if (MapMeta) map_properties = map_properties || MapMeta.getDefaultAttributes();
                }

                var p_arr = [];
                if (typeof map_properties === "object") {
                    if (Sm.Core.Util.isArray(map_properties)) {
                        p_arr = map_properties;
                    } else if (p_arr) {
                        for (var p_name in map_properties) {
                            if (!map_properties.hasOwnProperty(p_name)) continue;
                            p_arr.push(p_name);
                        }
                    }
                }

                var d = '<div class="form" id="map-form">\n  ';
                for (var p = 0; p < p_arr.length; p++) {
                    var property = p_arr[p];
                    d += _get_attribute_form_value(MapMeta, property);
                }
                d += '<div class="button-container control_group add_relationship-container">\n    <button class="action modal-button" data-action="add_relationship" data-data="">Add relationship</button>\n</div>\n</div>';
                return d;
            },
            add_relationship:      function (data) {
                var Entity = data;
                if (!Entity || !(typeof  Entity === "object") || !data.isIdentifiable) throw new Sm.Exceptions.Error("Not action on an entity!", data);
                var type = Entity.getEntityType();
                if (!type) throw new Sm.Exceptions.Error("No type!");
                var SmEntity           = Sm.Core.Meta.getSmEntity(Entity.getEntityType());
                var relationship_types = Entity.getPotentialRelationshipTypes();
                var count              = 0;
                var relationship_index;
                Sm.CONFIG.DEBUG && console.log(type, Sm.Entities.Section.Meta.getEntityType(Entity));
                for (relationship_index in relationship_types) {
                    if (!relationship_types.hasOwnProperty(relationship_index)) continue;
                    if (++count > 1) break;
                }

                var template = '<div class="control_group">\n    <label for="relationship_index">Relationship Type: </label>\n    <select class="relationship-attribute relationship_index select" data-action="change_relationship_index" data-attribute="relationship_index" id="relationship_index" name="relationship_index" ' + (count < 2 ? "disabled" : null) + '>\n    <option>Select one...</option>\n';
                for (relationship_index in relationship_types) {
                    if (!relationship_types.hasOwnProperty(relationship_index)) continue;
                    var name = relationship_types[relationship_index].index_singular;
                    name     = name.charAt(0).toUpperCase() + name.substr(1);
                    template
                        += '<option value="' + relationship_index + '"'
                        + (count < 2 ? ' disabled ' : '' ) + '>' + name + '</option>';
                }
                template += "</select>\n</div>";
                return template;
            }
        },
        body_outer:     {
            full: function (Entity) {
                var entity_type = (Sm.Core.Meta.getEntityType(Entity) || '').toLowerCase();
                var template    = [
                    '<div class="factshift-entity factshift-' + entity_type + '" data-entity_type="' + entity_type + '" data-ent_id="<%- typeof ent_id === \'string\' ?ent_id:\'\'%>" data-id="<%- typeof id !== \'undefined\'?id:\'\'%>">',
                    '__CONTENT__',
                    '</div>'
                ];
                return template.join('');
            }
        },
        body:           {
            full: '<div class="<%- typeof content === \'string\'?\'content\':(typeof alias === \'string\'?\'alias\':(!!title && typeof title === \'string\'?\'title\':\' \'))%>">\n    <%- typeof content === "string"?content:(typeof alias === "string"?alias:(typeof title === "string"?title:" "))%>\n</div>\n',
            /**
             * @this Sm.Abstraction.Garage
             * @param Resource
             */
            form: function (Resource) {
                var entity_type = Sm.Core.Meta.getEntityType(Resource) || this.entity_type;
                var SmEntity    = Sm.Core.Meta.getSmEntity(entity_type);
                if (!SmEntity) throw  new Sm.Exceptions.Error("Could not find entity type", [Resource, this]);
                var Meta               = SmEntity.Meta;
                var default_attributes = Meta.getApiSettableAttributes(Resource);

                var object_type = Resource.getObjectType ? Resource.getObjectType() : 'object';
                var r_id_string = Resource.getR_ID ? "data-r_id='" + Resource.getR_ID() + "'" : '';

                var template = ["<div class='form' " + r_id_string + ">"];
                for (var i = 0; i < default_attributes.length; i++) {
                    var attribute = default_attributes[i];
                    template.push(_get_attribute_form_value(Meta, attribute));
                }
                template.push("</div>");
                return template.join('\n');
            }
        },
        button_control: '<div class="icons button-control">\n    <i class="button edit fa fa-pencil"></i>\n    <i class="button destroy close fa fa-remove"></i>\n    <i class="button add fa fa-plus"></i>\n    <i class="button handle fa fa-arrows"></i>\n    <i class="debug button fa fa-question"></i>\n</div>',

    };
    Sm.Core.dependencies.add('Abstraction-templates-_template');

    function _get_attribute_form_value(Meta, attribute) {
        var attribute_template_inside    = '';
        var display_information          = Meta.getDisplayInformation(attribute);
        var attr_data_type               = display_information.type;
        var attr_display_name            = display_information.name;
        var attribute_template_beginning = '<div class="control_group">\n    <label for="__ATTR__">__ATTR_TITLE__:</label>\n';
        var attribute_template_end       = '<span class="error" id="__ATTR__-error"></span>\n</div>';
        switch (attr_data_type) {
            case "boolean":
                attribute_template_inside = '<input class="model edit __ATTR__" data-attribute="__ATTR__" type="checkbox" id="__ATTR__" name="__ATTR__" value="1" <% if(__ATTR__ == 1) {%>checked<% } %>>';
                break;
            case "entity":
                Sm.CONFIG.DEBUG && console.log('implement entity types  in templates');
                attribute_template_inside = false;
                break;
            default:
            case "short":
                attribute_template_inside = '<input data-attribute="__ATTR__" class="model edit __ATTR__" type="text" name="__ATTR__" placeholder="__ATTR_TITLE__" title="__ATTR__" value="<%- __ATTR__ %>">';
                break;
            case "long":
            case "array":
                attribute_template_inside = '<textarea data-attribute="__ATTR__" class="model edit __ATTR__" name="__ATTR__" placeholder="__ATTR_TITLE__" title="__ATTR__"><%- __ATTR__ %></textarea>';
                break;
            case "enum":
                var enum_object           = Meta.getAttributeEnumObject(attribute);
                attribute_template_inside = '<select class="model edit __ATTR__ select" data-action="change___ATTR__" data-attribute="__ATTR__" id="__ATTR__" name="__ATTR__">';
                for (var enum_type in enum_object) {
                    if (!enum_object.hasOwnProperty(enum_type)) continue;
                    var enum_val = enum_object[enum_type];
                    var selected = "<% if(__ATTR__ == '" + enum_val.id + "' || __ATTR__ == '" + enum_type + "') {%>selected='selected'<% } %>";
                    if (typeof enum_val === "number") {
                        attribute_template_inside += '<option value="' + enum_val + '"' + selected + ' >' + _.titleize(enum_type) + '</option>';
                    } else if (typeof enum_val === "object") {
                        attribute_template_inside += '<option value="' + (enum_val.id || enum_type) + '" ' + selected + '>' + (enum_val.name || _.titleize(enum_type)) + '</option>';
                    }
                }
                attribute_template_inside += "</select>";
                break;
        }
        if (!attribute_template_inside) return '';
        var after_template = attribute_template_beginning
            + "<% if(typeof __ATTR__ == 'undefined') {var __ATTR__ = null }%>"
            + attribute_template_inside
            + attribute_template_end;
        return after_template.replace(new RegExp('__ATTR__', 'g'), attribute).replace(new RegExp('__ATTR_TITLE__', 'g'), attr_display_name || attribute);
    }
});