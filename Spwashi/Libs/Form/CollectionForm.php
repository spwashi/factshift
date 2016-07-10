<?php
/**
 * User: sam
 * Date: 6/22/15
 * Time: 1:14 PM
 */

namespace Spwashi\Libs\Form;

use Sm\Form\Form;
use Spwashi\Libs\Validator\Abstraction\Validator;
use Spwashi\Libs\Validator\CollectionValidator;
use Spwashi\Model\Type\CollectionType;

class CollectionForm extends Form {
    public function validate_description($form_value_index = 'description') {
        if (!isset($this->form_values[$form_value_index])) {
            return false;
        }
        $description_validity = CollectionValidator::getDescriptionValidity($this->form_values[$form_value_index]);
        if ($description_validity !== true) {
            $max_description_length = CollectionValidator::MAX_DESCRIPTION_LENGTH;
            $description_messages   = [
                Validator::E_TOO_LONG => "Collection description can only be up to {$max_description_length} characters long"
            ];
            $this->process_validation_result($description_validity, $form_value_index, $description_messages);
            return false;
        }
        return true;
    }

    public function validate_title($form_value_index = 'title') {
        if (!isset($this->form_values[$form_value_index])) return false;

        $title_validity = CollectionValidator::getTitleValidity($this->form_values[$form_value_index]);
        if ($title_validity !== true) {
            $min_len        = CollectionValidator::MIN_TITLE_LENGTH;
            $max_len        = CollectionValidator::MAX_TITLE_LENGTH;
            $title_messages = [
                Validator::E_TOO_SHORT => "Collection title too short: must be between {$min_len} and {$max_len} characters long",
                Validator::E_TOO_LONG  => "Collection title too long: can only be up to {$max_len} characters long",
                Validator::E_NULL      => "Collection title cannot be empty"
            ];
            $this->process_validation_result($title_validity, $form_value_index, $title_messages);
            return false;
        }
        return true;
    }

    public function validate_collection_type($form_value_index = 'collection_type') {
        if (!isset($this->form_values[$form_value_index])) return false;
        $validity = CollectionValidator::getCollectionTypeValidity($this->form_values[$form_value_index]);
        if ($validity !== true) {
            if ($this->change_to_default) {
                $this->form_values[$form_value_index] = CollectionType::TYPE_STANDARD;
                return true;
            } else {
                $s_type_messages = [
                    Validator::E_INVALID_CHARS => "Collection must be a dictionary, dimension, or collection type",
                ];
                $this->process_validation_result($validity, $form_value_index, $s_type_messages);
                return false;
            }
        }
        $this->form_values[$form_value_index] = strip_tags($this->form_values[$form_value_index]);
        return true;
    }
}