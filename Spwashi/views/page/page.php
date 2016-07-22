<?php
use Sm\Controller\Abstraction\Controller;
use Sm\Core\App;
use Sm\Model\ModelMeta;
use Sm\Response\Http;
use Sm\Router\Toute;
use Sm\Security\XSS;
use Spwashi\Libs\Session\Session;
use Spwashi\Libs\Validator\PageValidator;
use Spwashi\Model\Collection;
use Spwashi\Model\Page;

$user = Session::get_user();
if (!isset($page) || !($page instanceof Page)) Http::redirect(Toute::generate_url('404'));
$p_description = XSS::escape($page->description);
$p_title       = XSS::escape($page->title);
$p_subtitle    = XSS::escape($page->subtitle);
$p_ent_id      = $page->ent_id;
$p_id          = intval($page->id);
$u_id          = intval($user->id);

/**
 * @var Page       $page
 * @var Collection $current_dimension
 * @var string     $type
 * @var string     $section_string
 */
$is_edit     = ($type == 'edit');
$can_edit    = $page->user_id == $user->id;
$is_debug    = isset($is_debug) ? $is_debug : false;
$debug_level = isset($debug_level) ? $debug_level : Controller::DEBUG;
$nonce       = \Sm\Form\Form::generate_nonce('frm-page_edit');

$sections     = isset($sections) ? $sections : "";
$urls         = [];
$urls['edit'] = Toute::generate_url('spwashi_page_view', [$page->context, $page->alias, 'edit'], $is_debug ? '?debug' : '');
$urls['view'] = Toute::generate_url('spwashi_page_view', [$page->context, $page->alias], $is_debug ? '?debug' : '')

?>
<input type="hidden" id="usr_id" value="<?= $user->id ?>"/>
<input type="hidden" id="d_l" value="<?= $is_debug ? $debug_level : false; ?>"/>
<input type="hidden" id="i_e" value="<?= $is_edit ?>"/>
<!--                Not sure why, but embedding youtube seems to require two i-frames to work... todo figure out why and make it stop.-->
<iframe style="display: none"></iframe>

<article id="main" class="module spwashi-entity spwashi-page active <?= $can_edit ? 'can-edit' : '' ?> <?= $is_debug ? 'debug' : '' ?> <?= $type ?>" data-ent_id="<?= $p_ent_id ?>" data-model='<?= $page ?>'>
	<input type="hidden" id="pge_id" value="<?= $page->id ?>"/>
	<header>
		<div class="icons button-control">
			<?php if (!$is_edit && $can_edit) : ?>
				<a href="<?= $urls['edit']; ?>"><i class="button edit-external fa fa-external-link-square"></i></a>
			<?php else : ?>
				<a href="<?= $urls['view']; ?>"><i class="button view fa fa-eye"></i></a>
			<?php endif ?>
			<?php if ($can_edit) : ?>
				<i class="button edit fa fa-pencil"></i>
			<?php endif; ?>
			<i class="button close delete fa fa-remove"></i>
			<i class="button add fa fa-plus"></i>
			<i class="button handle fa fa-arrows"></i>
			<i class="debug button fa fa-question"></i>
		</div>
		<div class="title-wrapper">
			<h1 class="title">{{title}}</h1>
			<h2 class="subtitle">{{subtitle}}</h2>
		</div>
		<div id="dimension-container" class="dimension-container no-selection entity-container">
			<ul class="lst">
				<?php foreach ($page->maps->dimensions->get_items(true) as $dimension): ?>
					<?php
					/** @var Spwashi\Model\Dimension $dimension */
					if (!($dimension instanceof \Spwashi\Model\Dimension) || ($dimension->title == '' || $dimension->ent_id == '')) continue;

					$is_active     = ($current_dimension && ($dimension->ent_id == $current_dimension->ent_id));
					$dim_title     = XSS::escape($dimension->title);
					$dim_ent_id    = $dimension->ent_id;
					$dim_id        = intval($dimension->id);
					$dim_dimension = XSS::escape(json_encode($dimension, JSON_HEX_APOS));
					?>
					<li class="lst-tab spwashi-dimension spwashi-entity <?= $is_active ? ' active highlight' : null ?>"
					    data-id="<?= $dim_id ?>"
					    data-ent_id="<?= $dim_ent_id ?>"
					    data-model='<?= $dim_dimension ?>'>
						<a href="?c=<?= $dim_id ?>"><?= $dim_title ?></a>
					</li>
				<?php endforeach; ?>
			</ul>
		</div>
	</header>
	<?php if ($is_edit || false/*strlen(trim($p_description))*/): ?>
		<section class="heading-section clearfix <?= $type ?>">
			<?php if ($is_edit) : ?>
				<form class="aligned" method="post" action="" autocomplete="off" id="frm-page_edit">
					<input id="frm-pe-n" name="frm-pe-n" type="hidden" value="<?= $nonce ?>"/>

					<div class="control-group">
						<label for="title">Page Title:</label>

						<input type="text" id="title" name="title" placeholder="Page Title" value="<?= $p_title ?>"
						       maxlength="<?= PageValidator::MAX_TITLE_LENGTH ?>"/>
						<span class="error" id="title-error">{{message_title}}</span>
					</div>
					<div class="control-group">
						<label for="subtitle">Subtitle:</label>

						<input type="text" id="subtitle" name="subtitle" placeholder="Page Subtitle"
						       value="<?= $p_subtitle ?>" maxlength="<?= PageValidator::MAX_TITLE_LENGTH ?>"/>
						<span class="error" id="subtitle-error">{{message_subtitle}}</span>
					</div>
					<div class="control-group">
						<label for="description">Description:</label>

                        <textarea name="description" id="description" cols="30" rows="10" placeholder="Description"
                                  maxlength="<?= PageValidator::MAX_DESCRIPTION_LENGTH ?>"><?= $p_description ?></textarea>
						<span class="error" id="description-error">{{message_description}}</span>
					</div>
					<div class="control-group">
						<label for="f-edit_page-save" class="invisible">Submit</label>
						<input id="ent_id" name="ent_id" type="hidden" value="<?= $p_ent_id ?>"/>
						<button id="f-edit_page-save" type="submit">Save</button>
					</div>
				</form>
				<button class="add-section-button"><i class="fa fa-plus-circle"></i>Section</button>
			<?php else: ?>
				<div class="content"><?= $p_description ?></div>
			<?php endif ?>
		</section>
	<?php endif ?>
	<div class="content">
		<div class="relationship-container section-container entity-container spwashi-entity" data-relationship_index="sections" data-ent_id="<?= $current_dimension ? $current_dimension->ent_id : null ?>" data-id="<?= $current_dimension ? $current_dimension->id : null ?>">
			<?= $section_string ?>
		</div>
	</div>
