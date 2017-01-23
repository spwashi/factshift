<?php
/**
 * User: sam
 * Date: 5/20/15
 * Time: 11:03 PM
 */

namespace Sm\View;


use Sm\Core\App;
use Sm\Core\Util;
use Sm\View\Abstraction\View;

/**
 * Class JavaScript
 ** A class useful for returning JS files. Nothing really out of the ordinary.
 *
 * @package Sm\View
 */
class JavaScript extends View {
    public $content_type = 'js';
    public function __construct($content = null) {
        if ($content instanceof View) {
            $this->content = $content->getContent();
        } else {
            $this->content = $content;
        }
    }
    static public function create($path, $data = [ ], $is_in_view_path = true, App $App = null) {
        $view = new static(null);
        $path = ($is_in_view_path ? App::_()->Paths->js : '') . $path;
        ob_start();
        Util::includeWithVariables($path, $data, true);
        $view->setContent(ob_get_clean());
        
        return $view;
    }
}