<?php
/**
 * User: Sam Washington
 * Date: 12/3/16
 * Time: 12:06 AM
 */

namespace Sm\Entity\Action\Create;


use Sm\Action\Create\CreateAction;
use Sm\Action\Exception\InvalidActorException;
use Sm\Entity\Action\Abstraction\ModifyEntityActionTrait;
use Sm\Response\ResponseMessage;
use Sm\User\Abstraction\AppUser;

class CreateEntityAction extends CreateAction {
    use ModifyEntityActionTrait;
    
    public function validateCompleteness() {
        CreateAction::validateCompleteness();
        $has_user_id = $this->Victim->hasAttribute('user_id');
        if ($has_user_id && !($this->Actor instanceof AppUser)) {
            throw new InvalidActorException(ResponseMessage::init(null, "A user must act on this resource"), InvalidActorException::ERROR_NONEXISTENT);
        }
    }
}