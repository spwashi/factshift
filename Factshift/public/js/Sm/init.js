/**
 * Created by Sam Washington on 11/8/16.
 */

define(['require',
        'Promise', 'jquery',
        'Sm',
        'inflection',
        'Sm-Core-Core',
        'Sm-Abstraction-Entity',
        'Sm-Abstraction-MapEntity',
        'Sm-Abstraction-Model',
        'Sm-Abstraction-Relationship',
        'Sm-Abstraction-Garage',
        'Sm-Abstraction-RelationshipIndex',
        'Sm-Abstraction-Views-View',
        'Sm-Abstraction-Views-EntityView'
       ], function (require, P, $, Sm) {
    Sm.init = function (known_entities) {
        return Sm.Core.dependencies.on_load([
                                                'Sm_Core',
                                                'Abstraction-Entity',
                                                'Abstraction-MapEntity',
                                                'Abstraction-Model',
                                                'Abstraction-Relationship',
                                                'Abstraction-Garage',
                                                'Abstraction-RelationshipIndex',
                                                'Abstraction-Views-EntityView'
                                            ], function () {
            known_entities    = known_entities || {};
            var entity_config = Sm.Entities._info.entities || {};

            var entity_types = [].concat(Object.keys(entity_config), Object.keys(known_entities || {}));
            entity_types     = entity_types.filter(function (item, index) {return entity_types.indexOf(item) === index});
            Sm.Core.SmEntity.load_entity('Placeholder', ['PlaceholderEntity'] || []).then(function () {
                for (var i = 0; i < entity_types.length; i++) {
                    var entity_name = entity_types[i];
                    Sm.Core.SmEntity.load_entity(entity_name, known_entities[entity_name] || []);
                }
            })
        });
    };
    return Sm;
});
