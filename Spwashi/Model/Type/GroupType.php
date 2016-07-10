<?php
/**
 * User: Sam Washington
 * Date: 4/4/2015
 * Time: 5:06 PM
 */

namespace Spwashi\Model\Type;

use Sm\Model\Model;

/**
 * Class GroupType
 * @package Spwashi\Model\Type
 * @property $id
 * @property $name
 * @property $description
 */
class GroupType extends Model {
    public static    $default_properties = [];
    public static    $table_name         = 'group_types';
    public static    $main_string_key    = 'name';
    protected static $find_all_able      = true;
}