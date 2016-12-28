<?php
/**
 * User: Sam Washington
 * Date: 4/4/2015
 * Time: 4:17 PM
 */

use Sm\Core\App;

return [
    function ($class) {
        if (strpos(strtolower($class), 'kint') >= 0) {
            if (is_file(App::_()->Paths->app . 'vendor/kint/Kint.class.php')) {
                require_once(App::_()->Paths->app . 'vendor/kint/Kint.class.php');
            }
        }
    },
];