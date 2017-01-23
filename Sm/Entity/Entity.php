<?php
/**
 * User: Sam Washington
 * Date: 11/19/16
 * Time: 10:48 PM
 *
 */

namespace Sm\Entity;


use Sm\Core\App;
use Sm\Core\Inflector;
use Sm\Development\Log;
use Sm\Entity\Model\Abstraction\Model;
use Sm\Entity\Model\ModelIterator;
use Sm\Entity\Model\ModelNotFoundException;
use Sm\Entity\Model\TableModel;
use Sm\Entity\Relationship\RelationshipEntity;
use Sm\Entity\Relationship\RelationshipIndex;
use Sm\Entity\Relationship\RelationshipIndexContainer;
use Sm\Entity\Relationship\RelationshipNotFoundException;

/**
 * Class Entity
 *
 * Representative of an Entity that can have relations. Could be based on a TableModel or a JsonModel or something of the sort
 *
 * @note    Be careful about references in this and related classes! Loop variables should be unset at the end of use!
 * @package Sm\Entity
 * @property-read RelationshipIndexContainer $relationships
 */
class Entity extends Abstraction\Entity implements \JsonSerializable {
    /** @var RelationshipIndexContainer $RelationshipIndices */
    protected $RelationshipIndices;
#########################################################
#            Initializers & Constructors                #
#########################################################
    /**
     * Entity constructor.
     * Only use this if you're creating an anonymous class
     *
     * @internal param null $entity_type
     *
     * @param null $entity_type
     */
    public function __construct($entity_type = null) {
        if (!$this->getEntityType()) {
            Log::init(static::_log_())->log_it();
            if (!$entity_type) return;
            $this->_entity_type = $entity_type;
        } else {
            $this->_entity_type = $this->getEntityType();
        }
        $this->initRelationshipIndices();
    }
#########################################################
#            Getters and Setters                        #
#########################################################
    /**
     * @param $name
     *
     * @return null|\Sm\Entity\Relationship\RelationshipIndexContainer
     */
    public function &get($name) {
        if ($name === 'relationships') return $this->RelationshipIndices;
        return parent::get($name);
    }
    
