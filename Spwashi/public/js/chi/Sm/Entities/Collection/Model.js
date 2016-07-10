/**
 * Created by Sam Washington on 12/20/15.
 */
require(['require', 'Sm-Core-SmModel'], function (require) {
    require('Sm-Core-SmModel');
    /**
     * An Model that represents a Collection on the server
     * @alias   Sm.Entities.Collection.Model
     * @extends {Sm.Core.SmModel}
     * @see     Sm.Core.Model
     * @class   Sm.Entities.Collection.Model
     */
    Sm.Entities.Collection.Model                = Sm.Core.SmModel.extend({
        defaults: {
            id:              null,
            user_id:         null,
            collection_type: null,
            title:           null,
            description:     null,
            ent_id:          null,
            update_dt:       null,
            creation_dt:     null
        }
    });
    Sm.Entities.Collection.Model.prototype.type = 'Collection';
    Sm.loaded.add('Entities_Collection_Model');
});