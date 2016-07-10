<?php
/**
 * User: sam
 * Date: 6/22/15
 * Time: 1:14 PM
 */

namespace Spwashi\Libs\Form;

use Sm\Form\Form;
use Spwashi\Libs\Validator\Abstraction\Validator;
use Spwashi\Libs\Validator\SectionValidator;
use Spwashi\Model\Type\SectionType;

/**
 * Class SectionForm
 * Wrapper for common Section validation-related functionality;
 ** Takes values stored in the form values variable
 ** Checks to see if their values are valid according to the matching validator class
 ** Produces a message based on each result
 *
 * @package Spwashi\Libs\Form
 */
class SectionForm extends Form {
    public function validate_title($form_value_index, $title_name = 'Title', $is_subtitle = false) {
        if (!isset($this->form_values[$form_value_index])) {
            return false;
        }
        $title_validity = SectionValidator::getTitleValidity($this->form_values[$form_value_index], $is_subtitle);
        if ($title_validity !== true) {
            if ($this->change_to_default && $title_validity === Validator::E_NULL) {
                $this->form_values[$form_value_index] = '--';
                return true;
            }
            $min_len        = SectionValidator::MIN_TITLE_LENGTH;
            $max_len        = SectionValidator::MAX_TITLE_LENGTH;
            $title_messages = [
                Validator::E_TOO_SHORT => "{{title}} too short: must be between {$min_len} and {$max_len} characters long",
                Validator::E_TOO_LONG  => "{{title}} too long: can only be up to {$max_len} characters long",
                Validator::E_NULL      => "{{title}} cannot be empty"
            ];
            $this->process_validation_result($title_validity, $form_value_index, $title_messages, $title_name);
            return false;
        }
        $this->form_values[$form_value_index] = strip_tags($this->form_values[$form_value_index]);
        return true;
    }

    public function validate_content_location($form_value_index = 'content_location', $title_name = 'Content Location') {
        if (!isset($this->form_values[$form_value_index])) {
            return false;
        }
        $title_validity = SectionValidator::getContentLocationValidity($this->form_values[$form_value_index]);
        $v              = parse_url($this->form_values[$form_value_index], PHP_URL_HOST);
        if ($title_validity !== true) {
            if ($this->change_to_default && $title_validity === Validator::E_INVALID_CHARS) {
                $this->form_values[$form_value_index] = '';
                return true;
            }
            $max_len        = SectionValidator::MAX_CONTENT_LOCATION_LENGTH;
            $title_messages = [
                Validator::E_TOO_LONG      => "{{title}} too long: can only be up to {$max_len} characters long",
                Validator::E_INVALID_CHARS => "{{title}} invalid: must be an entity ent_id or a link to youtube.com or spwashi.com -> {$v}"
            ];
            $this->process_validation_result($title_validity, $form_value_index, $title_messages, $title_name);
            return false;
        }
        $this->form_values[$form_value_index] = strip_tags($this->form_values[$form_value_index]);
        return true;
    }

    public function validate_subtitle($form_value_index = 'subtitle') {
        if (!isset($this->form_values[$form_value_index])) return false;

        return $this->validate_title($form_value_index, 'Subtitle', true);
    }

    public function validate_has_title($form_value_index = 'has_title') {
        if (!isset($this->form_values[$form_value_index])) return false;
        $has_title_validity = SectionValidator::getHasTitleValidity($this->form_values[$form_value_index]);
        if ($has_title_validity !== true) {
            if ($this->change_to_default) {
                $this->form_values[$form_value_index] = 0;
                return true;
            }
            $has_title_messages = [
                Validator::E_INVALID_CHARS => "Invalid value set for 'has_title'"
            ];
            $this->process_validation_result($has_title_validity, $form_value_index, $has_title_messages);
            return false;
        }
        $this->form_values[$form_value_index] = strip_tags($this->form_values[$form_value_index]);
        return true;
    }

    public function validate_content($form_value_index = 'content') {
        if (!isset($this->form_values[$form_value_index])) return false;
        $description_validity = SectionValidator::getContentValidity($this->form_values[$form_value_index]);
        if ($description_validity !== true) {
            $max_content_length   = SectionValidator::MAX_CONTENT_LENGTH;
            $description_messages = [
                Validator::E_TOO_LONG => "Section content can only be up to {$max_content_length} characters long",
            ];
            $this->process_validation_result($description_validity, $form_value_index, $description_messages);
            return false;
        }
        $this->form_values[$form_value_index] = strip_tags($this->form_values[$form_value_index]);
        return true;
    }

    public function validate_section_type($form_value_index = 'section_type') {
        if (!isset($this->form_values[$form_value_index])) return false;
        $validity = SectionValidator::getSectionTypeValidity($this->form_values[$form_value_index]);
        if ($validity !== true) {
            if ($this->change_to_default) {
                $this->form_values[$form_value_index] = SectionType::TYPE_STANDARD;
                return true;
            } else {
                $s_type_messages = [
                    Validator::E_INVALID_CHARS => "Section must be of standard, audio, image, or video type",
                ];
                $this->process_validation_result($validity, $form_value_index, $s_type_messages);
                return false;
            }
        }
        $this->form_values[$form_value_index] = strip_tags($this->form_values[$form_value_index]);
        return true;
    }
}