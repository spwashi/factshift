<?php
/**
 * User: Sam Washington
 * Date: 4/2/2015
 * Time: 12:20 AM
 */


return [
	[
		\Sm\Helper\Helper::PRE_OUTPUT,
		function (&$content) { $content = str_replace('CONTENT', 'content to replace other content', $content); }
	]
];