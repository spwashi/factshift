<?php
/**
 * User: Sam Washington
 * Date: 3/23/2015
 * Time: 11:52 AM
 */

namespace Sm\Database\Query\Column\Abstraction;


abstract class StringColumn extends Column{
    protected $character_set;
    protected $collation;


	/**
	 * @param string $collation
	 *
	 * @return $this
	 */
    public function setCollation($collation) {
        $this->collation = $collation;
        return $this;
    }

	/**
	 * @param mixed $character_set
	 *
	 * @return $this
	 */
    public function setCharacterSet($character_set = null) {
        $this->character_set = $character_set;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getCharacterSet() {
        return $this->character_set;
    }

    /**
     * @return mixed
     */
    public function getCollation() {
        return $this->collation;
    }

}