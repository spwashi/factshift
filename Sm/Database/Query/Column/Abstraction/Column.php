<?php
/**
 * User: Sam Washington
 * Date: 3/23/2015
 * Time: 11:44 AM
 */

namespace Sm\Database\Query\Column\Abstraction;


abstract class Column {
    protected $length;
    protected $name;
    protected $comment = null;
    protected $default_value = null;
    protected $nullable = true;
    protected $unique = false;
    protected $primary = false;
    protected $key = false;
    protected $foreign_key = [];

    /**
     * @return array
     */
    public function getForeignKey() {
        return $this->foreign_key;
    }

    /**
     * @param $table
     * @param $referenced_column
     * @return $this
     */
    public function setForeignKey($table, $referenced_column) {
        $this->foreign_key['table'] = $table;
        $this->foreign_key['column'] = $referenced_column;
        return $this;
    }
    public static $column_type;

    function __construct($name, $length = null) {
        $this->name = $name;
        if($length){
            $this->length = $length;
        }
    }

    /**
     * @return mixed
     */
    public function getLength() {
        return $this->length;
    }

    /**
     * @return mixed
     */
    public function getName() {
        return $this->name;
    }

    /**
     * @return null
     */
    public function getComment() {
        return $this->comment;
    }

    /**
     * @return null
     */
    public function getDefaultValue() {
        return $this->default_value;
    }

    /**
     * @return boolean
     */
    public function isNullable() {
        return $this->nullable;
    }

    /**
     * @return mixed
     */
    public static function getType() {
        return static::$column_type;
    }

    public static function init($name = null, $length = null) {
        return new static($name, $length);
    }

	/**
	 * @param mixed $length
	 *
	 * @return $this
	 */
    public function setLength($length) {
        $this->length = $length;
        return $this;
    }

	/**
	 * @param mixed $name
	 *
	 * @return $this
	 */
    public function setName($name) {
        $this->name = $name;
        return $this;
    }

	/**
	 * @param null $comment
	 *
	 * @return $this
	 */
    public function setComment($comment) {
        $this->comment = $comment;
        return $this;
    }

	/**
	 * @param null $default_value
	 *
	 * @return $this
	 */
    public function setDefaultValue($default_value) {
        $this->default_value = $default_value;
        return $this;
    }

    /**
     * @param boolean $nullable
     * @return $this
     */
    public function setNullable($nullable = true) {
        $this->nullable = $nullable;
        return $this;
    }

    /**
     * @return boolean
     */
    public function isUnique() {
        return $this->unique;
    }

	/**
	 * @param boolean $unique
	 *
	 * @return $this
	 */
    public function setUnique($unique = true) {
        $this->unique = $unique;
        return $this;
    }

    /**
     * @return boolean
     */
    public function isKey() {
        return $this->key;
    }

	/**
	 * @param boolean $key
	 *
	 * @return $this
	 */
    public function setKey($key = true) {
        $this->key = $key;
        return $this;
    }

    /**
     * @return boolean
     */
    public function isPrimary() {
        return $this->primary;
    }

	/**
	 * @param boolean $primary
	 *
	 * @return $this
	 */
    public function setPrimary($primary = true) {
        $this->primary = $primary;
        return $this;
    }
}