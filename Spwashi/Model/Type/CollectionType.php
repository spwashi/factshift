<?php
/**
 * User: sam
 * Date: 6/11/15
 * Time: 11:15 PM
 */

namespace Spwashi\Model\Type;

use Sm\Model\Model;

/**
 * Class CollectionType
 * @package Spwashi\Model\Type
 * @property $id
 * @property $name
 * @property $description
 */
class CollectionType extends Model {
    public static $default_properties = [];
    public static    $table_name      = 'collection_types';
    public static    $main_string_key = 'name';
    protected static $find_all_able   = true;

    const TYPE_STANDARD   = 1;
    const TYPE_DICTIONARY = 2;
    const TYPE_DIMENSION  = 3;

    public static function get_name_from_type($type) {
        $type_name = null;
        switch ($type) {
            case static::TYPE_STANDARD:
                return 'standard';
                break;
            case static::TYPE_DIMENSION:
                return 'dimension';
                break;
        }
        return 'standard';
    }
}