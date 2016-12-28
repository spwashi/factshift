/**
 * Created by factshift2 on 11/8/2016.
 */
define(['require', 'Sm', 'Sm-Abstraction-Entity'], function (require, Sm) {
    Sm.Core.dependencies.on_load('Abstraction_Entity', function () {
        Sm.Abstraction.MapEntity = Sm.Abstraction.Entity.extend({});
    }, 'Abstraction_MapEntity');
});