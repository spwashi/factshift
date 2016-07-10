<?php
/**
 * User: Sam Washington
 * Date: 3/23/2015
 * Time: 11:53 PM
 */

namespace Sm\Database\Grammar\Abstraction;


use Sm\Database\Query\SchemaQuery;

abstract class Grammar {
    protected $table_name;
    abstract public function createTable(SchemaQuery $schemaQuery, $table_name = null);

    /**
     * @return mixed
     */
    public function getTableName() {
        return $this->table_name;
    }

    /**
     * @param mixed $table_name
     */
    public function setTableName($table_name) {
        $this->table_name = $table_name;
    }
}