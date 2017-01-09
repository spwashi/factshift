/**
 * Created by Sam Washington on 1/6/17.
 */
define(['require', 'Sm'], function (require, Sm) {
    Sm.Core.dependencies.on_load(['Core_Identifier'], function () {
        Sm.Abstraction.Selector = {
            /**
             *
             * @param {Sm.Abstraction.Views.View}    Identifiable
             */
            focus: function (Identifiable) {
                var object_type          = Identifiable.getObjectType ? Identifiable.getObjectType() : 'item';
                var focusedIdentifiables = this._focusedIdentifiables = this._focusedIdentifiables || {};
                /** @var {{}string, Array<Sm.Abstraction.Identifier.Identifiable>} */
                var focusedOfType = focusedIdentifiables[object_type] = focusedIdentifiables[object_type] || [];
                var index = focusedOfType.indexOf(Identifiable);
                if (index > -1)return this;
                for (var i = 0; i < focusedOfType.length; i++) {
                    var FocusedIdentifiable = focusedOfType[i];
                    FocusedIdentifiable.blur();
                }
                focusedOfType.push(Identifiable);
            },
            blur:  function (Identifiable) {
                var object_type          = Identifiable.getObjectType ? Identifiable.getObjectType() : 'item';
                var focusedIdentifiables = this._focusedIdentifiables = this._focusedIdentifiables || {};
                /** @var {{}string, Array<Sm.Abstraction.Identifier.Identifiable>} */
                var focusedOfType = focusedIdentifiables[object_type] = focusedIdentifiables[object_type] || [];
                for (var i = 0; i < focusedOfType.length; i++) {
                    var FocusedIdentifiable = focusedOfType[i];
                    if (Identifiable !== FocusedIdentifiable) continue;
                    focusedOfType.splice(i--, 1);
                }
                return this;
            }
        };
    }, 'Abstraction-Selector');
});