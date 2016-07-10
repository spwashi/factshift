<?php
/**
 * User: Sam Washington
 * Date: 3/21/2015
 * Time: 1:17 AM
 */
use Sm\Core\App;
use Sm\Helper\Helper;
use Sm\Output\Output;
use Sm\Router\Touter;
use Sm\Session\Session;
use Sm\URI\URI;

ob_start();
define('BASE_PATH', __DIR__ . '/');
#todo
//<editor-fold desc="TESTING PURPOSES ONLY">
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
ini_set('xdebug.var_display_max_depth', 10);
ini_set('xdebug.var_display_max_children', 256);
ini_set('xdebug.var_display_max_data', 1024);
error_reporting(-1);
//*/
//</editor-fold>
require_once 'Sm/Core/App.php';
#standard autoloading. Searches for a file that exactly matches the classname (Every class in the Sm framework)
spl_autoload_register(function ($class) {
    $class = str_replace('\\', '/', $class);
    if (is_file(BASE_PATH . $class . '.php')) {
        require_once(BASE_PATH . $class . '.php');
    }
});

/*
 * We boot the Sm App by default. This is necessary to handle some autoloading, routing, and other stuff that this framework uses.
 * If we can't boot the default app, then we exit because of how much relies on it.
 */
$app = App::init('Sm')->boot();
$app->has_been_booted() ? $app->set_as_main() : exit('Unable to load application');
Helper::tryToRun(Helper::PRE_ROUTING);                          #Try to run any validation functions that happen before the router is called. If there is any user IP blocking or whatever, maybe do it here
$router      = new Touter;                                           #This is the class that will return the route that we want based on the URI
$http_method = $_SERVER['REQUEST_METHOD'];                      #This is the HTTP Method through which the page was requested (GET, POST). Consider making this a function to allow for GET and PUT
$uri_string  = URI::get_uri_string();                            #This is the part of the URI that comes after the domain name

$route = $router->match($http_method, $uri_string);             #The matching process finds the application that is necessary to load, then loads it. The boot process of each app may be unique.
Session::start();                                               #We start the Session here in case there is any autoloading that needs to be done in the matching process
$output = $route->call($http_method);                           #$output is the raw output of the router callback;

Helper::tryToRunReference(Helper::POST_PROCESS, $output);
$output = Output::process($output);                             #process this output  via the Output class
Helper::tryToRunReference(Helper::PRE_OUTPUT, $output);         #if there is any secondary processing necessary (e.g. any localization), do it here
echo $output;
