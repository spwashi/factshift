<?php
/**
 * User: sam
 * Date: 6/29/15
 * Time: 6:11 PM
 */

namespace Factshift\Controller\Page;

use Factshift\Controller\Abstraction\Controller;
use Factshift\Libs\View\SectionViewCreator;
use Factshift\Model\Section;

class SectionController extends Controller {
    public $index_if_null = true;

    public function section($id, $is_edit = false) {
        $section = Section::find($id);
        if (!!$section) {
            return SectionViewCreator::build($section, $is_edit);
        }
        return null;
    }
}