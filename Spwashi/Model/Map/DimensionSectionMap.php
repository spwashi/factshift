<?php
/**
 * User: sam
 * Date: 6/11/15
 * Time: 11:15 PM
 */

namespace Spwashi\Model\Map;

use Sm\Model\Map;

/**
 * Class SectionDimensionMap
 * @package Sm\Model\Map
 * @property int    $dimension_id  The ID of the dimension
 * @property int    $section_id    The dimension to which the ID belongs
 * @property int    $section_type  The type of section w/r to the dimension. null means to use the original section
 *           type
 * @property int    $position      The order in which the section is to appear in the dimension
 * @property string $description   A description of the section w/r to the dimension. Could be useful for tooltips
 * @property int    $section_role  An identifier saying what a section's purpose is in a dimension
 */
class DimensionSectionMap extends Map implements \JsonSerializable {
    public static $default_properties;
    public static $primary_identifier;
    public static $secondary_identifier;
    public static $api_settable_properties;
    public static $table_name;
    public static $_mapped;
    public static $table_prefix;
    public static $main_string_key = '';
    public static $_map_type       = 'Dimension|Section';
}