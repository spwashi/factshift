<?php
/**
 * User: sam
 * Date: 6/4/15
 * Time: 10:41 PM
 */

namespace Factshift\Controller;

use Factshift\Core\Factshift;

class Dev extends HomeController {
    public function index() {
        Factshift::_()->IoC->register('connection', Factshift::_()->IoC->config_connection);
        $View = $this->View;
        $View->setTitle('Development Access Suite')->insertContentCreate('dev/index.php');
        return $View;
    }
    
    
    
}