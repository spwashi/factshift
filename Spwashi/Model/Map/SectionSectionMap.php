<?php
/**
 * User: sam
 * Date: 6/11/15
 * Time: 11:15 PM
 */

namespace Spwashi\Model\Map;

use Sm\Model\Map;

/**
 * Class SectionSectionMap
 * @package Sm\Model\Map
 * @property int $id
 * @property int $primary_section_id   The ID of the section to which the other section relates: X. X's [Relationship] is Y
 * @property int $secondary_section_id The ID of the section relating to the other section: Y. Y is X's [Relationship]
 * @property int $position             The order of this section in relation to its parent
 * @property int $relationship_type    The way Y relates to X
 * @property int $relationship_status  The status of the relationship
 */
class SectionSectionMap extends Map {
    public static $default_properties;
    public static $primary_identifier;
    public static $secondary_identifier;
    public static $api_settable_properties;
    public static $table_name;
    public static $_mapped;
    public static $table_prefix;
    public static $main_string_key = '';
    public static $_map_type       = 'Section|Section';

    public function unique_update_id($primary_identifier, $secondary_identifier, $arr = false) {
        if (isset($this->_properties['relationship_type'])) {
            $relationship_type = $this->_properties['relationship_type'];
            return $arr ? ['relationship_type' => $relationship_type] : "AND table2.relationship_type = {$relationship_type}";
        }
        return false;
    }
}