/**
 * Created by Sam Washington on 7/11/16.
 */
require(['require', 'Sm-Core-Core'], function (require) {
    Sm.Entities.Abstraction                     = Sm.Entities.Abstraction || {};
    Sm.Entities.Abstraction.templates           = Sm.Entities.Abstraction.templates || {};
    Sm.Entities.Abstraction.templates._template = {
        modal_outer: {
            destroy: "<header>\n    <h3>Delete <%- type ? type : \'Entity\' %></h3>\n</header>\n<div class=\"content form aligned\">\n    <input type=\"hidden\" class=\"section-type\" value=\"<%- section_type%>\">\n    <input type=\"hidden\" value=\"<%- id %>\" name=\"id\">\n    __CONTENT__\n    <div class=\"control-group choose-container\">\n        <div class=\"options\">\n            <button class=\"action modal-button\" data-action=\"choose\" data-data=\"true\">YES</button>\n            <button class=\"action modal-button\" data-action=\"choose\" data-data=\"false\">NO</button>\n        </div>\n    </div>\n</div>"
        },
        modal:       {
            destroy: "Are you sure you want to delete entity: <%- ent_id %>"
        }
    };
    Sm.loaded.add('Entities_Abstraction_templates');
    Sm.loaded.add('Entities_Abstraction_templates__template');
    return Sm.Entities.Abstraction.templates._template;
});