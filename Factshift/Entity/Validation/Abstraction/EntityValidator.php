<?php
/**
 * User: Sam Washington
 * Date: 12/4/16
 * Time: 1:21 AM
 */

namespace Factshift\Entity\Validation\Abstraction;


use Factshift\Entity\Abstraction\FactshiftEntity;

class EntityValidator extends \Sm\Entity\Validation\EntityValidator {
    const MIN_TITLE_LENGTH = 0;
    const MAX_TITLE_LENGTH = 70;
    /** @var  FactshiftEntity $Resource */
    protected $Resource;
    
    public static function validate_title(&$string) {
        return static::_validate_string($string, static::MIN_TITLE_LENGTH, static::MAX_TITLE_LENGTH);
    }
    public static function validate_subtitle(&$proposed_subtitle) {
        return static::validate_title($proposed_subtitle);
    }
}