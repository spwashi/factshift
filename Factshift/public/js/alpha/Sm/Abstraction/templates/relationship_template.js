/**
 * Created by Sam Washington on 1/4/17.
 */
require(['require'], function (require) {
    Sm.Core.dependencies.on_load(['Abstraction-Relationship'], function () {
        Sm.Abstraction.Relationship.templates           = Sm.Abstraction.Relationship.templates || {};
        Sm.Abstraction.Relationship.templates._template = {
            button_control: "<div class=\"icons button-control\">\n    <i class=\"button edit fa fa-pencil\"></i>\n    <i class=\"button destroy close fa fa-remove\"></i>\n</div>",
            body_outer:     {
                std: function (Relationship) {
                    var r_id     = Relationship.getR_ID();
                    var template = [
                        '<div class="relationship" data-r_id="' + r_id + '">',
                        '__BUTTON_CONTROL__',
                        '__CONTENT__',
                        '</div>'
                    ];
                    return template.join('');
                }
            },
            body:           {
                std: '__CONTENT__'
            }
        };
    }, 'Abstraction-Relationship-_template');
});