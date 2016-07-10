<?php
/**
 * User: Sam Washington
 * Date: 8/11/2015
 * Time: 6:15 PM
 */

namespace Spwashi\Controller\API;

use Spwashi\Libs\DataHandling\CollectionHandler;
use Spwashi\Model\Collection;

class CollectionAPI extends API {
	protected static $order_of_search = ['collection', 'dimension', 'concept', 'user', 'section'];
#--------------------------------------------------------------------------------------------
	protected static function get_self_class($identifier = null) {
		if ($identifier) {
			return Collection::find($identifier);
		}
		return new Collection;
	}
	protected static function handler_init($primary_model) {
		return CollectionHandler::init($primary_model, true);
	}
}