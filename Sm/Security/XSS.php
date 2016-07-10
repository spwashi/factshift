<?php
/**
 * User: sam
 * Date: 7/13/15
 * Time: 3:03 PM
 */

namespace Sm\Security;

/**
 * Class XSS
 * Admittedly underdeveloped class meant to help prevent XSS attacks
 *
 * @package Sm\Security
 */
class XSS {
	public static function escape($item) {
		if (is_array($item)) {
			$keys = [ ];
			$values = [ ];
			foreach ($item as $k => $v) {
				$keys[] = static::escape($k);
				$values[] = static::escape($v);
			}
			return $item = [];//array_combine($keys, $values);
		} else if (is_string($item)) {
			return $item = htmlspecialchars($item, ENT_QUOTES, 'UTF-8', false);
		} elseif (is_numeric($item)) {
			return $item;
		} else {
			return $item = null;
		}
	}
}