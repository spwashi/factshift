<?php
/**
 * User: sam
 * Date: 6/29/15
 * Time: 12:03 PM
 */

namespace Spwashi\Libs\Validator;

use Spwashi\Libs\Validator\Abstraction\Validator;
use Spwashi\Model\Concept;

class ConceptValidator extends Validator {

	const MIN_TITLE_LENGTH       = 1;
	const MAX_TITLE_LENGTH       = 70;
	const MAX_DESCRIPTION_LENGTH = 1000;
	const MAX_ALIAS_LENGTH       = 70;
	const MIN_ALIAS_LENGTH       = 1;

	#

	public static function getAliasValidity($alias) {
		if (!isset($alias) || $alias == '') return static::E_NULL;
		$len = strlen($alias);
		preg_match('/[^a-zA-Z-\d]/', $alias, $matches);
		if ($len < static::MIN_ALIAS_LENGTH) {
			return static::E_TOO_SHORT;
		} elseif ($len > static::MAX_ALIAS_LENGTH) {
			return static::E_TOO_LONG;
		} elseif (!empty($matches)) {
			return static::E_INVALID_CHARS;
		} else {
			$output = Concept::findSql(['alias' => $alias]);
			if (!!$output && !empty($output))
				return ConceptValidator::E_UNAVAILABLE;
		}
		return true;
	}

	#todo make this into a trait?
	public static function getTitleValidity($title, $is_subtitle = false) {
		if ((!isset($title) || $title == '') && !$is_subtitle && !is_string($title)) return static::E_NULL;
		$len = strlen($title);
		if ($len < static::MIN_TITLE_LENGTH && !$is_subtitle) {
			return static::E_TOO_SHORT;
		} elseif ($len > static::MAX_TITLE_LENGTH) {
			return static::E_TOO_LONG;
		} elseif ($len && preg_match('~' . '[^a-zA-Z_\-\d\'"#,\s?\/();:]+' . '~', $title)) {
			return static::E_INVALID_CHARS;
		}
		return true;
	}

	public static function getSubtitleValidity($subtitle) {
		return static::getTitleValidity($subtitle, true);
	}

	public static function getDescriptionValidity($description) {
		$len = strlen($description);
		return $len <= static::MAX_DESCRIPTION_LENGTH ? true : static::E_TOO_LONG;
	}
}