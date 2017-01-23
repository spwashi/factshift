/**
 * Created by factshift2 on 11/8/2016.
 */
define(['require', 'Sm', 'Sm-Abstraction-Entity'], function (require, Sm) {
    Sm.Core.dependencies.on_load('Abstraction_Entity', function () {
        Sm.Abstraction.MapEntity = Sm.Abstraction.Entity.extend(
            {
                getModifiableAttributes: function () {
                    var res            = Sm.Abstraction.Entity.prototype.getModifiableAttributes.apply(this, arguments);
                    var position_index = res.indexOf('position');
                    if (position_index > -1) res.splice(position_index, 1);
                    return res;
                }
            });
    }, 'Abstraction_MapEntity');
});