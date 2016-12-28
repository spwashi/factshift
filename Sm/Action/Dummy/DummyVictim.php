<?php
/**
 * User: Sam Washington
 * Date: 12/2/16
 * Time: 6:40 PM
 */

namespace Sm\Action\Dummy;


interface DummyVictim {
    public function initDummyActionAsVictim($actor, $properties = null) : DummyAction;
    public function receiveDummyAction(DummyAction $editAction);
}