<?php
/**
 * User: Sam Washington
 * Date: 12/13/15
 * Time: 7:04 AM
 */

namespace Spwashi\Model\Type;

/**
 * Class DimensionRole
 * @package Spwashi\Model\Type
 * @property $id
 * @property $name
 * @property $description
 */
class DimensionRole {
    public static $default_properties; public static $api_settable_properties;
    public static $table_name;
    public static $table_prefix;
    public static $main_string_key = 'name';

    const OVERVIEW        = 1;
    const HISTORY_CULTURE = 2;
    const METHODOLOGY     = 3;
    const CONTEXT         = 4;
    const DISCUSSION      = 5;
    const META            = 6;
}