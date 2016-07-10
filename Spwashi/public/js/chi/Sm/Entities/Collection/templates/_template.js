/**
 * Created by Sam Washington on 1/5/16.
 */
/**
 * Created by Sam Washington on 1/4/16.
 */
require(['require', 'Sm-Entities-Collection-main'], function (require) {
    Sm.Entities.Collection.templates._template = {
        outer:       {
            full:    '',
            preview: '<div class="spwashi-collection preview" data-ent_id="<%- ent_id %>" data-id="<%- id %>" data-title=\'<%- title %>\'>\n    __BUTTON_CONTROL__\n    __CONTENT__\n</div>',
            inline:  '',
            tab:     '',
            tag:     ''
        },
        modal_outer: {
            full: '<header>\n    <h3>Edit Section</h3>\n</header>\n<div class="content form aligned">\n    __BUTTON_CONTROL__\n    <input type="hidden" class="section-type" value="<%- section_type%>">\n    <input type="hidden" value="<%- id %>" name="id">\n\n    __CONTENT__\n\n    <div class="control-group">\n        <label for="has_title">Display Title: </label>\n        <input class="model edit has_title" data-attribute="has_title" type="checkbox" id="has_title" name="has_title" value="1" <% if(has_title == 1) {%>checked<% } %>>\n    </div>\n    <div class="control-group">\n        <label for="section_type">Section Type: </label>\n        <select class="model edit section_type select" data-attribute="section_type" id="section_type" name="section_type">\n            <option value="1"\n            <% if(section_type == 1){%>selected<% } %>>Standard</option>\n            <option value="2"\n            <% if(section_type == 2){%>selected<% } %>>Image</option>\n            <option value="3"\n            <% if(section_type == 3){%>selected<% } %>>Video</option>\n            <option value="4"\n            <% if(section_type == 4){%>selected<% } %>>Audio</option>\n            <option value="5"\n            <% if(section_type == 5){%>selected<% } %>>Definition</option>\n            <option value="6"\n            <% if(section_type == 6){%>selected<% } %>>Table</option>\n            <option value="7"\n            <% if(section_type == 7){%>selected<% } %>>List</option>\n            <option value="8"\n            <% if(section_type == 8){%>selected<% } %>>Embedded Content</option>\n        </select>\n    </div>\n    <div class="control-group view_relationship-container" >\n        <button class="action modal-button" data-action="view_relationships">View Relationships</button>\n    </div>\n</div>',
        },

        relationship_index_container: '<section class="relationship-index-container">__CONTENT__</section>',
        /**
         * This has the data-Mv-r_id which is the r_id of the MvCombo that holds the relationship
         */
        relationship_container: '<div class="relationship-container __TYPE__-container" data-Mv-r_id="__R_ID__">\n    <header class="title">__TITLE__</header>\n    <div class="content">__CONTENT__</div>\n</div>',
        relationship_outer:       '<div class="relationship" data-Relationship-r_id="__R_ID__">\n    <div class="add-to-list">\n        <input type="checkbox" title="Add entity">\n    </div>\n    <div class="content">__CONTENT__</div>\n</div>',

        button_control: {
            full: '<div class="icons button-control">\n    <i class="button edit fa fa-pencil"></i>\n    <i class="button delete close fa fa-remove"></i>\n    <i class="button add fa fa-plus"></i>\n    <i class="button handle fa fa-arrows"></i>\n    <i class="debug button fa fa-question"></i>\n</div>',
        }
    };
    Sm.loaded.add('Entities_Collection_templates__template');
});