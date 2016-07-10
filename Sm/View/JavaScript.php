<?php
/**
 * User: sam
 * Date: 5/20/15
 * Time: 11:03 PM
 */

namespace Sm\View;


use Sm\Core\App;
use Sm\Core\Util;
use Sm\Response\Http;
use Sm\View\Abstraction\View;

/**
 * Class JavaScript
 ** A class useful for returning JS files. Nothing really out of the ordinary.
 *
 * @package Sm\View
 */
class JavaScript extends View {
	public $cachable = true;
	public function __construct($content = null) {
		if ($content instanceof View) {
			$this->content = $content->getContent();
		} else {
			$this->content = $content;
		}
	}
	static public function create($path, $data = [ ], $is_in_view_path = true, $throw_error = false) {
		$view = new static(null);
		$p = App::getPathDecision(App::USE_APP_JS_PATH, $is_in_view_path);
		$path = $p.$path;
		ob_start();
		Util::includeWithVariables($path, $data, true);
		$view->setContent(ob_get_clean());

		return $view;
	}
	/**
	 * Set the actual headers
	 *
	 * @return mixed
	 */
	public function makeHeaders() {
		Http::make_resource_headers('js', $this->title);
	}
}