/**
 * Created by Sam Washington on 1/5/16.
 */
/**
 * Created by Sam Washington on 1/4/16.
 */
require(['require'], function (require) {
    Sm.Entities.Dictionary.templates._template = {
        body_outer:   '<div class="spwashi-dictionary preview" data-ent_id="<%- ent_id %>" data-id="<%- id %>" data-title=\'<%- title %>\'>\n    __BUTTON_CONTROL__\n    __CONTENT__\n</div>',
        modal_outer:  '<header>\n    <h3>Edit Dictionary</h3>\n</header>\n<div class="content form aligned">\n    __BUTTON_CONTROL__\n    <input type="hidden" value="<%- id %>" name="id">\n    __CONTENT__\n    <div class="control-group view_relationship-container">\n        <button class="action modal-button" data-action="view_relationships">View Relationships</button>\n    </div>\n</div>',
        relationship: {
            relationship: {
                definitions: '<div class="relationship definition-relationship" data-Mv-r_id="__MV_R_ID__" data-Relationship-r_id="__R_ID__">\n    <header class="relationship-type-title">\n        <h3 class="title">__TITLE__</h3>\n    </header>\n    <div class="content">__CONTENT__</div>\n</div>'
            }
        },

        tooltip_outer: '<div class="tooltip relationship definition-relationship" data-Mv-r_id="__MV_R_ID__" data-Relationship-r_id="__R_ID__">\n    <header>\n        <h3 class="title">__TITLE__</h3>\n        <h3 class="subtitle">__SUBTITLE__</h3>\n    </header>\n    <div class="content">__CONTENT__</div>\n</div>',
    };
    Sm.loaded.add('Entities_Dictionary_templates__template');
});