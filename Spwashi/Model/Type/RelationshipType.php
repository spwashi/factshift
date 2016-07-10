<?php
/**
 * User: Sam Washington
 * Date: 4/4/2015
 * Time: 5:06 PM
 */

namespace Spwashi\Model\Type;

use Sm\Model\Model;

/**
 * Class RelationshipType
 *
 * @package Spwashi\Model\Type
 * @property $id
 * @property $name
 * @property $description
 */
class RelationshipType extends Model {
    public static    $default_properties = [ ];
    public static    $table_name         = 'relationship_types';
    public static    $main_string_key    = 'name';
    protected static $find_all_able      = false;

    /** Y is X's child */
    const TYPE_CHILD = 1;
    /** Y is X's composition */
    const TYPE_COMPOSITION = 2;
    /** The way that Y relates to X is that Y is more general */
    const TYPE_HIGH_LEVEL = 3;
    /** The way Y relates to X is that Y is more specific */
    const TYPE_LOW_LEVEL = 4;
    /** When the purpose of the relationship is to change the content type of another entity */
    const TYPE_REPHRASE_CONTENT = 5;
    /** When the purpose of the relationship is to rephrase another entity, but only as it pertains to how the entity is presented */
    const TYPE_REPHRASE_TYPE = 6;
    const TYPE_TOPICAL       = 7;

    public static function get_name_from_type($type, $is_plural = true) {
        $type_name = null;
        switch ($type) {
            case static::TYPE_CHILD:
            case 'children':
            case 'child':
                return $is_plural ? 'children' : 'child';
                break;
            case static::TYPE_REPHRASE_CONTENT:
            case static::TYPE_REPHRASE_TYPE:
            case 'pivots':
            case 'pivot':
                return $is_plural ? 'pivots' : 'pivot';
                break;
            case 'composition':
            case static::TYPE_COMPOSITION:
                return $is_plural ? 'composition' : 'composition';
                break;
            case 'micros':
            case 'micro':
            case static::TYPE_LOW_LEVEL:
                return $is_plural ? 'micros' : 'micro';
                break;
        }
        return null;
    }

    public static function get_type_from_name($type) {
        switch ($type) {
            case static::TYPE_CHILD:
            case 'children':
            case 'child':
                return static::TYPE_CHILD;
                break;
            case static::TYPE_REPHRASE_CONTENT:
            case static::TYPE_REPHRASE_TYPE:
            case 'pivots':
            case 'pivot':
                return static::TYPE_REPHRASE_CONTENT;
                break;
            case 'composition':
            case static::TYPE_COMPOSITION:
                return static::TYPE_COMPOSITION;
                break;
            case 'micros':
            case 'micro':
            case static::TYPE_LOW_LEVEL:
                return static::TYPE_LOW_LEVEL;
                break;
        }
        return null;
    }
}