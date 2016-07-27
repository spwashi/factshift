<?php
/**
 * User: Sam Washington
 * Date: 8/11/2015
 * Time: 6:14 PM
 */

namespace Spwashi\Controller\API;

use Sm\Core\App;
use Sm\Core\Inflector;
use Sm\Development\Log;
use Sm\Model\Map;
use Sm\Model\Model;
use Sm\Model\ModelIterator;
use Sm\Model\ModelMeta;
use Sm\Model\ModelNotFoundException;
use Sm\Model\RelationshipIndex;
use Spwashi\Libs\API\APIResponse;
use Spwashi\Libs\DataHandling\UpdatedForm;
use Spwashi\Libs\Session\Session;
use Spwashi\Model\Section;
use Spwashi\Model\Type\RelationshipType;
use Spwashi\Model\User;

/**
 * Class API
 * @package Spwashi\Controller\API
 * @todo    VALIDATION!!!
 * @todo    Check on the SQL error handling
 */
class API {
	/**
	 * When dealing with multiple different entities, provide a structured way of iterating through them if necessary
	 * @var array
	 */
	protected static $order_of_search = [];
	public static function guess_table($key) {
		$key = strtolower($key);
		switch ($key):
			case 'children':
			case 'micros':
			case 'pivots':
			case 'composition':
				$name_arr = explode('\\', static::class);
				return str_replace('API', '', $name_arr[count($name_arr) - 1]);
		endswitch;
		return ModelMeta::convert_to_something($key, ModelMeta::TYPE_TABLE);
	}

	/**
	 * @param            $req_method
	 * @param            $last_result
	 * @param Endpoint[] $endpoint_array
	 * @param array      $req_data
	 * @return null
	 */
	public function send_to($req_method, $last_result, &$endpoint_array = [], &$req_data) {
		if (!count($endpoint_array)) return $last_result;
		$endpoint   = $endpoint_array[0];
		$app_name   = App::_()->name;
		$class_type = $endpoint->class_type;
		$classname  = "{$app_name}\\Controller\\API\\{$class_type}API";
		if (!class_exists($classname)) return null;
		/** @var API $instance */
		$instance = new $classname;
		if ($last_result instanceof APIResponse) {
			if (!$last_result->success) return $last_result;
			$last_result = $last_result->data;
		}
		return $instance->handle_request($req_method, $last_result, $endpoint_array, $req_data);
	}

