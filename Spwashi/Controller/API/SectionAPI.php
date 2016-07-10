<?php
/**
 * User: Sam Washington
 * Date: 8/11/2015
 * Time: 6:14 PM
 */

namespace Spwashi\Controller\API;

use Sm\Core\Util;
use Sm\Model\Abstraction\Model;
use Sm\Model\ModelIterator;
use Spwashi\Model\Section;
use Spwashi\Model\Type\RelationshipType;

class SectionAPI extends API {
	protected static $order_of_search = ['collection', 'dimension', 'concept', 'user', 'section'];
#--------------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------------
	public function get($model, $req_data, $last_result = null, &$endpoint_array = []) {
		$result = $model;
		# If we know what section we're looking for
		if (!$endpoint_array && $model instanceof Model && isset($req_data['usages']) && Util::bool($req_data['usages'])) {
			$section_find_arr = ['model' => $model];
			if (isset($req_data['relationship_type'])) {
				$relationship_type_id                  = RelationshipType::get_type_from_name($req_data['relationship_type']);
				$section_find_arr['relationship_type'] = $relationship_type_id;
			}
			$found_usages = Section::findUsages($section_find_arr);
			$result       = new ModelIterator();
			foreach ($found_usages as $ss) {
				if ($ss instanceof Section) $ss->findSections();
				$result->push($ss);
			}
		}
		return parent::get($result, $req_data, $last_result, $endpoint_array);
	}
}