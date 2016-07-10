<?php
/**
 * User: sam
 * Date: 6/20/15
 * Time: 1:27 PM
 */

namespace Spwashi\Controller\Abstraction;

use Sm\Core\App;
use Sm\View\View;

abstract class SpwashiController {
	/** @var View */
	public $view;

	public function __construct() {
		/** @var View view */
		$this->view = View::init()
		                  ->enforceTemplate('test/layout.php')
		                  ->insertContent('A project with a temporary name', '{{site_description}}');
	}
}