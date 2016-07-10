<?php
namespace Spwashi\Model;

use Sm\Core\IoC;
use Sm\Model\Model;
use Sm\Model\Relationship;
use Spwashi\Model\Map\SectionWordMap;
use Spwashi\Model\Map\UniverseSectionMap;
use Spwashi\Model\Type\SectionType;

/**
 * User: Sam Washington
 * Date: 12/3/15
 * Time: 12:16 PM
 */

/**
 * Class Universe
 * @package Spwashi\Model
 * @property $directory     The location where the information about the collection resides
 * @property $alias         A unique, humanly-readable alias to describe the universe
 * @property $title         The title of the universe
 * @property $subtitle      The subtitle of the universe
 * @property $description   The description of the universe
 * @property $ent_id        A unique, random string useful for identification purposes
 * @property $user_id       The ID of the user who created the universe
 */
class Universe extends Model implements \JsonSerializable {
    public static $default_properties;
    public static $api_settable_properties;
    public static $table_name;
    public static $table_prefix;
    public static $main_string_key = 'ent_id';
#

    /**
     * Find all of the Sections related to one Universe initially
     * @param array $settings
     * @return array
     */
    public function findSections($settings = []) {
        /** @var Section[] $current_sections */
        $current_sections      = UniverseSectionMap::map(['universe_id' => $this->id], new Section, [
            'holder_index' => 'universes',
            'holder_assoc' => 'universe_id',
            'order_by'     => 'universe_section_map.position',
            'walk'         => isset($settings['walk']) ? $settings['walk'] : null
        ]);
        $current_section_array = [];
        foreach ($current_sections as &$section) {
            $_loop_map      = $section->map_remix->universes->get_item_at_index($this->id)->_map;
            $_loop_position = $_loop_map->position;
            if ($section->section_type == SectionType::TYPE_DEFINITION) {
                $section->_words = SectionWordMap::list_words($section);
            }
            $section->map_remix->universes->get_item_at_index($this->id)->model = null;
            $relationship                                                       = new Relationship($_loop_map, $section);
            $relationship->position                                             = $_loop_position;
            $this->map_remix->sections->push($relationship, $section->id);
            $current_section_array[$_loop_position] = $section;
        }
        $this->map_remix->sections->_meta->_key      = 'section_id';
        $this->map_remix->sections->_meta->_map_type = UniverseSectionMap::$_map_type;
        return $current_section_array;
    }

}