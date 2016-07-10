<?php
/**
 * User: sam
 * Date: 6/4/15
 * Time: 6:52 PM
 */

namespace Sm\Router\Abstraction;

use Sm\Core\App;
use Sm\Development\Log;

abstract class Route {
    protected static $named;
    public           $route_name;
    public           $callback;
    /**
     * The HTTP method that can be used to access this resource
     * @var string
     */
    public $http_method = 'all';
    /**
     * The app this route belongs to
     * @var string
     */
    public $app = 'Sm';
    /** @var null The number of parameters the route must have to function */
    public $assigned_parameter_count = null;
    /**
     * The route exploded at slashes
     * @var array
     */
    public $pattern = [];
    /**
     * An array of functions to be run on matching this route
     * @var array
     */
    public $helpers = [];
    /**
     * An array of the names of each different named wildcard in the route
     * e.g. "context" in "/p/{context}:[a-z]/edit
     * @var array
     */
    public $indexes = [];
    /**
     * In case the callback is done in a way that allows for wildcard methods to be used (e.g. Controller@*), when we finally match the Route, this is the method to use
     * @var null
     */
    public $method = null;
    /**
     * These are the things that will, ni order, replace tje variables in the route
     * @var array
     */
    public $parameters = [];

    /**
     * If we're ever in the case where routing is defeerred to a different application ater the initial routing,
     * this flag says whether or not we should strip the current URI from the route path.
     * For example, if we are in the initial router that delegates to other apps, there might be a prefix that is assumed to be appended in all the rest of the app's routes
     * like a /s/ for the spwashi app. The apps in the spwashi app may not be written with that /s/, it could just be there to tell us to switch.'
     * Therefore, we need to strip that from the URL once we
     * @var bool
     */
    public $strip = false;

    /**
     * Name a route
     *
     * @param \Sm\Router\Abstraction\Route $toute
     * @param                              $name
     * @param                              $app_name
     */
    public static function name(Route $toute, $name, $app_name) {
        $toute->route_name               = $name;
        static::$named[$app_name][$name] = $toute;
    }

    /**
     * Does a name exist in the list of named routes?
     *
     * @param $name
     *
     * @return bool
     */
    public static function name_exists($name) {
        return isset(static::$named[App::_()->name][$name]);
    }

    /**
     * Make a named route into a URL with specified arguments
     *
     * @param string       $name      The name of the route to use
     * @param array|string $arguments The arguments to pass to the route, fill in any variables
     *
     * @param array        $query_arr Optional query string to append to the URL
     * @param null         $default
     *
     * @return string The url of the newly created route. Some sort of fail check should be done to make sure the route
     *                                is valid
     */
    public static function generate_url($name, $arguments = [], $query_arr = [], $default = null) {
        $arguments = is_array($arguments) ? $arguments : [$arguments];
        $APP_NAME  = App::_()->name;
        if (!isset(static::$named[$APP_NAME][$name])) {
            Log::init("Could not generate a proper URL in {$APP_NAME} for route named {$name}", 'log', debug_backtrace()[0])->log_it();
            return $default ?: App::_()->base_url;
        }
        /** @var Route $route */
        $route = static::$named[$APP_NAME][$name];

        if (empty($arguments)) {
            $arguments = array_values($route->indexes);
        }

        $pattern = $route->pattern;

        $number = 0;
        foreach ($route->indexes as $key => $index) {
            if (!empty($arguments)) {
                $value_to_add = array_shift($arguments);
            } else {
                $value_to_add = '_';
            }
            $pattern[$key] = $value_to_add;
            $number++;
        }
        $url = App::_()->base_url;
        if (!empty($pattern)) {
            $url .= implode('/', $pattern) . '/';
        }
        if (!empty($arguments)) {
            $url .= implode('/', $arguments);
        }
        $url = str_replace('$', '', $url);
        $url = trim($url, "/\n\0\x0B\t\r");

        return $url . '/' . (!empty($query_arr) ? (is_string($query_arr) ? $query_arr : '?' . http_build_query($query_arr)) : '');
    }

    /**
     * Call a route, return the result. The router probably returns this, then this in turn returns the raw output data
     * to be sent to the browser
     *
     * @param $http_method
     *
     * @return \Sm\View\Abstraction\View|string|array|null
     */
    abstract public function call($http_method);

}