<?php
/**
 * User: Sam Washington
 * Date: 11/20/16
 * Time: 1:36 AM
 */

namespace Sm\Entity\Model;

/**
 * @t
 */

use Sm\Core\App;
use Sm\Core\Inflector;
use Sm\Development\Log;
use Sm\Entity\Entity;
use Sm\Entity\Model\Abstraction\Model;

class EntityMeta {
    const TYPE_TABLE       = 'TYPE_TABLE';
    const TYPE_CLASSNAME   = 'TYPE_CLASSNAME';
    const TYPE_PREFIX      = 'TYPE_PREFIX';
    const TYPE_ENTITY_TYPE = 'TYPE_ENTITY_TYPE';
    const TYPE_MODEL_TYPE  = 'TYPE_MODEL_TYPE';
    
    const FIND_API_SETTABLE  = 'api_settable';
    const FIND_API_GETTABLE  = 'api_gettable';
    const FIND_DEFAULT       = 'all';
    const FIND_REQUIRED      = 'required';
    const FIND_RELATIONSHIPS = 'relationships';
    
    /**
     * @var Model[]
     */
    protected static $registry = [ ];
    
    protected static $enum_values                            = [ ];
    protected static $entity_type_to_model_type              = [ ];
    protected static $entity_type_to_relationships           = [ ];
    protected static $linked_entities_to_model_type          = [ ];
    protected static $model_type_to_linked_entity_properties = [ ];
    protected static $model_type_to_properties               = [ ];
    protected static $entity_type_to_config                  = [ ];
    static           $prefix_to_model_type                   = [ ];
    protected static $table_to_model_type                    = [ ];
    protected static $standard_config                        = [ ];
    protected static $linked_entities_to_relationships       = [ ];
    
