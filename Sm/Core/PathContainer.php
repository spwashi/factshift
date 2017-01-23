<?php
/**
 * User: Sam Washington
 * Date: 12/17/16
 * Time: 6:09 PM
 */

namespace Sm\Core;


/**
 * Class PathContainer
 *
 * @package Sm\Core
 *
 * @property-read string $app            Path to the app
 * @property-read string $user           Path to the User directory
 * @property-read string $view           Path to the App's MVC views
 * @property-read string $css            Path to the App's CSS files
 * @property-read string $font           Path to the App's font files
 * @property-read string $js             Path to the App's JavaScript
 * @property-read string $libs           Path to the App's supporting libraries
 * @property-read string $scripts        Path to the App's supporting PHP or CGI scripts; not views, not controllers, not models, not classes
 * @property-read string $email          Path to the App's email templates
 * @property-read string $image          Path to the App's images that support the site styles
 * @property-read string $template       Path to the App's templates
 * @property-read string $model          Path to the App's Models
 * @property-read string $driver         Path to the App's Drivers
 * @property-read string $controller     Path to the App's Controllers
 */
class PathContainer {
    protected $app        = '';
    protected $user       = '';
    protected $driver     = 'APP_PATH/Core/drivers/';
    protected $view       = 'APP_PATH/views/';
    protected $css        = 'APP_PATH/public/css/';
    protected $font       = 'APP_PATH/public/fonts/';
    protected $js         = 'APP_PATH/public/js/';
    protected $controller = 'APP_PATH/Controller/';
    protected $model      = 'APP_PATH/Entity/Model/';
    protected $libs       = 'APP_PATH/Libs/';
    protected $scripts    = 'APP_PATH/scripts/';
    protected $email      = 'APP_PATH/email/';
    protected $image      = 'APP_PATH/public/css/images/';
    protected $template   = 'VIEW_PATH/templates/';
    
    public function set($name, $value) {
        $this->$name = $value;
    }
    public function __get($name) {
        $path = $this->$name;
        if (strpos($path, 'APP_PATH') !== false && $name != 'app') $path = str_replace('APP_PATH', $this->app, $path);
        if (strpos($path, 'DRIVER_PATH') !== false && $name != 'driver') $path = str_replace('DRIVER_PATH', $this->__get('driver'), $path);
        if (strpos($path, 'VIEW_PATH') !== false && $name != 'view') $path = str_replace('VIEW_PATH', $this->__get('view'), $path);
        if (strpos($path, 'USER_PATH') !== false && $name != 'user') $path = str_replace('USER_PATH', $this->__get('user'), $path);
        return str_replace('//', '/', $path);
    }
}