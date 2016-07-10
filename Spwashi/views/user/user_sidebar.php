<?php
/**
 * User: Sam Washington
 * Date: 12/5/15
 * Time: 5:28 PM
 */

use Sm\Security\XSS;
use Spwashi\Model\Collection;

/** @var Collection[] $collections */
$collections = isset($collections) ? $collections : [];
?>
<section class="module">
    <header>
        <h2 class="title">My Collections </h2>
        <i class="fa fa-plus-circle add-collection"></i>
    </header>
    <div class="content">
        <ul id="collection-container" class="lst collection-container spwashi-entity entity-container no-selection">
            <?php foreach ($collections as $index => $collection): ?>
                <?php
                if ($collection && $collection->title == '' || $collection->ent_id == '') continue;

                $c_title      = XSS::escape($collection->title);
                $c_ent_id       = $collection->ent_id;
                $c_id         = intval($collection->id);
                $c_collection = XSS::escape(json_encode($collection, JSON_HEX_APOS));
                ?>
                <li class="lst-tag spwashi-entity spwashi-collection "
                    data-id="<?= $c_id ?>"
                    data-ent_id="<?= $c_ent_id ?>"
                    data-model='<?= $c_collection ?>'
                    id="Collection-<?= $c_id ?>">
                    <?= $c_title ?>
                </li>
            <?php endforeach; ?>
        </ul>
        <div class="description-container"></div>
    </div>
</section>
