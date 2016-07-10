<?php
/**
 * User: Sam Washington
 * Date: 3/28/2015
 * Time: 8:53 PM
 */

return [
    'name'                   => 'Sm',                        #The name of the application! Unnecessary, as the real name is based on the path to the app, but this is more for documentation I guess
    'base_url'               => 'http://codoodler.com/',  #If all urls to this application are based on some sort of url prefix, use this
    #
    'view_path'              => 'APP_PATH/views/',
    'css_path'               => 'APP_PATH/public/css/',
    'font_path'              => 'APP_PATH/public/fonts/',
    'js_path'                => 'APP_PATH/public/js/',
    'template_path'          => 'VIEW_PATH/templates/',
    'controller_path'        => 'APP_PATH/Controller/',
    'model_path'             => 'APP_PATH/Model/',
    'libs_path'              => 'APP_PATH/Libs/',
    'scripts_path'           => 'APP_PATH/scripts/',
    'email_path'             => 'APP_PATH/email/',
    'image_path'             => 'APP_PATH/public/css/images/',
    'user_path'              => '',
    #
    #This is the function used to boot the application. This MUST exist in the Sm/../app.php file!! Without it, the app cannot be initially booted and nothing will work.
    #   Afterwards, in other app.php files, this doesn't need to exist because they will inherit the boot process from the already loaded (usually this) application
    #   By default, this function looks in the drivers folder for any autoload functions, any named filters, any classes for the IoC container, and any routes to register.
    #   Feel free to edit this function as you wish:: just know that this framework needs some stuff registered by default in these files! Change at your own risk, and maintain some sort of backup of
    #       this file!
    'boot_function'          => function ($name) {
        $path = BASE_PATH . $name . '/drivers/';
        if (file_exists($path)) {
            $files = array_diff(scandir($path), ['..', '.']);
            if (in_array('autoload.php', $files))
                \Sm\Autoload\Autoload::register(require $path . 'autoload.php');
            if (in_array('registry.php', $files))
                \Sm\Core\IoC::register(require $path . 'registry.php');
            if (in_array('helpers.php', $files))
                \Sm\Helper\Helper::register(require $path . 'helpers.php');
            if (in_array('routes.php', $files))
                \Sm\Router\Touter::register(require $path . 'routes.php');
            if (in_array('models.php', $files))
                \Sm\Model\ModelMeta::register(require $path . 'models.php');
            return true;
        } else {
            return false;
        }
    },
    'default_route_function' => function () {
        return 'Page not found!';
    }
];