    protected static $debug = [ ];
#########################################################
#            Initialization functions                   #
#########################################################
    public static function init(array $array) {
        $__standard_config                        = $array['_'] ?? [ ];                            #An array of various config settings that we are going to use as defaults
        static::$standard_config                  = $__standard_config;
        static::$standard_config['relationships'] = static::$standard_config['relationships'] ?? [ ];
        static::_init_models($array['models'] ?? null);
        static::_init_entities($array['entities'] ?? null);
//        static::$debug = [ static::get_potential_relationships('section', [ 'section', 'concepts' ]) ];
        return static::$debug;
    }
#########################################################
# Public functions that are to be used be other classes #
#########################################################
    /**
     * Based on a _something_ that can be converted to a model_type, get the properties associated
     *
     * @param $model_type
     *
     * @return array|mixed
     */
    public static function get_model_type_properties($model_type) {
        $model_type = static::convert_to_something($model_type, EntityMeta::TYPE_MODEL_TYPE);
        if (!$model_type || !isset(static::$model_type_to_properties[ $model_type ])) return [ ];
        return static::$model_type_to_properties[ $model_type ];
    }
    /**
     * Based on a _something_ that can be converted to an entity_type, get the properties associated with the entity
     *
     * @param        $entity_type
     * @param string $property_type
     *
     * @return array|mixed
     */
    public static function get_entity_type_properties($entity_type, $property_type = EntityMeta::FIND_DEFAULT) {
        $entity_type = static::convert_to_something($entity_type, EntityMeta::TYPE_ENTITY_TYPE);
        if (!$entity_type || !isset(static::$entity_type_to_config[ $entity_type ])) return [ ];
        
        $config = static::$entity_type_to_config[ $entity_type ]['properties'] ?? [ ];
        switch ($property_type) {
            case EntityMeta::FIND_DEFAULT:
                return $config['all'] ??[ ];
            case EntityMeta::FIND_API_GETTABLE:
                return $config['api_gettable']??[ ];
            case EntityMeta::FIND_API_SETTABLE:
                return $config['api_settable'] ?? [ ];
        }
        return [ ];
    }
    public static function get_linked_properties($linked_entities) {
        $mt = static::convert_linked_entities_to_model_type($linked_entities);
        return static::$model_type_to_linked_entity_properties[ $mt ] ??[ ];
    }
    public static function get_enum_value(string $which, $value = null) {
        $array = static::$enum_values[ Inflector::pluralize(strtolower($which)) ] ?? false;
        return isset($value) ? ($array[ $value ] ?? false) : $array;
    }
    public static function get_index_from_linked_entity($linked_entities, $entity_type_to_find, $is_reciprocal = false) {
        $entity_type_to_find = static::convert_to_something($entity_type_to_find);
        if (!is_array($linked_entities)) {
            $linked_entities = [ $linked_entities, $entity_type_to_find ];
        }
        $linked_entities      = static::convert_to_something($linked_entities);
        $linked_entity_string = static::get_linked_entity_string($linked_entities);
        if (!$linked_entity_string || !strlen($linked_entity_string)) return false;
        
        # --- Get the model type that links the entities
        $mt = static::convert_linked_entities_to_model_type($linked_entity_string) ??'';
        
        # --- If there isn't exactly one Model Type (IDK why that's possible) , return false
        if (!$mt || !is_string($mt)) return false;
        
        # --- Get the properties that hold each relationship in the table (or whatever)
        $linked_properties = static::$model_type_to_linked_entity_properties[ $mt ] ??false;
        if (!$linked_entity_string) return false;
        
        $possible_indices = [ ];
        foreach ($linked_properties as $linked_property => $entity_type) {
            if ($entity_type_to_find === $entity_type) {
                $possible_indices[] = $linked_property;
            }
        }
        
        $len = count($possible_indices);
        # --- If the length is one, that's what we expect
        if ($len === 1) return $possible_indices[0];
        
        # --- Otherwise, use the reciprocity of the relationship to determine where this lies
        # --- Useful for a primary/secondary kind of situation
        if ($len === 2) return $is_reciprocal ? $possible_indices[1] : $possible_indices[0];
        
        # Otherwise, we don't know what to do
        return false;
    }
    /**
     * Given an array of _somethings_ that can be converted to entity types, return a model type that matches
     *
     * @param string|array $linked_entities
     *
     * @return bool|mixed
     */
    public static function convert_linked_entities_to_model_type($linked_entities) {
        if (is_array($linked_entities)) $linked_entities = self::get_linked_entity_string(static::convert_to_something($linked_entities, static::TYPE_ENTITY_TYPE));
        if (!is_string($linked_entities)) return false;
        $model_types = static::$linked_entities_to_model_type[ $linked_entities ] ?? false;
        $length      = count($model_types);
        if ($model_types && $length) return $length === 1 ? $model_types[0] : $model_types;
        return false;
    }
    /**
     * Convert _something_ to another _something_.
     * Used to link models or strings like "section_id", "Section", "sections" to their potential
     *
     * @param        $to_convert
     * @param string $convert_to
     *
     * @param bool   $skip_verification
     *
     * @return array|bool|mixed|null|string
     */
    public static function convert_to_something($to_convert, $convert_to = EntityMeta::TYPE_ENTITY_TYPE, $skip_verification = false) {
        $entity_type = $model_type = $table_name = $prefix = $classname = null;
        
        #--- I don't know why this is here
        #--- Oh yeah, if we are trying to get _something_ based on an uninitialized class property, there is a problem that we have to check on
        if (!$to_convert) Log::init([ func_get_args() ], debug_backtrace()[0])->log_it();
        
        if (is_array($to_convert)) {
            foreach ($to_convert as $k => $nn) {
                $to_convert[ $k ] = static::convert_to_something($nn, $convert_to, $skip_verification);
            }
            return $to_convert;
        }
        if ($to_convert instanceof Model) {
            if ($to_convert instanceof TableModel) $table_name = $to_convert->getTableName();
            $entity_type = $model_type = $to_convert->getModelType();
            $classname   = get_class($to_convert);
            $prefix      = static::get_prefix_from_ent_id($to_convert->get('ent_id'));
        } else if ($to_convert instanceof Entity) {
            $entity_type = $to_convert->getEntityType();
        }
        if (is_string($to_convert)) {
            $to_convert = str_replace([ 'Model', 'primary_', 'secondary_', '_id', '_role', '_type' ], '', $to_convert);
            if (strpos($to_convert, '\\')) {
                $name_arr   = explode('\\', $to_convert);
                $to_convert = $name_arr[ count($name_arr) - 1 ];
            }
            $entity_type = $model_type = static::def_convert_to_something($to_convert, 'entity_type');
            $table_name  = static::def_convert_to_something($to_convert, 'table_name');
        }
        if (!$skip_verification) {
            #--- Make sure all of the strings that we use to deduce the type of _something_ that we are referring to exists in the right object
            if ($entity_type && !isset(static::$entity_type_to_config[ $entity_type ])) $entity_type = false;
            if ($model_type && !isset(static::$model_type_to_properties[ $model_type ])) $model_type = false;
            if ($table_name && !isset(static::$table_to_model_type[ $table_name ])) $table_name = false;
        }
        #--- If the Entity type exists and is mapped to multiple different model types, we don't really know how to deal with things.
        #--- --- log that we don't know what to do
        if ($entity_type && !$model_type && isset(static::$entity_type_to_model_type[ $entity_type ])) {
            $model_type = static::$entity_type_to_model_type[ $entity_type ];
            if (is_array($model_type)) {
                if (count($model_type) === 1) $model_type = $model_type[0];
                else Log::init([ "Not sure how to convert to model type", $to_convert, $model_type ])->log_it();
            }
        }
        
        #--- Return the _something_
        switch ($convert_to) {
            case (static::TYPE_ENTITY_TYPE):
                if ($entity_type) return $entity_type;
                #---
                if ($model_type) return $model_type;
                if ($prefix) return static::$prefix_to_model_type[ $prefix ] ?? false;
                break;
            case (static::TYPE_MODEL_TYPE):
                if ($model_type) return $model_type;
                break;
            case (static::TYPE_TABLE):
                if ($table_name) return $table_name;
                if ($model_type) return array_search($model_type, static::$table_to_model_type);
                if ($entity_type && ($res = array_search($entity_type, static::$table_to_model_type))) return $res;
                break;
            case (static::TYPE_PREFIX):
                if ($prefix) return $prefix;
                if ($model_type) return array_search($entity_type, static::$prefix_to_model_type) ?: false;
                break;
        }
        return false;
    }
    
