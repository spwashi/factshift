<?php
/**
 * User: sam
 * Date: 6/10/15
 * Time: 1:23 AM
 */

namespace Spwashi\Model;

use Sm\Model\Model;

/**
 * Class Setting
 * @package Spwashi\Model
 * @property $name           The name of the setting
 * @property $description    A description of the setting
 * @property $grouping       The "Collection that the group is in"
 * @property $position       The position of the setting in the group (in case the group needs to be displayed in some sort of list)
 * @property $is_constrained Whether or not the setting has an enumerated value
 * @property $default_value  The default value of the field
 * @property $max_value      A High end of the setting
 * @property $min_value      A Low end of the setting (useful for ranges)
 * @property $data_type      The allowed data type
 */
class Setting extends Model {
    public static $default_properties; public static $api_settable_properties;
    public static $table_name;
    public static $table_prefix;
    public static $main_string_key = '';
}