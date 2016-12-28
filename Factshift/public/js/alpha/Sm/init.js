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
            var entity_types = Sm.Entities._info.entities;
            for (var e_t_before in entity_types) {
                if (!entity_types.hasOwnProperty(e_t_before)) continue;
                var e_t           = e_t_before.split('|').sort().join('|');
                entity_types[e_t] = entity_types[e_t_before];
                if (e_t !== e_t_before) delete entity_types[e_t_before];
                var dependencies = known_entities[e_t] || [];
                if (dependencies.indexOf(e_t + 'Entity') < 0) new Sm.Core.SmEntity(e_t);
                var r  = dependencies.map(function (t) {return 'Sm-Entities-' + e_t + '-' + t;});
                var wl = dependencies.map(function (t) {return 'Entities-' + e_t + '-' + t;});
                r.length && require(r);

                var when_loaded_func = (function (e_t) {
                    return function () {
                        Sm.Core.dependencies.add(e_t);
                        var lower           = e_t.toLowerCase();
                        var html_identifier = '.factshift-' + lower;
                        var models_string   = document.getElementById(lower + '_models');
                        var SmEntity        = Sm.Core.Meta.getSmEntity(e_t);
                        var elements        = lower.indexOf('|') > 0 ? [] : $(html_identifier).toArray();
                        var models_json     = models_string ? JSON.parse(models_string.textContent) : null;
                        // Sm.CONFIG.DEBUG && console.log(' -- ' + e_t + ' -- loaded ');

                        try { SmEntity.Wrapper.hydrate(models_json, elements);} catch (e) {Sm.CONFIG.DEBUG && console.log(e, models_json); }
                    }
                })(e_t);

                Sm.Core.dependencies.on_load(wl, when_loaded_func, e_t).catch(function (e) {Sm.CONFIG.DEBUG && console.log(e); });
            }
        });
    }
});