    /**
     * Get the classname associated with a Model type
     *
     * @param string $model_type
     *
     * @return string
     * @throws \Sm\Entity\Model\ModelNotFoundException
     */
    public static function model_type_to_classname(string $model_type) {
        if (!$model_type) throw new ModelNotFoundException("There is no model type to use");
        if (strpos($model_type, 'Map')) $model_type = "Map\\$model_type";
        else $model_type .= 'Model';
        return App::_()->name . '\\Entity\\Model\\' . $model_type;
    }
    /**
     * Get the classname associated with a Model type
     *
     * @param string $entity_type
     *
     * @return string
     * @throws \Sm\Entity\EntityNotFoundException
     */
    public static function entity_type_to_classname(string $entity_type) {
        return App::_()->name . '\\Entity\\' . $entity_type;
    }
    
    /**
     * Given _something_ that can be converted to a ModelType, return a matching class or throw an error
     *
     * @param $model_type
     *
     * @return Model
     * @throws \Sm\Entity\Model\ModelNotFoundException
     */
    public static function model_type_to_class($model_type) {
        $classname = static::model_type_to_classname(static::convert_to_something($model_type));
        if ($classname && class_exists($classname)) return new $classname();
        throw new ModelNotFoundException("Could not convert {$model_type} to Model class because {$classname} does not exist");
    }
    /**
     * Given _something_ that can be converted to an Entity Type, return a matching class or throw an error
     *
     * @param      $entity_type
     *
     * @return \Sm\Entity\Entity
     * @throws \Sm\Entity\Model\ModelNotFoundException
     */
    public static function entity_type_to_class($entity_type) {
        $entity_type = static::convert_to_something($entity_type);
        $classname   = static::entity_type_to_classname($entity_type);
        if ($classname && class_exists($classname)) return new $classname();
        throw new ModelNotFoundException("Could not convert {$entity_type} to Entity class because {$classname} does not exist");
    }
    public static function entity_type_to_model_type($entity_type) {
        $entity_type = static::convert_to_something($entity_type);
        if (!isset(static::$entity_type_to_model_type[ $entity_type ])) return false;
        if (is_string(static::$entity_type_to_model_type[ $entity_type ])) return static::$entity_type_to_model_type[ $entity_type ];
        $len = count(static::$entity_type_to_model_type[ $entity_type ]);
        return $len === 1 ? static::$entity_type_to_model_type[ $entity_type ][0] : static::$entity_type_to_model_type[ $entity_type ];
    }
    /**
     * @param null $entity_type
     * @param null $linked_entities_array
     * @param bool $skip_reciprocals
     *
     * @return array|mixed
     *
     */
    public static function get_potential_relationships($entity_type = null, $linked_entities_array = null, $skip_reciprocals = false) {
        #--- If the entity type or entities
        if (!$entity_type && !$linked_entities_array) return [ ];
        /**
         * A function that can be used to skip all reciprocal relationship_indices
         *
         * @var callable $_skip_reciprocals_function
         * @return bool
         */
        $_skip_reciprocals_function = function ($k) { return strpos($k, 'reciprocal_') !== 0; };
        
        #--- Convert the Entity Type to an EntityType if it doesn't exist
        if ($entity_type) {
            $entity_type = static::convert_to_something($entity_type, static::TYPE_ENTITY_TYPE) ?? null;
            #--- If we don't have the entity type, we don't know it. Return an empty array
            if (!$entity_type) return [ ];
        }
        
        #--- If we specified the Entity type but NOT the linked_entities, return all registered relationships under the entity type
        if ($entity_type && !isset($linked_entities_array)) {
            $le_r = static::$entity_type_to_relationships[ $entity_type ] ?? [ ];
            return $skip_reciprocals ? array_filter($le_r, $_skip_reciprocals_function, ARRAY_FILTER_USE_KEY) : $le_r;
        }
        
        #--- Make sure the linked_entities are all Entity types
        $linked_entities_array = static::convert_to_something($linked_entities_array, static::TYPE_ENTITY_TYPE);
        
        #--- If the linked_entities are a string and we have an entity type, turn it into a predictable format (array)
        if (is_string($linked_entities_array)) {
            if (!$entity_type) return [ ];
            $linked_entities_array = [ $entity_type, $linked_entities_array ];
        }
        #--- Convert the linked_entity array into the standard string that we are used to seeing
        $linked_entities_string = static::get_linked_entity_string($linked_entities_array);
        
        #--- If the two entities aren't related, return an empty array
        if (!isset(static::$linked_entities_to_relationships[ $linked_entities_string ])) return [ ];
        
        #--- If we don't know what the Entity type is but we have the linked_entities_string, return the possible related entities
        if (!isset($entity_type)) {
            $le_r = static::$linked_entities_to_relationships[ $linked_entities_string ];
            return $skip_reciprocals ? array_filter($le_r, $_skip_reciprocals_function, ARRAY_FILTER_USE_KEY) : $le_r;
        }
        
        #--- There isn't much else we can do without knowing the entity type. This was probably already checked for
        if (!$entity_type) return [ ];
        /** @var array $relationships These are the relationships of the entity */
        $relationships = static::$entity_type_to_relationships[ $entity_type ] ?? [ ];
        #--- Iterate through the potential relationship types to see if these two are related
        foreach ($relationships as $index => $relationship) {
            $rel_linked_entities = $relationship['linked_entities']??false;
            if (!$rel_linked_entities) {
                unset($relationships[ $index ]);
            } else if ($skip_reciprocals && strpos($index, 'reciprocal_') === 0) {
                unset($relationships[ $index ]);
                continue;
            } else if (is_array(array_values($rel_linked_entities)[0])) {
                #--- If there is an array of possible linked_entities
                if (!isset($rel_linked_entities[ $linked_entities_string ])) unset($relationships[ $index ]);
                continue;
            }
            #--- Compare the linked entities to see if they are the same
            $le_string = static::get_linked_entity_string($rel_linked_entities);
            if ($le_string != $linked_entities_string) unset($relationships[ $index ]);
        }
        return $relationships;
    }
    /**
     * Get the table prefix from an entity ID
     *
     * @param $ent_id
     *
     * @return bool|string
     */
    public static function get_prefix_from_ent_id($ent_id) {
        if (!is_string($ent_id) || strlen($ent_id) < 4) return false;
        return substr($ent_id, 0, 4);
    }
    