</article>
<script id="spwashi_config" type="application/json"><?= json_encode(ModelMeta::dump()) ?></script>
<script id="section_models" type="application/json"><?= $sections ?? "" ?></script>
<?php if ($is_debug): ?>
	<?php switch ($debug_level):
		case Controller::DEBUG_LEVEL_1:
			?>
			<script type="text/javascript" src="<?= Toute::generate_url('js', ['chi/optimization/o_chi_d.js']) ?>"></script>
			<script type="text/javascript">
				require(['require', 'http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML-full'], function (require) {
					MathJax.Hub.Config({tex2jax: {inlineMath: [["$", "$"]]}});
					Sm.loaded.add('Vendor_MathJax');
				});
			</script>
			<?php break; ?>
		<?php case Controller::DEBUG:
		default:
			?>
			<script type="text/javascript">
				require(['<?= App::_()->base_url ?>resource/js/chi/require_config.js'], function () {
					require(['Promise', 'jquery', 'Sm'], function (P, $) {
						if (!Promise) {P.polyfill();}
//						require(['require', 'Sm-Entities-Section-main'], function (require) {});
//						require(['require', 'Sm-Entities-Collection-main'], function (require) {});
//						require(['require', 'Sm-Entities-Dictionary-main'], function (require) {});
//						require(['require', 'Sm-Entities-Dimension-main'], function (require) {});
//						require(['require', 'Sm-Entities-Page-main'], function (require) {});
//						require(['require', 'Sm-Entities-Concept-main'], function (require) {});
						require(['require', 'select2'], function (require) {});
						require(['require', 'inflection'], function (require) {});
						require(['require', 'http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML-full'], function (require) {
							MathJax.Hub.Config({tex2jax: {inlineMath: [["$", "$"]]}});
							Sm.loaded.add('Vendor_MathJax');
						});
					});
				});
			</script>
			<?php break; ?>
		<?php endswitch; ?>
	<!--    <script src="--><? //= Toute::generate_url('js', ['beta/bStdPage.js']) ?><!--"></script>-->
<?php else: ?>
	<script type="text/javascript" src="<?= Toute::generate_url('js', ['chi/optimization/o_chi.js']) ?>"></script>
	<script type="text/javascript">
		require(['require', 'http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML-full'], function (require) {
			MathJax.Hub.Config({tex2jax: {inlineMath: [["$", "$"]]}});
			Sm.loaded.add('Vendor_MathJax');
		});
	</script>
<?php endif; ?>

