/**
 * Created by Sam Washington on 12/20/15.
 */
define(['require', 'Sm', 'Sm-urls-main'], function (require) {
    Sm.urls.api = {
        /**
         *
         * @param {string}                          action
         * @param {Sm.Core.Identifier.Identifiable|Sm.Abstraction.Relationship|Sm.Abstraction.RelationshipIndex|Sm.Abstraction.Entity} Resource
         */
        generate: function (action, Resource) {
            var BASE_API_URL = Sm.urls.base_url + 'api/';
            if (!Resource || !Resource.isIdentifiable) throw new Sm.Exceptions.Error('Can only generate URLs for Identifiable Objects', Resource);
            var url = BASE_API_URL;
            if (typeof Resource.url === "function") {
                url += Resource.url();
            }
            return url;
        }
    };
    return Sm.urls.api;
});