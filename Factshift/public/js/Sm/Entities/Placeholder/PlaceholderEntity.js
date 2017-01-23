/**
 * Created by Sam Washington on 11/14/16.
 */
define(['require', 'Sm', 'Sm-Core-SmEntity'], function (require, Sm) {
    /**
     * @class Sm.Entities.Placeholder
     * @augments Sm.Core.SmEntity
     */
    var PlaceholderEntity = Sm.Core.SmEntity.extend(
        {
            init: function () {
                Sm.Entities.Placeholder = this;
                var Self                = this;
                var a                   = arguments;
                require(['Sm-Entities-Placeholder-View']);
                require(['Sm-Entities-Placeholder-templates-_template']);
                Sm.Core.dependencies.on_load(['Entities-Placeholder-View', 'Entities-Placeholder-templates-_template'], function () {
                    Sm.Core.SmEntity.prototype.init.apply(Self, a);
                }, 'Entities-Placeholder-PlaceholderEntity');
            }
        });

    new PlaceholderEntity('Placeholder');
});