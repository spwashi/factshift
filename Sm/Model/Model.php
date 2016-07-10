<?php
/**
 * User: Sam Washington
 * Date: 3/21/2015
 * Time: 11:15 PM
 */

namespace Sm\Model;

use Sm\Core\IoC;
use Sm\Core\Util;
use Sm\Development\Log;
use Spwashi\Libs\Session\Session;

/**
 * Class Model
 * todo add a way to check if a property is actually part of a class before using it when finding
 * @package Sm\Model
 * @property int $id
 * @property int $ent_id
 */
class Model extends Abstraction\Model {
	const ADDED_ENT_ID_LENGTH = 15;
	const TOTAL_ENT_ID_LENGTH = 25;

	static public function generate_ent_id() {
		$ent_id = Util::generateRandomString(static::ADDED_ENT_ID_LENGTH);
		return static::$table_prefix . date('mdy') . $ent_id;
	}
	public function findPermissions($user = false) {
		$user = $user ?: Session::get_user();
		if (!$this->_permissions_found) {
			if ($user && intval($this->user_id) == intval($user->id)) {
				$this->_permissions['edit']    = true;
				$this->_permissions['view']    = true;
				$this->_permissions['destroy'] = true;
			} else {
				$this->_permissions['destroy'] = false;
				$this->_permissions['edit']    = false;
			}
			$this->_permissions_found = true;
		}
		return $this->_permissions;
	}

#--------------------------------------| SQL FINDERS AND INSTANTIATORS
	/**
	 * Find one or all entries
	 *
	 * @param string|int|array $id          The index to find. Could be something like '1' to find model with ID == 1,
	 *                                      or 'samgineer' to find model with maybe USERNAME == 'samgineer', or
	 *                                      ['user_id' = 3, 'group_id' = 4] to find model with USER_ID == 3 AND GROUP_ID == 4
	 * @param bool             $all         Find all or just one row?
	 * @param array            $attributes  An array of the attributes to find, null if you want to find all
	 *
	 * @param array            $extras      Anything else that might be added to the query
	 *                                      order_by=>Adds a verbatim "order_by" clause to the query.
	 *                                      If there is a slash, the clause is exploded and the 2nd index says ascending or descending (e.g. position/DESC)
	 *
	 * @return array|bool|mixed
	 */
	public static function findSql($id, $all = false, $attributes = null, $extras = []) {
		# If it is an ent_id, change it into one
		$id = ModelMeta::is_ent_id($id) ? ['ent_id' => $id] : $id;
		static::__initialize();
		$order_by = isset ($extras['order_by']) ? $extras['order_by'] : null;
		/** @var \Sm\Database\Sql $sql */
		if (!IoC::resolveSql($sql)) return false;
		$eg          = new static;
		$empty_is_id = false;
		if (is_array($id)) {
			$is_start = true;
			foreach ($id as $column_name => $value) {
				$not = false;
				if (strpos($column_name, '!') === 0) {
					$column_name = substr($column_name, 1, strlen($column_name) - 1);
					$not         = true;
				}
				if ($value instanceof Model) {
					$value = $value->id;
				}
				if (!array_key_exists($column_name, static::$default_properties)) {
					Log::init($column_name . ' not in ' . static::class)->log_it();
					continue;
				}
				if (!$is_start) {
					$sql->where('AND');
				}
				$is_start    = false;
				$empty_is_id = false;
				$not         = $not ? '!' : '';
				$sql->bind([$column_name => $value])->where($column_name . " {$not}= :{$column_name}");
			}
		} elseif (is_numeric($id)) {
			$sql->bind(['id' => $id])->where(static::$main_int_key . ' = :id');
		} else {
			$sql->bind(['id' => $id])->where(static::$main_string_key . ' = :id');
		}
		if ($order_by) {
			$sql->buildQry();
			$order_by_arr = explode('/', $order_by);
			$asc_or_desc  = isset($order_by_arr[1]) ? $order_by_arr[1] : 'ASC';
			$sql->setQry($sql->getQry() . ' ORDER BY ' . $order_by_arr[0] . " {$asc_or_desc}");
		}
		return $empty_is_id ? false : ($sql->select($attributes ?: '*')->from(static::$table_name)->run()->output($all ? 'all' : 'row'));
	}
	/**
	 * Find one entry from a table based on parameters provided
	 *
	 * @param string|array|int $id         The index to find. Could be something like '1' to find model with ID == 1,
	 *                                     or 'samgineer' to find model with maybe USERNAME == 'samgineer', or
	 *                                     ['user_id' =
	 *                                     3,'group_id' = 4] to find model with USER_ID == 3 AND GROUP_ID == 4
	 *
	 * @param array            $attributes An array of the attributes to find, null if you want to find all
	 *
	 * @param array            $extras
	 *
	 * @return static
	 * @throws ModelNotFoundException
	 */
	public static function find($id, $attributes = null, $extras = []) {
		try {
			$output = static::findSql($id, false, $attributes, $extras);
			if (is_array($output) && !empty($output)) {
				$newClass = new static;
				$newClass->set($output, false);
				$newClass->findPermissions();
				return $newClass;
			} else {
				throw new \Exception;
			}
		} catch (\Exception $e) {
			throw new ModelNotFoundException('Could Not Find' . static::getModelType() . ' -> ' . json_encode(func_get_args()), ModelNotFoundException::REASON_NOT_FOUND);
		}
	}
	/**
	 * Find multiple entries from a table based on parameters provided
	 *
	 * @param string|array|int $id         The index to find. Could be something like '1' to find model with ID == 1,
	 *                                     or 'samgineer' to find model with maybe USERNAME == 'samgineer', or
	 *                                     ['user_id' =
	 *                                     3, 'group_id' = 4] to find model with USER_ID == 3 AND GROUP_ID == 4
	 * @param array            $attributes An array of the attributes to find, null if you want to find all
	 *
	 * @return ModelIterator
	 * @throws \Sm\Model\ModelNotFoundException If the Model cannot be found, throw a ModelNotFoundException
	 */
	public static function findAll($id, $attributes = null) {
		try {
			$output      = static::findSql($id, true, $attributes);
			$new_classes = new ModelIterator();
			if ($output && !empty($output)) {
				foreach ($output as $arr) {
					$tmp = new static;
					$tmp->set($arr, false);
					$new_classes->push($tmp);
				}
				return $new_classes;
			} else {
				throw new \Exception;
			}
		} catch (\Exception $e) {
			Log::init($id)->log_it();
			throw new ModelNotFoundException('Could Not Find Any Models -> ' . json_encode(func_get_args()), ModelNotFoundException::REASON_NOT_FOUND);
		}
	}

