/**
 * Created by Sam Washington on 12/20/15.
 */
require(['require', 'Sm-Core-SmModel'], function (require) {
    require('Sm-Core-SmModel');
    /**
     * An Model that represents a Page on the server
     * @alias   Sm.Entities.Page.Model
     * @extends {Sm.Core.SmModel}
     * @see     Sm.Core.Model
     * @class   Sm.Entities.Page.Model
     */
    Sm.Entities.Page.Model                = Sm.Core.SmModel.extend({});
    Sm.Entities.Page.Model.prototype.type = 'Page';
    Sm.loaded.add('Entities_Page_Model');
});