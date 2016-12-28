<?php
/**
 * User: Sam Washington
 * Date: 3/22/2015
 * Time: 10:06 PM
 */

namespace Sm\Session;


use Sm\Core\App;

class Session extends Abstraction\Session {
    function __construct() {
//        ::start();
    }
    /**
     * @param string $name    variable name to retrieve
     * @param bool   $literal Is the session value <i> actually </i> the name we are going to use?
     *                        If not, add the App name and an underscore to the front
     *
     * @return bool
     */
    function get($name, $literal = false) {
        $name = $literal ? $name : App::_()->name . '_' . $name;
        return isset($_SESSION[ $name ]) ? $_SESSION[ $name ] : false;
    }
    public function start() {
        if (session_status() != PHP_SESSION_ACTIVE) {
//            session_regenerate_id();
//            session_set_cookie_params(0, '/', '', true, true);
            session_start();
        }
    }
    public function refresh() {
        if (session_status() == PHP_SESSION_ACTIVE) {
            session_regenerate_id();
        }
    }
    /**
     * @param      $name
     * @param      $value
     * @param bool $literal   Is the session value <i> actually </i> the name we are going to
     *                        use? If not, add the App name and an underscore to the front
     *
     * @return mixed|void
     */
    function set($name, $value, $literal = false) {
        $name = $literal ? $name : App::_()->name . '_' . $name;
        return $_SESSION[ $name ] = $value;
    }
    function clear() {
        if (session_status() == PHP_SESSION_ACTIVE) {
            session_regenerate_id(true);
            session_destroy();
//            session_set_cookie_params(0, '/', '', true, true);
            session_start();
        }
    }
    function destroy() {
        if (session_status() == PHP_SESSION_ACTIVE) {
            session_regenerate_id();
            session_destroy();
        }
    }
}