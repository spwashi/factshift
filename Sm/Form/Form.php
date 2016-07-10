<?php
/**
 * User: sam
 * Date: 6/14/15
 * Time: 5:22 PM
 */

namespace Sm\Form;

use Sm\Core\IoC;
use Sm\Core\Util;
use Sm\Model\Abstraction\Model;

/**
 * Class SectionForm
 * Wrapper for common Section validation-related functionality;
 ** Takes values stored in the form values variable
 ** Checks to see if their values are valid according to the matching validator class
 ** Produces a message based on each result
 * @todo    capture IP address
 * @package Sm\Form
 */
class Form implements \Iterator {
    protected $position;
    /** @var bool If set to true, instead of marking an error, just change the value */
    public    $change_to_default = true;
    protected $required_fields   = [];
    protected $expected_fields   = [];
    public    $form_values       = [];
    /**
     * @var array An array of the results to return. If there were errors, you could just return this array json_encode d
     * Formatted in a (form key)=>(error message) key value pair
     */
    protected $message_array = [];
    protected $error;

    //<editor-fold desc="//-Initializers">
    /**
     * This class cannot be externally instantiated
     */
    protected function __construct() {
    }

    /**
     * Iterate through the expected form values and pick out the values that are not expected
     */
    public function iterate_expected() {
        foreach ($this->expected_fields as $v) {
            if (isset($this->form_values[$v])) {
                $form_value = $this->form_values[$v];

                $this->form_values[$v] = (is_string($form_value)) ? $this->form_values[$v] : $form_value;
            }
        }
    }

    /**
     * Initialize the object with expected values and actual received values
     *
     * @param array $exp An array of the fields that are expected in the form values
     * @param array $form_values
     *
     * @return static
     *
     */
    public static function init_non_reference($exp, $form_values = []) {
        $t                  = new static;
        $t->expected_fields = $exp;
        $t->form_values     = $form_values;
        $t->iterate_expected();
        return $t;
    }

    /**
     * Initialize a form object with expected values, allow the form values to be modified by the class
     *
     * @param array $exp Expected form values
     * @param array $form_values
     *
     * @return static
     */
    public static function init($exp, &$form_values) {
        $t                  = new static;
        $t->expected_fields = $exp;
        $t->form_values     =& $form_values;
        $t->iterate_expected();
        return $t;
    }

    //</editor-fold>

    //<editor-fold desc="//-Handle nonces">
    /**
     * Generate a nonce for a form name, return it. Also, add it to an array of nonces that are associated with that
     * form in the session
     *
     * @param $form_name
     *
     * @return string
     */
    public static function generate_nonce($form_name) {
        $nonce_name = 'nonce-' . $form_name;
        $session    = IoC::_()->session;
        if (!$session) {
            return false;
        }

        $session_nonce = $session->get($nonce_name);
        if (!is_array($session_nonce)) {
            $session_nonce = [];
        }
        $nonce = $session_nonce[] = Util::generateRandomString(15, Util::$standard_permitted_characters . '%^&*()!');
        $session->set($nonce_name, $session_nonce);
        return $nonce;
    }

    /**
     * Unset all nonces associated with a form name
     *
     * @param $form_name
     * @return bool
     */
    public static function unset_nonces($form_name) {
        $session = IoC::_()->session;
        if (!$session) return false;
        $session->set('nonce-' . $form_name, null);
        return true;
    }

    /**
     * Get the array of nonces associated with a form name
     *
     * @param $form_name
     *
     * @return array
     */
    public static function get_nonce($form_name) {
        $session = IoC::_()->session;
        if (!$session) return false;

        $result = $session->get('nonce-' . $form_name);
        return $result ?: [];
    }

    /**
     * Check to see if the nonce we want the form to have submitted A) exists and B) matches a nonce that we expect it
     * to
     *
     * @param string $nonce_name      The name of the nonce as it has been posted
     * @param array  $our_nonce_array The array in which the nonce should be inside of in the session
     *
     * @return bool
     */
    public function check_nonce($nonce_name, $our_nonce_array) {
        if (!isset($this->form_values[$nonce_name]) || !in_array($this->form_values[$nonce_name], $our_nonce_array)) {
            $this->error = 'Invalid Form Source';
            return false;
        }
        return true;
    }
    //</editor-fold>

