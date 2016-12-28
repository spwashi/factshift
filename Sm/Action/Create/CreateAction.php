<?php
/**
 * User: Sam Washington
 * Date: 12/2/16
 * Time: 11:53 PM
 */

namespace Sm\Action\Create;


use Sm\Action\Abstraction\ModifyAction;
use Sm\Validation\Abstraction\Validator;

class CreateAction extends ModifyAction {
    /** @var  CreateVictim $Victim */
    protected $Victim;
    /** @var  CreateActionResponse $Response */
    protected $Response;
    function setValidator(Validator $validator) {
        $validator->setPurpose(Validator::PURPOSE_CREATE);
        parent::setValidator($validator);
    }
    /**
     * Do the action
     *
     * @return CreateActionResponse
     */
    public function execute() {
        $this->validate();
        return $this->Victim->receiveCreateAction($this);
    }
}