<?php
/**
 * User: sam
 * Date: 7/15/15
 * Time: 9:08 AM
 */
use Sm\View\View;
use Spwashi\Model\Section;
use Spwashi\Model\Type\SectionType;

/** @var Section $model_section */
/** @var  bool $is_edit */
/** @var string $s_ent_id */
/** @var int $s_has_title */
/** @var string $s_type */
/** @var int $s_id */
/** @var string $s_section */
/** @var string $s_title */
/** @var string $s_subtitle */
/** @var string $s_content_location */
/** @var string $s_content */
?>

<section id="Section-<?= $s_id ?>" class="active spwashi-section spwashi-entity type-<?= SectionType::get_name_from_type($s_type) ?> <?= !$s_has_title ? 'no-title' : '' ?>"
         data-id="<?= $s_id ?>"
         data-ent_id="<?= $s_ent_id ?>"
         data-model='<?= $s_section ?>'
         data-title='<?= $s_title || $s_subtitle ?>'

    >
    <?= View::create('templates/section/button_control.php', [ 'is_edit' => $is_edit ]) ?>
    <div class="focus upper">
        <div class="pan left ">
            <i class="fa left fa-caret-left"></i>
        </div>
        <div class="pan right">
            <i class="fa right fa-caret-right"></i>
        </div>
    </div>
    <header>
        <div class="dev id"><?= $s_id ?></div>
        <h3 class="title"><?= $s_title ?></h3>
    </header>
    <?php switch ($s_type) {
        case SectionType::TYPE_DEFINITION : ?>
            <ul data-ent_id="<?= $s_ent_id ?>" class="lst tag-container synonym-container entity-container"></ul>
            <div class="content"><?= $s_content ?></div>
            <?php break;
        case SectionType::TYPE_VIDEO : ?>
            <div class="content-container">
                <iframe width="560" height="315" src="<?= $s_content_location ?>" frameborder="0" allowfullscreen></iframe>
                <div class="content">
                    <?= $s_content ?>
                </div>
            </div>

            <?php break;
        default :
        case SectionType::TYPE_AUDIO :
        case SectionType::TYPE_MIRROR :
        case SectionType::TYPE_STANDARD : ?>
            <div class="content"><?= $s_content ?></div>
            <?php break;
        case SectionType::TYPE_IMAGE: ?>
            <div class="content-container entity-container">
                <img class="content-location" src="<?= $s_content_location ?>" alt="<?= $s_subtitle ?>" title="<?= $s_subtitle ?>">

                <div class="content"><?= $s_content ?></div>
            </div>
        <?php } ?>
    <div class="focus lower"></div>
    <div data-ent_id="<?= $s_ent_id ?>" data-relationship_index="composition" class="relationship-container composition-container entity-container">{{o_composition}}</div>
    <div data-ent_id="<?= $s_ent_id ?>" data-relationship_index="children" class="relationship-container children-container entity-container">{{o_children}}</div>
</section>

