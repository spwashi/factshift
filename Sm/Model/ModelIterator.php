<?php
/**
 * User: Sam Washington
 * Date: 3/21/2015
 * Time: 11:15 PM
 */

namespace Sm\Model;

class ModelIterator implements \Iterator, \JsonSerializable {
	private $position  = 0;
	private $model_ids = [];
	private $models    = [];

	public function __construct($items = null) {
		if (isset($items)) $this->push($items);
		$this->position = 0;
	}

	public function length() {
		return count($this->model_ids);
	}

	/**
	 * @param Model|Model[] $item
	 */
	public function push($item) {
		if ($item instanceof Model) {
			$id                = isset($item->ent_id) && strlen($item->ent_id) ? $item->ent_id : $item->getModelType() . '|' . $item->id;
			$this->model_ids[] = $id;
			$this->models[$id] = $item;
		} else if (is_array($item)) {
			foreach ($item as $value) {
				$this->push($value);
			}
		}
	}

	function rewind() {
		$this->position = 0;
	}

	function current() {
		return $this->models[$this->model_ids[$this->position]];
	}

	function key() {
		return $this->model_ids[$this->position];
	}

	function next() {
		++$this->position;
	}

	function valid() {
		if (isset($this->model_ids[$this->position])) {
			$position = $this->model_ids[$this->position];
		} else return false;
		return isset($this->models[$position]);
	}
	function jsonSerialize() {
		$return_array = [];
		foreach ($this->model_ids as $position => $id) {
			$return_array[] = $this->models[$id];
		}
		return $return_array;
	}
	public function __toString() {
		return json_encode($this);
	}
}