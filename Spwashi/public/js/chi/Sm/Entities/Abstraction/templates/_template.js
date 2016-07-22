/**
 * Created by Sam Washington on 7/11/16.
 */
require(['require', 'Sm-Core-Core'], function (require) {
	Sm.Entities.Abstraction                     = Sm.Entities.Abstraction || {};
	Sm.Entities.Abstraction.templates           = Sm.Entities.Abstraction.templates || {};
	Sm.Entities.Abstraction.templates._template = {
		modal_outer:        {
			edit:             '<header>\n    <h3>Edit <%- type ? type : \'Entity\' %></h3>\n</header>\n<div class="content form aligned">\n    __BUTTON_CONTROL__\n    <input type="hidden" value="<%- id %>" name="id">\n\n    __CONTENT__\n\n    <div class="control-group view_relationship-container">\n        <button class="action modal-button" data-action="view_relationships">View Relationships</button>\n    </div>\n</div>',
			destroy:          '<header>\n    <h3>Delete <%- type ? type : \'Entity\' %></h3>\n</header>\n<div class="content form aligned">\n    __CONTENT__\n    <div class="control-group choose-container">\n        <div class="options">\n            <button class="action modal-button" data-action="choose" data-data="true">YES</button>\n            <button class="action modal-button" data-action="choose" data-data="false">NO</button>\n        </div>\n    </div>\n</div>',
			add_relationship: '<header>\n    <h3>Add relationship to <%- type ? type : \'Entity\' %></h3>\n</header>\n<div class="content form aligned no-button-control">\n    __CONTENT__\n    <div class="control-group choose-container">\n        <button class="action modal-button" data-action="choose" data-data="continue.1">Add relationship</button>\n    </div>\n</div>'
		},
		body_outer:         '<div class="spwashi-entity spwashi-<%- type ? type.toLowerCase() : \' \'%>" data-ent_id="<%- typeof ent_id === \'string\' ?ent_id:\'\'%>" data-id="<%- typeof id === \'string\' ?id:\'\'%>">\n    <%- typeof content === "string"?"c"+content:typeof name === "string"?"n"+name:typeof title === "string"?"t"+title:" "%>\n</div>',
		button_control:     '<div class="icons button-control">\n    <i class="button edit fa fa-pencil"></i>\n    <i class="button delete close fa fa-remove"></i>\n    <i class="button add fa fa-plus"></i>\n    <i class="button handle fa fa-arrows"></i>\n    <i class="debug button fa fa-question"></i>\n</div>',
		modal:              {
			destroy:               'Are you sure you want to delete entity: <%- ent_id %>',
			add_relationship:      '<div class="control-group">\n    <label for="relationship_index">Relationship Type: </label>\n    <select class="relationship-attribute relationship_index select" data-attribute="relationship_index" id="relationship_index" name="relationship_index">\n        <% for (var name in relationship_indices) { if (!relationship_indices.hasOwnProperty(name)) continue; %>\n        <option value="<%- relationship_indices[name] %>"><%- name %></option>\n        <% } %>\n    </select>\n</div>',
			add_relationship_type: '<div class="form" id="modal-continue-2">\n    <div class="control-group">\n        <label for="position">Position:</label>\n        <input id="position" data-attribute="position" class="relationship-attribute position" type="text" name="position"\n               placeholder="Which position should we add the relationship?" title="position" value="<%- typeof position !== \'undefined\' ? position : 0 %>">\n        <span class="error" id="position-error"></span>\n    </div>\n</div>'
		},
		relationship_outer: '<section class="relationship-index-container">__CONTENT__</section>',
		relationship:       {
			relationship_index: '<div class="relationship-container __TYPE__-container" data-Mv-r_id="__R_ID__">\n    <header class="title">__TITLE__</header>\n    <div class="content">__CONTENT__</div>\n</div>',
			relationship:       '<div class="relationship" data-Relationship-r_id="__R_ID__">\n    <div class="content">__CONTENT__</div>\n</div>'
		}
	};
	Sm.loaded.add('Entities_Abstraction_templates');
	Sm.loaded.add('Entities_Abstraction_templates__template');
	return Sm.Entities.Abstraction.templates._template;
});