<?php
/**
 * User: Sam Washington
 * Date: 11/19/16
 * Time: 10:23 PM
 */

namespace Sm\Entity\Model\Abstraction;


use Sm\Development\Log;
use Sm\Entity\Abstraction\Entity;
use Sm\Entity\Model\EntityMeta;
use Sm\Entity\Model\Identifier;
use Sm\Entity\Model\ModelIterator;
use Sm\Entity\Model\ModelNotFoundException;
use Sm\Identifier\Identifiable;

/**
 * Class Model
 *
 * @package Sm\Entity\Model\Abstraction
 */
abstract class Model implements \JsonSerializable, Identifiable {
    protected static $default_attributes = [ ];
    protected static $is_init            = false;
    protected static $model_type         = false;
    
    protected $_model_type;
    protected $_default_attributes;
    protected $isExistent;
    
    /** @var Identifier $Identifier */
    protected $Identifier;
    protected $attributes = [ ];
    protected $_changed   = [ ];
    
    protected $_errors = [ 'properties' => [ ], 'not_set' => [ ] ];
    
    protected static $_cache = [ ];
    
    protected static function cache(Model &$model) {
        $typed_id = $model->Identifier->getTypedId();
        $ent_id   = $model->Identifier->getEntId();
        if ($typed_id) static::$_cache[ $typed_id ] =& $model;
        if ($ent_id) static::$_cache[ $ent_id ] =& $model;
    }
    
    public static function d_c() {
        return static::$_cache;
    }
    
    /**
     * @param \Sm\Entity\Model\Identifier|string $identifier
     *
     * @return Model|null
     */
    public static function &retrieve($identifier) {
        if ($identifier instanceof Identifier) {
            $typed_id = $identifier->getTypedId();
            $ent_id   = $identifier->getEntId();
            
            if ($typed_id && isset(static::$_cache[ $typed_id ])) return static::$_cache[ $typed_id ];
            if ($ent_id && isset(static::$_cache[ $ent_id ])) return static::$_cache[ $ent_id ];
        } else if (is_string($identifier)) {
            if (isset(static::$_cache[ $identifier ])) return static::$_cache[ $identifier ];
        }
        $tmp = null;
        return $tmp;
    }


#########################################################
#      Constructors, initializers, static getters       #
#########################################################
    public function __construct($attributes = [ ], Identifier $identifier = null) {
        static::_init();
        $this->attributes = static::$default_attributes;
        if (count($attributes)) $this->set($attributes);
        $this->Identifier = $identifier ?? new Identifier(null, null, static::$model_type);
    }
    protected static function _init() {
        if (static::$is_init || (strpos(static::class, '@') && !static::$model_type)) return null;
        try {
            static::$model_type = static::$model_type ?? EntityMeta::convert_to_something(static::class, EntityMeta::TYPE_MODEL_TYPE);
            if (!static::$model_type) throw new ModelNotFoundException([ "Model has no type", static::_log_() ], ModelNotFoundException::REASON_UNIMPLEMENTED);
            static::$default_attributes = EntityMeta::get_model_type_properties(static::$model_type);
            if (!count(static::$default_attributes)) throw new ModelNotFoundException([ "Model has no properties", static::_log_() ], ModelNotFoundException::REASON_UNIMPLEMENTED);
            static::$is_init = true;
            return true;
        } catch (\Exception $e) {
            static::$is_init = false;
            Log::init([ $e->getMessage(), $e->getCode(), $e->getLine() ])->log_it();
            return false;
        }
    }
    
