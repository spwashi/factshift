<?php
/**
 * User: Sam Washington
 * Date: 12/4/16
 * Time: 12:56 AM
 */

namespace Sm\Action\Create;


interface CreateActor {
    public function initCreateActionAsActor(CreateVictim $Victim, $properties = null);
}