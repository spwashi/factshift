/**
 * Created by Sam Washington on 12/19/15.
 */

/**
 * @module Sm/Entities/Concept/MvCombo
 * @exports ConceptMvCombo
 * @class ConceptMvCombo
 * @requires MvWrapper
 * @requires RelationshipIndex
 * @requires Sm-Core-MvCombo
 * @requires section_info
 */
require(['require', 'Sm', 'Sm-Entities-Concept-Model', 'Sm-Core-MvCombo'], function (require) {
    Sm.loaded.when_loaded('Core_MvCombo', function () {
        /**
         * An MvCombo that represents a Concept on the server
         * @alias   Sm.Entities.Concept.MvCombo
         * @extends {Sm.Core.MvCombo}
         * @see     Sm.Core.MvCombo
         * @class   Sm.Entities.Concept.MvCombo
         */
        Sm.Entities.Concept.MvCombo = Sm.Core.MvCombo.extend({});
        Sm.loaded.add('Entities_Concept_MvCombo');
    }, 'Entities_Concept_MvCombo');
});