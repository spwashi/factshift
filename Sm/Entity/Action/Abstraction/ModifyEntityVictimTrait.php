<?php
/**
 * User: Sam Washington
 * Date: 12/3/16
 * Time: 10:23 PM
 */

namespace Sm\Entity\Action\Abstraction;


use Sm\Entity\Validation\EntityValidator;

trait ModifyEntityVictimTrait {
    public function getValidator() {
        return new EntityValidator($this);
    }
}