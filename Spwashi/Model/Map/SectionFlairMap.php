<?php
/**
 * User: sam
 * Date: 6/11/15
 * Time: 11:15 PM
 */

namespace Spwashi\Model\Map;

use Sm\Model\Model;

/**
 * Class SectionFlairMap
 * @package Sm\Model\Map
 * @property $id         the ID of the row
 * @property $flair_id   The ID of the flair
 * @property $section_id The ID of the section
 */
class SectionFlairMap extends Model {
    public static $default_properties;
    public static $primary_identifier;
    public static $secondary_identifier;
    public static $api_settable_properties;
    public static $table_name;
    public static $_mapped;
    public static $table_prefix;
    public static $main_string_key = '';
    public static $_map_type       = 'Section|Flair';
}