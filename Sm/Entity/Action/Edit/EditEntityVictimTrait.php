<?php
/**
 * User: Sam Washington
 * Date: 12/2/16
 * Time: 6:34 PM
 */

namespace Sm\Entity\Action\Edit;


use Sm\Action\Edit\EditAction;
use Sm\Entity\Abstraction\Entity;
use Sm\Response\ResponseMessage;

/**
 * Class EditEntityVictimTrait
 *
 * @uses
 * @package Sm\Entity\Action\Edit
 */
trait EditEntityVictimTrait {
    /**
     *
     * @param                                         $actor
     * @param null                                    $properties
     *
     * @return \Sm\Action\Edit\EditAction
     */
    public function initEditActionAsVictim($actor, $properties = null) : EditAction {
        $Action = EditEntityAction::init($actor, $properties, $this);
        return $Action;
    }
    public function receiveEditAction(EditAction $editAction) {
        $EditActionResponse = $editAction->getResponse();
        $changed_attributes = $EditActionResponse->getSuccessfulEdits();
        if ($this instanceof Entity) {
            $this->set($changed_attributes);
            if ($this->save()) {
                $EditActionResponse->setStatus(true);
                $EditActionResponse->setMessage(ResponseMessage::init(null, "Successfully updated " . static::$entity_type));
                $EditActionResponse->setResource($this);
            } else {
                $EditActionResponse->setStatus(false);
                $EditActionResponse->setMessage(ResponseMessage::init(null, "Could not successfully edit entity"));
            }
        }
        return $EditActionResponse;
    }
}