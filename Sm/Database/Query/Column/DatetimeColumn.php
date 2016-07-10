<?php
/**
 * User: Sam Washington
 * Date: 3/27/2015
 * Time: 12:24 PM
 */

namespace Sm\Database\Query\Column;


use Sm\Database\Query\Column\Abstraction\Column;

class DatetimeColumn extends Column{
    static  $column_type = 'DATETIME';
    protected $default_now = false;
    protected $update_now = false;

    /**
     * @return boolean
     */
    public function isDefaultNow() {
        return $this->default_now;
    }

	/**
	 * @param boolean $default_now
	 *
	 * @return $this
	 */
    public function setDefaultNow($default_now = true) {
        $this->nullable = !$default_now;
        $this->default_now = $default_now;
        return $this;
    }

    /**
     * @return boolean
     */
    public function isUpdateNow() {
        return $this->update_now;
    }

	/**
	 * @param boolean $update_now
	 *
	 * @return $this
	 */
    public function setUpdateNow($update_now = true) {
        $this->update_now = $update_now;
        return $this;
    }

}