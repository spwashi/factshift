<?php
/**
 * User: Sam Washington
 * Date: 4/1/2015
 * Time: 1:55 AM
 */

namespace Sm\Response;


use Sm\Core\Util;
use Sm\Iterator\Iterator;

class Response extends Abstraction\Response implements \JsonSerializable {
    protected $status = "unset";
    protected $data   = null;
    /** @var ResponseMessage|string|null $message */
    protected $message = null;
    protected $errors  = [ ];
#########################################################
#            Initializers & Constructors                #
#########################################################
    /**
     * Response constructor.
     *
     * @param \Sm\Response\ResponseMessage        $message
     * @param bool                                $status
     * @param                                     $data
     * @param array                               $errors
     *
     * @throws \Exception
     */
    public function __construct($message = null, $status = false, $data = null, array $errors = [ ]) {
        $this->message = $message;
        $this->status  = $status;
        $this->errors  = $errors;
        $this->setData($data);
    }
    public static function initFromResponse(Response $response) {
        return new static(
            $response->getMessage(),
            $response->status,
            $response->getData(),
            $response->getErrors()
        );
    }
#########################################################
#            Getters and Setters                        #
#########################################################
    /**
     * @param bool $strict
     *
     * @return bool|null
     */
    public function getStatus($strict = false) {
        return $this->status !== "unset" ? $this->status : empty($this->getErrors($strict));
    }
    public function setStatus($status) {
        $this->status = $status;
    }
    public function getMessage() {
        return $this->message;
    }
    public function setMessage($message) {
        $this->message = $message;
    }
    public function getErrors($strict = false) {
        return $this->errors;
    }
    public function getData() {
        return $this->data;
    }
    public function setData($data) {
        $this->data = $data;
    }
#########################################################
#            Serialization functions                    #
#########################################################
    public function __toString() {
        return Util::can_be_string($this->message) ? (string)$this->message : json_encode($this->message);
    }
    function jsonSerialize() {
        $vs   = [
            'success' => $this->status,
            'message' => $this->message,
        ];
        $data = $this->getData();
        if (isset($data)) $vs['data'] = $this->getData();
        if (count($this->errors)) $vs['errors'] = $this->errors;
        
        
        if (is_array($this->errors) && !count($this->errors)) unset($vs['errors']);
        if (is_array($this->data)) {
            $vs['length'] = count($this->data);
        } else if ($this->data instanceof Iterator) {
            $vs['length'] = $this->data->length();
        }
        
        $vs['_object_type'] = 'Response';
        return $vs;
    }
}