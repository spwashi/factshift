<?php
/**
 * User: Sam Washington
 * Date: 12/2/16
 * Time: 6:48 PM
 */

namespace Sm\Action\Dummy;


use Sm\Action\Abstraction\ModifyAction;
use Sm\Validation\Abstraction\Validator;

class DummyAction extends ModifyAction {
    /** @var  DummyVictim $Victim */
    protected $Victim;
    /** @var  DummyActionResponse $Response */
    protected $Response;
    
    public function setValidator(Validator $Validator) {
        $Validator->setPurpose(Validator::PURPOSE_DELETE);
        parent::setValidator($Validator);
    }
    /**
     * Do the action
     *
     * @return DummyActionResponse
     */
    public function execute() {
        $this->Response = $this->validate();
        return $this->Victim->receiveDummyAction($this);
    }
}