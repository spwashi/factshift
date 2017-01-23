<?php
/**
 * User: Sam Washington
 * Date: 4/4/2015
 * Time: 4:20 PM
 */

namespace Factshift\Controller;

use Factshift\Controller\Abstraction\Controller;
use Factshift\Core\Factshift;
use Sm\View\View;

class HomeController extends Controller {
    public function index() {
        return $this->View->insertContentCreate('user/home.php')->setTitle('Home', 'Where the heart is');
    }
    
    public function example() {
        $v = View::create(Factshift::_()->Paths->app . '/drivers/_models.php', [ ], false);
        return 'e8hq2R83';
    }
    public function example_2() {
        $v = View::create('examples/text_2.php');
        return $v;
    }
}