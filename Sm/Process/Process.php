<?php
/**
 * User: sam
 * Date: 6/20/15
 * Time: 3:50 PM
 */

namespace Sm\Process;

use Sm\Core\App;
use Sm\Core\Util;

/**
 * Class Process
 * Meant to return JSON encoded content to the browser based on $_GET, $_POST, or any other data received, useful for form handling.
 * As of now, this does not use the Helper class
 *
 * @package Sm\View
 */
class Process {
    public $content;
    /**
     * Create a process based on a pre-existing file. This will get overridden by other types later (like if you want to include a JSON file or something like that)
     *
     * @param string $path               The path to the file to be included. Could be an HTML or PHP file- just include the extension
     * @param array  $data               Any variables that must be included for the file to operate correctly. Must be in a key=>value type map with indices matching the name of the variable.
     * @param bool   $is_in_process_path If the view is not going to be in the app-specified view path (like if we are using a view from another app or location) mark this as false to flag the path as
     *                                   absolute
     *
     * @return static
     * @throws \Exception
     */
    static public function create($path, $data = [ ], $is_in_process_path = true) {
        $process = new static();
        if ($is_in_process_path) {
            $path = App::_()->Paths->scripts . $path;
        }
        
        ob_start();
        
        # For processes, assume that we are going to be dealing with files that return 1 when the content of the Process result is meant to be returned as something to output
        $result = Util::includeWithVariables($path, $data, false, false);
        if ($result === 1) {
            $content = ob_get_clean();
        } else {
            # Otherwise, the return value is just going to be whatever was returned by the process.
            $content = $result;
            ob_clean();
        }
        $process->content = $content;
        
        return $process;
    }
    
    public function getOutput() {
        return $this->content;
    }
    
}