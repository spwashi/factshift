<?php
/**
 * User: Sam Washington
 * Date: 3/23/2015
 * Time: 11:49 AM
 */

namespace Sm\Database\Query\Column\Abstraction;


abstract class NumberColumn extends Column{
    protected $unsigned = true;
    protected $auto_increment = false;
    protected $zero_fill = false;

    /**
     * @return boolean
     */
    public function isUnsigned() {
        return $this->unsigned;
    }

    /**
     * @return boolean
     */
    public function isAutoIncrement() {
        return $this->auto_increment;
    }

    /**
     * @return boolean
     */
    public function isZeroFill() {
        return $this->zero_fill;
    }

	/**
	 * @param boolean $unsigned
	 *
	 * @return $this
	 */
    public function setUnsigned($unsigned = true) {
        $this->unsigned = $unsigned;
        return $this;
    }

	/**
	 * @param boolean $auto_increment
	 *
	 * @return $this
	 */
    public function setAutoIncrement($auto_increment) {
        $this->auto_increment = $auto_increment;
        return $this;
    }

	/**
	 * @param boolean $zero_fill
	 *
	 * @return $this
	 */
    public function setZeroFill($zero_fill) {
        $this->zero_fill = $zero_fill;
        return $this;
    }


}