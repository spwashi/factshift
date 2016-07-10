<?php
/**
 * User: Sam Washington
 * Date: 3/22/2015
 * Time: 8:30 PM
 */

namespace Spwashi\Model\Map;

use Sm\Model\Model;

/**
 * Class GroupGroupMap
 * @package Sm\Model\Map
 * @property $id
 * @property $primary_group_id            ID of the group who initiated the relationship
 * @property $secondary_group_id          ID of the group in the sub-dominant or receiving position
 * @property $primary_relationship_type   The type of relationship the groups are in
 * @property $primary_relationship_status The status of the group's relationship
 */
class GroupGroupMap extends Model {
    public static $default_properties;
    public static $primary_identifier;
    public static $secondary_identifier;
    public static $api_settable_properties;
    public static $table_name;
    public static $_mapped;
    public static $table_prefix;
    public static $main_string_key = '';
}