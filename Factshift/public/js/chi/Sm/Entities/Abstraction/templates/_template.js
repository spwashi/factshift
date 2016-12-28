/**
 * Created by Sam Washington on 7/11/16.
 */
require([
	        'require',
	        'Sm',
	        'Sm-Core-Core',
	        'Sm-Entities-Abstraction-SmEntity'
        ],
        /**
         * @param require
         * @param Sm
         * @return {SmEntity.templates._template|{}|{modal_outer: {edit: string, destroy: string, add_relationship: string}, body_outer: {tag: string, inline: string, full: string}, body: {full: string}, button_control: string, modal: {destroy: string, add_relationship: string, add_relationship_type: string}, relationship_outer: string, relationship: {relationship_index: {full: string, concepts: string}, relationship: string}}|*}
         */
        function (require, Sm) {
	        Sm.loaded.when_loaded('Sm-Entities-Abstraction-SmEntity', function () {
		        Sm.Entities.Abstraction.templates           = Sm.Entities.Abstraction.templates || {};
		        Sm.Entities.Abstraction.templates._template = {
			        modal_outer:        {
				        edit:             function (template_query, attributes, config) {
					        config         = config || {};
					        var edit_other = config.alternative_type ? "<div class=\"control-group change_edit-container\">\n    <button class=\"action modal-button\" data-action=\"change_edit\">Edit <%- (typeof alternative_type !== \"undefined\") ? alternative_type : \'Other Entity\' %></button>\n</div>" : "";
					        var template   = '<header>\n    <h3>Edit <%- type ? type : \'Entity\' %></h3>\n</header>\n<div class="content form aligned">\n    __BUTTON_CONTROL__\n    __CONTENT__\n    <div class="control-group view_relationship-container">\n        <button class="action modal-button" data-action="view_relationships">View Relationships</button>\n    </div>\n    __EDIT_OTHER__\n</div>';
					        return template.replace('__EDIT_OTHER__', edit_other);
				        },
				        destroy:          '<header>\n    <h3>Delete <%- type ? type : \'Entity\' %></h3>\n</header>\n<div class="content form aligned no-button-control">\n    __CONTENT__\n    <ul class="spwashi-entities-list"></ul>\n    <div class="control-group choose-container">\n        <div class="options">\n            <button class="action modal-button" data-action="choose" data-data="true">YES</button>\n            <button class="action modal-button" data-action="choose" data-data="false">NO</button>\n        </div>\n    </div>\n</div>',
				        add_relationship: '<header>\n    <h3>Add relationship to <%- type ? type : \'Entity\' %></h3>\n</header>\n<div class="content form aligned no-button-control">\n    __CONTENT__\n    <div class="control-group choose-container">\n        <button class="action modal-button" data-action="choose" data-data="continue.1">Add relationship</button>\n    </div>\n</div>'
			        },
			        body_outer:         {
				        tag:    '<div title="<%- subtitle %>" class="spwashi-<%- type ? type.toLowerCase() : \'Entity\' %> tag spwashi-entity <% if(_type){ %>type-<%- _type %><% } %>">\n    __BUTTON_CONTROL__\n__CONTENT__</div>',
				        inline: '<span title="<%- subtitle %>" class="spwashi-<%- type ? type.toLowerCase() : \'Entity\' %> inline spwashi-entity <% if(_type){ %>type-<%- _type %><% } %>">\n    __BUTTON_CONTROL__\n__CONTENT__</span>',
				        full:   '<div class="spwashi-entity spwashi-<%- type ? type.toLowerCase() : \' \'%>" data-ent_id="<%- typeof ent_id === \'string\' ?ent_id:\'\'%>" data-id="<%- typeof id === \'string\' || typeof id === \'number\' ?id:\'\'%>">\n    __CONTENT__\n</div>'
			        },
			        body:               {
				        full: '<div class="<%- typeof content === \'string\'?\'content\':(typeof alias === \'string\'?\'alias\':(!!title && typeof title === \'string\'?\'title\':\' \'))%>">\n    <%- typeof content === "string"?content:(typeof alias === "string"?alias:(typeof title === "string"?title:" "))%>\n</div>\n'
			        },
			        button_control:     '<div class="icons button-control">\n    <i class="button edit fa fa-pencil"></i>\n    <i class="button delete close fa fa-remove"></i>\n    <i class="button add fa fa-plus"></i>\n    <i class="button handle fa fa-arrows"></i>\n    <i class="debug button fa fa-question"></i>\n</div>',
			        modal:              {
				        destroy:               '<div class="content">Are you sure you want to delete these entities?</div>',
				        /**
				         * @this Sm.Entities.Abstraction.Garage
				         * @return {string}
				         */
				        edit:                  function (template_query, attributes, config) {
					        var type   = this.type;
					        var Entity = Sm.Core.Meta.get_entity(this.type);
					        if (!Entity) return '';
					        var Meta                = Entity.Meta;
					        var template            = '';
					        var beginning_template  = '<div class="control-group">\n    <label for="__TITLE__">__UC_TITLE__:</label>\n';
					        var end_template        = '<span class="error" id="__TITLE__-error"></span>\n</div>';
					        var SelfMvCombo         = config && config.relationship_object && config.relationship_object.SelfMvCombo ? config.relationship_object.SelfMvCombo : false;
					        var EffectiveMeta       = SelfMvCombo && SelfMvCombo.type ? Sm.Core.Meta.get_entity(SelfMvCombo.type).Meta : Meta;
					        var defaults            = Meta.get_defaults();
					        var relationship_object = config.relationship_object || false;
					        for (var attribute in defaults) {
						        if (!defaults.hasOwnProperty(attribute) || !Meta.is_api_settable(attribute)) continue;
						        var input_template = '';
						        var title_type     = Meta.get_datatype_of(attribute);

						        var display_information = Meta.get_display_information(attribute);
						        title_type              = display_information.type;
						        var uc_title            = display_information.name;
						        switch (title_type) {
							        case "boolean":
								        input_template = '<input class="model edit __TITLE__" data-attribute="__TITLE__" type="checkbox" id="__TITLE__" name="__TITLE__" value="1" <% if(__TITLE__ == 1) {%>checked<% } %>>';
								        break;
							        case "entity":
								        continue;
								        break;
							        default:
							        case "short":
								        input_template = '<input data-attribute="__TITLE__" class="model edit __TITLE__" type="text" name="__TITLE__" placeholder="__UC_TITLE__" title="__TITLE__" value="<%- __TITLE__ %>">';
								        break;
							        case "long":
							        case "array":
								        input_template = '<textarea data-attribute="__TITLE__" class="model edit __TITLE__" name="__TITLE__" placeholder="__UC_TITLE__" title="__TITLE__"><%- __TITLE__ %></textarea>';
								        break;
							        case "enum":
								        var attr_obj               = EffectiveMeta.get_attribute_enum_object(attribute);
								        config.relationship_object = config.relationship_object || {};
								        var to_search              = 'relationship_index';
								        if (is_relationship) {
									        if (/sub/.test(attribute)) to_search = 'relationship_subindex';
									        var is_relationship = /relationship/.test(attribute);
								        }
								        input_template = '<select class="model edit __TITLE__ select" data-attribute="__TITLE__" id="__TITLE__" name="__TITLE__">';
								        for (var enum_type in attr_obj) {
									        if (!attr_obj.hasOwnProperty(enum_type)) continue;
									        var enum_val = attr_obj[enum_type];
									        var selected = "<% if(__TITLE__ == '" + enum_val.id + "' || __TITLE__ == '" + enum_type + "') {%>selected='selected'<% } %>";

									        if (typeof enum_val === "number") {
										        if (is_relationship && relationship_object && relationship_object[to_search] == enum_val) selected = 'selected="selected"';

										        input_template += '<option value="' + enum_val + '"' + selected + ' >' + _.titleize(enum_type) + '</option>';
									        } else if (typeof enum_val === "object") {
										        if (is_relationship && relationship_object && relationship_object[to_search] == enum_type) selected = 'selected="selected"';
										        input_template += '<option value="' + (enum_val.id || enum_type) + '" ' + selected + '>' + (enum_val.name || _.titleize(enum_type)) + '</option>';
									        }
								        }
								        input_template += "</select>";
								        break;
						        }

						        var after_template = beginning_template;
						        after_template += input_template;
						        after_template += end_template;

						        uc_title = uc_title || _.titleize(attribute.replace('_', ' '));
						        template += after_template.replace(new RegExp('__TITLE__', 'g'), attribute).replace(new RegExp('__UC_TITLE__', 'g'), uc_title);
					        }
					        return template;
				        },
				        add_relationship:      '<div class="control-group">\n    <label for="relationship_index">Relationship Type: </label>\n    <select class="relationship-attribute relationship_index select" data-attribute="relationship_index" id="relationship_index" name="relationship_index" <% if(typeof relationship_indices._only_one === "string"){%>disabled<%}%>>\n    <option>Select one...</option>\n    <% for (var name in relationship_indices) { if (!relationship_indices.hasOwnProperty(name) || name=="_only_one") continue; %>\n    <option\n    <%if(typeof relationship_indices._only_one === "string" && relationship_indices._only_one == name){%>selected="selected"<%}%> value="<%- relationship_indices[name] %>"><%- name %></option>\n    <%}%>\n    </select>\n</div>',
				        add_relationship_type: '<div class="form" id="modal-continue-2">\n    <div class="control-group">\n        <label for="position">Position:</label>\n        <input id="position" data-attribute="position" class="relationship-attribute position" type="text" name="position"\n               placeholder="Which position should we add the relationship?" title="position" value="<%- typeof position !== \'undefined\' ? position : 0 %>">\n        <span class="error" id="position-error"></span>\n    </div>\n</div>'
			        },
			        relationship_outer: '<section class="relationship-index-container">__CONTENT__</section>',
			        relationship:       {
				        relationship_subindex: {
					        full: function (template_query, attributes, config) {
						        if (config && config.list)
							        return '<ol class="relationship-subtype-container __TYPE__-container" data-r_id="__R_ID__" data-Mv-r_id="__MV_R_ID__">\n    <header class="title">__TITLE__</header>\n    <div class="content">__CONTENT__</div>\n</ol>';
						        return '<ul class="relationship-subtype-container __TYPE__-container" data-r_id="__R_ID__" data-Mv-r_id="__MV_R_ID__">\n    <header class="title">__TITLE__</header>\n    <div class="content">__CONTENT__</div>\n</ul>';
					        }
				        },
				        relationship_index:    {
					        full:     function (template_query, attributes, config) {
						        if (config && config.list)
							        return '<ol class="relationship-container __TYPE__-container" data-Mv-r_id="__MV_R_ID__">\n    <header class="title">__TITLE__</header>\n    <div class="content">__CONTENT__</div>\n</ol>';
						        return '<ul class="relationship-container __TYPE__-container" data-Mv-r_id="__MV_R_ID__">\n    <header class="title">__TITLE__</header>\n    <div class="content">__CONTENT__</div>\n</ul>';
					        },
					        concepts: '<div class="relationship-container concepts-container" data-Mv-r_id="__MV_R_ID__">\n    <header class="title"><label for="concepts-container">__TITLE__</label></header>\n    <select name="concepts-relationships" id="concepts-container" class="model edit concepts-relationships relationships" multiple="multiple"></select>\n</div>'
				        },
				        relationship:          '<li class="relationship" data-Relationship-r_id="__R_ID__">\n    <div class="content">__CONTENT__</div>\n</li>'
			        }
		        };
		        Sm.loaded.add('Entities_Abstraction_templates');
	        }, 'Entities_Abstraction_templates__template');
        });