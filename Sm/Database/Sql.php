<?php
/**
 * User: Sam Washington
 * Date: 3/20/2015
 * Time: 9:51 PM
 */

namespace Sm\Database;

########################################################################################################################################################################################################
use Sm\Development\Log;

class Sql extends Abstraction\Sql {
    protected $qry = '';
    
    /**
     * @var string For the buildQry function, guess the type of query to be built if the optional parameter is not set.
     *      This is based on the functions that are called
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
    protected $_select = [ ];
    protected $_from   = [ ];
    protected $_update = [ ];
    protected $_insert = [ ];
    protected $_where  = '';
    protected $_table  = '';
    /** @var  \PDOStatement  The prepared statement of the class */
    protected $sth;
    /** @var bool $backtick Surround column names in backticks or no? */
    static $backtick = false;

########################################################################################################################################################################################################

########################################################################################################################################################################################################
    public function __toString() {
        return $this->qry;
    }
    
    public function run($log = false) {
        if (!$this->connection) {
            Log::init('Could not execute query because of moot connection to Database', debug_backtrace()[0], 'log')->log_it();
        }
        $this->buildQry();
        try {
            /** @var \PDO $DBH */
            $DBH = $this->connection->getConnection();
            if (!$DBH) throw new \Exception;
            $this->sth = $DBH->prepare($this->qry);
            if ($log) {
                $qry = str_replace("\n", "\n\t\t", $this->qry);
                $qry = "\n\t\t" . $qry;
                Log::init([ 'qry' => $qry, 'bv' => $this->bind_value, 'br' => $this->bind_reference ])->log_it();
            }
            if ($this->sth == false) {
                throw new \Exception('There was a problem with the query');
            }
            if (!empty($this->bind_value)) {
                foreach ($this->bind_value as $bind_key => $b_val) {
                    $this->sth->bindValue($bind_key, $b_val);
                }
                $this->bind_value = [ ];
            }
            if (!empty($this->bind_reference)) {
                foreach ($this->bind_reference as $bind_key => &$b_val) {
                    $this->sth->bindParam($bind_key, $b_val);
                }
                $this->bind_reference = [ ];
            }
            $this->success = $this->sth->execute();
        } catch (\Exception $e) {
            $qry = str_replace("\n", "\n\t\t", $this->qry);
            $qry = "\n\t\t" . $qry;
            Log::init([ $e->getMessage(), $qry ], debug_backtrace()[0], 'log', $e->getCode())->log_it();
        }
        return $this;
    }
    
    /**
     * Return the results of the query
     *
     * @param string $returnType
     *
     * @return array|bool|mixed
     */
    public function output($returnType = 'row') {
        if ($this->sth != false && $returnType != false) {
            try {
                switch ($returnType) {
                    case 'num':
                        return $this->sth->fetchAll(\PDO::FETCH_NUM);
                        break;
                    case 'row':
                        return $this->sth->fetch(\PDO::FETCH_ASSOC);
                        break;
                    case 'num_row':
                        return $this->sth->fetch(\PDO::FETCH_NUM);
                        break;
                    case 'id':
                        return $this->connection->getConnection()->lastInsertId();
                        break;
                    case 'all':
                        return $this->sth->fetchAll(\PDO::FETCH_ASSOC);
                        break;
                    default:
                    case 'row_count':
                        return $this->sth->rowCount();
                        break;
                }
            } catch (\Exception $e) {
                Log::init($e->getMessage(), null, 'log', $e->getCode())->log_it();
            }
        } else {
            Log::init([ $this->sth, $returnType ])->log_it();
        }
        return false;
    }

#####################
    
    public function bind(array $binding) {
        foreach ($binding as $key => $value) {
            $this->bind_value[ ':' . $key ] = $value;
        }
        return $this;
    }
    
    public function bindByReference(array &$binding) {
        foreach ($binding as $key => &$value) {
            $this->bind_reference[ ':' . $key ] = $value;
        }
        return $this;
    }

####################
    
    //<editor-fold desc="Builders">
    public function buildQry($type = null, $safe = true) {
        $type             = $type != null ? $type : $this->guess_type;
        $this->guess_type = '';
        $qry              = $this->qry;
        
        switch ($type) {
            default:
                break;
            case 'select':
                $qry .= $this->buildSelect() . $this->buildFrom() . $this->buildWhere();
                break;
            case 'update':
                if ($safe and ($this->_where == '' || $this->_where == null)) $this->where('1 = 0');
                $qry .= $this->buildUpdate() . ' ' . $this->buildWhere();
                break;
            case 'delete':
                if ($safe and (trim($this->_where) == '' || $this->_where == null)) {
                    $this->where('1 = 0');
                }
                $qry .= $this->buildDelete() . $this->buildWhere();
                break;
            case 'insert':
                $qry .= $this->buildInsert() . $this->buildOnDuplicate();
                break;
        }
        $this->qry = $qry . ' ';
        return $this;
    }
    
