<?php
/**
 * User: Sam Washington
 * Date: 3/21/2015
 * Time: 10:03 PM
 */

namespace Sm\Model\Abstraction;

use Sm\Model\ModelMeta;
use Sm\Model\RelationshipIndex;
use Sm\Model\RelationshipIndexContainer;

/**
 * Class Model
 *
 * @package Sm\Model\Abstraction
 * @property int                        $id                          Unique row identifier
 * @property int                        $ent_id                      Unique Model identifier
 * @property string                     $creation_dt                 Datetime of creation
 * @property string                     $update_dt                   Datetime of row update
 * @property RelationshipIndexContainer $maps                        An array of relationships the model has
 */
abstract class Model implements \JsonSerializable {
	/** @var string The name of the table that we are going to be dealing with */
	protected static $table_name;
	/** @var string When we're given a number as the thing to find with, assume that it belongs with this. It's probably the ID */
	protected static $main_int_key = 'id';
	/** @var string When we're given a string to find, what will we assume the string is referring to? Usually the ent_id, maybe the alias */
	protected static $main_string_key = 'ent_id';

	/** @var bool Can we find all of the rows of this table? */
	protected static $find_all_able = false;
	/** @var string What are we mapping? Primary|Secondary, e.g. Section|Concept */
	public static $_map_type = '';
	/** @var array The properties that can be set via API */
	public static $api_settable_properties;
	/** @var array The properties that can be gotten via API */
	public static $api_gettable_properties;
	/** @var string A string that will be prepended to the ent_id of models that come from this table */
	public static $table_prefix = '';

	/** @var array An array of the properties that the class will be instantiated with */
	protected static $default_properties = [];
	/** @var array */
	protected $_properties = [];
	/** @var RelationshipIndex */
	protected $_relationships = null;
	/** @var bool|string When did we last find the permissions of this class? todo */
	protected $_permissions_found = false;
	/** @var array What are the permissions of the current user in interacting with this class? */
	protected $_permissions = [
		'edit'    => false,
		'view'    => false,
		'destroy' => false,
	];

	/** @var array An array of the variables that have been changed; useful for row saving and updating */
	protected $_changed = [];
	/**
	 * Return a boolean if we are or are not allowed to do something
	 * @param $action
	 * @return bool
	 */
	public function user_can($action) {
		if ($action == 'delete') $action = 'destroy';
		else if ($action == 'update') $action = 'edit';
		return $this->_permissions_found && isset($this->_permissions[$action]) ? $this->_permissions[$action] : false;
	}
	protected static function __initialize() {
		if (!ModelMeta::is_init(static::class)) {
			static::$default_properties = ModelMeta::_get_def_props(static::class, ModelMeta::FIND_DEFAULT);

			static::$table_prefix = ModelMeta::convert_to_something(static::class, ModelMeta::TYPE_PREFIX);
			static::$table_prefix = static::$table_prefix ?: '';
			$tmp                  = ModelMeta::convert_to_something(static::class, ModelMeta::TYPE_TABLE);
			static::$table_name   = $tmp ?: static::$table_name;

			static::$api_settable_properties = ModelMeta::_get_def_props(static::class, ModelMeta::FIND_API_SET);
			ModelMeta::add_as_init(static::class);
			return true;
		}
		return null;
	}
	public static function init($properties = null, $check_change = false) {
		return new static($properties, $check_change);
	}
	/**
	 * @param null       $properties   What are the beginning properties of this class?
	 * @param bool|false $check_change Should we mark the properties as new?
	 */
	public function __construct($properties = null, $check_change = false) {
		static::__initialize();
		$this->_properties = static::$default_properties;

		if (is_array($properties)) $this->set($properties, $check_change);
	}
	abstract public function findPermissions();

	public static function has_property($property) {
		return array_key_exists($property, static::$default_properties);
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
	 * @param bool  $verify
	 *
	 * @return $this
	 */
	abstract public function set(array $values, $check_change = true, $verify = false);
	/**
	 * Creates a row of the given table based on the properties of the Model that have changed
	 *
	 *
	 * @return bool|int
	 * @throws \Exception
	 */
	abstract public function create();
	/**
	 * Updates a Model on a database (or whatever)
	 *
	 * @return int|bool
	 * @throws \Exception
	 */
	abstract public function save();
	/**
	 * Remove the existence of an entity from a table (or wherever)
	 *
	 * @param {string|null=} $where Optional string parameter. Provides more information about what we want to delete
	 *
	 * @return mixed
	 */
	abstract public function remove($where = null);

#--------------------------------------| MAGIC METHODS
	public function __isset($name) {
		static::__initialize();
		return isset($this->_properties[$name]);
	}
	public function __toString() {
		static::__initialize();
		return json_encode($this, JSON_HEX_APOS);
	}
	/**
	 * Magic method for getting properties
	 *
	 * @param $name
	 *
	 * @return array|\Sm\Model\RelationshipIndex
	 */
	public function &__get($name) {
		static::__initialize();
		/**
		 * The "maps" property is a magic property that creates a relationship holder dynamically.
		 * This property holds information about all of the different relationships that this Model is a part of
		 */
		if ($name == 'maps') {
			$this->_relationships = ($this->_relationships instanceof RelationshipIndexContainer)
				? $this->_relationships
				: new RelationshipIndexContainer(ModelMeta::_get_def_props(static::class, ModelMeta::FIND_BOTH_RELATIONSHIPS), $this);
			return $this->_relationships;
		}

		$val = isset($this->_properties[$name]) ? $this->_properties[$name] : null;
		if (isset($this->_properties[$name])) {
			if (is_numeric($val) && !is_float($val)) {
				$this->_properties[$name] = intval($this->_properties[$name]);
			}
			return $this->_properties[$name];
		} else {
			$this->_properties[$name] = null;
			return $this->_properties[$name];
		}
	}
	public function __set($name, $value) {
		static::__initialize();
		//Map remix is a readonly property as it is not actually something that exists in the class
		if ($name == 'maps') return;
		if ($name != "ent_id" && strpos($name, '_id')) {
			if ($value instanceof Model) {
				return;
			}
		}
		$this->set([$name => $value]);
	}
	public function jsonSerialize() {
		$arr                  = $this->_properties;
		$arr['_model_type']   = static::getModelType();
		$arr['relationships'] = $this->_relationships;
		$arr['_permissions']  = $this->findPermissions();
		return $arr;
	}
	public function __debugInfo() {
		return $this->jsonSerialize();
	}

#--------------------------------------| GETTERS
	/**
	 * Get the Important bit about which Class we're in
	 *
	 * @return mixed
	 */
	public static function getModelType() {
		$name_arr = explode('\\', static::class);
		return $name_arr[count($name_arr) - 1];
	}
	/**
	 * Get the array of changed variables
	 *
	 * @return array
	 */
	public function getChanged() {
		return $this->_changed;
	}
	/**
	 * Get an array of the default properties and their default values (if available)
	 *
	 * @return array
	 */
	protected function getDefaultProperties() {
		return static::$default_properties;
	}
}