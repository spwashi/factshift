<?php
/**
 * User: Sam Washington
 * Date: 12/11/15
 * Time: 5:29 PM
 */

namespace Spwashi\Libs\DataHandling;

use Spwashi\Libs\Validator\Abstraction\Validator;
use Spwashi\Libs\Validator\DimensionValidator;
use Spwashi\Model\Dimension;
use Spwashi\Model\Type\DimensionType;

class DimensionHandler extends UpdatedForm {
    public function __construct($model = null, $change_to_default = false, $allowed_values = null) {
        parent::__construct($model, $change_to_default, $allowed_values);
        $this->allowed_values = is_array($allowed_values) ? $allowed_values : Dimension::$api_settable_properties;
    }

    public static function validate_description(&$form_value, $data = null, $change_to_default = false) {
        $validity = DimensionValidator::getDescriptionValidity($form_value);

        $max_content_length = DimensionValidator::MAX_DESCRIPTION_LENGTH;
        $messages           = [
            Validator::E_TOO_LONG => "Dimension description can only be up to {$max_content_length} characters long",
        ];

        if ($validity === true) return static::SUCCESS;
        if ($change_to_default && $validity === Validator::E_TOO_LONG) {
            $form_value = substr($form_value, 0, $max_content_length);
            [static::DEFAULTED, static::process_validation_result($validity, $messages)];
        }
        return static::process_validation_result($validity, $messages);
    }
    public static function validate_title(&$form_value, $data = null, $change_to_default = false) {
        $validity = DimensionValidator::getTitleValidity($form_value);

        $min_len  = DimensionValidator::MIN_TITLE_LENGTH;
        $max_len  = DimensionValidator::MAX_TITLE_LENGTH;
        $messages = [
            Validator::E_TOO_SHORT => "Dimension title too short: must be between {$min_len} and {$max_len} characters long",
            Validator::E_TOO_LONG  => "Dimension title too long: can only be up to {$max_len} characters long",
            Validator::E_NULL      => "Dimension title cannot be empty"
        ];

        if ($validity === true) return static::SUCCESS;
        if ($change_to_default) {
            if ($validity === Validator::E_TOO_LONG) {
                $form_value = substr($form_value, 0, $max_len);
                [static::DEFAULTED, static::process_validation_result($validity, $messages)];
            } else if ($validity === Validator::E_NULL) {
                $form_value = '---';
                [static::DEFAULTED, static::process_validation_result($validity, $messages)];
            }
        }
        return static::process_validation_result($validity, $messages);
    }
    public static function validate_dimension_type(&$form_value, $data = null, $change_to_default = false) {
        $validity = DimensionValidator::getDimensionTypeValidity($form_value);

        $messages = [
            Validator::E_INVALID_CHARS => "Dimension must be a dictionary, dimension, or dimension type",
        ];

        if ($validity === true) return static::SUCCESS;
        if ($change_to_default && $validity === Validator::E_INVALID_CHARS) {
            $form_value = DimensionType::TYPE_STANDARD;
            return [static::DEFAULTED, static::process_validation_result($validity, $messages)];
        }
        return static::process_validation_result($validity, $messages);
    }
}