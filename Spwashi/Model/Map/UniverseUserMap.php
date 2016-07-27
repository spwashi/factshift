<?php
/**
 * User: Sam Washington
 * Date: 12/3/15
 * Time: 12:22 PM
 */

namespace Spwashi\Model\Map;

use Sm\Model\Map;

/**
 * Class UniverseUserMap
 * @package Sm\Model\Map
 * @property int    $section_id                   ID of the section
 * @property int    $parent_section_id            ID of the section to which this section belongs -- Deprecated
 * @property int    $universe_id                  ID of the universe
 * @property string $alias                        The name of the section w/r to the universe (useful for url query string tab
 *           selecting)
 * @property string $description                  Description of why the section is on the universe
 * @property int    $position                     Position of the section in relation to others, the index
 */
class UniverseUserMap extends Map implements \JsonSerializable {
	public static $default_properties;
	public static $primary_identifier;
	public static $secondary_identifier;
	public static $api_settable_properties;
	public static $table_name;
	public static $_mapped;
	public static $table_prefix;
	public static $main_string_key = '';
	public static $_map_type       = 'Universe|User';
}