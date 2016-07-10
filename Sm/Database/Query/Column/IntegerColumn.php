<?php
/**
 * User: Sam Washington
 * Date: 3/23/2015
 * Time: 12:03 PM
 */

namespace Sm\Database\Query\Column;


class IntegerColumn extends Abstraction\NumberColumn{
    public static $column_type = 'INTEGER';
    protected $length = 11;

    public static function init_id($name = 'id') {
        return static::init($name, 11)->setUnsigned(true);
    }
}