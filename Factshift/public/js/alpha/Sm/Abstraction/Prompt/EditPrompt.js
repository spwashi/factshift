/**
 * Created by Sam Washington on 11/15/16.
 */
define(['require', 'Sm', 'Sm-Abstraction-Prompt-Prompt', 'Sm-Abstraction-Modal-Modal', 'Sm-Abstraction-Prompt-ModifyPrompt'], function (require, Sm) {
    Sm.Core.dependencies.on_load(['Abstraction-Modal-Modal', 'Abstraction-Prompt-Prompt', 'Abstraction-Prompt-ModifyPrompt'], function () {
        /**
         * @class Sm.Abstraction.Prompt.EditPrompt
         * @extends Sm.Abstraction.Modal.Modal
         * @mixes Sm.Abstraction.Prompt.Prompt
         *
         * @property {Sm.Core.Identifier.Identifiable} ReferencePoint
         */
        Sm.Abstraction.Prompt.EditPrompt = Sm.Abstraction.Prompt.ModifyPrompt.extend(
            {
                action:        'edit',
                on_edit_other: function () {
                    var ReferencePoint = this.getReferencePoint();
                    var Resource       = ReferencePoint ? ReferencePoint.getResource() : null;
                    if (!Resource || !Resource.isEditable) return Promise.reject(new Sm.Exceptions.Error("Cannot edit relationship ", Resource));

                    if (Sm.Core.Util.isArray(Resource)) {
                        if (Resource.length === 1) Resource = Resource[0];
                        else return Promise.reject(new Sm.Exceptions.Error("Not sure how to handle multiple Resource!", Resource));
                    }
                    return Resource.prompt_edit();
                }
            });
        Sm.Abstraction.Prompt.makePrompt(Sm.Abstraction.Prompt.EditPrompt);
    }, 'Abstraction-Prompt-EditPrompt');
});