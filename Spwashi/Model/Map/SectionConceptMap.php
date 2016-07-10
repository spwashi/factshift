<?php
/**
 * User: Sam Washington
 * Date: 12/3/15
 * Time: 12:19 PM
 */

namespace Spwashi\Model\Map;

use Sm\Model\Map;

/**
 * Class SectionConceptMap
 * @package Sm\Model\Map
 * @property int    $concept_id    The ID of the concept
 * @property int    $section_id    The concept to which the ID belongs
 * @property int    $section_type  The type of section w/r to the concept. null means to use the original section
 *           type
 * @property int    $position      The order in which the section is to appear in the concept
 * @property string $description   A description of the section w/r to the concept. Could be useful for tooltips
 */
class SectionConceptMap extends Map implements \JsonSerializable {
    public static $default_properties;
    public static $primary_identifier;
    public static $secondary_identifier;
    public static $api_settable_properties;
    public static $table_name;
    public static $_mapped;
    public static $table_prefix;
    public static $main_string_key = '';
    public static $_map_type       = 'Section|Concept';
}