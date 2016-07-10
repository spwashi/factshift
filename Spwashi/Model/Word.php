<?php

namespace Spwashi\Model;

use Sm\Model\Model;

/**
 * User: Sam Washington
 * Date: 11/9/15
 * Time: 2:57 AM
 */

/**
 * Class Word
 * @package Spwashi\Model
 * @property $id
 * @property $title       The actual word
 * @property $subtitle    Any words that
 * @property $section_id  This shouldn't exist
 * @property $description A description of the word?
 */
class Word extends Model {
    public static $default_properties; public static $api_settable_properties;
    public static $table_name;
    public static $table_prefix;
    public static $main_string_key = 'title';
}