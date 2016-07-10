/**
 * Created by Sam Washington on 1/5/16.
 */
/**
 * Created by Sam Washington on 1/4/16.
 */
require(['require', 'Sm-Entities-Concept-main'], function (require) {
    Sm.Entities.Concept.templates._template = {
        outer: {
            full   : '',
            preview: '<div class="spwashi-concept preview" data-ent_id="<%- ent_id %>" data-id="<%- id %>" data-title=\'<%- title %>\'>\n    __BUTTON_CONTROL__\n    __CONTENT__\n</div>',
            inline : '',
            tab    : '',
            tag    : ''
        },

        relationship_index_container: '<section class="relationship-index-container">\n    <select multiple name="relationships-concepts" id="add-concept" data-attribute="relationships-concepts" class="model edit"></select>\n    __CONTENT__\n</section>',
        /**
         * This has the data-Mv-r_id which is the r_id of the MvCombo that holds the relationship
         */
        relationship_container: '<div class="relationship-container __TYPE__-container" data-Mv-r_id="__R_ID__">\n    <header class="title">\n        <h2>__TITLE__</h2>\n    </header>\n    <div class="content">__CONTENT__</div>\n</div>',

        relationship_outer  : '<div class="relationship" data-Relationship-r_id="__R_ID__" data-Mv-r_id="__MV_R_ID__">\n    <div class="content">__CONTENT__</div>\n</div>',
        modal_outer         : {
            full: '<header>\n    <h3>Edit Concept </h3>\n</header>\n<div class="content form aligned">\n    __BUTTON_CONTROL__\n    <input type="hidden" value="<%- id %>" name="id">\n\n    __CONTENT__\n\n    <div class="control-group view_relationship-container">\n        <button class="action modal-button" data-action="view_relationships">View Relationships</button>\n    </div>\n</div>',
        },
        button_control      : {
            full: '<div class="icons button-control">\n    <i class="button edit fa fa-pencil"></i>\n    <i class="button delete close fa fa-remove"></i>\n    <i class="button add fa fa-plus"></i>\n    <i class="button handle fa fa-arrows"></i>\n    <i class="debug button fa fa-question"></i>\n</div>',
        },
        modal_button_control: {
            full: '<div class="icons button-control">\n    <i class="modal-button button edit fa fa-pencil"></i>\n    <i class="modal-button delete button close fa fa-remove"></i>\n    <i class="modal-button button save fa fa-save icon-save"></i>\n    <i class="modal-button button add fa fa-plus"></i>\n</div>',
        }
    };
    Sm.loaded.add('Entities_Concept_templates__template');
});