/**
 * Created by Sam Washington on 11/15/16.
 */
define(['require', 'Sm', 'Sm-Abstraction-Prompt-Prompt', 'Sm-Abstraction-Modal-Modal'], function (require, Sm) {
    Sm.Core.dependencies.on_load(['Abstraction-Modal-Modal', 'Abstraction-Prompt-Prompt', 'Abstraction-Prompt-ModifyPrompt'], function () {
        /**
         * @class Sm.Abstraction.Prompt.DestroyPrompt
         * @extends Sm.Abstraction.Modal.Modal
         * @mixes Sm.Abstraction.Prompt.Prompt
         *
         * @property {Sm.Core.Identifier.Identifiable} ReferencePoint
         */
        Sm.Abstraction.Prompt.DestroyPrompt = Sm.Abstraction.Prompt.ModifyPrompt.extend(
            {
                action:     'destroy',
                on_save:    function () {
                    return Promise.resolve(null);
                },
                on_destroy: function () {
                    var Resource = this.getResource();
                    if (Resource && Resource.isEditable) return Resource.destroy().then(this.close.bind(this));
                    return Promise.reject(new Sm.Exceptions.Error("Cannot save non-editable resource"));
                }
            });
        Sm.Abstraction.Prompt.makePrompt(Sm.Abstraction.Prompt.DestroyPrompt);
    }, 'Abstraction-Prompt-DestroyPrompt');
});