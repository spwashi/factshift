<?php
/**
 * User: Sam Washington
 * Date: 3/20/2015
 * Time: 8:54 PM
 */

namespace Sm\Database;


use Sm\Development\Log;

/**
 * Class Connection
 *
 * @package Sm\Database
 * @method \PDO getConnection()
 */
class Connection extends Abstraction\Connection {
    protected $transactionCounter = 0;
    /** @var  \PDO */
    protected $connection;
    public function connect() {
        try {
            if (!strlen($this->username) && !strlen($this->password) && !strlen($this->database)) return $this;
            $dsn              = "mysql:host=" . $this->host . ";dbname=" . $this->database . ';charset=utf8';
            $this->connection = new \PDO($dsn, $this->username, $this->password);
            $this->connection->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
            $this->connection->setAttribute(\PDO::ATTR_EMULATE_PREPARES, false);
        } catch (\PDOException $e) {
            Log::init($e->getMessage(), $e->getCode(), 'log')->log_it();
            return $this;
        }
        $this->host = $this->password = $this->database = $this->username = null;
        return $this;
    }
    
    public function beginTransaction() {
        if (!$this->connection) return false;
        if (!$this->transactionCounter) {
            $this->transactionCounter++;
            return $this->connection->beginTransaction();
        }
        return false;
    }
    
    public function commitTransaction() {
        if (!$this->connection) return false;
        if (!--$this->transactionCounter)
            return $this->connection->commit();
        return $this->transactionCounter >= 0;
    }
    
    public function rollBackTransaction() {
        if (!$this->connection) return false;
        if ($this->transactionCounter >= 0) {
            $this->transactionCounter = 0;
            return $this->connection->rollback();
        }
        $this->transactionCounter = 0;
        return false;
    }
}