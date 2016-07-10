<?php
/**
 * User: sam
 * Date: 6/11/15
 * Time: 11:15 PM
 */

namespace Spwashi\Model;

use Sm\Model\Model;

/**
 * Class Tag
 * @package Spwashi\Model
 * @property $id
 * @property $user_id     The ID of the user who created the tag
 * @property $page_id     A page devoted to describing the tag
 * @property $alias       The alias of the tag? Not sure why this is here, please do not use this
 * @property $description A brief description of the tag
 * @property $ent_id        A unique identifier for the tag
 */
class Tag extends Model {
    public static $default_properties; public static $api_settable_properties;
    public static $table_name;
    public static $table_prefix;
    public static $main_string_key = 'ent_id';
}