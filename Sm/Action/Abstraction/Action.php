<?php
/**
 * User: Sam Washington
 * Date: 12/2/16
 * Time: 11:49 AM
 */

namespace Sm\Action\Abstraction;

use Sm\Action\Exception\FatalActionException;
use Sm\Development\Log;
use Sm\Response\Response;
use Sm\Response\ResponseMessage;
use Sm\Validation\Abstraction\Validator;
use Sm\Validation\Validated;

/**
 * Class Action
 *
 * Manages different operations we can perform on a variety of different 'victims'
 *
 * @package Sm\Action\Abstraction
 *
 */
abstract class Action {
    protected $Actor;
    protected $Victim;
    /** @var Validator $Validator */
    protected $Validator = null;
    protected $Response;
    
    protected $data;
    protected $can_continue = null;
    protected $success      = null;
    /** @var int $Environment */
    protected $Environment = null;
    
    public function __construct($actor = null, $data = null, $victim = null) {
        $this->Actor  = $actor;
        $this->data   = $data;
        $this->Victim = $victim;
    }
    /**
     * Check to see if the actor can execute the current action with the given properties
     *
     * @param Validator $validator
     *
     * @return \Sm\Response\Response
     * @throws \Sm\Action\Exception\FatalActionException
     */
    public function validate(Validator $validator = null) : Response {
        if ($validator) $this->setValidator($validator);
        else if ($this->Victim instanceof Validated) $this->setValidator($this->Victim->getValidator());
        
        $this->validateCompleteness();
        $this->Validator->validate($this->data);
        $this->data = $this->Validator->getSuccesses();
    
        if (!$this->Validator->canContinue()) {
            $ActionResponse = new Response(new ResponseMessage(null, "Could not validate action."),
                                           false,
                                           $this->data,
                                           $this->Validator->getErrors()
            );
            throw new FatalActionException($ActionResponse);
        }
        $ActionResponse = new Response(null, true);
        return $this->Response = $ActionResponse;
    }
    /**
     * Make sure everything that the class expects is actually there
     *
     * @throws \Sm\Action\Exception\FatalActionException
     * @throws \Sm\Action\Exception\InvalidActorException
     * @throws \Sm\Action\Exception\InvalidVictimException
     */
    public function validateCompleteness() {
        if (!($this->Validator instanceof Validator)) {
            throw new FatalActionException(ResponseMessage::init(null, "Cannot validate attributes"));
        }
    }
    /**
     * Do the action
     *
     * @return mixed
     */
    abstract public function execute();
    public function setValidator(Validator $Validator) {
        $this->Validator = $Validator;
    }
    
    /**
     * @return \Sm\Response\Response
     */
    public function getResponse() {
        return $this->Response ?? new Response(new ResponseMessage(null, "No Response"), null);
    }
    public function getActor() {
        return $this->Actor;
    }
    /**
     * @return null
     */
    public function getVictim() {
        return $this->Victim;
    }
}