<?php
/**
 * User: sam
 * Date: 7/11/15
 * Time: 1:21 PM
 */

namespace Sm\Model;

use Sm\Core\IoC;
use Sm\Development\Log;
use Spwashi\Model\Exception\MapNotFoundException;

/**
 * Class Map
 *
 * @package Sm\Model\Map
 * @property $position
 */
abstract class Map extends Model implements \JsonSerializable {
	static        $table_name           = '';
	static        $_map_type            = '';
	static        $_mapped              = [false];
	public static $default_properties   = [];
	public static $primary_identifier   = null;
	public static $secondary_identifier = null;
	public        $models               = [];
	public function __construct($properties = null, $check_change = false) {
		parent::__construct($properties, $check_change);
		static::__initialize();
		$this->models[static::$primary_identifier]   = new Model;
		$this->models[static::$secondary_identifier] = new Model;
	}
	public static function get_primary_identifier($model = false) {
		static::__initialize();
		if ($model) {
			if (ModelMeta::convert_to_id($model) == static::$secondary_identifier)
				return static::$secondary_identifier;
		}
		return static::$primary_identifier;
	}
	public static function get_secondary_identifier($model = false) {
		static::__initialize();
		if ($model) {
			if (ModelMeta::convert_to_id($model) == static::$secondary_identifier)
				return static::$primary_identifier;
		}
		return static::$secondary_identifier;
	}

	public function findPermissions($user = false) {
		return parent::findPermissions($user);
	}
	public static function findSql($id, $all = false, $attributes = null, $extras = []) {
		$id = static::resolve_id($id);
		return parent::findSql($id, $all, $attributes, $extras);
	}
	public static function find($id, $attributes = null, $extras = []) {
		$id = static::resolve_id($id);
		try {
			return parent::find($id, $attributes, $extras);
		} catch (ModelNotFoundException $e) {
			Log::init(func_get_args())->log_it();
			throw new MapNotFoundException($e->getMessage(), $e->getCode());
		}
	}
	public static function findAll($id, $attributes = null) {
		$id = static::resolve_id($id);
		try {
			return parent::findAll($id, $attributes);
		} catch (ModelNotFoundException $e) {
			throw new MapNotFoundException($e->getMessage(), $e->getCode());
		}
	}
	public function findType($type, $attributes_to_search = null, $extras = []) {
		$attributes_to_search = static::resolve_id($attributes_to_search);
		try {
			return parent::findType($type, $attributes_to_search, $extras);
		} catch (ModelNotFoundException $e) {
			throw new MapNotFoundException($e->getMessage(), $e->getCode());
		}
	}

	public static function create_map_class($identifier) {
		if ($identifier instanceof Map) return $identifier;
		if (is_string($identifier)) {
			if (strpos(strtolower($identifier), 'map')) $table_name = $identifier;
			$table_name = ($table_name ?? false) ?: ModelMeta::get_table_alias($identifier, true);
			return ModelMeta::convert_to_class($table_name);
		}
		return false;
	}

	protected static function __initialize() {
		$res = parent::__initialize();
		if ($res) {
			static::$_mapped = ModelMeta::_get_def_props(static::class, ModelMeta::FIND_MAPPED);
			$ids             = ModelMeta::_get_def_props(static::class, ModelMeta::FIND_IDS);
			if ($ids && isset($ids[0])) {
				static::$primary_identifier = $ids[0];
				if (isset($ids[1])) static::$secondary_identifier = $ids[1];
				return;
			}
			$primary_identifier   = ModelMeta::convert_to_id(static::$_mapped[0]);
			$secondary_identifier = ModelMeta::convert_to_id(isset(static::$_mapped[1]) ? static::$_mapped[1] : static::$_mapped[0]);
			if ($primary_identifier == $secondary_identifier) {
				$primary_identifier   = "primary_{$primary_identifier}";
				$secondary_identifier = "secondary_{$secondary_identifier}";
			}
			static::$primary_identifier   = $primary_identifier;
			static::$secondary_identifier = $secondary_identifier;
		}
	}
	public function init_models($bet_arr) {
		static::__initialize();
		$primary_identifier   = static::$primary_identifier;
		$secondary_identifier = static::$secondary_identifier;
		$convert_0            = ModelMeta::convert_to_id($bet_arr[0]);
		$convert_1            = ModelMeta::convert_to_id($bet_arr[1]);
		if ($convert_0 == $primary_identifier || "primary_{$convert_0}" == $primary_identifier) {
			$this->models[$primary_identifier]   = $bet_arr[0];
			$this->models[$secondary_identifier] = $bet_arr[1];
			$this->set([
				           $primary_identifier   => $bet_arr[0]->id,
				           $secondary_identifier => $bet_arr[1]->id
			           ]);
		} else if ($convert_1 == $primary_identifier || "secondary_{$convert_0}" == $primary_identifier) {
			$this->models[$primary_identifier]   = $bet_arr[0];
			$this->models[$secondary_identifier] = $bet_arr[1];
			$this->set([
				           $primary_identifier   => $bet_arr[1]->id,
				           $secondary_identifier => $bet_arr[0]->id
			           ]);
		}
	}

