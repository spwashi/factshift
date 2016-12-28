<?php
/**
 * User: Sam Washington
 * Date: 12/2/16
 * Time: 6:34 PM
 */

namespace Sm\Entity\Action\Dummy;


use Sm\Action\Dummy\DummyAction;
use Sm\Entity\Abstraction\Entity;

/**
 * Class DummyEntityVictimTrait
 *
 * @uses
 * @package Sm\Entity\Action\Dummy
 */
trait DummyEntityVictimTrait {
    /**
     * @param                                 $actor
     * @param null                            $properties
     *
     * @return \Sm\Action\Dummy\DummyAction
     */
    public function initDummyActionAsVictim($actor, $properties = null) : DummyAction {
        $Action = DummyEntityAction::init($actor, $properties, $this);
        /** @var Entity $this */
        $Action->setValidator($this->getValidator());
        return $Action;
    }
    public function receiveDummyAction(DummyAction $editAction) {
        $DummyActionResponse = $editAction->getResponse();
        return $DummyActionResponse;
    }
}