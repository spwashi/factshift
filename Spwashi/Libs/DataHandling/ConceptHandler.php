<?php
/**
 * User: Sam Washington
 * Date: 12/11/15
 * Time: 6:19 AM
 */

namespace Spwashi\Libs\DataHandling;

use Sm\Development\Log;
use Sm\Model\ModelMeta;
use Spwashi\Libs\Validator\Abstraction\Validator;
use Spwashi\Libs\Validator\ConceptValidator;
use Spwashi\Model\Concept;

class ConceptHandler extends UpdatedForm {
	public $model;
	public function __construct($model = null, $change_to_default = false, $allowed_values = null) {
		parent::__construct($model, $change_to_default, $allowed_values);
		$this->allowed_values = is_array($allowed_values) ? $allowed_values : Concept::$api_settable_properties;
	}

	/**
	 * @return bool|void
	 */
	public function validate__all() {
		$errors = [];
		if ($this->data['beginner'] ?? false) {
			$required = ModelMeta::_get_def_props('Concept', ModelMeta::FIND_REQUIRED);
			foreach ($required as $required_index) {
				if (!array_key_exists($required_index, $this->form_values))
					$errors[$required_index] = "We require {$required_index}";
			}
		}
		Log::init($this)->log_it();
		$count = count($errors);
		if ($count) {
			$this->error_array = array_merge($this->error_array, $errors);
			Log::init($errors)->log_it();
			$this->fatal = true;
		}
		return !$count;
	}

	public static function validate_title(&$form_value, $data = null, $change_to_default = false, $is_subtitle = false) {
		$validity = ConceptValidator::getTitleValidity($form_value, $is_subtitle);
		$min_len  = ConceptValidator::MIN_TITLE_LENGTH;
		$max_len  = ConceptValidator::MAX_TITLE_LENGTH;

		$messages = [
			Validator::E_TOO_SHORT     => "{{title}} too short: must be between {$min_len} and {$max_len} characters long",
			Validator::E_TOO_LONG      => "{{title}} too long: can only be up to {$max_len} characters long",
			Validator::E_NULL          => "{{title}} cannot be empty",
			Validator::E_INVALID_CHARS => "{{title}} probably can't contain some of the characters that you entered",
		];

		if ($validity === true) return static::SUCCESS;
		if ($change_to_default && $validity === Validator::E_NULL) {
			$form_value = '---';
			[static::DEFAULTED, static::process_validation_result($validity, $messages)];
		}
		return static::process_validation_result($validity, $messages, $is_subtitle ? 'subtitle' : 'title');
	}
	public function validate_alias(&$form_value = 'alias') {
		$validity      = ConceptValidator::getAliasValidity($form_value);
		$min_alias_len = ConceptValidator::MIN_ALIAS_LENGTH;
		$max_alias_len = ConceptValidator::MAX_ALIAS_LENGTH;
		$messages      = [
			Validator::E_UNAVAILABLE   => 'Alias is taken',
			Validator::E_TOO_SHORT     => "Alias is too short: must be between {$min_alias_len} and {$max_alias_len} characters long",
			Validator::E_TOO_LONG      => "Alias is too short: must be between {$min_alias_len} and {$max_alias_len} characters long",
			Validator::E_INVALID_CHARS => "Alias contains invalid characters",
			Validator::E_NULL          => "Alias cannot be empty",
		];
		Log::init($validity)->log_it();
		if ($validity === true) return static::SUCCESS;
		return static::process_validation_result($validity, $messages);
	}
	public static function validate_subtitle(&$form_value, $data = null, $change_to_default = false) {
		return static::validate_title($form_value, $data, $change_to_default, true);
	}
	public static function validate_description(&$form_value, $data = null, $change_to_default = false) {
		$validity = ConceptValidator::getDescriptionValidity($form_value);

		$max_content_length = ConceptValidator::MAX_DESCRIPTION_LENGTH;
		$messages           = [
			Validator::E_TOO_LONG => "Concept description can only be up to {$max_content_length} characters long",
		];

		if ($validity === true) return static::SUCCESS;
		if ($change_to_default && $validity === Validator::E_TOO_LONG) {
			$form_value = substr($form_value, 0, $max_content_length);
			[static::DEFAULTED, static::process_validation_result($validity, $messages, 'Content')];
		}
		return static::process_validation_result($validity, $messages);
	}
}