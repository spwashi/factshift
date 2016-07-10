<?php
/**
 * User: sam
 * Date: 6/8/15
 * Time: 1:00 AM
 */

namespace Sm\View;


use Sm\Core\App;
use Sm\Response\Http;

class Image extends View {
    public $type;
    static public function create($path, $data = [ ], $is_in_view_path = true) {
        $view = new static(null);
        $p = App::getPathDecision(App::USE_APP_IMAGE_PATH, $is_in_view_path);
        $path = $p . $path;
        $view->setContent(file_get_contents($path));
        $view->type = pathinfo($path, PATHINFO_EXTENSION);
        return $view;
    }

    /**
     * Set the actual headers
     *
     * @return mixed
     */
    public function makeHeaders() {
        Http::make_resource_headers($this->type, $this->title);
    }
}