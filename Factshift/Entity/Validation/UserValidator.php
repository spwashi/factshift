<?php
/**
 * User: Sam Washington
 * Date: 12/13/16
 * Time: 1:44 PM
 */

namespace Factshift\Entity\Validation;


use Factshift\Entity\Model\UserModel;
use Factshift\Entity\Validation\Abstraction\EntityValidator;
use Sm\Core\App;
use Sm\Entity\Model\ModelNotFoundException;
use Sm\Environment\Environment;
use Sm\Response\Response;
use Sm\Response\ResponseMessage;
use Sm\Validation\Abstraction\Validator;

class UserValidator extends EntityValidator {
    const MAX_NAME_LENGTH     = 35;
    const MAX_PASSWORD_LENGTH = 15;
    const MIN_PASSWORD_LENGTH = 5;
    const MIN_ALIAS_LENGTH    = 5;
    const MAX_ALIAS_LENGTH    = 35;
    static $entity_type = 'User';
    
    public function __construct($entity) {
        $this->required_attributes = [ ];
        parent::__construct($entity);
    }
    
    public function initRequirements() {
        if ($this->purpose === Validator::PURPOSE_CREATE) {
            $this->required_attributes = [
                'alias',
                'first_name',
                'last_name',
                'password',
                'email',
            ];
            if (App::_()->Environment && App::_()->Environment->getEntryPoint() === Environment::EP_FRONT_END) {
                $this->required_attributes[] = 'password_verify';
            }
        }
        return parent::initRequirements();
    }
    
    public function _validate_name(&$proposed_name) {
        $proposed_name = trim($proposed_name);
        $Response      = static::_validate_string($proposed_name, 1, static::MAX_NAME_LENGTH);
        if ($Response instanceof Response) return $Response;
        # --- only latin characters, dash, and apostrophe allowed
        preg_match('/[^a-zA-Z-\s\']/', $proposed_name, $matches);
        if (!empty($matches)) return new Response(ResponseMessage::init(null, "Contains invalid characters"), Validator::VALIDATION_FAIL);
        return true;
    }
    public function validate_alias(&$proposed_alias) {
        $proposed_alias = trim($proposed_alias);
        $Response       = static::_validate_string($proposed_alias, static::MIN_ALIAS_LENGTH, static::MAX_ALIAS_LENGTH);
        if ($Response instanceof Response) return $Response;
        # --- only alphanumeric latin characters, dash, underscore allowed
        preg_match('/[^a-zA-Z-_\s0-9]/', $proposed_alias, $matches);
        if (!empty($matches)) return new Response(ResponseMessage::init(null, "Username contains invalid characters"), Validator::VALIDATION_FAIL);
        try {
            $User = UserModel::find([ 'alias' => $proposed_alias ]);
            if ($this->purpose === Validator::PURPOSE_CREATE || $User->get('ent_id') !== $this->Resource->ent_id)
                return new Response(ResponseMessage::init(Validator::E_UNAVAILABLE, "There is already an account with that username"), Validator::VALIDATION_FAIL);
        } catch (ModelNotFoundException $e) {
            return true;
        } catch (\Exception $e) {
        }
        return true;
    }
    public function validate_password(&$proposed_password) {
        $proposed_password = trim($proposed_password);
        $Response          = static::_validate_string($proposed_password, static::MIN_PASSWORD_LENGTH, static::MAX_PASSWORD_LENGTH);
        if ($Response instanceof Response) return $Response;
        return true;
    }
    public function validate_password_verify(&$password_verify) {
        if ($this->purpose !== Validator::PURPOSE_CREATE) return new Response(ResponseMessage::init(null, ' not set '), Validator::VALIDATION_NOT_SET);
        $password_verify   = trim($password_verify);
        $proposed_password = $this->_validating_properties['password'] ?? null;
        if (!isset($proposed_password) || $password_verify !== $proposed_password) {
            return new Response(ResponseMessage::init(null, 'Passwords are not equal'), Validator::VALIDATION_FAIL);
        }
        return true;
    }
    public function validate_first_name(&$first_name) {
        return $this->_validate_name($first_name);
    }
    public function validate_last_name(&$last_name) {
        return $this->_validate_name($last_name);
    }
    public function validate_email(&$proposed_email) {
        if (!filter_var($proposed_email, FILTER_VALIDATE_EMAIL)) {
            return new Response(ResponseMessage::init(Validator::E_UNAVAILABLE, "Please use a valid email address"), Validator::VALIDATION_FAIL);
        }
        try {
            $User = UserModel::find([ 'email' => $proposed_email ]);
            if ($this->purpose === Validator::PURPOSE_CREATE || $User->get('ent_id') !== $this->Resource->ent_id)
                return new Response(ResponseMessage::init(Validator::E_UNAVAILABLE, "There is already an account with that email address"), Validator::VALIDATION_FAIL);
        } catch (ModelNotFoundException $e) {
            return true;
        } catch (\Exception $e) {
        }
        return true;
    }
}