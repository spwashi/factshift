<?php
/**
 * User: Sam Washington
 * Date: 12/8/16
 * Time: 11:48 PM
 */

use Factshift\Entity\Model\SectionModel;
use Factshift\Entity\Section;
use Sm\Security\XSS;
use Sm\View\View;

/** @var Section $Section */
$s_section          = XSS::escape(json_encode($Section, JSON_HEX_APOS));
$s_title            = XSS::escape($Section->title ?: '---');
$s_has_title        = intval($Section->has_title);
$s_subtitle         = XSS::escape($Section->subtitle ?: '---');
$s_ent_id           = $Section->ent_id;
$s_type             = $Section->section_type;
$s_id               = intval($Section->id);
$s_content          = XSS::escape($Section->content ? $Section->content : ($Section->has_title && $Section->title ? ' ' : ' -- '));
$s_content_location = XSS::escape($Section->content_location);
?>
<section id="Section-<?= $s_id ?>" class="active factshift-section factshift-entity type-<?= '' ?> <?= !$s_has_title ? 'no-title' : '' ?>"
         data-id="<?= $s_id ?>"
         data-ent_id="<?= $s_ent_id ?>"
         data-entity_type="<?= $Section->getEntityType() ?>"
         data-model='<?= $s_section ?>'
         data-title='<?= $s_title || $s_subtitle ?>'>
    <?= View::create('templates/entities/button_control.php') ?>
    <div class="focus upper">
        <div class="pan left ">
            <i class="fa left fa-caret-left"></i>
        </div>
        <div class="pan right">
            <i class="fa right fa-caret-right"></i>
        </div>
    </div>
    <header>
        <div class="dev id" data-attribute="id"><?= $s_id ?></div>
        <h3 class="title" data-attribute="title"><?= $s_title ?></h3>
    </header>
    <?php switch ($s_type) {
        case SectionModel::TYPE_VIDEO : ?>
            <div class="content-container">
                <iframe width="560" height="315" src="<?= $s_content_location ?>" frameborder="0" allowfullscreen></iframe>
                <div data-attribute="content" class="content">
                    <?= $s_content ?>
                </div>
            </div>
            
            <?php break;
        default :
        case SectionModel::TYPE_AUDIO :
        case SectionModel::TYPE_STANDARD : ?>
            <div class="content" data-attribute="content"><?= $s_content ?></div>
            <?php break;
        case SectionModel::TYPE_IMAGE: ?>
            <div class="content-container entity-container">
                <img data-attribute="content_location" class="content-location" src="<?= $s_content_location ?>" alt="<?= $s_subtitle ?>" title="<?= $s_subtitle ?>">
                
                <div data-attribute="content" class="content"><?= $s_content ?></div>
            </div>
        <?php } ?>
    <div data-ent_id="<?= $s_ent_id ?>" data-relationship_index="composition" class="relationship-container composition-container entity-container">{{o_composition}}</div>
    <div data-ent_id="<?= $s_ent_id ?>" data-relationship_index="children" class="relationship-container children-container entity-container">{{o_children}}</div>
</section>