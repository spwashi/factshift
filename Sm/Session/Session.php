<?php
/**
 * User: Sam Washington
 * Date: 3/22/2015
 * Time: 10:06 PM
 */

namespace Sm\Session;


use Sm\Core\App;

class Session {

    function __construct() {
//        static::start();
    }


    static function start() {
        if (session_status() != PHP_SESSION_ACTIVE) {
//            session_regenerate_id();
//            session_set_cookie_params(0, '/', '', true, true);
            session_start();
        }
    }

    public static function refresh() {
        if (session_status() == PHP_SESSION_ACTIVE) {
            session_regenerate_id();
        }
    }

    /**
     * @param string $name    variable name to retrieve
     * @param bool   $literal Is the session value <i> actually </i> the name we are going to use?
     *                        If not, add the App name and an underscore to the front
     * @return bool
     */
    static function get($name, $literal = false) {
        $name = $literal ? $name : App::_()->name . '_' . $name;
        return isset($_SESSION[$name]) ? $_SESSION[$name] : false;
    }

    /**
     * @param      $name
     * @param      $value
     * @param bool $literal   Is the session value <i> actually </i> the name we are going to
     *                        use? If not, add the App name and an underscore to the front
     * @return mixed|void
     */
    static function set($name, $value, $literal = false) {
        $name = $literal ? $name : App::_()->name . '_' . $name;
        return $_SESSION[$name] = $value;
    }

    static function clear() {
        if (session_status() == PHP_SESSION_ACTIVE) {
            session_regenerate_id(true);
            session_destroy();
//            session_set_cookie_params(0, '/', '', true, true);
            session_start();
        }
    }

    /**
     * Destroy the session
     * @return mixed
     */
    static function destroy() {
        if (session_status() == PHP_SESSION_ACTIVE) {
            session_regenerate_id();
            session_destroy();
        }
    }
}