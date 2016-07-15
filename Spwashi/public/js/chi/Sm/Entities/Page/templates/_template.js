/**
 * Created by Sam Washington on 1/5/16.
 */
/**
 * Created by Sam Washington on 1/4/16.
 */
require(['require', 'Sm-Entities-Page-main'], function (require) {
    Sm.Entities.Page.templates._template = {
        relationship: {
            relationship_index: {
                concepts: '<div class="relationship-container concepts-container" data-Mv-r_id="__R_ID__">\n    <header class="title"><label for="concept-container">__TITLE__</label></header>\n    <select name="concept-container" id="concept-container" class="content" multiple="multiple"></select>\n</div>'
            }
        }
    };
    Sm.loaded.add('Entities_Page_templates__template');
});