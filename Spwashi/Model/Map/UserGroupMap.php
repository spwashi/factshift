<?php
/**
 * User: Sam Washington
 * Date: 3/22/2015
 * Time: 8:30 PM
 */

namespace Spwashi\Model\Map;

use Sm\Model\Model;

/**
 * Class UserGroupMap
 * @package Sm\Model\Map
 * @property $id
 * @property $user_id  The User's ID
 * @property $group_id The Group's ID
 * @property $role_id  THe role the user plays in the group
 * @property $status   The status of the user's role in the group
 */
class UserGroupMap extends Model {
    public static $default_properties;
    public static $primary_identifier;
    public static $secondary_identifier;
    public static $api_settable_properties;
    public static $table_name;
    public static $_mapped;
    public static $table_prefix;
    public static $main_string_key = '';
    public static $_map_type       = 'User|Group';
}