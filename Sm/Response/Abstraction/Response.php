<?php
/**
 * User: Sam Washington
 * Date: 12/18/16
 * Time: 8:41 PM
 */

namespace Sm\Response\Abstraction;


abstract class Response {
    protected $status;
    protected $errors = [ ];
    protected $data   = null;
    
    public static function init($message = null) {
        return new static($message);
    }
    
    public function getStatus() { return $this->status; }
    public function setStatus($status) { $this->status = $status; }
    
    abstract public function getData();
    abstract public function setData($data);
    
    public function getErrors() { return $this->errors; }
    abstract public function __toString();
}