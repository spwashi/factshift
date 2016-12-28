<?php
/**
 * User: Sam Washington
 * Date: 4/4/2015
 * Time: 4:20 PM
 */

namespace Factshift\Controller;

use Factshift\Controller\Abstraction\Controller;
use Sm\Core\App;
use Sm\Process\Process;
use Sm\Response\Http;
use Sm\Security\XSS;
use Sm\View\View;

class HomeController extends Controller {
    public function index() {
        return $this->view->insertContentCreate('user/home.php')->setTitle('Home', 'Where the heart is');
    }
    
    public function pas() {
        $post_result    = !empty($_POST) ? Process::create('allenhall/generate_allenotes.php')->getOutput() : [ ];
        $error_messages = isset($post_result['message']) ? (array)$post_result['message'] : false;
        $variables      = [
            'post_data' => XSS::escape($_POST),
            'result'    => $post_result,
            'print'     => true,
            'output'    => $error_messages ? $error_messages['contents'] : false,
        ];
        $v              = View::create('allenhall/allenotes.php', $variables);
        if ($error_messages) $v->addMessages($error_messages);
        
        return $this->view->insertContent($v)->setTitle('Allenotes');
    }
    
    public function allenotes($date = null) {
        if ($date) {
            if (strpos($date, '_')) $date = str_replace('_', '/', $date);
            else if (is_numeric($date) && $date > 31) {
                $date = '' . (date('m') - 1) . '/' . $date;
            }
        } else {
            Http::redirect(App::_()->IoC->router->generate_url('allenotes', [ date('m_d') ]), true);
        }
        if (isset($_GET['bi'])) $date .= ' bi';
        $cmd = '/usr/local/bin/python3.3 /var/www/dev/s/Factshift/scripts/allenhall/g_a.py ' . $date . ' 2>&1';
        exec($cmd, $o);
        $sidebar = View::create('allenhall/notes.php', [ 'output' => $o ])->enforceTemplate('sidebar.php');
        return $this->view->insertContentCreate('allenhall/generic.php')
                          ->addFeature('sidebar', $sidebar)
                          ->insertContentCreate('allenhall/finished_allenotes.html')
                          ->setTitle('Allenotes', 'Allenotes generated for this week');
    }
    
    public function example() {
        $v = View::create(App::_()->Paths->app . '/drivers/_models.php', [ ], false);
        return 'e8hq2R83';
    }
    public function example_2() {
        $v = View::create('examples/text_2.php');
        return $v;
    }
}