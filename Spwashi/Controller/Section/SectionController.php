<?php
/**
 * User: sam
 * Date: 6/29/15
 * Time: 6:11 PM
 */

namespace Spwashi\Controller\Page;

use Spwashi\Controller\Abstraction\SpwashiController;
use Spwashi\Libs\View\SectionFactory;
use Spwashi\Model\Section;

class SectionController extends SpwashiController {
    public $index_if_null = true;

    public function section($id, $is_edit = false) {
        $section = Section::find($id);
        if (!!$section) {
            return SectionFactory::build($section, $is_edit);
        }
        return null;
    }
}