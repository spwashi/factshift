<?php
/**
 * User: sam
 * Date: 6/20/15
 * Time: 1:27 PM
 */

namespace Factshift\Controller\Abstraction;

use Sm\View\View;

/**
 * Class FactshiftController
 *
 * @package Factshift\Controller\Abstraction
 * @property View $View
 */
abstract class Controller extends \Sm\Controller\Abstraction\Controller {
    /** @var View */
    public $view;
    
    public function __construct() {
        /** @var View view */
        $this->View = View::init()
                          ->enforceTemplate('test/layout.php')
                          ->insertContent('Facts the way you need them', '{{site_description}}');
    }
}