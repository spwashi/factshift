<?php
/**
 * User: Sam Washington
 * Date: 11/27/16
 * Time: 10:55 PM
 */

namespace Sm\Controller\API;


use Sm\Action\Create\CreateVictim;
use Sm\Action\Destroy\DestroyVictim;
use Sm\Action\Edit\EditVictim;
use Sm\Action\Exception\ActionException;
use Sm\Controller\Abstraction\Controller;
use Sm\Core\App;
use Sm\Development\Log;
use Sm\Entity\Entity;
use Sm\Entity\EntityIterator;
use Sm\Entity\Model\EntityMeta;
use Sm\Entity\Model\Identifier;
use Sm\Entity\Relationship\RelationshipIndex;
use Sm\Environment\Environment;
use Sm\Identifier\Identifiable;
use Sm\Iterator\Iterator;
use Sm\Response\Response;
use Sm\Response\ResponseMessage;

class API extends Controller {
    public static function route(...$route_array) {
        App::_()->Environment->setEntryPoint(Environment::EP_API);
        /** @var Endpoint[] $Endpoints */
        $Endpoints        = static::get_api_endpoint_object_array($route_array);
        $endpoint_results = null;
        # Get the name of the request method (GET, PUT, POST, PATCH, DELETE)
        $request_method = strtolower($_SERVER['REQUEST_METHOD']);
        $request_data   = static::get_request_data($request_method);
        foreach ($Endpoints as $index => $endpoint) {
            try {
                /** @var Entity $InitializedEndpointObject */
                $InitializedEndpointObject = $endpoint->initClass();
                $next_endpoint             = $Endpoints[ $index + 1 ] ?? null;
                if (!$next_endpoint) {
                    $endpoint_results = static::process_endpoint($endpoint_results, $endpoint, $request_method === 'post');
                    if ($endpoint_results instanceof Response) return $endpoint_results;
                    continue;
                }
                
                $n_e_rels_to_find = is_array($next_endpoint->endpoint_type) ? $next_endpoint->endpoint_type : explode(',', $next_endpoint->endpoint_type);
                
                if ($InitializedEndpointObject instanceof EntityIterator) {
                    $endpoint_results = [ ];
                    /** @var Entity $entity */
                    foreach ($InitializedEndpointObject as $entity) {
                        $endpoint_results[] = static::findRelationshipIndices($entity, $n_e_rels_to_find);
                    }
                } else {
                    if ($InitializedEndpointObject instanceof Entity) {
                        /** @var Entity $endpoint_results */
                        $endpoint_results = static::findRelationshipIndices($InitializedEndpointObject, $n_e_rels_to_find);
                    } else {
                        $endpoint_results = [ ];
                    }
                }
            } catch (\Exception $e) {
                
            }
        }
        
        
        if (!method_exists(static::class, $request_method)) return new APIResponse(new ResponseMessage(null, "Could not complete request"), false);
        
        if ($endpoint_results instanceof \Traversable || is_array($endpoint_results)) {
            $results       = [
                'errors'   => [ ],
                'messages' => [ ],
                'data'     => [ ],
            ];
            $success       = true;
            $all_are_false = true;
            foreach ($endpoint_results as $endpoint_result) {
                /** @var Response $response */
                $response              = call_user_func_array([ static::class, $request_method ], [ $endpoint_result, $request_data ]);
                $results['messages'][] = $response->getMessage();
                $results['errors'][]   = $response->getErrors();
                $tmp_s                 = $response->getStatus();
                if ($tmp_s !== false) $all_are_false = false;
                if ($success !== $tmp_s) {
                    $success = null;
                }
                $results['data'][] = $response->getData();
            }
            return new APIResponse($results['messages'],
                                   $all_are_false ? false : $success,
                                   $results['data'],
                                   $results['errors']);
        } else {
            return call_user_func_array([ static::class, $request_method ], [ $endpoint_results, $request_data ]);
        }
    }
    /**
     * Find appropriate data based on the HTTP method sent.
     *
     * @param string|null $method
     *
     * @return array|mixed
     */
    protected static function get_request_data($method = null) {
        $method = $method ?: strtolower($_SERVER['REQUEST_METHOD']);
        switch ($method):
            case 'get'  :
                $req = $_GET;
                break;
            case 'post' :
                $req = static::retrieve_post_data();
                break;
            case 'patch':
            case 'put'  :
                $req = json_decode(file_get_contents("php://input"), true);
                break;
            default:
                $req = [ ];
        endswitch;
        return $req;
    }
    /**
     * Get the posted data; if the method is POST but the $_POST variable is empty, check the other possible data-holding things
     *
     * @return array|mixed
     */
    protected static function retrieve_post_data() {
        #First check to see if $_POST is not empty.
        if (count($_POST)) {
            return $_POST;
        } elseif ($post_data = file_get_contents('php://input')) {
            # Else try to retrieve data from php://input for raw POST data.
            # Check to see if post_data is a json string.
            if ($post_json = json_decode($post_data, true)) {
                return $post_json;
            } else {
                # Else attempt to extract key value pairs from data, using parse_str().
                parse_str($post_data, $post_variables);
                # Successful at retrieving post variables?
                if (count($post_variables)) {
                    return $post_variables;
                }
            }
        } # Not able to retrieve POST data, return empty array.
        return [ ];
    }
    /**
     * @param Entity       $entity
     * @param string|array $indices
     *
     * @return array|bool|mixed
     */
    protected static function findRelationshipIndices(Entity &$entity, $indices) {
        if (is_array($indices)) {
            $result = [ ];
            foreach ($indices as $index) {
                $result[] = $entity->findRelationshipIndex($index);
            }
            return $result;
        } else {
            return $entity->findRelationshipIndex($indices);
        }
    }
    /**
     * @param          $previous_result
     * @param Endpoint $current_endpoint
     *
     * @param null     $request_method
     *
     * @return array|bool|int|string
     */
    protected static function process_endpoint($previous_result, $current_endpoint, $request_method = null) {
        /** @var Entity|Iterator $InitializedEndpointObject */
        $InitializedEndpointObject = $current_endpoint->initClass($request_method);
        if ($previous_result instanceof Iterator) {
            if (!$current_endpoint->identifier || empty($current_endpoint->identifier)) {
                return $previous_result;
            }
            $identifier = [ $current_endpoint->identifier ];
            if ($InitializedEndpointObject instanceof Iterator) {
                $items      = $InitializedEndpointObject->getItems();
                $identifier = array_keys($items);
            } else if ($InitializedEndpointObject instanceof Identifiable) {
                $identifier = [ $InitializedEndpointObject->getUniqueIdentifier() ];
            }
            $new_res = [ ];
            foreach ($identifier as $index => $endpoint_identifier) {
                $next_result = $previous_result->locate(explode('|', $endpoint_identifier)[0]);
                
                if ($previous_result instanceof RelationshipIndex && $endpoint_identifier && strlen($endpoint_identifier)) {
                    $endpoint_identifier .= '|' . $previous_result->getRelationshipIndex();
                }
                $item_in_iterator = $previous_result->getItem($next_result);
                if (!$item_in_iterator) {
                    continue;
                }
                if (isset($endpoint_identifier) && strlen($endpoint_identifier)) {
                    $new_res[ $endpoint_identifier ] = $item_in_iterator;
                } else {
                    $new_res[] = $item_in_iterator;
                }
            }
            if (!count($new_res) && $previous_result instanceof RelationshipIndex) {
                foreach ($identifier as $index => $endpoint_identifier) {
                    try {
                        $OtherEntity = $previous_result->initOtherEntity(new Identifier($endpoint_identifier));
                        /** @var \Sm\Entity\Abstraction\Entity $OtherEntity */
                        $Relationship = $previous_result->initRelationshipEntity($OtherEntity);
                        $new_res[]    = $Relationship;
                    } catch (\Exception $e) {
                        Log::init($e)->log_it();
                    }
                }
            }
            return $new_res;
        } else if (is_array($previous_result)) {
            $new_res       = [ ];
            $array_results = [ ];
            foreach ($previous_result as $item) {
                $tmp = static::process_endpoint($item, $current_endpoint);
                if (is_array($tmp)) {
                    $array_results[] = $tmp;
                } else {
                    $new_res[] = $tmp;
                }
            }
            array_unshift($array_results, $new_res);
            return call_user_func_array('array_merge', $array_results);
        }
        return $InitializedEndpointObject;
    }
    
