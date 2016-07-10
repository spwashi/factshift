<?php
/**
 * User: sam
 * Date: 6/11/15
 * Time: 11:15 PM
 */

namespace Spwashi\Model\Map;

use Sm\Model\Model;

/**
 * Class TrackCategoryCategoryMap
 * @package Sm\Model\Map
 * @property $id
 * @property $relationship_type
 * @property $relationship_status
 * @property $secondary_category_id
 * @property $primary_category_id
 * @property $track_id
 */
class TrackCategoryCategoryMap extends Model {
    public static $default_properties;
    public static $primary_identifier;
    public static $secondary_identifier;
    public static $api_settable_properties;
    public static $table_name;
    public static $_mapped;
    public static $table_prefix;
    public static $main_string_key = '';
    public static $_map_type       = 'Track|Category|Category';
}