<?php
/**
 * User: Sam Washington
 * Date: 4/4/2015
 * Time: 4:20 PM
 */

namespace Spwashi\Controller;

use Sm\View\View;
use Spwashi\Controller\Abstraction\SpwashiController;

class HomeController extends SpwashiController {
	public function index() {
		return $this->view->insertContentCreate('user/home.php')->setTitle('Redo', 'Where the heart is');
	}

	public function example() {
		return $this->view
			->insertContent(View::create('examples/text.php')
				                ->enforceTemplate('content.php'))
			->setTitle('Example Text', 'Original text taken from http://martinfowler.com/articles/mocksArentStubs.html');
	}
	public function example_2() {
		return $this->view
			->insertContent(View::create('examples/text_2.php')
				                ->enforceTemplate('content.php'))
			->setTitle('Example Text 2', 'Original text taken from http://www.cs.colby.edu/maxwell/courses/tutorials/maketutor/');
	}
}