    protected static function get($endpoint_value, $request_data) {
        return new APIResponse(new ResponseMessage(null, "Successfully retrieved resource"), true, $endpoint_value);
    }
    protected static function put($endpoint_value, $request_data) {
        if ($endpoint_value instanceof EditVictim) {
            $action = $endpoint_value->initEditActionAsVictim(App::_()->IoC->session->getUser(), $request_data);
            try {
                return $action->execute();
            } catch (ActionException $e) {
                return APIResponse::initFromResponse($e->getResponse());
            }
        }
        return new APIResponse(new ResponseMessage(null, "Could not complete the request"), false, $endpoint_value);
    }
    protected static function patch($endpoint_value, $request_data) {
        return static::put($endpoint_value, $request_data);
    }
    protected static function post($endpoint_value, $request_data) {
        if ($endpoint_value instanceof CreateVictim) {
            $action = $endpoint_value->initCreateActionAsVictim(App::_()->IoC->session->getUser(), $request_data);
            try {
                return $action->execute();
            } catch (ActionException $e) {
                return APIResponse::initFromResponse($e->getResponse());
            }
        }
        return new APIResponse(new ResponseMessage(null, "Could not complete request"), false, $endpoint_value);
    }
    protected static function delete($endpoint_value) {
        if ($endpoint_value instanceof DestroyVictim) {
            $action = $endpoint_value->initDestroyActionAsVictim(App::_()->IoC->session->getUser());
            try {
                return $action->execute();
            } catch (ActionException $e) {
                return APIResponse::initFromResponse($e->getResponse());
            }
        }
        return new APIResponse(new ResponseMessage(null, "Could not complete request"), false, null);
    }
    
    
    public static function get_api_endpoint_object_array($route_array) {
        $endpoints = [ ];
        /**
         * Each index of the array should be either an endpoint(string) or some sort of identifier.
         */
        foreach ($route_array as $index => $endpoint_name) {
            # Because we go index1/value/index2/value ...,
            # only operate on the indexes (not the values)
            if ($index % 2 !== 0 && $index != 0) continue;
            # Make sure the table name is the way we think it should be
            $entity_name = EntityMeta::convert_to_something($endpoint_name, EntityMeta::TYPE_ENTITY_TYPE);
            
            
            #An object of the resource and the identifier that is associated with it
            $endpoint = new Endpoint($entity_name ?: $endpoint_name, boolval($entity_name));
            if (isset($route_array[ $index + 1 ])) {
                #Keeping in mind that the value we are on should be the name of a table,
                # The value immediately following it should be some sort of an identifier for that table
                # Set the identifier of the value array to be that string
                $identifier = $route_array[ $index + 1 ];
                if (strpos($identifier, ',')) {
                    # If there are commas in the identifier, make it into an array. Get rid of the spaces.
                    $identifier = explode(',', str_replace(' ', '', $identifier));
                }
                $endpoint->setIdentifier($identifier);
            }
            $endpoints[] = $endpoint;
        }
        return $endpoints;
    }
}