	/**
	 * @param                                       $req_method
	 * @param Model|ModelIterator|RelationshipIndex $last_result
	 * @param Endpoint[]                            $endpoint_array
	 * @param array                                 $req_data
	 * @return Model|ModelIterator|RelationshipIndex
	 */
	public function handle_request($req_method, &$last_result, &$endpoint_array = [], &$req_data) {
		//If there are no more elements in the endpoint array, return the last result and call it a day`
		$count = count($endpoint_array);
		if (!$count || is_bool($last_result)) return $last_result;
		$count--;
		/** @var Endpoint $SelfEndpoint The Endpoint that we are going to be dealing with in this iteration */
		$SelfEndpoint = array_shift($endpoint_array);
		/** @var Endpoint|Endpoint[] $next_endpoint */
		$next_endpoint           = $count ? $endpoint_array[0] : false;
		$SelfEndpoint_identifier = $SelfEndpoint->identifier;
		//If the identifier of the endpoint that we are in is an array, refer to this endpoint as an array of endpoints instead
		if (is_array($SelfEndpoint_identifier)) {
			$_se = [];
			foreach ($SelfEndpoint_identifier as $id) {
				$_se[] = new Endpoint($SelfEndpoint->table_name, $id, $SelfEndpoint->class_type);
			}
			$SelfEndpoint = $_se;
		}

		$callback = function ($previous_result_value, $Endpoint) use (&$endpoint_array, $req_method, $last_result, $next_endpoint, $req_data, $count) {
			if ($previous_result_value === false) return false;
			$Endpoint_identifier = $Endpoint->identifier;
			$result              = false;
			if ($previous_result_value instanceof Model) {
				$model_type = $previous_result_value->getModelType();
				$model_type = ModelMeta::convert_to_something($model_type, ModelMeta::TYPE_TABLE);
				$model_type = Inflector::singularize($model_type);
				/** @see API::init_from_() */
				$init_function = static::class . "::init_from_{$model_type}";
				if (!is_callable($init_function)) {
					$init_function = static::class . "::init_from_";
				}
				$result = call_user_func_array($init_function, [
					$previous_result_value,
					$Endpoint_identifier,
					$Endpoint,
					$req_data,
				]);
				Log::init(['after init from', $result])->log_it();
				$result = static::process_init_from_result($result);
			} else if ($previous_result_value === null) {
				if ($Endpoint->identifier) {
					try {
						$result = static::get_self_class($Endpoint_identifier);
					} catch (\Exception $e) {
						Log::init($e->getMessage())->log_it();
					}
				}
				if ($req_method == 'post') {
					$result = $result ?: static::get_self_class();
				}
			}
			if ($count > 1) return $result;
			if ($req_method == 'post' || $req_method == 'patch' || $req_method == 'put') {
				if ($count === 1 && !(isset($req_data['map']) || isset($req_data['maps']))) {
					return $result;
				}
			}
			$end_result = $this->$req_method($result, $req_data, $previous_result_value, $endpoint_array);
			if ($end_result instanceof Model) {
				$end_result->findPermissions();
				if ($result instanceof User) return $result;
				if (!$end_result->user_can('view')) {
					return false;
				}
			} else if (($end_result instanceof RelationshipIndex) && $Endpoint_identifier) {
				$end_result = $end_result->get_item_at_index($end_result->locate_Model($Endpoint_identifier))->model;
			}

			return $end_result;
		};

		/**
		 * @param $prev_result
		 * @return array|ModelIterator
		 * @internal param $value
		 */
		$call_callback = function ($prev_result) use ($SelfEndpoint, $callback) {
			if (is_array($SelfEndpoint)) {
				$has_not_model = false;
				$not_model_ids = [];
				$result        = [];

				/** @var Endpoint $endpoint */
				foreach ($SelfEndpoint as $endpoint) {
					$callback_result               = $callback($prev_result, $endpoint);
					$result[$endpoint->identifier] = $callback_result;
					if ($callback_result instanceof RelationshipIndex) {
						$callback_result = ($callback_result);
					}
					Log::init(['in_call_callback_loop', $callback_result, $prev_result])->log_it();
					if (!$callback_result || !($callback_result instanceof Model)) {
						if (!$has_not_model) $has_not_model = true;
						$not_model_ids[] = $endpoint->identifier;
					}
				}
				if ($prev_result instanceof RelationshipIndex) {
					if ($has_not_model) {
						$prev_result->hide($not_model_ids);
					}
				}
			} else {
				$result = $callback($prev_result, $SelfEndpoint);
			}
			return $result;
		};

		if (is_array($last_result) || $last_result instanceof \Iterator) {
			$result        = [];
			$iterate_over  = $last_result instanceof RelationshipIndex ? $last_result->get_items(true) : $last_result;
			$has_not_model = false;
			$not_model_ids = [];
			foreach ($iterate_over as $key => $value) {
				$key             = is_int($key) ? intval($key) : $key;
				$callback_result = $call_callback($value);
				if (!$callback_result || !($callback_result instanceof Model)) {
					if (!$has_not_model) $has_not_model = true;
					$not_model_ids[] = $key;
				}
				$result[$key] = $callback_result;
				Log::init(['pre_call_callback_loop', $callback_result])->log_it();
			}
			if ($last_result instanceof ModelIterator) {
				$result = $has_not_model ? $result : $last_result;
			} else if ($last_result instanceof RelationshipIndex && !$has_not_model) {
				$result = $last_result;
				$last_result->hide($not_model_ids);
			}
		} else {
			$result = $call_callback($last_result);
		}
		return $this->send_to($req_method, $result, $endpoint_array, $req_data);
	}

	/**
	 * The Entry point to the API. Iterate through the string that after /api/ in the URI as an array, determine the endpoints, get the requested data, and operate based on the HTTP method
	 *
	 * @return mixed|string
	 */
	public function route() {
		$route_array           = func_get_args();
		$endpoint_object_array = static::get_api_endpoint_object_array($route_array);
		$app_name              = App::_()->name;
		# Get the name of the request method (GET, PUT, POST, PATCH, DELETE)
		$req_method = strtolower($_SERVER['REQUEST_METHOD']);
		$req_data   = static::get_request_data();

		/**
		 * Require a user to be logged in to modify a resource. Halfhearted check to see if the request comes from our site.
		 */
		switch ($req_method):
			case 'put':
			case 'delete':
			case 'patch':
				if (!($user = Session::get_user())) {
					return [
						'success' => false,
						'message' => 'must sign in',
					];
				}
				break;
			default:
			case 'get':
				break;
		endswitch;

		/**
		 * For each endpoint starting with the last, if there is a handle_request function call it.
		 * Pass the HTTP method, data, and endpoint array as the parameters
		 */
		foreach ($endpoint_object_array as $endpoint) {
			$class_type = $endpoint->class_type;
			$classname  = "{$app_name}\\Controller\\API\\{$class_type}API";
			if (!class_exists($classname)) continue;
			/** @var static $instance */
			$instance = new $classname;
			$result   = null;
			return $instance->handle_request($req_method, $result, $endpoint_object_array, $req_data);
		}

		return false;
	}
	/**
	 * Retrieve an instance of a model based on the name of an endpoint
	 *
	 * @param string     $resource_name The table name that corresponds to the endpoint
	 * @param string|int $identifier    Something that uniquely identifies an endpoint
	 * @param array|null $info          The information about a particular endpoint to find
	 *
	 * @return null|Model A model that corresponds to the resource
	 */
	protected static function get_resource($resource_name, $identifier = null, $info = null) {
		/**
		 * Allow the URL to be a table name or class name of any case
		 */
		$resource_name = Inflector::pluralize(strtolower($resource_name));
		/**
		 * Find the class that correlates to the resource name
		 *
		 * @type Model
		 */
		$class = ModelMeta::convert_to_class($resource_name);
		if (!$class) return false;
		if ($identifier) {
			try {
				/**
				 * Try to find the resource based on the identifier
				 */
				return $class->find($identifier, $info);
			} catch (ModelNotFoundException $e) {
			}
		}
		return null;
	}

