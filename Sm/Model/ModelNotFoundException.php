<?php
/**
 * User: sam
 * Date: 5/18/15
 * Time: 10:22 PM
 */

namespace Sm\Model;

use Exception;

class ModelNotFoundException extends \Exception {
	const REASON_NOT_FOUND         = 1;
	const REASON_NOT_SEARCHED      = 2;
	const REASON_NOT_ACCESSIBLE    = 3;
	const REASON_NOT_ACTIVE        = 4;
	const REASON_NO_MATCHING_CLASS = 5;
	public $actual_message;
	/**
	 * ModelNotFoundException constructor.
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