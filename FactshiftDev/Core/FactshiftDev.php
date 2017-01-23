<?php
/**
 * User: Sam Washington
 * Date: 12/17/16
 * Time: 5:04 PM
 */

namespace FactshiftDev\Core;


use Sm\Core\App;
use Sm\URI\URI;

/**
 * Class FactshiftDev
 *
 * @package FactshiftDev\Core
 * @inheritdoc
 */
class FactshiftDev extends App {
    protected $name             = 'FactshiftDev';
    protected $base_url         = 'http://localhost/s_dev/dev/';
    protected $site_title       = 'FactshiftDev';
    protected $site_title_short = 'FactshiftDev';
    
    public function _init_paths() {
        $PathContainer = parent::_init_paths();
        $PathContainer->set('user', 'APP_PATH/_users/');
        return $PathContainer;
    }
    public function _boot_function($app_name) {
        static::init('Factshift')->boot();
        return parent::_boot_function($app_name);
    }
    public function default_route_function() {
        return '<span style="font-family: Consolas, sans-serif;">factshift.dev -- {' . $_SERVER['REQUEST_URI'] . '}{' . URI::get_uri_string() . '}</span>';
    }
    public function change_uri($uri) {
        return ltrim(str_replace('s_dev/dev', '', $uri), '/');
    }
    
}