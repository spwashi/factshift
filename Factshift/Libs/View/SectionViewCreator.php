<?php
/**
 * User: sam
 * Date: 7/15/15
 * Time: 9:26 AM
 */

namespace Factshift\Libs\View;

use Sm\Development\Log;
use Sm\Entity\EntityIterator;
use Sm\Identifier\Identifiable;
use Factshift\Entity\Section;

class SectionViewCreator {
    public static function build_section(Section $section, $is_edit = null, &$arr = null) {
        $view           = $section->createView();
        $children_array = $composition_array = [ ];
        if (!is_array($arr)) $arr = [ ];
        $tree_child_holder = null;
        if ($section->has_title) {
            $arr[ $section->title ]  = $arr[ $section->title ]  ?? [
                    'id'          => 'Section-' . intval($section->id),
                    'children'    => [ 'parent' => $section->title ],
                    'composition' => [ ],
                ];
            $tree_child_holder       = &$arr[ $section->title ]['children'];
            $tree_composition_holder = &$arr[ $section->title ]['composition'];
        }
        
        foreach ($section->relationships->children->getItems('children') as $id => $child) {
            if (!$child) continue;
            $children_array[] = static::build_section($child, $is_edit, $tree_child_holder);
        }
        
        foreach ($section->relationships->composition->getItems('composition') as $id => $composition) {
            if (!$composition) continue;
            $composition_array[] = '' . static::build_section($composition, $is_edit, $tree_composition_holder);
        }
        
        
        $child_string       = join("\n", array_values($children_array));
        $composition_string = join("\n", array_values($composition_array));
        $view->addFeature('children', $child_string);
        $view->addFeature('composition', $composition_string);
        return $view->getContent();
    }
    public static function generate_sections($section_array, $is_edit = false) {
        $complete_string        = '';
        $built_array            = [ ];
        $complete_section_array = [ ];
        $Sections               = new EntityIterator();
        foreach ($section_array as $key => $section) {
            if (!($section instanceof Section)) {
                Log::init($section)->log_it();
                continue;
            }
            /**
             * @param Section $self
             * @param Section $section
             */
            $find_fn = function ($self, $section, $m, $rel_index) use (&$find_fn, &$complete_section_array, $Sections) {
                $identifier = $section->getUniqueIdentifier(Identifiable::ENT_ID);
                if (!$identifier) $identifier = $section->getUniqueIdentifier(Identifiable::TYPED_IDENTIFIER);
                if (!$identifier) $identifier = $section->getUniqueIdentifier();
                $merge = $self->getUniqueIdentifier() . '|' . $identifier . '|' . $rel_index;
                if (isset($complete_section_array[ $merge ]) || ($section === $self && $rel_index != 'self')) {
                    return;
                }
                $section->findRelationshipIndex('sections', $find_fn);
                $complete_section_array[ $merge ] = $section;
                $Sections->push($section);
            };
            $find_fn($section, $section, null, 'self');
            
            $complete_string .= static::build_section($section, $is_edit, $built_array);
        }
        return [
            'string'   => $complete_string,
            'tree'     => static::create_tree_from_array($built_array),
            'sections' => $Sections,
        ];
    }
    
    public static function create_tree_from_array($array, $class = null) {
        if (is_array($array)) {
            $out = "<ul class='section-tree'>";
            foreach ($array as $key => $elem) {
                if (is_array($elem)) {
                    $id     = isset($elem['id']) ? $elem['id'] : null;
                    $ent_id = isset($elem['ent_id']) ? $elem['ent_id'] : null;
                    
                    $children = isset($elem['children']) ? $elem['children'] : null;
                    
                    $out .= "<li class='navigation-entry'><a href='#{$id}' data-ent_id='{$ent_id}'>$key</a>" . static::create_tree_from_array($children) . "</li>";
                }
            }
            $out = $out . "</ul>";
            return $out;
        }
        return '';
    }
    
}