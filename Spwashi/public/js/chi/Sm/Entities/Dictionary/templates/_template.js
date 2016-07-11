/**
 * Created by Sam Washington on 1/5/16.
 */
/**
 * Created by Sam Washington on 1/4/16.
 */
require(['require', 'Sm-Entities-Dictionary-main'], function (require) {
    Sm.Entities.Dictionary.templates._template = {
        outer:                        {
            full:    '<div class="spwashi-dictionary preview" data-ent_id="<%- ent_id %>" data-id="<%- id %>" data-title=\'<%- title %>\'>\n    __BUTTON_CONTROL__\n    __CONTENT__\n</div>',
            preview: '<div class="spwashi-dictionary preview" data-ent_id="<%- ent_id %>" data-id="<%- id %>" data-title=\'<%- title %>\'>\n    __BUTTON_CONTROL__\n    __CONTENT__\n</div>',
        },
        modal_outer:                  {
            full: '<header>\n    <h3>Edit Dictionary</h3>\n</header>\n<div class="content form aligned">\n    __BUTTON_CONTROL__\n    <input type="hidden" value="<%- id %>" name="id">\n    __CONTENT__\n    <div class="control-group view_relationship-container">\n        <button class="action modal-button" data-action="view_relationships">View Relationships</button>\n    </div>\n</div>',
        },
        relationship_index_container: '<section class="relationship-index-container">\n    <button class="action modal-button" data-action="add_entity" data-data=\'Section\' id="add-new-definition">Add New Definition</button>\n    __CONTENT__\n</section>',
        /**
         * This has the data-Mv-r_id which is the r_id of the MvCombo that holds the relationship
         */
        relationship_container:       '<div class="relationship-container __TYPE__-container" data-Mv-r_id="__R_ID__">\n    <header class="title">\n        <h2>__TITLE__</h2>\n    </header>\n    <div class="content">__CONTENT__</div>\n</div>',

        additional_definition_container: '<div class="definition-container" data-Relationship-r_id="__R_ID__"></div>',
        relationship_outer:              '<div class="relationship" data-Relationship-r_id="__R_ID__" data-Mv-r_id="__MV_R_ID__">\n    <div class="add-to-list">\n        <input type="checkbox" title="Add entity">\n    </div>\n    <div class="content">__CONTENT__</div>\n</div>',
        definitions_relationship_outer:  '<div class="relationship definition-relationship" data-Mv-r_id="__MV_R_ID__" data-Relationship-r_id="__R_ID__">\n    <header class="relationship-type-title">\n        <h3 class="title">__TITLE__</h3>\n    </header>\n    <div class="content">__CONTENT__</div>\n</div>',
        tooltip_outer:                   '<div class="tooltip relationship definition-relationship" data-Mv-r_id="__MV_R_ID__" data-Relationship-r_id="__R_ID__">\n    <header>\n        <h3 class="title">__TITLE__</h3>\n        <h3 class="subtitle">__SUBTITLE__</h3>\n    </header>\n    <div class="content">__CONTENT__</div>\n</div>',

        button_control: {
            full: '<div class="icons button-control">\n    <i class="button edit fa fa-pencil"></i>\n    <i class="button delete close fa fa-remove"></i>\n    <i class="button add fa fa-plus"></i>\n    <i class="button handle fa fa-arrows"></i>\n    <i class="debug button fa fa-question"></i>\n</div>'
        }
    };
    Sm.loaded.add('Entities_Dictionary_templates__template');
});