<?php
/**
 * User: Sam Washington
 * Date: 12/2/16
 * Time: 6:48 PM
 */

namespace Sm\Action\Destroy;


use Sm\Action\Abstraction\ModifyAction;
use Sm\Validation\Abstraction\Validator;

class DestroyAction extends ModifyAction {
    /** @var  DestroyVictim $Victim */
    protected $Victim;
    /** @var  DestroyActionResponse $Response */
    protected $Response;
    public function setValidator(Validator $Validator) {
        $Validator->setPurpose(Validator::PURPOSE_DELETE);
        parent::setValidator($Validator);
    }
    
    
    /**
     * Do the action
     *
     * @return DestroyActionResponse
     */
    public function execute() {
        $this->Response = new DestroyActionResponse;
        return $this->Victim->receiveDestroyAction($this);
    }
}