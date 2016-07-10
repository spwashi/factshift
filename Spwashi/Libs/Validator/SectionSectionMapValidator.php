<?php
/**
 * User: Sam Washington
 * Date: 9/11/15
 * Time: 8:58 PM
 */

namespace Spwashi\Libs\Validator;

use Spwashi\Libs\Validator\Abstraction\Validator;
use Spwashi\Model\RelationshipStatus;
use Spwashi\Model\Type\RelationshipType;

class SectionSectionMapValidator extends Validator {
    /**
     * Return the validity of the position. Right now, only checks to see if the position is an integer; This does not depend on the objects in question
     * @param $position
     * @return bool|int A message saying why the subject is considered incorrect or unsafe
     */
    public static function getPositionValidity($position) {
        if (!is_numeric($position)) {
            return static::E_INVALID_CHARS;
        };
        return true;
    }

    public static function getSectionIdValidity($id) {
        if (!is_numeric($id)) {
            return static::E_INVALID_CHARS;
        };
        return true;
    }

    /**
     * Return the validity of the relationship type. This should depend on the objects in question, but it does not at the moment.
     * @param $relationship_type
     * @return bool|int A message saying why the subject is considered incorrect or unsafe
     */
    public static function getRelationshipTypeValidity($relationship_type) {
        return ((is_string($relationship_type) || is_int($relationship_type))
            && ($relationship_type == RelationshipType::TYPE_CHILD
                || $relationship_type == RelationshipType::TYPE_COMPOSITION
                || $relationship_type == RelationshipType::TYPE_HIGH_LEVEL
                || $relationship_type == RelationshipType::TYPE_LOW_LEVEL
                || $relationship_type == RelationshipType::TYPE_REPHRASE_TYPE
                || $relationship_type == RelationshipType::TYPE_REPHRASE_CONTENT)) ? true : static::E_INVALID_CHARS;
    }

    public static function getRelationshipStatusValidity($relationship_status) {
        return ((is_string($relationship_status) || is_int($relationship_status))
            && ($relationship_status == RelationshipStatus::STATUS_CONFIRMED
                || $relationship_status == RelationshipStatus::STATUS_TENTATIVE
                || $relationship_status == RelationshipStatus::STATUS_REJECTED

            )) ? true : static:: E_INVALID_CHARS;
    }
}