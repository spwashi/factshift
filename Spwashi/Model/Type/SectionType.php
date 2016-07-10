<?php
/**
 * User: sam
 * Date: 6/11/15
 * Time: 11:15 PM
 */

namespace Spwashi\Model\Type;

use Sm\Model\Model;

/**
 * Class SectionType
 * @package Spwashi\Model\Type
 * @property $id
 * @property $name
 * @property $description
 *
 */
class SectionType extends Model {
    public static    $default_properties = [];
    public static    $table_name         = 'section_types';
    public static    $main_string_key    = 'name';
    protected static $find_all_able      = true;

    const TYPE_STANDARD   = 1;
    const TYPE_IMAGE      = 2;
    const TYPE_VIDEO      = 3;
    const TYPE_AUDIO      = 4;
    const TYPE_DEFINITION = 5;
    const TYPE_TABLE      = 6;
    const TYPE_LIST       = 7;
    const TYPE_MIRROR     = 8;

    public static function get_name_from_type($type) {
        $type_name = null;
        switch ($type) {
            case static::TYPE_STANDARD:
                return 'standard';
                break;
            case static::TYPE_IMAGE:
                return 'image';
                break;
            case static::TYPE_VIDEO:
                return 'video';
                break;
            case static::TYPE_DEFINITION:
                return 'definition';
                break;
            case static::TYPE_AUDIO:
                return 'audio';
                break;
            case static::TYPE_TABLE:
                return 'table';
                break;
            case static::TYPE_LIST:
                return 'list';
                break;
            case static::TYPE_MIRROR:
                return 'mirror';
                break;
        }
        return 'standard';
    }
}