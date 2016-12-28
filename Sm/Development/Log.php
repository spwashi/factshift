<?php
/**
 * User: sam
 * Date: 4/27/15
 * Time: 8:17 PM
 */

namespace Sm\Development;

class Log extends \Exception {
    protected        $timestamp;
    protected        $type;
    protected        $line         = -1;
    protected        $file         = -1;
    protected static $rule_created = false;
    
    public function __construct($message, $type = 'log', $backtrace = null, $code = 200) {
        $this->timestamp = date('{m-d-Y  H:i:s}');
        $this->type      = isset($type) ? $type : 'log';
        if ($message instanceof \Exception) {
            $message = [ $message->getMessage(), $message->getLine(), $message->getFile(), $message->getCode() ];
        }
        $this->message = $message;
        $this->code    = $code;
        $this->setBacktrace($backtrace);
    }
    
    public function setBacktrace($backtrace = null) {
        if (!isset($backtrace)) {
            $backtrace = debug_backtrace()[0];
        }
        if (isset($backtrace['line']) && isset($backtrace['file'])) {
            $this->line = $backtrace['line'];
            $this->file = $backtrace['file'];
        }
        return $this;
    }
    public static function init($message, $backtrace = null, $type = 'log', $code = 200) {
        if (!isset($backtrace)) {
            $backtrace = debug_backtrace()[0];
        }
        $class = new static($message, $type, $backtrace, $code);
        return $class;
    }
    
    public function log_it($raw = false) {
        $path = BASE_PATH . 'Logs/' . $this->type . '.txt';
        try {
            $file_pointer = fopen($path, 'a+');
            if (!$file_pointer) {
                return $this;
            }
        } catch (\Exception $e) {
            return $this;
        }
        if (!$raw) {
            $this->message = !$this->message ? "Unlabeled happenstance logged" : $this->message;
            if (is_object($this->message)) {
                $this->message = json_encode($this->message);
            } elseif (!is_array($this->message)) {
                $this->message = "\t-->\t\t" . $this->message . "\n";
            } else {
                $this->message = static::styleArray($this->message);
            }
            $date        = $this->timestamp;
            $lineMessage = ($this->line != null) ? "line {{$this->line}}\t" : null;
            $codeMessage = ($this->code != null && $this->code != 200) ? "code {{$this->code}}" : null;
            $fileMessage = ($this->file != null) ? "of {{$this->file}}" : null;
            $fileMessage = $fileMessage ? str_replace(BASE_PATH, '', $fileMessage) : null;
            $app         = '';#;App::_()->name;
            $message     = "{$app} {$date} \t {$codeMessage} {$lineMessage} {$fileMessage};\n{$this->message}\n";
        } else {
            $message = "\n" . $this->message . "\n";
        }
        if (!static::$rule_created) {
            
            fwrite($file_pointer, str_repeat('-', 100 + 22) . "\n");
            fwrite($file_pointer, str_repeat('-', 25) . "{$this->timestamp}" . str_repeat('-', 75) . "\n");
            fwrite($file_pointer, str_repeat('-', 100 + 22) . "\n");
            static::$rule_created = true;
        }
        fwrite($file_pointer, $message);
        fclose($file_pointer);
        return $this;
    }
    
    private static function objectToArray($object) {
        if (!is_object($object) && !is_array($object))
            return $object;
        return array_map('objectToArray', (array)$object);
    }
    /**
     * These types will be substituted in the text file for data types
     *
     * @var array
     */
    static public $types = [
        'integer' => 'int',
        'string'  => 'str',
        'array'   => 'arr',
    ];
    static function styleArray($arr, &$var = null, $arr_iteration = 1) {
        if (!count($arr)) return '[empty array]';
        $walk = array_map('strlen', array_keys($arr));
        $max  = max($walk);
        foreach ($arr as $k => $v) {
            $new_key = $k . str_repeat(' ', 1 + ($max - strlen($k)));
            $tab     = str_repeat("\t", $arr_iteration);
            
            if (is_array($v)) {
                $arrSize = count($v);
                $var .= "{$tab}{$new_key}\t=>\t\t arr({$arrSize})[\n";
                self::styleArray($v, $var, $arr_iteration + 1);
                $var .= "{$tab}]\n";
            } else {
                $vType = gettype($v);
                if (isset(static::$types[ $vType ])) $vType = static::$types[ $vType ];
                $new_type = $vType . str_repeat(' ', 1 + 7 - strlen($vType));
                if (is_object($v)) {
                    $v = $v instanceof \JsonSerializable ? json_encode($v) : get_class($v);
                } else if (is_bool($v)) {
                    $v = $v ? "true" : "false";
                }
                $v = str_replace("\n", "\n$tab         \t\t", $v);
                $var .= "{$tab}{$new_key}=> {$new_type}: \t{$v}\n";
            }
        }
        return $var;
    }
}