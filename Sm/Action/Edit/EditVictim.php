<?php
/**
 * User: Sam Washington
 * Date: 12/2/16
 * Time: 6:40 PM
 */

namespace Sm\Action\Edit;


interface EditVictim {
    public function initEditActionAsVictim($actor, $properties = null) : EditAction;
    public function receiveEditAction(EditAction $editAction);
}