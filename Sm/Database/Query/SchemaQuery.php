<?php
/**
 * User: Sam Washington
 * Date: 3/24/2015
 * Time: 3:05 PM
 */

namespace Sm\Database\Query;


use Sm\Database\Query\Abstraction\Query;
use Sm\Database\Query\Key\PrimaryKey;

class SchemaQuery extends Query{
    protected $primary_key = null;
    protected $table_name = null;

    function __construct($table_name = null) {
        $this->table_name = $table_name;
    }


    /** @var Column\Abstraction\Column[] $items */
    /**
     * (PHP 5 &gt;= 5.0.0)<br/>
     * Return the current element
     * @link http://php.net/manual/en/iterator.current.php
     * @return Column\Abstraction\Column
     */
    public function current() {
        if($this->primary_key){
            $this->add($this->primary_key);
            $this->primary_key = null;
        }
        return parent::current();
    }


    public function add($item) {
        if(is_array($item)){
            foreach ($item as $item_1) {
                $this->add($item_1);
            }
            return $this;
        }
        if($item instanceof Column\Abstraction\Column || $item instanceof Key\Abstraction\Key)
            parent::add($item);
        return $this;
    }

	/**
	 * @param PrimaryKey $primary_key
	 *
	 * @return $this
	 */
    public function setPrimaryKey($primary_key) {
        $this->primary_key = $primary_key;
        return $this;
    }

    /**
     * @return string
     */
    public function getTableName() {
        return $this->table_name;
    }
}