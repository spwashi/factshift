<?php
/**
 * User: sam
 * Date: 6/4/15
 * Time: 10:41 PM
 */

namespace Spwashi\Controller;


use Sm\View\View;

class deploy {
	public function user() { return View::create('deployment/u_table.php'); }

	public function group() { return View::create('deployment/g_table.php'); }

	public function setting() { return View::create('deployment/s_table.php'); }

	public function ug() { return View::create('deployment/ug_table.php'); }

	public function page() { return View::create('deployment/p_table.php'); }

	public function catsup() { return View::create('deployment/cs_table.php'); }
}