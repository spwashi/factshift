<?php
/**
 * User: Sam Washington
 * Date: 11/30/16
 * Time: 8:09 PM
 */

use Factshift\Core\Factshift;
use Factshift\Entity\Dimension;
use Factshift\Entity\Page;
use Factshift\Entity\Validation\PageValidator;
use Factshift\User\AppUser;
use Sm\Entity\Model\EntityMeta;
use Sm\Response\Http;
use Sm\Security\XSS;

/** @var AppUser $User */
$User = Factshift::_()->IoC->session->getUser();
/** @var Page $Page */
if (!isset($Page) || !($Page instanceof Page)) Http::redirect(Factshift::_()->IoC->router->generate_url('404'));
$p_description = XSS::escape($Page->description);
$p_title       = XSS::escape($Page->title);
$p_subtitle    = XSS::escape($Page->subtitle);
$p_ent_id      = $Page->ent_id;
$p_id          = intval($Page->id);
$u_id          = intval($User->id);

$can_edit         = $can_edit ?? false;
$CurrentDimension = $CurrentDimension ?? null;
$type             = $type ?? 'view';
$section_string   = $section_string ?? '';
$sections         = $sections ?? [ ];


$is_edit = ($type == 'edit');

$is_debug    = isset($is_debug) ? $is_debug : false;
$debug_level = isset($debug_level) ? $debug_level : 0;
$nonce       = Factshift::_()->IoC->session->generate_nonce('frm-page_edit');

$sections     = isset($sections) ? $sections : "";
$urls         = [ ];
$urls['edit'] = Factshift::_()->IoC->router->generate_url('page_view', [ $Page->context, $Page->alias, 'edit' ], $is_debug ? '?debug' : '');

$urls['view'] = Factshift::_()->IoC->router->generate_url('page_view', [ $Page->context, $Page->alias ], $is_debug ? '?debug' : '');
?>

