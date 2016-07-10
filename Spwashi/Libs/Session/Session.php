<?php
/**
 * User: sam
 * Date: 6/10/15
 * Time: 2:28 AM
 */

namespace Spwashi\Libs\Session;


use Sm\Response\Http;
use Sm\Router\Toute;
use Spwashi\Model\User;

class Session extends \Sm\Session\Session {
    public static function is_valid() {

    }

    public static function require_user_or_redirect(&$user, $url = null) {
        if (!($user = static::get_user())) {
            Http::redirect(Toute::generate_url('spwashi_login', null, $url ? [ 'goto' => $url ] : $url), true, 302);
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
}