<?php
/**
 * User: Sam Washington
 * Date: 11/27/16
 * Time: 10:22 PM
 */

namespace Factshift\Entity\Abstraction;

use Factshift\Core\Factshift;
use Factshift\Entity\Relationship\RelationshipIndex;
use Factshift\User\AppUser;
use Sm\Action\Create\CreateVictim;
use Sm\Action\Destroy\DestroyVictim;
use Sm\Action\Edit\EditVictim;
use Sm\Entity\Action\Create\CreateEntityVictimTrait;
use Sm\Entity\Action\Edit\EditEntityVictimTrait;
use Sm\Entity\Entity;
use Sm\Identifier\Identifiable;


/**
 * Class FactshiftEntity
 *
 * @package Factshift\Entity
 * @property-read $ent_id
 */
class FactshiftEntity extends Entity implements EditVictim, CreateVictim {
    use EditEntityVictimTrait, CreateEntityVictimTrait;
    public function jsonSerialize() {
        $attributes = parent::jsonSerialize();
        /** @var AppUser $User */
        $User = Factshift::_()->IoC->session->getUser();
        if ($User === $this) return $attributes;
        $permissions = [
            'edit'    => false,
            'destroy' => false,
        ];
        
        if ($User && ($this->getUniqueIdentifier(Identifiable::TYPED_IDENTIFIER) != $User->getUniqueIdentifier(Identifiable::TYPED_IDENTIFIER))) {
            if ($this instanceof EditVictim) {
                try {
                    $User->initEditActionAsActor($this, null)->validate();
                    $permissions['edit'] = true;
                } catch (\Exception $e) {
                }
            }
            if ($this instanceof DestroyVictim) {
                try {
                    $User->initDestroyActionAsActor($this, null)->validate();
                    $permissions['destroy'] = true;
                } catch (\Exception $e) {
                }
            }
        }
        if (!empty($permissions)) $attributes['_permissions'] = $permissions;
        return $attributes;
    }
    public function initRelationshipIndex($config) {
        return new RelationshipIndex($this,
                                     $config['relationship_index'] ?? null,
                                     $config['linked_entities'] ?? [ ],
                                     $config['index_singular']);
    }
}