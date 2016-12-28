<?php
/**
 * User: Sam Washington
 * Date: 12/20/16
 * Time: 1:58 PM
 */

namespace Factshift\Entity\Relationship;


use Factshift\Entity\Validation\Abstraction\RelationshipValidator;
use Sm\Validation\Abstraction\Validator;
use Sm\Validation\RejectingValidator;

class RelationshipEntity extends \Sm\Entity\Relationship\RelationshipEntity {
    public function getValidator() : Validator {
        $res = parent::getValidator();
        return !($res instanceof RejectingValidator) ? $res : new RelationshipValidator($this);
    }
}