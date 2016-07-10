<?php
/**
 * User: sam
 * Date: 6/10/15
 * Time: 1:23 AM
 */

namespace Spwashi\Model;

use Sm\Model\Model;

/**
 * Class PermittedSettingValue
 * @package Spwashi\Model
 * @property $id
 * @property $setting_id  The setting for which these values enumerate
 * @property $description A description of the setting
 * @property $value       The permitted value of the setting
 */
class PermittedSettingValue extends Model {
    public static $default_properties; public static $api_settable_properties;
    public static $table_name;
    public static $table_prefix;
    public static $main_string_key = '';
}