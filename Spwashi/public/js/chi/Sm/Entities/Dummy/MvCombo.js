/**
 * Created by Sam Washington on 12/19/15.
 */

/**
 * @module Sm/Entities/Dummy/MvCombo
 * @exports DummyMvCombo
 * @class DummyMvCombo
 * @requires MvWrapper
 * @requires RelationshipIndex
 * @requires Sm-Core-MvCombo
 * @requires section_info
 */
require(['require', 'Sm', 'Sm/Entities/Dummy/Model', 'Sm-Core-MvCombo'], function (require) {
    Sm.loaded.when_loaded('Core_MvCombo', function () {
        /**
         * An MvCombo that represents a Dummy on the server
         * @alias   Sm.Entities.Dummy.MvCombo
         * @extends {Sm.Core.MvCombo}
         * @see     Sm.Core.MvCombo
         * @class   Sm.Entities.Dummy.MvCombo
         */
        Sm.Entities.Dummy.MvCombo = Sm.Core.MvCombo.extend({});
        Sm.loaded.add('Entities_Dummy_MvCombo');
    }, 'Entities_Dummy_MvCombo');
});