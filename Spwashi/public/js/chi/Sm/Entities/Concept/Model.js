/**
 * Created by Sam Washington on 12/20/15.
 */
require(['require', 'Sm-Core-SmModel'], function (require) {
    require('Sm-Core-SmModel');
    /**
     * An Model that represents a Concept on the server
     * @alias   Sm.Entities.Concept.Model
     * @extends {Sm.Core.SmModel}
     * @see     Sm.Core.Model
     * @class   Sm.Entities.Concept.Model
     */
    Sm.Entities.Concept.Model                = Sm.Core.SmModel.extend({
        defaults: {
            title : '-',
            subtitle : '-',
            description : '-'
        }
    });
    Sm.Entities.Concept.Model.prototype.type = 'Concept';
    Sm.loaded.add('Entities_Concept_Model');
});