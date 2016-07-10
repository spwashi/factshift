/**
 * Created by Sam Washington on 12/20/15.
 */
define(['require', 'Sm', 'Sm/urls/main'], function (require) {
    var order   = function (ctxt, self_plural) {
        var url = '';
        ctxt.user_id && ( url += 'users/' + ctxt.user_id + '/');
        ctxt.page_id && ( url += 'pages/' + ctxt.page_id + '/');
        ctxt.concept_id && ( url += 'concepts/' + ctxt.concept_id + '/');
        ctxt.dimension_id && ( url += 'dimensions/' + ctxt.dimension_id + '/');
        ctxt.collection_id && ( url += 'collections/' + ctxt.collection_id + '/');
        ctxt.dictionary_id && ( url += 'dictionaries/' + ctxt.dictionary_id + '/');
        ctxt.primary_id && ctxt.primary_id != id && ( url += self_plural + '/' + ctxt.primary_id + '/');
        ctxt.secondary_id && ctxt.secondary_id != id && ( url += self_plural + '/' + ctxt.secondary_id + '/');
        return url;
    };
    Sm.urls     = Sm.urls || {};
    Sm.urls.api = {
        /**
         *
         * @param settings
         * @param settings.type
         * @param settings.MvCombo
         * @param settings.id
         * @param settings.fetch
         * @param settings.context
         * @param settings.url
         * @param settings.Relationship
         * @param settings.find_usages
         * @param settings.relationship_type
         *
         */
        generate: function (settings) {
            try {
                settings = !!settings && typeof  settings === 'object' ? settings : {};
                var BASE_API_URL = Sm.urls.base_url + 'api/';
                if(settings.Relationship){
                    var Relationship = settings.Relationship;
                    var map_links = Relationship._map_links;
                    var unjoined_url   = [];
                    for (var index in map_links) {
                        if (!map_links.hasOwnProperty(index)) continue;
                        /** @type {Sm.Core.Identifier} The Identity of the linked MvCombos */
                        var Identity = map_links[index];
                        Sm.CONFIG.DEBUG && console.log(Identity);
                        if (Identity.type && Identity.id) unjoined_url.push(Identity.type + '/' + Identity.id);
                    }
                    return BASE_API_URL + unjoined_url.join('/');
                }
                if(settings.url) {
                    return BASE_API_URL + settings.url.replace('//', '/');
                }
                var _Mv  = settings.MvCombo;
                var id   = settings.id;
                if (!id && !!_Mv) id = _Mv.id;
                id            = id || null;
                var fetch     = settings.fetch;
                var ctxt      = settings.context || {
                        page_id:       null,
                        section_id:    null,
                        concept_id:    null,
                        primary_id:    null,
                        secondary_id:  null,
                        collection_id: null,
                        dimension_id:  null,
                        dictionary_id: null
                    };
                var self_type = (!!_Mv) ? _Mv.type : settings.type;
                var url       = '';

                var find_usages = !!settings.find_usages;

                var SelfSm = Sm.Entities[self_type];
                if (!SelfSm) return false;
                var self_plural = SelfSm.Meta.lower_plural[self_type];
                url += order(ctxt, self_plural);
                if (!fetch) {
                    url += self_plural + '/' + ((!!id) ? id + '/' : '');
                } else {
                    url += fetch.toLowerCase() + '/';
                }

                if (url.length) {
                    var url_arr = [];

                    find_usages && url_arr.push('usages=1');
                    !!settings.relationship_type && url_arr.push('relationship_type=' + settings.relationship_type);

                    if (url_arr.length) {
                        url += '?' + url_arr.join('&');
                    }
                } else {
                    return false;
                }

                return BASE_API_URL + url.replace('//', '/');
            } catch (e) {
                Sm.CONFIG.DEBUG && console.log(e);
                return '';
            }
        }
    };
    return Sm.urls.api;
});