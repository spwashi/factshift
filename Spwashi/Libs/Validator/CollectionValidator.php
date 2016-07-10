<?php
/**
 * User: sam
 * Date: 6/29/15
 * Time: 12:03 PM
 */

namespace Spwashi\Libs\Validator;

use Spwashi\Libs\Validator\Abstraction\Validator;
use Spwashi\Model\Type\CollectionType;

class CollectionValidator extends Validator {
    const MIN_TITLE_LENGTH       = 1;
    const MAX_TITLE_LENGTH       = 35;
    const MAX_DESCRIPTION_LENGTH = 240;

    #
    public static function getTitleValidity($title) {
        if ((!isset($title) || $title == '')) return static::E_NULL;
        $len = strlen($title);
        if ($len < static::MIN_TITLE_LENGTH) {
            return static::E_TOO_SHORT;
        } elseif ($len > static::MAX_TITLE_LENGTH) {
            return static::E_TOO_LONG;
        }
        return true;
    }

    public static function getDescriptionValidity($description) {
        $len = strlen($description);
        return $len <= static::MAX_DESCRIPTION_LENGTH ? true : static::E_TOO_LONG;
    }

    public static function getCollectionTypeValidity($type) {
        return ((is_string($type) || is_int($type)) && ($type == CollectionType::TYPE_STANDARD)) ? true : static::E_INVALID_CHARS;
    }
}