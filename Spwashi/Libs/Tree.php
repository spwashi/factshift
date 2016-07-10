<?php
/**
 * User: sam
 * Date: 6/14/15
 * Time: 10:30 AM
 */

namespace Spwashi\Libs;


class Tree {

	protected $flat_array = [ ];
	protected $tree       = [ ];

	public static function init(array $tree) {
		return new static($tree);
	}

	public function __construct(array $tree) {
		$this->flat_array = $tree;
	}

	public function setFlatArray($flat_array) {
		$this->flat_array = $flat_array;
	}

	public function getFlatArray() {
		return $this->flat_array;
	}

	public function convertToTree($id_field = 'id', $parent_id_field = 'parent_id', $child_nodes_field = 'children') {
		$indexed = [ ];
		$flat_array = $this->flat_array;
		foreach ($flat_array as $row) {
			$indexed[ $row[ $id_field ] ] = $row;
			$indexed[ $row[ $id_field ] ][ $child_nodes_field ] = [ ];
		}

		$root = null;
		foreach ($indexed as $id => $node) {
			$indexed[ $node[ $parent_id_field ] ][ $child_nodes_field ][ $id ] =& $indexed[ $id ];
			if ($node[ $parent_id_field ] == null) {
				$root = $id;
			}
		}

		return $this->tree = [ $root => $indexed[ $root ] ];
	}

}