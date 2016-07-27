<?php
/**
 * User: Sam Washington
 * Date: 3/19/16
 * Time: 9:17 PM
 */

namespace Sm\Model;

use Sm\Development\Log;

/**
 * Class Relator
 * A container for Relationships or Relationship containers\
 * Each Model can have relationships. These relationships are stored in relationship indices called RelatorRemixes.\
 * Each different index is stored in a RelatorRemix that the class holds for convenience. Maybe not have a native RelatorRemix? todo"
 * @package Sm\Model
 * @property RelationshipIndex $micros
 * @property RelationshipIndex $composition
 * @property RelationshipIndex $children
 * @property RelationshipIndex $pivots
 * @property RelationshipIndex $collections
 * @property RelationshipIndex $dimensions
 * @property RelationshipIndex $dictionaries
 * @property RelationshipIndex $collections_tmp
 * @property RelationshipIndex $users
 * @property RelationshipIndex $sections
 * @property RelationshipIndex $concepts
 * @property RelationshipIndex $pages
 * @property RelationshipIndex $universes
 */
class RelationshipIndex implements \JsonSerializable {
	/** @var $_meta RelationshipMeta */
	public    $_meta;
	protected $items = [];
	protected $index;
	/** @var $other_table_name string The name of the table that was being mapped */
	protected $other_table_name;
	protected $is_reciprocal = false;
	/**
	 * We only want to serialize the values that we've actually dealt with
	 * @var array
	 */
	protected $gotten      = [];
	protected $hidden      = [];
	protected $is_beginner = false;
	public function __construct($properties, $index = false) {
		if (is_string($properties)) {
			Log::init([$properties, $index])->log_it();
			return;
		}
		$le = $properties['linked_entities'] ?? [];
		if ($index instanceof Model) $index = $index->getTableName();
		if (!$le) Log::init([$properties, $index])->log_it();
		if (strpos($index, 'reciprocal_') > -1) $this->is_reciprocal = true;

		if (!is_array($le[0]??false) && !is_array($le[1] ?? false))
			$own_table = ModelMeta::get_map_between($le[0] ?? false, $le[1] ?? false, ModelMeta::TYPE_TABLE);
		else
			$own_table = null;
		$this->other_table_name = ModelMeta::convert_to_something($properties['model_type'] ?? false, ModelMeta::TYPE_TABLE);
		$this->index            = $index;
		$pk                     = $properties['primary_key'] ?? false;
		$sk                     = $properties['secondary_key'] ?? false;
		$this->_meta            = new RelationshipMeta($le,
		                                               $own_table,
		                                               $sk ?? false,
		                                               [$pk, $sk]);
	}
	public function setIndex($index) {
		$this->index = $index ?: $this->index;
	}
	public function jsonSerialize() {
		$properties = ['index' => $this->index, 'items' => [], 'is_reciprocal' => $this->is_reciprocal];
		foreach ($this->items as $name => $val) {
			if (strpos($name, '_tmp')) {
				unset($this->items[$name]);
				continue;
			}
			if (isset($this->hidden[$name])) continue;
			$properties['items'][$name] = $val;
			if (strpos($this->index, 'reciprocal') === 0) {
				$properties['items'][$name]->model = null;
			}
		}
		$properties['_meta'] = $this->_meta;
		return $properties;
	}
	public function getMapTableName() {
		return $this->_meta->_table ?? false;
	}
	public function get_other_tablename() {
		return $this->other_table_name;
	}
	public function get_relationship_index() {
		return $this->index;
	}
	public function __debugInfo() {
		return $this->jsonSerialize();
	}
	/**
	 * Retrieve an index from the properties array and add that index name to a "gotten" array. This array keeps track of the indexes that we have used to streamline encoding
	 * @param $name
	 * @return mixed
	 */
	public function &__get($name) {
		return $this->items[$name];
	}

	/**
	 * Check to see if an relationship is in the properties list by its identifier
	 * @param $identifier
	 * @return bool
	 */
	public function has($identifier) {
		return isset($this->items[$identifier]);
	}

	public function hide($identifier) {
		if (is_array($identifier)) {
			foreach ($identifier as $id) {
				$this->hide($id);
			}
		} else if ($identifier)
			$this->hidden[] = $identifier;
		return $this;
	}

	/**
	 * Get all of the items (organized by position) from this RelatorRemix. This either returns a RelatorRemix array, Relationship array, or Model array
	 * @param bool|false $only_models If we only want to get the Models from the RelatorRemix, we put those in an array and return it
	 * @return Relationship[]|Model[]|RelationshipIndex[]
	 */
	public function get_items($only_models = false) {
		$item = [];
		usort($this->_meta->_list, function ($a, $b) {
			if (is_object($this->items[$a]) && $this->items[$a]->position)
				return strcmp($this->items[$a]->position, $this->items[$b]->position);
			return 0;
		});
		foreach ($this->_meta->_list as $id) {
			if (!isset($this->items[$id])) continue;
			if (isset($this->hidden[$id])) continue;
			$item[$id] = $this->items[$id];
			if ($only_models && $item[$id]->model) $item[$id] = $item[$id]->model;
		}
		return $item;
	}

	/**
	 * @param Model $Model
	 * @return int|string
	 */
	public function locate_Model($Model) {
		foreach ($this->items as $key => $value) {
			if ($value === $Model) return $key;
			if ($Model instanceof Model) {
				if ($key == $Model->id || $key == $Model->ent_id || $key == $Model->getModelType() . '|' . $Model->id) return $key;
			} else if (is_string($Model)) {
				if ($key == $Model) return $key;
			}
		}
		return false;
	}

	/**
	 * Get the item at a specific index if applicable
	 * @param $identifier
	 * @return Relationship
	 */
	public function get_item_at_index($identifier) {
		if ($identifier && $this->has($identifier)) return $this->items[$identifier];
		return new Relationship();
	}

	/**
	 * Add a relationship ar a specified index (or just append)
	 * @param Relationship|RelationshipIndex $relationship
	 * @param bool|false                     $identifier What is the identifier of the Relationship we're adding? Add that to the list if it isn't there already
	 *                                                   todo splicing
	 */
	public function push($relationship, $identifier = false) {
		if ($identifier) {
			if (!array_key_exists($identifier, $this->items)) {
				$this->_meta->_list[] = $identifier;
			}
			$this->items[$identifier] = $relationship;
		} else {
			if (!in_array($relationship, $this->items)) {
				$this->_meta->_list[] = $identifier;
			}
			$this->items[] = $relationship;
		}
	}
}