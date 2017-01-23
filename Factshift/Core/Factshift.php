<?php
/**
 * User: Sam Washington
 * Date: 12/17/16
 * Time: 5:04 PM
 */

namespace Factshift\Core;


use Sm\Core\App;
use Sm\Core\IoC;
use Sm\Core\PathContainer;
use Sm\Environment\Environment;
use Sm\URI\URI;

/**
 * Class Factshift
 *
 * @package Factshift\Core
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
class Factshift extends App {
    protected $name             = 'Factshift';
    protected $base_url         = 'http://localhost/s_dev/';
    protected $site_title       = 'Factshift';
    protected $site_title_short = 'Factshift';
    
    public function _init_paths() {
        $PathContainer = parent::_init_paths();
        $PathContainer->set('user', 'APP_PATH/_users/');
        return $PathContainer;
    }
    public function default_route_function() {
        return '<span style="font-family: Consolas, sans-serif;">factshift -- {' . $_SERVER['REQUEST_URI'] . '}{' . URI::get_uri_string() . '}</span>';
    }
    public function change_uri($uri) {
        return ltrim(str_replace('s_dev', '/', $uri), '/');
    }
    
}