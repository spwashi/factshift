<?php
/**
 * User: sam
 * Date: 6/9/15
 * Time: 11:57 PM
 */

namespace Spwashi\Model;

use Sm\Model\Model;

/**
 * Class Status
 * @package Spwashi\Model
 * @property $id
 * @property $name        The value of the status
 * @property $description A description of what the User means
 */
class Status extends Model {
    public static $default_properties; public static $api_settable_properties;
    public static $table_name;
    public static $table_prefix;
    public static $main_string_key = 'name';
}