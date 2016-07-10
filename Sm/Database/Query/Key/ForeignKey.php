<?php
/**
 * User: Sam Washington
 * Date: 3/27/2015
 * Time: 10:31 AM
 */

namespace Sm\Database\Query\Key;


use Sm\Database\Query\Key\Abstraction\Key;

class ForeignKey extends Key{
    protected $key_type = 'FOREIGN';
    protected $on_delete = 'CASCADE';
    protected $on_update = 'CASCADE';
    protected $referenced_columns = [];
    protected $referenced_table = '';
    protected $name;


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
     * @param null $table
     * @param null $name
     * @return static
     */
    public static function init($table = null, $name = null) {
        return new static($table, $name);
    }

    /**
     * @return string
     */
    public function getOnDelete() {
        return $this->on_delete;
    }

    /**
     * @param string $on_delete
     */
    public function setOnDelete($on_delete) {
        $this->on_delete = $on_delete;
    }

    /**
     * @return string
     */
    public function getOnUpdate() {
        return $this->on_update;
    }

    /**
     * @param string $on_update
     */
    public function setOnUpdate($on_update) {
        $this->on_update = $on_update;
    }

    /**
     * @return array
     */
    public function getReferencedColumns() {
        return $this->referenced_columns;
    }

    /**
     * @param array|string $referenced_columns
     *
     * @return $this
     */
    public function setReferencedColumns($referenced_columns) {
        $this->referenced_columns = is_array($referenced_columns) ? $referenced_columns : func_get_args();
        $this->name = 'fk_'.$this->referenced_table.'_'.$this->referenced_columns[0];
        return $this;
    }

    /**
     * @return null|string
     */
    public function getReferencedTable() {
        return $this->referenced_table;
    }

    function __construct($table, $name = null) {
        parent::__construct('fk_'.$name);
        $this->referenced_table = $table;
    }
}