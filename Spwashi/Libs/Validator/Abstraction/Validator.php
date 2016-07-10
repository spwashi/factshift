<?php
/**
 * User: sam
 * Date: 6/29/15
 * Time: 12:25 PM
 */

namespace Spwashi\Libs\Validator\Abstraction;

abstract class Validator {
    const E_NULL           = 3;
    const E_TOO_LONG       = 4;
    const E_TOO_SHORT      = 5;
    const E_UNAVAILABLE    = 6;
    const E_INVALID_CHARS  = 7;
    const E_ERROR          = 8;
    const E_TEST           = 9;
    const E_INVALID_ACCESS = 10;
    const E_INVALID_EDIT   = 11;
    const E_INVALID_DELETE = 12;
}