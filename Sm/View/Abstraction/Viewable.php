<?php
/**
 * User: Sam Washington
 * Date: 12/8/16
 * Time: 11:59 PM
 */

namespace Sm\View\Abstraction;


use Sm\View\View;

interface Viewable {
    /**
     * @return View
     */
    public function createView();
}