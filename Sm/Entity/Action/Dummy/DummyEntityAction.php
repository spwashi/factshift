<?php
/**
 * User: Sam Washington
 * Date: 12/2/16
 * Time: 12:50 PM
 */

namespace Sm\Entity\Action\Dummy;

use Sm\Action\Dummy\DummyAction;
use Sm\Entity\Action\Abstraction\ModifyEntityActionTrait;

class DummyEntityAction extends DummyAction {
    use ModifyEntityActionTrait;
}