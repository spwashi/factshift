<?php
/**
 * User: sam
 * Date: 6/20/15
 * Time: 8:29 PM
 */
use Factshift\Core\Factshift;
use Factshift\Entity\Model\PageModel;
use Factshift\Entity\Page;
use Sm\Entity\EntityIterator;
use Sm\Entity\Model\EntityMeta;
use Sm\Entity\Model\ModelNotFoundException;

$page_models  = [ ];
$user_id      = null;
$PageIterator = new EntityIterator;
if ($user = Factshift::_()->IoC->session->getUser()) {
    try {
        $user_id     = $user->id;
        $page_models = PageModel::findAll([ 'user_id' => $user_id ], Factshift::_()->IoC->EntityMeta->get_entity_type_properties('Page', EntityMeta::FIND_API_GETTABLE));
        foreach ($page_models as $page) {
            $PageEntity = Page::initFromModel($page);
            $PageIterator->push($PageEntity);
        }
    } catch (ModelNotFoundException $e) {
    }
//    return 1;
}
?>
<?php if (!empty($page_models)): ?>
    <article id="" class="module">
        <header>
            <h1 class="title">
                My Pages
            </h1>
        </header>
        <section class="content">
            <ul>
                <?php
                foreach ($PageIterator as $index => $item) :?>
                    <li title="<?= htmlentities($item->description) ?>">
                        <?php $url = 'page_view' ?>
                        <a data-ent_id="<?= $item->ent_id ?>" href="<?= Factshift::_()->IoC->router->generate_url($url, [ $item->context, $item->alias ]) ?>">
                            <?= htmlentities($item->title) ?> - <em><?= htmlentities($item->subtitle) ?></em>
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
            <li><a href="<?= Factshift::_()->IoC->router->generate_url('page_create') ?>">Create a page</a></li>
        </ul>
    </section>
</article>