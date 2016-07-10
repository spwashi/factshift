<?php
/**
 * User: sam
 * Date: 7/15/15
 * Time: 9:26 AM
 */

namespace Spwashi\Libs\View;

use Sm\Core\App;
use Sm\Security\XSS;
use Sm\View\View;
use Spwashi\Model\Section;

class SectionFactory {
    /**
     * @param \Spwashi\Model\Section $section
     * @param null                   $is_edit
     *
     * @param null                   $arr
     *
     * @return View
     */
    public static function build(Section $section, $is_edit = null, &$arr = null) {
        $path = App::_()->template_path;
        $path .= 'section/standard.php';
        $content = $section->content ? $section->content : ($section->has_title && $section->title ? ' ' : ' -- ');
        $view    = View::create($path, [
            'model_section'      => $section,
            'is_edit'            => $is_edit,
            //Section variable sanitization for output
            's_title'            => XSS::escape($section->title ?: '---'),
            's_has_title'        => intval($section->has_title),
            's_subtitle'         => XSS::escape($section->subtitle ?: '---'),
            's_ent_id'           => $section->ent_id,
            's_type'             => $section->section_type,
            's_id'               => intval($section->id),
            's_content'          => XSS::escape($content),
            's_section'          => XSS::escape(json_encode($section, JSON_HEX_APOS)),
            's_content_location' => XSS::escape($section->content_location),
        ], false);

        $children_array = $composition_array = [];
        if (!is_array($arr)) {
            $arr = [];
        }

        $tree_child_holder = null;
        if ($section->has_title) {
            $arr[$section->title] = [
                'id'       => 'Section-' . intval($section->id),
                'children' => [],
            ];
            $tree_child_holder    = &$arr[$section->title]['children'];
        }
        $maps = $section->map_remix;

        foreach ($maps->children->get_items(true) as $id => $child_model) {
            if (strpos($id, '_') === 0) continue;
            /** @var $child_model Section */
            if (!$child_model) continue;
            $b                = '' . static::build($child_model, $is_edit, $tree_child_holder);
            $children_array[] = $b;
        }

        foreach ($maps->composition->get_items() as $id => $_holder) {
            if (strpos($id, '_') === 0) continue;
            /** @var $model Section */
            $model = $_holder->model;
            if (!$_holder->model) continue;
            $b = static::build($model, $is_edit, $tree_child_holder);

            if (isset($_holder->position)) $composition_array[$_holder->position] = $b;
            else $composition_array = $b;
        }

        if ($section->has_title && empty($tree_child_holder)) {
            $tree_child_holder = null;
        }
        $child_string       = join("\n", array_values($children_array));
        $composition_string = join("\n", array_values($composition_array));
        $view->addFeature('children', $child_string);
        $view->addFeature('composition', $composition_string);
        return $view->getContent();
    }
    /**
     * @param                     $section_array
     * @param null                $is_edit
     * @param bool|callable|false $walk
     * @return array
     */
    public static function generate_sections($section_array, $is_edit = null, $walk = false) {
        $string = '';
        /**
         * @param Section[] $section_array
         *
         * @var Section     $section
         */
        $b       = [];
        $sec_arr = [];
        foreach ($section_array as $key => $alleged_section) {
            if (!is_numeric($key)) continue;
            if (is_array($alleged_section) && isset($alleged_section['model']))
                $section =& $alleged_section['model'];
            else
                $section = $alleged_section;

            $sec_arr[] = $section;
            if (is_callable($walk)) $walk($section);

            $section->findSectionsRecursive(['walk' => function ($s) use (&$sec_arr, $walk) {
                if (is_callable($walk)) $walk($s);
                $sec_arr[$s->id] = $s;
            }]);
            $res = SectionFactory::build($section, $is_edit, $b);
            $string .= $res;
        }
        return [
            'text'     => $string,
            'tree'     => static::create_tree_from_array($b),
            'sections' => $sec_arr
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