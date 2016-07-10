<?php
/**
 * User: sam
 * Date: 6/11/15
 * Time: 11:15 PM
 */

namespace Spwashi\Model;

use Sm\Core\IoC;
use Sm\Model\Model;
use Spwashi\Model\Map\DimensionSectionMap;

/**
 * Class Dimension
 *
 * @package Spwashi\Model
 * @property int               id
 * @property int               $user_id           The ID of the user who created the dimension
 * @property int               $main_parent_id    If the dimension is a sub dimension, this is the id of its parent
 * @property string            $title             The name of the dimension
 * @property int               $dimension_type    The type of dimension we are dealing with
 * @property string            $description       A description of the dimension
 * @property string            $ent_id            A unique, random key for identifying a dimension
 * @property \Sm\Model\Relator map
 */
class Dimension extends Model implements \JsonSerializable {
    public static $default_properties;
    public static $api_settable_properties;
    public static $table_name;
    public static $table_prefix;
    public static $main_string_key = 'ent_id';
#

    /**
     * Find all of the Sections related to one Dimension initially
     *
     * @param array $settings
     *
     * @return Dimension
     */
    public function findSections($settings = [ ]) {
        $walk = isset($settings['walk']) && is_callable($settings['walk'])
            ? $settings['walk']
            : function (&$section) {
                /** @var Section $section */
                $section->listWords();
                $section->get_mirror_properties();
            };

        $is_secondary = isset($settings['is_secondary']) && $settings['is_secondary'] ? true : false;
        $to_find      = [ ];
        if (isset($settings['section_role'])) {
            $to_find['section_role'] = $settings['section_role'];
        }
        return $this->findType('sections', $to_find, [
            'is_secondary' => $is_secondary,
            'walk'         => $walk,
        ]);
    }
}