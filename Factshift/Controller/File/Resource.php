<?php
/**
 * User: sam
 * Date: 5/21/15
 * Time: 11:07 PM
 */

namespace Factshift\Controller\File;

use Sm\View\CSS;
use Sm\View\JavaScript;

class Resource {
    public function css($file) {
        $file = implode('/', func_get_args());
        try {
            return CSS::create($file);
        } catch (\Exception $e) {
            return CSS::init('.could_not_find_css_file{}');
        }
    }
    
    public function js($file) {
        $file = implode('/', func_get_args());
        try {
            return JavaScript::create($file);
        } catch (\Exception $e) {
            return JavaScript::init('function could_not_find_js_file(){}');
        }
    }
    
    
}