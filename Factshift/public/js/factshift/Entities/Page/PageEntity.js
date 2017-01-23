/**
 * Created by Sam Washington on 11/14/16.
 */
define(['require', 'Sm', 'Sm-Core-SmEntity'], function (require, Sm) {
    /**
     * @class Sm.Entities.Page
     * @augments Sm.Core.SmEntity
     */
    var PageEntity = Sm.Core.SmEntity.extend(
        {
            init: function () {
                Sm.Entities.Page = this;
                var Self         = this;
                var a            = arguments;
                require(['Sm-Entities-Page-View']);
                Sm.Core.dependencies.on_load(['Entities-Page-View'], function () {
                    Sm.Core.SmEntity.prototype.init.apply(Self, a);
                }, 'Entities-Page-PageEntity');
            }
        });

    new PageEntity('Page');
});