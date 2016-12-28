<?php
/**
 * User: sam
 * Date: 6/8/15
 * Time: 1:00 AM
 */

namespace Sm\View;


use Sm\Core\App;

class Image extends View {
    public $content_type;
    static public function create($path, $data = [ ], $is_in_view_path = true) {
        $view = new static(null);
        $path = ($is_in_view_path ? App::_()->Paths->image : '') . $path;
        $view->setContent(file_get_contents($path));
        $view->content_type = pathinfo($path, PATHINFO_EXTENSION);
        return $view;
    }
}