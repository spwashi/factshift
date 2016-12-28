<?php
/**
 * User: Sam Washington
 * Date: 1/23/2015
 * Time: 1:22 PM
 */

namespace Sm\Core;

/**
 * Class Util- Utility classes for functions that could be used everywhere and aren't specific to a class
 *
 * @package Sm\Core
 */
class Util {
    static $standard_permitted_characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-';
    /** @var array A cache of strings that have already been turned into studly case */
    private static $studlyCache = [ ];
    
    public static function isImage($url) {
        $params = [ 'http' => [
            'method' => 'HEAD',
        ] ];
        $ctx    = stream_context_create($params);
        $fp     = @fopen($url, 'rb', false, $ctx);
        if (!$fp) return false;  // Problem with url
        
        $meta = stream_get_meta_data($fp);
        if ($meta === false) {
            fclose($fp);
            return false;  // Problem reading data from url
        }
        
        $wrapper_data = $meta["wrapper_data"];
        if (is_array($wrapper_data)) {
            foreach (array_keys($wrapper_data) as $hh) {
                if (substr($wrapper_data[ $hh ], 0, 19) == "Content-Type: image") // strlen("Content-Type: image") == 19
                {
                    fclose($fp);
                    return true;
                }
            }
        }
        
        fclose($fp);
        return false;
    }
    public static function startsWith($haystack, $needle) {
        $length = strlen($needle);
        return (substr($haystack, 0, $length) === $needle);
    }
    
    public static function endsWith($haystack, $needle) {
        $length = strlen($needle);
        if ($length == 0) {
            return true;
        }
        
        return (substr($haystack, -$length) === $needle);
    }
    /**
     * Get the host from the URL
     *
     * @param $url
     *
     * @return mixed
     */
    public static function getHost($url) {
        if (strpos($url, 'http') === false) {
            $url = 'http://' . $url;
        }
        $parseUrl = parse_url(trim($url), PHP_URL_HOST);
        return $parseUrl;
    }
    
    /**
     * Turn a string into something that is studly cased
     *
     * @param string $value the string to turn into studly case
     *
     * @todo make something to turn a string into a URL friendly string
     *
     * @return string
     */
    public static function studly($value) {
        if (isset(static::$studlyCache[ $value ])) {
            return static::$studlyCache[ $value ];
        }
        
        $value = ucwords(str_replace([ '-', '_' ], ' ', $value));
        
        return static::$studlyCache[ $value ] = str_replace(' ', '', $value);
    }
    
    public static function bool($value) {
        return filter_var($value, FILTER_VALIDATE_BOOLEAN);
    }
    
    /** Loop through an array and ksort its components recursively based on their keys
     *
     * @param $array
     *
     * @return bool
     */
    static function recursiveKSort(&$array) {
        foreach ($array as &$value) {
            if (is_array($value))
                static::recursiveKSort($value);
        }
        
        return ksort($array);
    }
    
    /**
     * Take a string or an array, get the first character of the first index (assuming it's OK to operate on) and return which alphabet character it is based on a 0-indexed array beginning with 'a'.
     * This uses the ascii value of the character.
     *
     * @todo see about making this supportive of unicode
     *
     * @param string|array $item
     *
     * @return int
     */
    public static function alpha_ord($item) {
        if (is_array($item)) {
            reset($item);
            $index = key($item);
            if (isset($index[0])) {
                return ord($index[0]) - 97;
            }
        } elseif (isset($item[0])) {
            return ord($item[0]) - 97;
        }
        return -1;
    }
    
    /**
     * Generate a pseudo random string that is of the length provided using only the characters that are provided
     *
     * @param int    $length            The number of characters to make the string
     * @param string $characters_to_use The characters that are allowed in the string
     *
     * @return string THe random string
     */
    static function generateRandomString($length, $characters_to_use = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-') {
        $str   = '';
        $count = strlen($characters_to_use);
        while ($length--) {
            /** Take the character string, pick out a random index between the start and the end, and choose the matching character to go along with it */
            $str .= $characters_to_use[ mt_rand(0, $count - 1) ];
        }
        
        return $str;
    }
    
    /**
     * Include files somewhere when you need to pass in variables and/or store the defined variables afterwards
     *
     * @param array|string $files            The file(s) that should be included
     * @param array        $vars             The variables that will be passed to the include
     * @param bool         $throw_error      Whether or not we should throw an exception if the file has successfully been included
     * @param bool         $get_defined_vars Whether or not we should return an array of defined variables, or the result of the include
     *
     * @return array
     * @throws \Exception
     */
    static function includeWithVariables($files, array $vars = [ ], $throw_error = false, $get_defined_vars = true) {
        $return = 1;
        try {
            if (!empty($vars)) extract($vars, EXTR_SKIP);
            if (is_array($files) && !empty($files)) {
                foreach ($files as $file) {
                    if (file_exists($file)) {
                        #append the result of the include
                        $return[] = (include($file));
                    } else if ($throw_error) {
                        throw new \Exception('Could Not Find File');
                    }
                }
            } elseif (is_string($files)) {
                $include_file = $files;
                if (file_exists($include_file)) {
                    #append the result of the include
                    $return = (include($include_file));
                    if (!$return && $throw_error) throw new \Exception("Could not include file {$include_file}");
                } else if ($throw_error) {
                    throw new \Exception("Could not find file {$include_file}");
                }
            }
        } catch (\Exception $e) {
            if ($throw_error) throw $e;
        }
        unset($files, $vars);
        
        return $get_defined_vars ? get_defined_vars() : $return;
    }
    
    public static function can_be_string($var) {
        return $var === null || is_scalar($var) || is_callable([ $var, '__toString' ]);
    }
    /**
     * Create an unordered HTML list from an array
     *
     * @param $array
     *
     * @return string
     */
    static function array_to_ul($array) {
        if (is_array($array)) {
            $out = "<ul>";
            foreach ($array as $key => $elem) {
                if (!is_array($elem)) {
                    $out .= "<li><a>$key:[$elem]</a></li>";
                } else {
                    $id       = isset($elem['id']) ? $elem['id'] : null;
                    $children = isset($elem['children']) ? $elem['children'] : null;
                    
                    $out .= "<li><a href='#{$id}'>$key</a>" . static::array_to_ul($children) . "</li>";
                }
            }
            $out = $out . "</ul>";
            return $out;
        }
        return '';
    }
}