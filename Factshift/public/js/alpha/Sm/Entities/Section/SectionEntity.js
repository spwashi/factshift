/**
 * Created by Sam Washington on 11/14/16.
 */
define(['require', 'Sm', 'Sm-Core-SmEntity'], function (require, Sm) {
    /**
     * @class Sm.Entities.Section
     * @augments Sm.Core.SmEntity
     */
    var SectionEntity = Sm.Core.SmEntity.extend(
        {
            init: function () {
                Sm.Entities.Section = this;
                var Self            = this;
                var a               = arguments;
                require(['Sm-Entities-Section-View']);
                require(['Sm-Entities-Section-Meta']);
                require(['Sm-Entities-Section-Wrapper']);
                require(['Sm-Entities-Section-templates-_template']);
                Sm.Core.dependencies.on_load(['Entities-Section-Meta', 'Entities-Section-View', 'Entities-Section-Wrapper'], function () {
                    Sm.Core.SmEntity.prototype.init.apply(Self, a);
                }, 'Entities-Section-SectionEntity');
            }
        });
    new SectionEntity('Section');
});