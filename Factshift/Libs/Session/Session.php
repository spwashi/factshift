<?php
/**
 * User: sam
 * Date: 6/10/15
 * Time: 2:28 AM
 */

namespace Factshift\Libs\Session;

use Factshift\User\AppUser;
use Sm\Core\App;
use Sm\Core\Util;
use Sm\Response\Http;

class Session extends \Sm\Session\Session {
    public function require_user_or_redirect(&$user, $url = null) {
        $user = $this->getUser();
        if (!($this->has_valid_user())) {
            Http::redirect(App::_()->IoC->router->generate_url('login', null, $url ? [ 'goto' => $url ] : $url), true, 302);
        }
    }
    public function has_valid_user() {
        return null !== ($this->getUser()->get('alias'));
    }
    /**
     * @return AppUser
     */
    public function getUser() {
        $ue = parent::getUser();
        if (!($ue instanceof AppUser)) {
            $this->setUser(AppUser::init());
            return $this->getUser();
        }
        return $ue;
    }
    /**
     * Generate a nonce for a form name, return it. Also, add it to an array of nonces that are associated with that
     * form in the session
     *
     * @param $form_name
     *
     * @return string
     */
    public function generate_nonce($form_name) {
        $nonce_name = 'nonce-' . $form_name;
        $session    = App::_()->IoC->session;
        if (!$session) return false;
        
        $session_nonce = $session->get($nonce_name);
        if (!is_array($session_nonce)) $session_nonce = [ ];
        
        $nonce = $session_nonce[] = Util::generateRandomString(15, Util::$standard_permitted_characters . '%^&*()!');
        $session->set($nonce_name, $session_nonce);
        return $nonce;
    }
    public function get_nonce($form_name) {
        $session = App::_()->IoC->session;
        if (!$session) return false;
        
        $result = $session->get('nonce-' . $form_name);
        return $result ?: [ ];
    }
    public function check_nonce($form_name, $value) {
        if (!isset($value) || !in_array($value, $this->get_nonce($form_name))) {
            return false;
        }
        return true;
    }
}