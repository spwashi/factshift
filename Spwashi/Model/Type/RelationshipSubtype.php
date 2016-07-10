<?php
/**
 * User: Sam Washington
 * Date: 6/9/16
 * Time: 6:38 PM
 */

namespace Spwashi\Model\Type;

class RelationshipSubtype {
    public static    $default_properties = [];
    public static    $table_name         = 'relationship_subtypes';
    public static    $main_string_key    = 'name';
    protected static $find_all_able      = true;

    const ELI5            = 1;
    const THING_EXPLAINER = 2;
    const IMAGE           = 3;
    const VIDEO           = 4;
    const AUDIO           = 5;
    const TEXT            = 6;

    private static function get_name_or_type($type_or_name, $what = 'type') {
        switch ($type_or_name) {
            case static::ELI5:
            case 'eli5':
                return $what == 'type' ? static::ELI5 : 'eli5';
                break;
            case static::THING_EXPLAINER:
            case 'thing_explainer';
                return $what == 'type' ? static::THING_EXPLAINER : 'thing_explainer';
                break;
            case static::IMAGE:
                return $what == 'type' ? static::IMAGE : 'image';
                break;
            case static::VIDEO:
                return $what == 'type' ? static::VIDEO : 'video';
                break;
            case static::AUDIO:
            case 'audio':
                return $what == 'type' ? static::AUDIO : 'audio';
        }
        return null;
    }

    public static function get_name_from_type($type) {
        return static::get_name_or_type($type, 'name');
    }

    public static function get_type_from_name($type) {
        return static::get_name_or_type($type, 'type');
    }
}