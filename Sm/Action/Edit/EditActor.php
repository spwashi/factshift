<?php
/**
 * User: Sam Washington
 * Date: 12/4/16
 * Time: 12:56 AM
 */

namespace Sm\Action\Edit;


interface EditActor {
    public function initEditActionAsActor(EditVictim $Victim, $properties = null);
}