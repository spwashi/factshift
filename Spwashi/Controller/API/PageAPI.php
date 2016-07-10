<?php
/**
 * User: Sam Washington
 * Date: 8/11/2015
 * Time: 6:15 PM
 */

namespace Spwashi\Controller\API;

use Sm\Model\Model;
use Sm\Model\ModelIterator;
use Sm\Model\ModelMeta;
use Sm\Model\ModelNotFoundException;
use Spwashi\Libs\DataHandling\PageHandler;
use Spwashi\Libs\DataHandling\UpdatedForm;
use Spwashi\Model\Concept;
use Spwashi\Model\Exception\MapNotFoundException;
use Spwashi\Model\Map\ConceptPageMap;
use Spwashi\Model\Page;
use Spwashi\Model\User;

class PageAPI extends API {
    protected static $order_of_search = [ 'user', 'concept', 'page' ];
    protected static function get_self_class($identifier = null) {
        if ($identifier) {
            return Page::find($identifier);
        }
        return new Page;
    }
    /**
     * @param $primary_model
     *
     * @return UpdatedForm
     */
    protected static function handler_init($primary_model) {
        return PageHandler::init($primary_model, true);
    }
}