<?php
/**
 * User: sam
 * Date: 6/4/15
 * Time: 6:41 PM
 */

namespace Sm\Router\Abstraction;
abstract class Router {
    /**
     * Add multiple routes to the 'registered' array
     *
     * @param $array
     */
//    abstract public function register($array);

	/**
	 * Match a route to a URI under the given HTTP method used
	 * @param $http_method_used string The HTTP Method used ( GET, POST )
	 * @param $uri_to_match
	 *
	 * @return Route
	 */
    abstract public function match($http_method_used, $uri_to_match);
}