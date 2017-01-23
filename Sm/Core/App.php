<?php
/**
 * User: Sam Washington
 * Date: 3/21/2015
 * Time: 8:58 PM
 */

namespace Sm\Core;

use Sm\Development\Log;
use Sm\Entity\Model\EntityMeta;
use Sm\Environment\Environment;
use Sm\Helper\Helper;

/**
 * Class App
 * Loads and initializes the application, contains some information about paths, routing, and default boot processes
 *
 * @package Sm\Core
 * @property-read string        $name                                     The name of the application, based on the path minus the BASE_PATH to the application
 * @property-read string        $site_title                               The name of the website
 * @property-read string        $site_title_short                         The shortened name of the website
 * @property-read string        $path                                     The path to the application, dependent on the app name
 * @property-read string        $base_url                                 The base URL to the site
 * @property-read IoC           $IoC                                      The app's Inversion of Control container
 * @property-read PathContainer $Paths
 * @property-read Environment   $Environment
 * @property-read string        $change_uri                               Function to use to boot the application
 */
class App implements \JsonSerializable {
    /** @var  App A singleton instance of the App class */
    protected static $instance  = null;
    protected static $instances = [ ];
    /** @var string The name of the App that is currently booting */
    protected static $booting_app_name = null;
    
    protected $Environment;
    protected $Paths;
    protected $IoC;
    protected $name     = 'Sm';
    protected $base_url = 'http://localhost/';
    
    /** @var bool $has_been_booted Has the app been booted? */
    protected $has_been_booted = false;
    /** @var bool $is_bootable Are we able to boot the app */
    protected $is_bootable = false;

#########################################################
#        Constructors and initializers                  #
#########################################################
    /**
     * App constructor.
     *
     * @param string $app_name
     */
    public function __construct($app_name = 'Sm') {
        #This is the path to the application physically
        $this->name            = $app_name;
        $this->has_been_booted = false;
        $this->is_bootable     = false;
        $this->_init_paths();
        $this->is_bootable = true;
        $this->IoC         = new IoC();
        if ($app_name !== 'Sm') $this->IoC->register(App::_()->IoC->getRegistry());
        $this->Environment              = new Environment(Environment::EP_FRONT_END);
        static::$instances[ $app_name ] = $this;
    }
    /**
     * Initialize the paths of the app
     *
     * @return \Sm\Core\PathContainer
     */
    public function _init_paths() {
        $this->Paths = new PathContainer;
        $path        = BASE_PATH . $this->name . '/';
        $this->Paths->set('app', $path);
        return $this->Paths;
    }
    /**
     * Simplify the Application initialization process, make it look a little more attractive
     *
     * @param $app_name
     *
     * @return static
     */
    public static function init($app_name) {
        if (isset(static::$instances[ $app_name ])) return static::$instances[ $app_name ];
        $classname = $app_name . '\\Core\\' . $app_name;
        if (class_exists($classname)) return new $classname($app_name);
        else return new static($app_name);
    }
#########################################################
#        Miscellaneous functions                        #
#########################################################
    /**
     * Get the current App::$instance. Done in a function to prevent accidentally assigning a value to it.
     * Always returns an App, though the app may not be 'booted' and may just be the default app
     *
     * @param null $app_name
     *
     * @return self
     */
    public static function _($app_name = null) {
        if (isset($app_name)) {
            if ($app_name == 'booting' && static::$booting_app_name) return static::_(static::$booting_app_name);
            else if (isset(static::$instances[ $app_name ])) return static::$instances[ $app_name ];
        }
        $class_name_arr = explode('\\', static::class);
        $class_name     = $class_name_arr[ count($class_name_arr) - 1 ];
        if ($class_name !== 'App' && isset(static::$instances[ $class_name ])) return static::$instances[ $class_name ];
        if (App::$instance === null) App::$instance = new static('Sm');
        return App::$instance;
    }
#########################################################
#       Booting functions                               #
#########################################################
    /**
     * Complete the process of booting the app. If the app cannot be booted, pooh-pooh.
     *
     * @return $this
     */
    public function boot() {
        if ($this->has_been_booted) return $this;
        static::$booting_app_name = $this->name;
        $result                   = $this->_boot_function($this->name);
        if (!$result || !$this->is_bootable) {
            Log::init('Could not successfully boot the application "' . $this->name . '"')->log_it();
            $this->has_been_booted = false;
            return $this;
        }
        $this->has_been_booted    = true;
        static::$booting_app_name = null;
        return $this;
    }
    /**
     * Set the current app as the App::$instance. Makes it so everything else knows what is going on. Some functions, connections, etc. might depend on the application loaded.
     *
     * @return $this|\Sm\Core\App
     */
    public function set_as_main() {
        if ($this->has_been_booted) return App::$instance = &$this;
        return $this;
    }
    /**
     * Has the application been booted?
     *
     * @return boolean
     */
    public function has_been_booted() {
        return $this->has_been_booted;
    }
    /**
     * @return string
     */
    public static function getBootingAppName() {
        return self::$booting_app_name;
    }
#########################################################
#       Default functions                               #
#########################################################
    /**
     * The default function to call in the instance of a broken route
     *
     * @return string
     */
    public function default_route_function() {
        return 'Page not found!';
    }
    public function _boot_function($app_name) {
        $path = BASE_PATH . $app_name . '/Core/drivers/';
        if (!file_exists($path)) return false;
        if (file_exists("{$path}autoload.php")) Autoload::register(require "{$path}autoload.php");
        if (file_exists("{$path}registry.php")) $this->IoC->register(require "{$path}registry.php");
        
        if (file_exists("{$path}helpers.php")) Helper::register(require "{$path}helpers.php");
        if (file_exists("{$path}routes.php")) $this->IoC->router->register(require "{$path}routes.php");
        if (file_exists("{$path}models.php")) $this->IoC->register('EntityMeta', EntityMeta::init(require "{$path}models.php", $this));
        return true;
    }
    public function change_uri($uri) { return $uri; }
#########################################################
#        Getters and setters                            #
#########################################################
    /**
     * Access protected members in a readonly manner
     *
     * @param $value
     *
     * @return string
     */
    public function __get($value) {
        if ($value != 'name') {
            if (($this == null || !isset($this->$value))) {
                Log::init("Could not App::get the value {$value}", debug_backtrace()[0], 'log')->log_it();
                return '';
            }
        }
        return $this->$value;
    }
    /**
     * Make the properties readonly
     *
     * @param $property
     * @param $value
     */
    public function __set($property, $value) { }
    public function jsonSerialize() {
        return get_object_vars($this);
    }
}