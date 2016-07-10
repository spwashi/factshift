<?php
/**
 * User: sam
 * Date: 6/20/15
 * Time: 8:29 PM
 */
use Sm\Model\ModelNotFoundException;
use Sm\Router\Toute;
use Spwashi\Libs\Session\Session;
use Spwashi\Model\Page;

$test    = [];
$user_id = null;
if ($user = Session::get_user()) {
    try {
        $user_id = $user->id;
        $test    = Page::findAll(['user_id' => $user_id], ['user_id', 'ent_id', 'title', 'subtitle', 'description', 'context', 'alias']);
    } catch (ModelNotFoundException $e) {
    }
}
?>
<?php if (!empty($test)): ?>
    <article id="" class="module">
        <header>
            <h1 class="title">
                My Pages
            </h1>
        </header>
        <section class="content">
            <ul>
                <?php foreach ($test as $page): ?>

                    <li title="<?= htmlentities($page->description) ?>">
                        <?php $url = 'spwashi_page_view' ?>
                        <a data-ent_id="<?= $page->ent_id ?>" href="<?= Toute::generate_url($url, [$page->context, $page->alias]) ?>">
                            <?= htmlentities($page->title) ?> - <em><?= htmlentities($page->subtitle) ?></em>
                        </a>
                    </li>
                <?php endforeach; ?>
            </ul>
        </section>
    </article>
<?php endif; ?>

<article id="main" class="module">
    <header>
        <h1 class="title">
            {{title}}
        </h1>
    </header>
    <section class="content">
        <ul>
            <li><a href="<?= Toute::generate_url('spwashi_page_create') ?>">Create a page</a></li>
        </ul>
    </section>
</article>