	/**
	 * In most cases, we are going to want to pass off the API request to the controller correlating to the last
	 * endpoint of the request. To do this, we iterate through the request array, pick out the components that
	 * lead to an endpoint, and push each endpoint to the beginning of the endpoint array. The array
	 *
	 * @param $route_array
	 * @return Endpoint[]
	 */
	public static function get_api_endpoint_object_array($route_array) {
		$endpoints = [];
		/**
		 * Each index of the array should be either an endpoint(string) or some sort of identifier.
		 */
		foreach ($route_array as $index => $tablename) {
			# Because we go index1/value/index2/value ...,
			# only operate on the indexes (not the values)
			if ($index % 2 !== 0 && $index != 0) continue;
			# Make sure the table name is the way we think it should be
			$tablename  = ModelMeta::convert_to_something($tablename, ModelMeta::TYPE_TABLE, ModelMeta::TYPE_TABLE);
			$class_name = ModelMeta::convert_to_something($tablename, ModelMeta::TYPE_CLASSNAME);
			if (!$class_name) continue;

			$class_name_arr = explode('\\', $class_name);

			#An object of the resource and the identifier that is associated with it
			$endpoint = new Endpoint($tablename, null, end($class_name_arr));
			if (isset($route_array[$index + 1])) {
				#Keeping in mind that the value we are on should be the name of a table,
				# The value immediately following it should be some sort of an identifier for that table
				# Set the identifier of the value array to be that string
				$identifier = $route_array[$index + 1];
				if (strpos($identifier, ',')) {
					# If there are commas in the identifier, make it into an array. Get rid of the spaces.
					$identifier = explode(',', str_replace(' ', '', $identifier));
				}
				$endpoint->identifier = $identifier;
			}
			/**
			 * The endpoint that comes latest is of higher importance than the previous endpoint.
			 * Add it to the beginning of the endpoint array
			 */
			array_unshift($endpoints, $endpoint);
		}
		return array_reverse($endpoints);
	}
#--------------------------------------------------------------------------------------------------
	/**
	 * Find appropriate data based on the HTTP method sent.
	 *
	 * @param string|null $method
	 *
	 * @return array|mixed
	 */
	public static function get_request_data($method = null) {
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
				$req = [];
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
		return [];
	}
	/**
	 * Save a model based on specific properties. Return the success status and messages of the save
	 *
	 * @param UpdatedForm $G
	 * @param Model       $model
	 * @param array       $model_values
	 *
	 * @return array
	 */
	protected static function save_model($G, $model, $model_values) {
		$success       = [];
		$message_array = [];
		$G->set_data(['user' => Session::get_user()])->process($model_values, ['maps', '_meta']);
		$can_continue = $G->can_continue();
		$model_before = clone($model);
		if ($can_continue) {
			$G->set_model_properties();
			$changed = $model->getChanged();
			$result  = $model->save();
		} else {
			$result  = false;
			$changed = [];
		}
		if ($result === false) {
			$success                  = false;
			$message_array['model']   = $model_before;
			$message_array['message'] = 'Could not successfully save model';
		} else {
			$success                  = true;
			$message_array['message'] = 'Successfully saved model';
			$message_array['model']   = $model;
		}
		$d_a_arr                    = $G->get_all_errors();
		$message_array['changed']   = $changed;
		$message_array['ok']        = $G->get_success_array();
		$message_array['defaulted'] = $d_a_arr['default_errors'];
		$message_array['errors']    = $d_a_arr['errors'];

		return ['success' => $success, 'message' => $message_array];
	}
	/**
	 * Make sense of the results of 'init_from_----'
	 * @param $result
	 *
	 * @return array|bool
	 */
	protected static function process_init_from_result($result) {
		if (is_bool($result)) {
			return false;
		} else if ($result instanceof ModelIterator && $result->length() === 0) {
			return false;
		} else if (is_array($result)) {
			$new_res = [];
			foreach ($result as $key => $related) {
				if ($key !== '_meta' && is_array($related) && array_key_exists('model', $related))
					$new_res[] = $related['model'];
			}
			$result = $new_res;
		}
		return $result;
	}
#--------------------------------------------------------------------------------------------------
	/**
	 * This is just documentation for how the init_from_---- functions work.
	 * @param  Model              $primary_model Found model or null. This is the Model that we are acting on behalf of
	 * @param string|integer|null $identifier    This is the identifier associated with the current endpoint (this one)
	 * @param Endpoint            $endpoint      This is the endpoint that we are currently dealing with
	 * @param array               $req_data
	 * @return bool|ModelIterator|RelationshipIndex
	 * @throws ModelNotFoundException
	 */
	protected static function init_from_($primary_model, $identifier, $endpoint, $req_data) {
		$req_data['recurse']     = false;
		$find_arr                = [];
		$result                  = new ModelIterator();
		$relationship_type_index = $relationship_type_id = false;
		if (isset($req_data['relationship_type'])) {
			$relationship_type_id          = RelationshipType::get_type_from_name($req_data['relationship_type']);
			$relationship_type_index       = RelationshipType::get_name_from_type($req_data['relationship_type']);
			$find_arr['relationship_type'] = $relationship_type_id;
		}
		if ($identifier) {
			try {
				$table_name  = $endpoint->table_name;
				$other_model = static::get_resource($table_name, $identifier);
				if (!$other_model || !($other_model instanceof Model)) return false;

				try {
					Log::init($primary_model)->log_it();

					$map = ModelMeta::get_map_between($primary_model, $other_model, ModelMeta::TYPE_CLASS);
					Log::init($map)->log_it();
					$other_id = $map->get_secondary_identifier($primary_model);
					$self_id  = $map->get_primary_identifier($primary_model);
				} catch (\Exception $e) {
					$other_id = ModelMeta::convert_to_id($table_name);
					$self_id  = ModelMeta::convert_to_id($primary_model);
					if ($other_id == $self_id) {
						$other_id = 'secondary_' . $other_id;
					}
				}
				$find_arr[$other_id] = $other_model->id;
				$result              = $primary_model->findType($other_model, $find_arr)->maps->{$table_name};
				Log::init($result)->log_it();
			} catch (ModelNotFoundException $e) {
				Log::init(['init_from_', $e->getMessage()])->log_it();
			}
		} else {
			try {
				if ($primary_model instanceof Section && $endpoint->class_type == "Section")
					$primary_model->findSections($find_arr);
				else {
					$primary_model->findType($endpoint->class_type, $find_arr);
					Log::init([$find_arr, $endpoint->class_type])->log_it();
				}
			} catch (ModelNotFoundException $e) {
				return new APIResponse($e->getMessage(), false);
			} catch (\Exception $e) {
				$result = false;
				Log::init($e)->log_it();
			}
			if ($relationship_type_index) {
				/** @var RelationshipIndex $RelationshipIndex */
				$RelationshipIndex = $primary_model->maps->{$relationship_type_index};
				$result            = $RelationshipIndex;
			} else {
				$result = $primary_model->maps->getRelationshipIndex($endpoint->class_type);
				Log::init($result)->log_it();
			}
		}
		return $result;
	}
#--------------------------------------------------------------------------------------------------
	/**
	 * Return the class that is related to the API type
	 *
	 * @param null $identifier
	 *
	 * @return Model
	 */
	protected static function get_self_class($identifier = null) {
		$name_arr  = explode('\\', static::class);
		$classname = str_replace('API', '', $name_arr[count($name_arr) - 1]);

		try {
			$class = ModelMeta::convert_to_class($classname);
			if ($identifier) return $class->find($identifier);
			else return $class;
		} catch (\Exception $e) {
			return new Model;
		}
	}
	/**
	 * @param $primary_model
	 *
	 * @return UpdatedForm
	 */
	protected static function handler_init($primary_model) {
		$name_arr  = explode('\\', static::class);
		$classname = str_replace('API', '', $name_arr[count($name_arr) - 1]);
		$classname = '\\Spwashi\\Libs\DataHandling\\' . $classname . 'Handler';
		if (class_exists($classname))
			return call_user_func([$classname, 'init'], $primary_model, true);
		return UpdatedForm::init($primary_model, true);
	}
#--------------------------------------------------------------------------------------------------
	/**
	 * @param Model    $primary_model
	 * @param Model    $secondary_model
	 * @param array    $proposed_map
	 * @param bool|Map $actual_map
	 * @return APIResponse
	 */
	protected static function save_or_add_relationship($primary_model, $secondary_model, $proposed_map, $actual_map = false) {
		if (!$proposed_map || !is_array($proposed_map)) {
			$proposed_map = [];
		}
		if (isset($proposed_map['id'])) unset($proposed_map['id']);
		if ($actual_map) {
			//In this case, we are updating an existent Map
			/** @var Map $actual_map */
			//todo validate the submitted map values, input them here. Right now we only update the position
			$api_response = new APIResponse;
			$changed      = $actual_map->getChanged();
			if (!count($changed)) {
				$api_response->success = null;
				$api_response->message = "Nothing has changed with this relationship";
			} else {
				$api_response->success = !!$actual_map->save();
				if (in_array('position', $changed)) {
					$actual_map->update_position();
				}
				if ($api_response->success) {
					$api_response->message = "Relationship has been successfully saved";
				} else {
					$api_response->message = "There has been an error saving this relationship.";
					$api_response->data    = [];
				}
			}
			$api_response->data = [
				'map' => $actual_map
			];
		} else {
			try {
				$actual_map = ModelMeta::get_map_between($primary_model, $secondary_model, ModelMeta::TYPE_CLASS);
			} catch (ModelNotFoundException $e) {
				$api_response          = new APIResponse;
				$api_response->message = "There is no way to relate these two entities";
				$api_response->errors  = [
					'code'    => APIResponse::ERROR_NO_MATCHING_CLASS,
					'message' => 'Cannot relate this to that'
				];
				$api_response->data    = [
					'entities' => [$primary_model, $secondary_model]
				];
				return $api_response;
			}
			$actual_map->init_models([$primary_model, $secondary_model]);

			$actual_map->set($proposed_map);
			$user = Session::get_user();
			if ($user) $actual_map->set(['user_id' => $user->id]);
			else Log::init(['no_user'])->log_it();
			$api_response    = new APIResponse;
			$creation_result = $actual_map->create();
			if ($creation_result) {
				try {
					$api_response->data    = [
						'map' => $actual_map->find($creation_result)
					];
					$api_response->message = "Successfully created the relationship";
					$api_response->success = boolval($creation_result);
				} catch (ModelNotFoundException $e) {
					Log::init(['error creating relationship', func_get_args()])->log_it();
				}
			}
			$index = isset($add_arr['position']) ? $add_arr['position'] : ($actual_map->position ? $actual_map->position : 0);

			if (!$api_response->success) {
				$api_response->message = "Could not successfully add the relationship at the specified position \"{$index}\"";
				$api_response->data    = [
					'map' => $actual_map
				];
				$api_response->errors  = [
					'code'    => APIResponse::ERROR_NONEXISTENT_MODEL,
					'message' => "Could not successfully create the relationship"
				];
			}
		}
//		Log::init($api_response)->log_it();
		return $api_response;
	}
	/**
	 * Process a PATCH request
	 * todo work on the secondary model type
	 * @param Model $primary_model The model that is being modified
	 * @param array $request_data  The data sent
	 * @param array $endpoint_entities
	 *
	 * @return array
	 */
	public function patch($primary_model, $request_data, $last_result, &$endpoint_entities = []) {
		if (!isset($request_data['maps']) && !isset($request_data['map'])) {
			return static::save_model(static::handler_init($primary_model), $primary_model, $request_data);
		}
		$result = static::check_save_or_add($request_data, $primary_model, $endpoint_array);
		if ($result) return $result;
		$maps          = isset($request_data['maps']) ? $request_data['maps'] : [];
		$identities    = isset($request_data['identities']) ? $request_data['identities'] : [];
		$proposed_meta = isset($request_data['_meta']) ? $request_data['_meta'] : [];
		$proposed_list = isset($proposed_meta['_list']) ? $proposed_meta['_list'] : [];
		$operations    = isset($request_data['operations']) ? $request_data['operations'] : [];
		if (!isset($proposed_meta['_key'])) return [
			'success' => false,
			'message' => ['text' => 'Could not add relationships',],
		];

		$request_data = [];
		try {
			if ($primary_model->getModelType() === "Section" && strpos(strtolower($proposed_meta['_key']), 'section') !== false) {
				/** @var Section $primary_model */
				$primary_model->findSections();
				$rel_type                  = isset($proposed_meta['_index']) ? RelationshipType::get_type_from_name($proposed_meta['_index']) : null;
				$relationship_index        = RelationshipType::get_name_from_type($rel_type, true);
				$actual_maps               = $primary_model->maps->{$relationship_index};
				$request_data['rel_index'] = $relationship_index;
				$request_data['rel_type']  = $rel_type;
			} else {
				$primary_model->findType($proposed_meta['_key']);
				$actual_maps = $primary_model->maps->{$proposed_meta['_key']};
			}
		} catch (\Exception $e) {
			$api_response          = new APIResponse();
			$api_response->message = "There was an issue locating the requested relationship type";
			$api_response->errors  = [
				'message' => "Unknown error has occurred"
			];
			$api_response->data    = $request_data;
			return $api_response;
		}
		$real_meta                                  = $actual_maps->_meta;
		$real_list                                  = $real_meta->_list;
		$guess_model_type                           = [];
		$secondary_guess_mt                         = static::guess_table($proposed_meta['_index']);
		$guess_model_type[$proposed_meta['_index']] = $secondary_guess_mt;

		[
			$proposed_list,
			$real_list,
			$identities,
			$primary_model,
			$proposed_meta['_index'],
			$actual_maps,
			$request_data,
			$operations
		];

		$secondary_model      = null;
		$secondary_model_type = null;
		$map                  = null;

		$get_random_id     = function ($key, $identity_array) {
			foreach ($identity_array as $index => $identity) {
				if ((isset($identity['id']) && $identity['id'] == $key)
				    || (isset($identity['ent_id']) && $identity['ent_id'] == $key)
				    || (isset($identity['typed_id']) && $identity['typed_id'] == $key)
				) {
					return $index;
				}
			}
			return false;
		};
		$end_array         = [];
		$validate_identity = function ($current_identity, $random_id) use (&$end_array) {
			$missing = [];
			$we_need = ['id', 'ent_id', 'type'];
			foreach ($we_need as $necessary_index) {
				if (!isset($current_identity[$necessary_index]) || !strlen($current_identity[$necessary_index])) $missing[] = $necessary_index;
			}
			if (!empty($missing) || !isset($current_identity)) {
				$api_response          = new APIResponse();
				$api_response->message = 'Resource potentially missing or incomplete';
				$api_response->data    = [
					'identity' => $current_identity,
					'missing'  => $missing,
					'r_id'     => $random_id
				];
				$api_response->errors  = [
					'message' => 'Could not properly identify resource with r_id "' . $random_id . '""'
				];
				$end_array[$random_id] = $api_response;
				return false;
			}
			return true;
		};
		//This is more of a courtesy thing (deletes are done through a separate method). Iterate through the real list, see what's missing. If there is something missing from the real list that shouldn't be, check to see if everything is the way it should be
		foreach ($real_list as $index => $real_id) {
			$random_id = $get_random_id($real_id, $identities);
			if (!$random_id) continue;
			//Check to see if we meant to remove the resource (if the r_id is in the proposed list, then it stays
			if (in_array($random_id, $proposed_list)) continue;
			$current_identity = $identities[$random_id];
			if (!$validate_identity($current_identity, $random_id)) continue;
			//Check to see if we REALLY meant to remove the resource. If there are no operations passed in, we assume that that is not what we are trying to do
			try {
				if (!isset($operations[$random_id])) {
					throw new \Exception("Could not properly interact with {$random_id}; No operations were associated with it. ", APIResponse::ERROR_NO_OPERATIONS);
				}
				//Haha, just kidding. All delete requests will be handled by sending an actual Delete request
				$api_response          = new APIResponse();
				$api_response->success = null;
				$api_response->message = "{$random_id} not deleted. Please submit a DELETE request to remove this resource or relationship.";
				$api_response->data    = [
					'identity' => $current_identity,
					'r_id'     => $random_id
				];
				$api_response->errors  = [
					'message' => 'Please send a DELETE request to remove this resource or relationship',
					'code'    => APIResponse::DEFERRED_IMPROPER_USAGE
				];
				//Just in case we decide to do anything differently in the future
			} catch (\Exception $e) {
				$api_response          = new APIResponse;
				$api_response->message = $e->getMessage();

				$api_response->errors  = [
					'message' => $e->getMessage(),
					'code'    => $e->getCode()
				];
				$end_array[$random_id] = $api_response;
			}
		}
		foreach ($proposed_list as $index => $random_id) {
			/** @var Model $secondary_model */
			if (ModelMeta::is_ent_id($random_id)) {
				try {
					$secondary_model      = ModelMeta::convert_to_class($random_id);
					$secondary_model_type = $secondary_model->getModelType();
				} catch (ModelNotFoundException $e) {
					$api_response          = new APIResponse;
					$api_response->message = "Could not properly identify resource with EntityID = {$random_id}";
					$api_response->errors  = [
						'message' => $e->getMessage(),
						'code'    => APIResponse::ERROR_NONEXISTENT_MODEL
					];
					$end_array[$random_id] = $api_response;
					continue;
				}
			} else {
				/** @var array $current_identity The Identity that we are dealing with in this iteration of the loop */
				$current_identity = isset($identities[$random_id]) ? $identities[$random_id] : null;
				if (!$validate_identity($current_identity, $random_id)) continue;
				$secondary_model_type = $current_identity['type'];
				try {
					$secondary_model = ModelMeta::convert_to_class($secondary_model_type)->find(['id' => $current_identity['id']]);
				} catch (ModelNotFoundException $e) {
					$api_response          = new APIResponse;
					$api_response->message = "Could not properly identify resource";
					$api_response->data    = [
						'identity' => $current_identity,
						'r_id'     => $random_id
					];
					$api_response->errors  = [
						'message' => "Unable to locate resource",
						'code'    => APIResponse::ERROR_NONEXISTENT_MODEL
					];
					$end_array[$random_id] = $api_response;
					if ($e->getCode() == ModelNotFoundException::REASON_NO_MATCHING_CLASS) {
						Log::init(['Could not find ', $secondary_model_type])->log_it();
					}
					continue;
				}
			}
			$real_id = $secondary_model->id;

			$proposed_map = isset($maps[$random_id]) ? $maps[$random_id] : false;
			//If the relationship already exists, check to see if the position (or any other map properties) need to be updated
			if (in_array($real_id, $real_list)) {
				$map = $actual_maps->get_item_at_index($real_id)->_map;
				if (!$map->position) $map->position = $index;
				$end_array[$random_id] = static::save_or_add_relationship($primary_model, $secondary_model, $proposed_map ? $proposed_map : [], $map);
				continue;
			} else {
				//We are creating a new relationship in this case
				if ($proposed_map) {
					$proposed_map['position'] = $index;
					if (isset($request_data['rel_type']))
						$proposed_map['relationship_type'] = $request_data['rel_type'];
				}
				$end_array[$random_id] = static::save_or_add_relationship($primary_model, $secondary_model, $proposed_map ?: []);
			}
		}
		$success = null;
		//The success of the request is only true if the result of each different iteration is successful. It's 0 if some are, and false if none are.
		foreach ($end_array as $result) {
			if (!isset($success)) {
				$success = $result->success;
				continue;
			}
			if (is_bool($success) && !!$result->success != $success) {
				$success = 0;
				break;
			}
		}

		$api_response          = new APIResponse;
		$api_response->message = "Request successfully received";
		$api_response->success = $success;
		$api_response->errors  = false;
		$api_response->data    = $end_array;
		Log::init($end_array)->log_it();
		return $api_response;
	}

