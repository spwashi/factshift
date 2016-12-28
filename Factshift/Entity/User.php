<?php
/**
 * User: Sam Washington
 * Date: 11/20/16
 * Time: 12:12 AM
 */

namespace Factshift\Entity;


use Factshift\Action\Entity\UserCreatePageAction;
use Factshift\Entity\Abstraction\FactshiftEntity;
use Sm\Action\Create\CreateActor;
use Sm\Action\Create\CreateVictim;
use Sm\Action\Destroy\DestroyActor;
use Sm\Action\Destroy\DestroyActorTrait;
use Sm\Action\Edit\EditActor;
use Sm\Action\Edit\EditActorTrait;
use Sm\Action\Edit\EditVictim;
use Sm\Entity\Action\Create\CreateEntityAction;
use Sm\Entity\Action\Create\CreateEntityVictimTrait;
use Sm\Entity\Action\Edit\EditEntityVictimTrait;

/**
 * Class User
 *
 * @package    Factshift\Entity
 * @property string $alias
 * @property int    $id
 * @property string $ent_id
 * @property string $first_name
 * @property string $last_name
 * @property string $password
 * @implements CreateVictim
 */
class User extends FactshiftEntity implements CreateActor, CreateVictim, EditVictim, EditActor, DestroyActor {
    static $entity_type = 'User';
    use EditActorTrait, CreateEntityVictimTrait, EditEntityVictimTrait, DestroyActorTrait;
    
    public function initCreateActionAsActor(CreateVictim $Victim, $properties = null) {
        if ($Victim instanceof Page) {
            return new UserCreatePageAction($this,
                                            Page::init()->set($properties),
                                            $Victim);
        }
        return new CreateEntityAction($this, $properties, $Victim);
    }
    public function jsonSerialize() {
        return [
            'first_name' => $this->first_name,
            'last_name'  => $this->last_name,
            'ent_id'     => $this->ent_id,
            'alias'      => $this->ent_id,
            'id'         => $this->id,
        ];
    }
}