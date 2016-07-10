<?php
/**
 * User: Sam Washington
 * Date: 8/11/2015
 * Time: 6:15 PM
 */
namespace Spwashi\Controller\API;

use Sm\Development\Log;
use Sm\Model\Model;
use Sm\Model\ModelIterator;
use Spwashi\Libs\DataHandling\ConceptHandler;
use Spwashi\Libs\DataHandling\UpdatedForm;
use Spwashi\Model\Concept;
use Spwashi\Model\Page;
use Spwashi\Model\User;

class ConceptAPI extends API {
    protected static $order_of_search = ['user', 'concept', 'page'];

    protected static function get_self_class($identifier = null) {
        if ($identifier) return Concept::find($identifier);
        return new Concept;
    }

    /**
     * @param $primary_model
     *
     * @return UpdatedForm
     */
    protected static function handler_init($primary_model) {
        return ConceptHandler::init($primary_model, true);
    }

    /**
     * @param User        $user
     * @param string|null $identifier
     * @param Endpoint    $endpoint
     * @param             $req_data
     * @return null|Model|ModelIterator
     * @throws \Sm\Model\ModelNotFoundException
     */
    protected static function init_from_user($user, $identifier, $endpoint, $req_data) {
        if ($identifier) return static::get_resource($endpoint->table_name, $identifier);
        return Concept::findAll(['user_id' => $user->id]);
    }

    /**
     *
     * @param Page       $page
     * @param int|string $identifier
     * @param Endpoint   $endpoint
     * @param            $req_data
     *
     * @return mixed
     */
    protected static function init_from_page($page, $identifier, $endpoint, $req_data) {
        if ($identifier) {
            if (!is_int($identifier)) $identifier = static::get_self_class($identifier)->id;
            $page->findType('concepts', ['concept_id' => $identifier]);
        } else {
            $page->findType('concepts');
        }
        return $page->map_remix->concepts;
    }

    /**
     * @param Concept        $Concept
     * @param string|concept $identifier
     * @param Endpoint       $endpoint
     * @param array          $req_data
     * @return null|Model|ModelIterator
     */
    protected static function init_from_concept($Concept, $identifier, $endpoint, $req_data) {
        if ($identifier) return static::get_resource($endpoint->table_name, $identifier);
        $result = new ModelIterator();
        return $result;
    }

    /**
     * Update only part of a model
     *
     * @param Model       $primary_model
     * @param             $request_data
     * @param array       $endpoint_entities
     *
     * @return mixed
     *
     */
    public function patch($primary_model, $request_data, $endpoint_entities = []) {
        Log::init(func_get_args())->log_it();
        if (!isset($request_data['maps'])) {
            $save = static::save_model(static::handler_init($primary_model), $primary_model, $request_data);
            return $save;
        }
        return [
            'success' => false,
            'message' => [
                'text' => 'Nothing to save',
            ],
        ];
    }
}