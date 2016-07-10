<?php
/**
 * User: Sam Washington
 * Date: 4/2/2015
 * Time: 2:06 PM
 */

namespace Sm\Output;

use Sm\Response\Http;
use Sm\View\Abstraction\View;

class Output extends Abstraction\Output {
	public static function process($output_data) {
		if ($output_data instanceof View) {
			$content = $output_data->getContent(true);
			$output_data->makeHeaders();
			header("Cache-Control: no-cache, must-revalidate"); //HTTP 1.1
			header("Pragma: no-cache"); //HTTP 1.0
			header("Expires: Sat, 26 Jul 1997 05:00:00 GMT"); // Date in the past
		} elseif (is_string($output_data) || is_numeric($output_data)) {
			$type = 'html';
			$content = $output_data;
			if (!Http::$content_type_set)
				Http::make_resource_headers($type);
		} elseif (is_array($output_data) || is_bool($output_data) || (is_object($output_data) && $output_data instanceof \JsonSerializable)) {
			$type = 'json';
			$content = json_encode($output_data);
			Http::make_resource_headers($type);
		} else {
			$type = 'html';
			$content = '';
			Http::make_resource_headers($type);
		}

		echo $content;
		return '';
	}
}