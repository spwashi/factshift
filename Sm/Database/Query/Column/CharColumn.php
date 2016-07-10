<?php
/**
 * User: Sam Washington
 * Date: 3/23/2015
 * Time: 12:14 PM
 */

namespace Sm\Database\Query\Column;


class CharColumn extends Abstraction\StringColumn{
    public static $column_type = 'CHAR';
    protected $binary = false;

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