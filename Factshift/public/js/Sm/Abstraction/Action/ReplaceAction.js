/**
 * Created by Sam Washington on 12/4/16.
 */
define(['require', 'Sm', 'Sm-Abstraction-Action'], function (require, Sm) {
    Sm.Core.dependencies.on_load('Sm-Abstraction-Action', function () {
        /**
         * @class Sm.Abstraction.Action.ReplaceAction
         * @extends Sm.Abstraction.Action
         */
        var ReplaceAction = Sm.Abstraction.Action.ReplaceAction = Sm.Abstraction.Action.extend(
            {
                type: 'ReplaceAction',

                /** @type {Sm.Core.Identifier.Identifiable} Actor */
                Victim:                           null,
                /** @type {Sm.Core.Identifier.Identifiable} Victim */
                Actor:                            null,
                init:                             function (Actor, Victim, data) {
                    if (!Sm.Core.Util.isArray(Actor)) Actor = [Actor];
                    if (!Sm.Core.Util.isArray(Victim)) Victim = [Victim];
                    return Sm.Abstraction.Action.prototype.init.apply(this, [Actor, Victim, data]);
                },
                validate:                         function () {
                    var Actors  = this.Actor;
                    var Victims = this.Victim;
                    if (!this._validate_array_of_identifiables(Actors)) throw new Sm.Exceptions.Error("Could not replace with these resources", this);
                    if (!this._validate_array_of_identifiables(Victims)) throw new Sm.Exceptions.Error("Could not replace these resources", this);
                    return true;
                },
                /**
                 * Verify that something is an array of Identifiable objects
                 * @see Sm.Core.Identifier.Identifiable
                 * @param array
                 * @return {boolean}
                 * @private
                 */
                _validate_array_of_identifiables: function (array) {
                    for (var i = 0; i < array.length; i++) {
                        var item = array[i];
                        if (!item || !item.isIdentifiable) return false;
                    }
                    return true;
                },
                /**
                 * Run the action
                 * @return {boolean}
                 */
                execute:                          function () {
                    this.validate();
                    /**
                     * A function to get the R_ID of an Identifiable object.
                     * @param {Sm.Core.Identifier.Identifiable} item
                     * @return {Sm.r_id}
                     */
                    var getR_ID = function (item) { return item.getR_ID();};

                    /** @type {Array<Sm.Core.Identifier.Identifiable>} actors The Identifiables doing the replacing */
                    var actors  = this.Actor.map(getR_ID);
                    /** @type {Array<Sm.Core.Identifier.Identifiable>} victims      The Identifiables being replaced */
                    var victims = this.Victim.map(getR_ID);

                    /** @type {Array<Sm.Core.Identifier.Identifiable>} replaceMENTS The Identifiables doing the replacing */
                    var replaceMENTS = actors;
                    // We want to replace the topmost Identifiables, so make sure we get a list of them
                    /** @type {Array<Sm.Core.Identifier.Identifiable>} replaceD     The Identifiables doing the replacing */
                    var replaceD     = victims.map(function (item) {
                        return Sm.Abstraction.Action.ReplaceAction.get_effective_list(item);
                    });

                    ReplaceAction.register(replaceMENTS, replaceD);
                    return true;
                },
                /**
                 * The function that gets run when we are reverting the action
                 * @return {boolean}
                 */
                undo_function:                    function () {
                    var Action = new Sm.Abstraction.Action.ReplaceAction(this.Victim, this.Actor, this.data);
                    return Action.execute();
                }
            });
        Sm.Abstraction.Action.ReplaceAction.actions = {};
        Sm.Abstraction.Action.ReplaceAction.history = {};
        /**
         * Register that the replacements are being replaced by something
         * @param replaceMents
         * @param replaceD
         * @return {boolean}
         */
        Sm.Abstraction.Action.ReplaceAction.register = function (replaceMents, replaceD) {
            if (!replaceMents.length || !replaceD.length) return false;

            for (var i = 0; i < replaceD.length; i++) {
                Sm.Abstraction.Action.ReplaceAction._register_replacement(replaceD[i], 'replaced_by', replaceMents);
            }
            for (var j = 0; j < replaceMents.length; j++) {
                Sm.Abstraction.Action.ReplaceAction._register_replacement(replaceMents[i], 'replaced_by', replaceD);
            }
            return true;
        };

        /**
         * Register that something is being replaced on the screen
         * @param identifier
         * @param index
         * @param items
         * @private
         */
        Sm.Abstraction.Action.ReplaceAction._register_replacement = function (identifier, index, items) {
            index           = index === 'replaced_by' ? 'replaced_by' : 'replaces';
            var other_index = index !== 'replaced_by' ? 'replaced_by' : 'replaces';

            ReplaceAction.actions[identifier] = (ReplaceAction.actions[identifier] || {replaces: [], replaced_by: []});
            var rep_arr                       = Sm.Core.Util.arrayDiff(items, [identifier]);
            if (!rep_arr.length) return;
            ReplaceAction.actions[identifier][index]       = rep_arr;
            ReplaceAction.actions[identifier][other_index] =
                Sm.Core.Util.arrayDiff(ReplaceAction.actions[identifier][other_index], rep_arr);
        };

        /**
         * Given an r_id, find what it should be replaced by (or what it is replacing)
         *
         * @param {Sm.Core.Identifier.Identifiable}     identifier
         * @param {boolean}                             find_replaces   True if we are looking for what this is replacing
         * @param {{}}                                  found           An object of the Identifiables that we've found
         * @return {[]}
         */
        Sm.Abstraction.Action.ReplaceAction.get_effective_list = function (identifier, find_replaces, found) {
            var registry = ReplaceAction.actions;
            if (!(identifier in registry)) return [identifier];
            found            = found || {};
            var replacements = registry[identifier][!find_replaces ? 'replaced_by' : 'replaces'];
            var one_found    = false;
            for (var i = 0; i < replacements.length; i++) {
                var replacement_identifier = replacements[i];
                if (!replacement_identifier || (replacement_identifier === identifier)) continue;
                if (replacement_identifier in found) continue;
                one_found = true;
                Sm.Abstraction.Action.ReplaceAction.get_effective_list(replacement_identifier, find_replaces, found, true);
            }
            if (!one_found && !(identifier in found)) found[identifier] = true;
            var found_arr = [];
            for (var id in found) {
                if (!found.hasOwnProperty(id)) continue;
                if (found[id]) found_arr.push(id)
            }
            return found_arr;
        };

    }, 'Sm-Abstraction-Action-ReplaceAction');
});