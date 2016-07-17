<?php
/**
 * User: sam
 * Date: 6/11/15
 * Time: 11:15 PM
 */

namespace Spwashi\Model;

use Sm\Core\IoC;
use Sm\Model\Model;
use Sm\Model\ModelMeta;
use Spwashi\Model\Map\SectionSectionMap;
use Spwashi\Model\Type\DimensionRole;
use Spwashi\Model\Type\RelationshipType;
use Spwashi\Model\Type\SectionRole;
use Spwashi\Model\Type\SectionType;

/**
 * Class Section
 *
 * @package Spwashi\Model
 * @property int    $id
 * @property int    $user_id            The ID of the user who created the section initially. null if the user no longer
 *           exists
 * @property string $title              The main title of the section
 * @property int    $has_title          Will we show the title on the screen? If no, set this to false
 * @property string $subtitle           A secondary, optional title of a section
 * @property string $content            The main content of the section
 * @property string $content_location   Either the directory or URL of the section's content
 * @property string $ent_id             A necessarily unique, random keystring for
 * @property int    $section_type       The main type of the section. Graph, image, video, etc
 * @property array  $_words             The synonyms of this section (if it is a definition)
 *
 *
 */
class Section extends Model {
    public static $api_settable_properties;
    public static $default_properties;
    public static $table_name;
    public static $table_prefix;
    protected     $_mirror_properties;
    protected     $_embed_properties;
    protected     $is_mirroring = false;
#
    public $_words = [];

    public function jsonSerialize() {
        $arr           = [];
        $arr['_words'] = $this->_words;
        if ($this->section_type == SectionType::TYPE_MIRROR) {
            $arr['mirror_properties']    = $this->_mirror_properties;
            $arr['embed_properties']     = $this->_embed_properties;
            $arr['_permissions']['edit'] = null;
        }
        $arr = array_merge($arr, parent::jsonSerialize());
        return $arr;
    }

    /**
     * Some Sections will be used only to mirror other entities. This says how those entities are going to be displayed
     *
     * @return $this
     */
    public function get_mirror_properties() {
        if ($this->section_type != SectionType::TYPE_MIRROR) return $this;
        $content_location = $this->content_location;
        if (!ModelMeta::is_ent_id($content_location)) return $this;
        $mirrored_resource        = ModelMeta::convert_to_class($content_location);
        $this->_mirror_properties = $mirrored_resource;
        $this->_embed_properties  = [];

        /**
         * Right now, we only Mirror pages.
         * If there is a mirrored entity and that entity is a page...
         */
        if ($mirrored_resource && get_class($mirrored_resource) == Page::class) {
            /** @var Page $page */
            $page    = $mirrored_resource;
            $content = $page->description;
            /**
             * The default way to embed a Page is to look for the OVERVIEW Dimension and find the "WHAT" Section in it.
             * The content of the WHAT will be the embedded content of the page
             */
            $page->findType('dimensions', ['dimension_role' => DimensionRole::OVERVIEW]);
            $page_dimension_relationships = $page->maps->dimensions;

            $pdm_rels = $page->maps->dimensions;
            if (!empty($pdm_rels->_meta->_list)) {
                $relationships = [];
                $dimension_id  = $pdm_rels->_meta->_list[0];
                /** @var Dimension $dimension */
                if ($pdm_rels->has($dimension_id) && $dimension = $pdm_rels->get_item_at_index($dimension_id)->model) {
                    $dimension->findSections(['section_role' => SectionRole::WHAT]);
                    $sections = $dimension->maps->sections;
                    if (!empty($sections->_meta->_list)) {
                        $section_id = $sections->_meta->_list[0];
                        if ($sections->has($section_id) && $section = $sections->get_item_at_index($section_id)->model) {
                            /** @var Section $section */
                            $content       = $section->content;
                            $relationships = clone($section->maps);
                        }
                    }
                }
                $this->_embed_properties = [
                    'title'         => $page->title,
                    'description'   => $page->description,
                    'content'       => $content,
                    'relationships' => $relationships,
                ];
            }

            $page->_relationships = [];
        }

        return $this;
    }
    /**
     * Populate an array of Words that belong to the Section. Useful for definitions.
     */
    public function listWords() {
        $id = intval($this->id);

        $qry = "SELECT words.title FROM words, section_word_map AS swm WHERE swm.section_id = {$id} AND words.id = swm.word_id ";
        /** @var \Sm\Database\Sql $sql */
        if (!(IoC::resolveSql($sql))) return null;
        $result = $sql->query($qry, 'num');
        if (!$result) return null;

        $arr = [];
        foreach ($result as $value) {
            $arr[] = $value[0];
        }
        $this->_words = $arr;
        return $arr;
    }

