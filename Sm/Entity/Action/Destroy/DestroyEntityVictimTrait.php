<?php
/**
 * User: Sam Washington
 * Date: 12/2/16
 * Time: 6:34 PM
 */

namespace Sm\Entity\Action\Destroy;


use Sm\Action\Destroy\DestroyAction;
use Sm\Entity\Abstraction\Entity;
use Sm\Response\ResponseMessage;

/**
 * Class DestroyEntityVictimTrait
 *
 * @uses
 * @package Sm\Entity\Action\Destroy
 */
trait DestroyEntityVictimTrait {
    /**
     * @param                                 $actor
     *
     * @return \Sm\Action\Destroy\DestroyAction
     */
    public function initDestroyActionAsVictim($actor) : DestroyAction {
        $Action = DestroyEntityAction::init($actor, null, $this);
        $Action->setValidator($this->getValidator());
        return $Action;
    }
    public function receiveDestroyAction(DestroyAction $editAction) {
        $DestroyActionResponse = $editAction->getResponse();
        /** @var Entity $this */
        if ($this instanceof Entity) {
            if ($this->destroy()) {
                $DestroyActionResponse->setStatus(true);
                $DestroyActionResponse->setMessage(ResponseMessage::init(null, "Successfully destroyed " . static::$entity_type));
                $DestroyActionResponse->setData([ 'entity' => $this ]);
            } else {
                $DestroyActionResponse->setStatus(false);
                $DestroyActionResponse->setMessage(ResponseMessage::init(null, "Could not successfully destroy entity"));
            }
        }
        return $DestroyActionResponse;
    }
}