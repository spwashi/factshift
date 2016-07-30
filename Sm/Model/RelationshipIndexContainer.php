<?php
/**
 * User: Sam Washington
 * Date: 7/16/16
 * Time: 5:32 PM
 */

namespace Sm\Model;

use Sm\Core\Inflector;

/**
 * @property \Sm\Model\RelationshipIndex sections
 * @property \Sm\Model\RelationshipIndex universes
 * @property \Sm\Model\RelationshipIndex concepts
 * @property \Sm\Model\RelationshipIndex composition
 * @property \Sm\Model\RelationshipIndex children
 */
class RelationshipIndexContainer implements \JsonSerializable {
	protected $relationship_indices = [];
	protected $gotten               = [];
	protected $hidden               = [];
	/** @var Model */
	protected $ParentModel = null;
	public function __construct($relationship_indexes, $ParentModel) {
		$this->ParentModel = $ParentModel;
		foreach ($relationship_indexes as $key => $value) {
			$r = $this->relationship_indices[$key] = new RelationshipIndex($value, $key);
		}
	}
	public function jsonSerialize() {
		$properties           = [];
		$relationship_indices = $this->relationship_indices;
		foreach ($relationship_indices as $name => $RelationshipIndex) {
			/** @var RelationshipIndex $RelationshipIndex */
//			if (!($this->gotten[$name] ?? false)) continue;
			if (!count($RelationshipIndex->get_items())) continue;
			$properties[$name] = $RelationshipIndex;
		}
		return $properties;
	}
	public function __debugInfo() {
		return $this->jsonSerialize();
	}
	/**
	 * Retrieve the relationship index at a specific index. If there is none, create one.
	 * Contains logic to determine where a relationship index should reside based on the index provided
	 * @param string               $index          The index we are trying to find a relationship at
	 * @param null|Model|Map|array $map_properties Maybe the properties will change the way stuff works?
	 * @param bool                 $is_reciprocal
	 * @param string               $mapped_table   The name of the table to base it on
	 * @return RelationshipIndex
	 */
	public function &getRelationshipIndex($index, $map_properties = null, $is_reciprocal = false, $mapped_table = null) {
		if ($index instanceof Model) $index = $index->getTableName();
		$index                  = strtolower($index);
		$mapped_table           = $mapped_table ?? $index;
		$r_name                 = 'reciprocal_' . $index;
		$reciprocity_matters    = false;
		$parent_model_tablename = $this->ParentModel->getTableName();
		//Try to guess the Relationship Index from what the ModelMeta class knows about it
		$checked_relationship = ModelMeta::get_potential_relationships([$parent_model_tablename, $mapped_table]);
		$count                = count($checked_relationship);

		if ($is_reciprocal) {
			//Check the relationship from the other side (b/c Section|Dictionary yields dictionaries but Dictionary|Section yields definitions. Reciprocity doesn't matter there)
			//It does matter when the relationship indices could be the same. For example, when Sections are being mapped together. All of their relationships are the same.
			$reciprocal_checked_relationship = ModelMeta::get_potential_relationships([$mapped_table, $parent_model_tablename]);
			$chk_keys                        = array_keys($checked_relationship);
			$r_chk_keys                      = array_keys($reciprocal_checked_relationship);
			if ($count == count($reciprocal_checked_relationship)) {
				//Check to see if the reciprocal keys are the same. If so, reciprocity matters.
				foreach ($r_chk_keys as $_key => $_index) {
					$reciprocity_matters = ($chk_keys[$_key] == $_index);
					if ($reciprocity_matters) break;
				}
			} else {
				$reciprocity_matters = true;
			}
		}
		$index_to_tablename = ModelMeta::convert_to_something($index, ModelMeta::TYPE_TABLE);
		if ($this->relationship_indices[$index] ?? false) {
			$gotten_name = $index;
		} else if ($index && ($this->relationship_indices[$index_to_tablename] ?? false)) {
			$gotten_name = $index_to_tablename;
		} else {
			if ($count === 1) {
				$gotten_name          = array_keys($checked_relationship)[0];
				$checked_relationship = $checked_relationship[$gotten_name];
			} else if ($count) {
				$gotten_name = $index;
				$actual      = [];
				$_rel_type   = false;
				if (is_array($map_properties)) {
					$_rel_type = $map_properties['relationship_type'] ?? false;
				} else if ($map_properties && is_object($map_properties)) {
					$_rel_type = $map_properties->relationship_type ?? false;
				}
				//loop through the relationship types. If there are map properties that identify one of them as the actual relationship we're looking for,
				//go with that. Otherwise, create a generic catch-all kind of relationship index.
				foreach ($checked_relationship as $l_relationship_index => $l_relationship_properties) {
					if ($_rel_type && ($_rel_type === ($l_relationship_properties['id'] ?? false))) {
						$actual      = $l_relationship_properties;
						$gotten_name = $l_relationship_index;
						break;
					}
					foreach ($l_relationship_properties as $property_index => $property_value) {
						$actual[$property_index] = $actual[$property_index] ?? $property_value;
						if ($actual[$property_index] == $property_value) continue;
						//todo is it best to assume that all are different values? This way, it's difficult to tell when something branches off from the rest
						if (!is_array($actual[$property_index])) $actual[$property_index] = (array)$actual[$property_index];
						$actual[$property_index][] = $property_value;
					}
				}
				$checked_relationship = $actual;
			} else if ($this->relationship_indices[$r_name] ?? false) {
				//Maybe the relationship is stored in the "relationship indices" thing
				$gotten_name = $r_name;
			} else {
				$gotten_name          = $index;
				$checked_relationship = [];
			}
			if ($is_reciprocal && $reciprocity_matters) {
				if (strpos($gotten_name, 'reciprocal_')) $gotten_name = str_replace('reciprocal_', '', $gotten_name);
				else $gotten_name = "reciprocal_{$gotten_name}";
			}
			$this->relationship_indices[$gotten_name] = $this->relationship_indices[$gotten_name] ?? $this->init_rel($mapped_table, $checked_relationship, $index);
		}
		$this->gotten[$gotten_name] = true;
		$this->gotten[$index]       = true;
		return $this->relationship_indices[$gotten_name];
	}
	public function mark_gotten($name) {
		$this->gotten[$name] = true;
	}
	public function &__get($name) {
		return $this->getRelationshipIndex($name);
	}
	/**
	 * Create a relationship index based on another index. If we have an index (say, 'children') that we are mapping relationships in,
	 * this creates and initializes a relationship holder with that index based on the table specified (say, 'sections'). This is useful if distinguishing muptliple relationships
	 * that come from the same table
	 * @param            $mapped_table
	 * @param array      $relationship_properties
	 * @param bool|false $index
	 * @return array|RelationshipIndex
	 */
	public function init_rel($mapped_table, $relationship_properties = [], $index = false) {
		$own_table          = $this->ParentModel->getTableName();
		$singular_own_table = Inflector::singularize($own_table);
		$singular_k         = Inflector::singularize($mapped_table);
		$relationship_index = $relationship_properties;
		if (!($relationship_index instanceof RelationshipIndex)) $relationship_index = new RelationshipIndex($relationship_properties, $mapped_table);
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
	/**
	 * @return RelationshipIndex[]
	 */
	public function get_items() {
		return $this->relationship_indices;
	}
}