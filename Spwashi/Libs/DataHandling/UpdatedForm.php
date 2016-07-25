<?php

namespace Spwashi\Libs\DataHandling;

use Sm\Model\Abstraction\Model;

/**
 * User: Sam Washington
 * Date: 12/11/15
 * Time: 5:42 AM
 */
class UpdatedForm implements \JsonSerializable {
	public static $_allowed_values   = [];
	protected     $allowed_values    = [];
	protected     $change_to_default = false;
	/** @var Model $model */
	protected $model       = null;
	protected $form_values = [];

	protected $error_array         = [];
	protected $fatal               = false;
	protected $default_array       = [];
	protected $default_error_array = [];
	protected $success_array       = [];
	protected $data                = [];

	const SUCCESS   = true;
	const DEFAULTED = 0;

	public static function init($class = null, $change_to_default = false, $allowed_values = null) {
		return new static($class, $change_to_default, $allowed_values);
	}

	public function __construct($model = null, $change_to_default = false, $allowed_values = null) {
		$this->allowed_values    = is_array($allowed_values) ? $allowed_values : static::$_allowed_values;
		$this->change_to_default = $change_to_default;

		$this->model = $model;
	}

	public function set_data($data) {
		$this->data = $data;
		return $this;
	}

	protected function manage_expected($form_values) {
		foreach ($form_values as $key => $value) {
			if (!in_array($key, $this->allowed_values)) {
				$this->error_array[$key] = 'Cannot set property';
				unset($form_values[$key]);
			}
		}
		$this->form_values = $form_values;
	}

	public function process($form_values, $skip = []) {
		$this->manage_expected($form_values);

		foreach ($this->form_values as $f_v_index => &$f_v_value) {
			#CM:req validate_
			#Use the form's validation functions to validate the values at the form index

			$f_v_index   = trim($f_v_index);
			$method_name = 'validate_' . $f_v_index;
			if (!in_array($f_v_index, $skip) && method_exists($this, $method_name)) {
				$call = call_user_func_array([$this, $method_name], [
					&$this->form_values[$f_v_index],
					$this->data,
					$this->change_to_default,
					null,
					$this->form_values,
				]);
				if ($call === static::SUCCESS) {
					$this->success_array[$f_v_index] = $this->form_values[$f_v_index];
				} else if ($call === static::DEFAULTED) {
					$this->default_array[$f_v_index] = $this->form_values[$f_v_index];
				} else if (is_array($call)) {
					$this->default_array[$f_v_index]       = $this->form_values[$f_v_index];
					$this->default_error_array[$f_v_index] = $call[1];
				} else {
					$this->error_array[$f_v_index] = $call;
				}
			}
			$this->validate__all();
		}
		return $this;
	}

	public function can_continue() {
		return !$this->fatal;
	}

	public static function process_validation_result($result, $array_of_options, $title = null) {
		if (array_key_exists($result, $array_of_options)) {
			$msg = trim(str_replace('{{title}}', $title, $array_of_options[$result]));
		} else {
			$msg = 'Undefined error - ' . $result;
		}
		return $msg;
	}

	/**
	 * Checks all of the properties were set correctly enough
	 * @return bool
	 */
	public function validate__all() {
		return true;
	}

	public function set_model_properties() {
		if ($this->model) {
			$this->model->set($this->success_array);
		}
		return $this;
	}

	public function get_error_array() {
		return $this->error_array;
	}

	public function get_default_error_array() {
		return [
			'default_errors' => $this->default_error_array,
			'defaults'       => $this->default_array,
			'errors'         => $this->error_array,
		];
	}

	public function get_defaulted_array() {
		return $this->default_array;
	}

	public function get_success_array() {
		return $this->success_array;
	}

	public function get_form_values() {
		return $this->form_values;
	}
	function jsonSerialize() {
		return get_object_vars($this);
	}
}