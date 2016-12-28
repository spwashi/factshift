<?php
/**
 * User: Sam Washington
 * Date: 12/13/16
 * Time: 1:44 PM
 */

namespace Factshift\Entity\Validation;


use Factshift\Entity\Abstraction\FactshiftEntity;
use Factshift\Entity\Validation\Abstraction\EntityValidator;

class DummyValidator extends EntityValidator {
    static $entity_type = 'Dummy';
}