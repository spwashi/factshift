<?php
/**
 * User: Sam Washington
 * Date: 9/10/15
 * Time: 9:01 PM
 */

namespace Spwashi\Libs\Form;

use Sm\Form\Form;
use Spwashi\Libs\Validator\Abstraction\Validator;
use Spwashi\Libs\Validator\SectionSectionMapValidator;
use Spwashi\Model\RelationshipStatus;
use Spwashi\Model\Type\RelationshipType;

/**
 * Class SectionSectionMapForm
 * @package Spwashi\Libs\Form
 */
class SectionSectionMapForm extends Form {
    public $change_to_default = true;

    private function validate_section_id($form_value_index = 'primary_section_id') {
        if (!isset($this->form_values[$form_value_index])) return false;
        $validity = SectionSectionMapValidator::getSectionIdValidity($this->form_values[$form_value_index]);
        if ($validity !== true) {
            if ($this->change_to_default) {
                $this->form_values[$form_value_index] = 1;
                return true;
            } else {
                $p_type_messages = [
                    Validator::E_INVALID_CHARS => "The ID of this section is not valid",
                ];
                $this->process_validation_result($validity, $form_value_index, $p_type_messages, 'ID');
                return false;
            }
        }

        $this->form_values[$form_value_index] = intval($this->form_values[$form_value_index]);
        return true;
    }

    public function validate_primary_section_id($form_value_index = 'primary_section_id') {
        return $this->validate_section_id($form_value_index);
    }

    public function validate_secondary_section_id($form_value_index = 'secondary_section_id') {
        return $this->validate_section_id($form_value_index);
    }

    public function validate_position($form_value_index = 'position') {
        if (!isset($this->form_values[$form_value_index])) return false;
        $validity = SectionSectionMapValidator::getPositionValidity($this->form_values[$form_value_index]);
        if ($validity !== true) {
            if ($this->change_to_default) {
                $this->form_values[$form_value_index] = 1;
                return true;
            } else {
                $p_type_messages = [
                    Validator::E_INVALID_CHARS => "The position of this section in relation to another is not valid",
                ];
                $this->process_validation_result($validity, $form_value_index, $p_type_messages, 'Position');
                return false;
            }
        }

        $this->form_values[$form_value_index] = intval($this->form_values[$form_value_index]);
        return true;
    }

    public function validate_relationship_type($form_value_index = 'relationship_type') {
        if (!isset($this->form_values[$form_value_index])) return false;
        $validity = SectionSectionMapValidator::getRelationshipTypeValidity($this->form_values[$form_value_index]);
        if ($validity !== true) {
            if ($this->change_to_default) {
                $this->form_values[$form_value_index] = RelationshipType::TYPE_CHILD;
                return true;
            } else {
                $s_type_messages = [
                    Validator::E_INVALID_CHARS => "Section must be a rephrase, child, parent, generalization, or specification of this section",
                ];
                $this->process_validation_result($validity, $form_value_index, $s_type_messages, 'Relationship Type');
                return false;
            }
        }

        $this->form_values[$form_value_index] = intval($this->form_values[$form_value_index]);
        return true;
    }

    public function validate_relationship_status($form_value_index) {
        if (!isset($this->form_values[$form_value_index])) return false;
        $validity = SectionSectionMapValidator::getRelationshipStatusValidity($this->form_values[$form_value_index]);
        if ($validity !== true) {
            if ($this->change_to_default) {
                $this->form_values[$form_value_index] = RelationshipStatus::STATUS_TENTATIVE;
            } else {
                $s_status_messages = [
                    Validator::E_INVALID_CHARS => "The status of this section relationship is invalid",
                ];
                $this->process_validation_result($validity, $form_value_index, $s_status_messages, 'Relationship Status');
                return false;
            }
        }
        return true;
    }
}