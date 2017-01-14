/**
 * Created by Sam Washington on 11/8/16.
 */

define(['require', 'Sm', 'Sm-Core-Core',
        'Sm-Abstraction-Entity',
        'Sm-Abstraction-MapEntity',
        'Sm-Abstraction-Model',
        'Sm-Abstraction-Relationship',
        'Sm-Abstraction-Garage',
        'Sm-Abstraction-RelationshipIndex',
        'Sm-Abstraction-Views-View',
        'Sm-Abstraction-Views-EntityView'
       ], function (require, Sm) {
    return function () {
        var known_entities = {Section: ['SectionEntity'], Dimension: ['DimensionEntity'], Page: ['PageEntity']};
        Sm.Core.dependencies.on_load([
                                         'Sm_Core',
                                         'Abstraction-Entity',
                                         'Abstraction-MapEntity',
                                         'Abstraction-Model',
                                         'Abstraction-Relationship',
                                         'Abstraction-Garage',
                                         'Abstraction-RelationshipIndex',
                                         'Abstraction-Views-EntityView'
                                     ], function () {
            var entity_types = [].concat(Object.keys(Sm.Entities._info.entities), Object.keys(known_entities));
            entity_types     = entity_types.filter(function (item, index) {return entity_types.indexOf(item) === index});
            Sm.Core.SmEntity.load_entity('Placeholder', ['PlaceholderEntity'] || []).then(function () {

                for (var i = 0; i < entity_types.length; i++) {
                    var entity_name = entity_types[i];
                    Sm.Core.SmEntity.load_entity(entity_name, known_entities[entity_name] || []);
                }
            })
        });
    }
});