    public static function find($id, $attributes = null, $extras = []) {
        $found = parent::find($id, $attributes, $extras);
        /** @var Section $found */
        return $found;
    }
    /**
     * Find all usages of a Section (reciprocal relationships). At the moment, only finds Section-Section relationships
     *
     * @param array $settings
     *
     * @return array
     */
    public static function findUsages($settings = []) {
        /** @var Section $model */
        $model = isset($settings['model']) ? $settings['model'] : null;
        $id    = isset($settings['id']) ? $settings['id'] : ($model instanceof Model ? $model->id : false);

        $section_relationship_type = isset($settings['relationship_type']) ? $settings['relationship_type'] : false;

        if (!$id) return [];
        if (!isset($model)) $model = Section::find(intval($id));
        if (!($model instanceof Model)) return [];
        $settings_arr = ['is_secondary' => true];
        if ($section_relationship_type) {
            $settings_arr['relationship_type'] = $section_relationship_type;
        }
        $model->findSections($settings_arr);

        $ret_arr = [];
        foreach ($model->maps->get_items() as $key => $relationship_index) {
            foreach ($relationship_index->get_items(true) as $k => $rel_index_model) {
                if (isset($rel_index_model)) {
                    $ret_arr[] = $rel_index_model;
                }
            }
        }

        return $ret_arr;
    }
    /**
     * Find all sections that are directly related to this Section (not reciprocal atm)
     *
     * @param array $settings
     * @param array $skip An array of values that should be skipped. todo unimplemented
     *
     * @return static
     */
    public function findSections($settings = [], &$skip = []) {
        $walk = isset($settings['walk']) && is_callable($settings['walk'])
            ? $settings['walk']
            : null;

        $is_secondary = isset($settings['is_secondary']) && $settings['is_secondary'] ? true : false;

        $attributes = [];
        if (isset($settings['relationship_type'])) {
            $attributes['relationship_type'] = intval($settings['relationship_type']);
        }

        $self = $this->findType('sections', $attributes, [
            'is_secondary'           => $is_secondary,
            'holder_hook'            => [Section::class, 'section_find_holder_hook'],
            'reciprocal_holder_hook' => [Section::class, 'section_find_holder_hook'],
            'walk'                   => $walk,
            'order_by'               => 'section_section_map.position',
        ])->findType('sections', $attributes, [
            'is_secondary'           => !$is_secondary,
            'holder_hook'            => [Section::class, 'section_find_holder_hook'],
            'reciprocal_holder_hook' => [Section::class, 'section_find_holder_hook'],
            'walk'                   => $walk,
            'order_by'               => 'section_section_map.position',
        ]);

        /** @var Section $section */
//        foreach ($self->map_remix->sections->get_items(false) as $model) {
//            /** @var $section Relationship */
//            if (!$model || !($model instanceof Section)) continue;
//            $model->get_mirror_properties();
//        }

        return $self;
    }
    /**
     * Find the sections o
     *
     * @param array $settings
     * @param array $passed
     *
     * @return \Spwashi\Model\Section
     */
    public function findSectionsRecursive($settings = [], &$passed = []) {
        return $this->findSections([
                                       'walk' =>
                                           function (&$val) use ($settings, &$passed) {
                                               if (is_callable($settings['walk'])) {
                                                   $fn = $settings['walk'];
                                                   $fn($val);
                                               }
                                               /** @var Section $val */
                                               $_v = "{$this->id}| {$val->id}";
                                               if (!in_array($_v, $passed)) {
                                                   $passed[] = $_v;
                                                   $val->findSectionsRecursive($settings, $passed);
                                               }
                                           },
                                   ], $passed);
    }
    /**
     * A function to be run when Finding the sections.
     * Static because this function is passed the $this value in the "find" operation
     *
     * @param Section $self              This
     * @param array   $properties_of_map The properties of the SectionSectionMap
     * @param array   $object_properties The properties of the found object
     * @param bool    $is_secondary      Whether ot not the section relationship is reciprocal (what relates to what?)
     *
     * @return mixed
     */
    public static function &section_find_holder_hook($self, &$properties_of_map, &$object_properties, $is_secondary) {
        $relationship_type = intval($properties_of_map['relationship_type']);
        $index             = 'sections';

        $prefix = $is_secondary ? 'reciprocal_' : '';
        switch ($relationship_type) {
            case RelationshipType::TYPE_CHILD:
                $index = 'children';
                break;
            case RelationshipType::TYPE_COMPOSITION:
                $index = 'composition';
                break;
            case RelationshipType::TYPE_LOW_LEVEL:
                $index = 'micros';
                break;
            case RelationshipType::TYPE_REPHRASE_CONTENT:
            case RelationshipType::TYPE_REPHRASE_TYPE:
                $index = 'pivots';
                break;
            default :
                break;
        }
        $ret = $self->maps->getRelationshipIndex($prefix . $index, 'sections');
        $no  = $self->maps->{$prefix . $index};
        return $ret;
    }

