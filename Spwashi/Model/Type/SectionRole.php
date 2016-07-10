<?php
/**
 * User: Sam Washington
 * Date: 12/13/15
 * Time: 6:53 AM
 */

namespace Spwashi\Model\Type;

/**
 * Class SectionRole
 * @package Spwashi\Model\Type
 * @property $id
 * @property $name
 * @property $description
 */
class SectionRole {
    public static $default_properties; public static $api_settable_properties;
    public static $table_name;
    public static $table_prefix;
    public static $main_string_key = 'name';

    const WHAT         = 1;
    const WHY          = 2;
    const HOW_THEORY   = 3;
    const HOW_PRACTICE = 4;
    const HOW_GENERAL  = 5;
    const WHO          = 6;
    const WHEN         = 7;
    const WHERE        = 8;
    const ELABORATION  = 9;
}