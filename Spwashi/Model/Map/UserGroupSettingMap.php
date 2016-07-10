<?php
/**
 * User: Sam Washington
 * Date: 3/22/2015
 * Time: 8:30 PM
 */

namespace Spwashi\Model\Map;

use Sm\Model\Model;

/**
 * Class UserGroupSettingMap
 * @package Sm\Model\Map
 * @property $id
 * @property $user_id              The User's ID
 * @property $group_id             The Group's ID
 * @property $setting_id           The ID of the setting that is being affected
 * @property $permitted_setting_id The ID of the enumerated value being assigned to the setting?
 * @property $value                The value of the setting
 */
class UserGroupSettingMap extends Model {
    public static $default_properties;
    public static $primary_identifier;
    public static $secondary_identifier;
    public static $api_settable_properties;
    public static $table_name;
    public static $_mapped;
    public static $table_prefix;
    public static $main_string_key = '';
    public static $_map_type       = 'User|Group|Setting';
}