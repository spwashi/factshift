<?php
/**
 * User: Sam Washington
 * Date: 12/1/16
 * Time: 11:50 PM
 */

namespace Factshift\Entity\Validation;


use Factshift\Entity\Validation\Abstraction\EntityValidator;
use Sm\Response\Response;
use Sm\Validation\Abstraction\Validator;

class SectionValidator extends EntityValidator {
    static $entity_type = 'Section';
    const MAX_CONTENT_LENGTH          = 750;
    const MAX_CONTENT_LOCATION_LENGTH = 135;
    
    public static function validate_content(&$proposed_content) {
        $res = static::_validate_string($proposed_content, 0, static::MAX_CONTENT_LENGTH);
        if ($res instanceof Response) $res->setStatus(Validator::VALIDATION_NOT_SET);
        return $res;
    }
    public static function validate_section_type(&$section_type) {
        return static::_validate_enum('section_type', $section_type);
    }
    public static function validate_has_title(&$has_title) {
        $has_title = !!$has_title ? 1 : 0;
        return true;
    }
}