    /**
     * Add a Section-Section relationship
     *
     * @param                         $section_or_id
     * @param SectionSectionMap|array $details The map details that are being added
     *
     * @return bool|int
     */
    public function addSection($section_or_id, $details) {
        if (ModelMeta::is_ent_id($section_or_id)) {
            try {
                $section_or_id = Section::find(['ent_id' => $section_or_id], ['id']);
            } catch (\Exception $e) {
            }
        }
        if ($section_or_id instanceof Section) {
            $id = $section_or_id->id;
            if (!$id) return false;
        } else {
            $id = (int)$section_or_id;
        }
        $this_id = $this->id;

        if (!$details instanceof SectionSectionMap) {
            $map                             = new SectionSectionMap();
            $details['secondary_section_id'] = $id;
            $details['primary_section_id']   = $this_id;

            $map->set($details);
            $map->relationship_type = isset($details['relationship_type']) ? $details['relationship_type'] : RelationshipType::TYPE_CHILD;
            $map->position          = isset($details['position']) ? $details['position'] : 1;
        } else {
            $map                    = $details;
            $map->relationship_type = $map->relationship_type ?: RelationshipType::TYPE_CHILD;
            $map->position          = isset($map->position) ? $map->position : 1;
        }
        $map->primary_section_id   = $this->id;
        $map->secondary_section_id = $id;
        /** @var \Sm\Database\Sql $sql */
        if (!(IoC::resolveSql($sql))) return false;
        #todo fix position update
        if ($id = $map->create()) {
            return $id;
        }
        return false;
    }
    /**
     * Remove a Section-Section relationship
     *
     * @param $section_or_id
     *
     * @return bool
     */
    public function removeSection($section_or_id) {
        if (ModelMeta::is_ent_id($section_or_id)) {
            try {
                $section_or_id = Section::find(['ent_id' => $section_or_id], ['id']);
            } catch (\Exception $e) {
            }
        }
        if ($section_or_id instanceof Section) {
            $id = $section_or_id->id;
            if (!$id) return false;
        } else {
            $id = (int)$section_or_id;
        }
        $this_id = $this->id;
        /** @var \Sm\Database\Sql $sql */
        if (!IoC::resolveSql($sql)) return false;

        $where = "secondary_section_id = {$id} AND primary_section_id = {$this_id}";

        $result = $sql->delete()->table(SectionSectionMap::$table_name)->where($where)->run()->output('row_count');
        return !!$result;
    }

}