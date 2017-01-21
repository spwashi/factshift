<?php
/**
 * User: sam
 * Date: 5/8/15
 * Time: 6:44 PM
 */

namespace Sm\Router;

use Sm\Core\App;
use Sm\Core\Util;
use Sm\Development\Log;
use Sm\Router\Abstraction\Route;

/**
 * Class Toute
 * A native routing tool.
 *
 * Tightly coupled with the SM Core suite and the SM Helper class
 *
 *
 * @package Sm\Router
 */
class Router extends Abstraction\Router {
    protected $app_name;
    private   $get                = [ ];
    private   $post               = [ ];
    private   $put                = [ ];
    private   $delete             = [ ];
    private   $all                = [ ];
    protected $named_routes       = [ ];
    protected $matched_route_name = null;
    /** @var array Keeps track of the route paths that we've already called so we don't accidentally */
    protected static $called_route_paths = [ ];
    public function __construct() { }
#########################################################
#        Direct router functions                        #
#########################################################
    /**
     * Match a uri to a route, return the result.
     *
     * @param $http_method
     * @param $uri
     *
     * @return Route The matched route. If there is no match, a route will still be returned.
     */
    public function match($http_method, $uri) {
        #add a trailing slash and
        $uri         = trim(str_replace('//', '/', $uri), '/');
        $http_method = strtolower($http_method);
        $index       = $uri == '' ? 27 : Util::alpha_ord($uri);
        
        $matches = [ ];
        if (!empty($this->{$http_method})) $matches = static::find_matches($this->{$http_method}, $index, $uri);
        if (empty($matches)) $matches = static::find_matches($this->all, $index, $uri);
        #In case we find no matches or the application where the route is supposed to lie cannot be booted, have this
        #default route get returned saying nothing more than "Well, that didn't work!"
        $default_route           = new Toute();
        $default_route->app      = App::_()->name;
        $default_route->callback = null;
        #if there are matches, work with it.
        if (!empty($matches)) {
            $explode_uri = explode('/', $uri);
            $best_match  = max(array_keys($matches));
            $best_match  = $matches[ $best_match ];
            
            /** @var Toute $route */
            $route            = $best_match['route'];
            $app              = $route->app;
            $is_just_load_app = is_string($route->callback) && $route->callback === '_load_app';
            #If the application in the route is not the app that is already booted (set as main), then the route might actually depend
            #   on routing that has been set up in another application's folder. Boot that app, try tp check the route based on those loaded routes.
            if (($app !== null && $app !== App::_()->name) || $is_just_load_app) {
                #boot the app to get the routing rules that may lie in that application
                $app_inst = App::init($app)->boot();
                if ($app_inst->has_been_booted() && !in_array(implode('', $route->pattern), static::$called_route_paths)) {
                    $app_inst->set_as_main();
                } else {
                    return $default_route;
                }
                static::$called_route_paths[] = implode('', $route->pattern);
                if ($route->strip) $uri = ltrim($uri, implode('', $route->pattern));
                return App::_()->IoC->router->match($http_method, App::_()->change_uri($uri));
            }
            $route->parameters = [ ];
            foreach ($best_match['parameters'] as $index => $value) {
                if ($value == 'method' || $value == '*') {
                    $route->method = $explode_uri[ $index ] ?? null;
                } else {
                    $route->parameters[ $value ] = $explode_uri[ $index ];
                }
                unset($explode_uri[ $index ]);
            }
            $predicted_parameter_amount = count($best_match['parameters']);
            foreach ($explode_uri as $k => $v) {
                if ($k <= $predicted_parameter_amount || $v == '') continue;
                $route->parameters[ 'index_' . $k ] = $v;
            }
            if ($route->route_name) $this->matched_route_name = $route->route_name;
            return $route;
        } else {
            return $default_route;
        }
    }
    public function get_matched_route_name() {
        return $this->matched_route_name;
    }
    public function generate_url($name, $arguments = [ ], $query_arr = [ ], $default = null) {
        $arguments = is_array($arguments) ? $arguments : [ $arguments ];
        if (!isset($this->named_routes[ $name ])) {
            $APP_NAME = App::_()->name;
            Log::init("Could not generate a proper URL in {$APP_NAME} for route named {$name}", debug_backtrace()[0], 'log')->log_it();
            return $default ?: App::_()->base_url;
        }
        /** @var Route $route */
        $route = $this->named_routes[ $name ];
        
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
            $pattern[ $key ] = $value_to_add;
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
        #remove any unexpected null-terminating or linefeed characters
        $url = trim($url, "/\n\0\x0B\t\r");
        
        return $url . '/' . (!empty($query_arr) ? (is_string($query_arr) ? $query_arr : '?' . http_build_query($query_arr)) : '');
    }
    public function register($array) {
        if (!is_array($array)) return;
        foreach ($array as $index => $route) {
            $callback = isset($route['callback']) ? $route['callback'] : (isset($route['c']) ? $route['c'] : null);
            if ($callback === null) continue;
            
            $type = isset($route['http_method']) ? $route['http_method'] : 'all';
            #If there is nothing to the pattern, default it to 'home'. I am not sure how to handle an empty route, so this will be it.
            $pattern = isset($route['pattern']) ? $route['pattern'] : (isset($route['p']) ? $route['p'] : null);
            if ($pattern === null) $pattern = '{variable}:[a-zA-Z\d]*';
            
            $settings = [
                'app'             => isset($route['app']) ? $route['app'] : null,
                'helpers'         => isset($route['helpers']) ? $route['helpers'] : [ ],
                'subdomain'       => isset($route['subdomain']) ? $route['subdomain'] : '',
                'name'            => !(is_numeric($index)) ? $index : (isset($route['name']) ? $route['name'] : null),
                'parameter_count' => isset($route['parameter_count']) ? $route['parameter_count'] : null,
                'strip'           => isset($route['strip']) ? $route['strip'] : false,
            ];
            $this->add($type, $pattern, $callback, $settings);
        }
    }
#########################################################
#        Getters and setters                            #
#########################################################
    /**
     * Add an item to the necessary routes array based on the type (GET, PUT, POST, delete)
     *
     * @param string          $type     The type of HTTP request
     * @param string          $pattern  The pattern that the URI must match in order to identify the route
     * @param callable|string $callback What happens when the route gets matched
     * @param array           $settings An array of various settings related to the route. Thus far, only the application that needs to be booted and the helpers that are run at select times during
     *                                  the calling process
     */
    private function add($type, $pattern, $callback, $settings = [ ]) {
        
        #explode the parts of the pattern (which is in the format of {path/to/specific/route}) for use later
        $pattern_arr = explode('/', trim($pattern, '/'));
        #hold each different portion of the pattern array, replace with regexp if needed
        $pattern_portion_holder_array = [ ];
        $parameter_array              = [ ];
        
        $added_route           = new Toute();
        $added_route->callback = $callback;
        
        $added_route->pattern                  = $pattern_arr;
        $added_route->http_method              = $type;
        $added_route->helpers                  = $settings['helpers'] ?? [ ];
        $added_route->app                      = $settings['app'] ?? null;
        $added_route->assigned_parameter_count = $settings['parameter_count'] ?? null;
        $added_route->strip                    = $settings['strip'] ?? false;
        $added_route->route_name               = $settings['name'] ?? ($added_route->route_name ? $added_route->route_name : null);
        
        #iterate through the pattern array, replace each variable with a matching regexp, keep track of each variable
        foreach ($pattern_arr as $key => $route_portion) {
            $match = null;
            
            #The text after the colon is meant to be the regexp for the variable
            $pattern_portion_qualifier = explode(':', $route_portion);
            if (strpos($route_portion, '{') === 0) {
                #capture the part of the route_portion that contains the name of the variable
                preg_match("~ (?<=\{) .+ (?:(?=\}))~x", $route_portion, $match);
                
                #the name of the variable, add it to an array of the parameters
                $parameter_array[ $key ] = $match[0];
                
                #an array of the values in the pattern that are variables.
                $added_route->indexes[ $key ] = $match[0];
                
                if (isset($pattern_portion_qualifier[1])) {
                    $p_p_q = $pattern_portion_qualifier[1];
                } elseif ($match[0] == 'method' || $match[0] == '*') {
                    $p_p_q = '?[a-zA-Z\d]*';
                } else {
                    $p_p_q = '?[a-zA-Z\d]*';
                }
                $pattern_portion_holder_array[] = $p_p_q;
                
                continue;
            }
            $pattern_portion_holder_array[] = $route_portion;
        }
        
        $pattern = implode('/', array_values($pattern_portion_holder_array));
        if ($pattern == '') {
            $pattern = '[\d]*';
            $index   = 27;
        } else {
            $index = Util::alpha_ord($pattern_portion_holder_array[0]);
            #if the index is not between a or z
            $index = $index >= 0 && $index <= 25 ? $index : 26;
        }
        
        #if the route is named, keep track of it
        if ($added_route->route_name) $this->named_routes[ $added_route->route_name ] = $added_route;
        
        
        #build the index if nonexistent
        if (!isset($this->{$type}[ $index ])) {
            $this->{$type}[ $index ] = [ ];
        }
        
        #add the created route to the pre-existing route array at the specified index
        $this->{$type}[ $index ][ $pattern ] = [ 'parameters' => $parameter_array, 'route' => $added_route ];
    }
    /**
     * Look through an array and pick out the matching routes. Whichever route has the fewest variables is going to be considered the best match, rank them based on how many variables there are.
     *
     * @param $arr   array The array in this class in which to look for the routes
     * @param $index int The index in the array to search through (routes are sorted into sub-arrays alphabetically, search through the one that fits. Else, try 26 (non-alphabetic)
     * @param $uri   string The URI to try to match
     *
     * @return array
     */
    private static function find_matches($arr, $index, $uri) {
        $matches = [ ];
        if (isset($arr[ $index ])) {
            foreach ($arr[ $index ] as $pattern => $qualifiers) {
                preg_match('~^' . $pattern . '~x', $uri, $tmp);
                if (!empty($tmp)) {
                    $count       = $uri !== '' ? count(explode('/', $uri)) : 0;
                    $param_count = count($qualifiers['parameters']);
                    /** @var Toute $route */
                    $route = $qualifiers['route'];
                    if ($route->assigned_parameter_count !== null && $route->assigned_parameter_count !== $count) {
                        continue;
                    }
                    $matches[ $count - $param_count ] = $qualifiers;
                }
                $tmp = [ ];
            }
        }
        #If we can't find any matches, search the "wildcard" index of the matching array for a match
        if (empty($matches) && $index != 26) return static::find_matches($arr, 26, $uri);
        return $matches;
    }
}