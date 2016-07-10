<?php
/**
 * User: Sam Washington
 * Date: 9/30/15
 * Time: 11:32 AM
 */

namespace Sm\Model;

use Sm\Core\App;
use Sm\Core\Inflector;
use Sm\Development\Log;
use Sm\Model\Abstraction\Model;

class ModelMeta {
	protected static $table_to_class    = [];
	protected static $prefix_to_table   = [];
	protected static $class_properties  = [];
	protected static $class_init_status = [];
	protected static $mapped_props      = [];
	public static    $fake_tables       = [];
	public static function table_exists($tablename) {
		if (!is_string($tablename))
			Log::init(func_get_args(), 'log', debug_backtrace()[0])->log_it();
		return array_key_exists($tablename, static::$table_to_class);
	}
	public static function get_table_alias($model) {
		if ($model instanceof Model) $model = static::convert_to_tablename($model);

		return isset(static::$fake_tables[$model]) ? static::$fake_tables[$model] : false;
	}
	public static function register($array) {
		$tables    = isset($array['tables']) ? $array['tables'] : [];
		$namespace = App::_()->name . '\\Model\\';
		if (isset($tables['_meta'])) {
			$meta      = $tables['_meta'];
			$namespace = isset($meta['namespace']) ? $meta['namespace'] : $namespace;
			unset($tables['_meta']);
		}

		/**
		 * '{table_name}' => [
		 *      'readonly'      => {bool, can this object be changed outside of the direct db communication}
		 *      'values'        => {array, only applicable if is readonly, discrete values of the class. irrelevant when using constants}
		 *      'map_type'      => {string, pipe separated enumeration of the Entity names that are being mapped together. Primary|Secondary. (e.g. Collection|Section)
		 *      'mapped'        => {array, a list of tables that are linked in this map. (e.g. ['collections', 'sections']}
		 *      'class'         => {classname without the appname or Model prefix (no \\{appname}\Model\) e.g. "Dictionary"}
		 *      'prefix'        => {the four character prefix of the table's ent_ids)
		 *      'properties'    => {The default properties of the class and their default values. Could be a flat array/have flat indices if no defaults are set}
		 *      'api_settable'  => {An array of properties that can be set via the API}
		 *      'relationships' => [
		 *          '{tablename}'   => [
		 *              '_meta' => [ {unnecessary, especially if using defaults}
		 *                  '_table' => {name of map table}
		 *                  '_key'  => {The index to search for organizing each relationship in the relationship holder}
		 *              ]
		 *          ],
		 *          ...
		 *      ]
		 * ]
		 */

		foreach ($tables as $table_name => $info) {
			$prefix = isset($info['prefix']) ? $info['prefix'] : false;
			$prefix && (static::$prefix_to_table[$prefix] = $table_name);
			$class_name = isset($info['class']) ? $info['class'] : false;
			if (!$class_name) continue;
			if (isset($info['existent']) && !$info['existent']) {
				static::$fake_tables[$table_name] = isset($info['alias_for']) ? $info['alias_for'] : true;
			}
			$n_class                             = $namespace . $class_name;
			static::$table_to_class[$table_name] = $n_class;

			$standard_properties = isset($info['properties']) ? $info['properties'] : [];
			$mapped              = isset($info['mapped']) ? $info['mapped'] : [false];

			$properties = [];
			foreach ($standard_properties as $key => $v) {
				if (is_numeric($key)) {
					$properties[$v] = null;
				} else {
					$properties[$key] = $v;
				}
			}
			$standard_relationships = isset($info['relationships']) ? $info['relationships'] : [];
			$relationships          = [];
			foreach ($standard_relationships as $key => $v) {
				if (is_numeric($key)) {
					$relationships[$v] = [];
				} else {
					$relationships[$key] = $v;
				}
			}
			if (strpos($n_class, 'Map')) {
				static::$mapped_props[$n_class] = $mapped;
			}
			static::$class_properties[$n_class]  = [
				'standard'      => $properties,
				'api_settable'  => isset($info['api_settable']) ? $info['api_settable'] : [],
				'relationships' => $relationships,
				'ids'           => isset($info['ids']) ? $info['ids'] : false
			];
			static::$class_init_status[$n_class] = false;
		}
	}

