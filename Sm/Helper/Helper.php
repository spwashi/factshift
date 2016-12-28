<?php
/**
 * User: sam
 * Date: 5/11/15
 * Time: 10:33 PM
 */

namespace Sm\Helper;

class Helper {
    /** @var Helper[] */
    static protected $named = [ ];
    
    const PRE_PROCESS  = 'sm_pre_process';
    const PRE_ROUTING  = 'sm_pre_routing';
    const POST_PROCESS = 'sm_post_process';
    const PRE_OUTPUT   = 'sm_pre_output';
    
    protected $callback;
    protected $name;
    
    public function __construct($callback, $name = null) {
        $this->callback = $callback;
        if ($name != null) {
            static::$named[ $name ]   = static::$named[ $name ] ?? [ ];
            static::$named[ $name ][] = $this;
        }
    }
    
    public static function init($callback, $name = null) {
        return new static($callback, $name);
    }
    public static function register(array $array_of_helper_builders) {
        foreach ($array_of_helper_builders as $value) {
            if (!is_array($value)) continue;
            $name   = isset($value[0]) ? $value[0] : null;
            $helper = isset($value[1]) ? $value[1] : function () { };
            static::init($helper, $name);
        }
    }
    
    public function call($parameters = [ ]) {
        return $this->call_reference($parameters);
    }
    public function call_reference(&$parameters) {
        $function = $this->callback;
        if (is_callable($function)) {
            return $function($parameters);
        } elseif (is_string($function)) {
            if (strpos($function, '@') !== false) {
                $call_explode = explode('@', $function);
                $class_name   = $call_explode[0];
                //todo implement METHOD NOT EXIST failsafe
                $method = $call_explode[1];
                if (method_exists($class_name, $method) && is_callable([ $class_name, $method ])) {
                    return call_user_func([ new $class_name, $method ], $parameters);
                }
            }
        }
        $return_value = [ ];
        if (is_array($function)) {
            foreach ($function as $key => $value) {
                $return_value[] = static::runHelpersReference($value, $parameters);
            }
            return $return_value;
        }
        return null;
    }
    
    public static function runHelpers($helper, $parameters = [ ]) {
        return static::runHelpersReference($helper, $parameters);
    }
    public static function runHelpersReference($helper, &$parameters) {
        $result = null;
        if (!($helper instanceof Helper)) {
            if (!is_string($helper) && !is_callable($helper)) return null;
            
            if (is_string($helper) && isset(static::$named[ $helper ])) $helper = static::$named[ $helper ];
            
            $helper = Helper::init($helper);
        }
        $result = $helper->call_reference($parameters);
        return $result;
    }
    
}