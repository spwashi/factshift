<?php
/**
 * User: Sam Washington
 * Date: 12/2/16
 * Time: 6:40 PM
 */

namespace Sm\Action\Create;


interface CreateVictim {
    /**
     * @param                                         $actor
     * @param array                                   $properties
     *
     * @return \Sm\Action\Create\CreateAction
     */
    public function initCreateActionAsVictim($actor, $properties = null);
    public function receiveCreateAction(CreateAction $editAction);
}