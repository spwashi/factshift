<?php
/**
 * User: Sam Washington
 * Date: 12/11/15
 * Time: 6:19 AM
 */

namespace Spwashi\Libs\DataHandling;

use Spwashi\Libs\Validator\Abstraction\Validator;
use Spwashi\Libs\Validator\UserValidator;
use Spwashi\Model\User;

class UserHandler extends UpdatedForm {
	public $model;
	public function __construct($model = null, $change_to_default = false, $allowed_values = null) {
		parent::__construct($model, $change_to_default, $allowed_values);
		$this->allowed_values = is_array($allowed_values) ? $allowed_values : User::$api_settable_properties;
	}

	protected static function validate_name(&$form_value, $data = null, $change_to_default = false, $is_last_name = false) {
		$validity = UserValidator::getNameValidity($form_value);
		$max_len  = UserValidator::MAX_NAME_LENGTH;

		$messages = [
			Validator::E_TOO_LONG      => "{{name}} too long: can only be up to {$max_len} characters long",
			Validator::E_NULL          => "{{name}} cannot be empty",
			Validator::E_INVALID_CHARS => "{{name}} probably can't contain some of the characters that you entered",
		];

		if ($validity === true) return static::SUCCESS;
		return static::process_validation_result($validity, $messages, $is_last_name ? 'Last Name' : 'Name');
	}
	public static function validate_first_name(&$form_value, $data = null, $change_to_default = false) {
		return static::validate_name($form_value, $data, $change_to_default, false);
	}
	public static function validate_last_name(&$form_value, $data = null, $change_to_default = false) {
		return static::validate_name($form_value, $data, $change_to_default, true);
	}

	public function validate_alias(&$form_value) {
		$validity      = UserValidator::getAliasValidity($form_value);
		$min_alias_len = UserValidator::MIN_ALIAS_LENGTH;
		$max_alias_len = UserValidator::MAX_ALIAS_LENGTH;
		$messages      = [
			Validator::E_UNAVAILABLE   => "Username taken",
			Validator::E_TOO_SHORT     => "Username too short: must be between {$min_alias_len} and {$max_alias_len} characters long",
			Validator::E_TOO_LONG      => "Username too short: must be between {$min_alias_len} and {$max_alias_len} characters long",
			Validator::E_INVALID_CHARS => "Username contains invalid characters",
			Validator::E_NULL          => "Username cannot be empty",
		];
		if ($validity === true) return static::SUCCESS;
		return static::process_validation_result($validity, $messages);
	}
	public function validate_password($form_value) {
		$validity   = UserValidator::getPasswordValidity($form_value);
		$min_pw_len = UserValidator::MIN_PASSWORD_LENGTH;
		$max_pw_len = UserValidator::MAX_PASSWORD_LENGTH;
		$messages   = [
			Validator::E_TOO_SHORT => "Password too short: must be between {$min_pw_len} and {$max_pw_len} characters",
			Validator::E_TOO_LONG  => "Password too long: must be between {$min_pw_len} and {$max_pw_len} characters",
			Validator::E_NULL      => "Password cannot be empty",
		];
		if ($validity === true) return static::SUCCESS;
		return static::process_validation_result($validity, $messages);
	}
	public function validate_password_verify($form_value) {
		return $form_value == $this->form_values['password'] ? static::SUCCESS : 'Passwords are not equal';
	}
	public function validate_email(&$form_value) {
		$validity = UserValidator::getEmailValidity($form_value);
		$messages = [
			Validator::E_UNAVAILABLE   => 'There is already an account associated with that email address',
			Validator::E_INVALID_CHARS => "Invalid email address",
			Validator::E_NULL          => "Email cannot be empty",
		];
		if ($validity === true) return static::SUCCESS;
		return static::process_validation_result($validity, $messages);
	}
}