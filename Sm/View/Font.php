<?php
/**
 * User: Sam Washington
 * Date: 12/21/15
 * Time: 11:13 PM
 */

namespace Sm\View;

use Sm\Core\App;
use Sm\Response\Http;
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

    static public function create($path, $data = [], $is_in_view_path = true) {
        $view = new static(null);
        $p    = App::getPathDecision(App::USE_APP_FONT_PATH, $is_in_view_path);
        $path = $p . $path;
        if (file_exists($path)) {
            $file_open  = file_get_contents($path);
            $view       = static::init($file_open);
            $view->path = $path;
        } else {
//            $view->content = $p . $path . '|' . App::_()->font_path;
        }
        return $view;
    }

    /**
     * Set the actual headers
     *
     * @return mixed
     */
    public function makeHeaders() {
        $path = $this->path;
        if (file_exists($path)) {
//            $extension = pathinfo($path)['extension'];
//            Http::make_resource_headers($extension);
            Http::make_resource_headers('css');
        }
    }
}