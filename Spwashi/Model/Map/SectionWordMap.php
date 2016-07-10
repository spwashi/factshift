<?php
/**
 * User: Sam Washington
 * Date: 11/10/15
 * Time: 1:07 AM
 */

namespace Spwashi\Model\Map;

use Sm\Core\IoC;
use Sm\Model\Map;
use Spwashi\Model\Section;

/**
 * Class SectionWordMap
 * @package Sm\Model\Map
 * @property $id
 * @property $section_id The ID of the section
 * @property $word_id    The ID of the word
 */
class SectionWordMap extends Map {
    public static $default_properties;
    public static $primary_identifier;
    public static $secondary_identifier;
    public static $api_settable_properties;
    public static $table_name;
    public static $_mapped;
    public static $table_prefix;
    public static $main_string_key = '';

    public static function list_words($section) {
        $id  = $section instanceof Section ? $section->id : $section;
        $qry = "SELECT words.title FROM words, section_word_map AS swm WHERE swm.section_id = {$id} AND words.id = swm.word_id ";
        /** @var \Sm\Database\Sql $sql */
        if (!(IoC::resolveSql($sql))) return [];
        $result = $sql->query($qry, 'num');
        if (!$result) return [];
        $arr = [];
        foreach ($result as $value) {
            $arr[] = $value[0];
        }

        return $arr;
    }
}