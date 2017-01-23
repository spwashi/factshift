/**
 * Created by Sam Washington on 1/4/16.
 */
require(['require'], function (require) {
    Sm.Entities.Section.templates = Sm.Entities.Section.templates || {};

    Sm.Entities.Section.templates._template = {
        body_outer:    {
            class_string:       {
                std: function (Entity, display_type) {
                    return Sm.Abstraction.Garage.generate('body_outer.class_string[' + display_type + ']', Entity, true) + '<% if( ! title.length) {%> no-title<% } %>';
                }
            },
            element_attributes: {
                std: function (Entity, display_type) {
                    return Sm.Abstraction.Garage.generate('body_outer.element_attributes[' + display_type + ']', Entity, true) + ' title="<%- subtitle %>" data-title="<%- title %>"';
                }
            },

            std: function (Entity, display_type) {
                display_type   = display_type || 'std';
                var attributes = this.generate('body_outer.element_attributes.[' + display_type + ']', Entity, true);
                var template   = [
                    '<section ' + attributes + '>',
                    this.generate('button_control', Entity, true),
                    '__CONTENT__',
                    '</section>'
                ];
                return template.join('');
            }
        },
        body:          {
            std:     function (data, display_type) {
                data = data || {};
                return '<div class="focus upper">\n    <div class="pan left "><i class="fa left fa-caret-left"></i></div>\n    <div class="pan right"><i class="fa right fa-caret-right"></i></div>\n</div>\n<header>\n    <div class="dev id"><%- id %></div>\n    <h3 class="title" data-attribute="title"><%- title %></h3>\n</header>\n<div class="content" data-attribute="content"><%- content || (title.length ? \' \' : \' -- \')%></div>\n<div data-relationship_index="composition" data-ent_id="<%- ent_id %>" class="relationship_index composition-container"></div>\n<div data-relationship_index="children" data-ent_id="<%- ent_id %>" class="relationship_index children-container"></div>'
            },
            tag:     function (data) {
                return '<% if(title.length) { %><h3 class="title" data-attribute="title"><%- title %></h3> <% } else {%><%- content %><%}%>'
            },
            preview: function (data) {
                return '<% if(title.length) { %><h3 class="title" data-attribute="title"><%- title %></h3> <% } else {%><%- content %><%}%>'
            }
        },
        pivot_display: '<div class="button-dialog relationship-type section-pivot">\n    \n    <% if(typeof(home) !== "undefined") {%>\n    <div class="relationship-subtype-category home clearfix">\n        <div data-action="pivot" data-data="home" class="relationship-subtype action home active" data-relationship_subtype="home"><span>Home</span></div>\n    </div>\n    <% } %>\n    <% if(typeof(text) !== "undefined") {%>\n    <div class="relationship-subtype-category text clearfix">\n        <div data-action="pivot" data-data="text" class="relationship-subtype action text <%= text.indexOf(\'text\') > -1 ? \'active\' : \'not\' %>" data-relationship_subtype="text"><span>Text</span></div>\n        <div data-action="pivot" data-data="eli5" class="relationship-subtype action eli5 <%= text.indexOf(\'eli5\') > -1 ? \'active\' : \'not\' %>" data-relationship_subtype="eli5"><span>ELI5</span></div>\n        <div data-action="pivot" data-data="thing_explainer" class="relationship-subtype action thing_explainer <%= text.indexOf(\'thing_explainer\') > -1 ? \'active\' : \'not\' %>" data-relationship_subtype="thing_explainer">\n            <span>Thing Explainer</span></div>\n    </div>\n    <% } %>\n    <% if(typeof(image) !== "undefined") {%>\n    <div class="relationship-subtype-category image">\n        <div data-action="pivot" data-data="image" class="relationship-subtype action image <%= image.indexOf(\'image\') > -1 ? \'active\' : \'inactive\' %>" data-relationship_subtype="image"><span>Image</span></div>\n    </div>\n    <% } %>\n    <% if(typeof(video) !== "undefined") {%>\n    <div class="relationship-subtype-category video">\n        <div data-action="pivot" data-data="video" class="relationship-subtype action video <%= video.indexOf(\'video\') > -1 ? \'active\' : \'inactive\' %>" data-relationship_subtype="video"><span>Video</span></div>\n    </div>\n    <% } %>\n    <% if(typeof(audio) !== "undefined") {%>\n    <div class="relationship-subtype-category audio">\n        <div data-action="pivot" data-data="audio" class="relationship-subtype action audio <%= audio.indexOf(\'audio\') > -1 ? \'active\' : \'inactive\' %>" data-relationship_subtype="audio"><span>Audio</span></div>\n    </div>\n    <% } %>\n</div>'
    };

    Sm.Core.dependencies.add('Entities_Section_templates__template');
});