	/**
	 * Sometimes there is a specific subset of rows that we are going to update when we are updating the position of each row.
	 * This returns a string to be used in addition to the update query, or an array of values to be used in finding all that are part of the same collection
	 * todo make this less specific
	 * @param            $primary_identifier
	 * @param            $secondary_identifier
	 * @param bool|false $arr
	 * @return array|string
	 */
	public function unique_update_id($primary_identifier, $secondary_identifier, $arr = false) {
		return $arr ? [] : "";
	}
	/**
	 * Update the position of a row in a table
	 * @param bool $is_delete
	 * @return \array[]|bool
	 */
	public function update_position($is_delete = false) {
		if (!isset(static::$table_name)) return false;
		if (!isset($this->_properties['position'])) return null;
		$tablename            = static::$table_name;
		$position             = $this->_properties['position'];
		$primary_identifier   = ModelMeta::convert_to_id(static::$_mapped[0]);
		$secondary_identifier = ModelMeta::convert_to_id(isset(static::$_mapped[1]) ? static::$_mapped[1] : static::$_mapped[0]);
		if ($primary_identifier == $secondary_identifier) {
			$primary_identifier   = "primary_{$primary_identifier}";
			$secondary_identifier = "secondary_{$secondary_identifier}";
		}
		if ($primary_identifier && isset($this->_properties[$primary_identifier]) && isset($this->_properties[$secondary_identifier]) && $this->_properties['position']) {
			$primary_identifier_id   = $this->_properties[$primary_identifier];
			$secondary_identifier_id = $this->_properties[$secondary_identifier];
			try {
				$find_arr = [
					$primary_identifier        => $primary_identifier_id,
					"!{$secondary_identifier}" => $secondary_identifier_id,
					'position'                 => $position
				];
				$unique   = $this->unique_update_id($primary_identifier, $secondary_identifier, true) ?: [];
//                $dd       = static::find(array_merge($find_arr, $unique));
				if (!$is_delete) {
					if ($position == 1) $qry = "UPDATE {$tablename} AS tbl SET tbl.position = tbl.position + 1 WHERE tbl.{$primary_identifier} = $primary_identifier_id AND tbl.{$secondary_identifier} != $secondary_identifier_id " . $this->unique_update_id($primary_identifier, $secondary_identifier);
					else $qry = "UPDATE {$tablename} AS tbl SET tbl.position = CASE WHEN tbl.position >= {$position} THEN tbl.position + 1 ELSE tbl.position END  WHERE tbl.{$primary_identifier} = {$primary_identifier_id} AND tbl.{$secondary_identifier} != $secondary_identifier_id " . $this->unique_update_id($primary_identifier, $secondary_identifier);
				} else {
					$qry = "UPDATE {$tablename} AS table2 SET table2.position = table2.position - 1 WHERE table2.position >= {$position} AND table2.{$primary_identifier} = $primary_identifier_id AND table2.{$secondary_identifier} != $secondary_identifier_id " . $this->unique_update_id($primary_identifier, $secondary_identifier);
				}
				/** @var \Sm\Database\Sql $sql */
				if (!IoC::resolveSql($sql)) return false;
				if ($primary_identifier_id && is_numeric($primary_identifier_id)) {
					$result = $sql->query($qry, 'row_count');
//					Log::init(json_encode($result) . ' - ' . $qry ?: ' - ')->log_it();
					return $result;
				}
			} catch (ModelNotFoundException $e) {
			}
		}
		return true;
	}
	/**
	 * Given the typical ID variable(array, string, int) create a usable array of what we are looking for.
	 * E.G. if we are mapping between two different variables with a 'between' flag in the ID, try to figure out how to
	 * separate those variables into something that we can use. The primary model and id are put in the right location
	 * dimension_id could be the derived ID index, or primary_{}.
	 * @param $id
	 * @param $id               ['between']   A non-associative array of which two Models are being linked by this map, perceived primary first
	 *                          This will be sorted out into the correct index based on Model Type
	 * @return array
	 */
	public static function resolve_id($id) {
		if (is_array($id) && isset($id['between']) && is_array($id['between']) && isset($id['between'][1])) {
			static::__initialize();
			$primary_identifier   = static::$primary_identifier;
			$secondary_identifier = static::$secondary_identifier;
			$bet_arr              = $id['between'];
			$convert_0            = ModelMeta::convert_to_id($bet_arr[0]);
			$convert_1            = ModelMeta::convert_to_id($bet_arr[1]);
			if ($convert_0 == $convert_1) {
				$convert_0 = "primary_{$convert_0}";
				$convert_1 = "secondary_{$convert_1}";
			}
			if ($convert_0 == $primary_identifier) {
				$id[$primary_identifier]   = $bet_arr[0];
				$id[$secondary_identifier] = $bet_arr[1];
			} else if ($convert_1 == $primary_identifier) {
				$id[$primary_identifier]   = $bet_arr[0];
				$id[$secondary_identifier] = $bet_arr[1];
			}
			unset($id['between']);
		}
		return $id;
	}
	public function create() {
		$first_result = parent::create();
		if (!$first_result) return $first_result;
		$this->update_position(false);
		return $first_result;
	}

