<?php
/**
 * User: Sam Washington
 * Date: 12/2/16
 * Time: 6:40 PM
 */

namespace Sm\Action\Destroy;


interface DestroyVictim {
    public function initDestroyActionAsVictim($actor) : DestroyAction;
    public function receiveDestroyAction(DestroyAction $editAction);
}