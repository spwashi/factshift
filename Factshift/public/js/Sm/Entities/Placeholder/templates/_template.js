/**
 * Created by Sam Washington on 1/4/16.
 */
require(['require'], function (require) {
    Sm.Entities.Placeholder.templates           = Sm.Entities.Placeholder.templates || {};
    Sm.Entities.Placeholder.templates._template = {
        body: function (data, display_type) {
            return '<div>[placeholder]</div>';
        }
    };

    Sm.Core.dependencies.add('Entities_Placeholder_templates__template');
});