<?php
/**
 * User: Sam Washington
 * Date: 11/27/16
 * Time: 11:00 PM
 */

namespace Sm\Controller\API;


use Sm\Response\Response;

class APIResponse extends Response implements \JsonSerializable {
    protected static $request_method;
    protected static $request_data;
    
    const ERROR_NO_OPERATIONS       = 10;
    const ERROR_INCOMPLETE_IDENTITY = 11;
    const ERROR_NONEXISTENT_MODEL   = 12;
    const ERROR_NO_PROPOSED_MAP     = 13;
    const ERROR_NO_MATCHING_CLASS   = 14;
    const DEFERRED_IMPROPER_USAGE   = 20;
    
    public static function setRequest($request_data, $request_method = 'get') {
        static::$request_data   = $request_data;
        static::$request_method = $request_method;
    }
    function jsonSerialize() {
        $vs                  = parent::jsonSerialize();
        if (isset(static::$request_data)) {
            $vs['request_method'] = static::$request_method;
            $vs['request_data']   = static::$request_data;
        }
        return $vs;
    }
}