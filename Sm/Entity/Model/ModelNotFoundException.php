<?php
/**
 * User: sam
 * Date: 5/18/15
 * Time: 10:22 PM
 */

namespace Sm\Entity\Model;

use Exception;

class ModelNotFoundException extends \Exception implements \JsonSerializable {
    const REASON_NOT_FOUND         = 1;
    const REASON_NOT_SEARCHED      = 2;
    const REASON_NOT_ACCESSIBLE    = 3;
    const REASON_NOT_ACTIVE        = 4;
    const REASON_NO_MATCHING_CLASS = 5;
    const REASON_UNIMPLEMENTED     = 6;
    public $actual_message;
    /**
     * ModelNotFoundException constructor.
     *
     * @param string    $message
     * @param int       $code
     * @param Exception $previous
     */
    public function __construct($message = "", $code = 0, Exception $previous = null) {
        if (!is_string($message)) {
            $this->actual_message = $message;
            $message              = json_encode($message);
        }
        parent::__construct($message, $code, $previous);
    }
    
    public function jsonSerialize() {
        return [
            'message'        => $this->message,
            'actual_message' => $this->actual_message,
            'line'           => $this->line,
            'file'           => $this->file,
        ];
    }
    
}