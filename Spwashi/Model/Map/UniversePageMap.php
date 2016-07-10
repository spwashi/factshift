<?php
/**
 * User: Sam Washington
 * Date: 12/3/15
 * Time: 12:22 PM
 */

namespace Spwashi\Model\Map;

use Sm\Model\Map;

/**
 * Class UniversePageMap
 * @package Sm\Model\Map
 * @property int    $page_id                   ID of the page
 * @property int    $parent_page_id            ID of the page to which this page belongs -- Deprecated
 * @property int    $universe_id               ID of the universe
 * @property string $alias                     The name of the page w/r to the universe (useful for url query string tab
 *           selecting)
 * @property string $description               Description of why the page is on the universe
 * @property int    $position                  Position of the page in relation to others, the index
 */
class UniversePageMap extends Map implements \JsonSerializable {
    public static $default_properties;
    public static $primary_identifier;
    public static $secondary_identifier;
    public static $api_settable_properties;
    public static $table_name;
    public static $_mapped;
    public static $table_prefix;
    public static $main_string_key = '';
    public static $_map_type       = 'Universe|Page';
}