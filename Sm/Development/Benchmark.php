<?php
/**
 * User: Sam Washington
 * Date: 1/29/2015
 * Time: 12:31 AM
 */

namespace Sm\Development;

/**
 * Class Benchmark
 *
 * @package Sm\Development
 */
class Benchmark {
    /** @var array $marker Array of when all marked times were added */
    static $marker = [ ];

    /**
     * Mark the time of the new benchmark
     *
     * @param string $name The name of the new mark to add
     */
    static function mark($name) {
        self::$marker[ $name ] = microtime();
    }

    /**
     * Get the difference between two times, one time and now, or output '{{elapsed_time}}' to later replace with the time difference between the start of the application and the end.
     *
     * @param string $point1   The name of the start time marker
     * @param string $point2   The name of the end time marker
     * @param int    $decimals The number of decimals for precision
     *
     * @return string The time difference, or a string '{{elapsed_time}}' that will be later replaced with the time elapsed.
     */
    static function elapsed_time($point1 = '', $point2 = '', $decimals = 4) {
        if ($point1 == '') {
            #if the first variable parameter is empty, an output class will swap this value for the elapsed_time of the program
            return '{{elapsed_time}}';
        }
        if (!isset(self::$marker[ $point1 ])) {
            return '';
        }
        if (!isset(self::$marker[ $point2 ])) {
            self::$marker[ $point2 ] = microtime();
        }
        list($sm, $ss) = explode(' ', self::$marker[ $point1 ]);
        list($em, $es) = explode(' ', self::$marker[ $point2 ]);
        return number_format(($em + $es) - ($sm + $ss), $decimals);
    }
}