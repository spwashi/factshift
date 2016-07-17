<?php
/**
 * User: Sam Washington
 * Date: 7/16/16
 * Time: 5:32 PM
 */

namespace Sm\Model;

use Sm\Core\Inflector;
use Sm\Development\Log;

class RelationshipIndexContainer implements \JsonSerializable {
	protected $relationship_indices = [];
	protected $gotten               = [];
	protected $hidden               = [];
	protected $ParentModel          = null;
	public function __construct($relationship_indexes, $ParentModel) {
		$this->ParentModel = $ParentModel;
		foreach ($relationship_indexes as $key => $value) {
			var_dump($value);
		}
	}
	public function jsonSerialize() {
		$properties           = [];
		$relationship_indices = $this->relationship_indices;
		foreach ($relationship_indices as $name => $RelationshipIndex) {
			if (!($this->gotten[$name] ?? false)) continue;
			$properties[$name] = $RelationshipIndex;
		}
	}
	/**
	 * Retrieve the relationship index at a specific index. If there is none, create one
	 * @param string $index        The index we are trying to find a relationship at
	 * @param string $mapped_table The name of the table to base it on
	 * @return RelationshipIndex
	 */
	public function &getRelationshipIndex($index, $mapped_table) {
		if (!isset($this->relationship_indices[$index])) {
			$this->relationship_indices[$index] = $this->init_rel($mapped_table, [], $index);
			Log::init($this->relationship_indices)->log_it();
		}
		$this->gotten[$index] = true;
		return $this->relationship_indices[$index];
	}
	public function &__get($name) {
		if (!isset($this->relationship_indices[$name])) {
			$this->relationship_indices[$name] = new RelationshipIndex($name);
		}
		$this->gotten[$name] = true;
		return $this->relationship_indices[$name];
	}
	/**
	 * Create a relationship index based on another index. If we have an index (say, 'children') that we are mapping relationships in,
	 * this creates and initializes a relationship holder with that index based on the table specified (say, 'sections'). This is useful if distinguishing muptliple relationships
	 * that come from the same table
	 * @param            $mapped_table
	 * @param array      $relationship_index
	 * @param bool|false $index
	 * @return array|RelationshipIndex
	 */
	public function init_rel($mapped_table, $relationship_index = [], $index = false) {
		$own_table          = $this->own_table;
		$singular_own_table = Inflector::singularize($own_table);
		$singular_k         = Inflector::singularize($mapped_table);
		if (!($relationship_index instanceof RelationshipIndex)) $relationship_index = new RelationshipIndex($mapped_table);
		$relationship_index->setIndex($index);
		if (!isset($relationship_index->_meta->_key) || trim($relationship_index->_meta->_key) == '') {
			$_key                            = ($own_table != $mapped_table) ? "{$singular_k}_id" : "secondary_{$singular_k}_id";
			$relationship_index->_meta->_key = $_key;
		}

		if (!isset($relationship_index->_meta->_table)) {
			$table_name = "{$singular_own_table}_{$singular_k}_map";
			if (ModelMeta::table_exists($table_name)) {
				$relationship_index->_meta->_table = $table_name;
			} else {
				$table_name = "{$singular_k}_{$singular_own_table}_map";
				if (ModelMeta::table_exists($table_name)) $relationship_index->_meta->_table = $table_name;
			}
		}

		if (!isset($relationship_index->_meta->_ids) || !is_array($relationship_index->_meta->_ids)) {
			if ($own_table != $mapped_table) {
				$relationship_index->_meta->_ids = ["{$singular_own_table}_id", "{$singular_k}_id"];
			} else {
				$relationship_index->_meta->_ids = ["primary_{$singular_own_table}_id", "secondary_{$singular_k}_id"];
			}
		}
		if (!isset($relationship_index->_meta->_list)) {
			$relationship_index->_meta->_list = [];
		}
		return $relationship_index;
	}

}