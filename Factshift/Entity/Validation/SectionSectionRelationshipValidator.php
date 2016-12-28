<?php
/**
 * User: Sam Washington
 * Date: 12/1/16
 * Time: 11:50 PM
 */

namespace Factshift\Entity\Validation;


use Factshift\Entity\Validation\Abstraction\RelationshipValidator;

class SectionSectionRelationshipValidator extends RelationshipValidator {
    static $entity_type = 'Section|Section';
    const MIN_TITLE_LENGTH            = 0;
    const MAX_WORDS_LENGTH            = 1500;
    const MAX_TITLE_LENGTH            = 70;
    const MAX_CONTENT_LENGTH          = 750;
    const MAX_CONTENT_LOCATION_LENGTH = 135;
    
    public function validate_relationship_type(&$proposed_title) {
        return static::_validate_enum('relationship_types', $proposed_title);
    }
    
    public function validate_relationship_subtype(&$proposed_type) {
        if (!isset($proposed_type)) return true;
        return static::_validate_enum('relationship_subtypes', $proposed_type);
    }
}