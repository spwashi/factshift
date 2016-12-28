<?php
/**
 * User: Sam Washington
 * Date: 11/24/16
 * Time: 11:50 PM
 */

namespace Sm\Identifier;


use Exception;

class UnidentifiableError extends \Exception {
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
}