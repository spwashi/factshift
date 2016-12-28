<?php
/**
 * User: Sam Washington
 * Date: 12/2/16
 * Time: 6:48 PM
 */

namespace Sm\Action\Edit;


use Sm\Action\Abstraction\ModifyAction;
use Sm\Validation\Abstraction\Validator;

class EditAction extends ModifyAction {
    /** @var  EditVictim $Victim */
    protected $Victim;
    /** @var  EditActionResponse $Response */
    protected $Response;
    
    public function setValidator(Validator $Validator) {
        $Validator->setPurpose(Validator::PURPOSE_EDIT);
        parent::setValidator($Validator);
    }
    /**
     * Do the action
     *
     * @return EditActionResponse
     */
    public function execute() {
        $this->validate();
        return $this->Victim->receiveEditAction($this);
    }
}