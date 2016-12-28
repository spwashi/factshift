<?php
/**
 * User: Sam Washington
 * Date: 12/2/16
 * Time: 6:59 PM
 */

namespace Sm\Action\Exception;


class InvalidVictimException extends FatalActionException {
    const ERROR_NONEXISTENT = 1;
    const ERROR_FORBIDDEN   = 2;
    const ERROR_WRONG_TYPE  = 3;
}