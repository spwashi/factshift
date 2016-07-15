<?php
/**
 * User: Sam Washington
 * Date: 11/8/15
 * Time: 7:15 PM
 */
use Sm\Security\XSS;
use Spwashi\Model\Concept;
use Spwashi\Model\Dictionary;

/** @var Dictionary[] $dictionaries */
/** @var Concept[] $concepts */
/** @var string $section_tree */
$is_edit  = isset($is_edit) ? $is_edit : false;
$is_debug = isset($is_debug) ? $is_debug : false;
?>
    <section class="module">
        <header>
            <h2 class="title">About the page</h2>
        </header>
        <div class="content">
            <div>
                <label for="drag_n_drop">Drag and Drop Sections?</label>
                <input type="checkbox" name="drag_n_drop" id="drag_n_drop">
            </div>
            <div class="section navigation-tree">
                <?= isset($section_tree) ? $section_tree : '' ?>
            </div>
        </div>
    </section>
    <section class="module">
        <header>
            <h2 class="title">Dictionaries </h2>
            <?php if ($is_edit) : ?><i class="fa fa-plus-circle add-dictionary"></i><? endif; ?>
        </header>
        <div class="content">
            <ul class="lst dictionary-container entity-container no-selection">
                <?php foreach ($dictionaries as $index => $dictionary): ?>
                    <?php
                    if ($dictionary && $dictionary->title == '' || $dictionary->ent_id == '') continue;

                    $d_title      = XSS::escape($dictionary->title);
                    $d_ent_id     = $dictionary->ent_id;
                    $d_id         = intval($dictionary->id);
                    $d_u_id       = intval($dictionary->user_id);
                    $d_dictionary = XSS::escape(json_encode($dictionary, JSON_HEX_APOS));
                    ?>
                    <li class="lst-tag spwashi-entity spwashi-dictionary"
                        data-id="<?= $d_id ?>"
                        data-user_id="<?= $d_u_id ?>"
                        data-ent_id="<?= $d_ent_id ?>"
                        data-model='<?= $d_dictionary ?>'>
                        <?php if (!$is_edit) : ?><input id="Dictionary-<?= $d_id ?>"  type="checkbox" title="Activate Dictionary <?= $d_title ?>"> <?php endif; ?>
                        <i class="fa fa-book"></i>
                        <?= $d_title ?>
                    </li>
                <?php endforeach; ?>
            </ul>
            <div class="description-container"></div>
        </div>
    </section>
    <section class="module">
        <header>
            <h2 class="title">Concepts </h2>
            <?php if ($is_edit) : ?><i class="fa fa-plus-circle add-concept"></i><? endif; ?>
        </header>
        <div class="content">
            <ul class="lst concept-container entity-container no-selection">
                <?php foreach ($concepts as $index => $concept): ?>
                    <?php
                    if ($concept && $concept->title == '' || $concept->ent_id == '') continue;

                    $c_title   = XSS::escape($concept->title);
                    $c_ent_id  = $concept->ent_id;
                    $c_id      = intval($concept->id);
                    $c_u_id    = intval($concept->user_id);
                    $c_concept = XSS::escape(json_encode($concept, JSON_HEX_APOS));
                    ?>
                    <li class="lst-tag spwashi-entity spwashi-concept"
                        data-id="<?= $c_id ?>"
                        data-user_id="<?= $c_u_id ?>"
                        data-ent_id="<?= $c_ent_id ?>"
                        data-model='<?= $c_concept ?>'>
                        <?= $c_title ?>
                    </li>
                <?php endforeach; ?>
            </ul>
            <div class="description-container"></div>
        </div>
    </section>

<?php if ($is_debug) : ?>
    <section class="module">
        <header>
            <h2 class="title">Debug</h2>
        </header>
        <div class="content">
            <div>
                <input type="text" id="debug_identifier" placeholder="r_id">
                <button id="debug_identifier_button">Search</button>
            </div>
            <ul id="debug_el"></ul>
        </div>
    </section>
<?php endif; ?>
