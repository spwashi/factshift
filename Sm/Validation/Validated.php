<?php
/**
 * User: Sam Washington
 * Date: 12/4/16
 * Time: 3:26 PM
 */

namespace Sm\Validation;


use Sm\Validation\Abstraction\Validator;

interface Validated {
    /**
     * Get the Validator that is going to be used to Validate this class
     *
     * @return Validator
     */
    public function getValidator() : Validator;
}