<?php
/**
 * User: Sam Washington
 * Date: 3/23/2015
 * Time: 12:09 PM
 */

namespace Sm\Database\Query\Column;


class VarcharColumn extends Abstraction\StringColumn{
    public static $column_type = 'VARCHAR';
    protected $binary = false;
    protected $length = 50;

    /**
     * @return boolean
     */
    public function isBinary() {
        return $this->binary;
    }

	/**
	 * @param boolean $binary
	 *
	 * @return $this
	 */
    public function setBinary($binary = true) {
        $this->binary = $binary;
        return $this;
    }

}