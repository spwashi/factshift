<?php
/**
 * User: sam
 * Date: 6/4/15
 * Time: 6:52 PM
 */

namespace Sm\Router\Abstraction;

abstract class Route {
    protected static $named;
    public           $route_name;
    public           $callback;
    /**
     * The HTTP method that can be used to access this resource
     *
     * @var string
     */
    public $http_method = 'all';
    
    /**
     * The app this route belongs to
     *
     * @var string
     */
    public $app = 'Sm';
    /** @var null The number of parameters the route must have to function */
    public $assigned_parameter_count = null;
    /**
     * The route exploded at slashes
     *
     * @var array
     */
    public $pattern = [ ];
    /**
     * An array of functions to be run on matching this route
     *
     * @var array
     */
    public $helpers = [ ];
    /**
     * An array of the names of each different named wildcard in the route
     * e.g. "context" in "/p/{context}:[a-z]/edit
     *
     * @var array
     */
    public $indexes = [ ];
    /**
     * In case the callback is done in a way that allows for wildcard methods to be used (e.g. Controller@*), when we finally match the Route, this is the method to use
     *
     * @var null
     */
    public $method = null;
    /**
     * These are the things that will, ni order, replace tje variables in the route
     *
     * @var array
     */
    public $parameters = [ ];
    /**
     * If we're ever in the case where routing is deferred to a different application ater the initial routing,
     * this flag says whether or not we should strip the current URI from the route path.
     * For example, if we are in the initial router that delegates to other apps, there might be a prefix that is assumed to be appended in all the rest of the app's routes
     * like a /s/ for the factshift app. The apps in the factshift app may not be written with that /s/, it could just be there to tell us to switch.'
     * Therefore, we need to strip that from the URL once we
     *
     * @var bool
     */
    public $strip = false;
    public $path;
    
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