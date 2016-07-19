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
	const TYPE_TABLE      = 'TYPE_TABLE';
	const TYPE_CLASSNAME  = 'TYPE_CLASSNAME';
	const TYPE_PREFIX     = 'TYPE_PREFIX';
	const TYPE_PROPERTIES = 'TYPE_PROPERTIES';
	const TYPE_MODEL_TYPE = 'TYPE_MODEL_TYPE';
	const TYPE_CLASS      = 'TYPE_CLASS';

	const FIND_API_SET                  = 'api_settable';
	const FIND_API_GET                  = 'api_gettable';
	const FIND_DEFAULT                  = 'all';
	const FIND_RELATIONSHIPS            = 'relationships';
	const FIND_RECIPROCAL_RELATIONSHIPS = 'reciprocal_relationships';
	const FIND_BOTH_RELATIONSHIPS       = '_find_both_relationships_';
	const FIND_MAPPED                   = 'linked_entities';
	const FIND_IDS                      = 'mapped';

	protected static $class_init_status = [];

	private static $loading_reciprocals = [];

	protected static $bb_rels_to_rel_types = [];
	protected static $bb_class_properties;
	protected static $bb_model_type_to_classname;
	protected static $bb_table_to_model_type;
	protected static $bb_prefix_to_model_type;
	protected static $bb_mapped_props;
	protected static $bb_fake_table_to_alias;
	private static   $rel_properties       = [
		'index_singular',
		'id',
		'name',
		'name_plural',
		'primary_key',
		'secondary_key',
		'is_only_reciprocal',
		'linked_entities',
		'alias_for'
	];
	public static function table_exists($tablename) {
		if (!is_string($tablename)) {
			Log::init(func_get_args(), debug_backtrace()[0], 'log')->log_it();
			return false;
		}
		return array_key_exists($tablename, static::$bb_table_to_model_type);
	}
	public static function get_table_alias($model, $backwards = false) {
		if ($backwards) {
			$alias = array_search($model, static::$bb_fake_table_to_alias);
			if ($alias) return $alias;
			if (strpos($model, '.')) $model = explode('.', $model)[0];
			$model = static::convert_to_something($model, static::TYPE_TABLE);
			$alias = array_search($model, static::$bb_fake_table_to_alias);
			if ($alias) return $alias;
			$count = 0;
			foreach (static::$bb_fake_table_to_alias as $fake_table => $l_real_table) {
				if (strpos($l_real_table, "{$model}.") === 0) {
					$count++;
					$alias = $fake_table;
				}
			}
			if ($count !== 1) return false;
			return $alias;
		}
		$model = static::convert_to_something($model, ModelMeta::TYPE_TABLE);
		$alias = static::$bb_fake_table_to_alias[$model] ?? false;
		if (strpos($alias, '.')) $alias = explode('.', $alias)[0];
		return $alias;
	}
	/**
	 * @param        $name
	 * @param string $what
	 * @return string
	 */
	public static function def_convert_to_something($name, $what = 'id') {
		if (is_array($name)) {
			foreach ($name as $k => $nn) {
				$name[$k] = static::def_convert_to_something($nn, $what);
			}
		} else {
			$lower_name = strtolower($name);
			switch ($what) {
				case 'id':
				default:
					$name = $lower_name . '_id';
					break;
				case 'name':
					$name = ucfirst(Inflector::singularize($lower_name) ?: '');
					break;
				case 'name_plural':
					$name = strpos($name, ' ') ? $name : Inflector::pluralize($name);
					$name = ucfirst($name ?: '');
					break;
				case 'index_singular':
				case 'index':
					$name = Inflector::singularize($name);
					break;
				case 'table':
				case 'table_name':
				case 'tablename':
					$name = Inflector::pluralize($name);
					$name = str_replace('maps', 'map', Inflector::underscore($name));
					break;
				case 'model_type':
				case 'modeltype':
					$name = Inflector::camelize($name);
					$name = Inflector::singularize($name);
					$name = ucfirst($name);
			}
		}
		return $name;
	}
	private static function replace_with_self($string, $self) {
		if (is_array($string)) {
			foreach ($string as $k => $_string) {
				$string[$k] = static::replace_with_self($_string, $self);
			}
		}
		if (!is_string($string) || !is_string($self)) return $string;
		return str_replace(['[Entity]', '[entity]', '[entities]'], [$self, strtolower($self), strtolower(Inflector::pluralize($self))], $string);
	}
	public static function create_standard_relationship($rel_index, $owner, $r_info, $rel = null) {
		$to_check           = static::$rel_properties;
		$relationship_index = $rel_index ?? null;
		if (!$relationship_index) return false;
		$current_model_type   = $owner;
		$table_name           = static::def_convert_to_something($owner, 'table') ?: false;
		$rel                  = $rel ?? [];
		$rel['existent']      = $r_info['existent'] ?? $rel['existent'] ?? !isset($r_info['alias_for']) ?? !isset($r_info['alias_for']);
		$r_info['model_type'] = static::replace_with_self($r_info['model_type'] ??$rel['model_type']?? $current_model_type, $current_model_type);
		foreach ($to_check as $value) {
			$boon        = $r_info[$value] ?? $rel[$value] ?? false;
			$rel[$value] = static::replace_with_self($boon, $r_info['model_type']);
		}
		$rel['model_type']    = $r_info['model_type'] ?? false;
		$r_model_type         = $rel['model_type'];
		$rel['primary_key']   = $rel['primary_key'] ?: static::def_convert_to_something($current_model_type);
		$rel['secondary_key'] = $rel['secondary_key'] ?: static::def_convert_to_something($r_info['model_type']);
		if ($rel['existent']) unset($rel['alias_for']);
		else $rel['alias_for'] = $rel['alias_for'] ?: ($table_name ?? strtolower(Inflector::pluralize($current_model_type))) . ".{$rel['secondary_key']}";
		$rel['index_singular']       = $rel['index_singular'] ?: static::def_convert_to_something($relationship_index, 'index_singular');
		$rel['name']                 = $rel['name'] ?: static::def_convert_to_something($relationship_index, 'name');
		$rel['name_plural']          = $rel['name_plural'] ?: static::def_convert_to_something($relationship_index, 'name_plural');
		$le                          = $rel['linked_entities'] = $rel['linked_entities'] ?: [$current_model_type, $r_info['model_type']];
		$rel['existent']             = $rel['existent'] ?? true;
		$relationship_index_adjusted = $relationship_index;
		if (!($rel['is_only_reciprocal'] ?? false)) {
			$_relationship_arr = ['index' => $relationship_index, 'relationship' => $rel, 'model_type' => $current_model_type];
			if (is_array($r_model_type)) {
				foreach ($r_model_type as $m_type) {
					static::$loading_reciprocals[$m_type]   = static::$loading_reciprocals[$m_type] ?? [];
					static::$loading_reciprocals[$m_type][] = $_relationship_arr;
				}
			} else if ($r_model_type) {
				static::$loading_reciprocals[$r_model_type]   = static::$loading_reciprocals[$r_model_type] ?? [];
				static::$loading_reciprocals[$r_model_type][] = $_relationship_arr;
			} else {
				var_dump([$current_model_type, $rel, $relationship_index]);
			}
		} else {
			$relationship_index_adjusted = 'reciprocal_' . $relationship_index;
		}
		$join_1                                                              = implode('|', $le);
		static::$bb_rels_to_rel_types[$join_1]                               = static::$bb_rels_to_rel_types[$join_1] ?? [];
		static::$bb_rels_to_rel_types[$join_1][$relationship_index_adjusted] = $rel;

		return $rel;
	}
	public static function _register(array $array) {
		$_                         = $array['_'] ?? [];             //A model Model
		$marked_relationships      = [];                            //Array of the relationships that we know about
		$app_name                  = App::getBootingAppName() ?: App::_()->name;      //Name of the current application
		$namespace                 = $app_name . '\\Model\\';       //Namespace of the classes
		$search                    = ['models', 'maps', 'types'];   //The types of objects there are
		$models                    = $array['models'] ?? [];        //The Models that we are dealing with
		$__relationships           = $_['relationships'] ?? [];     //The model relationships
		$marked_relationships['_'] = $__relationships;              //Add the model relationships

		static::$loading_reciprocals = [];

		$static_model_type_to_classname = [];
		$static_table_to_model_type     = [];
		$static_prefix_to_model_type    = [];
		$static_class_properties        = [];
		$static_mapped_props            = [];
		$static_fake_table_to_alias     = [];
		foreach ((array)$models as $current_model_type => $m_info) {
			$prefix                  = $m_info['prefix'] ?? false;              //prefix to the ent_ids
			$class_name              = $current_model_type;                     //The class name (no namespace)
			$table_name              = ($m_info['table'] ?? false);             //The name of the table the class corresponds to
			$table_alias             = ($m_info['alias_for'] ?? false);         //If this class is not represented exactly on the server, what is it?
			$type                    = ($m_info['type'] ?? false);              //The subtype of Model this is - Map, Model, (?Type)
			$type                    = $type ?: (strpos($current_model_type, 'Map') ? 'Map' : 'Model');
			$is_map                  = $type == 'Map';                          //Whether this is a map
			$n_class                 = $namespace . ($type != 'Model' ? $type . '\\' : '') . $class_name; //The namespace of the Model
			$properties              = $m_info['properties'] ?? [];             //An array that holds the various properties of the model
			$all_properties          = $properties['all'] ?? [];                //All of the properties attached to the model
			$table_is_existent       = $m_info['existent'] ?? !isset($m_info['alias_for']); //Whether this table actually exists
			$api_gettable_properties = $properties['api_gettable'] ?? $properties['api'] ?? [];
			$api_settable_properties = $properties['api_settable'] ?? $properties['api'] ?? [];
			$properties['all']       = $properties['api_gettable'] = $properties['api_settable'] = [];
			foreach ((array)$all_properties as $key => $v) {
				if (is_numeric($key)) $properties['all'][$v] = null;
				else $properties['all'][$key] = $v;
			}
			$properties['api_settable'] = $api_settable_properties == '*' ? $properties['all'] : $api_settable_properties; //Check to see if the wildcard was used; if so, adopt all properties
			$properties['api_gettable'] = $api_gettable_properties == '*' ? $properties['all'] : $api_gettable_properties;

			$all_relationships  = $m_info['relationships'] ?? [];             //All of the relationships held by this object
			$relationships      = [];
			$current_properties = [
				'properties' => $properties,
				'prefix'     => $prefix,
				'type'       => $type,
			];

			if (!$is_map) {
				//Loop through the relationships that we want to inherit and add those to the "relationships" array
				if (isset($all_relationships['_inherit'])) {
					foreach ($all_relationships['_inherit'] as $__parent_relator => $rel_types) {
						if (isset($marked_relationships[$__parent_relator])) {
							foreach ($rel_types as $r_t) {
								$tmp_rel = $marked_relationships[$__parent_relator][$r_t] ?? [];
								if ($all_relationships[$r_t] ?? false) {
									$relationships[$r_t] = $tmp_rel;
								} else {
									$all_relationships[$r_t] = $tmp_rel;
								}
							}
						}
					}
					unset($all_relationships['_inherit']);
				}
				//Iterate through the actual relationships and register them
				foreach ((array)$all_relationships as $relationship_index => $r_info) {
					$relationships[$relationship_index] = static::create_standard_relationship($relationship_index, $current_model_type, $r_info, $relationships[$relationship_index] ?? []);
				}

				$marked_relationships[$current_model_type] = $relationships;
				$current_properties['relationships']       = $relationships;
			} else {
				$le = $m_info['linked_entities'] ?? false;
				if (!$le) {
					preg_match_all('/([A-Z]{1}[a-z]+)(?=[A-Z])/', $current_model_type, $le);
					$le = $le[0];
				}
				$current_properties['linked_entities'] = $le;
				$map_keys                              = $m_info['keys'] ?? false;
				if (!$map_keys || !isset($map_keys[1])) {
					$map_keys = [];
					if ($table_alias && strpos($table_alias, '.') > 1) {
						$_split = explode('.', $table_alias);
						$_sp_0  = $_split[0] ?? false;
						$_sp_1  = $_split[1] ?? false;
						//If the first index is the same singular as it is plural, it's probably a table.
						//Assume that index gets
						if ($_sp_0 && Inflector::pluralize($_sp_0) == $_sp_0) $map_keys[0] = $map_keys[0] ?? 'id';
						if ($_sp_1) $map_keys[1] = $_sp_1;
					} else {
						$map_keys = static::def_convert_to_something($le, 'id');
					}
					if ($map_keys[0] == $map_keys[1]) {
						$map_keys[0] = "primary_{$map_keys[0]}";
						$map_keys[1] = "secondary_{$map_keys[1]}";
					}
				}
				$current_properties['mapped'] = $static_mapped_props[$current_model_type] = $map_keys;
			}
			if ($table_name) $static_table_to_model_type[$table_name] = $current_model_type;
			if (!$table_is_existent) $static_fake_table_to_alias[$table_name] = $table_alias;
			if ($prefix) $static_prefix_to_model_type[$prefix] = $current_model_type;
			$static_class_properties[$current_model_type]        = $current_properties;
			$static_model_type_to_classname[$current_model_type] = $n_class;
		}
		//Add the reciprocal relationships
		foreach (static::$loading_reciprocals as $model_type => $rel_array_array) {
			if (!($static_class_properties[$model_type] ?? false)) {
				Log::init(['Could not add relationship', $model_type => $rel_array_array])->log_it();
				continue;
			}
			$model_type__id   = static::def_convert_to_something($model_type);
			$ak_relationships = $static_class_properties[$model_type]['reciprocal_relationships'] ?? [];       //relationships that are already known
			foreach ($rel_array_array as $rec_rel_array) {
				$rec_index                     = $rec_rel_array['index'];
				$rec_model_type                = $rec_rel_array['model_type'];
				$rec_model_type__id            = static::def_convert_to_something($rec_model_type);
				$model_reciprocal_relationship = $ak_relationships[$rec_index] ?? $rec_rel_array['relationship'];
				$sk                            = $model_reciprocal_relationship['secondary_key'] ?? $model_type__id;
				$pk                            = $model_reciprocal_relationship['primary_key'] ?? $rec_model_type__id;
				$le                            = $model_reciprocal_relationship['linked_entities'] ??[$rec_model_type, $model_type];
				$is_the_same                   = ($le[0] ?? false) == ($le[1] ?? false);
				if (!is_array($pk)) {
					if ($pk != $rec_model_type__id && !$is_the_same) {
						$pk    = (array)$pk;
						$le[0] = (array)$le[0];
					}
				}
				if (is_array($pk) && !in_array($rec_model_type__id, $pk)) {
					$pk[]    = $rec_model_type__id;
					$le[0][] = $rec_model_type;
				}
				$model_reciprocal_relationship['primary_key']        = $pk;
				$model_reciprocal_relationship['secondary_key']      = $sk;
				$model_reciprocal_relationship['linked_entities']    = $le;
				$model_reciprocal_relationship['is_only_reciprocal'] = true;
				$ak_relationships[$rec_index]                        = $model_reciprocal_relationship;
			}
			$static_class_properties[$model_type]['reciprocal_relationships'] = $ak_relationships;
		}

		static::$bb_class_properties        = $static_class_properties;
		static::$bb_model_type_to_classname = $static_model_type_to_classname;
		static::$bb_table_to_model_type     = $static_table_to_model_type;
		static::$bb_prefix_to_model_type    = $static_prefix_to_model_type;
		static::$bb_mapped_props            = $static_mapped_props;
		static::$bb_fake_table_to_alias     = $static_fake_table_to_alias;

		return ([
			'reciprocal_relationships' => static::$loading_reciprocals,
			'class_properties'         => $static_class_properties,
			'model_type_to_classname'  => $static_model_type_to_classname,
			'table_to_model_type'      => $static_table_to_model_type,
			'prefix_to_model_type'     => $static_prefix_to_model_type,
			'mapped_props'             => $static_mapped_props,
			'fake_table_to_alias'      => $static_fake_table_to_alias,
			'rels_to_rel_types'        => static::$bb_rels_to_rel_types
		]);
	}
	public static function dump() {
		$properties = [
			'class_properties'     => static::$bb_class_properties,
			'prefix_to_model_type' => static::$bb_prefix_to_model_type,
			'mapped_props'         => static::$bb_mapped_props,
		];
		return $properties;
	}

	/**
	 * Return the prefix of a table based on a provided ent_id
	 *
	 * @param $string
	 *
	 * @return string
	 */
	public static function getTablePrefixFromEnt_id($string) {
		if (!is_string($string)) return false;
		if (strlen($string) >= 3) return (substr($string, 0, 4));
		return $string;
	}

	public static function _get_def_props($to_convert, $type = ModelMeta::FIND_DEFAULT) {
		$model_type = static::convert_to_something($to_convert, static::TYPE_MODEL_TYPE);
		if (!$model_type) return [];
		$class_properties = static::$bb_class_properties[$model_type];
		switch ($type) {
			case (static::FIND_API_SET):
			case (static::FIND_API_GET):
			case (static::FIND_DEFAULT):
				return $class_properties['properties'][$type] ?? [];
				break;
			case (static::FIND_RELATIONSHIPS):
			case (static::FIND_MAPPED):
			case (static::FIND_IDS):
			case (static::FIND_RECIPROCAL_RELATIONSHIPS):
				return $class_properties[$type] ?? [];
				break;
			case (static::FIND_BOTH_RELATIONSHIPS):
				$fr    = $class_properties[static::FIND_RELATIONSHIPS];
				$frr   = $class_properties[static::FIND_RECIPROCAL_RELATIONSHIPS];
				$a_frr = [];
				foreach ($frr as $k => $v) {
					$a_frr['reciprocal_' . $k] = $v;
				}

				return array_merge($fr, $a_frr);
				break;
		}
		return [];
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
		return (is_string($string) && strlen($string) == \Sm\Model\Model::TOTAL_ENT_ID_LENGTH && array_key_exists(substr($string, 0, 4), static::$bb_prefix_to_model_type));
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
	 * Convert an entity to the standard id form of it e.g. dimensions yields dimension_id
	 * @param $table_name
	 * @return bool|string
	 */
	public static function convert_to_id($table_name) {
		if (!$table_name) return false;
		$table_name = static::convert_to_something($table_name, static::TYPE_TABLE);
		if ($table_name) return Inflector::singularize($table_name) . '_id';
		return false;
	}

	public static function convert_to_something($to_convert, $convert_to = ModelMeta::TYPE_MODEL_TYPE) {
		$model_type = $table_name = $prefix = $classname = null;
		if (is_array($to_convert)) {
			//Could be array_map
			foreach ($to_convert as $k => $nn) {
				$to_convert[$k] = static::convert_to_something($nn, $convert_to);
			}
			return $to_convert;
		}
		if ($to_convert instanceof Model) {
			$model_type = $to_convert->getModelType();
			$classname  = get_class($to_convert);
			if ($to_convert instanceof \Sm\Model\Model) $table_name = $to_convert->getTableName();
			$prefix = static::getTablePrefixFromEnt_id($to_convert->ent_id);
		}

		if (is_string($to_convert)) {
			if (strpos($to_convert, '\\')) {
				$name_arr   = explode('\\', $to_convert);
				$to_convert = $name_arr[count($name_arr) - 1];
			}
			$to_model_type = static::def_convert_to_something($to_convert, 'model_type');
			$to_tablename  = static::def_convert_to_something($to_convert, 'table_name');
			if (strpos('ser', $to_convert)) \Kint::dump([$to_model_type, $to_tablename, $to_convert]);
			if (static::$bb_class_properties[$to_model_type] ?? false) {
				$model_type = $to_model_type;
				$table_name = array_search($model_type, static::$bb_table_to_model_type) ?: false;
			}
			if (static::$bb_table_to_model_type[$to_tablename] ?? false) {
				$table_name = $to_tablename;
				$model_type = static::$bb_table_to_model_type[$table_name];
			}
			if (!$model_type??false) {
				$prefix     = static::getTablePrefixFromEnt_id($to_convert);
				$model_type = static::$bb_prefix_to_model_type[$prefix] ?? false;
				$table_name = $model_type ? static::convert_to_something($model_type, static::TYPE_TABLE) : false;
			}
		}
		if ($model_type && !(static::$bb_class_properties[$model_type] ?? false)) $model_type = false;
		if ($table_name && !(static::$bb_table_to_model_type[$table_name] ?? false)) $table_name = false;

		switch ($convert_to) {
			case (static::TYPE_MODEL_TYPE):
				if ($model_type) return $model_type;
				if ($table_name) return static::$bb_table_to_model_type[$table_name] ?? false;
				if ($prefix) return static::$bb_prefix_to_model_type[$prefix] ?? false;
				break;
			case (static::TYPE_TABLE):
				if ($table_name) return $table_name;
				if ($model_type) array_search($model_type, static::$bb_table_to_model_type) ?: false;
				break;
			case (static::TYPE_CLASSNAME):
				if ($model_type) return static::$bb_model_type_to_classname[$model_type] ?? false;
				if ($classname) return $classname;
				if ($table_name) return static::$bb_table_to_model_type[static::$bb_table_to_model_type[$table_name]??0] ??false;
				break;
			case (static::TYPE_PREFIX):
				if ($prefix) return $prefix;
				if ($model_type) return array_search($model_type, static::$bb_prefix_to_model_type) ?: false;
				break;
			case (static::TYPE_PROPERTIES):
				if ($model_type) return static::$bb_class_properties[$model_type] ?? false;
				return static::$bb_class_properties[static::convert_to_something($to_convert, static::TYPE_MODEL_TYPE) ?: 0] ?? false;
				break;
			case (static::TYPE_CLASS):
				$classname = $classname ?: static::convert_to_something($model_type ?: $table_name ?: $prefix ?: false, static::TYPE_CLASSNAME);
				if ($classname) return new $classname;
				break;
		}
		return false;
	}
	public static function get_map_between($one, $two, $convert_to = ModelMeta::TYPE_TABLE) {
		$one = static::convert_to_something($one, static::TYPE_MODEL_TYPE);
		$two = static::convert_to_something($two, static::TYPE_MODEL_TYPE);
		if (is_array($one)) $one = implode(',', $one);
		if (is_array($two)) $two = implode(',', $two);
		$try_1 = "{$one}{$two}Map";
		$try_2 = "{$two}{$one}Map";
//		var_dump([$try_1, $try_2]);
		return static::convert_to_something($try_1, $convert_to) ?: static::convert_to_something($try_2, $convert_to) ?: false;
	}
	/**
	 * @param array     $linked_entities
	 * @param bool|true $strict
	 * @return array
	 */
	public static function get_potential_relationships(array $linked_entities, $strict = true) {
		$linked_entities = static::convert_to_something($linked_entities);
		$try_1           = implode('|', $linked_entities);
		$try_2           = $strict ? $try_1 : implode('|', [$linked_entities[1]??'', $linked_entities[0]??'']);
		return static::$bb_rels_to_rel_types[$try_1] ?? static::$bb_rels_to_rel_types[$try_2]?? [];
	}
	public static function convert_to_class($to_convert, $attributes = []) {
		/** @var $model \Sm\Model\Model */
		$model = static::convert_to_something($to_convert, static::TYPE_CLASS);
		if ($model) {
			if ($attributes && !(is_array($attributes) && empty($attributes))) $model->set($attributes, false);
			return $model;
		}
		throw new ModelNotFoundException(json_encode(['No matching class', func_get_args()]), ModelNotFoundException::REASON_NO_MATCHING_CLASS);
	}
}