/**
 * Created by Sam Washington on 12/20/15.
 */
require(['require', 'Sm-Core-SmModel'], function (require) {
    require('Sm-Core-SmModel');
    /**
     * An Model that represents a Dictionary on the server
     * @alias   Sm.Entities.Dictionary.Model
     * @extends {Sm.Core.SmModel}
     * @see     Sm.Core.Model
     * @class   Sm.Entities.Dictionary.Model
     */
    Sm.Entities.Dictionary.Model                = Sm.Core.SmModel.extend({
        defaults: {
            title:       '-',
            description: '-',
            ent_id:      null,
            id:          null
        }
    });
    Sm.Entities.Dictionary.Model.prototype.type = 'Dictionary';
    Sm.loaded.add('Entities_Dictionary_Model');
});