<?php
/**
 * User: Sam Washington
 * Date: 3/20/2015
 * Time: 7:29 PM
 */

namespace Sm\Database\Abstraction;


abstract class Connection {
    protected $host, $username, $password, $database, $connection;
    public function __construct($host = null, $username = null, $password = null, $database = null) {
        $this->host     = $host     != null ? $host     : 'localhost';
        $this->username = $username != null ? $username : '';
        $this->password = $password != null ? $password : '';
        $this->database = $database != null ? $database : '';
    }

    public static function init($host = null, $username = null, $password = null, $database = null) {
        return new static($host, $username, $password, $database);
    }
    abstract public function connect();

    public function getConnection() {
        return $this->connection;
    }

    abstract public function beginTransaction();
    abstract public function commitTransaction();
    abstract public function rollBackTransaction();
}