	/**
	 * Update the entire model. Likely will be removed and just placed with 'patch'
	 *
	 * @param Model       $model
	 * @param             $req_data
	 * @param null        $last_result
	 * @param array       $endpoint_array
	 * @return mixed
	 * @internal param bool $next_endpoint
	 * @internal param $settings
	 */
	public function put($model, $req_data, $last_result = null, &$endpoint_array = []) {
		return $this->patch($model, $req_data, $last_result, $endpoint_array);
	}
	/**
	 * Retrieve a resource or an array of resources
	 *
	 * @param Model       $model
	 * @param             $req_data
	 * @param null        $last_result
	 * @param array       $endpoint_array
	 * @return mixed
	 */
	public function get($model, $req_data, $last_result = null, &$endpoint_array = []) {
		$api_response          = new APIResponse;
		$api_response->data    = $model;
		$api_response->success = !!$model;
		$api_response->message = !!$model ? "Successfully retrieved resource" : "Could not retrieve resource";
		return $api_response;
	}
	public static function init_model_from_endpoint(Endpoint $endpoint) {
		try {
			return ModelMeta::convert_to_class($endpoint->class_type)->find($endpoint->identifier);
		} catch (\Exception $e) {
			$api_response          = new APIResponse;
			$api_response->success = false;
			$api_response->message = $e->getMessage();
			$api_response->errors  = [
				'message' => $api_response->message
			];
			return $api_response;
		}
	}
	public static function check_save_or_add($request_data, $primary_model, &$endpoint_array) {
		if (isset($request_data['map']) && $primary_model instanceof Model && $primary_model->id && count($endpoint_array)) {
			/** @var Endpoint $secondary_endpoint */
			$secondary_endpoint = array_shift($endpoint_array);
			/** @var Model $secondary_model */
			$secondary_model = static::init_model_from_endpoint($secondary_endpoint);
			if ($secondary_model instanceof APIResponse) return $secondary_model;
			$rel_type = isset($request_data['map']['relationship_type']) ? $request_data['map']['relationship_type'] : false;
			if (!$rel_type) {
				$proposed_meta                            = isset($request_data['_meta']) ? $request_data['_meta'] : [];
				$rel_type                                 = isset($proposed_meta['_index']) ? RelationshipType::get_type_from_name($proposed_meta['_index']) : null;
				$request_data['map']['relationship_type'] = $rel_type;
			}
			$result = static::save_or_add_relationship($primary_model, $secondary_model, $request_data['map'] ?: []);
			return $result;
		}
		return false;
	}
	/**
	 * Add a new model
	 *
	 * @param Model      $primary_model
	 * @param            $request_data
	 * @param null       $last_result
	 * @param Endpoint[] $endpoint_array
	 * @return mixed
	 */
	public function post($primary_model, $request_data, $last_result = null, &$endpoint_array = []) {
		$result = static::check_save_or_add($request_data, $primary_model, $endpoint_array);
		if ($result) return $result;
		if (!($user = Session::get_user())) {
			return [
				'success' => false,
				'message' => [
					'text' => 'must sign in',
				],
			];
		}
		$primary_model = static::get_self_class();
#---VALIDATE AND APPLY THE PROPERTIES OF THE NEW SECTION------------------------------------------------
		$G            = static::handler_init($primary_model);
		$can_continue = $G->set_data(['user' => Session::get_user(), 'beginner' => true])
		                  ->process($request_data, ['maps', '_meta'])
		                  ->can_continue();
		if ($can_continue) {
			$G->set_model_properties();
#---SET THE NEW SECTION'S DATA---------------------------------------------------------------------------
			$new_section_ent_id     = $primary_model->generate_ent_id();
			$primary_model->ent_id  = $new_section_ent_id;
			$primary_model->user_id = $user->id;
#---ACTUALLY CREATE THE NEW SECTION----------------------------------------------------------------------
			$id_of_new_model = $primary_model->create();
#---IF THE SECTION WAS ACTUALLY CREATED, SEE ABOUT ADDING IT TO A COLLECTION OR SECTION------------------
			$message = [];
			if ($id_of_new_model) {
				return new APIResponse("Successfully created Model", true, [
					'ent_id' => $primary_model->ent_id,
					'id'     => $id_of_new_model,
					'model'  => $primary_model,
				], $G->get_all_errors());
			}
		}
		return new APIResponse("Could not create Model", false, [
			'attempt' => $primary_model->getChanged(),
		], $G->get_all_errors());
	}
	/**
	 * @param Model $model
	 * @param       $permission
	 * @return mixed
	 */
	public static function user_can($model, $permission) {
		if (!($model instanceof Model)) return false;
		$model->findPermissions();
		return $model->user_can($permission);
	}
	/**
	 * Delete a model
	 *
	 * @param Model       $primary_model
	 * @param             $req_data
	 * @param null        $last_result
	 * @param array       $endpoint_array
	 * @return mixed
	 */
	public function delete($primary_model, $req_data, $last_result = null, &$endpoint_array = []) {
		$api_response       = new APIResponse;
		$api_response->data = [];
		if (count($endpoint_array)) {
			$secondary_endpoint = array_shift($endpoint_array);
			/** @var Model $secondary_model */
			$secondary_model = static::init_model_from_endpoint($secondary_endpoint);
			if ($secondary_model instanceof APIResponse) return $secondary_model;
			try {
				$map_class                 = ModelMeta::get_map_between($primary_model, $other_model, ModelMeta::TYPE_CLASS);
				$map                       = $map_class->find(['between' => [$primary_model, $secondary_model]]);
				$api_response->success     = !!$map->remove_relationship($primary_model, $secondary_model);
				$api_response->data['map'] = $map;
			} catch (\Exception $e) {
			}
			if (!$api_response->success) {
				$api_response->errors  = [
					'message' => "There has been an error removing the relationship"
				];
				$api_response->message = $api_response->errors['message'];
			} else {
				$api_response->message = "Successfully removed the relationship";
			}
		} else if ($primary_model && !$last_result && static::user_can($primary_model, 'destroy')) {
			$api_response->success = !!$primary_model->remove();
			$api_response->message = $api_response->success ? "Successfully deleted this entity" : "Could not successfully remove this entity";
			if (!$api_response->success) {
				$api_response->data['model'] = $primary_model;
				$api_response->errors        = [
					'message' => "Could not remove entity"
				];
			}
		} else {
			$api_response->message = "Unknown error occurred";
			$api_response->errors  = [
				'message' => "Unknown error occurred"
			];
			$api_response->data    = [
				$primary_model, $last_result, static::user_can($primary_model, 'delete'), $primary_model ? $primary_model->user_can('destroy') : null
			];
		}
		return $api_response;
	}
}