<?php
/**
 * User: sam
 * Date: 6/4/15
 * Time: 6:41 PM
 */

namespace Sm\Router\Abstraction;
abstract class Router {
    /**
     * Add multiple routes to the registered array
     *
     * @param $array
     */
    abstract public function register($array);
    /**
     * Match a route to a URI under the given HTTP method used
     *
     * @param $http_method_used string The HTTP Method used ( GET, POST )
     * @param $uri_to_match
     *
     * @return Route
     */
    abstract public function match($http_method_used, $uri_to_match);
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
    abstract public function generate_url($name, $arguments = [ ], $query_arr = [ ], $default = null);
    /**
     * Get the name of the booted app name
     *
     * @return string
     */
    abstract public function get_matched_route_name();
}