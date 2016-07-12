/**
 * Created by Sam Washington on 1/4/16.
 */
require(['require', 'Sm-Entities-Section-main'], function (require) {
    Sm.Entities.Section.templates.standard = {
        body:  {
            full:    '<div class="content" ><%- content %></div>',
            preview: '<div class="content" ><% if(content.length > 50 ){ %><%- content.substr(0, 50) %> <% } else {%> <%- content %> <% }%></div>',
            inline:  '<div class="content" ><%- content && content.trim().length ? content :  "-" %></div>',
        },
        modal: {
            edit: {
                full:   '<div class="control-group">\n    <label for="title">Title:</label>\n    <input data-attribute="title" class="model edit title" type="text" name="title" placeholder="Section Title" title="title" value="<%- title %>">\n    <span class="error" id="title-error"></span>\n</div>\n<div class="control-group">\n    <label for="subtitle">Subtitle:</label>\n    <input data-attribute="subtitle" class="model edit subtitle" type="text" name="subtitle"\n           placeholder="Section Subtitle" title="subtitle" value="<%- subtitle %>">\n    <span class="error" id="subtitle-error"></span>\n</div>\n<div class="control-group">\n    <label for="content_location">Content Location:</label>\n    <input data-attribute="content_location" class="model edit content_location" type="text" name="content_location"\n           placeholder="Content Location" title="content_location" value="<%- content_location %>">\n    <span class="error" id="content_location-error"></span>\n</div>\n<div class="control-group">\n    <label for="content">Content: </label>\n    <textarea data-attribute="content" class="model edit content" name="content" placeholder="Content"><%- content %></textarea>\n    <span class="error" id="content-error"></span>\n</div>',
                inline: '<div class="control-group">\n    <label for="title">Title:</label>\n    <input data-attribute="title" class="model edit title" type="text" name="title" placeholder="Section Title" title="title" value="<%- title %>">\n    <span class="error" id="title-error"></span>\n</div>\n<div class="control-group">\n    <label for="content">Content: </label>\n    <textarea data-attribute="content" class="model edit content" name="content" placeholder="Content"><%- content %></textarea>\n    <span class="error" id="content-error"></span>\n</div>',
            }
        },
        cache: {}
    };
    Sm.loaded.add('Entities_Section_templates_standard');
});