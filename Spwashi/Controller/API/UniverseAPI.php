<?php
/**
 * User: Sam Washington
 * Date: 12/4/15
 * Time: 1:28 AM
 */

namespace Spwashi\Controller\API;

class UniverseAPI extends API {
	protected static $order_of_search = ['collection', 'dimension', 'concept', 'user', 'section'];
}