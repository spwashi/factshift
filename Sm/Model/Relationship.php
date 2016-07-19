<?php
/**
 * User: Sam Washington
 * Date: 3/18/16
 * Time: 9:55 PM
 */

namespace Sm\Model;

/**
 * Class Relationship
 * @package Sm\Model
 */
class Relationship implements \JsonSerializable {
	/** @var $_meta RelationshipMeta */
	public $_meta;
	/** @var Map */
	public $_map;
	/** @var null|int|string */
	public $position;
	/** @var $model Model */
	public $model = false;
	public function __construct($map = false, $model = false) {
		if ($model) $this->model = $model;
		if ($map) $this->_map = $map;
		$this->_meta = new RelationshipMeta();
	}

	public function JsonSerialize() {
		$properties = [
			'_meta'    => $this->_meta,
			'_map'     => $this->_map,
			'position' => $this->position,
			'model'    => $this->model ?: null
		];
		if (!isset($properties['position'])) unset($properties['position']);
		if (!isset($properties['model'])) unset($properties['model']);
		return $properties;
	}
}