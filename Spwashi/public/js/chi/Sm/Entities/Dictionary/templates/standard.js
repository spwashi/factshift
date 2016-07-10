    /**
 * Created by Sam Washington on 1/4/16.
 */
require(['require', 'Sm-Entities-Dictionary-main'], function (require) {
    Sm.Entities.Dictionary.templates.standard = {
        body:  {
            full:    '<div class="description" ><%- description %></div>',
            preview: '<div class="description" ><%- description %></div>',
            inline:  '<div class="description" ><%- description %></div>',
            tab:     '<div class="description" ><%- description %></div>',
            tag:     '<div class="description" ><%- description %></div>'
        },
        modal: {
            full: '<div class="control-group">\n    <label for="title">Title:</label>\n    <input data-attribute="title" class="model edit title" type="text" name="title" placeholder="Dictionary Title" title="title" value="<%- title %>">\n    <span class="error" id="title-error"></span>\n</div>\n<div class="control-group">\n    <label for="description">Description: </label>\n    <textarea data-attribute="description" class="model edit description" name="description" placeholder="Dictionary Description"><%- description %></textarea>\n    <span class="error" id="description-error"></span>\n</div>',
        },
        cache: {}
    };
    Sm.loaded.add('Entities_Dictionary_templates_standard');
});