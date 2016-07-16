<?php
/**
 * User: sam
 * Date: 6/16/15
 * Time: 9:23 PM
 */

namespace Spwashi\Controller\Page;

use Sm\Development\Log;
use Sm\Model\Model;
use Sm\Model\ModelIterator;
use Sm\Model\ModelMeta;
use Sm\Process\Process;
use Sm\Response\Http;
use Sm\Router\Toute;
use Sm\URI\URI;
use Sm\View\View;
use Spwashi\Controller\Abstraction\SpwashiController;
use Spwashi\Libs\Session\Session;
use Spwashi\Libs\View\SectionFactory;
use Spwashi\Model\Collection;
use Spwashi\Model\Concept;
use Spwashi\Model\Dictionary;
use Spwashi\Model\Dimension;
use Spwashi\Model\Page;
use Spwashi\Model\Section;
use Spwashi\Model\Type\CollectionType;

class PageController extends SpwashiController {
	public $index_if_null = true;

	public function index() {
		return $this->view->insertContentCreate('page/index.php')->setTitle('Page Home', "View pages you've made, saved, or ");
	}

	public function test() {
		$user = Session::get_user();
		try {
			$collections = Collection::findAll(['user_id' => ($user) ? $user->id : false, 'collection_type' => CollectionType::TYPE_STANDARD]);
		} catch (\Exception $e) {
			$collections = new ModelIterator();
		}
		$user_sidebar = View::create('user/user_sidebar.php', ['collections' => $collections]);
		return $this->view->insertContentCreate('examples/chi.php')->addFeature('sidebar', $user_sidebar->enforceTemplate('sidebar.php'));;
	}

	public function create() {
		$post_result    = !empty($_POST) ? Process::create('page/process_page_create.php')->getOutput() : [];
		$error_messages = isset($post_result['message']) ? (array)$post_result['message'] : false;
		$variables      = [
			'post_data' => $_POST,
			'result'    => $post_result,
		];
		$content        = View::create('page/create_form.php', $variables);
		if (!empty($error_messages)) $content->addMessages($error_messages);
		return $this->view->setTitle('Page', 'create')->insertContent($content);
	}

	public function view($context_or_ent_id, $alias = null) {
		$args    = func_get_args();
		$is_edit = $args[count($args) - 1] == 'edit' ? true : false;
		$type    = $is_edit ? 'edit' : 'view';

		$user    = Session::get_user();
		$user_id = ($user) ? $user->id : false;

		//Does the user have permission to modify this resource?
		if ($is_edit && !$user) {
			Http::redirect(Toute::generate_url('spwashi_page_view', [$context_or_ent_id, $alias]));
		}
		Session::require_user_or_redirect($user, URI::get_full_url());

		try {
			$error_messages = false;
			if (!empty($_POST) && $is_edit) {
				$post_result    = Process::create('page/process_page_edit.php')->getOutput();
				$error_messages = isset($post_result['message']) ? (array)$post_result['message'] : false;
				if (!is_array($error_messages) || empty($error_messages)) {
					if (isset($post_result['page'])) {
						$page                      = $post_result['page'];
						$success_redirect_location = Toute::generate_url('spwashi_page_view', [$page->context, $page->alias, 'edit']);
					} else {
						$success_redirect_location = URI::get_full_url();
					}
					Http::redirect($success_redirect_location, true);
				}
			}

			if (ModelMeta::is_ent_id($context_or_ent_id) && ModelMeta::getTablePrefixFromEnt_id($context_or_ent_id) === ModelMeta::model_type_to(Page::class, ModelMeta::TYPE_PREFIX)) {
				$current_page = Page::find(['ent_id' => $context_or_ent_id], ['alias', 'context']);
				$q_s_arr      = [];
				if ($is_edit) {
					$q_s_arr['edit'] = true;
				}
				$success_redirect_location = Toute::generate_url('spwashi_page_view', [$current_page->context, $current_page->alias], $q_s_arr);
				Http::redirect($success_redirect_location, true);
			} else {
				$current_page = Page::find(['alias' => $alias, 'context' => $context_or_ent_id]);
			}

			$var_title    = $current_page->title;
			$var_subtitle = $current_page->subtitle ?: '';
			/** @var Dimension[] $dimension_array */
			try {
				$current_page->findType('dimensions', [], [
					'walk' => function ($dim) {
						/**
						 * @var Dimension $dim
						 */
						($dim->findType('sections'));
					},
				]);
			} catch (\Exception $e) {
				Log::init([
					          $e->getMessage()
				          ])->log_it();
			}
			$current_page->findType('concepts');
			$current_page->findType('dimensions');

			try {
				$dictionaries = Dictionary::findAll(['user_id' => $user_id]);
				/**
				 * @var Dictionary $Dictionary
				 */
				foreach ($dictionaries as $Dictionary) {
					$Dictionary->findType('sections', null, ['walk' => function ($section) {
						/** @var Section $section */
						$section->findType('sections');
					}]);
				}
			} catch (\Exception $e) {
				$dictionaries = new ModelIterator();
			}

			try {
				$concepts = Concept::findAll(['user_id' => $user_id]);
			} catch (\Exception $e) {
				$concepts = new ModelIterator();
			}
			$dims = $current_page->map_remix->dimensions;
			/** @var Dimension $current_dimension */
			$current_dimension     = $dims->get_item_at_index($dims->_meta->_list[0])->model;
			$current_section_array = $current_dimension ? $current_dimension->findSections()->map_remix->sections->get_items(true) : [];
			$generated_sections    = SectionFactory::generate_sections($current_section_array, $is_edit, function (Model &$section) {
				return ($section->findType(new Concept));
			});

			$debug     = isset($_GET['debug']) ? $_GET['debug'] : false;
			$secs      = $generated_sections['sections'];
			$variables = [
				'page'              => $current_page,
				'current_dimension' => $current_dimension,
				'type'              => $type,
				'section_string'    => $generated_sections['text'],
				'section_tree'      => $generated_sections['tree'],
				'is_edit'           => ($type == 'edit'),
				'concepts'          => $concepts,
				'dictionaries'      => $dictionaries,
				'is_debug'          => $debug !== false,
				'debug_level'       => (int)$debug,
			];
			$content   = View::create('page/page.php', $variables);
			if (!empty($error_messages)) $content->addMessages($error_messages);
			#
			/** @var View $view */
			$view = $this->view;
			try {
				$collections = Collection::findAll(['user_id' => $user_id, 'collection_type' => CollectionType::TYPE_STANDARD]);
			} catch (\Exception $e) {
				$collections = new ModelIterator();
			}
			$user_sidebar = $user ? View::create('user/user_sidebar.php', ['collections' => $collections]) : '';
			$page_sidebar = View::create('page/page_sidebar.php', $variables);

			$sidebar = View::init($page_sidebar . $user_sidebar)->enforceTemplate('sidebar.php');
			return $view->setTitle($var_title, $var_subtitle)->insertContent($content)->addFeature('sidebar', $sidebar);
		} catch (\Exception $e) {
			Log::init([
				          $e->getMessage(),
				          $e->getLine(),
				          $e->getFile(),
				          func_get_args()
			          ])->log_it();
			return '404';
		}
	}
}