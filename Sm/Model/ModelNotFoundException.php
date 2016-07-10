<?php
/**
 * User: sam
 * Date: 5/18/15
 * Time: 10:22 PM
 */

namespace Sm\Model;

class ModelNotFoundException extends \Exception {
    const REASON_NOT_FOUND         = 1;
    const REASON_NOT_SEARCHED      = 2;
    const REASON_NOT_ACCESSIBLE    = 3;
    const REASON_NOT_ACTIVE        = 4;
    const REASON_NO_MATCHING_CLASS = 5;
}