<?php
/**
 * User: Sam Washington
 * Date: 12/4/16
 * Time: 5:11 PM
 */

namespace Sm\Action\Edit;


use Sm\Entity\Action\Edit\EditEntityAction;

trait EditActorTrait {
    public function initEditActionAsActor(EditVictim $Victim, $properties = null) {
        return new EditEntityAction($this, $properties, $Victim);
    }
}