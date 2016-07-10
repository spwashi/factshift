<?php
/**
 * User: sam
 * Date: 6/11/15
 * Time: 11:15 PM
 */

namespace Spwashi\Model\Map;

use Sm\Model\Map;

/**
 * Class PageDimensionMap
 * @package Sm\Model\Map
 * @property int    $dimension_id         ID of the dimension
 * @property int    $page_id              ID of the page
 * @property string $description          Description of why the dimension is on the page
 * @property int    $position             Position of the dimension in relation to others, the index
 */
class PageDimensionMap extends Map {
    public static $default_properties;
    public static $primary_identifier;
    public static $secondary_identifier;
    public static $api_settable_properties;
    public static $table_name;
    public static $_mapped;
    public static $table_prefix;
    public static $main_string_key = '';
    public static $_map_type       = 'Page|Dimension';
}