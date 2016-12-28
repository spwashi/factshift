<?php
/**
 * User: Sam Washington
 * Date: 11/22/16
 * Time: 10:17 PM
 */

namespace Sm\Entity\Model;


use Sm\Entity\Model\Abstraction\Model;
use Sm\Iterator\Iterator;

class ModelIterator extends Iterator {
    /** @var  Model[] $items */
    protected $items;
}