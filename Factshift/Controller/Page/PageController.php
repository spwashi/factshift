<?php
/**
 * User: sam
 * Date: 6/16/15
 * Time: 9:23 PM
 */

namespace Factshift\Controller\Page;

use Factshift\Controller\Abstraction\Controller;
use Factshift\Entity\Model\PageModel;
use Factshift\Entity\Page;
use Factshift\Libs\View\SectionViewCreator;
use Factshift\User\AppUser;
use Sm\Action\Exception\ActionException;
use Sm\Core\App;
use Sm\Development\Log;
use Sm\Environment\Environment;
use Sm\Process\Process;
use Sm\Response\Http;
use Sm\Security\XSS;
use Sm\URI\URI;
use Sm\View\View;

class PageController extends Controller {
    public $index_if_null = true;
    
    public function index() {
        return $this->view->insertContentCreate('page/index.php')->setTitle('Page Home', "View pages you've made, saved, or ");
    }
    
    
    public function create() {
        $error_messages = [ ];
        if (!empty($_POST)) {
            $User   = App::_()->IoC->session->getUser();
            $Page   = new Page;
            $Action = $User->initCreateActionAsActor($Page, $_POST);
            try {
                $Response = $Action->execute();
                if ($Response->getStatus()) Http::redirect(App::_()->IoC->router->generate_url('page_view', [ $Page->context, $Page->alias ]));
            } catch (ActionException $e) {
                $error_messages = $e->getResponse()->getErrors();
            } catch (\Exception $e) {
                Log::init($e)->log_it();
            }
        }
        $content = View::create('page/create_form.php', [ 'post_data' => XSS::escape($_POST) ]);
        if (!empty($error_messages)) $content->addMessages($error_messages);
        return $this->view->setTitle('Page', 'create')->insertContent($content);
    }
    
    public function view($context_or_ent_id, $alias = null) {
        $args    = func_get_args();
        $is_edit = $args[ count($args) - 1 ] == 'edit' ? true : false;
        $type    = $is_edit ? 'edit' : 'view';
        /** @var AppUser $user */
        App::_()->IoC->session->require_user_or_redirect($user, App::_()->IoC->router->generate_url('page_view', [ $context_or_ent_id, $alias ]));
        
        $PageModel = PageModel::find([ 'alias' => $alias, 'context' => $context_or_ent_id ]);
        /** @var Page $Page */
        $Page = Page::initFromModel($PageModel);
        
        
        $error_messages = false;
        if (!empty($_POST) && $is_edit) {
            $post_result    = Process::create('page/process_page_edit.php')->getOutput();
            $error_messages = isset($post_result['message']) ? (array)$post_result['message'] : false;
            if (!is_array($error_messages) || empty($error_messages)) {
                if (isset($post_result['page'])) {
                    $Page                      = $post_result['page'];
                    $success_redirect_location = App::_()->IoC->router->generate_url('page_view', [ $Page->context, $Page->alias, 'edit' ]);
                } else {
                    $success_redirect_location = URI::get_full_url();
                }
                Http::redirect($success_redirect_location, true);
            }
        }
        
        
        $dimensions       = $Page->findRelationshipIndex('dimensions')->getItems('Dimension');
        $CurrentDimension = $dimensions[0] ?? null;
        
        $Concepts = $Page->findRelationshipIndex('concepts')->getItems('Concept');
        
        $dimension_sections = [ ];
        /** @var \Factshift\Entity\Dimension $dimension */
        foreach ($dimensions as $dimension) {
            $items                 = $dimension->findRelationshipIndex('sections')->getItems('Section');
            $dimension_sections [] = $items;
        }
        
        if (!empty($dimension_sections)) $dimension_sections = call_user_func_array('array_merge', $dimension_sections);
        $generated_sections = SectionViewCreator::generate_sections($dimension_sections, false);

//				Log::init($section->findType('concepts')->maps->concepts)->log_it();
        /** @var \Factshift\Entity\Concept $concept */
        foreach ($Concepts as $concept) {
            $concept->findRelationshipIndex('sections')->getItems('Section');
        }
        
        $dictionaries = $user->findRelationshipIndex('dictionaries')->getItems('Dictionary');
        $debug        =
            App::_()->Environment->getDevStatus() === Environment::ENV_DEV
                ? ($_GET['debug'] ?? false)
                : false;
        $debug        = true;
        
        $variables = [
            'Page'             => $Page,
            'CurrentDimension' => $CurrentDimension,
            'type'             => $type,
            'sections'         => $generated_sections['sections'],
            'section_string'   => $generated_sections['string'],
            'section_tree'     => $generated_sections['tree'],
            'is_edit'          => ($type == 'edit'),
            'concepts'         => $Concepts,
            'dictionaries'     => $dictionaries,
            'is_debug'         => $debug !== false,
            'debug_level'      => (int)$debug,
            'can_edit'         => $user && $Page->user_id == $user->id,
        ];
        
        /** @var View $view */
        $view         = $this->view;
        $page_sidebar = View::create('page/page_sidebar.php', $variables)->enforceTemplate('sidebar.php');
        $view
            ->setTitle($Page->title, $Page->subtitle)
            ->insertContent(View::create('page/page.php', $variables))
            ->addFeature('sidebar', $page_sidebar);
        return $view;
    }
}