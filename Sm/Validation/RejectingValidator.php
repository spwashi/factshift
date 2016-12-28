<?php
/**
 * User: Sam Washington
 * Date: 12/13/16
 * Time: 12:21 PM
 */

namespace Sm\Validation;


use Sm\Validation\Abstraction\Validator;

class RejectingValidator extends Validator {
    public function validate($attributes = null) :Validator {
        return $this;
    }
    public function canContinue() : bool {
        return false;
    }
    public function getSoftErrors() {
        return [ ];
    }
    public function getErrors() {
        return [ ];
    }
    public function getSuccesses() {
        return [ ];
    }
}