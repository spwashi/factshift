<?php
/**
 * User: Sam Washington
 * Date: 12/3/15
 * Time: 12:22 PM
 */

namespace Spwashi\Model\Map;

use Sm\Model\Map;

/**
 * Class ConceptSectionMap
 * @package Sm\Model\Map
 * @property int    $concept_id              ID of the concept
 * @property int    $parent_concept_id       ID of the concept to which this concept belongs -- Deprecated
 * @property int    $section_id              ID of the section
 * @property string $alias                   The name of the concept w/r to the section (useful for url query string tab
 *           selecting)
 * @property string $description             Description of why the concept is on the section
 * @property int    $position                Position of the concept in relation to others, the index
 */
class ConceptSectionMap extends Map implements \JsonSerializable {
    public static $default_properties;
    public static $primary_identifier;
    public static $secondary_identifier;
    public static $api_settable_properties;
    public static $table_name;
    public static $_mapped;
    public static $table_prefix;
    public static $main_string_key = '';
    public static $_map_type       = 'Concept|Section';

}