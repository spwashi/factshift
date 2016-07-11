/**
 * Created by Sam Washington on 1/4/16.
 */
require(['require'], function (require) {
    Sm.Entities.Section.templates.definition = {
        modal_outer: {
            full:    '<header>\n    <h3>Edit Definition!</h3>\n</header>\n<div class="content form aligned">\n    __BUTTON_CONTROL__\n    <input type="hidden" class="section-type" value="<%- section_type%>">\n    <input type="hidden" value="<%- id %>" name="id">\n\n    __CONTENT__\n\n    <div class="control-group">\n        <label for="has_title">Display Title: </label>\n        <input class="model edit has_title" data-attribute="has_title" type="checkbox" id="has_title" name="has_title" value="1" <% if(has_title == 1) {%>checked<% } %>>\n    </div>\n    <div class="control-group">\n        <label for="section_type">Section Type: </label>\n        <select class="model edit section_type select" data-attribute="section_type" id="section_type" name="section_type">\n            <option value="1"\n            <% if(section_type == 1){%>selected<% } %>>Standard</option>\n            <option value="2"\n            <% if(section_type == 2){%>selected<% } %>>Image</option>\n            <option value="3"\n            <% if(section_type == 3){%>selected<% } %>>Video</option>\n            <option value="4"\n            <% if(section_type == 4){%>selected<% } %>>Audio</option>\n            <option value="5"\n            <% if(section_type == 5){%>selected<% } %>>Definition</option>\n            <option value="6"\n            <% if(section_type == 6){%>selected<% } %>>Table</option>\n            <option value="7"\n            <% if(section_type == 7){%>selected<% } %>>List</option>\n            <option value="8"\n            <% if(section_type == 8){%>selected<% } %>>Embedded Content</option>\n        </select>\n    </div>\n    <div class="control-group view_relationship-container" >\n        <button class="action modal-button" data-action="view_relationships">View Relationships</button>\n    </div>\n</div>',
            inline:  '<header>\n    <h3>Edit Definition!</h3>\n</header>\n<div class="content form aligned">\n    __BUTTON_CONTROL__\n    <input type="hidden" class="section-type" value="<%- section_type%>">\n    <input type="hidden" value="<%- id %>" name="id">\n    __CONTENT__\n</div>',
            preview: false,
            tab:     false,
            tag:     false
        },
        modal:       {
            full:   '<div class="control-group">\n    <label for="title">Title:</label>\n    <input data-attribute="title" class="model edit title" type="text" name="title" placeholder="Section Title" title="title" value="<%- title %>">\n    <span class="error" id="title-error"></span>\n</div>\n<div class="control-group">\n    <label for="subtitle">Subtitle:</label>\n    <input data-attribute="subtitle" class="model edit subtitle" type="text" name="subtitle"\n           placeholder="Section Subtitle" title="subtitle" value="<%- subtitle %>">\n    <span class="error" id="subtitle-error"></span>\n</div>\n<div class="control-group">\n    <label for="content_location">Content Location:</label>\n    <input data-attribute="content_location" class="model edit content_location" type="text" name="content_location"\n           placeholder="Content Location" title="content_location" value="<%- content_location %>">\n    <span class="error" id="content_location-error"></span>\n</div>\n<div class="control-group">\n    <label for="content">Content: </label>\n    <textarea data-attribute="content" class="model edit content" name="content" placeholder="Content"><%- content %></textarea>\n    <span class="error" id="content-error"></span>\n</div>\n<div class="control-group">\n    <label for="words">Words: </label>\n    <textarea data-attribute="words" class="model edit words" name="words" placeholder="words"><%- words %></textarea>\n    <span class="error" id="words-error"></span>\n</div>',
            inline: '<div class="control-group">\n    <label for="title">Title:</label>\n    <input data-attribute="title" class="model edit title" type="text" name="title" placeholder="Section Title" title="title" value="<%- title %>">\n    <span class="error" id="title-error"></span>\n</div>\n<div class="control-group">\n    <label for="content">Content: </label>\n    <textarea data-attribute="content" class="model edit content" name="content" placeholder="Content"><%- content %></textarea>\n    <span class="error" id="content-error"></span>\n</div>\n<div class="control-group">\n    <label for="words">Words: </label>\n    <textarea data-attribute="words" class="model edit words" name="words" placeholder="words"><%- words %></textarea>\n    <span class="error" id="words-error"></span>\n</div>'
        },
        body:        {
            full:    '<div class="content boon <% if(content_location !== undefined && !!content_location && content_location.length) {%>clickable <%}%>" ><%- content %></div>',
        },
        cache:       {}
    };
    Sm.loaded.add('Entities_Section_templates_definition');
});