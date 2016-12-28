<?php
/**
 * User: Sam Washington
 * Date: 11/25/16
 * Time: 11:12 AM
 */

namespace Sm\Entity;


use Exception;

class EntityNotFoundException extends \Exception implements \JsonSerializable{
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