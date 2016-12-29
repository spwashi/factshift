<?php
/**
 * User: Sam Washington
 * Date: 12/1/16
 * Time: 11:50 PM
 */

namespace Factshift\Entity\Validation;


use Factshift\Entity\Validation\Abstraction\RelationshipValidator;

class DimensionSectionRelationshipValidator extends RelationshipValidator {
    static $entity_type = 'Dimension|Section';
    
    public function validate_section_role(&$proposed_role) {
        $proposed_role = (int)$proposed_role;
        return static::_validate_enum('section_roles', $proposed_role);
    }
    public function validate_section_type(&$proposed_type) {
        $proposed_type = (int)$proposed_type;
        return static::_validate_enum('section_types', $proposed_type);
    }
}