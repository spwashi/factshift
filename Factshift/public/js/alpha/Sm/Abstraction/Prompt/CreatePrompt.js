/**
 * Created by Sam Washington on 12/5/16.
 */
define(['require', 'Sm', 'Sm-Abstraction-Prompt-Prompt', 'Sm-Abstraction-Modal-Modal', 'Sm-Abstraction-Prompt-ModifyPrompt'], function (require, Sm) {
    Sm.Core.dependencies.on_load(['Abstraction-Modal-Modal', 'Abstraction-Prompt-ModifyPrompt'], function () {
        Sm.Abstraction.Prompt.CreatePrompt = Sm.Abstraction.Prompt.ModifyPrompt.extend(
            {
                action:  'create',
                on_save: function () {
                    var Self = this;
                    return Sm.Abstraction.Prompt.ModifyPrompt.prototype.on_save.apply(this, arguments).then(function (results) {
                        Self.promise_object && Self.promise_object.resolve(results);
                        Self.close();
                        return results;
                    });
                }
            });
        Sm.Abstraction.Prompt.makePrompt(Sm.Abstraction.Prompt.CreatePrompt);
    }, 'Abstraction-Prompt-CreatePrompt');
});