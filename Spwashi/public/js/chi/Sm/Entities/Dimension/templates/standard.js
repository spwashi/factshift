/**
 * Created by Sam Washington on 1/4/16.
 */
require(['require', 'Sm-Entities-Dimension-main'], function (require) {
    Sm.Entities.Dimension.templates.standard = {
        body:  {
            /**
             *
             */
            full:    '<div class="description" ><%- description %></div>',
            preview: '<div class="description" ><%- description %></div>',
            inline:  '<div class="description" ><%- description %></div>',
            tab:     '<div class="description" ><%- description %></div>',
            tag:     '<div class="description" ><%- description %></div>'
        },
        cache: {}
    };
    Sm.loaded.add('Entities_Dimension_templates_standard');
});