/**
 * Created by Sam Washington on 12/19/15.
 */

/**
 * @module Sm/Entities/Collection/MvCombo
 * @exports CollectionMvCombo
 * @class CollectionMvCombo
 * @requires MvWrapper
 * @requires RelationshipIndex
 * @requires CollectionView
 * @requires CollectionModel
 * @requires Sm-Core-MvCombo
 * @requires section_info
 */
require(['require', 'Sm', 'Sm-Entities-Collection-Model', 'Sm-Core-MvCombo'], function (require) {
    Sm.loaded.when_loaded('Core_MvCombo', function () {
        /**
         * An MvCombo that represents a Collection on the server
         * @alias   Sm.Entities.Collection.MvCombo
         * @extends {Sm.Core.MvCombo}
         * @see     Sm.Core.MvCombo
         * @class   Sm.Entities.Collection.MvCombo
         */
        Sm.Entities.Collection.MvCombo = Sm.Core.MvCombo.extend({});
        Sm.loaded.add('Entities_Collection_MvCombo');
    }, 'Entities_Collection_MvCombo');
});