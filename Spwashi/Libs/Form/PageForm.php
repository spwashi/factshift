<?php
/**
 * User: sam
 * Date: 6/22/15
 * Time: 1:14 PM
 */

namespace Spwashi\Libs\Form;


use Sm\Development\Log;
use Sm\Form\Form;
use Spwashi\Libs\Validator\Abstraction\Validator;
use Spwashi\Libs\Validator\PageValidator;

class PageForm extends Form {

	public function validate_alias($form_alias_index = 'alias', $form_context_index = 'context') {
		$alias_validity = PageValidator::getAliasValidity($this->form_values[ $form_alias_index ], $this->form_values[ $form_context_index ]);
		if ($alias_validity !== true) {
			$max_alias_len = PageValidator::MAX_ALIAS_LENGTH;
			$min_alias_len = PageValidator::MIN_ALIAS_LENGTH;
			$alias_messages = [
				Validator::E_TOO_SHORT     => "Alias too short: must be between {$min_alias_len} and {$max_alias_len} characters long",
				Validator::E_TOO_LONG      => "Alias too long: must be between {$min_alias_len} and {$max_alias_len} characters long",
				Validator::E_UNAVAILABLE   => "The alias that you entered is already in use in this context: please choose a different one",
				Validator::E_INVALID_CHARS => "The alias you entered contains invalid characters: please use alphanumeric characters or dashes only",
				Validator::E_NULL          => "Alias cannot be null"
			];
			$this->process_validation_result($alias_validity, $form_alias_index, $alias_messages);
			return false;
		}
		return true;
	}

	public function validate_description($form_value_index = 'description') {
		$description_validity = PageValidator::getDescriptionValidity($this->form_values[ $form_value_index ]);
		if ($description_validity !== true) {
			$max_description_length = PageValidator::MAX_DESCRIPTION_LENGTH;
			$description_messages = [
				Validator::E_TOO_LONG => "Page description can only be up to {$max_description_length} characters long"
			];
			$this->process_validation_result($description_validity, $form_value_index, $description_messages);
			return false;
		}
		return true;
	}

	public function validate_title($form_value_index = 'title', $title_name = 'Title', $is_subtitle = false) {
		if (isset($this->form_values[ $form_value_index ])) {
			$title_validity = PageValidator::getTitleValidity($this->form_values[ $form_value_index ], $is_subtitle);
			if ($title_validity !== true) {
				Log::init($title_validity)->log_it();
				$min_len = PageValidator::MIN_TITLE_LENGTH;
				$max_len = PageValidator::MAX_TITLE_LENGTH;
				$title_messages = [
					Validator::E_TOO_SHORT     => "{{title}} too short: must be between {$min_len} and {$max_len} characters long",
					Validator::E_TOO_LONG      => "{{title}} too long: can only be up to {$max_len} characters long",
					Validator::E_INVALID_CHARS => "{{title}} can only contain letters, numbers, dashes, or underscores",
					Validator::E_NULL          => "{{title}} cannot be empty",
				];
				$this->process_validation_result($title_validity, $form_value_index, $title_messages, $title_name);
				return false;
			}
			return true;
		} else {
			return false;
		}
	}

	public function validate_subtitle($form_value_index = 'subtitle') {
		return $this->validate_title($form_value_index, 'Subtitle', true);
	}

}