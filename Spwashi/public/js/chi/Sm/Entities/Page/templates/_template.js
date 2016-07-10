/**
 * Created by Sam Washington on 1/5/16.
 */
/**
 * Created by Sam Washington on 1/4/16.
 */
require(['require', 'Sm-Entities-Page-main'], function (require) {
    Sm.Entities.Page.templates._template = {
        outer: {full: ''},

        relationship_index_container: '<section class="relationship-index-container">\n    __CONTENT__\n</section>',
        /**
         * This has the data-Mv-r_id which is the r_id of the MvCombo that holds the relationship
         */
        relationship_container: '<div class="relationship-container __TYPE__-container" data-Mv-r_id="__R_ID__">\n    <header class="title">\n        <h2>__TITLE__</h2>\n    </header>\n    <div class="content">__CONTENT__</div>\n</div>',

        concept_relationship_outer: '<div class="relationship concept-relationship" data-Mv-r_id="__MV_R_ID__" data-Relationship-r_id="__R_ID__">\n    <div class="content">__CONTENT__</div>\n</div>',
        relationship_outer        : '<div class="relationship" data-Relationship-r_id="__R_ID__" data-Mv-r_id="__MV_R_ID__">\n    <div class="content">__CONTENT__</div>\n</div>',
        modal_outer               : {
            full: '<header>\n    <h3>Edit Page </h3>\n</header>\n<div class="content form aligned">\n    __BUTTON_CONTROL__\n    <input type="hidden" value="<%- id %>" name="id">\n\n    __CONTENT__\n\n    <div class="control-group view_relationship-container">\n        <button class="action modal-button" data-action="view_relationships">View Relationships</button>\n    </div>\n</div>',
        },
        button_control            : {
            full: '<div class="icons button-control">\n    <i class="button edit fa fa-pencil"></i>\n    <i class="button delete close fa fa-remove"></i>\n    <i class="button add fa fa-plus"></i>\n    <i class="button handle fa fa-arrows"></i>\n    <i class="debug button fa fa-question"></i>\n</div>',
        }
    };
    Sm.loaded.add('Entities_Page_templates__template');
});