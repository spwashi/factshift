/**
 * Created by Sam Washington on 12/20/15.
 */
define(function (require) {
    /**
     * @name Sm.urls
     * An object containing the URL generators of the day
     * @type {{}|*}
     */
    Sm.urls             = Sm.urls || {};
    Sm.urls.base_url    = 'http://s.dev.spwashi.com/';
    Sm.urls.entity_urls = {
        page: function (context, alias) {
            var location = arguments.join('/');
            if (!location || !location.length) return false;
            return Sm.urls.base_url + 'p/' + location.replace(/^\/|\/+$/gm, '');
        }
    };
    Sm.loaded.add('urls');
    require('Sm/urls/api')
});