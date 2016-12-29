/**
 * Created by Sam Washington on 12/9/16.
 */
define(['require', 'Sm', 'Sm-Abstraction-Prompt-Prompt', 'Sm-Abstraction-Modal-Modal'], function (require, Sm) {
    Sm.Core.dependencies.on_load(['Abstraction-Modal-Modal', 'Abstraction-Prompt-EditPrompt'], function () {
        Sm.Abstraction.Prompt.EditEntityPrompt =
            Sm.Abstraction.Prompt.EditPrompt.extend(
                {
                    initialize:           function (settings) {
                        var res = Sm.Abstraction.Prompt.EditPrompt.prototype.initialize.apply(this, arguments);
                        this.on('render', function (el) {});
                        return res;
                    },
                    on_edit_relationship: function () {
                        var ReferencePoint = this.getReferencePoint();

                        if (!ReferencePoint || !ReferencePoint.isEditable) return Promise.reject(new Sm.Exceptions.Error("Cannot edit relationship "));

                        if (Sm.Core.Util.isArray(ReferencePoint)) {
                            if (ReferencePoint.length === 1) ReferencePoint = ReferencePoint[0];
                            else return Promise.reject(new Sm.Exceptions.Error("Not sure how to handle multiple ReferencePoint!", ReferencePoint));
                        }
                        return ReferencePoint.prompt_edit();
                    }
                });
        Sm.Abstraction.Prompt.makePrompt(Sm.Abstraction.Prompt.EditEntityPrompt);
    }, 'Abstraction-Prompt-EditEntityPrompt');
});