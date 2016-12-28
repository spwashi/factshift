/**
 * Created by Sam Washington on 12/4/16.
 */
define(['require', 'Sm', 'Emitter'], function (require, Sm, Emitter) {
    Sm.Abstraction.Action = Emitter.extend(
        {
            Actor:         null,
            Victim:        null,
            data:          null,
            /** @type {function} undo_function */
            undo_function: null,

            /**
             * Initialize the Action
             * @constructor
             * @param            actors     The things initiating the Action
             * @param            victims    The things being acted on
             * @param {{}|null}  data
             */
            init: function (actors, victims, data) {
                this.Actor  = actors;
                this.Victim = victims;
                this.data   = data;
            },

            validate: function () {return true;},

            execute: function () {return true;},

            revert: function () {
                return typeof this.undo_function === "function" ? this.undo_function() : false;
            }
        });
    Sm.Core.dependencies.add('Sm-Abstraction-Action');
});