<?php
/**
 * User: Sam Washington
 * Date: 11/22/16
 * Time: 11:32 PM
 */

namespace Sm\Entity\Relationship;


use Sm\Core\Inflector;
use Sm\Development\Log;
use Sm\Entity\Abstraction\Entity;
use Sm\Entity\Model\Abstraction\Model;
use Sm\Entity\Model\EntityMeta;
use Sm\Entity\Model\Identifier;
use Sm\Identifier\Identifiable;
use Sm\Iterator\Iterator;

class RelationshipIndex extends Iterator implements \JsonSerializable {
###########################################################################################
###################     Generic RelationshipIndex Meta properties (props about the index) #
###########################################################################################
    /** @var string $relationship_index */
    protected $relationship_index;
    /** @var array $linked_entities B is one of A's _____s */
    protected $linked_entities = [ ];
    /** @var array $linked_entity_array An array of the potential entities that this could represent */
    protected $linked_entity_array = [ ];
    /** @var string $index_singular The name of the relationship index with respect to the Entity. B is A's ___ */
    protected $index_singular;
#########################################################
####################    Relationship Holding Properties #
#########################################################
    protected $isUpToDate = false;
    /** @var RelationshipEntity[] $items */
    protected $items;
    /** @var Entity $Entity The entity that this RelationshipIndex belongs to */
    protected $Entity;
#########################################################
#               Constructors/initializers               #
#########################################################
    /**
     * RelationshipIndex constructor.
     *
     * @param Entity $Entity The Entity that is going to be referenced
     * @param        $relationship_index
     * @param        $linked_entities
     * @param        $index_singular
     *
     * @internal param array $config A configuration array that would be retrieved from
     */
    public function __construct(Entity $Entity, $relationship_index, $linked_entities = null, $index_singular = null) {
//        if (is_array($config['entity_type']) || !isset($config['index_singular'])) var_dump($config);
        $this->relationship_index = $relationship_index;
        $this->linked_entities    = $linked_entities;
        $this->index_singular     = $index_singular;
        $this->Entity             = $Entity;
        $this->items              = [ ];
    }
    public function initOtherEntity($OtherEntity) {
        if (!$OtherEntity || !($OtherEntity instanceof Entity)) {
            $Identifier        = $OtherEntity instanceof Identifier ? $OtherEntity : null;
            $other_entity_type = EntityMeta::relationship_index_to_entity_type($this->Entity, $this->relationship_index);
            try {
                $OtherEntity = EntityMeta::entity_type_to_class($other_entity_type);
                if ($Identifier) $OtherEntity->findModel($Identifier);
            } catch (\Exception $e) {
                return false;
            }
        }
        return $OtherEntity;
    }
    public function initMap($OtherEntity, $Map = null) {
        if (!$Map || !($Map instanceof Model)) {
            $map_type = EntityMeta::convert_linked_entities_to_model_type([ $this->Entity, $OtherEntity ]);
            try {
                $Map = EntityMeta::model_type_to_class($map_type);
            } catch (\Exception $e) {
                return false;
            }
        }
        return $Map;
    }
    
    public function initRelationshipEntity(&$OtherEntity, $Map = null) {
        $RelationshipEntity = new RelationshipEntity($this->Entity, $OtherEntity);
        if (!$Map) $Map = $this->initMap($OtherEntity, $Map);
        if ($Map) $RelationshipEntity->addModel($Map);
        return $RelationshipEntity;
    }
#########################################################
#                Getters, setters, pushers              #
#########################################################
    public function getAllEntityTypes() {
        $linked_entities = $this->linked_entities;
        $entity_types    = [ ];
        foreach ($linked_entities as $index => $linked_entity) {
            if (strpos($index, '|')) {
                $le_s = array_values($linked_entity);
            } else {
                $le_s = [ $linked_entity ];
            }
            $entity_types[] = $le_s;
        }
        $entity_types = call_user_func_array('array_merge', $entity_types);
        $e_t_unique   = [ ];
        foreach ($entity_types as $index => $entity_type) {
            $e_t_unique[ $entity_type ] = true;
        }
        return array_keys($e_t_unique);
    }
    public function checkUpToDate() {
        return $this->isUpToDate;
    }
    public function markUpToDate() {
        $this->isUpToDate = true;
    }
    public function markNotUpToDate() {
        $this->isUpToDate = false;
    }
    public function getLinkedEntities() {
        return $this->linked_entities;
    }
    public function push(&$relationship, $index = null) {
        return parent::push($relationship, $index);
    }
    /**
     * @return Entity
     */
    public function getEntity(): Entity {
        return $this->Entity;
    }
    /**
     * @param $index
     *
     * @return Entity[]
     */
    public function getItems($index = null) {
        $index          = strtolower($index);
        $entity_type    = EntityMeta::convert_to_something($index);
        $index_singular = Inflector::singularize($index);
        $index_plural   = Inflector::pluralize($index);
        $is_same_index  = ($index == $this->relationship_index) || ($index_singular == $this->index_singular) || ($index_plural == $this->relationship_index);
        $EntityIterator = [ ];
        foreach ($this->items as $key => $item) {
            $entities = $item->getItems($entity_type ? $entity_type : $this->Entity);
            if ($entities instanceof Entity) {
                $EntityIterator[] = $entities;
            } else if (is_array($entities)) {
                $EntityIterator[] = $is_same_index ? $entities[1] ?? null : $entities[0] ?? null;
            }
        }
        
        return $EntityIterator;
    }
    public function &getRelationship($identifier) {
        if (isset($this->items[ $identifier ])) {
            return $this->items[ $identifier ];
        }
        $v = null;
        return $v;
    }
    /**
     * @param Entity|RelationshipEntity $locate
     *
     * @return bool|int|string
     */
    public function locate($locate) {
        foreach ($this->items as $index => $item) {
            if ($item === $locate) return $index;
            if ($index == $locate) return $index;
            if ($locate instanceof Identifiable && $locate->getUniqueIdentifier() == $index) return $index;
            if ($item instanceof RelationshipEntity && $item->relationshipContains($locate)) return $index;
        }
        return false;
    }
    public function getRelationshipIndex() {
        return $this->relationship_index;
    }
    public static function interpret_relationship_index($relationship_index) {
        return $relationship_index = strtolower(Inflector::singularize($relationship_index));
    }
#########################################################
#                Logging and serialization              #
#########################################################
    public function jsonSerialize() {
        $selfEntity = $this->Entity;
        return [
            '_object_type' => 'RelationshipIndex',
            '_entity_type' => $this->Entity ? $this->Entity->getEntityType() : null,
            '_meta'        => [
                'list'               => $this->item_identifiers,
                'index_singular'     => $this->index_singular,
                'relationship_index' => $this->relationship_index,
            ],
            
            'items' => array_map(function ($item) use ($selfEntity) {
                return $item instanceof Entity ? $item->jsonSerializeCompact($selfEntity) : false;
            }, $this->items),
        ];
    }
}