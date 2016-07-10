<?php
/**
 * User: sam
 * Date: 6/11/15
 * Time: 11:15 PM
 */

namespace Spwashi\Model;

use Sm\Model\Model;

/**
 * Class Track
 * @package Spwashi\Model
 * @property $id
 * @property $user_id        The ID of the user who created the track
 * @property $main_parent_id The ID of the parent track
 * @property $name           The name of the track
 * @property $alias          A unique, humanly readable alias for the track
 * @property $description    A description of the track and its purpose; useful for tooltips
 * @property $ent_id           A unique, random keystring useful for identification purposes
 * @property
 */
class Track extends Model {
    public static $default_properties; public static $api_settable_properties;
    public static $table_name;
    public static $table_prefix;
    public static $main_string_key = 'ent_id';
}