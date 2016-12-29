/**
 * Created by Sam Washington on 12/20/15.
 */
define(function (require) {
    /**
     * @name Sm.urls
     * An object containing the URL generators of the day
     */
    Sm.urls = Sm.urls || {};
    Sm.urls.base_url = typeof FACTSHIFT_BASE_URL !== "undefined" ? FACTSHIFT_BASE_URL : 'localhost/s_dev/';
    Sm.urls.js       = Sm.urls.base_url + 'resource/js/';
    Sm.Core.dependencies.add('urls');
    require(['Sm-urls-api']);
});