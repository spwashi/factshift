<?php
/**
 * User: Sam Washington
 * Date: 3/28/2015
 * Time: 8:28PM
 */

return [
    [
        'http_method' => 'all',
        'app'         => 'Factshift',
        #Set the callback to '_load_app' to make this only load the desired application. Then, if there is no matching route,
        'callback'    => '_load_app'
    ],
    [
        'http_method' => 'all',
        'pattern'     => 'h',
        'app'         => 'Honor',
        #Set the callback to '_load_app' to make this only load the desired application. Then, if there is no matching route,
        'callback'    => '_load_app',
        #Strip removes the /h/ from the pattern because all of the routes in that application are written without it
        'strip'       => true
    ],
    [
        'http_method' => 'all',
        'pattern'     => 'factshift/',
        'app'         => 'Factshift',
        #Set the callback to '_load_app' to make this only load the desired application. Then, if there is no matching route,
        'callback'    => '_load_app',
        'strip'       => true
    ],
    [
        'http_method' => 'all',
        'pattern'     => 'error/404',
        'callback'    => 'response@error_404',
        #We name the route to be able to use it elsewhere
        'name'        => '404'
    ],
];