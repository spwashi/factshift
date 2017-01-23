/**
 * Created by Sam Washington on 11/17/16.
 */
define(['require', 'Sm', 'Sm-Abstraction-Prompt-EditPrompt', 'Sm-Abstraction-Prompt-DestroyPrompt', 'Sm-Abstraction-Prompt-CreatePrompt'], function (require, Sm) {
    /**
     * This object can receive the CUD operations
     * @interface Sm.Abstraction.Editable
     * @property isEditable
     * @property isDestroyable
     * @property save
     * @property prompt_edit
     * @property destroy
     * @property fetch
     * @property prompt_destroy
     */
    Sm.Abstraction.Editable = {
        isEditable:    true,
        isDestroyable: true,

        getModifiableAttributes: function () {
            return {};
        },

        /**
         * Save the object on the server
         * @return {Promise}
         */
        save:           function () {return Promise.resolve(null)},
        /**
         * Retrieve the object from a server
         * @return {Promise}
         */
        fetch:          function () {return Promise.resolve(null)},
        /**
         * Destroy the object
         * @return {Promise}
         */
        destroy:        function () {return Promise.resolve(null)},
        /**
         * Prompt the creation of an object
         * @param {Sm.Core.Identifier.Identifiable=} ReferencePoint An object to serve as a reference frame for the action
         * @return {Promise}
         */
        prompt_create:  function (ReferencePoint) {
            var Self = this;
            return Sm.Core.dependencies.on_load(['Abstraction-Prompt-CreatePrompt'], function () {
                var Prompt = new Sm.Abstraction.Prompt.CreatePrompt({Resource: Self, ReferencePoint: ReferencePoint || null});
                return Prompt.open();
            }, 'prompt_create');
        },
        /**
         * Prompt the Editing of an object
         * @param {Sm.Core.Identifier.Identifiable=} ReferencePoint An object to serve as a reference frame for the action
         * @return {Promise}
         */
        prompt_edit:    function (ReferencePoint) {
            var Self = this;
            return Sm.Core.dependencies.on_load(['Abstraction-Prompt-EditPrompt'], function () {
                var Prompt = new Sm.Abstraction.Prompt.EditPrompt({Resource: Self, ReferencePoint: ReferencePoint || null});
                return Prompt.open();
            }, 'prompt_edit');
        },
        /**
         * Prompt the destruction of a object
         * @param {Sm.Core.Identifier.Identifiable=} ReferencePoint An object to serve as a reference frame for the action
         * @return {Promise}
         */
        prompt_destroy: function (ReferencePoint) {
            var Self = this;
            return Sm.Core.dependencies.on_load(['Abstraction-Prompt-DestroyPrompt'], function () {
                var Prompt = new Sm.Abstraction.Prompt.DestroyPrompt({Resource: Self, ReferencePoint: ReferencePoint || null});
                return Prompt.open();
            }, 'prompt_destroy');
        }
    };
    Sm.Core.dependencies.add('Abstraction-Editable');
});