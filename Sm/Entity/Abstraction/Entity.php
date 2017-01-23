<?php
/**
 * User: Sam Washington
 * Date: 11/19/16
 * Time: 10:48 PM
 */

namespace Sm\Entity\Abstraction;


use Sm\Core\App;
use Sm\Entity\Model\Abstraction\Model;
use Sm\Entity\Model\Identifier;
use Sm\Entity\Model\ModelNotFoundException;
use Sm\Entity\Relationship\RelationshipIndexContainer;
use Sm\Identifier\Identifiable;
use Sm\Validation\Abstraction\Validator;
use Sm\Validation\RejectingValidator;
use Sm\Validation\Validated;

/**
 * Class Entity
 *
 * @package Sm\Entity
 * @property-read RelationshipIndexContainer $relationships
 * @property-read int                        $id
 */
abstract class Entity implements \JsonSerializable, Identifiable, Validated {
    const PURPOSE_PRIMARY = 1;
    protected static $entity_type;
    protected        $_entity_type;
    
    protected static $default_attributes = [ ];
    protected static $is_init            = false;
    
    /** @var Identifier $Identifier */
    protected $Identifier = null;
    /** @var Model $PrimaryModel */
    protected $PrimaryModel;
    /** @var mixed $attributes */
    protected $attributes = [ ];
#########################################################
#            Initializers & Constructors                #
#########################################################
    /**
     * Initialize an Entity from a Model. This sets the primary model of the Entity
     *
     * @param \Sm\Entity\Model\Abstraction\Model|\Sm\Entity\Model\Abstraction\Model[] ...$Models
     *
     * @return $this
     */
    public static function initFromModel(Model ...$Models) {
        $Instance = new static;
        if (count($Models)) {
            $Instance->addModel($Models[0], Entity::PURPOSE_PRIMARY);
            array_shift($Models);
            foreach ($Models as $index => &$model) {
                $Instance->addModel($model, false);
                unset($model);
            }
        }
        return $Instance;
    }
    /**
     * Static constructor for the sake of cleanliness
     *
     * @return static
     */
    public static function init() {
        return new static;
    }
#########################################################
#            Getters and Setters                        #
#########################################################
    /**
     * Get the default attributes of this Entity
     *
     * @return array|mixed
     */
    public function getDefaultAttributes() {
        return App::_()->IoC->EntityMeta->get_entity_type_properties($this->_entity_type);
    }
    /**
     * Get an attribute of an Entity
     *
     * @param $name
     *
     * @return mixed|null
     */
    public function &__get($name) {
        return $this->get($name);
    }
    /**
     * Get the attributes of an Entity
     *
     * @param $name
     *
     * @return mixed|null
     */
    public function &get($name) {
        $var = null;
        if (!$this->PrimaryModel) {
            if (isset($this->attributes[ $name ])) return $this->attributes[ $name ];
            $var = null;
            return $var;
        }
        return $this->PrimaryModel->get($name);
    }
    /**
     * Set an attribute of the Entity
     *
     * @param $name
     * @param $value
     */
    public function __set($name, $value) {
        $this->set([ $name => $value ]);
    }
    /**
     * Set the attributes of the Entity. If the Model that would hold these attributes doesn't exist, store them internally
     *
     * @param array $attributes
     *
     * @return $this
     */
    public function set(array $attributes) {
        if ($this->PrimaryModel) $this->PrimaryModel->set($attributes);
        else {
            $defaults = $this->getDefaultAttributes();
            foreach ($attributes as $index => $attribute) {
                if (array_key_exists($index, $defaults)) {
                    $this->attributes[ $index ] = $attribute;
                }
            }
        }
        return $this;
    }
    /**
     * Get a string that can uniquely identify an Entity
     * todo think about whether this should just return some values from the Model or not
     *
     * @param null $type
     *
     * @return bool|mixed|null
     */
    public function getUniqueIdentifier($type = null) {
        return $this->PrimaryModel ? $this->PrimaryModel->getUniqueIdentifier($type) : false;
    }
    /**
     * Get the attributes of this Entity
     *
     * @return array|mixed
     */
    public function getAttributes() {
        if ($this->PrimaryModel) return $this->PrimaryModel->getAttributes();
        return $this->attributes;
    }
    /**
     * Get the entity_type
     *
     * @return mixed
     */
    public function getEntityType() {
        return $this->_entity_type ?? static::$entity_type ?? App::_()->IoC->EntityMeta->convert_to_something(static::class);
    }
    /**
     * @return \Sm\Entity\Validation\EntityValidator|\Sm\Validation\Abstraction\Validator|\Sm\Validation\RejectingValidator
     */
    public function getValidator() : Validator {
        $entity_type = null;
        if ($entity_type = $this->_entity_type) {
            $classname = App::_()->name . "\\Entity\\Validation\\{$entity_type}Validator";
            if (class_exists($classname)) return new $classname($this);
        }
        return new RejectingValidator;
    }
#########################################################
#            Attribute functions                        #
#########################################################
    public function hasAttribute($attribute) {
        if (!$this->PrimaryModel) {
            $defaults = $this->getDefaultAttributes();
            return array_key_exists($attribute, $defaults);
        }
        return $this->PrimaryModel->hasAttribute($attribute);
    }
#########################################################
#            Model functions                            #
#########################################################
    /**
     * Add a Model to the Entity. Usually, this will be THE model that the Entity is based on, but I bet there are instances
     * when an Entity is comprised of more than one Model
     *
     * @param Model $Model
     * @param int   $purpose
     *
     * @return $this
     */
    public function addModel(Model &$Model, $purpose = Entity::PURPOSE_PRIMARY) {
        if ($purpose === Entity::PURPOSE_PRIMARY) {
            $this->PrimaryModel =& $Model;
            $this->Identifier   = $this->PrimaryModel->getIdentifier();
        }
        return $this;
    }
    /**
     * Make sure the necessary Models of this Entity exist
     *
     * @return bool
     */
    public function makeModels() {
        $model_type = App::_()->IoC->EntityMeta->entity_type_to_model_type($this->_entity_type);
        if (is_array($model_type)) return false;
        try {
            $this->PrimaryModel = App::_()->IoC->EntityMeta->model_type_to_class($model_type);
            $this->PrimaryModel->set($this->attributes);
        } catch (\Exception $e) {
            return false;
        }
        return true;
    }
    /**
     * Get the Model that holds the core attributes of this Entity
     *
     * @return Model
     */
    public function &getPrimaryModel() {
        return $this->PrimaryModel;
    }
#########################################################
#            CRUD                                       #
#########################################################
    /**
     * Initialize the PrimaryModel by "finding" it based on an identifier
     *
     * @param $identifier
     *
     * @return $this
     * @throws \Sm\Entity\Model\ModelNotFoundException
     */
    public function findModel($identifier) {
        $make_model = $this->makeModels();
        if (!$make_model) throw new ModelNotFoundException("Could not initialize Model");
        $Model = $this->PrimaryModel->find($identifier);
        $this->addModel($Model, Entity::PURPOSE_PRIMARY);
        return $this;
    }
    /**
     * Create the Model, save the Entity
     *
     * @return bool|null
     */
    public function create() {
        if (!$this->PrimaryModel) if (!$this->makeModels()) return null;
        return $this->PrimaryModel->create();
    }
    /**
     * Save an Entity
     *
     * @return bool
     */
    public function save() {
        return $this->PrimaryModel->save();
    }
    /**
     * Destroy an Entity
     *
     * @return bool
     */
    public function destroy() {
        return $this->PrimaryModel->destroy();
    }
#########################################################
#            Logging and Serialization                  #
#########################################################
    public function __toString() {
        return json_encode($this);
    }
    
    public function jsonSerialize() {
        $attributes = [
            '_entity_type' => $this->_entity_type,
            '_object_type' => 'Entity',
            'attributes'   => $this->PrimaryModel ? $this->PrimaryModel : $this->attributes,
        ];
        return $attributes;
    }
    /**
     * Return an array to serialize this object in the most compact way possible. Useful to avoid circular references
     *
     * @param array|null $config
     *
     * @return array
     */
    public function jsonSerializeCompact($config = null) {
        return $attributes = [
            '_entity_type' => $this->_entity_type,
            '_object_type' => 'Entity',
            'attributes'   => $this->PrimaryModel ? $this->PrimaryModel : $this->attributes,
        ];
    }
    /**
     * Function for logging a class's static properties
     *
     * @return array
     */
    public static function _log_() {
        return [
            'entity_type'        => static::$entity_type,
            'default_properties' => static::$default_attributes,
        ];
    }
}