<?php
/**
 * User: Sam Washington
 * Date: 12/4/16
 * Time: 12:56 AM
 */

namespace Sm\Action\Destroy;


interface DestroyActor {
    public function initDestroyActionAsActor(DestroyVictim $Victim, $properties = null);
}