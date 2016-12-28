<?php
/**
 * User: Sam Washington
 * Date: 11/22/16
 * Time: 10:17 PM
 */

namespace Sm\Entity;


use Sm\Entity\Abstraction\Entity;
use Sm\Iterator\Iterator;

/**
 * Class EntityIterator
 *
 * @package Sm\Entity
 * @method Entity current()
 */
class EntityIterator extends Iterator {
    /** @var  Entity[] $items */
    protected $items;
    /**
     * @param Entity $locate
     *
     * @return bool|int|string
     */
    public function locate($locate) {
        foreach ($this->items as $index => $item) {
            if ($item === $locate) return $index;
            if ($item->getUniqueIdentifier() == $locate->getUniqueIdentifier()) return $index;
            if (!$item->getPrimaryModel() || $locate->getPrimaryModel()) continue;
            if ($item->getPrimaryModel()->getTypedId() === $locate->getPrimaryModel()->getTypedId()) return $index;
        }
        return false;
    }
}