    /**
     * @param                   $relationship_index
     * @param \Sm\Entity\Entity $entity
     * @param Model             $Map
     *
     * @param bool              $Relationship
     *
     * @return RelationshipEntity|bool
     * @throws \Sm\Entity\EntityNotFoundException
     */
    public function relateEntity($relationship_index, Entity $entity, &$Map, $Relationship = null) {
        if (!$this->can_relate($relationship_index)) return false;
        /** @var RelationshipIndex $RelationshipIndex */
        $RelationshipIndex             = &$this->RelationshipIndices->$relationship_index;
        $relationship_is_reciprocal    = strpos($relationship_index, 'reciprocal_') === 0;
        $reciprocal_relationship_index = $relationship_is_reciprocal ? str_replace('reciprocal_', '', $relationship_index) : "reciprocal_{$relationship_index}";
        
        # --- Because we call this after "has_relationships", this should never evaluate to false
        if (!$RelationshipIndex) throw new EntityNotFoundException("Cannot relate to {$relationship_index}");
        $self_map_index = $other_map_index = null;
        
        if (!$Relationship) {
            # --- Construct the relationship with _this_ and _that_ entity.
            # --  -- Right now, this only allows for 2 relationships to be had. Might fix in the future
            $Relationship = $RelationshipIndex->initRelationshipEntity($entity, $Map);
            $RelationshipIndex->push($Relationship, $entity->getUniqueIdentifier());
            # --- Now we try to add the relationship to the other entity
            $entity->relateEntity($reciprocal_relationship_index, $this, $Map, $Relationship);
        }
        return $Relationship;
    }
#########################################################
#            Finders and whatever                       #
#########################################################
    /**
     * @param string        $relationship_index
     *
     * @param callable|null $loop
     *
     * @return \Sm\Entity\Relationship\RelationshipIndex|\Sm\Entity\Relationship\RelationshipIndex[]
     */
    public function &findRelationshipIndex($relationship_index, $loop = null) {
        static::init();
        if (is_string($relationship_index) && !$this->RelationshipIndices->hasRelationshipIndex($relationship_index)) {
            # --- Maybe we tried to find the relationship index formatted incorrectly.
            # --- Try formatting it in a lowercase/plural way just in case;
            $relationship_index = strtolower(Inflector::pluralize($relationship_index));
            if (!$this->RelationshipIndices->hasRelationshipIndex($relationship_index)) {
                $rel_index_to_entity_type = App::_()->IoC->EntityMeta->convert_to_something($relationship_index);
                if ($rel_index_to_entity_type) {
                    $relationship_index = array_keys(App::_()->IoC->EntityMeta->get_potential_relationships($this->getEntityType(), $rel_index_to_entity_type, true));
                }
            }
        }
        if (is_array($relationship_index)) {
            $ret = [ ];
            foreach ($relationship_index as $item) {
                $ret[] = $this->findRelationshipIndex($item, $loop);
            }
            $ret = count($ret) === 1 ? $ret[0] : $ret;
            return $ret;
        }
        
        $reference_to_null = null;
        if (!is_string($relationship_index)) return $reference_to_null;
        /** @var RelationshipIndex $RelIndex */
        $RelIndex = $this->relationships->$relationship_index;
        if (!$RelIndex) return $reference_to_null;
        if ($RelIndex->checkUpToDate()) {
            if (is_callable($loop)) {
                foreach ($RelIndex as $index => $item) {
                    if ($item instanceof RelationshipEntity) {
                        $loop($this, $item->getItems($this), $item->getPrimaryModel());
                    }
                }
            }
            return $RelIndex;
        }
        # --- Search for Entities that belong in the relationship index
        $res = $this->search_for_relationship_index($relationship_index);
        
        # --- Iterate through the array of [entity, map] and add the relationships
        foreach ($res as &$relationship_array) {
            list($entity, $map) = $relationship_array;
            $this->relateEntity($relationship_index, $entity, $map);
            
            if (is_callable($loop)) {
                $loop($this, $entity, $map, $relationship_index);
            }
            # --- Free the references
            unset($map);
            unset($entity);
        }
        
        $RelIndex->markUpToDate();
        return $this->relationships->$relationship_index;
    }
    /**
     * Given an array and a relationship index,
     * append additional search terms in case a relationship type means that different properties are utilized.
     *
     * For example, if there is a relationship_type property set in a map table, use that depending on the relationship_index
     *
     * @param array $relationship_search
     * @param       $relationship_index
     *
     * @return array
     */
    protected function resolve_relationship_search(array $relationship_search, $relationship_index) {
        $enums              = App::_()->IoC->EntityMeta->get_enum_value('relationship_types');
        $RelationshipIndex  = $this->RelationshipIndices->$relationship_index;
        $relationship_index = $RelationshipIndex->interpret_relationship_index($relationship_index);
        if ($enums && ($enums[ $relationship_index ] ?? false) && ($enums[ $relationship_index ]['id'] ?? false)) {
            $relationship_search['relationship_type'] = $enums[ $relationship_index ]['id'];
        }
        return $relationship_search;
    }
    /**
     * Search for the relationship index
     *
     * @param $relationship_index
     *
     * @return null
     * @throws \Sm\Entity\EntityNotFoundException
     */
    protected function search_for_relationship_index($relationship_index) {
        /** @var RelationshipIndex $RelationshipIndex */
        $RelationshipIndex = $this->RelationshipIndices->$relationship_index;
        
        # --- Because we call this after "has_relationships", this should never evaluate to false
        if (!$RelationshipIndex) throw new EntityNotFoundException("Cannot relate to {$relationship_index}");
        
        $relationship_is_reciprocal = strpos($relationship_index, 'reciprocal_') === 0;
        
        $involved_entities = $RelationshipIndex->getLinkedEntities();
        # --- This should never be the case as well, but let's humor ourselves
        if (!count($involved_entities)) throw new EntityNotFoundException("There are no entities linked for {$relationship_index} in " . $this->getEntityType());
        
        # --- Return variable
        $res = [ ];
        
        # --- Iterate through the linked entities so we can use the Map to find models
        foreach ($involved_entities as $linked_entity_string => $le_array) {
            try {
                $map_model_name = App::_()->IoC->EntityMeta->convert_linked_entities_to_model_type($le_array);
                
                # --- This should probably raise an error?
                if (!is_string($map_model_name)) continue;
                
                # --- This is the Map Class that we're going to use to find the relationship
                $MapClass = App::_()->IoC->EntityMeta->model_type_to_class($map_model_name);
                
                $map_index = App::_()->IoC->EntityMeta->get_index_from_linked_entity($le_array, $this->getEntityType(), $relationship_is_reciprocal);
                if (!$map_index) throw new ModelNotFoundException([ "Not sure how to link the two entities ", $le_array, $this->getEntityType() ]);
                
                $search = $this->resolve_relationship_search([ $map_index => $this ], $relationship_index);
                
                $_linked_entity_properties = App::_()->IoC->EntityMeta->get_linked_properties($linked_entity_string);
                
                if (!$_linked_entity_properties) throw new EntityNotFoundException([ "Not sure how to link the two entities ", $linked_entity_string, $this->getEntityType() ]);
                unset($_linked_entity_properties[ $map_index ]);
                
                
                # --- Use the map indices where we did not find this one so we can initialize their referenced models and add a relationship
                foreach ($_linked_entity_properties as $_map_index => $entity_name) {
                    try {
                        /** @var ModelIterator $Maps */
                        $Maps = $MapClass->findAll($search);
                        
                        # -- This is the Model type of the Entity that we just
                        $entity_model_type = App::_()->IoC->EntityMeta->entity_type_to_model_type($entity_name);
                        
                        # --- This should probably throw some sort of error.
                        # --- If we don't know the Model type, skip what we were doing
                        if (!$entity_model_type || !is_string($entity_model_type)) continue;
                        /** @var Model $EntityModelClass */
                        $EntityModelClass = App::_()->IoC->EntityMeta->model_type_to_class($entity_model_type);
                        /** @var \Sm\Entity\Abstraction\Entity $EntityClass */
                        $EntityClass = App::_()->IoC->EntityMeta->entity_type_to_class($entity_name);
                        /** @var Model $map */
                        foreach ($Maps as $map) {
                            try {
                                $entity = $EntityClass->initFromModel($EntityModelClass->find($map->get($_map_index)));
                                $map    = $Maps->current();
                                $res[]  = [
                                    $entity,
                                    $map,
                                ];
                                unset($map);
                            } catch (\Exception $e) {
                                # -- better handling?
                                Log::init([ $e->getMessage() ])->log_it();
                            }
                        }
                    } catch (\Exception $e) {
                        # -- better handling?
                        Log::init([ $e->getMessage() ])->log_it();
                    }
                }
            } catch (ModelNotFoundException $e) {
                # -- better handling?
                Log::init([ $e->getMessage() ])->log_it();
            } catch (EntityNotFoundException $e) {
                # -- better handling?
                Log::init([ $e->getMessage() ])->log_it();
            }
        }
        return $res;
    }
    /**
     * @param string $relationship_index
     *
     * @return bool
     */
    protected function can_relate(string $relationship_index) {
        try {
            if (!$this->RelationshipIndices->hasRelationshipIndex($relationship_index)) {
                $entity_name = App::_()->IoC->EntityMeta->convert_to_something($relationship_index);
                if (!$entity_name || !App::_()->IoC->EntityMeta->get_potential_relationships($this->getEntityType(), $entity_name))
                    throw new RelationshipNotFoundException("This entity type has no relationship index '{$relationship_index}'");
            } else if (!$this->PrimaryModel) {
                throw new ModelNotFoundException("Entity has no Model to use to find Relationship");
            } else if (!($this->PrimaryModel instanceof TableModel)) {
                throw new ModelNotFoundException("Cannot use Model to find Relationship Index");
            }
        } catch (\Exception $e) {
            return false;
        }
        return true;
    }
#########################################################
#            Relationship functions                     #
#########################################################
    /**
     * Iterate through the potential relationship indices that this class can have,
     * and create a RelationshipIndexContainer based on it
     *
     * @return array|mixed
     */
    public function initRelationshipIndices() {
        $relationship_config       = App::_()->IoC->EntityMeta->get_potential_relationships($this->getEntityType());
        $this->RelationshipIndices = new RelationshipIndexContainer($this);
        foreach ($relationship_config as $index => $config) {
            try {
                $this->RelationshipIndices->addRelationshipIndex($index, $this->initRelationshipIndex($config));
            } catch (\Exception $e) {
                return false;
            }
        }
        return $this->RelationshipIndices;
    }
    public function initRelationshipIndex($config) {
        return new RelationshipIndex($this,
                                     $config['relationship_index'] ?? null,
                                     $config['linked_entities'] ?? [ ],
                                     $config['index_singular']);
    }
    public function jsonSerialize() {
        $res                  = parent::jsonSerialize();
        $res['relationships'] = $this->RelationshipIndices;
        return $res;
    }
}