<?php
/**
 * User: Sam Washington
 * Date: 12/2/16
 * Time: 6:30 PM
 */

namespace Sm\Action\Exception;


use Sm\Response\Response;
use Sm\Response\ResponseMessage;

class ActionException extends \Exception implements \JsonSerializable {
    protected $Response;
    /**
     * ActionException constructor.
     *
     * @param Response|string|ResponseMessage $message
     * @param int                             $code
     * @param \Exception|null                 $previous
     */
    public function __construct($message = '', $code = 0, \Exception $previous = null) {
        if ($message instanceof Response) {
            $this->Response = $message;
        } else {
            $this->Response = new Response($message instanceof ResponseMessage ? $message : new ResponseMessage(null, $this->message), null);
        }
        parent::__construct((string)$message, $code, $previous);
    }
    public function getResponse() {
        return $this->Response;
    }
    public function jsonSerialize() {
        return $this->getResponse();
    }
}