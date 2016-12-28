<?php
/**
 * User: Sam Washington
 * Date: 12/3/16
 * Time: 12:09 AM
 */

namespace Sm\Entity\Action\Abstraction;


use Sm\Action\Abstraction\ModifyAction;
use Sm\Action\Exception\InvalidActorException;
use Sm\Action\Exception\InvalidVictimException;
use Sm\Entity\Abstraction\Entity;
use Sm\Response\ResponseMessage;
use Sm\User\Abstraction\AppUser;

trait ModifyEntityActionTrait {
    /** @var  Entity $Victim */
    protected $Victim;
    /** @var  Entity $Actor */
    protected $Actor;
    protected $data;
    /**
     * @param \Sm\Entity\Abstraction\Entity|null $Actor
     * @param array                              $data
     * @param \Sm\Entity\Abstraction\Entity|null $Victim
     *
     * @return ModifyEntityActionTrait|static
     */
    public static function init(Entity $Actor = null, $data = [ ], Entity $Victim = null) {
        $Action        = new static;
        $Action->Actor = $Actor;
        $Action->data  = $data;
        if ($Victim) $Action->Victim = $Victim;
        return $Action;
    }
    public function validateCompleteness() {
        if ($this instanceof ModifyAction) {
            parent::validateCompleteness();
            if (!($this->Actor instanceof AppUser)) {
                throw new InvalidActorException(ResponseMessage::init(null, "A user must act on this resource"), InvalidActorException::ERROR_NONEXISTENT);
            }
            $id = $this->Victim->get('id');
            if (!($id)) {
                throw new InvalidVictimException(ResponseMessage::init(null, "Could not find resource"));
            }
            $user_id = $this->Victim->get('user_id');
            if (!$user_id)
                throw new InvalidVictimException(ResponseMessage::init(null, "Cannot edit a resource with no owner"));
            
            if ($this->Actor->get('id') != $user_id)
                throw new InvalidActorException(ResponseMessage::init(null, "Not authorized to act on this resource"), InvalidActorException::ERROR_FORBIDDEN);
        }
    }
}