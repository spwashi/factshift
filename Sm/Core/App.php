<?php
/**
 * User: Sam Washington
 * Date: 3/21/2015
 * Time: 8:58 PM
 */

namespace Sm\Core;

use Sm\Development\Log;

/**
 * Class App
 * Loads and initializes the application, contains some information about paths, routing, and default boot processes
 *
 * @package Sm\Core
 * @property-read string        $name                          The name of the application, based on the path minus the BASE_PATH to the application
 * @property-read string        $site_title                    The name of the website
 * @property-read string        $site_title_short              The shortened name of the website
 * @property-read string        $path                          The path to the application, dependent on the app name
 * @property-read bool          $boot                          Has the app been booted?
 * @property-read bool          $bootable                      Are we able to boot the app
 * @property-read string        $base_url                      The base URL to the site
 * @property-read callable|null $default_route_function        The default function to call in the instance of a broken route
 * @property-read string        $css_path                      Path to the App's CSS files
 * @property-read string        $font_path                     Path to the App's font files
 * @property-read string        $view_path                     Path to the App's MVC views
 * @property-read string        $js_path                       Path to the App's JavaScript
 * @property-read string        $template_path                 Path to the App's templates
 * @property-read string        $controller_path               Path to the App's Controllers
 * @property-read string        $model_path                    Path to the App's Models
 * @property-read string        $scripts_path                  Path to the App's supporting PHP or CGI scripts; not views, not controllers, not models, not classes
 * @property-read string        $image_path                    Path to the App's images that support the site styles
 * @property-read string        $libs_path                     Path to the App's supporting libraries
 * @property-read string        $email_path                    Path to the App's email templates
 * @property-read string        $user_path                     Path to the User directory
 * @property-read string        $boot_function                 Function to use to boot the application
 */
class App {

    const USE_APP_VIEW_PATH       = 2;
    const USE_APP_CSS_PATH        = 3;
    const USE_APP_JS_PATH         = 4;
    const USE_APP_TEMPLATE_PATH   = 5;
    const USE_APP_EMAIL_PATH      = 6;
    const USE_APP_IMAGE_PATH      = 7;
    const USE_APP_CONTROLLER_PATH = 8;
    const USE_APP_MODEL_PATH      = 9;
    const USE_APP_LIBS_PATH       = 10;
    const USE_APP_SCRIPTS_PATH    = 11;
    const USE_APP_FONT_PATH       = 12;

    /** @var  App A singleton instance of the App class */
    protected static $instance = null;
    /** @var string The name of the App that is currently booting */
    protected static $booting_app_name = '';
    /** @var array Some app properties are variable, meaning they depend on another application value (or something like APP_PATH or VIEW_PATH). Store these in an array so the values can be subbed out in derivative classes */
    private static $variable_app_property = [];

    protected $name             = 'Sm';
    protected $site_title       = '';
    protected $site_title_short = '';
    protected $path             = BASE_PATH;
    protected $base_url         = 'http://codoodler.com/';
    protected $boot             = false;
    protected $bootable         = false;
    protected $boot_function;
    protected $default_route_function;
    //<editor-fold desc="Paths">
    protected $view_path       = '';
    protected $css_path        = '';
    protected $js_path         = '';
    protected $font_path       = '';
    protected $template_path   = '';
    protected $controller_path = '';
    protected $model_path      = '';
    protected $scripts_path    = '';
    protected $image_path      = '';
    protected $libs_path       = '';
    protected $email_path      = '';
    protected $user_path       = '';

    //</editor-fold>