    /**
     * Build a standard From clause
     *
     * @see Sql::buildQry
     * @return string
     */
    private function buildFrom() {
        $table_name  = $this->_from;
        $this->_from = [ ];
        $tmp_from    = ' FROM ';
        foreach ($table_name as $key => $value) {
            if (is_numeric($key)) {
                if ($value == '') continue;
                $tmp_from .= $value;
            } elseif (is_string($key) && is_string($value)) {
                $tmp_from .= $key . " AS " . $value;
            }
            $tmp_from .= ', ';
        }
        $tmp_from = rtrim($tmp_from, ', ');
        return $tmp_from;
    }
    /**
     * Build a standard where clause
     *
     * @see Sql::buildQry
     * @return string
     */
    private function buildWhere() {
        if ($this->_where) {
            $where        = $this->_where;
            $this->_where = '';
            return ' WHERE ' . $where;
        }
        return ' ';
    }
    /**
     * Build a standard delete query
     *
     * @see Sql::buildQry
     * @return string
     */
    private function buildDelete() {
        $table_name   = $this->_table;
        $this->_table = '';
        return "DELETE FROM {$table_name} ";
    }
    /**
     * Build a standard select query
     *
     * @see Sql::buildQry
     * @return string
     */
    private function buildSelect() {
        $columns       = $this->_select;
        $this->_select = '';
        $sel_qry       = " SELECT ";
        foreach ($columns as $name => $alias) {
            if (is_numeric($name)) {
                $column_name = $alias;
                $alias       = '';
            } else {
                $column_name = $name;
            }
            if (static::$backtick == true && $column_name != "*") {
                $column_name = trim($column_name);
                $column_name = "`{$column_name}`";
            }
            $sel_qry .= "{$column_name}";
            if ($alias != '' && !is_numeric($alias)) {
                $sel_qry .= " AS {$alias}";
            }
            $sel_qry .= ", ";
        }
        return rtrim($sel_qry, ', ');
    }
    /**
     * Build the insert Query
     *
     * @see Sql::buildQry
     * @return string
     */
    private function buildInsert() {
        if (!isset($this->_insert['insert_columns']) || !isset($this->_insert['value_columns'])) {
            return ' ';
        }
        $values_to_insert               = $this->_insert['value_columns'];
        $insert_columns                 = $this->_insert['insert_columns'];
        $this->_insert['value_columns'] = $this->_insert['insert_columns'] = '';
        $table                          = isset($this->_table) ? $this->_table : null;
        if ($table == null) return '';
        
        if (is_string($values_to_insert)) {
            $values_to_insert = [ [ $values_to_insert ] ];
        } elseif (is_array($values_to_insert) && !empty($values_to_insert) && !is_array($values_to_insert[0])) {
            $values_to_insert = [ $values_to_insert ];
        }
        
        $value_size = count($values_to_insert);
        if (is_string($insert_columns)) $insert_columns = [ $insert_columns ];
        $columns_qry_string = '(';
        $values_qry_string  = 'VALUES';
        $insert_qry         = 'INSERT INTO ' . $table . " ";
        foreach ($insert_columns as $key => $value) {
            $columns_qry_string .= $value;
            end($insert_columns);
            #CBB
            if ($value_size === 1 and isset($values_to_insert[0][ $key ])) {
                $this->bind([ $value => $values_to_insert[0][ $key ] ]);
                $values_to_insert[0][ $key ] = ":" . $value;
            }
            if ($key !== key($insert_columns)) {
                $columns_qry_string .= ", ";
            } else {
                $columns_qry_string .= ")\n";
            }
        }
        foreach ($values_to_insert as $vc_key => $vc_value) {
            $values_qry_string .= " (";
            foreach ($vc_value as $k => $v) {
                $values_qry_string .= $v;
                end($vc_value);
                if ($k !== key($vc_value)) {
                    $values_qry_string .= ", ";
                } else {
                    $values_qry_string .= ")";
                }
            }
            end($values_to_insert);
            if ($vc_key !== key($values_to_insert)) {
                $values_qry_string .= ", \n";
            }
        }
        $insert_qry .= $columns_qry_string . $values_qry_string;
        return $insert_qry;
    }
    /**
     * Build the update query
     *
     * @see Sql::buildQry
     * @return string
     */
    private function buildUpdate() {
        $update     = $this->_update;
        $table_name = $this->_table;
        
        $qry = " UPDATE {$table_name} SET ";
        
        $to_be_bound   = [ ];
        $this->_update = $this->_table = '';
        
        foreach ($update as $key => $value) {
            $to_be_bound[ $key ] = $value;
            $qry .= "{$key} = :{$key}";
            
            #CBB(could be be better) Make this into something that is a bit more efficient?
            end($update);
            if ($key !== key($update)) {
                $qry .= ", ";
            }
        }
        $this->bind($to_be_bound);
        
        return $qry;
    }
    /**
     * Build the part of the query saying 'on duplicate key update ___'
     *
     * @see Sql::buildQry
     * @return string
     */
    private function buildOnDuplicate() {
        if ($this->_on_duplicate != '') {
            $od                  = $this->_on_duplicate;
            $this->_on_duplicate = '';
            return ' ON DUPLICATE KEY UPDATE ' . $od;
        }
        return ' ';
    }
    //</editor-fold>
    
}

########################################################################################################################################################################################################