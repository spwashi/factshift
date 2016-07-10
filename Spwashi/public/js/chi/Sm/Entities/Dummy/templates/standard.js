/**
 * Created by Sam Washington on 1/4/16.
 */
require(['require', 'Sm/Entities/Dummy/main'], function (require) {
    Sm.Entities.Dummy.templates.standard = {
        body:  {
            /**
             *
             */
            full:    '<div class="content" ><%- content %></div>',
            preview: '<div class="content" ><%- content %></div>',
            inline:  '<div class="content" ><%- content %></div>',
            tab:     '<div class="content" ><%- content %></div>',
            tag:     '<div class="content" ><%- content %></div>'
        },
        cache: {}
    };
    Sm.loaded.add('Entities_Dummy_templates_standard');
});