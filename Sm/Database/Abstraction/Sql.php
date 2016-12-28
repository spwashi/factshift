<?php
/**
 * User: Sam Washington
 * Date: 3/20/2015
 * Time: 6:24 PM
 */

namespace Sm\Database\Abstraction;

########################################################################################################################################################################################################
abstract class Sql {
    protected $qry;
    /**
     * @var string For the buildQry function, guess the type of query to be built if the optional parameter is not set. This is based on the functions that are called
     * @see Sql::buildQry
     */
    protected $guess_type = '';
    /** @var Connection $connection The connection to the database to use to run the qry */
    protected $connection;
    
    /**
     * @var array $bind_value An array of variables to bind by value
     */
    public $bind_value = [ ];
    /**
     * @var array $bind_reference An array of variables to bind by reference (if applicable)
     */
    public $bind_reference = [ ];
    
    /** @var array Part of the querying components */
    protected $_select       = [ ];
    protected $_from         = [ ];
    protected $_update       = [ ];
    protected $_insert       = [ ];
    protected $_where        = '';
    protected $_on_duplicate = '';
    protected $_table        = '';
    protected $success       = false;

########################################################################################################################################################################################################
    
    /**
     * @param Connection $connection
     *
     * @throws \Exception
     */
    
    function __construct(Connection $connection = null) {
        if ($connection == null) {
            $this->connection = App::_()->IoC->connection;
        } else {
            $this->connection = $connection;
        }
    }
    
    /**
     * @param Connection $connection
     *
     * @return static
     */
    static public function init(Connection $connection = null) {
        return new static($connection);
    }

########################################################################################################################################################################################################
    
    /**
     * Run the query. Change the "success" flag internally.
     *
     * @param bool $log
     *
     * @return mixed
     */
    abstract public function run($log = false);
    
    /**
     * Build the query from the fragments created through the other functions.
     *
     * @param string $type The type of query to build (Select should take something from the 'select', 'from', and 'where' arrays, Update deals with 'update', 'tables',
     * @param bool   $safe Whether or not to try to prevent information from being accidentally overwritten or deleted. Sometimes done by adding a 'WHERE 1=0' if there is no where clause.
     *
     *
     * @return mixed
     */
    abstract public function buildQry($type = null, $safe = false);
    
    /**
     * After running a query, output some data
     *
     * @param string $returnType [num, row(associative), all, num_row, id(lastinsertid), row_count]
     *
     * @return mixed
     */
    abstract public function output($returnType = 'row');
    
    /**
     * Bind an array by value for prepared statements
     *
     * @param array $binding
     *
     * @return mixed
     */
    abstract public function bind(array $binding);
    
    /**
     * Bind an array by reference for prepared statements
     *
     * @param array $binding
     *
     * @return mixed
     */
    abstract public function bindByReference(array &$binding);

########################################################################################################################################################################################################
    public function was_successful() {
        return (bool)$this->success;
    }
    /**
     * @param callable|string $query       Either a function that modifies a new instance of the SQL class or a string to set as the query
     * @param string|bool     $return_type The type of data to return after running the query
     *
     * @return array []
     */
    public function query($query, $return_type = false) {
        if (is_callable($query)) {
            $t = new static($this->connection);
            $query($t);
            $this->qry = $t->buildQry()->qry;
        } else {
            $this->qry = $query;
        }
        $this->run();
        return $this->output($return_type);
    }
    
    /**
     * Add a 'from' clause to the query
     *
     * @param $from
     *
     * @return $this
     */
    public function from($from) {
        if (!is_array($from)) {
            $from = [ $from ];
        }
        $this->_from = $from;
        return $this;
    }
    
    /**
     * Add a 'select' clause to the query
     *
     * @param string|array $select
     *
     * @return $this
     */
    public function select($select) {
        $this->guess_type = 'select';
        if (!is_array($select)) {
            $select = func_get_args();
        }
        $this->_select = $select;
        return $this;
    }
    
    /**
     * Specify the table to be used
     *
     * @param $table
     *
     * @return $this
     */
    public function table($table) {
        $this->_table = (string)$table;
        return $this;
    }
    
    /**
     * Add an 'update' clause to the query
     *
     * @param array $update An array (normally in the form of 'column' => 'value') to populate the
     *
     * @return $this
     */
    public function update($update) {
        $this->guess_type = 'update';
        if (!is_array($update)) {
            $update = [ $update ];
        }
        $this->_update = $update;
        return $this;
    }
    
    /**
     * Specify the columns to be used for the insert clause
     *
     * @param string $insert_columns The columns to insert.
     * @param string $value_columns  The values to be inserted into the columns.
     *
     * @return $this
     */
    public function insert($insert_columns, $value_columns) {
        $this->guess_type                = 'insert';
        $this->_insert['insert_columns'] = $insert_columns;
        $this->_insert['value_columns']  = $value_columns;
        return $this;
    }
    
    /**
     * Make this into a 'delete'
     *
     * @return $this
     */
    public function delete() {
        $this->guess_type = 'delete';
        return $this;
    }
    
    /**
     * @param string $where  The where clause (exactly as the string)
     * @param bool   $append Whether or not the where clause that is tobe added will be appended to the current where clause
     *
     * @return $this
     */
    public function where($where, $append = true) {
        if ($append) {
            $this->_where .= ' ' . $where;
            return $this;
        }
        $this->_where = $where;
        return $this;
    }
    
    /**
     * @param string $on_duplicate The where clause (exactly as the string)
     * @param bool   $append       Whether or not the where clause that is tobe added will be appended to the current where clause
     *
     * @return $this
     */
    public function on_duplicate_key_update($on_duplicate, $append = true) {
        if ($append) {
            $this->_on_duplicate .= ' ' . $on_duplicate;
            return $this;
        }
        $this->_on_duplicate = $on_duplicate;
        return $this;
    }
    
    /**
     * Return the Query, set it to an empty string afterward
     *
     * @return mixed
     */
    public function spitQry() {
        $q         = $this->qry;
        $this->qry = '';
        return $q;
    }
    
    /**
     * Return the query
     *
     * @return mixed
     */
    public function getQry() {
        return $this->qry;
    }
    
    /**
     * Set the query explicitly
     *
     * @param string $qry
     *
     * @return $this
     */
    public function setQry($qry) {
        $this->qry = $qry;
        return $this;
    }
    
    /**
     * Return the object-wrapper instance of this object's connection to the database
     *
     * @return \Sm\Database\Abstraction\Connection
     */
    public function getConnection() {
        return $this->connection;
    }
    
    public function getBound() {
        return [ $this->bind_value, $this->bind_reference ];
    }
}