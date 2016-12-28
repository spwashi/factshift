<?php
/**
 * User: sam
 * Date: 5/20/15
 * Time: 11:07 PM
 */

namespace Sm\View;


use Sm\Core\App;
use Sm\Core\Util;
use Sm\Response\Http;
use Sm\View\Abstraction\View;

/**
 * Class CSS
 ** A class useful for returning CSS files. Nothing really out of the ordinary.
 *
 * @package Sm\View
 */
class CSS extends View {
    public $content_type = 'css';
    public function __construct($content = null) {
        if ($content instanceof View) {
            $this->content = $content->getContent();
        } else {
            $this->content = $content;
        }
    }
    static public function create($path, $data = [ ], $is_in_view_path = true) {
        $view = new static(null);
        $path = ($is_in_view_path ? App::_()->Paths->css : '') . $path;
        ob_start();
        Util::includeWithVariables($path, $data);
        $view->setContent(ob_get_clean());
        
        return $view;
    }
}