	/**
	 * Return the prefix of a table based on a provided ent_id
	 *
	 * @param $string
	 *
	 * @return string
	 */
	public static function getTablePrefixFromEnt_id($string) {
		if (strlen($string) >= 3) {
			return (substr($string, 0, 4));
		}
		return $string;
	}
	/**
	 * Get the default properties of a Model according to the App's models.php file
	 * @param $class_name
	 * @param $type ['standard' (the properties of the class and default properties),
	 *              'relationships' (default relationship information, used in the RelatorRemix),
	 *              'api' (The properties that can be set via the API),
	 *              'api_settable']
	 *
	 * @return array
	 */
	public static function get_default_class_properties($class_name, $type = null) {
		$class_name = '\\' . trim($class_name, '\\');
		switch ($type) {
			default:
			case 'standard':
				#Properties of the class and their default values
				$type = 'standard';
				break;
			case 'id':
			case 'ids':
				$type = 'ids';
				break;
			case 'mapped':
				#The array of mapped entities in a map class (e.g. [sections, collections]
				if (!isset(static::$class_properties[$class_name])) return [];
				return static::$mapped_props[$class_name];
			case 'relationships':
				# For the main relator remix, this will contain all of the known relationship indices ad some information on them
				$type = 'relationships';
				break;
			case 'api':
			case 'api_settable':
				#The properties that can be set via API
				$type = 'api_settable';
				break;
		}

		if (!isset(static::$class_properties[$class_name])) return [];
		return static::$class_properties[$class_name][$type];
	}

	/**
	 * Say that all properties of a class have been initialized
	 * @param $classname
	 */
	public static function add_as_init($classname) {
		$classname                             = '\\' . trim($classname, '\\');
		static::$class_init_status[$classname] = true;
	}
	/**
	 * Check to see if a class has been initialized
	 * @param $classname
	 * @return bool
	 */
	public static function is_init($classname) {
		$classname = '\\' . trim($classname, '\\');
		return isset(static::$class_init_status[$classname]) && static::$class_init_status[$classname];
	}
	/**
	 * Check to see if a string is probably an ent_id according to the structure
	 * @param $string
	 * @return bool
	 */
	public static function is_ent_id($string) {
		return (is_string($string) && strlen($string) == \Sm\Model\Model::TOTAL_ENT_ID_LENGTH && array_key_exists(substr($string, 0, 4), static::$prefix_to_table));
	}

	/**
	 * Check to see if something could be the id of a class
	 * @param $string
	 * @return bool
	 */
	public static function is_id($string) {
		return is_numeric($string) && !is_float($string);
	}
	/**
	 * Get the table that maps between two different entities
	 * @param \Sm\Model\Model|string $one
	 * @param \Sm\Model\Model|string $two
	 * @param bool                   $lax If it's lax, return the name of the table that would map the two entities if it existed (why?)
	 * @return bool|string
	 */
	public static function get_map($one, $two, $lax = false) {
		$s_table_singular = Inflector::singularize(static::convert_to_tablename($one, true));
		$m_table_singular = Inflector::singularize(static::convert_to_tablename($two, true));
		$map_table_name = static::table_exists("{$s_table_singular}_{$m_table_singular}_map") ? "{$s_table_singular}_{$m_table_singular}_map" : false;
		$map_table_name = !$map_table_name || static::table_exists("{$m_table_singular}_{$s_table_singular}_map") ? "{$m_table_singular}_{$s_table_singular}_map" : $map_table_name;
		return static::table_exists($map_table_name) ? $map_table_name : ($lax ? $map_table_name : false);
	}
	/**
	 * Get a class that maps between two different entities
	 * @param \Sm\Model\Model|string $one Entity in question
	 * @param \Sm\Model\Model|string $two Entity in question
	 * @return Map
	 * @throws ModelNotFoundException
	 */
	public static function get_map_class($one, $two) {
		$res = static::get_map($one, $two, true);
		if (!$res) {
			$one = static::convert_to_tablename($one);
			$two = static::convert_to_tablename($two);
			throw new ModelNotFoundException("No mapping class between {$one} and {$two}", ModelNotFoundException::REASON_NO_MATCHING_CLASS);
		}
		return static::table_to_class($res);
	}

	/**
	 * Given a Model or tablename, convert that to a table name
	 * @param \Sm\Model\Model|string $table_name
	 * @return bool|mixed|string
	 */
	public static function convert_to_classname($table_name) {
		if (!$table_name) return false;
		if (is_string($table_name)) {
			$table_name = Inflector::pluralize(strtolower($table_name));
			$table_name = str_replace('maps', 'map', $table_name);
		} else if ($table_name instanceof Model) {
			$table_name = $table_name->getModelType();
		}
		return $table_name;
	}

