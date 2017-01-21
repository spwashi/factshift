<?php
/**
 * User: Sam Washington
 * Date: 12/17/16
 * Time: 5:04 PM
 */

namespace Factshift\Core;


use Sm\Core\App;
use Sm\URI\URI;

/**
 * Class Factshift
 *
 * @package Factshift\Core
 * @inheritdoc
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