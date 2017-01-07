<?php
/**
 * User: Sam Washington
 * Date: 12/3/16
 * Time: 12:34 AM
 */

namespace Sm\Entity\Action\Create;


use Sm\Action\Create\CreateAction;
use Sm\Entity\Abstraction\Entity;
use Sm\Response\ResponseMessage;
use Sm\User\Abstraction\AppUser;

/**
 * Class CreateEntityVictimTrait
 *
 * @package       Sm\Entity\Action\Create
 * @implements    CreateVictim
 */
trait CreateEntityVictimTrait {
    public function initCreateActionAsVictim($actor, $properties = null) {
        $Action = CreateEntityAction::init($actor, $properties, $this);
        $Action->setValidator($this->getValidator());
        return $Action;
    }
    
    public function receiveCreateAction(CreateAction $editAction) {
        $CreateActionResponse = $editAction->getResponse();
        $changed_attributes   = $CreateActionResponse->getSuccessfulEdits();
        $Actor                = $editAction->getActor();
        if ($Actor instanceof AppUser && $Actor instanceof Entity) $this->set([ 'user_id' => $Actor->id ]);
        /** @var Entity $this */
        if ($this instanceof Entity) {
            $this->set($changed_attributes);
            if ($this->create()) {
                $CreateActionResponse->setStatus(true);
                $CreateActionResponse->setMessage(ResponseMessage::init(null, "Successfully created " . static::$entity_type));
                $CreateActionResponse->setResource($this);
            } else {
                $CreateActionResponse->setStatus(false);
                $CreateActionResponse->setMessage(ResponseMessage::init(null, "Could not successfully create entity"));
            }
        }
        return $CreateActionResponse;
    }
    
}