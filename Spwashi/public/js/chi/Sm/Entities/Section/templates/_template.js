/**
 * Created by Sam Washington on 1/4/16.
 */
require(['require'], function (require) {
    Sm.Entities.Section.templates._template = {
        body_outer:  {
            full:    '<section title="<%- subtitle %>" class="spwashi-section spwashi-entity  <% if( ! has_title) {%>no-title<% } %> <% if(_type){ %>type-<%- _type %><% } %> " data-ent_id="<%- ent_id %>" data-id="<%- id %>" data-title=\'<%- title %>\'>\n    __BUTTON_CONTROL__\n    <div class="focus upper">\n        <div class="pan left ">\n            <i class="fa left fa-caret-left"></i>\n        </div>\n        <div class="pan right">\n            <i class="fa right fa-caret-right"></i>\n        </div>\n    </div>\n    <header>\n        <div class="dev id"><%- id %></div>\n        <% if(has_title != 0) { %><h3 class="title"><%- title %></h3> <% } %>\n    </header>\n    __CONTENT__\n    <div data-relationship_index="composition" data-ent_id="<%- ent_id %>" class="relationship-container composition-container"></div>\n    <div data-relationship_index="children" data-ent_id="<%- ent_id %>" class="relationship-container children-container"></div>\n</section>',
            preview: '<section title="<%- subtitle %>" class="spwashi-section preview spwashi-entity  <% if( ! has_title) {%>no-title<% } %> <% if(_type){ %>type-<%- _type %><% } %> " data-ent_id="<%- ent_id %>" data-id="<%- id %>" data-title=\'<%- title %>\'>\n    __BUTTON_CONTROL__\n    <header>\n        <div class="dev id"><%- id %></div>\n        <% if(has_title != 0) { %><h3 class="title"><%- title %></h3> <% } %>\n    </header>\n    __CONTENT__\n</section>',
            inline:  '<span title="<%- subtitle %>" class="spwashi-section inline spwashi-entity <% if(_type){ %>type-<%- _type %><% } %>">\n    __BUTTON_CONTROL__\n    __CONTENT__\n</span>',
        },
        modal_outer: {
            edit: '<header>\n    <h3>Edit <%- _type ? _type : \'Section\' %></h3>\n</header>\n<div class="content form aligned">\n    __BUTTON_CONTROL__\n    <input type="hidden" class="section-type" value="<%- section_type%>">\n    <input type="hidden" value="<%- id %>" name="id">\n\n    __CONTENT__\n\n    <div class="control-group">\n        <label for="has_title">Display Title: </label>\n        <input class="model edit has_title" data-attribute="has_title" type="checkbox" id="has_title" name="has_title" value="1" <% if(has_title == 1) {%>checked<% } %>>\n    </div>\n    <div class="control-group">\n        <label for="section_type">Section Type: </label>\n        <select class="model edit section_type select" data-attribute="section_type" id="section_type" name="section_type">\n            <option value="1"\n            <% if(section_type == 1){%>selected<% } %>>Standard</option>\n            <option value="2"\n            <% if(section_type == 2){%>selected<% } %>>Image</option>\n            <option value="3"\n            <% if(section_type == 3){%>selected<% } %>>Video</option>\n            <option value="4"\n            <% if(section_type == 4){%>selected<% } %>>Audio</option>\n            <option value="5"\n            <% if(section_type == 5){%>selected<% } %>>Definition</option>\n            <option value="6"\n            <% if(section_type == 6){%>selected<% } %>>Table</option>\n            <option value="7"\n            <% if(section_type == 7){%>selected<% } %>>List</option>\n            <option value="8"\n            <% if(section_type == 8){%>selected<% } %>>Embedded Content</option>\n        </select>\n    </div>\n    <div class="control-group view_relationship-container" >\n        <button class="action modal-button" data-action="view_relationships">View Relationships</button>\n    </div>\n</div>',
        },
        modal:       {
            add_relationship_type: {
                pivots: '<div class="form" id="modal-continue-2">\n    <div class="control-group ">\n        <label for="position">Position:</label>\n        <input id="position" data-attribute="position" class="relationship-attribute position" type="text" name="position"\n               placeholder="Which position should we add the relationship?" title="position" value="<%- typeof position !== \'undefined\' ? position : 0 %>">\n        <span class="error" id="position-error"></span>\n    </div>\n\n    <div class="control-group ">\n        <label for="relationship_subindex">Relationship Subtype: </label>\n        <select class="relationship-attribute relationship_subindex select" data-attribute="relationship_subindex" id="relationship_subindex" name="relationship_subindex">\n            <% for (var name in relationship_subindices) { if (!relationship_subindices.hasOwnProperty(name)) continue; %>\n            <option value="<%- relationship_subindices[name] %>"><%- name %></option>\n            <% } %>\n        </select>\n    </div>\n</div>'
            }
        },

        button_control: '<div class="icons button-control">\n    <i class="button edit fa fa-pencil"></i>\n    <i class="button delete close fa fa-remove"></i>\n    <i class="button add fa fa-plus"></i>\n    <i class="button handle fa fa-arrows"></i>\n    <i class="debug button fa fa-question"></i>\n</div>',

        pivot_display: '<div class="button-dialog relationship-type section-pivot">\n    \n    <% if(typeof(home) !== "undefined") {%>\n    <div class="relationship-subtype-category home clearfix">\n        <div data-action="pivot" data-data="home" class="relationship-subtype action home active" data-relationship_subtype="home"><span>Home</span></div>\n    </div>\n    <% } %>\n    <% if(typeof(text) !== "undefined") {%>\n    <div class="relationship-subtype-category text clearfix">\n        <div data-action="pivot" data-data="text" class="relationship-subtype action text <%= text.indexOf(\'text\') > -1 ? \'active\' : \'not\' %>" data-relationship_subtype="text"><span>Text</span></div>\n        <div data-action="pivot" data-data="eli5" class="relationship-subtype action eli5 <%= text.indexOf(\'eli5\') > -1 ? \'active\' : \'not\' %>" data-relationship_subtype="eli5"><span>ELI5</span></div>\n        <div data-action="pivot" data-data="thing_explainer" class="relationship-subtype action thing_explainer <%= text.indexOf(\'thing_explainer\') > -1 ? \'active\' : \'not\' %>" data-relationship_subtype="thing_explainer">\n            <span>Thing Explainer</span></div>\n    </div>\n    <% } %>\n    <% if(typeof(image) !== "undefined") {%>\n    <div class="relationship-subtype-category image">\n        <div data-action="pivot" data-data="image" class="relationship-subtype action image <%= image.indexOf(\'image\') > -1 ? \'active\' : \'inactive\' %>" data-relationship_subtype="image"><span>Image</span></div>\n    </div>\n    <% } %>\n    <% if(typeof(video) !== "undefined") {%>\n    <div class="relationship-subtype-category video">\n        <div data-action="pivot" data-data="video" class="relationship-subtype action video <%= video.indexOf(\'video\') > -1 ? \'active\' : \'inactive\' %>" data-relationship_subtype="video"><span>Video</span></div>\n    </div>\n    <% } %>\n    <% if(typeof(audio) !== "undefined") {%>\n    <div class="relationship-subtype-category audio">\n        <div data-action="pivot" data-data="audio" class="relationship-subtype action audio <%= audio.indexOf(\'audio\') > -1 ? \'active\' : \'inactive\' %>" data-relationship_subtype="audio"><span>Audio</span></div>\n    </div>\n    <% } %>\n</div>'
    };

    Sm.loaded.add('Entities_Section_templates__template');
});