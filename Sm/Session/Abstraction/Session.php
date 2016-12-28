<?php
/**
 * User: Sam Washington
 * Date: 12/19/16
 * Time: 12:15 PM
 */

namespace Sm\Session\Abstraction;


use Sm\User\Abstraction\AppUser;

abstract class Session {
    public function has_valid_user() {
        return ($this->getUser() instanceof AppUser);
    }
    /**
     * Set the current user in the session
     *
     * @param AppUser $user
     *
     * @return $this
     */
    public function setUser(AppUser $user) {
        $this->set('user', $user);
        return $this;
    }
    public function unsetUser() {
        $this->set('user', null);
    }
    /**
     * @return null|AppUser
     */
    public function getUser() {
        $ue = $this->get('user');
        return $ue instanceof AppUser ? $ue : null;
    }
    
    
    /**
     * Get the values from a Session
     *
     * @param $item
     *
     * @return mixed
     */
    abstract public function get($item);
    /**
     * Set the values of a Session
     *
     * @param $name
     * @param $value
     *
     * @return mixed
     */
    abstract public function set($name, $value);
    /** Clear the Session */
    abstract public function clear();
    /**
     * Destroy the session
     *
     * @return mixed
     */
    abstract public function destroy();
}