<?php
/**
 * User: Sam Washington
 * Date: 12/21/15
 * Time: 11:13 PM
 */

namespace Sm\View;

use Sm\Core\App;
use Sm\View\Abstraction\View;

/**
 * Class FONT
 ** A class useful for returning FONT files. Nothing really out of the ordinary.
 *
 * @package Sm\View
 */
class Font extends View {
    public $path = '';
    public function __construct($content = null) {
        if ($content instanceof View) {
            $this->content = $content->getContent();
        } else {
            $this->content = $content;
        }
    }
    
    static public function create($path, $data = [ ], $is_in_view_path = true, App $App = null) {
        $view = new static(null);
        $path = ($is_in_view_path ? App::_()->Paths->font : '') . $path;
        if (file_exists($path)) {
            $file_open  = file_get_contents($path);
            $view       = static::init($file_open);
            $view->path = $path;
        }
        return $view;
    }
}