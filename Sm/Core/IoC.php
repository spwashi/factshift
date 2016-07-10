<?php
/**
 * User: Sam Washington
 * Date: 3/21/2015
 * Time: 8:26 AM
 */

namespace Sm\Core;

use Sm\Database\Connection;
use Sm\Database\Grammar\Abstraction\Grammar;
use Sm\Database\Sql;
use Sm\Email\Abstraction\Email;
use Sm\Session\Session;

/**
 * Class IoC
 ** An inversion of control container to abstract away a layer of coding. The idea is to store implementations of a bunch of different classes and then if you need to change the class with which
 * you've implemented a piece of functionality, you can just change it in one place. This also is meant to alleviate some problems with Dependency Injection
 *
 * @package Sm\Core
 *
 * @property-read Session    $session    The Session holder
 * @property-read Sql        $sql        Returns an instance of Sql
 * @property-read Grammar    $grammar    The grammar to use to build SQL queries
 * @property-read Email      $std_email  Instance or mini-factory
 * @property-read Connection $connection Connection to the database
 */
class IoC {
    static $registry;
    /** @var  IoC $instance */
    static    $instance;
    protected $session;
    protected $sql;
    protected $grammar;
    protected $std_email;
    protected $connection;

    #
    public function __get($name) {
        try {
            return static::resolve($name);
        } catch (\Exception $e) {
            return false;
        }
    }

    #
    protected function __construct() {
        static::$instance = $this;
    }

    /**
     * Singleton instance of the IoC class, used mainly for the magic methods
     *
     * @return static
     */
    public static function _() {
        if ((static::$instance instanceof IoC)) {
            return static::$instance;
        }
        $instance = new static;
        return static::$instance = $instance;
    }

    /**
     * Add an item or array of item to the registry. In an array, the key == $name and the value == $item
     *
     * @param array|string         $name What to call the newly registered item (or an array of items to register)
     * @param null|Object|callable $item either an instance of a class to store, or a function to run to output the class. This solve some problem with Dependency Injection
     */
    public static function register($name, $item = null) {
        #Assure that the singleton has been established
        static::_();
        $instance =& static::$instance;
        #if we are registering an array, register each item one by one
        if (is_array($name)) {
            foreach ($name as $ar_name => $ar_value) {
                static::$registry[$ar_name] = $ar_value;
                $instance->$ar_name         = $ar_value;
            }
        } elseif (is_string($name)) {
            #Add the item to the registry
            static::$registry[$name] = $item;
            $instance->$name         = $item;
        }
    }

    /**
     * Get a class instance based on something stored in the IoC container
     *
     * @param string $name The name of the index where the class to resolve is located.
     *
     * @return mixed
     * @throws \Exception
     */
    public static function resolve($name) {
        $name = trim($name);
        if (isset(static::$registry[$name])) {
            if (is_callable(static::$registry[$name])) {
                return call_user_func(static::$registry[$name]);
            }
            return static::$registry[$name];
        } else {
            throw new \Exception('Error with ' . $name);
        }
    }

    /**
     * Provide an instance of an Sql class and assure that there is a connection to the database, otherwise return false. Stores the value in the variable passed to it
     * @param \Sm\Database\Sql $sql A reference where the new SQL instance will be stored
     *
     * @return \Sm\Database\Sql
     */
    public static function resolveSql(&$sql = null) {
        try {
            /** @var \Sm\Database\Sql $sql */
            $sql = IoC::resolve('sql');
            if (!$sql->getConnection()) $sql = false;
            return $sql;
        } catch (\Exception $e) {
            return false;
        }
    }
}