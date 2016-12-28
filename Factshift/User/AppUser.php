<?php
/**
 * User: Sam Washington
 * Date: 12/19/16
 * Time: 6:06 PM
 */

namespace Factshift\User;


use Factshift\Core\Factshift;
use Factshift\Entity\User;
use Sm\Action\Create\CreateAction;
use Sm\Entity\Abstraction\Entity;
use Sm\Response\ResponseMessage;
use Sm\User\AppUserTrait;

class AppUser extends User implements \Sm\User\Abstraction\AppUser {
    use AppUserTrait;
    
    static public function hash_password($password) {
        return $password = password_hash($password, PASSWORD_BCRYPT);
    }
    static public function passwords_are_equal($password_to_compare, $hashed_password) {
        return password_verify($password_to_compare, $hashed_password);
    }
    
    public function receiveCreateAction(CreateAction $editAction) {
        $CreateActionResponse = $editAction->getResponse();
        $changed_attributes   = $CreateActionResponse->getSuccessfulEdits();
        /** @var AppUser $this */
        if ($this instanceof Entity) {
            $this->set($changed_attributes);
            $this->set([ 'password' => static::hash_password($this->password) ]);
            if ($this->create()) {
                $CreateActionResponse->setStatus(true);
                $CreateActionResponse->setMessage(ResponseMessage::init(null, "Successfully created " . static::$entity_type));
                $CreateActionResponse->setResource($this);
            } else {
                $CreateActionResponse->setStatus(false);
                $CreateActionResponse->setMessage(ResponseMessage::init(null, "Could not successfully create entity"));
            }
        }
        return $CreateActionResponse;
    }
    
    public function login() {
        Factshift::_()->IoC->session->setUser($this);
    }
    public function logout() {
        Factshift::_()->IoC->session->unsetUser();
    }
    public function isLoggedIn():bool {
        return (bool)Factshift::_()->IoC->session->has_valid_user() && (Factshift::_()->IoC->session->getUser() === $this);
    }
    public function getAccessPoint():string {
        return '';#todo implement this
    }
    public function setAccessPoint($route_name_or_uri) {
        // TODO: Implement setAccessPoint() method.
    }
}