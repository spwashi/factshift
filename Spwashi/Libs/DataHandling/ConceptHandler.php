<?php
/**
 * User: Sam Washington
 * Date: 12/11/15
 * Time: 6:19 AM
 */

namespace Spwashi\Libs\DataHandling;

use Spwashi\Libs\Validator\Abstraction\Validator;
use Spwashi\Libs\Validator\ConceptValidator;
use Spwashi\Model\Concept;

class ConceptHandler extends UpdatedForm {
    public $model;
    public function __construct($model = null, $change_to_default = false, $allowed_values = null) {
        parent::__construct($model, $change_to_default, $allowed_values);
        $this->allowed_values = is_array($allowed_values) ? $allowed_values : Concept::$api_settable_properties;
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
            [ static::DEFAULTED, static::process_validation_result($validity, $messages) ];
        }
        return static::process_validation_result($validity, $messages, $is_subtitle ? 'subtitle' : 'title');
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
            [ static::DEFAULTED, static::process_validation_result($validity, $messages, 'Content') ];
        }
        return static::process_validation_result($validity, $messages);
    }
}