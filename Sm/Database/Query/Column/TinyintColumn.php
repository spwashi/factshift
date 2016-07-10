<?php
/**
 * User: Sam Washington
 * Date: 3/29/2015
 * Time: 3:02 PM
 */

namespace Sm\Database\Query\Column;


class TinyintColumn extends Abstraction\NumberColumn{
    public static $column_type = 'TINYINT';
    protected $length = 11;

    public static function init_id($name = 'id') {
        return static::init($name, 3)->setUnsigned(true);
    }
}