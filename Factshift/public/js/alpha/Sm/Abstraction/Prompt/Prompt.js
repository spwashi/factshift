/**
 * Created by Sam Washington on 11/14/16.
 */
define(['require', 'Sm', 'Emitter'], function (require, Sm, Emitter) {
    Sm.Core.dependencies.on_load(['Sm-Core'], function () {
        Sm.Abstraction.Prompt = {};
        /**
         * @mixin Sm.Abstraction.Prompt.Prompt
         */
        Sm.Abstraction.Prompt.Prompt = Emitter.extend({
            isPrompt: true,
            open:     function () {
                this.emit('open');
                return Promise.resolve(this);
            },
            close:    function () {
                this.emit('close');
                return Promise.resolve(this);
            }
        });
        /*  Promptable attributes */
        /**
         * @interface   Sm.Abstraction.Prompt.Promptable
         * @class       Sm.Abstraction.Prompt.Promptable
         */
        Sm.Abstraction.Prompt.Promptable = {
            isPromptable:            true,
        };

        /*  Mixin Functions */
        Sm.Abstraction.Prompt.makePromptable = function (item) {
            Sm.Core.Util.mixin(Sm.Abstraction.Prompt.Promptable, item);
        };
        /**
         * A function that makes the prototype of an object into an Sm.Abstraction.Prompt.Prompt
         * @param item
         */
        Sm.Abstraction.Prompt.makePrompt = function (item) {
            Sm.Core.Util.mixin(Sm.Abstraction.Prompt.Prompt.prototype, item);
        };

        /*  Add as loaded */
        Sm.Core.dependencies.add('Abstraction-Prompt-Prompt');
    });
});