    //<editor-fold desc="//-Handle the form values">
    /**
     * This method iterates through the expected form values and does one of two things-
     * it either removes the form values that are not supposed to have been submitted,
     * or it immediately returns false and sets the form's error message
     *
     * @param bool $strict Should we return with an error (true) or just unset the offending value? (false)
     *
     * @return bool
     */
    public function manage_expected($strict = false) {
        foreach ($this->form_values as $key => &$value) {
            if (!in_array($key, $this->expected_fields)) {
                if (!$strict) {
                    unset($this->form_values[$key]);
                } else {
                    $this->error = 'Invalid Form';
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * Method for processing the values submitted through the API
     ** Iterate through the provided form's values (assuming there is a validate_* function associated with it)
     ** On success, set the values of the class to be whatever they were submitted to be
     ** On error, return with a message
     *
     * @param Model     $model  The model to which the form values belong
     * @param array     $skip   A list of values to skip
     * @param bool|true $strict Should we return an error on extraneous form values, or just remove it and continue?
     * @param bool|true $set    Should we even set the class values to something?
     * @return array|bool
     */
    public function apply_form_to_model(Model $model, $skip = [], $strict = true, $set = true) {
        #First check to see that there were no values submitted that should not have been
        if (!$this->manage_expected($strict)) {
            return [
                'success' => false,
                'message' => $this->getError()
            ];
        };
        $did_not_set_arr = [];
        $p               = [];
        #Then iterate through the form values provided, validating
        foreach ($this as $form_value_index => $value) {

            $v =& $this->form_values[$form_value_index];

            #CM:req validate_
            #Use the form's validation functions to validate the values at the form index
            $form_value_index = trim($form_value_index);
            $method_name      = 'validate_' . $form_value_index;
            if (!in_array($form_value_index, $skip) && method_exists($this, $method_name)) {
                $call                 = call_user_func([$this, $method_name], $form_value_index);
                $p[$form_value_index] = $v;
                if ($call) {
                    if ($set) $model->set([$form_value_index => $v]);
                } else {
                    if ($set) $did_not_set_arr[] = $form_value_index;
                }
            }
        }
        $errors                         = $this->message_array;
        $this->message_array['not_set'] = $did_not_set_arr;

        if (!empty($errors) && $strict) {
            return [
                'success' => false,
                'message' => $errors
            ];
        } else if (empty($model->getChanged())) {
            return [
                'success'   => true,
                'message'   => 'no values were changed',
                'code'      => 1,
                'processed' => $p,
            ];
        }
        return true;
    }

    /**
     * Take the result of a validity check and an map of possible outcomes to outputs. Add the matching message to an
     * array of messages that can later be sent back
     * (message)
     *
     * @param string|int $result           The result of the check
     * @param string     $index            The index of the return array to add the error to
     * @param array      $array_of_options An associative array of possible results returned and what to do if they're
     *                                     encountered
     * @param null       $title            If only the title is different, there can be a sort of a cariable set for
     *                                     the title that can later be replaced in the message
     */
    public function process_validation_result($result, $index, array $array_of_options, $title = null) {
        if (array_key_exists($result, $array_of_options)) {
            $msg                         = isset($title) ? str_replace('{{title}}', $title, $array_of_options[$result]) : $array_of_options[$result];
            $this->message_array[$index] = $msg;
        } else {
            $this->message_array[$index] = 'Undefined error';
        }
    }
    //</editor-fold>

    //<editor-fold desc="//-Getters and Setters">
    /**
     * Get the array of return values
     *
     * @return array
     */
    public function getMessageArray() {
        return $this->message_array;
    }

    /**
     * Get the array of form values
     *
     * @return array
     */
    public function getFormValues() {
        return $this->form_values;
    }

    /**
     * Get the error
     *
     * @return mixed
     */
    public function getError() {
        return $this->error;
    }
    //</editor-fold>

    //<editor-fold desc="//-Iterator">
    public function current() {
        $current = current($this->form_values);
        return $current;
    }

    public function next() {
        next($this->form_values);
    }

    public function key() {
        return key($this->form_values);
    }

    public function valid() {
        $key = key($this->form_values);
        return ($key !== null && $key !== false);
    }

    public function rewind() {
        return reset($this->form_values);
    }
    //</editor-fold>
}