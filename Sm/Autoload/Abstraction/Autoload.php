<?php
/**
 * User: sam
 * Date: 6/4/15
 * Time: 8:19 PM
 */

namespace Sm\Autoload\Abstraction;

/**
 * Class Autoload
 * @package Sm\Autoload\Abstraction
 */
abstract class Autoload {
    /**
     * Add a function as an autoloader
     * @param $callback
     */
    static function register($callback) { }

    /**
     * Remove a function as an autoloader
     * @param $callback
     */
    static function unregister_function($callback) { }
}