/**
 * Created by Sam Washington on 12/7/16.
 */
define(['require', 'Sm'], function (require, Sm) {
    Sm.Core.dependencies.on_load(['Entities-Dummy-Entity', 'DummyParent'], function () {
        /**
         * @class Sm.Entities.Dummy.Item
         * @extends DummyParent.Item
         * @property {Sm.Abstraction.Entity} Resource
         */
        Sm.Entities.Dummy.Item = DummyParent.Item.extend({});
    }, 'Entities-Dummy-Item');
});