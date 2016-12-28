<?php
/**
 * User: Sam Washington
 * Date: 12/4/16
 * Time: 3:12 PM
 */

namespace Factshift\Entity\Validation;


use Factshift\Entity\Validation\Abstraction\EntityValidator;

class DimensionValidator extends EntityValidator {
    const MIN_TITLE_LENGTH       = 3;
    const MAX_TITLE_LENGTH       = 70;
    const MAX_DESCRIPTION_LENGTH = 500;
    
    public function validate_description(&$proposed_description_length) {
        return static::_validate_string($proposed_description_length, 0, static::MAX_TITLE_LENGTH);
    }
}