    public static function getModelType() {
        return static::$model_type;
    }
    public static function getDefaultAttributes() {
        static::_init();
        return static::$default_attributes;
    }
#########################################################
#        public, non-static getters and setters         #
#########################################################
    /**
     * @param array $attributes
     * @param bool  $mark_as_changed
     * @param bool  $do_validate
     *
     * @return $this
     */
    public function set(array $attributes, $mark_as_changed = true, $do_validate = true) {
        foreach ($attributes as $attr => $val) {
            if (static::has_attribute($attr)) {
                if ($val instanceof Entity || $val instanceof Model) {
                    $val = $val->get('id');
                }
                if ($attr === 'id') $this->Identifier->setId($val);
                elseif ($attr === 'ent_id') $this->Identifier->setEntId($val);
                $previous_value = $this->attributes[ $attr ] ?? null;
                if ($do_validate) {
                    $this->attributes[ $attr ] = $val;
                } else $this->attributes[ $attr ] = $val;
                if ($mark_as_changed && !array_key_exists($attr, $this->_changed)) $this->_changed[ $attr ] = $previous_value;
            } else {
                $this->_errors['not_set'][ $attr ] = $val;
            }
        }
        return $this;
    }
    public function hasAttribute($attribute) {
        return array_key_exists($attribute, $this->attributes);
    }
    public function &get(string $name) {
        $val = isset($this->attributes[ $name ]) ? $this->attributes[ $name ] : null;
        if (isset($this->attributes[ $name ])) {
            if (is_numeric($val) && !is_float($val)) {
                $this->attributes[ $name ] = intval($this->attributes[ $name ]);
            }
            return $this->attributes[ $name ];
        } else {
            $val = null;
            return $val;
        }
    }
    public function &getAttributes() {
        return $this->attributes;
    }
    public function getChanged() {
        return $this->_changed;
    }
    /**
     * @return Identifier
     */
    public function getIdentifier(): Identifier {
        return $this->Identifier;
    }
    public function getUniqueIdentifier($type = null) {
        switch ($type) {
            case Identifiable::ENT_ID:
                return null;
                break;
            default:
            case Identifiable::GENERIC_IDENTIFIER:
            case Identifiable::TYPED_IDENTIFIER:
                return $this->Identifier->getTypedId();
                break;
        }
    }
    public function getTypedId() {
        return $this->Identifier->getTypedId();
    }
    /**
     * @return mixed
     */
    abstract public function getIsExistent();
#########################################################
#                 Magic Methods                         #
#########################################################
    public function &__get($name) {
        return $this->get($name);
    }
    public function __set($attr, $value) {
        $this->set([ $attr => $value ]);
    }
    public function __isset($name) {
        return isset($this->attributes[ $name ]);
    }
    public function __debugInfo() {
        return [
            'attributes' => $this->getAttributes(),
            'errors'     => $this->_errors,
            'changed'    => $this->_changed,
        ];
    }
#########################################################
#                      Finders                          #
#########################################################
    /**
     * @param      $search
     * @param null $attributes
     *
     * @return \Sm\Entity\Model\Abstraction\Model|static
     * @throws \Sm\Entity\Model\ModelNotFoundException
     */
    public static function &find($search, $attributes = null) : Model {
        static::_init();
        /** @var Model $Instance */
        $Instance = new static;
        $search   = static::resolve_search($search);
        if (isset($search['id']) && static::retrieve(static::$model_type . '|' . $search['id'])) {
            return static::retrieve(static::$model_type . '|' . $search['id']);
        }
        $properties = static::search_for_models($search,
                                                $attributes ?? array_keys(static::$default_attributes));
        if (!$properties) {
            throw new ModelNotFoundException([ "Could not find Model " . static::$model_type, $search ]);
        }
        $Instance->set($properties, false, false);
        if ($Instance->retrieve($Instance->Identifier)) {
            $Instance = &$Instance->retrieve($Instance->Identifier);
            foreach ($Instance->_changed as $changed => $prev) {
                if (isset($properties[ $changed ])) unset($properties[ $changed ]);
            }
            $Instance->set($properties, false, false);
        } else {
            $Instance->cache($Instance);
        }
        return $Instance;
    }
    public static function &findAll($search = null, $attributes = null) {
        static::_init();
        $search        = static::resolve_search($search);
        $result        = static::search_for_models($search, $attributes, true);
        $ModelIterator = new ModelIterator;
        if (!$result) return $ModelIterator;
        foreach ($result as $properties) {
            /** @var Model $Instance */
            $Instance = new static;
            $Instance->set($properties, false, false);
            
            if ($Instance->retrieve($Instance->Identifier)) {
                $Instance = &$Instance->retrieve($Instance->Identifier);
                foreach ($Instance->_changed as $changed => $prev) {
                    if (isset($properties[ $changed ])) unset($properties[ $changed ]);
                }
                $Instance->set($properties, false, false);
            } else {
                $Instance->cache($Instance);
            }
            $ModelIterator->push($Instance);
            unset($Instance);
        }
        return $ModelIterator;
    }
#########################################################
#                 CRUD operations                       #
#########################################################
    abstract public function save():bool;
    abstract public function create():bool;
    abstract public function destroy():bool;
#########################################################
#                  Error Handling                       #
#########################################################
    public function hasErrors() {
        return count($this->_errors['properties']) || count($this->_errors['not_set']);
    }
    public function flushErrors() {
        $errors        = $this->_errors;
        $this->_errors = [ 'properties' => [ ], 'not_set' => [ ] ];
        return $errors;
    }
    public function getErrors() {
        return $this->_errors;
    }
#########################################################
#              Functions to help find models            #
#########################################################
    
