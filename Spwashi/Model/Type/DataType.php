<?php
/**
 * User: sam
 * Date: 6/10/15
 * Time: 12:49 AM
 */

namespace Spwashi\Model\Type;

use Sm\Model\Model;

/**
 * Class DataType
 * @package Spwashi\Model\Type
 * @property $id
 * @property $name
 * @property $description
 */
class DataType extends Model {
    public static    $default_properties = [];
    public static    $table_name         = 'data_types';
    public static    $main_string_key    = 'name';
    protected static $find_all_able      = true;
}