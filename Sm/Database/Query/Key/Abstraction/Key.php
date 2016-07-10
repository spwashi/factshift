<?php
/**
 * User: Sam Washington
 * Date: 3/25/2015
 * Time: 10:06 PM
 */

namespace Sm\Database\Query\Key\Abstraction;


class Key {
    protected $key_type;
    protected $columns = [];
    protected $name = 'key';
    protected $comment = '';

    /**
     * @return string
     */
    public function getComment() {
        return $this->comment;
    }

	/**
	 * @param string $comment
	 *
	 * @return $this
	 */
    public function setComment($comment) {
        $this->comment = $comment;
        return $this;
    }
    function __construct($name = null) {
        $this->name = $name;
    }

    public function getType() {
        return $this->key_type;
    }
    public static function init($name = null) {
        return new static($name);
    }

    /**
     * @return array
     */
    public function getColumns() {
        return $this->columns;
    }

    /** Set the columns you're dealing with in the table you are creating or
     * @param mixed $columns
     * @return $this
     */
    public function setColumns($columns) {
        $this->columns = is_array($columns) ? $columns : func_get_args();
        return $this;
    }

    /**
     * @return string
     */
    public function getName() {
        return $this->name;
    }

}