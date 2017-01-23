<?php
/**
 * User: Sam Washington
 * Date: 3/21/2015
 * Time: 8:26 AM
 */

namespace Sm\Core;

use Sm\Database\Connection;
use Sm\Database\Sql;
use Sm\Entity\Model\EntityMeta;
use Sm\Environment\Environment;
use Sm\Router\Abstraction\Router;
use Sm\Session\Session;

/**
 * Class IoC
 ** An inversion of control container to abstract away a layer of coding. The idea is to store implementations of a bunch of different classes and then if you need to change the class with which
 * you've implemented a piece of functionality, you can just change it in one place. This also is meant to alleviate some problems with Dependency Injection
 *
 * @package Sm\Core
 *
 * @property-read Session     $session            The Session holder
 * @property-read Router      $router             Class to manage routing
 * @property-read Sql         $sql                Returns an instance of Sql
 * @property-read EntityMeta  $EntityMeta         Contains some information about the app's Models and stuff
 * @property-read Connection  $connection         Connection to the database
 * @property-read Connection  $config_connection  Connection to the database
 * @property-read Environment $environment        The environment in which everything is happening
 * @method string process_output($output)
 */
class IoC {
    protected $registry;
    private   $app_registry;
    
    protected $session;
    protected $router;
    protected $sql;
    /** @var  EntityMeta $EntityMeta */
    protected $EntityMeta;
    protected $connection;
    protected $config_connection;
    protected $environment;
    protected $output;
    
    
    public function __construct() { }
    
    public function __get($name) {
        try {
            return $this->resolve($name);
        } catch (\Exception $e) {
            return null;
        }
    }
    public function __call($name, $arguments) {
        try {
            return $this->resolve($name, $arguments);
        } catch (\Exception $e) {
            return null;
        }
    }
    public function getRegistry() {
        $registry = $this->registry;
        foreach ($this->app_registry as $index => $item) {
            $registry["{$index}.app"] = $item;
            if (isset($registry[ $index ])) unset($registry[ $index ]);
        }
        return $registry;
    }
    /**
     * See if something is registered in the IoC container
     *
     * @param $name
     *
     * @return bool
     */
    public function has($name) {
        return isset($this->registry[ $name ]);
    }
    /**
     * Add an item or array of item to the registry. In an array, the key == $name and the value == $item
     *
     * @param array|string         $name What to call the newly registered item (or an array of items to register)
     * @param null|Object|callable $item either an instance of a class to store, or a function to run to output the class. This solve some problem with Dependency Injection
     *
     * @return $this
     */
    public function register($name, $item = null) {
        #if we are registering an array, register each item one by one
        if (is_array($name)) {
            foreach ($name as $ar_name => $ar_value) {
                $this->register($ar_name, $ar_value);
            }
        } else if (is_string($name)) {
            if (strpos($name, '.app')) {
                $name                        = str_replace('.app', '', $name);
                $this->app_registry[ $name ] = $item;
            } else {
                $this->registry[ $name ] = $item;
            }
        }
        return $this;
    }
    /**
     * Get a class instance based on something stored in the IoC container
     *
     * @param string $name The name of the index where the class to resolve is located.
     *
     * @param array  $arguments
     *
     * @return mixed
     * @throws \Exception
     */
    public function resolve($name, $arguments = [ ]) {
        $name = trim($name);
        
        if (!isset($this->registry[ $name ]) && isset($this->app_registry[ $name ])) {
            return $this->registry[ $name ] = $this->register($name, $this->app_registry[ $name ])->resolve($name);
        }
        $registered = $this->registry[ $name ] ?? false;
        if ($registered) {
            if (is_callable($registered)) return call_user_func_array($registered, $arguments);
            return $registered;
        } else {
            throw new \Exception('Error with ' . $name);
        }
    }
    /**
     * Provide an instance of an Sql class and assure that there is a connection to the database, otherwise return false. Stores the value in the variable passed to it
     *
     * @param \Sm\Database\Sql $sql A reference where the new SQL instance will be stored
     *
     * @return \Sm\Database\Sql|false
     */
    public function resolveSql(&$sql = null) {
        try {
            /** @var \Sm\Database\Sql $sql */
            $sql = $this->resolve('sql');
            if (!$sql->getConnection()) $sql = false;
            return $sql;
        } catch (\Exception $e) {
            return false;
        }
    }
}