<?php
/**
 * User: sam
 * Date: 6/11/15
 * Time: 11:15 PM
 */

namespace Spwashi\Model;

use Sm\Core\Inflector;
use Sm\Core\Util;
use Sm\Model\Model;
use Spwashi\Model\Map\PageDimensionMap;
use Spwashi\Model\Type\DimensionRole;

/**
 * Class Page
 *
 * @package Spwashi\Model
 * @property int    $id                   Unique row identifier
 * @property int    $user_id              The ID of the user who created the page
 * @property string $title                The title of the page
 * @property string $subtitle             The subtitle of the page
 * @property string $alias                A unique, human readable alias for the page. Similar to a slug
 * @property string $description          The description of the page, useful for tooltips
 * @property int    $namespace_type       The namespace of the page; kinda like a page type
 * @property string $directory            The location of all of the page-specific content
 * @property string $redirect_url         The URL to redirect to if this page is just a dummy or is no longer supported
 * @property string $ent_id               A unique string used for identification purposes
 * @property string $context              A temporary stand-in for the Universe
 * @property int    $main_collection_id   The ID of the collection of sections that the page will initially display once loaded
 */
class Page extends Model implements \JsonSerializable {
    public static $default_properties = [];
    public static $table_name         = 'pages';
    public static $main_string_key    = 'alias';
    public static $table_prefix       = 'page';

    #TD:category: Generate an alias also based on the optional category
    public static function generate_alias($title, $subtitle = null) {
        if (is_numeric($title))
            $title = 'p ' . $title;
        $title    = strtolower($title);
        $subtitle = $subtitle ? strtolower($subtitle) : null;

        if ($subtitle) {
            $title = $title . ' ' . $subtitle;
        }
        $alias  = Inflector::slug($title, '-');
        $search = Page::findSql(['alias' => $alias], false, ['id']);
        if (!!$search && !empty($search)) {
            $tail = Util::generateRandomString('3', 'abcdefghijklmnopqrstuvwxyz123456789');
            return static::generate_alias($alias, $tail);
        } else {
            return $alias;
        }
    }

    public function createStandardDimensions() {
        $collection_array = [
            DimensionRole::OVERVIEW        => Dimension::init(['title' => 'Overview', 'description' => 'General overview of the topic'], true),
            DimensionRole::HISTORY_CULTURE => Dimension::init(['title' => 'History', 'description' => 'A view into the history and cultural impact of this topic'], true),
            DimensionRole::METHODOLOGY     => Dimension::init(['title' => 'Methodology', 'description' => 'The ideas that went into conceiving the topic'], true),
            DimensionRole::CONTEXT         => Dimension::init(['title' => 'Context', 'description' => 'How the topic relates to others'], true),
            DimensionRole::DISCUSSION      => Dimension::init(['title' => 'Discussion', 'description' => 'Discussion about the ideas relating to the concept'], true),
            DimensionRole::META            => Dimension::init(['title' => 'Meta', 'description' => 'A holistic view on the accuracy/writing style of this article'], true),
        ];
        $at_least_1       = false;
        foreach ($collection_array as $role_id => $dimension) {
            /** @var Dimension $dimension */
            $dimension->ent_id = Dimension::generate_ent_id();
            $dimension->create();
            $pdm                 = new PageDimensionMap();
            $pdm->page_id        = $this->id;
            $pdm->dimension_id   = $dimension->id;
            $pdm->dimension_role = $role_id;

            $success = $pdm->create();
            if (!$at_least_1) $at_least_1 = $success;
        }
        return $at_least_1;
    }
}