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
    
    public function validate_relationship_type(&$proposed_title) {
        return static::_validate_enum('relationship_types', $proposed_title);
    }
    
    public function validate_relationship_subtype(&$proposed_type) {
        if (!isset($proposed_type)) return true;
        return static::_validate_enum('relationship_subtypes', $proposed_type);
    }
}