/**
 * Created by Sam Washington on 12/20/15.
 */
require(['require', 'Sm-Core-SmModel'], function (require) {
    require('Sm-Core-SmModel');
    /**
     * An Model that represents a Dimension on the server
     * @alias   Sm.Entities.Dimension.Model
     * @extends {Sm.Core.SmModel}
     * @see     Sm.Core.Model
     * @class   Sm.Entities.Dimension.Model
     */
    Sm.Entities.Dimension.Model                = Sm.Core.SmModel.extend({
        defaults: {
            title:       '-',
            description: '-',
            ent_id:      null,
            id:          null
        }
    });
    Sm.Entities.Dimension.Model.prototype.type = 'Dimension';
    Sm.loaded.add('Entities_Dimension_Model');
});