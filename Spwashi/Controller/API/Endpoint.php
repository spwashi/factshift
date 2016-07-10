<?php
/**
 * User: Sam Washington
 * Date: 5/8/16
 * Time: 3:33 PM
 */

namespace Spwashi\Controller\API;

use Sm\Model\Model;

class Endpoint implements \JsonSerializable {
    /** @var string This is the place that we will look to find a resource */
    public $table_name;
    /** @var null|string|array Whatever it is that we are using to identify the resource we are referring to */
    public $identifier;
    /** @var string This is the classtype of the endpoint that we are dealing with */
    public $class_type;
    /** @var Model|null Sometimes the Endpoint refers to a Model that is not immediately known */
    public $model;

    public function __construct($table_name, $identifier, $class_type) {
        $this->table_name = $table_name;
        $this->identifier = $identifier;
        $this->class_type = $class_type;
    }

    function jsonSerialize() {
        return get_object_vars($this);
    }
}