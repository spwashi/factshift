<?php
/**
 * User: Sam Washington
 * Date: 12/7/16
 * Time: 10:38 PM
 */

namespace Factshift\Entity\Relationship;


use Factshift\Entity\Abstraction\FactshiftEntity;
use Sm\Entity\Model\EntityMeta;

class RelationshipIndex extends \Sm\Entity\Relationship\RelationshipIndex {
    /** @var FactshiftEntity $CurrentContext The current context in which these relationships are valid */
    protected $CurrentContext = null;
    /** @var string */
    protected $CurrentContextID = null;
    protected $items            = [ ];
#########################################################
#                Initializers and Constructors          #
#########################################################
    public function initMap($OtherEntity, $Map = null) {
        $Map                        = parent::initMap($OtherEntity, $Map);
        $relationship_is_reciprocal = strpos($this->relationship_index, 'reciprocal_') === 0;
        # --- Make sure the map indices are set! Might not be right?
        $self_map_index  = EntityMeta::get_index_from_linked_entity([
                                                                        $this->Entity,
                                                                        $OtherEntity,
                                                                    ], $this->Entity, $relationship_is_reciprocal);
        $other_map_index = EntityMeta::get_index_from_linked_entity([
                                                                        $this->Entity,
                                                                        $OtherEntity,
                                                                    ], $OtherEntity, !$relationship_is_reciprocal);
        
        $_em_relationship_types = EntityMeta::get_enum_value('relationship_types');
        $relationship_index     = str_replace('reciprocal_', '', static::interpret_relationship_index($this->relationship_index));
        if (($_em_relationship_types[ $relationship_index ]?? false) &&
            ($relationship_type = ($_em_relationship_types[ $relationship_index ]['id'] ?? false)) &&
            !$Map->get('relationship_type')
        ) {
            $Map->set([ 'relationship_type' => $relationship_type ]);
        }
        if (is_string($self_map_index) && !$Map->get($self_map_index)) $Map->set([ $self_map_index => $this->Entity ]);
        if (is_string($other_map_index) && !$Map->get($other_map_index)) $Map->set([ $other_map_index => $OtherEntity ]);
        if (!$Map->get('position')) $Map->set([ 'position' => 0 ]);
        return $Map;
    }
    public function initRelationshipEntity(&$OtherEntity, $Map = null) {
        $RelationshipEntity = new RelationshipEntity($this->Entity, $OtherEntity);
        if (!$Map) $Map = $this->initMap($OtherEntity, $Map);
        if ($Map) $RelationshipEntity->addModel($Map);
        return $RelationshipEntity;
    }
    public static function interpret_relationship_index($relationship_index) {
        $relationship_index = parent::interpret_relationship_index($relationship_index);
        # --- I changed the names of these relationship_types.
        # --- Having this map-ish operation here makes it a little bit easier for me to refer to them as their relationship_indices
        $relationship_is_reciprocal = strpos($relationship_index, 'reciprocal_') === 0;
        if ($relationship_is_reciprocal) $relationship_index = str_replace('reciprocal_', '', $relationship_index);
        switch ($relationship_index) {
            case 'pivot':
            case 'pivots':
                $relationship_index = 'rephrase_content';
                break;
            case 'macro':
            case 'macros':
                $relationship_index         = 'reciprocal_low_level';
                $relationship_is_reciprocal = false;
                break;
            case 'micro':
            case 'micros':
                $relationship_index = 'low_level';
        }
        if ($relationship_is_reciprocal) $relationship_index = "reciprocal_{$relationship_index}";
        return $relationship_index;
    }
}