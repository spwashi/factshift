<?php
/**
 * User: Sam Washington
 * Date: 11/22/16
 * Time: 11:39 PM
 */

namespace Sm\Entity\Relationship;


use Sm\Action\Create\CreateVictim;
use Sm\Action\Destroy\DestroyVictim;
use Sm\Action\Edit\EditVictim;
use Sm\Core\App;
use Sm\Entity\Abstraction\Entity;
use Sm\Entity\Action\Create\CreateEntityVictimTrait;
use Sm\Entity\Action\Destroy\DestroyEntityVictimTrait;
use Sm\Entity\Action\Edit\EditEntityVictimTrait;
use Sm\Entity\Model\EntityMeta;
use Sm\Identifier\Identifiable;
use Sm\Validation\Abstraction\Validator;

/**
 * Class RelationshipEntity
 * An Entity that represents the relationship between two or more other entities
 *
 * @package Sm\Entity\Relationships
 */
class RelationshipEntity extends Entity implements \JsonSerializable, EditVictim, CreateVictim, DestroyVictim {
    use DestroyEntityVictimTrait, EditEntityVictimTrait, CreateEntityVictimTrait;
    
    protected static $entity_type          = 'Relationship';
    protected        $linked_entity_string = null;
    protected        $Entities             = [ ];
#########################################################
#            Initializers & Constructors                #
#########################################################
    /**
     * Relationship constructor.
     *
     * @param Entity[]|Entity ...$Entities
     */
    public function __construct(&...$Entities) {
        $parameter_count = count($Entities);
        if (!$parameter_count) return;
        $entities_arr = [ ];
        /** @var array $array_parameters This is an array of the parameters that turned out to be arrays */
        $array_parameters = [ ];
        foreach ($Entities as $entity) {
            if (is_array($entity)) $array_parameters[] = $entity;
            else $entities_arr[] = $entity;
        }
        if (count($array_parameters)) {
            array_unshift($array_parameters, $entities_arr);
            $entities_arr = call_user_func_array('array_merge', $array_parameters);
        }
        static::_normalize_entity_array($entities_arr);
        $this->Entities = $entities_arr;
    }
#########################################################
#            Getters and Setters                        #
#########################################################
    /**
     * @param string|null $identifier If this is specified and it's an Identifiable object, return the Entities that aren't it.
     *                                Otherwise, get the entity_type from the identifier and return the Entities that match.
     *
     * @todo consider whether this is a code smell, as each different possible identifier input returns a different thing (match/not match)
     *
     * @return Entity[]|Entity
     */
    public function getItems($identifier = null) {
        if (!$identifier) return $this->Entities;
        $entity_type = EntityMeta::convert_to_something($identifier);
        $items       = [ ];
        
        
        /**
         * @var string $index
         * @var Entity $entity
         */
        foreach ($this->Entities as $index => $entity) {
            if ($identifier instanceof Identifiable) {
                if ($identifier->getUniqueIdentifier() == $entity->getUniqueIdentifier()) continue;
                $items[] = $entity;
            } else {
                $et = $entity->getEntityType();
                if ($et != $entity_type) continue;
                $items[] = $entity;
            }
        }
        
        return empty($items) ? null : (count($items) === 1 ? $items[0] : $items);
    }
    /**
     * Check to see if this Relationship has a specific Entity Identifier
     *
     * @param $entity_identifier
     *
     * @return bool
     */
    public function relationshipContains($entity_identifier) {
        foreach ($this->Entities as $index => $item) {
            if (
                $item->getUniqueIdentifier() == $entity_identifier ||
                $item->getUniqueIdentifier(Identifiable::ENT_ID) == $entity_identifier ||
                $item->getUniqueIdentifier(Identifiable::TYPED_IDENTIFIER) == $entity_identifier
            ) {
                return true;
            }
        }
        return false;
    }
    public function getEntityType() {
        return $this->linked_entity_string ?? ($this->linked_entity_string = EntityMeta::get_linked_entity_string($this->Entities));
    }
    public function getValidator() : Validator {
        $model_type = null;
        if ($this->PrimaryModel && $model_type = $this->PrimaryModel->getModelType()) {
            $model_type = str_replace('Map', 'Relationship', $model_type);
            $classname  = App::_()->name . "\\Entity\\Validation\\{$model_type}Validator";
            if (class_exists($classname)) return new $classname($this);
        }
        return parent::getValidator();
    }
    /**
     * Return the identifier of the Context in which this Relationship exists
     *
     * @return null
     */
    public function getContextID() {
        return null;
    }
#########################################################
#            Normalized Entities                        #
#########################################################
    /**
     * Make sure the entities are indexed by map_index or entity type.
     *
     * @param $entity_array
     */
    protected static function _normalize_entity_array(&$entity_array) {
        $indexed_entities = [ ];
        foreach ($entity_array as $index => $item) {
            #--- We only allow entities to be related to other Entities
            if (!($item instanceof Entity)) {
                unset($entity_array[ $index ]);
            } else if (is_numeric($index)) {
                #--- If there was no map index specified, use the unique identifier by default
                /** @var string $_new_index The new index at which we will store the entity */
                $_new_index = $item->getUniqueIdentifier();
                #--- If we don't know the unique identifier, we just use the entity_type of the Entity
                if (!$_new_index) {
                    $entity_type = $item->getEntityType();
                    
                    #--- If this is not the first one of its type, we append a number to the entity type as well
                    if (isset($indexed_entities[ $entity_type ])) {
                        #--- If this is the 2nd occurrence of the entity_type, append 0 to the first
                        if (!$indexed_entities[ $entity_type ]) {
                            $previous                            = $entity_array[ $entity_type ];
                            $entity_array[ $entity_type . '#0' ] = $previous;
                            unset($entity_array[ $entity_type ]);
                        }
                        #- append the number
                        $entity_type = $entity_type . '#' . (++$indexed_entities[ $entity_type ]);
                    } else {
                        $indexed_entities[ $entity_type ] = 0;
                    }
                    $_new_index = $entity_type;
                }
                $entity_array[ $_new_index ] = $item;
                
                #--- remove the numeric index
                unset($entity_array[ $index ]);
            }
        }
    }
#########################################################
#            Logging and Serialization                  #
#########################################################
    public function jsonSerialize() {
        return static::jsonSerializeCompact();
    }
    public function jsonSerializeCompact($w_r_to = null) {
        $entities = [ ];
        # --- This allows us to exclude one from the results
        /**
         * @var string $index
         * @var Entity $entity
         */
        foreach ($this->Entities as $index => $entity) {
            if ($w_r_to && ($w_r_to === $index || ($w_r_to instanceof Entity && $w_r_to->getUniqueIdentifier() == $entity->getUniqueIdentifier()))) continue;
            $entities[ $index ] = $entity;
        }
        $entities        = array_map(function ($item) {
            return $item instanceof Entity ? $item->jsonSerializeCompact() : false;
        }, $entities);
        $ret             = [
            '_object_type' => 'Relationship',
            'attributes'   => $this->PrimaryModel,
        ];
        $ret['Entities'] = $entities;
        
        return $ret;
    }
}