    /**
     * @param string $attribute
     *
     * @return bool
     */
    protected static function has_attribute(string $attribute) {
        return (array_key_exists($attribute, static::$default_attributes));
    }
    protected static function resolve_search($search) {
        if ($search === null && static::canFindAll()) return null;
        else if ($search instanceof Identifier) {
            $id     = $search->getId();
            $ent_id = $search->getEntId();
            $search = [ ];
            if ($id) $search['id'] = $id;
            if ($ent_id) $search['ent_id'] = $ent_id;
        } else if (is_array($search)) {
        } else if (is_string($search) || is_numeric($search)) {
            $_guess_attribute_name = static::guess_attribute_from_value($search);
            if (!$_guess_attribute_name) throw new ModelNotFoundException("Could not guess attribute name", ModelNotFoundException::REASON_NOT_SEARCHED);
            $search = [ $_guess_attribute_name => $search ];
        } else {
            throw new ModelNotFoundException("Could not resolve search", ModelNotFoundException::REASON_UNIMPLEMENTED);
        }
        foreach ($search as $index => $item) {
            if ($item instanceof Entity || $item instanceof Model) {
                $search[ $index ] = $item->get('id');
            }
        }
        return $search;
    }
    protected static function search_for_models($search, $attributes = [ ], $find_all = false) {
        if (!is_array($search)) throw new ModelNotFoundException([ "Not sure what to do with search", $search ]);
        throw new ModelNotFoundException("No implemented method to find " . static::$model_type, ModelNotFoundException::REASON_UNIMPLEMENTED);
    }
    protected static function guess_attribute_from_value($value) {
        if (EntityMeta::is_id($value)) return 'id';
        if (filter_var($value, FILTER_VALIDATE_EMAIL)) return 'email';
        if (EntityMeta::is_ent_id($value)) return 'ent_id';
        return false;
    }
    public static function canFindAll() {
        return false;
    }
#########################################################
#        Logging and serialization functions            #
#########################################################
    public function jsonSerialize() {
        $attributes                 = $this->getAttributes();
        $attributes['_model_type']  = static::$model_type;
        $attributes['_object_type'] = 'Model';
        return $attributes;
    }
    public static function _log_() {
        if (static::$is_init)
            static::_init();
        return ([
            'class'              => static::class,
            'default_attributes' => static::$default_attributes,
            'is_init'            => static::$is_init,
            'model_type'         => static::$model_type,
        ]);
    }
}