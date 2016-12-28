/**
 * Created by Sam Washington on 1/5/16.
 */
/**
 * Created by Sam Washington on 1/4/16.
 */
require(['require'], function (require) {
    Sm.Entities.Dimension.templates._template = {
        body: '<div class="title" ><%- title %></div>\n <div class="description" > - <%- description %></div>',
        body_outer: '<div data-ent_id="<%- ent_id %>" data-id="<%- id %>" class="spwashi-dimension spwashi-entity <% if(_type){ %>type-<%- _type %><% } %> ">\n    __CONTENT__\n</div>'
    };
    Sm.loaded.add('Entities_Dimension_templates__template');
});