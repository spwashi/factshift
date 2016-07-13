/**
 * Created by Sam Washington on 7/11/16.
 */
require(['require', 'Sm-Core-Core'], function (require) {
    Sm.Entities.Abstraction                     = Sm.Entities.Abstraction || {};
    Sm.Entities.Abstraction.templates           = Sm.Entities.Abstraction.templates || {};
    Sm.Entities.Abstraction.templates._template = {
        modal_outer: {
            destroy:          '<header>\n    <h3>Delete <%- type ? type : \'Entity\' %></h3>\n</header>\n<div class="content form aligned">\n    __CONTENT__\n    <div class="control-group choose-container">\n        <div class="options">\n            <button class="action modal-button" data-action="choose" data-data="true">YES</button>\n            <button class="action modal-button" data-action="choose" data-data="false">NO</button>\n        </div>\n    </div>\n</div>',
            add_relationship: '<header>\n    <h3>Add relationship to <%- type ? type : \'Entity\' %></h3>\n</header>\n<div class="content form aligned no-button-control">\n    __CONTENT__\n    <div class="control-group choose-container">\n        <button class="action modal-button" data-action="choose" data-data="continue.1">Add relationship</button>\n    </div>\n</div>'
        },
        modal:       {
            destroy:               'Are you sure you want to delete entity: <%- ent_id %>',
            add_relationship:      '<div class="control-group">\n    <label for="relationship_index">Relationship Type: </label>\n    <select class="relationship-attribute relationship_index select" data-attribute="relationship_index" id="relationship_index" name="relationship_index">\n        <% for (var name in relationship_indices) { if (!relationship_indices.hasOwnProperty(name)) continue; %>\n        <option value="<%- relationship_indices[name] %>"><%- name %></option>\n        <% } %>\n    </select>\n</div>',
            add_relationship_type: '<div class="form" id="modal-continue-2">\n    <div class="control-group">\n        <label for="position">Position:</label>\n        <input id="position" data-attribute="position" class="relationship-attribute position" type="text" name="position"\n               placeholder="Which position should we add the relationship?" title="position" value="<%- typeof position !== \'undefined\' ? position : 0 %>">\n        <span class="error" id="position-error"></span>\n    </div>\n</div>'
        }
    };
    Sm.loaded.add('Entities_Abstraction_templates');
    Sm.loaded.add('Entities_Abstraction_templates__template');
    return Sm.Entities.Abstraction.templates._template;
});