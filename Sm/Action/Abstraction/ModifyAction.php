<?php
/**
 * User: Sam Washington
 * Date: 12/2/16
 * Time: 11:58 PM
 */

namespace Sm\Action\Abstraction;


use Sm\Response\Response;
use Sm\Response\ResponseMessage;
use Sm\Validation\Abstraction\Validator;

abstract class ModifyAction extends Action {
    public function validate(Validator $validator = null) : Response {
        $PreviousResponse = parent::validate($validator);
        $ActionResponse   = new ModifyActionResponse($PreviousResponse->getMessage(),
                                                     $PreviousResponse->getStatus(),
                                                     $PreviousResponse->getData(),
                                                     $PreviousResponse->getErrors());
        $ActionResponse->setChangedAttributes([
                                                  'success'  => $this->data,
                                                  'failed'   => array_merge(
                                                      $this->Validator->getErrors(),
                                                      $this->Validator->getNotSet()),
                                                  'adjusted' => $this->Validator->getSoftErrors(),
                                              ]);
        return $this->Response = $ActionResponse;
    }
    /**
     * @return \Sm\Action\Abstraction\ModifyActionResponse
     */
    public function getResponse() {
        return $this->Response ?? new ModifyActionResponse(new ResponseMessage(null, "No Response"), null);
    }
}