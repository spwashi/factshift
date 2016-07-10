<?php
/**
 * User: Sam Washington
 * Date: 12/11/15
 * Time: 6:19 AM
 */

namespace Spwashi\Libs\DataHandling;

use Sm\Core\App;
use Spwashi\Libs\Validator\Abstraction\Validator;
use Spwashi\Libs\Validator\SectionValidator;
use Spwashi\Model\Section;
use Spwashi\Model\Type\SectionType;

class SectionHandler extends UpdatedForm {
	/**@var Section */
	public $model;
	public function __construct($model = null, $change_to_default = false, $allowed_values = null) {
		parent::__construct($model, $change_to_default, $allowed_values);
		$this->allowed_values = is_array($allowed_values) ? $allowed_values : Section::$api_settable_properties;
	}

	public static function validate_title(&$form_value, $data = null, $change_to_default = false, $is_subtitle = false) {
		$validity = SectionValidator::getTitleValidity($form_value, $is_subtitle);
		$min_len  = SectionValidator::MIN_TITLE_LENGTH;
		$max_len  = SectionValidator::MAX_TITLE_LENGTH;

		$messages = [
			Validator::E_TOO_SHORT => "{{title}} too short: must be between {$min_len} and {$max_len} characters long",
			Validator::E_TOO_LONG  => "{{title}} too long: can only be up to {$max_len} characters long",
			Validator::E_NULL      => "{{title}} cannot be empty",
		];

		if ($validity === true) return static::SUCCESS;
		if ($change_to_default && $validity === Validator::E_NULL) {
			$form_value = '---';
			[static::DEFAULTED, static::process_validation_result($validity, $messages)];
		}
		return static::process_validation_result($validity, $messages, $is_subtitle ? 'subtitle' : 'title');
	}
	public static function validate_subtitle(&$form_value, $data = null, $change_to_default = false) {
		return static::validate_title($form_value, $data, $change_to_default, true);
	}
	public static function validate_has_title(&$form_value, $data = null, $change_to_default = false) {
		$validity = SectionValidator::getHasTitleValidity($form_value);

		$messages = [
			Validator::E_INVALID_CHARS => "Invalid value set for 'has_title'",
		];

		if ($validity === true) return static::SUCCESS;
		if ($change_to_default) {
			$form_value = 0;
			[static::DEFAULTED, static::process_validation_result($validity, $messages, 'Has Title')];
		}
		return static::process_validation_result($validity, $messages);
	}
	public static function validate_content_location(&$form_value, $data = null, $change_to_default = false) {
		$validity = SectionValidator::getContentLocationValidity($form_value);

		$v          = parse_url($form_value, PHP_URL_HOST);
		$site_title = trim(App::_()->base_url, '/');
		$max_len    = SectionValidator::MAX_CONTENT_LOCATION_LENGTH;
		$messages   = [
			Validator::E_TOO_LONG      => "{{title}} too long: can only be up to {$max_len} characters long",
			Validator::E_INVALID_CHARS => "Sorry, but the {{title}} of this section must be an entity ID, link to an image, or represent a resource on {$site_title} or http://youtube.com",
		];

		if ($validity === true || !strlen($form_value)) return static::SUCCESS;
		if ($change_to_default && $validity === Validator::E_INVALID_CHARS) {
			$form_value = '';
			return [static::DEFAULTED, static::process_validation_result($validity, $messages, 'Content Location')];
		}
		return static::process_validation_result($validity, $messages);
	}
	public static function validate_content(&$form_value, $data = null, $change_to_default = false) {
		$validity = SectionValidator::getContentValidity($form_value);

		$max_content_length = SectionValidator::MAX_CONTENT_LENGTH;
		$messages           = [
			Validator::E_TOO_LONG => "Section content can only be up to {$max_content_length} characters long",
		];

		if ($validity === true) return static::SUCCESS;
		if ($change_to_default && $validity === Validator::E_TOO_LONG) {
			$form_value = substr($form_value, 0, $max_content_length);
			[static::DEFAULTED, static::process_validation_result($validity, $messages, 'Content')];
		}
		return static::process_validation_result($validity, $messages);
	}
	public function validate_words(&$form_value, $data = null, $change_to_default = false) {
		$messages = [
			Validator::E_INVALID_CHARS => "Invalid Characters entered",
			Validator::E_TOO_LONG      => "Word count is too high",
		];
		if (($validity = SectionValidator::getWordsValidity($form_value)) === true) return static::SUCCESS;
		return static::process_validation_result($validity, $messages);
	}
	public static function validate_section_type(&$form_value, $data = null, $change_to_default = false) {
		$validity = SectionValidator::getSectionTypeValidity($form_value);
		$messages = [Validator::E_INVALID_CHARS => "Section must be of standard, audio, image, or video type"];

		if ($validity === true) return static::SUCCESS;
		if ($change_to_default) {
			$form_value = SectionType::TYPE_STANDARD;
			[static::DEFAULTED, static::process_validation_result($validity, $messages, 'Section Type')];
		}
		return static::process_validation_result($validity, $messages);
	}

}