<?php
/**
 * User: sam
 * Date: 6/29/15
 * Time: 12:03 PM
 */

namespace Spwashi\Libs\Validator;

use Sm\Core\Util;
use Sm\Model\ModelMeta;
use Spwashi\Libs\Validator\Abstraction\Validator;
use Spwashi\Model\Type\SectionType;

class SectionValidator extends Validator {

    const MIN_TITLE_LENGTH            = 0;
    const MAX_WORDS_LENGTH            = 1500;
    const MAX_TITLE_LENGTH            = 70;
    const MAX_CONTENT_LENGTH          = 750;
    const MAX_CONTENT_LOCATION_LENGTH = 135;

    /**
     * Check to see if the title (or subtitle) is valid. As of now, does not consider an object. Return an integer
     * detailing the error.
     *
     * @param            $title
     * @param bool|false $is_subtitle
     *
     * @return bool|int A message saying why the subject is considered incorrect or unsafe
     */
    public static function getTitleValidity($title, $is_subtitle = false) {
//		if ((!isset($title) || $title == '') && !$is_subtitle) return static::E_NULL;
        $len = strlen($title);
        if ($len < static::MIN_TITLE_LENGTH && !$is_subtitle) {
            return static::E_TOO_SHORT;
        } elseif ($len > static::MAX_TITLE_LENGTH) {
            return static::E_TOO_LONG;
        }
        return true;
    }

    public static function getWordsValidity($words) {
        $len = strlen($words);
        if ($len < static::MIN_TITLE_LENGTH) {
            return static::E_TOO_SHORT;
        } elseif ($len > static::MAX_TITLE_LENGTH) {
            return static::E_TOO_LONG;
        }
        return true;
    }

    public static function getContentLocationValidity($content_location) {
        $is_valid_url = filter_var($content_location, FILTER_VALIDATE_URL);
        $host         = Util::getHost($content_location);
        if (strlen($content_location) > static::MAX_CONTENT_LOCATION_LENGTH) {
            return static::E_TOO_LONG;
        }
        if (ModelMeta::is_ent_id($content_location)) return true;
        if (!$is_valid_url) return static::E_INVALID_CHARS;
        //todo make this better for different subdomains, add more trusted URLs
        if (!($host == 'www.youtube.com') && !($host == 'youtube.com') && !($host == 'spwashi.com') && !($host == 's.dev.spwashi.com') && !(Util::isImage($content_location))) {
            return static::E_INVALID_CHARS;
        }
        return true;
    }

    public static function getHasTitleValidity($has_title) {
        return $has_title == 1 || $has_title == 0 ? true : static::E_INVALID_CHARS;
    }

    /**
     * Return the validity of the subtitle. As of now, does not depend on the object. The return value is an integer
     * detailing why the subtitle is invalid, or true if it's good.
     *
     * @param $subtitle
     *
     * @return bool|int A message saying why the subject is considered incorrect or unsafe
     */
    public static function getSubtitleValidity($subtitle) {
        return static::getTitleValidity($subtitle, true);
    }

    /**
     * Return the validity of the content. As of now, only works if the content is a string. The return value is either
     * true (good) or E_TOO_LONG (which means it is too long)
     *
     * @param string|int $content The content in question
     *
     * @return bool|int A message saying why the subject is considered incorrect or unsafe
     */
    public static function getContentValidity($content) {
        $len = strlen($content);
        return $len <= static::MAX_CONTENT_LENGTH ? true : static::E_TOO_LONG;
    }

    /**
     * Returns true if the section type is one of the allowed section types, otherwise says there are invalid
     * characters in the input
     *
     * @param $type
     *
     * @return bool|int A message saying why the subject is considered incorrect or unsafe
     */
    public static function getSectionTypeValidity($type) {
        return ((is_string($type) || is_int($type))
            && ($type == SectionType::TYPE_STANDARD
                || $type == SectionType::TYPE_IMAGE
                || $type == SectionType::TYPE_AUDIO
                || $type == SectionType::TYPE_VIDEO
                || $type == SectionType::TYPE_DEFINITION
                || $type == SectionType::TYPE_MIRROR)) ? true : static::E_INVALID_CHARS;
    }
}