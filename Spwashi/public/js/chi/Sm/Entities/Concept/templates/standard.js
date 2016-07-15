/**
 * Created by Sam Washington on 1/4/16.
 */
require(['require', 'Sm-Entities-Concept-main'], function (require) {
    Sm.Entities.Concept.templates.standard = {
        modal: '<div class="control-group">\n    <label for="title">Title:</label>\n    <input data-attribute="title" class="model edit title" type="text" name="title" placeholder="Section Title" title="title" value="<%- title %>">\n    <span class="error" id="title-error"></span>\n</div>\n<div class="control-group">\n    <label for="subtitle">Subtitle:</label>\n    <input data-attribute="subtitle" class="model edit subtitle" type="text" name="subtitle"\n           placeholder="Section Subtitle" title="subtitle" value="<%- subtitle %>">\n    <span class="error" id="subtitle-error"></span>\n</div>\n<div class="control-group">\n    <label for="description">Description: </label>\n    <textarea data-attribute="description" class="model edit description" name="description" placeholder="Description"><%- description %></textarea>\n    <span class="error" id="description-error"></span>\n</div>',
        body:  '<div class="description" ><%- description %></div>'
    };
    Sm.loaded.add('Entities_Concept_templates_standard');
});