<?php
/**
 * User: sam
 * Date: 7/16/15
 * Time: 6:57 PM
 */

namespace Sm\Email\Abstraction;


interface EmailInterface {
	/**
	 * Send the email
	 *
	 * @return mixed
	 */
	public function send();
}