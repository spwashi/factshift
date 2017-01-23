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
                        this.generate('button_control', Relationship, true),
                        '__CONTENT__',
                        '</div>'
                    ];
                    return template.join('');
                }
            },
            body_inner:     {
                form: function (data, display_type, is_synchronous) {
                    var Relationship = data.Resource || null;
                    if (!Relationship) throw new Sm.Exceptions.Error("Cannot edit resource!");
                    var Map = Relationship.getMap();
                    if (!Map || !Relationship.isEditable || !Map.isEditable) throw new Sm.Exceptions.Error("Cannot edit resource!");
                    var MapGarage = Sm.Core.Identifier.getRootObjectAttribute(Map, 'Garage') || (new Sm.Abstraction.Garage);

                    var entity_container = this.generate('form._form_value.[entity_container]', {attribute: 'entity_container', Resource: Relationship});
                    var map_form         = MapGarage.generate('body_inner.form', {Resource: Map}, {is_synchronous: true});
                    var items            = [map_form, entity_container];

                    var when_complete = function (previous, results) {return Sm.Core.Util.combineJqueryArray(results);};
                    var walk_fn       = function (item) {return Sm.Abstraction.Garage.normalizeResult(item, is_synchronous);};
                    return Sm.Core.Util.iterateUnknownSynchronicity(items, is_synchronous, walk_fn, when_complete)
                }
            }
        };
    }, 'Abstraction-Relationship-_template');
});