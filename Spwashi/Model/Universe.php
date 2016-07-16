<?php
namespace Spwashi\Model;

use Sm\Model\Model;

/**
 * User: Sam Washington
 * Date: 12/3/15
 * Time: 12:16 PM
 */

/**
 * Class Universe
 * @package Spwashi\Model
 * @property $directory     The location where the information about the collection resides
 * @property $alias         A unique, humanly-readable alias to describe the universe
 * @property $title         The title of the universe
 * @property $subtitle      The subtitle of the universe
 * @property $description   The description of the universe
 * @property $ent_id        A unique, random string useful for identification purposes
 * @property $user_id       The ID of the user who created the universe
 */
class Universe extends Model implements \JsonSerializable {
	public static $default_properties;
	public static $api_settable_properties;
	public static $table_name;
	public static $table_prefix;
	public static $main_string_key = 'ent_id';
#
}