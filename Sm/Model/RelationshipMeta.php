<?php
/**
 * User: Sam Washington
 * Date: 3/18/16
 * Time: 9:56 PM
 */

namespace Sm\Model;

class RelationshipMeta implements \JsonSerializable {
	public $_key;
	public $_table           = '';
	public $_list            = [];
	public $_map_type        = '';
	public $_ids             = [];
	public $_linked_entities = [];

	function jsonSerialize() {
		$p = get_object_vars($this);
		foreach ($p as $k => $v) {
			if (is_string($v) && !strlen($v)) unset($p[$k]);
		}
		return $p;
	}
}