/**
 * Created by Sam Washington on 1/4/16.
 */
require(['require'], function (require) {
    Sm.Entities.Collection.templates.standard = {
        body: '<div class="description" ><%- description %></div>',
        modal: '<div class="control-group">\n    <label for="title">title:</label>\n    <input data-attribute="title" class="model edit title" type="text" name="title"\n           placeholder="Collection title" title="title" value="<%- title %>">\n    <span class="error" id="title-error"></span>\n</div>\n<div class="control-group">\n    <label for="description">Description: </label>\n    <textarea data-attribute="description" class="model edit description" name="description" placeholder="Description"><%- description %></textarea>\n    <span class="error" id="description-error"></span>\n</div>'
    };
    Sm.loaded.add('Entities_Collection_templates_standard');
});