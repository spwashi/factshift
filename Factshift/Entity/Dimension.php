<?php
/**
 * User: Sam Washington
 * Date: 11/20/16
 * Time: 12:12 AM
 */

namespace Factshift\Entity;


use Sm\Action\Create\CreateVictim;
use Sm\Action\Edit\EditVictim;
use Sm\Entity\Action\Create\CreateEntityVictimTrait;
use Sm\Entity\Action\Edit\EditEntityVictimTrait;
use Factshift\Entity\Abstraction\FactshiftEntity;

class Dimension extends FactshiftEntity implements EditVictim, CreateVictim {
    static $entity_type = 'Dimension';
    use EditEntityVictimTrait, CreateEntityVictimTrait;
}