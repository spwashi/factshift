<?php
/**
 * User: Sam Washington
 * Date: 6/23/16
 * Time: 3:23 PM
 */

namespace Spwashi\Model\Map;

use Sm\Model\Map;

class PageUserMap extends Map {
	public static $default_properties;
	public static $primary_identifier;
	public static $secondary_identifier;
	public static $api_settable_properties;
	public static $table_name;
	public static $_mapped;
	public static $table_prefix;
	public static $main_string_key = '';
	public static $_map_type       = 'Page|User';
}