/**
 * Created by Sam Washington on 12/19/15.
 */

/**
 * @module Sm/Entities/Page/MvCombo
 * @exports PageMvCombo
 * @class PageMvCombo
 * @requires MvWrapper
 * @requires RelationshipIndex
 * @requires Sm-Core-MvCombo
 */
require(['require', 'Sm', 'Sm-Entities-Page-Model', 'Sm-Core-MvCombo'], function (require) {
    Sm.loaded.when_loaded('Core_MvCombo', function () {
        /**
         * An MvCombo that represents a Page on the server
         * @alias   Sm.Entities.Page.MvCombo
         * @extends {Sm.Core.MvCombo}
         * @see     Sm.Core.MvCombo
         * @class   Sm.Entities.Page.MvCombo
         */
        Sm.Entities.Page.MvCombo = Sm.Core.MvCombo.extend({});
        Sm.loaded.add('Entities_Page_MvCombo');
    }, 'Entities_Page_MvCombo');
});