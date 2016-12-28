<?php
/**
 * User: Sam Washington
 * Date: 12/3/16
 * Time: 7:07 PM
 */

namespace Sm\Entity\Action\Destroy;


use Sm\Action\Destroy\DestroyAction;
use Sm\Entity\Action\Abstraction\ModifyEntityActionTrait;

class DestroyEntityAction extends DestroyAction {
    use ModifyEntityActionTrait;
}