	/**
	 * Convert an entity to the standard id form of it e.g. dimensions yields dimension_id
	 * @param $table_name
	 * @return bool|string
	 */
	public static function convert_to_id($table_name) {
		if (!$table_name) return false;
		$table_name = static::convert_to_tablename($table_name);
		if ($table_name) return Inflector::singularize($table_name) . '_id';
		return false;
	}

	/**
	 * Convert an entity into a tablename (Based on some string or Model, get the name of the table it should represent)
	 * @param \Sm\Model\Model|string $entity
	 * @param bool|false             $lax Should we return what the tablename <i>should</i> be?
	 * @return bool|mixed|string
	 */
	public static function convert_to_tablename($entity, $lax = false) {
		$table_name = '';
		if (is_string($entity)) {
			$table_name = Inflector::pluralize(str_replace('_id', '', strtolower($entity)));
			$table_name = str_replace('maps', 'map', $table_name);
		} else if ($entity instanceof \Sm\Model\Model) {
			$table_name = $entity->getTableName();
		}
		return isset(static::$table_to_class[$table_name]) ? $table_name : ($lax ? $table_name : false);
	}
	/**
	 * @param       $table_name
	 *
	 * @param array $attributes
	 *
	 * @return \Sm\Model\Model
	 * @throws \Sm\Model\ModelNotFoundException
	 */
	public static function table_to_class($table_name, $attributes = []) {
		$table_name = is_string($table_name) && strlen($table_name) ? $table_name : '__no table__';
		$table_name = Inflector::pluralize(strtolower($table_name));
		$table_name = str_replace('maps', 'map', $table_name);
		if (isset(static::$table_to_class[$table_name])) {
			$class_part = static::$table_to_class[$table_name];
			if (class_exists($class_part, true))
				return new $class_part($attributes);
		}
		$table_name = str_replace('__s', '__', $table_name);
//		Log::init([func_get_args(), debug_backtrace()])->log_it();
		throw new ModelNotFoundException("No matching class for {$table_name}", ModelNotFoundException::REASON_NO_MATCHING_CLASS);
	}
	/**
	 * Given an ent_id, find the entity associated with it
	 * @param $ent_id
	 * @return bool|static
	 * @throws ModelNotFoundException
	 */
	public static function ent_id_to_class($ent_id) {
		$prefix = static::getTablePrefixFromEnt_id($ent_id);
		if (!$prefix) throw new ModelNotFoundException('No matching class', ModelNotFoundException::REASON_NO_MATCHING_CLASS);
		$model = static::prefix_to_class($prefix);
		if (!$model) throw new ModelNotFoundException('No matching class', ModelNotFoundException::REASON_NO_MATCHING_CLASS);
		return $model->find(['ent_id' => $ent_id]);
	}

	/**
	 * Given the name of a table, return the absoulute classname associated with it
	 * @param $table_name
	 * @return bool
	 */
	public static function table_to_classname($table_name) {
		if (isset(static::$table_to_class[$table_name])) {
			return static::$table_to_class[$table_name];
		} else {
			return false;
		}
	}

	/**
	 * Given a classname. get the table associated with it
	 * @param $classname
	 * @return bool|mixed
	 */
	public static function classname_to_table($classname) {
		$classname = '\\' . trim($classname, '\\');
		$res       = array_search($classname, static::$table_to_class);
		if ($res) return $res;
		return false;
	}

	/**
	 * Given the prefix of an ent_id, return an instance of a class that matches
	 * @param       $prefix
	 * @param array $attributes
	 * @return bool|\Sm\Model\Model
	 * @throws ModelNotFoundException
	 */
	public static function prefix_to_class($prefix, $attributes = []) {
		if (isset(static::$prefix_to_table[$prefix])) {
			return static::table_to_class(static::$prefix_to_table[$prefix], $attributes);
		}
		return false;
	}

	/**
	 * Given the name of a table, get the ent_id prefix associated with it
	 * @param $table
	 * @return bool|mixed
	 */
	public static function table_to_prefix($table) {
		$res = array_search($table, static::$prefix_to_table);
		if ($res) return $res;
		return false;
	}

	/**
	 * Get the name of the class associated with a particular prefix
	 * @param $classname
	 * @return bool|mixed
	 */
	public static function classname_to_prefix($classname) {
		$classname = '\\' . trim($classname, '\\');
		$table     = static::classname_to_table($classname);
		if (!$table) return false;
		return static::table_to_prefix($table);
	}

	/**
	 * Given the singular version of a table, get the classname from it
	 * @param $singular
	 * @return \Sm\Model\Model
	 * @throws ModelNotFoundException
	 */
	public static function singular_to_class($singular) {
		return static::table_to_class(Inflector::pluralize($singular));
	}
}