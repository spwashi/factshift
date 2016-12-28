<?php
/**
 * User: Sam Washington
 * Date: 3/22/2015
 * Time: 10:39 PM
 */

namespace Sm\Core;

/**
 * Class Autoload
 * Abstraction for autoloading functionality. Right now, this is a generally unnecessary wrapper for the spl functions,
 * but maybe something will change about it in the future.
 * Also allows us to see where we are using stuff
 *
 * @package Sm\Core
 */
class Autoload {
    function __construct(callable $callback = null) {
        if ($callback != null) {
            $this->register($callback);
        }
    }
    
    static function register($callback) {
        if (is_array($callback)) {
            foreach ($callback as $func) {
                static::register($func);
            }
        } elseif (is_string($callback) || is_callable($callback)) {
            spl_autoload_register($callback, false, true);
        }
    }
    
    static function unregister_function($callback) {
        return spl_autoload_unregister($callback);
    }
}