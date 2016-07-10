<?php
/**
 * User: sam
 * Date: 7/13/15
 * Time: 5:10 PM
 */

namespace Spwashi\Libs\Validator;


use Spwashi\Libs\Validator\Abstraction\Validator;
use Spwashi\Model\User;

class UserValidator extends Validator {
	const MAX_NAME_LENGTH     = 35;
	const MAX_PASSWORD_LENGTH = 15;
	const MIN_PASSWORD_LENGTH = 5;
	const MIN_ALIAS_LENGTH    = 5;
	const MAX_ALIAS_LENGTH    = 35;

	public static function getNameValidity($name) {
		if ($name == '' || $name == null) return Validator::E_NULL;
		$len = strlen($name);
		preg_match('/[^a-zA-Z-\s]/', $name, $matches);
		if ($len > static::MAX_NAME_LENGTH) {
			return Validator::E_TOO_LONG;
		} elseif (!empty($matches)) {
			return Validator::E_INVALID_CHARS;
		};
		return true;
	}
	
	public static function getAliasValidity($alias) {
		if (!isset($alias) || $alias == '') {
			return Validator::E_NULL;
		}
		$len = strlen($alias);
		preg_match('/[^a-zA-Z-_\d]/', $alias, $matches);
		if ($len < static::MIN_ALIAS_LENGTH) {
			return Validator::E_TOO_SHORT;
		} elseif ($len > static::MAX_ALIAS_LENGTH) {
			return Validator::E_TOO_LONG;
		} elseif (!empty($matches)) {
			return Validator::E_INVALID_CHARS;
		} else {
			$search = User::findSql([ 'alias' => $alias ], false, [ 'id' ]);
			if (!empty($search)) {
				return Validator::E_UNAVAILABLE;
			}
			return true;
		}
	}

	public static function getPasswordValidity($password) {
		if ($password == '' || $password == null) return Validator::E_NULL;
		$len = strlen($password);
		if ($len < static::MIN_PASSWORD_LENGTH) {
			return Validator::E_TOO_SHORT;
		} elseif ($len > static::MAX_PASSWORD_LENGTH) {
			return Validator::E_TOO_LONG;
		}

		return true;
	}

	public static function getEmailValidity($email) {
		$validity = true;
		if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
			$validity = Validator::E_INVALID_CHARS;
		} else {
			$find_attempt = User::findSql([ 'email' => $email ], false, [ 'email' ]);
			if (!!$find_attempt && !empty($find_attempt)) {
				$validity = Validator::E_UNAVAILABLE;
			}
		}
		return $validity;
	}
}