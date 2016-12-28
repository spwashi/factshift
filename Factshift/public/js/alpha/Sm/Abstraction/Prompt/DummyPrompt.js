/**
 * Created by Sam Washington on 12/5/16.
 */
define(['require', 'Sm', 'Sm-Abstraction-Prompt-Prompt', 'Sm-Abstraction-Modal-Modal'], function (require, Sm) {
    Sm.Core.dependencies.on_load(['Abstraction-Modal-Modal', 'Abstraction-Prompt-Prompt'], function () {
        Sm.Abstraction.Prompt.DummyPrompt = Sm.Abstraction.Modal.Modal.extend({});
        Sm.Abstraction.Prompt.makePrompt(Sm.Abstraction.Prompt.DummyPrompt);
    }, 'Abstraction-Prompt-DummyPrompt');
});