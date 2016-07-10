/**
 * Created by Sam Washington on 12/19/15.
 */

/**
 * @module Sm/Entities/Dimension/MvCombo
 * @exports DimensionMvCombo
 * @class DimensionMvCombo
 * @requires MvWrapper
 * @requires RelationshipIndex
 * @requires Sm-Core-MvCombo
 * @requires section_info
 */
require(['require', 'Sm', 'Sm-Entities-Dimension-Model', 'Sm-Core-MvCombo'], function (require) {
    Sm.loaded.when_loaded('Core_MvCombo', function () {
        /**
         * An MvCombo that represents a Dimension on the server
         * @alias   Sm.Entities.Dimension.MvCombo
         * @extends {Sm.Core.MvCombo}
         * @see     Sm.Core.MvCombo
         * @class   Sm.Entities.Dimension.MvCombo
         */
        Sm.Entities.Dimension.MvCombo = Sm.Core.MvCombo.extend({});
        Sm.loaded.add('Entities_Dimension_MvCombo');
    }, 'Entities_Dimension_MvCombo');
});