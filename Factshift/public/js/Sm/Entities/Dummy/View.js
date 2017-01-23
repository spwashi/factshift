/**
 * Created by Sam Washington on 11/13/16.
 */
define(['require', 'Sm', 'Sm-Abstraction-Views-View', 'Sm-Abstraction-Action-ReplaceAction'], function (require, Sm) {
    Sm.Core.dependencies.on_load(['Abstraction_Views_View'], function () {
        /**
         * @class Sm.Entities.Dummy.View
         * @extends Sm.Abstraction.Views.EntityView
         * @property {Sm.Abstraction.Entity} Resource
         */
        Sm.Entities.Dummy.View = Sm.Abstraction.Views.EntityView.extend({});
    }, 'Entities-Dummy-View');
});