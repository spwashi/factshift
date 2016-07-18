<?php
/**
 * User: sam
 * Date: 6/11/15
 * Time: 11:15 PM
 */

namespace Spwashi\Model;

use Sm\Core\IoC;
use Sm\Model\Model;
use Spwashi\Model\Map\CollectionSectionMap;

/**
 * Class Collection
 *
 * @package Spwashi\Model
 * @property int               id
 * @property int               $user_id         The ID of the user who created the collection
 * @property int               $main_parent_id  If the collection is a sub collection, this is the id of its parent
 * @property string            $title           The name of the collection
 * @property int               $collection_type The type of collection we are dealing with
 * @property string            $description     A description of the collection
 * @property string            $ent_id            A unique, random key for identifying a collection
 * @property \Sm\Model\Relator map
 */
class Collection extends Model implements \JsonSerializable {
    public static $default_properties; public static $api_settable_properties;
    public static $table_name;
    public static $table_prefix;
    public static $main_string_key = 'ent_id';
#

    /**
     * Find all of the Sections related to one Collection initially
     * @param array $settings
     * @return Collection
     */
    public function findSections($settings = []) {
        $walk = isset($settings['walk']) && is_callable($settings['walk'])
            ? $settings['walk']
            : function (&$section) {
                /** @var Section $section */
                $section->listWords();
                $section->get_mirror_properties();
            };

        $is_reciprocal = isset($settings['is_reciprocal']) && $settings['is_reciprocal'] ? true : false;
        $to_find      = [];
        if (isset($settings['section_role'])) {
            $to_find['section_role'] = $settings['section_role'];
        }
        return $this->findType('sections', $to_find, [
            'is_reciprocal' => $is_reciprocal,
            'walk'         => $walk
        ]);
    }
    public function addSection($section, $details = []) {
        if ($section instanceof Section) {
            $id = $section->id;
            if (!$id) return false;
        } else {
            $id = (int)$section;
        }
        $position           = isset($details['position']) ? $details['position'] : 1;
        $map                = CollectionSectionMap::init();
        $map->section_id    = $id;
        $map->collection_id = $this->id;
        $map->set($details);

        $collection_id = (int)$this->id;
        /** @var \Sm\Database\Sql $sql */
        if (!IoC::resolveSql($sql)) {
            return false;
        }
        $result = $sql->query("UPDATE collection_section_map SET position = position + 1 WHERE collection_id = {$collection_id} AND position >= {$position} ORDER BY position DESC ", 'row_count');
        if ($id = $map->create()) {
            return $id;
        }
        return false;
    }
}