<?php
/**
 * User: Sam Washington
 * Date: 3/19/16
 * Time: 9:17 PM
 */

namespace Sm\Model;

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
	protected $properties = [];
	protected $index;
	protected $own_table;
	/**
	 * We only want to serialize the values that we've actually dealt with
	 * @var array
	 */
	protected $gotten      = [];
	protected $hidden      = [];
	protected $is_beginner = false;
	public function __construct($own_table) {
		$this->own_table = $own_table;
		$this->index     = $own_table;
		$this->_meta     = new RelationshipMeta();
	}
	public function setIndex($index) {
		$this->index = $index ?: $this->index;
	}
	public function jsonSerialize() {
		$properties = ['index' => $this->index, 'items' => []];
		foreach ($this->properties as $name => $val) {
			if (strpos($name, '_tmp')) {
				unset($this->properties[$name]);
				continue;
			}
			if (!isset($this->gotten[$name]) && $this->is_beginner) continue;
			if (isset($this->hidden[$name])) continue;
			$properties['items'][$name] = $val;
			if (strpos($this->index, 'reciprocal') === 0) {
				$properties['items'][$name]->model = null;
			}
		}
		if (!$this->is_beginner) $properties['_meta'] = $this->_meta;
		else unset($properties['index']);
		return $properties;
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
		return $this->properties[$name];
	}

	/**
	 * Check to see if an relationship is in the properties list by its identifier
	 * @param $identifier
	 * @return bool
	 */
	public function has($identifier) {
		return isset($this->properties[$identifier]);
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
			if (is_object($this->properties[$a]) && $this->properties[$a]->position)
				return strcmp($this->properties[$a]->position, $this->properties[$b]->position);
			return 0;
		});
		foreach ($this->_meta->_list as $id) {
			if (!isset($this->properties[$id])) continue;
			if (isset($this->hidden[$id])) continue;
			$item[$id] = $this->properties[$id];
			if ($only_models && $item[$id]->model) $item[$id] = $item[$id]->model;
		}
		return $item;
	}

	/**
	 * @param Model $Model
	 * @return int|string
	 */
	public function locate_Model($Model) {
		foreach ($this->properties as $key => $value) {
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
		if ($identifier && $this->has($identifier)) return $this->properties[$identifier];
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
			if (!array_key_exists($identifier, $this->properties)) {
				$this->_meta->_list[] = $identifier;
			}
			$this->properties[$identifier] = $relationship;
		} else {
			if (!in_array($relationship, $this->properties)) {
				$this->_meta->_list[] = $identifier;
			}
			$this->properties[] = $relationship;
		}
	}
}