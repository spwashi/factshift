<?php
/**
 * User: Sam Washington
 * Date: 3/21/2015
 * Time: 3:31 PM
 */

namespace Sm\URI;

/**
 * Class URI
 ** A class that is meant to be used to retrieve information about what the user asked for in the URL.
 * This is unreliable (I guess) and I don't like that it is used.
 * I did not have the time to improve it by the time I needed something useful, however. Shame on me
 *
 * @package Sm\URI
 */
class URI {
    static $uri_string;
    static $subdomain_string;

    #todo CHANGE THIS!! THIS IS SOMETHING THAT MUST BE CHANGED!!
    static function get_uri_string() {
        if (!isset(static::$uri_string)) {
            /*
             * #todo CHANGE THIS!!! THIS IS JUST SOMETHING TEMPORARY BECAUSE I DIDN'T WANT TO WORRY ABOUT MY HTACCESS SCRIPT
             * http://www.smashingmagazine.com/2011/11/02/introduction-to-url-rewriting/
             */

            $tmp = ltrim($_SERVER['REQUEST_URI'], '/');
            $slice = 0;
            if (strpos($tmp, 'index.php/') !== false) {
                $slice = 1;
            }
            $tmp = explode('/', $tmp);

            $url = implode('/', array_slice($tmp, $slice));
            static::$uri_string = explode('?', $url)[0];

            /**
             * If 'spwashi.com' is found in the full URL, preface the route with 'spwashi/' for the proper app loading
             */
            $full_url = 'http' . (isset($_SERVER['HTTPS']) ? 's' : '') . '://' . "{$_SERVER['HTTP_HOST']}/";
            if (strpos($full_url, 'spwashi.com') !== false) {
                static::$uri_string = 'spwashi/' . static::$uri_string;
            }
        }

        return static::$uri_string;
    }

    public static function get_subdomain() {
        if (!isset(static::$subdomain_string)) {
            preg_match('/([^.]+)\.example\.org/', $_SERVER['SERVER_NAME'], $matches);
            if (isset($matches[1])) {
                $subdomain = $matches[1];
            } else {
                $subdomain = '';
            }
            static::$subdomain_string = $subdomain;
        }
        return static::$subdomain_string;
    }

    static function get_full_url($normalize = true) {
        $uri = 'http' . (isset($_SERVER['HTTPS']) ? 's' : '') . '://' . "{$_SERVER['HTTP_HOST']}/" . URI::get_uri_string();
        if ($normalize)
            $uri = str_replace('spwashi.com/spwashi', 'spwashi.com', $uri);
        return $uri;
    }
}