    /**
     * Check to see if something could be an ID
     *
     * @param $id
     *
     * @return bool
     */
    public static function is_id($id) {
        return is_numeric($id);
    }
    /**
     * Check to see if something is an ent_id
     *
     * @param $ent_id
     *
     * @return bool
     */
    public static function is_ent_id($ent_id) {
        return is_string($ent_id) && (strlen($ent_id) <= 25) && array_key_exists(substr($ent_id, 0, 4), static::$prefix_to_model_type);
    }
#########################################################
#            Implementation of configuration            #
#########################################################
    /**
     * Convert a string to a _type_ based on a naming convention
     *
     * @param        $name
     * @param string $what Could be 'id', 'name', 'name_plural', 'index_singular', 'table|tablename|table_name', 'entity_type|model_type'
     *
     * @return array|string
     */
    protected static function def_convert_to_something($name, string $what = 'id') {
        if (is_array($name)) {
            foreach ($name as $k => $nn) {
                $name[ $k ] = static::def_convert_to_something($nn, $what);
            }
        } else {
            $lower_name = strtolower($name);
            switch ($what) {
                case 'id':
                default:
                    $name = $lower_name . '_id';
                    break;
                case 'name':
                    $name = ucfirst(Inflector::singularize($lower_name) ?: '');
                    break;
                case 'name_plural':
                    $name = strpos($name, ' ') ? $name : Inflector::pluralize($name);
                    $name = ucfirst($name ?: '');
                    break;
                case 'index_singular':
                case 'index':
                    $name = Inflector::singularize($name);
                    break;
                case 'table':
                case 'table_name':
                case 'tablename':
                    $name = Inflector::pluralize($name);
                    $name = str_replace('maps', 'map', Inflector::underscore($name));
                    break;
                case 'entity_type':
                case 'model_type':
                    $name = Inflector::camelize($name);
                    $name = Inflector::singularize($name);
                    $name = ucfirst($name);
            }
        }
        return $name;
    }
    /**
     * Convert an array to the standard format for storing linked entities.
     * This is just a sorted array of the entities being linked together, joined by a pipe
     *
     * @param array  $array
     *
     * @param string $delimiter
     *
     * @return string
     */
    public static function get_linked_entity_string(array $array, $delimiter = '|') {
        if (!$array) return '';
        $array_values = self::convert_to_something($array, EntityMeta::TYPE_ENTITY_TYPE, true);
        sort($array_values);
        return implode($delimiter, $array_values);
    }
    public static function relationship_index_to_entity_type($entity_type, $relationship_index) {
        $entity_type          = static::convert_to_something($entity_type);
        $relationship_indices = static::get_potential_relationships($entity_type);
        if (!($relationship_indices[ $relationship_index ] ?? false)) return false;
        if (!($relationship_indices[ $relationship_index ]['entity_type'] ?? false)) return false;
        $other_entity_type = $relationship_indices[ $relationship_index ]['entity_type'];
        if (!$other_entity_type || is_array($other_entity_type)) return false;
        return $other_entity_type;
    }
    /**
     * Get the type of Model that we are dealing with based on the name
     *
     * @param $model_type
     *
     * @return bool|string
     */
    protected static function get_object_type_from_model_type($model_type) {
        if (!is_string($model_type)) return false;
        $str = strtolower($model_type);
        if (strpos($str, 'type')) $object_type = 'Type';
        else if (strpos($str, 'status')) $object_type = 'Status';
        else if (strpos($str, 'role')) $object_type = 'Role';
        else if (strpos($str, 'map')) $object_type = 'Map';
        else $object_type = 'Model';
        return $object_type;
    }
    /**
     * Make sure all of the config properties that we expect to be in the models config array are there
     *
     * @param $model_type
     * @param $model_config
     *
     * @return array
     */
    protected static function _normalize_model_config($model_type, $model_config) {
        if (!is_array($model_config)) $model_config = [ ];
        $model_config['values']          = isset($model_config['values']) && is_array($model_config['values']) ? $model_config['values'] : null;
        $model_config['value_nicknames'] = isset($model_config['value_nicknames']) && is_array($model_config['value_nicknames']) ? $model_config['value_nicknames'] : [ ];
        $model_config['alias_for']       = $model_config['alias_for'] ?? false;
        $model_config['object_type']     = $model_config['object_type'] ?? static::get_object_type_from_model_type($model_type);
        $model_config['table']           = $model_config['table'] ?? false;
        $model_config['properties']      = $model_config['properties'] ?? [ ];
        $model_config['prefix']          = $model_config['prefix'] ?? null;
        if (isset($model_config['properties']['all'])) {
            $model_config['properties'] = $model_config['properties']['all'];
        }
        $model_config['linked_entities'] = $model_config['linked_entities'] ?? null;
        
        return $model_config;
    }
    /**
     * For the properties in the model or entity, make sure they are in the format we expect
     * (property_name=>default_value)
     *
     * @param $properties
     *
     * @return array|bool
     */
    protected static function _normalize_properties($properties) {
        if (!is_array($properties)) return false;
        foreach ($properties as $property_name => $default_value) {
            if (is_numeric($property_name)) {
                unset($properties[ $property_name ]);
                $property_name                = $default_value;
                $default_value                = null;
                $properties[ $property_name ] = $default_value;
            }
        }
        return $properties;
    }
    /**
     * Iterate through the model config and add them to the registry
     *
     * @param $models
     *
     * @return bool
     */
    protected static function _init_models($models) {
        if (!is_array($models)) return false;
        foreach ($models as $model_type => $model_config) {
            $model_config    = static::_normalize_model_config($model_type, $model_config);
            $values          = $model_config['values'];
            $object_type     = $model_config['object_type'];
            $linked_entities = $model_config['linked_entities'];
            $table_name      = $model_config['table'];
            if ($table_name) static::$table_to_model_type[ $table_name ] = $model_type;
            if ($values) {
                $value_nicknames = $model_config['value_nicknames'];
                $v_arr           = [ ];
                foreach ($values as $value_name => $id) {
                    if (is_string($value_name)) {
                        $nickname        = Inflector::humanize(strtolower($value_nicknames[ $value_name ] ?? $value_name));
                        $name            = strtolower($value_name);
                        $index           = $object_type === 'Type' && 0 === strpos($name, 'relationship') ? Inflector::pluralize($name) : $name;
                        $v_arr[ $index ] = [
                            'id'    => $id,
                            'index' => $name,
                            'name'  => $nickname,
                        ];
                    }
                };
                //::static
                static::$enum_values[ Inflector::underscore(Inflector::pluralize($model_type)) ] = $v_arr;
            }
            switch ($object_type) {
                case 'Map':
                    if (!$linked_entities) {
                        preg_match_all('/([A-Z]{1}[a-z]+)(?=[A-Z])/', $model_type, $linked_entities);
                        $linked_entities = $linked_entities[0];
                    }
                    break;
                case 'Model':
                case 'Role':
                case 'Type':
                case 'Status':
                    break;
            }
            $linked_entities = static::_normalize_linked_entities($model_type, $linked_entities, $object_type);
            if ($linked_entities) {
                $linked_entity_types = static::get_linked_entity_string($linked_entities);
                if (strpos($linked_entity_types, '|') === 0) Log::init($linked_entities)->log_it();
                static::$linked_entities_to_model_type[ $linked_entity_types ] = static::$linked_entities_to_model_type[ $linked_entity_types ] ?? [ ];
                if (!in_array($model_type, static::$linked_entities_to_model_type[ $linked_entity_types ]))
                    static::$linked_entities_to_model_type[ $linked_entity_types ][] = $model_type;
                static::$model_type_to_linked_entity_properties[ $model_type ] = $linked_entities;
            }
            if ($model_config['prefix']) static::$prefix_to_model_type[ $model_config['prefix'] ] = $model_type;
            static::$model_type_to_properties[ $model_type ] = static::_normalize_properties($model_config['properties']);
        }
        return true;
    }
    /**
     * @param $rel_arr
     * @param $entity_type
     * @param $deferred_relationship_indices
     *
     * @return array
     */
    protected static function _init_entity_relationships($rel_arr, $entity_type, &$deferred_relationship_indices) {
        static::$linked_entities_to_relationships = static::$linked_entities_to_relationships ??[ ];
        foreach ($rel_arr as $index => $rel_config) {
            $already_found_duplicate_entity = false;
            $linked_entity_array            = $rel_config['linked_entities'] ?? [ ];
            
            
            foreach ($linked_entity_array as $linked_entity_string => $le_arr) {
                foreach ($le_arr as $_index => $_linked_entity_name) {
                    if ($_linked_entity_name == $entity_type) {
                        if (!$already_found_duplicate_entity) {
                            $already_found_duplicate_entity = true;
                            continue;
                        }
                    }
                    $deferred_relationship_indices[ $_linked_entity_name ]                      =
                        $deferred_relationship_indices[ $_linked_entity_name ] ??[ ];
                    $deferred_relationship_indices[ $_linked_entity_name ]["reciprocal_$index"] =
                        $deferred_relationship_indices[ $_linked_entity_name ]["reciprocal_$index"] ?? [ ];
                    
                    $dri_le_ri         =& $deferred_relationship_indices[ $_linked_entity_name ]["reciprocal_$index"];
                    $rc                = $rel_config;
                    $rc['entity_type'] = $entity_type;
                    $dri_le_ri         = static::_merge_relationship_index_config($dri_le_ri, $rc, "reciprocal_$index");
                }
                
                static::$linked_entities_to_relationships[ $linked_entity_string ] =
                    static::$linked_entities_to_relationships[ $linked_entity_string ] ?? [ ];
                
                static::$linked_entities_to_relationships[ $linked_entity_string ][ $index ] = $rel_config;
            }
        }
        static::$entity_type_to_relationships[ $entity_type ] = is_array($rel_arr) ? $rel_arr : [ ];
    }
    /**
     * Iterate through the entity config and add them to the registry
     *
     * @param $entities
     *
     * @return bool
     */
    protected static function _init_entities($entities) {
        if (!is_array($entities)) return false;
        /** @var array $deferred_relationship_indices An array to keep track of the relationships that we have yet to add. Usually reciprocal */
        $deferred_relationship_indices = [ ];
        foreach ($entities as $entity_type => $entity_config) {
            if (is_numeric($entity_type)) {
                $entity_type   = $entity_config;
                $entity_config = [ ];
            }
            $entity_config                                 = static::_normalize_entity_config($entity_type, $entity_config);
            $deferred_relationship_indices[ $entity_type ] = $deferred_relationship_indices[ $entity_type ] ?? [ ];
            $rels                                          = $entity_config['relationships'] ?? [ ];
            $rels                                          = is_array($rels) ? $rels : [ ];
            self::_init_entity_relationships($rels, $entity_type, $deferred_relationship_indices);
            static::$entity_type_to_config[ $entity_type ] = $entity_config;
            if (isset($entity_config['model_type'])) {
                static::$entity_type_to_model_type[ $entity_type ] =
                    is_array($entity_config['model_type'])
                        ? $entity_config['model_type']
                        : [ $entity_config['model_type'] ];
            }
        }
        foreach ($deferred_relationship_indices as $_entity_type => $_rel_config) {
            static::$entity_type_to_relationships[ $_entity_type ] = array_merge(static::$entity_type_to_relationships[ $_entity_type ] ??[ ], $_rel_config);
            if (!isset(static::$entity_type_to_config[ $_entity_type ])) continue;
            if (!is_array(static::$entity_type_to_config[ $_entity_type ]['relationships'])) {
                Log::init([ static::$entity_type_to_config[ $_entity_type ]['relationships'] ])->log_it();
            }
            static::$entity_type_to_config[ $_entity_type ]['relationships'] = array_merge($_rel_config, static::$entity_type_to_config[ $_entity_type ]['relationships']);
        }
        static::$debug = $deferred_relationship_indices;
        return true;
    }
    /**
     * In the case of reciprocated relationships, we might be adding a reciprocal_relationship more than once.
     * This is a function that allows for graceful merging of the relationship configuration.
     * Mainly, the linked_entities and entity_type attribute of the relationship config array
     *
     * @param $old_config
     * @param $overriding_config
     * @param $relationship_index
     *
     * @return mixed
     */
    protected static function _merge_relationship_index_config($old_config, $overriding_config, $relationship_index) {
        $merge_properties = [ 'entity_type', 'index_singular' ];
        foreach ($merge_properties as $property) {
            if ($old_config[ $property ] ?? false) {
                if (($old_config[ $property ] == $overriding_config[ $property ]) ||
                    (is_array($old_config[ $property ]) && in_array($overriding_config[ $property ], $old_config[ $property ]))
                ) {
                } else {
                    $old_config[ $property ]   = is_array($old_config[ $property ]) ? $old_config[ $property ] : [ $old_config[ $property ] ];
                    $old_config[ $property ][] = $overriding_config[ $property ];
                }
            } else {
                $old_config[ $property ] = $overriding_config[ $property ];
            }
        }
        
        if (!isset($old_config['linked_entities'])) {
            $old_config['linked_entities'] = $overriding_config['linked_entities'];
        } else {
            $old_config['linked_entities'] = array_merge($old_config['linked_entities'], $overriding_config['linked_entities']);
        }
        $old_config['relationship_index'] = $relationship_index;
        return $old_config;
    }
    /**
     * Make sure the relationship index configuration under the entity config is in the format that we expect
     *
     * @param $entity_type
     * @param $relationship_index_name
     * @param $rel_config
     *
     * @return array|bool|mixed
     */
    protected static function _normalize_relationship_index($entity_type, $relationship_index_name, $rel_config) {
        if (!is_array($rel_config)) return false;
        $model_relationship                   = static::$standard_config['relationships'][ $relationship_index_name ] ?? false;
        $index_singular                       = Inflector::singularize($relationship_index_name);
        $related_entity_type                  = $rel_config['entity_type'] =
            $rel_config['entity_type'] ?? $model_relationship['entity_type'] ?? ucfirst($index_singular);
        $rel_config['index_singular']         = $rel_config['index_singular'] ?? $model_relationship['index_singular'] ?? $index_singular;
        $linked_entities                      = $rel_config['linked_entities'] ?? $rel_config['linked_entities'] ?? (is_string($related_entity_type) ? [ $related_entity_type ] : null);
        $rel_config['linked_entities']        = [ ];
        $le_arr                               = static::_normalize_linked_entities($entity_type, $linked_entities);
        $le                                   = static::get_linked_entity_string($le_arr);
        $rel_config['linked_entities'][ $le ] = $le_arr;
        if (isset(static::$linked_entities_to_model_type[ $le ])) {
            $map_type                             = static::$linked_entities_to_model_type[ $le ];
            $map_type                             = is_array($map_type) ? $map_type[0] : $map_type;
            $mt_linked                            = static::$model_type_to_linked_entity_properties[ $map_type ] ??[ ];
            $rel_config['linked_entities'][ $le ] = $mt_linked ?? $rel_config['linked_entities'][ $le ];
        }
        $rel_config['relationship_index'] = $relationship_index_name;
        
        return static::replace_entity_placeholder($entity_type, $rel_config);
    }
    /**
     * Make sure the entity configuration is in the format that we expect
     *
     * @param $entity_type
     * @param $entity_config
     *
     * @return mixed
     */
    protected static function _normalize_entity_config($entity_type, $entity_config) {
        $entity_config['based_on'] = $entity_config['based_on'] ?? $entity_type;
        
        $based_on                     = $entity_config['based_on'];
        $entity_config['entity_type'] = $entity_type;
        $entity_config['model_type']  = $based_on;
        $entity_config['properties']  = $entity_config['properties'] ?? [ ];
        $all_properties               = $entity_config['properties']['all'] ?? false;
        if (is_string($based_on) && isset(static::$model_type_to_properties[ $based_on ])) {
            if (!$all_properties) $all_properties = static::$model_type_to_properties[ $based_on ];
        }
        if (is_array($all_properties)) {
            $all_properties                     = static::_normalize_properties($all_properties);
            $entity_config['properties']['all'] = $all_properties;
        } else {
            $all_properties = [ ];
        }
        $entity_config['properties']['api_settable'] = ($entity_config['properties']['api_settable']??null) == '*' ? array_keys($all_properties) : $entity_config['properties']['api_settable']??null;
        $entity_config['properties']['api_gettable'] = ($entity_config['properties']['api_gettable']??null) == '*' ? array_keys($all_properties) : $entity_config['properties']['api_gettable']??null;
        $entity_config['properties']['required']     = $entity_config['properties']['required'] ?? null;
        
        $entity_config['relationships'] = $entity_config['relationships'] ?? [ ];
        if ($entity_config['relationships']) {
            $relationship_config = [ ];
            foreach ($entity_config['relationships'] as $index => $_relationship_config) {
                if (is_numeric($index)) {
                    $index                = $_relationship_config;
                    $_relationship_config = [ ];
                }
                $relationship_config[ $index ] = static::_normalize_relationship_index($entity_type, $index, $_relationship_config);
            }
            $entity_config['relationships'] = $relationship_config;
        }
        return $entity_config;
    }
    /**
     * Make sure the linked entity array is in the way that we expect
     * [map_index=>entity type]
     *
     * @param string $self_entity_type    The entity type of the Entity or Model that we are adding the relationships to
     * @param array  $linked_entity_array The configuration array that details which entities we are linking
     * @param string $object_type         The type of (whatever) that we are dealing with.
     *
     * @return array|bool
     */
    protected static function _normalize_linked_entities(string $self_entity_type, array $linked_entity_array = null, $object_type = 'Entity') {
        if (!is_array($linked_entity_array)) return false;
        $linked_entity_array = static::replace_entity_placeholder($self_entity_type, $linked_entity_array);
        $linked_entities     = [ ];
        $linked_entity_type  = $map_index = '';
        foreach ($linked_entity_array as $map_index => $linked_entity_type) {
            if (is_numeric($map_index)) $map_index = static::convert_to_id($linked_entity_type);
            $linked_entities[ $map_index ] = $linked_entity_type;
        }
        if (count($linked_entities) === 1) {
            switch ($object_type) {
                case 'Entity':
                case 'Map':
                default:
                    #--- If we have the map index at all and we know what we are doing
                    if (strlen($map_index) && strlen($linked_entity_type) && isset($linked_entities[ $map_index ])) {
                        if ($object_type == 'Map' || ($object_type == 'Entity' && $linked_entity_type == $self_entity_type)) {
                            #--- If the map indices are the same, set one as primary_ and one as secondary_
                            $linked_entities[ 'primary_' . $map_index ]   = $linked_entity_type;
                            $linked_entities[ 'secondary_' . $map_index ] = $linked_entity_type;
                            unset($linked_entities[ $map_index ]);
                        } else {
                            #--- By default, we just convert /this/ entity to an ID. That's the assumed foreign key
                            $linked_entities[ static::convert_to_id($self_entity_type) ] = $self_entity_type;
                        }
                    }
                    break;
                #--- If we are dealing with a model and there is only one relationship type, then we are relating
                case 'Model':
                    $linked_entities['id'] = $self_entity_type;
                    break;
            }
        }
        return $linked_entities;
    }
#########################################################
#            Private, static functions                  #
#########################################################
    /**
     * When we inherit relationships from default, sometimes we use a placeholder like [Entity].
     * This replaces those placeholders with the actual entity name
     *
     * @param $entity_name
     * @param $item
     *
     * @return array|mixed
     */
    private static function replace_entity_placeholder($entity_name, $item) {
        if (is_array($item)) {
            foreach ($item as $k => $_string) {
                $item[ static::replace_entity_placeholder($entity_name, $k) ] = static::replace_entity_placeholder($entity_name, $_string);
            }
        }
        if (!is_string($item) || !is_string($entity_name)) return $item;
        return str_replace([
                               '[Entity]',
                               '[entity]',
                               '[entities]',
                           ],
                           [
                               $entity_name,
                               strtolower($entity_name),
                               strtolower(Inflector::pluralize($entity_name)),
                           ], $item);
        
    }
    private static function convert_to_id($model_name) {
        return Inflector::singularize(strtolower($model_name)) . '_id';
    }
#########################################################
#            Logging and Serialization                  #
#########################################################
    public static function _log_() {
        return [
            'debug' => static::$debug,
            'dump'  => static::dump(),
        ];
    }
    public static function dump() {
        $entity_relationships = static::$entity_type_to_relationships;
        
        $entities = [ ];
        foreach (static::$entity_type_to_config as $key => $item) {
            if (isset($item['relationships'])) unset($item['relationships']);
            if (isset($item['model_type'])) unset($item['model_type']);
            if (isset($entity_relationships[ $key ])) {
                $reciprocal_relationships = [ ];
                $relationships            = [ ];
                $er_k                     = $entity_relationships[ $key ];
                foreach ($er_k as $index => $rel_config) {
                    if (isset($item['relationship_display_types']) && isset($item['relationship_display_types'][ $index ])) {
                        $rel_config = array_merge($rel_config, $item['relationship_display_types'][ $index ]);
                    }
                    if (strpos($index, 'reciprocal_') === 0) $reciprocal_relationships[ str_replace('reciprocal_', '', $index) ] = $rel_config;
                    else $relationships[ $index ] = $rel_config;
                }
                
                $item['relationships']            = $relationships;
                $item['reciprocal_relationships'] = $reciprocal_relationships;
            }
            $entities [ $key ] = $item;
        }
        
        $linked_entities = [ ];
        foreach (static::$linked_entities_to_model_type as $index => $item) {
            $all_props = [ ];
            
            $entities[ $index ]                      = $entities[ $index ] ?? [ ];
            $entities[ $index ]['properties']        = $entities[ $index ]['properties'] ?? [ ];
            $entities[ $index ]['properties']['all'] = $entities[ $index ]['properties']['all'] ?? null;
            if (!$entities[ $index ]['properties']['all']) {
                $mt = static::convert_linked_entities_to_model_type($index);
                if (is_array($mt)) {
                    $props = static::get_linked_properties($index);
                    foreach ($props as $key => $et) {
                        $all_props[ $key ] = null;
                    }
                } else {
                    $all_props = static::get_model_type_properties($mt);
                }
                $entities[ $index ]['properties']['all'] = $all_props;
            }
            
            
            $get_set_properties                               = array_keys($entities[ $index ]['properties']['all']);
            $entities[ $index ]['properties']['api_settable'] = $entities[ $index ]['properties']['api_settable'] ?? $get_set_properties;
            $entities[ $index ]['properties']['api_gettable'] = $entities[ $index ]['properties']['api_gettable'] ?? $get_set_properties;
            $linked_entities[ $index ]                        = str_replace('|', '', $index);
        }
        return [
            'entities'                      => $entities,
            'linked_entities_relationships' => static::$linked_entities_to_relationships,
            'enums'                         => static::$enum_values,
        ];
    }
    
}