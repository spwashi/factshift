<?php
/**
 * User: Sam Washington
 * Date: 12/4/16
 * Time: 5:11 PM
 */

namespace Sm\Action\Destroy;


use Sm\Entity\Action\Destroy\DestroyEntityAction;

trait DestroyActorTrait {
    public function initDestroyActionAsActor(DestroyVictim $Victim, $properties = null) {
        return new DestroyEntityAction($this, $properties, $Victim);
    }
}