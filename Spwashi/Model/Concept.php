<?php
namespace Spwashi\Model;

use Sm\Model\Model;
use Sm\Model\Relationship;
use Spwashi\Model\Map\SectionConceptMap;
use Spwashi\Model\Map\SectionWordMap;
use Spwashi\Model\Type\SectionType;

/**
 * User: Sam Washington
 * Date: 12/3/15
 * Time: 12:16 PM
 */

/**
 * Class Concept
 *
 * @package Spwashi\Model
 * @property $id
 * @property $user_id
 * @property $title
 * @property $concept_type
 * @property $description
 * @property $ent_id
 * @property $alias
 */
class Concept extends Model implements \JsonSerializable {
#
    public static $default_properties = [];
    public static $table_name         = 'concepts';
    public static $main_string_key    = 'alias';
    public static $table_prefix       = 'concept';
#

    /**
     * Find all of the Sections related to one Concept initially
     *
     * @param array $settings
     *
     * @return array
     */
    public function findSections($settings = []) {
        /** @var Section[] $current_sections */
        $current_sections      = SectionConceptMap::map(['concept_id' => $this->id], new Section, [
            'holder_index' => '_concepts',
            'holder_assoc' => 'concept_id',
            'order_by'     => 'section_concept_map.position',
            'walk'         => isset($settings['walk']) ? $settings['walk'] : null,
        ]);
        $current_section_array = [];
        foreach ($current_sections as &$section) {
            $_loop_map      = $section->map_remix->concepts->get_item_at_index($this->id)->_map;
            $_loop_position = $_loop_map->position;
            if ($section->section_type == SectionType::TYPE_DEFINITION) {
                $section->_words = SectionWordMap::list_words($section);
            }
            $section->map_remix->concepts->get_item_at_index($this->id)->model = null;
            $relationship                                                      = new Relationship($_loop_map, $section);
            $relationship->position                                            = $_loop_position;
            $this->map_remix->sections->push($relationship, $section->id);
            $current_section_array[$_loop_position] = $section;
        }
        $this->map_remix->sections->_meta->_key      = 'section_id';
        $this->map_remix->sections->_meta->_map_type = SectionConceptMap::$_map_type;
        return $current_section_array;
    }
}