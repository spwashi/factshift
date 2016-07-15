<?php
/**
 * User: Sam Washington
 * Date: 8/11/2015
 * Time: 6:15 PM
 */
namespace Spwashi\Controller\API;

use Sm\Core\Util;
use Sm\Model\Model;

class ConceptAPI extends API {
	protected static $order_of_search = ['user', 'concept', 'page'];
	/**
	 * Add a new model
	 *
	 * @param Model      $primary_model
	 * @param            $request_data
	 * @param null       $last_result
	 * @param Endpoint[] $endpoint_array
	 * @return mixed
	 * @internal param bool $next_endpoint
	 * @internal param bool $is_last
	 *
	 *
	 * @internal param $req_data
	 * @internal param $settings
	 */
	public function post($primary_model, $request_data, $last_result = null, &$endpoint_array = []) {
		//todo
		if (!isset($request_data['alias'])) $request_data['alias'] = Util::generateRandomString(5);
		return parent::post($primary_model, $request_data, $last_result, $endpoint_array);
	}

}