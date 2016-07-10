/**
 * Created by Sam Washington on 12/20/15.
 */
require(['require', 'Sm-Core-SmModel'], function (require) {
    require('Sm-Core-SmModel');
    /**
     * An Model that represents a Dummy on the server
     * @alias   Sm.Entities.Dummy.Model
     * @extends {Sm.Core.SmModel}
     * @see     Sm.Core.Model
     * @class   Sm.Entities.Dummy.Model
     */
    Sm.Entities.Dummy.Model                = Sm.Core.SmModel.extend({});
    Sm.Entities.Dummy.Model.prototype.type = 'Dummy';
    Sm.loaded.add('Entities_Dummy_Model');
});