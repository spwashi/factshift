<?php
/**
 * User: Sam Washington
 * Date: 4/4/2015
 * Time: 4:20 PM
 */

namespace Spwashi\Controller;

use Sm\Core\App;
use Sm\Process\Process;
use Sm\Security\XSS;
use Sm\View\View;
use Spwashi\Controller\Abstraction\SpwashiController;

class HomeController extends SpwashiController {
	public function index() {
		return $this->view->insertContentCreate('user/home.php')->setTitle('Redo', 'Where the heart is');
	}

	public function pas() {
		$post_result    = !empty($_POST) ? Process::create('allenhall/generate_allenotes.php')->getOutput() : [];
		$error_messages = isset($post_result['message']) ? (array)$post_result['message'] : false;
		$variables      = [
			'post_data' => XSS::escape($_POST),
			'result'    => $post_result,
			'print'     => true,
			'output'    => $error_messages ? $error_messages['contents'] : false
		];
		$v = View::create('allenhall/allenotes.php', $variables);
		if ($error_messages) $v->addMessages($error_messages);

		return $this->view->insertContent($v)->setTitle('Allenotes');
	}

	public function allenotes() {
		return $this->view->insertContentCreate('allenhall/generic.php')->insertContentCreate('allenhall/finished_allenotes.html')->setTitle('Allenotes', 'Allenotes generated for this week');
	}

	public function example() {
		$v = View::create(App::_()->path . '/drivers/_models.php', [], false);
		return 'e8hq2R83';
	}
	public function example_2() {
		$v = View::create('examples/text_2.php');
		return $v;
	}
}