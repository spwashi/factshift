<?php
/**
 * User: Sam Washington
 * Date: 6/21/16
 * Time: 1:07 PM
 */

namespace Spwashi\Libs\API;

use Sm\Model\ModelIterator;

class APIResponse implements \JsonSerializable {
	public $message = '';
	public $success = false;
	public $errors  = [];
	public $data;
	const ERROR_NO_OPERATIONS       = 10;
	const ERROR_INCOMPLETE_IDENTITY = 11;
	const ERROR_NONEXISTENT_MODEL   = 12;
	const ERROR_NO_PROPOSED_MAP     = 13;
	const ERROR_NO_MATCHING_CLASS   = 14;
	const DEFERRED_IMPROPER_USAGE   = 20;
	/**
	 * APIResponse constructor.
	 * @param string $message
	 * @param bool   $success
	 * @param array  $errors
	 * @param        $data
	 */
	public function __construct($message = '', $success = false, $data = null, array $errors = []) {
		$this->message = $message;
		$this->success = $success;
		$this->errors  = $errors;
		$this->data    = $data;
	}

	function jsonSerialize() {
		$vs = get_object_vars($this);
		if (is_array($this->errors) && !count($this->errors)) {
			unset($vs['errors']);
		}
		if (is_array($this->data)) {
			$vs['length'] = count($this->data);
		} else if ($this->data instanceof ModelIterator) {
			$vs['length'] = $this->data->length();
		}
		ksort($vs);
		return $vs;
	}
}