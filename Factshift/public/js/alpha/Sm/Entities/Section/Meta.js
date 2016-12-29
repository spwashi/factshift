/**
 * Created by Sam Washington on 12/11/16.
 */
define(['require', 'Sm'], function (require, Sm) {
    Sm.Core.dependencies.on_load('', function () {
        /**
         * @class Sm.Entities.Section.Meta
         * @extends Sm.Core.Meta
         * @property {Sm.Abstraction.Entity} Resource
         */
        var SectionMeta          = Sm.Core.Meta.Proto.extend(
            {});
        Sm.Entities.Section.Meta = new SectionMeta('Section');
    }, 'Entities-Section-Meta');
});