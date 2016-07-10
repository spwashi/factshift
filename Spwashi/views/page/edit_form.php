<?php
/**
 * User: sam
 * Date: 6/17/15
 * Time: 6:15 PM
 */
use Sm\Router\Toute;
use Sm\Security\XSS;
use Spwashi\Libs\Validator\PageValidator;
use Spwashi\Libs\View\SectionFactory;

\Spwashi\Libs\Session\Session::require_user_or_redirect($user);
/** @var $page  Spwashi\Model\Page */
if (!isset($page)) \Sm\Response\Http::redirect(\Sm\Router\Toute::generate_url('404'));
$p_description = XSS::escape($page->description);
$p_title = XSS::escape($page->title);
$p_subtitle = XSS::escape($page->subtitle);
$p_hash = $page->hash;
$p_id = intval($page->id);
$u_id = intval($user->id);

//<editor-fold desc="Variable initialization">
/** @var Spwashi\Model\Collection[] $collection_array */
$collection_array = isset($collection_array) ? $collection_array : [];
/** @var Spwashi\Model\Collection $current_collection */
$current_collection = isset($current_collection) ? $current_collection : null;
/** @var Spwashi\Model\Section[] $current_section_array */
$current_section_array = isset($current_section_array) ? $current_section_array : [];
$type = isset($type) ? $type : 'view';
$is_edit = $type == 'edit';
//</editor-fold>
$nonce = \Sm\Form\Form::generate_nonce('frm-page_edit');
?>
<script src="<?= Toute::generate_url('js', ['scripts/page.js']) ?>"></script>
<link rel="stylesheet" href="<?= Toute::generate_url('css', ['plugins/modal.css']) ?>">
<!--<script src="--><? //= Toute::generate_url('js', [ 'scripts/page.js' ]) ?><!--"></script>-->
<input type="hidden" id="usr_id" value="<?= $user->id ?>"/>
<input type="hidden" id="pge_id" value="<?= $page->id ?>"/>
<input type="hidden" id="cur_col_id" value="<?= !!$current_collection ? $current_collection->getId() : null ?>">
<article id="main" class="module <?= $type ?>" data-hash="<?= $p_hash ?>">
    <header>
        <h1 class="title"> {{title}} </h1>

        <h2 class="subtitle"> {{subtitle}} </h2>

        <div id="lst" class="no-selection lst">
            <ul class="container">
                <?php foreach ($collection_array as $index => $collection): ?>
                    <?php
                    //<editor-fold desc="Per-Collection Variable Sanitizing">
                    if ($collection->title == '') continue;
                    $is_main = !!($collection->hash == $current_collection->hash);
                    $c_title = XSS::escape($collection->title);
                    $c_hash = $collection->hash;
                    $c_id = intval($collection->getId());
                    $c_collection = XSS::escape(json_encode($collection, JSON_HEX_APOS));
                    //</editor-fold>
                    ?>
                    <li class="lst-tag <?= $is_main ? ' highlight' : null ?>" data-lst-id="<?= $c_id ?>"
                        data-hash="<?= $c_hash ?>" data-model='<?= $c_collection ?>'>
                        <a href="?c=<?= $c_id ?>"><?= $c_title ?></a>
                    </li>
                <?php endforeach; ?>
            </ul>
        </div>
    </header>
    <section class="content">
        <section class="heading-section <?= $type ?>">
            <?php if ($type == 'edit'): ?>
                <form class="aligned" method="post" action="" autocomplete="off" id="frm-page_edit">
                    <input id="frm-pe-n" name="frm-pe-n" type="hidden" value="<?= $nonce ?>"/>

                    <div class="control-group">
                        <label for="title">Page Title:</label>

                        <div class="input-error-cluster">
                            <input type="text" id="title" name="title" placeholder="Page Title" value="<?= $p_title ?>"
                                   maxlength="<?= PageValidator::MAX_TITLE_LENGTH ?>"/>
                            <span class="error" id="title-error">{{message_title}}</span>
                        </div>
                    </div>
                    <div class="control-group">
                        <label for="subtitle">Subtitle:</label>

                        <div class="input-error-cluster">
                            <input type="text" id="subtitle" name="subtitle" placeholder="Page Subtitle"
                                   value="<?= $p_subtitle ?>" maxlength="<?= PageValidator::MAX_TITLE_LENGTH ?>"/>
                            <span class="error" id="subtitle-error">{{message_subtitle}}</span>
                        </div>
                    </div>
                    <div class="control-group">
                        <label for="description">Description:</label>

                        <div class="input-error-cluster">
                            <textarea name="description" id="description" cols="30" rows="10" placeholder="Description"
                                      maxlength="<?= PageValidator::MAX_DESCRIPTION_LENGTH ?>"><?= $p_description ?></textarea>
                            <span class="error" id="description-error">{{message_description}}</span>
                        </div>
                    </div>
                    <div class="control-group">
                        <label for="f-edit_page-save" class="invisible">Submit</label>

                        <div class="input-error-cluster">
                            <input id="hash" name="hash" type="hidden" value="<?= $p_hash ?>"/>
                            <button id="f-edit_page-save" type="submit">Save</button>
                        </div>
                    </div>
                </form>
            <?php else: ?>
                <?= $p_description ?>
            <?php endif ?>
        </section>
        <!--<form action="/" class="filedrop_1" style="height: 100px; width: 100px; background: #eee;">
            <div class="fallback">
                <input name="file" type="file" multiple="multiple"/>
            </div>
        </form>-->
        <?php if ($type == 'edit'): ?>
            <button class="add-section-button">Add Section</button>
            <button class="add-collection-button">Add Collection</button>
        <?php endif; ?>
        <?php foreach ($current_section_array as $key => $model_section): ?>
            <?= SectionFactory::build($model_section, $is_edit)->getContent(); ?>
        <?php endforeach ?>
    </section>
</article>