    public function __construct($app_name = 'Sm') {
        if (App::$instance instanceof App) {
            foreach (get_object_vars(App::$instance) as $key => $value) {
                $this->$key = $value;
            }
        }
        #If the app doesn't specify a default function, this is it
        if (!isset($this->default_route_function)) {
            $this->default_route_function = function () {
                return 'Page not found!';
            };
        }
        #This is the path to the application physically
        $this->path = BASE_PATH . $app_name . '/';
        $this->boot = false;
        #If there is no app.php file, then the app has not been successfully booted. Quit and log the error.
        if (!is_file($this->path . 'drivers/app.php')) {
            $this->bootable = false;
            Log::init('Could not successfully boot the application "' . $this->path . '"')->log_it();
            return;
        } else {
            #Loop through the values in the array. If they have the names APP_PATH or VIEW_PATH in them, replace them with the actual app path and viewpath
            #CBB two loops?
            $app = require($this->path . 'drivers/app.php');
            foreach ($app as $app_key => $app_value) {
                if (isset(static::$variable_app_property[$app_key])) {
                    unset(static::$variable_app_property[$app_key]);
                }
                if (is_string($app_value) && (strpos($app_value, 'APP_PATH') !== false || strpos($app_value, 'VIEW_PATH') !== false)) {
                    static::$variable_app_property[$app_key] = $app_value;
                }
                $this->$app_key = $app_value;
            };
            $this->view_path = str_replace('APP_PATH/', $this->path, $this->view_path);
            foreach (static::$variable_app_property as $property => $value) {
                if (!is_string($value))
                    continue;
                $value           = str_replace('APP_PATH/', $this->path, $value);
                $value           = str_replace('VIEW_PATH/', $this->view_path, $value);
                $this->$property = $value;
            }
        }
        $this->name     = $app_name;
        $this->bootable = true;
        return;
    }

    /**
     * Simplify the Application initialization process, make it look a little more attractive
     *
     * @param $app_name
     *
     * @return static
     */
    public static function init($app_name) {
        return new static($app_name);
    }

    /**
     * Get the current App::$instance. Done in a function to prevent accidentally assigning a value to it.
     * Always returns an App, though the app may not be 'booted' and may just be the default app
     *
     * @return \Sm\Core\App
     */
    public static function _() {
        if (static::$instance === null) {
            $inst             = new static('Sm');
            static::$instance = $inst;
        }
        return static::$instance;
    }

    /**
     * Set the current app as the App::$instance. Makes it so everything else knows what is going on. Some functions, connections, etc. might depend on the application loaded.
     *
     * @return $this|\Sm\Core\App
     */
    public function set_as_main() {
        if ($this->boot) {
            return App::$instance = &$this;
        }
        return $this;
    }

    /**
     * Complete the process of booting the app. If the app cannot be booted, pooh-pooh.
     *
     * @return $this
     */
    public function boot() {
        $boot_process             = $this->boot_function;
        static::$booting_app_name = $this->name;
        $result                   = call_user_func($boot_process, $this->name);
        if (!$result || !$this->bootable) {
            Log::init('Could not successfully boot the application "' . $this->name)->log_it();
            $this->boot = false;
            return $this;
        }
        $this->boot               = true;
        static::$booting_app_name = false;
        return $this;
    }

    /**
     * Has the application been booted?
     *
     * @return boolean
     */
    public function has_been_booted() {
        return $this->boot;
    }

    /**
     * @return string
     */
    public static function getBootingAppName() {
        return self::$booting_app_name;
    }

    /**
     * A switch to allow programmers to have shortcuts to paths
     *
     * @param $default_location string The default directory; if choice is "true", use this
     * @param $choice           string The choice of the directory location to use
     *
     * @return string
     */
    public static function getPathDecision($default_location, $choice) {
        $default_location = is_numeric($default_location && $default_location != $choice)
            ? static::getPathDecision($default_location, $default_location)
            : $default_location;
        $use_path         = $choice === true ? $default_location : $choice;
        switch ($use_path):
            case App::USE_APP_CSS_PATH:
                $p = App::_()->css_path;
                break;
            case App::USE_APP_FONT_PATH:
                $p = App::_()->font_path;
                break;
            case App::USE_APP_JS_PATH:
                $p = App::_()->js_path;
                break;
            case App::USE_APP_EMAIL_PATH:
                $p = App::_()->email_path;
                break;
            case App::USE_APP_TEMPLATE_PATH:
                $p = App::_()->template_path;
                break;
            case App::USE_APP_VIEW_PATH:
                $p = App::_()->view_path;
                break;
            case App::USE_APP_IMAGE_PATH:
                $p = App::_()->image_path;
                break;
            default:
                $p = '';
        endswitch;
        return $p;
    }

    /**
     * Access protected members in a readonly manner
     *
     * @param $value
     *
     * @return string
     */
    public function __get($value) {
        if ($value != 'name' && (static::$instance == null || !isset(static::$instance->$value))) {
            Log::init("Could not App::get the value {$value}", debug_backtrace()[0], 'log')->log_it();
            return '';
        }
        return static::$instance->$value;
    }

    /**
     * Make the properties readonly
     *
     * @param $property
     * @param $value
     */
    public function __set($property, $value) { }
}