<?php
/**
 * User: sam
 * Date: 6/29/15
 * Time: 12:25 PM
 */

namespace Sm\Validation\Abstraction;

use Sm\Entity\Model\EntityMeta;
use Sm\Response\Response;
use Sm\Response\ResponseMessage;

abstract class Validator {
    const E_NULL           = 3;
    const E_TOO_LONG       = 4;
    const E_TOO_SHORT      = 5;
    const E_UNAVAILABLE    = 6;
    const E_INVALID_CHARS  = 7;
    const E_ERROR          = 8;
    const E_TEST           = 9;
    const E_INVALID_ACCESS = 10;
    const E_INVALID_EDIT   = 11;
    const E_INVALID_DELETE = 12;
    
    const PURPOSE_CREATE = 1;
    const PURPOSE_EDIT   = 2;
    const PURPOSE_DELETE = 3;
    const PURPOSE_CLONE  = 4;
    
    const VALIDATION_FAIL    = false;
    const VALIDATION_CHANGED = null;
    const VALIDATION_NOT_SET = 1;
    const VALIDATION_SUCCESS = true;
    
    
    protected $validated_okay   = [ ];
    protected $validated_errors = [ ];
    protected $purpose          = Validator::PURPOSE_EDIT;
    
    abstract public function validate($attributes = null) : Validator;
    
    abstract public function getSoftErrors();
    public function getNotSet() { return [ ]; }
    abstract public function getErrors();
    abstract public function getSuccesses();
    
    public function canContinue() : bool {
        return empty($this->getErrors());
    }
    
    public function setPurpose($purpose) {
        $this->purpose = $purpose;
    }
    
    protected static function _validate_enum($enum_name, $enum_value) {
        if ($rel_type_enum = EntityMeta::get_enum_value($enum_name)) {
            foreach ($rel_type_enum as $index => $item) {
                if ($enum_value == $index || $enum_value == $item['id']) return true;
            }
        }
        return new Response(ResponseMessage::init(null, "Improper value for attribute."), false);
    }
    protected static function _validate_numeric($proposed_number) {
        if (is_numeric($proposed_number)) return true;
        $proposed_number = null;
        return new Response(ResponseMessage::init(null, "Improper value for attribute. Must be numeric."), false);
    }
    public static function _validate_string($string, $min, $max) {
        if (!is_string($string) && !is_numeric($string))
            return new Response(ResponseMessage::init(null, "Must be a string"), false);
        
        $length = strlen($string);
        if ($length < $min) {
            return new Response(ResponseMessage::init(null, "Too short. Must be no less than $min characters long"), false);
        } else if ($length > $max) {
            return new Response(ResponseMessage::init(null, "Too long. Must be no more than $max characters long"), false);
        }
        return true;
    }
}