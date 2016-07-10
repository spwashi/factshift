<?php
/**
 * User: sam
 * Date: 6/13/15
 * Time: 6:29 PM
 */
namespace Spwashi\Controller\User;

use Sm\Process\Process;
use Sm\Response\Http;
use Sm\Router\Toute;
use Sm\Security\XSS;
use Sm\View\View;
use Spwashi\Controller\Abstraction\SpwashiController;
use Spwashi\Libs\Session\Session;

class UserController extends SpwashiController {
	/** @var  View */
	public $view;

	public function home() {
		return $this->view->insertContentCreate('user/home.php')->setTitle('User Home');
	}

	public function dump() {
		ob_start();
		var_dump(Session::get_user());
		$ret = ob_get_clean();
		return View::init($ret);
	}

	public function signup() {
		$post_result = !empty($_POST) ? Process::create('user/process_user_signup.php')->getOutput() : [ ];
		$error_messages = isset($post_result['message']) ? (array)$post_result['message'] : false;
		$variables = [
			'post_data' => XSS::escape($_POST),
			'result'    => $post_result
		];


		$v = View::create('user/signup.php', $variables);
		if ($error_messages) $v->addMessages($error_messages);

		return $this->view->insertContent($v)->setTitle('Sign Up');
	}

	public function login() {
		$post_result = !empty($_POST) ? Process::create('user/process_user_login.php')->getOutput() : [ ];
		$error_messages = isset($post_result['message']) ? (array)$post_result['message'] : false;
		$variables = [
			'post_data' => XSS::escape($_POST),
			'result'    => $post_result
		];
		$v = View::create('user/login.php', $variables);
		if ($error_messages) $v->addMessages($error_messages);
		return $this->view->insertContent($v)->setTitle('Login');
	}

	public function logout() {
		Session::destroy();
		Http::redirect(Toute::generate_url('home'));
	}

}