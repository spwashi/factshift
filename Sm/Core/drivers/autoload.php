<?php
/**
 * User: Sam Washington
 * Date: 3/28/2015
 * Time: 8:49 PM
 */

use Sm\Core\App;

return [
    function ($classname) {
        $app_name = App::_()->name;
        $test     = $app_name . '\\Model';
        if (strpos($classname, $test) !== false) {
            $file = str_replace('\\', '/', $classname);
            if (is_file(BASE_PATH . $file . '.php')) {
                require_once(BASE_PATH . $file . '.php');
            }
        }
        return false;
    },
    function ($class) {
        if (strpos(strtolower($class), 'kint') >= 0) {
            if (is_file(BASE_PATH . 'Factshift/vendor/kint/Kint.class.php')) {
                require_once(BASE_PATH . 'Factshift/vendor/kint/Kint.class.php');
            }
        }
    },
];