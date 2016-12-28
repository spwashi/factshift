<?php
/**
 * User: Sam Washington
 * Date: 12/2/16
 * Time: 6:56 PM
 */

namespace Sm\Action\Exception;


class InvalidActorException extends FatalActionException {
    const ERROR_NONEXISTENT = 1;
    const ERROR_FORBIDDEN   = 2;
    protected $code = InvalidActorException::ERROR_FORBIDDEN;
}