<?php
/**
 * User: sam
 * Date: 7/13/15
 * Time: 5:04 PM
 */

namespace Spwashi\Libs\Form;


use Sm\Form\Form;
use Spwashi\Libs\Validator\Abstraction\Validator;
use Spwashi\Libs\Validator\UserValidator;

class UserForm extends Form {
    protected function _validate_name($form_value_index, $name = 'Name') {
        if (!isset($this->form_values[ $form_value_index ])) return false;
        $max_name_length = UserValidator::MAX_NAME_LENGTH;
        $validity        = UserValidator::getNameValidity($this->form_values[ $form_value_index ]);
        if ($validity === true) return true;
        $name_messages = [
            Validator::E_INVALID_CHARS => '{{title}} contains invalid characters: Name can only include alphabetic characters, spaces, or dashes',
            Validator::E_TOO_LONG      => "{{title}} too long: it can only be up to {$max_name_length} characters long",
            Validator::E_NULL          => '{{title}} can\'t be empty',
        ];
        $this->process_validation_result($validity, $form_value_index, $name_messages, $name);
        return false;
    }
    public function validate_first_name($form_value_index = 'first_name') {
        if (!isset($this->form_values[ $form_value_index ])) return false;
        return $this->_validate_name($form_value_index, 'First name');
    }
    public function validate_last_name($form_value_index = 'last_name') {
        if (!isset($this->form_values[ $form_value_index ])) return false;
        return $this->_validate_name($form_value_index, 'Last name');
    }
    public function validate_password($form_value_index = 'password') {
        if (!isset($this->form_values[ $form_value_index ])) return false;
        $validity = UserValidator::getPasswordValidity($this->form_values[ $form_value_index ]);
        if ($validity === true) return true;
        $min_pw_len        = UserValidator::MIN_PASSWORD_LENGTH;
        $max_pw_len        = UserValidator::MAX_PASSWORD_LENGTH;
        $password_messages = [
            Validator::E_TOO_SHORT => "Password too short: must be between {$min_pw_len} and {$max_pw_len} characters",
            Validator::E_TOO_LONG  => "Password too long: must be between {$min_pw_len} and {$max_pw_len} characters",
            Validator::E_NULL      => "Password cannot be empty",
        ];
        $this->process_validation_result($validity, $form_value_index, $password_messages);
        return false;
    }
    public function validate_alias($form_value_index = 'alias') {
        if (!isset($this->form_values[ $form_value_index ])) return false;
        $validity = UserValidator::getAliasValidity($this->form_values[ $form_value_index ]);
        if ($validity === true) return true;
        $min_alias_len = UserValidator::MIN_ALIAS_LENGTH;
        $max_alias_len = UserValidator::MAX_ALIAS_LENGTH;
        $user_messages = [
            Validator::E_UNAVAILABLE   => 'Username taken',
            Validator::E_TOO_SHORT     => "Username too short: must be between {$min_alias_len} and {$max_alias_len} characters long",
            Validator::E_TOO_LONG      => "Username too short: must be between {$min_alias_len} and {$max_alias_len} characters long",
            Validator::E_INVALID_CHARS => "Username contains invalid characters",
            Validator::E_NULL          => "Username cannot be empty",
        ];
        $this->process_validation_result($validity, $form_value_index, $user_messages);
        return false;
    }
    public function validate_email($form_value_index = 'email') {
        if (!isset($this->form_values[ $form_value_index ])) return false;
        $validity = UserValidator::getEmailValidity($this->form_values[ $form_value_index ]);
        if ($validity === true) return true;
        $user_messages = [
            Validator::E_INVALID_CHARS => 'Invalid email address',
            Validator::E_UNAVAILABLE   => "There is already an account associated with that email address",
        ];
        $this->process_validation_result($validity, $form_value_index, $user_messages);
        return false;
    }
    public function validate_password_verify($form_value_index = 'password_verify', $password_index = 'password') {
        if (!isset($this->form_values[ $form_value_index ])) $validity = Validator::E_ERROR;
        if (!isset($this->form_values[ $password_index ])) $validity = Validator::E_ERROR;
        if (!isset($validity))
            $validity = $this->form_values[ $password_index ] == $this->form_values[ $form_value_index ] ? true : Validator::E_INVALID_CHARS;
        if ($validity === true) return true;
        $user_messages = [
            Validator::E_INVALID_CHARS => 'Passwords entered do not match',
            Validator::E_ERROR         => 'Undefined error. Please contact administrator',
        ];
        $this->process_validation_result($validity, $form_value_index, $user_messages);
        return false;
    }
}