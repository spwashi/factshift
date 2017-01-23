/**
 * Created by Sam Washington on 12/07/16.
 */
define(['require', 'Sm', 'Sm-Core-SmEntity'], function (require, Sm) {
    /**
     * @class Sm.Entities.Dimension
     * @augments Sm.Core.SmEntity
     */
    var DimensionEntity = Sm.Core.SmEntity.extend(
        {
            init: function () {
                Sm.Entities.Dimension = this;
                var Self              = this;
                var a                 = arguments;
                require(['Sm-Entities-Dimension-View']);
                Sm.Core.dependencies.on_load(['Entities-Dimension-View'], function () {
                    Sm.Core.SmEntity.prototype.init.apply(Self, a);
                }, 'Entities-Dimension-DimensionEntity');
            }
        });

    new DimensionEntity('Dimension');
});