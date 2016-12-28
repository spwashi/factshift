<?php
/**
 * User: Sam Washington
 * Date: 5/8/16
 * Time: 3:33 PM
 */

namespace Sm\Controller\API;

use Sm\Entity\EntityIterator;
use Sm\Entity\Model\EntityMeta;
use Sm\Response\Response;
use Sm\Response\ResponseMessage;

class Endpoint implements \JsonSerializable {
    public $identifier;
    public $is_entity;
    public $endpoint_type;
    
    /**
     * Endpoint constructor.
     *
     * @param $endpoint_type
     * @param $identifier
     * @param $is_entity
     */
    public function __construct($endpoint_type, $is_entity = true, $identifier = null) {
        $this->endpoint_type = $endpoint_type;
        $this->identifier    = $identifier;
        $this->is_entity     = $is_entity;
    }
    public function setIdentifier($identifier) {
        $this->identifier = $identifier;
    }
    public function initClass() {
        $errors           = [ ];
        $InitializedClass = null;
        if ($this->is_entity) {
            try {
                $ModelClass  = EntityMeta::model_type_to_class(EntityMeta::entity_type_to_model_type($this->endpoint_type));
                $EntityClass = EntityMeta::entity_type_to_class($this->endpoint_type);
                if ($this->identifier) {
                    if (!is_array($this->identifier) && !strpos($this->identifier, ',')) {
                        $InitializedClass = $EntityClass->initFromModel($ModelClass->find($this->identifier));
                    } else {
                        $identifiers    = is_array($this->identifier) ? $this->identifier : explode(',', $this->identifier);
                        $EntityIterator = new EntityIterator();
                        foreach ($identifiers as $identifier) {
                            try {
                                $entity = $EntityClass->initFromModel($ModelClass->find($identifier));
                                $EntityIterator->push($entity);
                            } catch (\Exception $e) {
                                $errors[] = $identifier;
                            }
                        }
                        $InitializedClass = $EntityIterator;
                    }
                } else {
                    $InitializedClass = $EntityClass->initFromModel();
                }
            } catch (\Exception $e) {
                if ($this->identifier)
                    $errors[] = $this->identifier;
            }
        }
        if (count($errors)) {
            return new  Response(ResponseMessage::init(null, "Could not find all resources"),
                                 false,
                                 $InitializedClass,
                                 $errors);
        }
        return $InitializedClass;
    }
    
    public function jsonSerialize() {
        return [
            'identifier'    => $this->identifier,
            'endpoint_type' => $this->endpoint_type,
            'is_entity'     => $this->is_entity,
        ];
    }
}