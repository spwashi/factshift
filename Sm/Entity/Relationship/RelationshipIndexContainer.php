<?php
/**
 * User: Sam Washington
 * Date: 11/22/16
 * Time: 11:25 PM
 */

namespace Sm\Entity\Relationship;


use Sm\Development\Log;
use Sm\Entity\Abstraction\Entity;

/**
 * Class RelationshipIndexContainer
 *
 * @package Sm\Entity\Relationships
 * @property RelationshipIndex $children
 * @property RelationshipIndex $micros
 * @property RelationshipIndex $composition
 * @property RelationshipIndex $dimensions
 * @property RelationshipIndex $pages
 * @property RelationshipIndex $dictionaries
 */
class RelationshipIndexContainer implements \JsonSerializable {
    protected $relationship_indices = [ ];
    protected $gotten               = [ ];
    protected $Entity;

#########################################################
#             Initializers and Constructors             #
#########################################################
    public function __construct(Entity $Entity) {}
#########################################################
#                 Adders, Getters, Pushers               #
#########################################################
    public function addRelationshipIndex($index, RelationshipIndex $relationshipIndex) {
        $this->relationship_indices[ $index ] = $relationshipIndex;
    }
    public function &getRelationshipIndex($index) {
        $this->mark_gotten($index);
        if (!isset($this->relationship_indices[ $index ])) $this->relationship_indices[ $index ] = null;
        return $this->relationship_indices[ $index ];
    }
    public function getAllIndices() {
        return $this->relationship_indices;
    }
    public function &__get($index) {
        return $this->getRelationshipIndex($index);
    }
#########################################################
#                 Relationship functions                #
#########################################################
    protected function mark_gotten($index) {
        $this->gotten[] = $index;
    }
    public function hasRelationshipIndex(string $relationship_index) {
        return isset($this->relationship_indices[ $relationship_index ]);
    }
#########################################################
#                 Logging and Serialization             #
#########################################################
    public function jsonSerialize() {
        $relationship_indices = [ ];
        foreach ($this->gotten as $relationship_index) {
            $relationship_indices[ $relationship_index ] = ($this->relationship_indices[ $relationship_index ]);
        }
        return $relationship_indices;
    }
}