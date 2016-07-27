<?php
/**
 * User: Sam Washington
 * Date: 4/13/2015
 * Time: 3:33 PM
 */

return [
	'base_url'               => 'http://s.dev.spwashi.com/',
	'site_title'             => 'Spwashi',
	'site_title_short'       => 'Spwashi',
	'user_path'              => 'APP_PATH/_users',

	'default_route_function' => function () {
		#\Sm\Response\Response::redirect(\Sm\Router\Toute::generate_url('404', ['?p='.urlencode(\Sm\URI\URI::get_full_url())]),302, true);
		echo 'spwashi -- ' . $_SERVER['REQUEST_URI'];
	},
];