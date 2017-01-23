/**
 * Created by Sam Washington on 11/13/16.
 */
define(['require', 'Sm', 'Sm-Abstraction-Views-View', 'Sm-Abstraction-Action-ReplaceAction'], function (require, Sm) {
    Sm.Core.dependencies.on_load(['Abstraction_Views_View'], function () {
        /**
         * @class Sm.Entities.Placeholder.View
         * @extends Sm.Abstraction.Views.EntityView
         * @property {Sm.Abstraction.Entity} Resource
         */
        Sm.Entities.Placeholder.View = Sm.Abstraction.Views.EntityView.extend({});
    }, 'Entities-Placeholder-View');
});