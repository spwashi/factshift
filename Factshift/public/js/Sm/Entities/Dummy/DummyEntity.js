/**
 * Created by Sam Washington on 11/14/16.
 */
define(['require', 'Sm', 'Sm-Core-SmEntity'], function (require, Sm) {
    /**
     * @class Sm.Entities.Dummy
     * @augments Sm.Core.SmEntity
     */
    var DummyEntity = Sm.Core.SmEntity.extend(
        {
            init: function () {
                Sm.Entities.Dummy = this;
                var Self          = this;
                var a             = arguments;
                require(['Sm-Entities-Dummy-View']);
                Sm.Core.dependencies.on_load(['Entities-Dummy-View'], function () {
                    Sm.Core.SmEntity.prototype.init.apply(Self, a);
                }, 'Entities-Dummy-DummyEntity');
            }
        });

    new DummyEntity('Dummy');
});