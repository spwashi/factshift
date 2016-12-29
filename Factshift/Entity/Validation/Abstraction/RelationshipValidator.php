<?php
/**
 * User: Sam Washington
 * Date: 12/20/16
 * Time: 1:53 PM
 */

namespace Factshift\Entity\Validation\Abstraction;


use Sm\Entity\Relationship\RelationshipEntity;
use Sm\Entity\Validation\EntityValidator;

class RelationshipValidator extends EntityValidator {
    /** @var  RelationshipEntity $Resource */
    protected $Resource;
    public function validate_position(&$position) {
        return static::_validate_numeric($position);
    }
}