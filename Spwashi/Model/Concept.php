<?php
namespace Spwashi\Model;

use Sm\Model\Model;

/**
 * User: Sam Washington
 * Date: 12/3/15
 * Time: 12:16 PM
 */

/**
 * Class Concept
 *
 * @package Spwashi\Model
 * @property $id
 * @property $user_id
 * @property $title
 * @property $concept_type
 * @property $description
 * @property $ent_id
 * @property $alias
 */
class Concept extends Model implements \JsonSerializable {
#
	public static $default_properties = [];
	public static $table_name         = 'concepts';
	public static $main_string_key    = 'alias';
	public static $table_prefix       = 'concept';
#
}