	public function remove($where = null) {
		$first_result = parent::remove();
		if (!$first_result) return $first_result;
		$this->update_position(true);
		return $first_result;
	}
	/**
	 * Remove the relationship between two entities
	 * @param bool|false|Model|array $model_1
	 * @param bool|false|Model|array $model_2 Either a model or an array [id=> ,index=>(The index to search for the model)]
	 * @return array|bool|mixed
	 */
	public function remove_relationship($model_1 = false, $model_2 = false) {
		/** @var \Sm\Database\Sql $sql */
		if (!(IoC::resolveSql($sql))) return false;
		$primary_identifier   = static::$primary_identifier;
		$secondary_identifier = static::$secondary_identifier;
		$position             = isset($this->_properties['position']) ? $this->_properties['position'] : 1;
		$table_name           = static::getTableName();
		$p_id                 = false;
		#If we already know the ID, just remove the Model
		if (isset($this->_properties['id']) && is_int($this->_properties['id'])) {
			$result = !!$this->remove();
			if ($this->models[$primary_identifier] instanceof Model)
				$p_id = $this->models[$primary_identifier]->id ?: isset($this->_properties);
		} else {
			if (!$model_1 && static::$primary_identifier && $this->models[static::$primary_identifier]) {
				$model_1 = $this->models[static::$primary_identifier];
				$model_2 = $this->models[static::$secondary_identifier];
			}

			#These are the IDs of the primary and secondary models, by default they are false
			$p_id = $s_id = false;
			if ($model_1 instanceof Model && $model_2 instanceof Model) {
				$this->init_models([$model_1, $model_2]);
				$p_id = $this->models[$primary_identifier]->id;
				$s_id = $this->models[$secondary_identifier]->id;
			} else {
				/**
				 * For both of the model arrays, try to convert them to actual Models
				 */
				if (is_array($model_1) && isset($model_1['index']) && isset($model_1['id'])) {
					$p_id               = $model_1['id'];
					$primary_identifier = $model_1['index'];
					if (ModelMeta::table_exists($primary_identifier)) {
						$primary_identifier = ModelMeta::convert_to_id($primary_identifier);
						$model_1            = ModelMeta::convert_to_class($primary_identifier, ['id' => $p_id]);
					}
				}
				if (is_array($model_2) && isset($model_2['index']) && isset($model_2['id'])) {
					$s_id                 = $model_2['id'];
					$secondary_identifier = $model_2['index'];
					if (ModelMeta::table_exists($secondary_identifier)) {
						$secondary_identifier = ModelMeta::convert_to_id($secondary_identifier);
						$model_2              = ModelMeta::convert_to_class($secondary_identifier, ['id' => $s_id]);
					}
				}
				if ($primary_identifier == $secondary_identifier) {
					$primary_identifier   = "primary_{$primary_identifier}";
					$secondary_identifier = "secondary_{$secondary_identifier}";
				}
			}

			if ($p_id && $primary_identifier && !$model_2) {
				#If only the primary entity exists
				$result = $this->remove("{$primary_identifier}={$p_id}");
			} else if ($s_id && $secondary_identifier && !$model_1) {
				$result = $this->remove("{$secondary_identifier}={$s_id}");
			} else if ($secondary_identifier && $s_id && $primary_identifier && $p_id) {
				$result = $this->remove("{$primary_identifier}={$p_id} AND {$secondary_identifier}={$s_id}");
			} else {
				$result = false;
			}
			if (isset($this->_properties['position']) && $this->_properties['position']) {
				$position = $this->_properties['position'];
			}
		}
		if ($result && $primary_identifier && $p_id && $position) {
			$sql->query("UPDATE {$table_name} AS tbl_1 SET tbl_1.position = tbl_1.position - 1 WHERE tbl_1.{$primary_identifier} = {$p_id} AND tbl_1.position > {$position}");
		}
		return $result;
	}
}