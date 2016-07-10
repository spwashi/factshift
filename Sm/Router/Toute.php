<?php
/**
 * User: sam
 * Date: 5/14/15
 * Time: 7:30 PM
 */

namespace Sm\Router;

use Sm\Core\App;
use Sm\Helper\Helper;
use Sm\Router\Abstraction\Route;

class Toute extends Route {

	/**
	 * Call a route, return the result. The router probably returns this, then this in turn returns the raw output data to be sent to the browser
	 *
	 * @param $http_method
	 *
	 * @return \Sm\View\Abstraction\View|string|array|null
	 */
	public function call($http_method) {
		$return_result = null;
		$default_function = function () { echo ''; }; #The function to run if all else fails
		$APP_NAME = App::_()->name;
		#Check to see if there is a function or a helper that should be run before we begin processing the route
		if (isset($this->helpers[ Helper::PRE_PROCESS ])) {
			Helper::tryToRunReference($this->helpers[ Helper::PRE_PROCESS ], $this->parameters);
		}

		if (!isset($this->callback) || (is_string($this->callback) && $this->callback == '_load_app')) {
			$default_function = App::_()->default_route_function;
			$this->callback = $default_function;
		}
		
		if (is_callable($this->callback)) {
			$return_result = call_user_func_array($this->callback, $this->parameters);
		} elseif (is_string($this->callback) && strpos($this->callback, '@') > 0) { # If the callback is a string and it looks like a valid short class syntax...
			$callback_array = explode('@', $this->callback);
			$class_name = $callback_array[0];
			$assumed_class_name = ucfirst($APP_NAME) . '\\Controller\\' . $class_name;
			$class_method = null;

			#If the 'method' field of the callback explosion ends up being one of these three wildcards, the Router should have set
			#   the name of the method that is to be used
			if (strpos($callback_array[1], '*') !== false) {
				$class_method = str_replace('*', $this->method, $callback_array[1]);
			} else {
				$class_method = $callback_array[1];
			}

			if (class_exists($assumed_class_name)) {
				$class = new $assumed_class_name;
				#If the class has a property index_if_null set to true, then assume that we're going to use the 'index' method if there hasn't been one chosen
				if (($class_method == '' || $class_method == null) && isset($class->index_if_null) && $class->index_if_null) {
					$class_method = 'index';
				}

				#If the class has a property 'post_only_methods', check that to see if it has the name of the method we tried to call
				#   if it does, say that we can't call it by trying to call a fake method
				if (isset($class->post_only_methods) && is_array($class->post_only_methods)) {
					if (strtolower($http_method) != 'post' && in_array($class_method, $class->post_only_methods)) {
						$class_method = 'this_should_fail';
					}
				}

				if (method_exists($class, $class_method)) {
					$return_result = call_user_func_array([ $class, $class_method ], $this->parameters);
				} else {
					$return_result = call_user_func($default_function);
				}
			}
		} else {
			$return_result = call_user_func($default_function);
		}
		#These helpers are run in the Output class (I know, that might be unclear and/or messy)
		#Initialize and name the helpers here so they can be run later in the Output class.
		if (isset($this->helpers[ Helper::POST_PROCESS ])) {
			#This is run right before the output class does anything and takes the $result of this function as its only parameter
			$filter = $this->helpers[ Helper::POST_PROCESS ];
			Helper::init($filter, Helper::POST_PROCESS);
		}
		if (isset($this->helpers[ Helper::PRE_OUTPUT ])) {
			#This is run right after the output class does its thing and takes the end output as its only parameter(before pushing it to the screen)
			$filter = $this->helpers[ Helper::PRE_OUTPUT ];
			Helper::init($filter, Helper::PRE_OUTPUT);
		}
		return $return_result;
	}
}