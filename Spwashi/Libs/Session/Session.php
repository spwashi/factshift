<?php
/**
 * User: sam
 * Date: 6/10/15
 * Time: 2:28 AM
 */

namespace Spwashi\Libs\Session;

use Sm\Core\IoC;
use Sm\Core\Util;
use Sm\Response\Http;
use Sm\Router\Toute;
use Spwashi\Model\User;

class Session extends \Sm\Session\Session {
	public static function is_valid() {
	}

	public static function require_user_or_redirect(&$user, $url = null) {
		if (!($user = static::get_user())) {
			Http::redirect(Toute::generate_url('spwashi_login', null, $url ? ['goto' => $url] : $url), true, 302);
		}
	}

	public static function has_valid_user() {
		return (static::get('user') instanceof User);
	}

	/**
	 * @return User|false
	 */
	public static function get_user() {
		return static::get('user');
	}

	/**
	 * Set the current user in the session
	 *
	 * @param  \Spwashi\Model\User $user
	 */
	public static function set_user(User $user) {
		static::set('user', $user);
	}

	/**
	 * Generate a nonce for a form name, return it. Also, add it to an array of nonces that are associated with that
	 * form in the session
	 *
	 * @param $form_name
	 *
	 * @return string
	 */
	public static function generate_nonce($form_name) {
		$nonce_name = 'nonce-' . $form_name;
		$session    = IoC::_()->session;
		if (!$session) return false;

		$session_nonce = $session->get($nonce_name);
		if (!is_array($session_nonce)) $session_nonce = [];

		$nonce = $session_nonce[] = Util::generateRandomString(15, Util::$standard_permitted_characters . '%^&*()!');
		$session->set($nonce_name, $session_nonce);
		return $nonce;
	}

	public static function get_nonce($form_name) {
		$session = IoC::_()->session;
		if (!$session) return false;

		$result = $session->get('nonce-' . $form_name);
		return $result ?: [];
	}
	public static function check_nonce($form_name, $value) {
		if (!isset($value) || !in_array($value, static::get_nonce($form_name))) {
			return false;
		}
		return true;
	}
}