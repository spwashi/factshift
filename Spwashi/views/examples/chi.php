<?php
/**
 * User: Sam Washington
 * Date: 12/17/15
 * Time: 6:31 AM
 */
use Sm\Core\App;

?>
<script>
    require([<?= App::_()->base_url ?>'/resource/js/chi/require_config.js'], function () {
        require(['Promise', 'jquery', 'Sm'], function (P, $) {
            var $body = $(document.body);
            if (!Promise) {P.polyfill();}
            require(['require', 'Sm-Entities-Collection-main'], function (require) {});
            require(['require', 'Sm/Section/main'], function (require) {});
            Sm.loaded.when_loaded('Section', function () {
                Sm.Entities.Section.Wrapper.hydrate({elements: $body.find('.spwashi-section')});
            });
        });
    });
</script>

<article id="main" class="module">
    <header>
        <h1 class="title">
            {{title}}
        </h1>

        <h2 class="subtitle"> {{subtitle}} </h2>
    </header>
    <section class="content">
        <section class="">
            <header>
                <h3>This is the title of the section</h3>
            </header>
        </section>
    </section>
</article>