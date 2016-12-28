<?php
/**
 * User: Sam Washington
 * Date: 11/20/16
 * Time: 12:12 AM
 */

namespace Factshift\Entity;


use Sm\Action\Create\CreateVictim;
use Sm\Action\Destroy\DestroyVictim;
use Sm\Action\Edit\EditVictim;
use Sm\Core\Inflector;
use Sm\Core\Util;
use Sm\Entity\Action\Create\CreateEntityVictimTrait;
use Sm\Entity\Action\Destroy\DestroyEntityVictimTrait;
use Sm\Entity\Action\Edit\EditEntityVictimTrait;
use Sm\Entity\Model\ModelNotFoundException;
use Factshift\Entity\Abstraction\FactshiftEntity;
use Factshift\Entity\Model\PageModel;

/**
 * Class Page
 *
 * @package Factshift\Entity
 * @property $id
 * @property $title
 * @property $description
 * @property $subtitle
 * @property $context
 * @property $alias
 * @property $ent_id
 */
class Page extends FactshiftEntity implements CreateVictim, EditVictim, DestroyVictim {
    static $entity_type = 'Page';
    use EditEntityVictimTrait, CreateEntityVictimTrait, DestroyEntityVictimTrait;
    
    public static function generateAlias($title, $subtitle = null) {
        if (is_numeric($title))
            $title = 'p ' . $title;
        $title    = strtolower($title);
        $subtitle = $subtitle ? strtolower($subtitle) : null;
        if ($subtitle) $title = $title . ' ' . $subtitle;
        $alias = Inflector::slug($title, '-');
        try {
            PageModel::find([ 'alias' => $alias ], [ 'id' ]);
            $tail = Util::generateRandomString('3', 'abcdefghijklmnopqrstuvwxyz123456789');
            return static::generateAlias($alias, $tail);
        } catch (ModelNotFoundException $e) {
            return $alias;
        }
    }
}