	/**
	 * @param string|Model     $type                 The table to map to
	 * @param array|string|int $attributes_to_search The ID or attributes to search the mapping table for (e.g. collection_id)
	 * @param array            $extras               is_secondary       =>
	 *                                               Whether or not we are finding the primary or secondary relationships of the class
	 *                                               Useful if there is a one way relationship kind of thing
	 *
	 *                                               holder_index       =>
	 *                                               The index at which we will have the map details
	 *
	 *                                               walk               =>
	 *                                               A function that is to be run for every element in the map array
	 * @return static
	 * @throws ModelNotFoundException
	 * @throws \Exception
	 */
	public function findType($type, $attributes_to_search = null, $extras = []) {
		$model_tablename = false;
		$model           = false;
		$self            = new static();
		$is_secondary    = isset($extras['is_secondary']) && $extras['is_secondary'] ? true : false;
		try {
			/**
			 * Convert the type to a tablename, get a model Model to work with
			 */
			if ($type instanceof Model) {
				$model_tablename = $type->getTableName();
				$model           = $type;
			} else if (is_string($type)) {
				# If we're dealing with a string, convert it to a tablename and create a class from it
				$type = ModelMeta::convert_to_tablename($type);
				if (ModelMeta::table_exists($type)) {
					$model_tablename = $type;
				}
				$model = ModelMeta::table_to_class($model_tablename);
			}
			#If we were unsuccessful, throw an error
			if (!$model) throw new ModelNotFoundException('Could not find ' . $type);

			#Not sure why I did this, but we create a reference to a RelatorRemix based on the relationship to the secondary tablename
			#todo figure out why this exists. I think it was to find information about the table, but I don't know
			$self_rel =& $self->map_remix->{$model_tablename};

			/**
			 * Find out what the proper identifiers are.
			 * If the relationship is secondary (E.g. we are finding all relationships where this is the CHILD and not the PARENT),
			 * deal with them accordingly. This only really matters in the case where the primary class and the secondary class are from the sabe table
			 */
			$self_identifier  = false;
			$model_identifier = false;

			/**
			 * Try to figure out the name of the Map table by combining the names of each Model's tablea= and seeing what works.
			 * If the relationship has a known table, this will likely be unnecessary
			 */
			/** @var string The name of the table that links the entities together */
			$map_table_name = isset($extras['map_table']) ? $extras['map_table'] : false;
			$map_table_name = !$map_table_name && isset($self_rel->_meta->_table) ? $self_rel->_meta->_table : $map_table_name;
			$map_table_name = $map_table_name ?: ModelMeta::get_map(static::$table_name, $model_tablename);

			#If we couldn't guess the name of the Map table, throw an error
			if (!$map_table_name || !ModelMeta::table_exists($map_table_name)) {
				throw new ModelNotFoundException('Could not adequately map ' . $map_table_name);
			}

			#todo this is imperfect linking.
			#Make an array holding the names of the linked entity types
			$self_rel->_meta->_linked_entities = [
				static::getModelType(),
				$model->getModelType(),
			];

			#Try to make a class that maps the two relationships together
			/** @var Map $map_class A class that links two entities together */
			$map_class = ModelMeta::table_to_class($map_table_name);
			if (!$map_class) throw new ModelNotFoundException('No map class');
			$actual_map_name = $map_table_name;
			$map_table_name  = ModelMeta::get_table_alias($map_class) ?: $map_table_name;

			$__secondary_identifier = $map_class->get_secondary_identifier($this);
			$__primary_identifier   = $map_class->get_primary_identifier($this);
			if ($is_secondary) {
				$self_identifier  = $__secondary_identifier;
				$model_identifier = $__primary_identifier;
			} else {
				$self_identifier  = $__primary_identifier;
				$model_identifier = $__secondary_identifier;
			}
//			Log::init([$self_identifier, $model_identifier])->log_it();
			#Get the SQL class ready to run some queries
			/** @var \Sm\Database\Sql $sql */
			if (!IoC::resolveSql($sql)) return false;

			$map_alias_name = 'map';
			#Check to see if there are any attributes to add to the query to qualify it
			if (is_array($attributes_to_search)) {
				/** @var bool Meant to add an 'AND' after every select portion */
				$is_start = true;

				#If the ID of the current class is not included in the select query, add it
				if (!isset($attributes_to_search[$self_identifier])) $attributes_to_search[$self_identifier] = $this->id;

				#Iterate through the attributes to search, and AND them together for a select statement
				foreach ($attributes_to_search as $column_name => $column_value) {
					if (is_numeric($column_name)) continue;
					if (!$is_start) $sql->where('AND');
					#This is no longer the start of the SELECT statement
					$is_start = false;

					#If the column value is an array, iterate through it to add other options via ORing
					#todo figure this out
					if (is_array($column_value)) {
						$is_c_start = true;
						$string     = '(';
						foreach ($column_value as $key => $possible_value) {
							$sql->bind(["{$column_name}_{$key}" => $possible_value]);
							if (!$is_c_start) $string .= " OR ";
							$string .= "{$column_name} = :{$column_name}_{$key}";
							$is_c_start = false;
						}
						$string .= ')';
						$sql->where($string);
					} else {
						$sql->bind([$column_name => $column_value])
						    ->where("{$map_alias_name}.{$column_name} = :{$column_name}");
					}
				}
			} else {
				if (!isset($attributes_to_search)) $attributes_to_search = $this->id;
				$sql->bind(['id' => $attributes_to_search])
				    ->where("{$map_alias_name}.{$self_identifier} = :id");
			}

			$select_arr = [$model_tablename . '.*'];
			/**
			 * Make it so the properties from the mapping class are distinguishable from the ones that are not
			 */
			foreach ($map_class->getDefaultProperties() as $name => $var) {
				if (substr($name, 0, 1) != '_') {
					$select_arr["{$map_alias_name}.{$name}"] = "{$map_table_name}_{$name}";
				}
			}
			#Because we are selecting from the Secondary table and the map table, link the two by the 2Model IDs
			$sql->where("AND {$map_alias_name}.{$model_identifier} = {$model_tablename}.id")
			    ->select($select_arr)
			    ->from([$model_tablename, $map_table_name => $map_alias_name]);

			#If there's an order_by extra, use it
			$order_by = isset ($extras['order_by']) ? $extras['order_by'] : null;
			if ($order_by) {
				$order_by = str_replace($map_table_name, $map_alias_name, $order_by);
				$sql->buildQry()
				    ->setQry($sql->getQry() . ' ORDER BY ' . $order_by . ' ASC');
			}
//			Log::init($sql->buildQry()->getQry())->log_it();
			#Generate an output similar to the PDO::fetchAll
			$output = $sql->run()->output('all');
			#If there was no output, say we couldn't find any
			if (!is_array($output)) throw new ModelNotFoundException('No models were found', ModelNotFoundException::REASON_NOT_FOUND);

			/** @var array An array of the models that are being added */
			$model_array = [];

			#----------------------------
			/** @var string The name of the index at which to add the relationship. Defaults to the table name of the secondary table */
			$holder_index = isset($extras['holder_index']) ? $extras['holder_index'] : ($is_secondary ? static::$table_name : $model_tablename);
			/** @var string The name of the index at which to add the relationship in the secondary Model. Defaults to the name of the primary table */
			$reciprocal_holder_index = isset($extras['reciprocal_holder_index'])
				? $extras['reciprocal_holder_index']
				: ($is_secondary ? $model_tablename : static::$table_name);
			#----------------------------

			/** @var string This is the way that we associate Models in the RelatorRemix. Could be by position or date added, defaults to the modelID */
			$holder_assoc_index = isset($extras['holder_association']) ? $extras['holder_association'] : $model_identifier;
			/** @var string This is the way that we associate Models in the RelatorRemix for the other Model. Could be by position or date added, defaults to the modelID */
			$reciprocal_holder_assoc_index = isset($extras['reciprocal_holder_association']) ? $extras['reciprocal_holder_association'] : $self_identifier;
			/** @var callable $holder_hook This is a function that will be run on each found Model that places them in the correct index based on the properties of the map or object */
			#----------------------------

			$holder_hook = isset($extras['holder_hook']) && is_callable($extras['holder_hook'])
				? $extras['holder_hook']
				: false;
			/** @var callable $reciprocal_holder_hook This is a function that will be run on each found Model that places them in the correct index based on the properties of the map or object */
			$reciprocal_holder_hook = isset($extras['reciprocal_holder_hook']) && is_callable($extras['reciprocal_holder_hook'])
				? $extras['reciprocal_holder_hook']
				: false;
			#----------------------------

			foreach ($output as $key => $object_properties) {
				$secondary_model = clone($model);
				#----------------------------
				/**
				 * Iterate through the properties of the tables and pick out the ones that belong to the map class
				 */
				$properties_of_map = [];
				foreach ($object_properties as $object_name => $value) {
					if (strpos($object_name, $map_table_name) === 0) {
						$_index = substr($object_name, strlen($map_table_name) + 1);;
						$properties_of_map[$_index] = $value;
						unset($object_properties[$object_name]);
					}
				}
				#----------------------------
				/**
				 * Get the proper index of the relationships
				 */
				if ($holder_hook) {
					$holder =& $holder_hook($this, $properties_of_map, $object_properties, $is_secondary, true);
				} else {
					$holder =& $this->map_remix->get_map_rel($holder_index, $model_tablename);
				}
				if ($reciprocal_holder_hook) {
					$reciprocal_holder =& $reciprocal_holder_hook($secondary_model, $properties_of_map, $object_properties, !$is_secondary, true);
				} else {
					$reciprocal_holder =& $secondary_model->map_remix->get_map_rel($reciprocal_holder_index, static::$table_name);
				}
				#----------------------------
				/**
				 * Create a Map class based on the properties of the map. If
				 */
				$_map                     = ModelMeta::table_to_class($actual_map_name, $properties_of_map) ?: $properties_of_map;
				$self_relationship        = new Relationship();
				$self_relationship->model = $secondary_model;
				$self_relationship->_map  = $_map;

				#Store each relationship in the proper holder at the holder_assoc_index (again, this is the index that distinguishes each relationship)
				if (isset($properties_of_map[$holder_assoc_index])) {
					$model_array[$properties_of_map[$holder_assoc_index]] = $secondary_model;
					$holder->push($self_relationship, $properties_of_map[$holder_assoc_index]);
				} else {
					$model_array[]          = $secondary_model;
					$holder->_meta->_list[] = $properties_of_map['id'];
					$holder->push($self_relationship, $properties_of_map['id']);
				}

				$reciprocal_relationship       = new Relationship();
				$reciprocal_relationship->_map = $_map;
				#Store each relationship in the proper holder at the holder_assoc_index (again, this is the index that distinguishes each relationship)
				if (isset($properties_of_map[$reciprocal_holder_assoc_index])) {
					$reciprocal_holder->push($reciprocal_relationship, $properties_of_map[$reciprocal_holder_assoc_index]);
				} else {
					$reciprocal_holder->push($reciprocal_relationship, $properties_of_map['id']);
				}

				if (isset($properties_of_map['position'])) {
					$self_relationship->position       = $properties_of_map['position'];
					$reciprocal_relationship->position = $properties_of_map['position'];
				}

				#todo wrong order?
				#Label which entities are being linked in this class
				$holder->_meta->_linked_entities = $reciprocal_holder->_meta->_linked_entities = [
					static::getModelType(),
					$model->getModelType(),
				];
				#Set the properties of the Secondary Model, but don't mark change
				$secondary_model->set($object_properties, false);
				unset ($holder);
				unset ($reciprocal_holder);
			}

			if (isset($extras['walk']) && is_callable($extras['walk']) && !empty($model_array)) {
				array_walk($model_array, $extras['walk']);
			}
			return $this;
		} catch (\Exception $e) {
			$message = $e->getMessage();
			if (strlen($message) && $e->getCode() !== ModelNotFoundException::REASON_NOT_FOUND) {
				Log::init($message)->log_it();
				throw $e;
			} else if ($e instanceof ModelNotFoundException) {
				throw $e;
			}
			return $this;
		}
	}

#--------------------------------------| ROW HANDLERS
	/**
	 * Set the values of the properties of a class based on an array passed in.
	 *
	 * @param array $values       Associative array of the properties and values to set (only if the properties exist).
	 *                            Note: This could be the output of a fetch row query
	 * @param bool  $check_change If this is true, the class will be notified that the values have been changed for the
	 *                            'save' function.
	 *
	 * @param bool  $verify       One of these days there may be some sort of verification
	 *
	 * @return $this
	 */
	public function set(array $values, $check_change = true, $verify = false) {
		foreach ($values as $property => $val) {
			if ($val instanceof Model) {
				$this->$property = $val;
				continue;
			}
			#If the property exists, set it
			if (static::has_property($property)) {
				#If we want to mark this property as changed, add it to the changed array (if it has actually changed value)
				if ($check_change && $this->_properties[$property] !== $val) {
					$this->_changed[] = $property;
				}
				#If the property is an integer, convert it to one
				$val = (is_numeric($val) && !is_float($val)) || ($property == 'id') ? intval($val) : $val;
				#Set the property
				$this->_properties[$property] = $val;
			} else {
				$classname = get_class($this);
				Log::init("Could not set the property {$property} in class {$classname}", 'log', debug_backtrace()[1])->log_it();
			}
		}
		return $this;
	}
	public function create() {
		$new_val_arr = [];
		$this->set(['creation_dt' => date('Y-m-d H:i:s')]);
		foreach ($this->_changed as $key) {
			if (is_string($this->_properties[$key]) || is_numeric($this->_properties[$key]))
				$new_val_arr[$key] = $this->_properties[$key];
			else
				Log::init(['Did not save property ' . $key, $this->_properties[$key]])->log_it();
		}
		$this->_changed = [];
		/** @var \Sm\Database\Sql $sql */
		if (!IoC::resolveSql($sql)) return false;

		$qry = $sql->insert(array_keys($new_val_arr), array_values($new_val_arr))->table(static::$table_name);
		$qry->buildQry();
		$query_result = $qry->run()->output('id');
		if ($query_result) $this->id = $query_result;
		else return false;

		return $query_result;
	}
	/**
	 * Updates a row
	 *
	 * @return int|bool
	 * @throws \Exception
	 */
	public function save() {
		$new_val_arr = [];

		#If there is not an ID associated with this class or there is nothing that's changed, return 0 and don't do anything
		if (!is_numeric($this->id) || empty($this->_changed)) return 0;

		#Set the update_dt so we know when this record was last changed
		$this->set(['update_dt' => date('Y-m-d H:i:s')]);

		#Iterate through the changed values and add them to the Array of column=>values so we can update them
		foreach ($this->_changed as $key) {
			if (array_key_exists($key, $this->_properties))
				$new_val_arr[$key] = (string)$this->_properties[$key];
			else
				Log::init('Did not save property ' . $key)->log_it();
		}
		$this->_changed = [];
		/** @var \Sm\Database\Sql $sql */
		if (!IoC::resolveSql($sql)) return false;

		#Return the affected rows
		$query_result =
			$sql->update($new_val_arr)
			    ->table(static::$table_name)
			    ->where('id = ' . $this->id)
			    ->run()
			    ->output('row_count');
		return $query_result;
	}
	public function remove($where = null) {
		/** @var \Sm\Database\Sql $sql */
		if (!IoC::resolveSql($sql)) return false;
		if (!isset($where) && isset($this->_properties['id'])) {
			$where = ("id = {$this->_properties['id']}");
		}
		#Return the number of affected rows
		$result = $sql->delete()->table(static::$table_name)->where($where)->run()->output('row_count');
		return $result;
	}

#--------------------------------------| GETTERS
	/**
	 * @return string
	 */
	public static function getMainIntegerKey() {
		return static::$main_int_key;
	}
	/**
	 * Return information about the name of the table. Prefaced with _JSON_ if the Model isn't actually in a table
	 *
	 * @return mixed
	 */
	public static function getTableName() {
		return static::$table_name;
	}
}