<input type="hidden" id="usr_id" value="<?= $User->id ?>" />
<input type="hidden" id="d_l" value="<?= $is_debug ? $debug_level : false; ?>" />
<input type="hidden" id="i_e" value="<?= $is_edit ?>" />
<article id="main" class="module factshift-entity factshift-page active <?= $can_edit ? 'can-edit' : '' ?> <?= $is_debug ? 'debug' : '' ?> <?= $type ?>"
         data-ent_id="<?= $p_ent_id ?>"
         data-entity_type="<?= $Page->getEntityType() ?>"
         data-id="<?= $p_id ?>"
         data-model='<?= XSS::escape(json_encode($Page, JSON_HEX_APOS)) ?>'>
    <input type="hidden" id="pge_id" value="<?= $Page->id ?>" />
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
            <i class="button close destroy fa fa-remove"></i>
            <i class="button add fa fa-plus"></i>
            <i class="button handle fa fa-arrows"></i>
            <i class="debug button fa fa-question"></i>
        </div>
        <div class="title-wrapper">
            <h1 class="title">{{title}}</h1>
            <h2 class="subtitle">{{subtitle}}</h2>
        </div>
        <ul class="dimensions-container no-selection entity-container relationship_index lst">
            <?php foreach ($Page->relationships->dimensions->getItems('dimension') as $Dimension): ?>
                <?php
                /**@var Dimension $Dimension */
                if (!($Dimension instanceof Dimension) || ($Dimension->title == '' || $Dimension->ent_id == '')) continue;
                
                $is_active     = ($CurrentDimension && ($Dimension->ent_id == $CurrentDimension->ent_id));
                $dim_title     = XSS::escape($Dimension->title);
                $dim_ent_id    = $Dimension->ent_id;
                $dim_id        = intval($Dimension->id);
                $dim_dimension = XSS::escape(json_encode($Dimension, JSON_HEX_APOS));
                ?>
                <li class="lst-tab tab factshift-dimension factshift-entity factshift-dimension <?= $is_active ? ' active highlight' : null ?>"
                    data-id="<?= $dim_id ?>"
                    data-entity_type="<?= $Dimension->getEntityType() ?>"
                    data-ent_id="<?= $dim_ent_id ?>"
                    data-model='<?= $dim_dimension ?>'>
                    <a href="?c=<?= $dim_id ?>" class="title"><?= $dim_title ?></a>
                </li>
            <?php endforeach; ?>
        </ul>
    </header>
    
    <section class="heading-section clearfix <?= $type ?>"
             data-id="<?= $p_id ?>"
             data-entity_type="<?= $Page->getEntityType() ?>"
             data-ent_id="<?= $p_ent_id ?>">
        <?php if ($is_edit) : ?>
            <form class="aligned" method="post" action="" autocomplete="off" id="frm-page_edit">
                <input id="frm-pe-n" name="frm-pe-n" type="hidden" value="<?= $nonce ?>" />
                
                <div class="control_group">
                    <label for="title">Page Title:</label>
                    
                    <input type="text" id="title" name="title" placeholder="Page Title" value="<?= $p_title ?>"
                           maxlength="<?= PageValidator::MAX_TITLE_LENGTH ?>" />
                    <span class="error" id="title-error">{{message_title}}</span>
                </div>
                <div class="control_group">
                    <label for="subtitle">Subtitle:</label>
                    
                    <input type="text" id="subtitle" name="subtitle" placeholder="Page Subtitle"
                           value="<?= $p_subtitle ?>" maxlength="<?= PageValidator::MAX_TITLE_LENGTH ?>" />
                    <span class="error" id="subtitle-error">{{message_subtitle}}</span>
                </div>
                <div class="control_group">
                    <label for="description">Description:</label>
                    
                    <textarea name="description" id="description" cols="30" rows="10" placeholder="Description"
                              maxlength="<?= PageValidator::MAX_DESCRIPTION_LENGTH ?>"><?= $p_description ?></textarea>
                    <span class="error" id="description-error">{{message_description}}</span>
                </div>
                <div class="control_group">
                    <label for="f-edit_page-save" class="invisible">Submit</label>
                    <input id="ent_id" name="ent_id" type="hidden" value="<?= $p_ent_id ?>" />
                    <button id="f-edit_page-save" type="submit">Save</button>
                </div>
            </form>
            <button class="add-section-button"><i class="fa fa-plus-circle"></i>Section</button>
        <?php else: ?>
            <div class="description" data-attribute="description"><?= $p_description ?></div>
        <?php endif ?>
    </section>
    <div class="content">
        <div class="relationship_index sections-container entity-container" data-relationship_index="sections" data-ent_id="<?= $CurrentDimension ? $CurrentDimension->ent_id : null ?>" data-id="<?= $CurrentDimension ? $CurrentDimension->id : null ?>">
            <?= $section_string ?>
        </div>
    </div>
</article>

<script id="factshift_config" type="application/json"><?= json_encode(EntityMeta::dump()) ?></script>
<script id="section_models" type="application/json"><?= $sections ?? "" ?></script>
<script id="dimension_models" type="application/json"><?= json_encode($Page->relationships->dimensions->getItems('dimension')) ?></script>
<script id="user_models" type="application/json"><?= $User ?? "" ?></script>

<script type="text/javascript">
    require(['<?= Factshift::_()->base_url ?>resource/js/alpha/require_config.js'], function () {
        require(['Promise', 'jquery', 'Sm', 'Sm-init'], function (P, $, Sm, init) {
            if (!Promise) {P.polyfill();}
            init();
            require(['require', 'select2'], function (require) {});
            require(['require', 'inflection'], function (require) {});
            require(['require', 'http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML-full'], function (require) {
                MathJax.Hub.Config({tex2jax: {inlineMath: [["$", "$"]]}});
                Sm.Core.dependencies.add('Vendor_MathJax');
            });
        });
    });
</script>