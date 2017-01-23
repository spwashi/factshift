<?php
/**
 * User: Sam Washington
 * Date: 1/22/17
 * Time: 12:23 PM
 */

namespace FactshiftDev\Entity\Abstraction;


use Sm\Action\Create\CreateVictim;
use Sm\Action\Edit\EditVictim;
use Sm\Entity\Action\Create\CreateEntityVictimTrait;
use Sm\Entity\Action\Edit\EditEntityVictimTrait;
use Sm\Entity\Entity;

class FactshiftDevEntity extends Entity implements EditVictim, CreateVictim {
    use EditEntityVictimTrait, CreateEntityVictimTrait;
}