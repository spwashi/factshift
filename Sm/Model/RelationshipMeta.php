<?php
/**
 * User: Sam Washington
 * Date: 3/18/16
 * Time: 9:56 PM
 */

namespace Sm\Model;

class RelationshipMeta implements \JsonSerializable {
	public $_key;
	public $_table = null;
	public $_list  = [];
	/** @var string $_map_type pipe separated enumeration of the Entity names that are being mapped together. Primary|Secondary. (e.g. Collection|Section) */
	public $_map_type = '';
	public $_ids      = [];
	/**
	 * RelationshipMeta constructor.
	 * @param array  $_linked_entities
	 * @param string $_table
	 * @param        $_key
	 * @param array  $_ids
	 */
	public function __construct(
		$_linked_entities = [],
		$_table = null,
		$_key = '',
		$_ids = []
	) {
		$this->_linked_entities = $_linked_entities;
		$this->_table           = $_table;
		$this->_key             = $_key;
		$this->_map_type        = static::create_map_type_string($_linked_entities);
		$this->_ids             = $_ids;
	}
	public $_linked_entities = [];
	private static function create_map_type_string($linked_entities) {
		$m_s = [];
		foreach ($linked_entities as $k => $v) {
			if (is_array($v)) $m_s[] = implode(',', $v);
			else $m_s[] = $v;
		}
		return implode('|', $m_s);
	}
	function jsonSerialize() {
		$p = get_object_vars($this);
		foreach ($p as $k => $v) {
			if ((is_string($v) && !strlen($v)) || !isset($v)) unset($p[$k]);
			if (is_array($v) && empty($v)) unset($p[$k]);
		}
		return $p;
	}
	public function __debugInfo() {
		return $this->jsonSerialize();
	}
}