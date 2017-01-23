<?php
/**
 * User: Sam Washington
 * Date: 11/20/16
 * Time: 12:12 AM
 */

namespace Factshift\Entity;


use Factshift\Core\Factshift;
use Factshift\Entity\Abstraction\FactshiftEntity;
use Factshift\Libs\Validation\SectionValidator;
use Sm\Action\Create\CreateVictim;
use Sm\Action\Destroy\DestroyVictim;
use Sm\Action\Edit\EditVictim;
use Sm\Entity\Action\Create\CreateEntityVictimTrait;
use Sm\Entity\Action\Destroy\DestroyEntityVictimTrait;
use Sm\Entity\Action\Edit\EditEntityVictimTrait;
use Sm\View\Abstraction\Viewable;
use Sm\View\View;

/**
 * Class Section
 *
 * @package Factshift\Entity
 * @uses    EditEntityVictimTrait
 * @uses    CreateEntityVictimTrait
 *
 * @property string $subtitle
 * @property string $title
 * @property bool   $has_title
 * @property string $content_location
 * @property int    $section_type
 * @property int    $id
 */
class Section extends FactshiftEntity implements EditVictim, CreateVictim, DestroyVictim, Viewable {
    static $entity_type = 'Section';
    use EditEntityVictimTrait, CreateEntityVictimTrait, DestroyEntityVictimTrait;
    public function createView() {
        return View::create(Factshift::_()->Paths->template . '/entities/section/template.php', [
            'Section' => $this,
        ], false);
    }
}