<?php
/**
 * User: sam
 * Date: 6/13/15
 * Time: 6:28 PM
 */
use Factshift\Core\Factshift;

?>
<input type="hidden" id="d_l" value="1" />

<article id="main" class="module">
    <header>
        <h1 class="title">
            {{title}}
        </h1>
        
        <h2 class="subtitle"> {{subtitle}} </h2>
    </header>
    <section class="content">
        <ul>
            <li><a href="http://localhost/phpmyadmin/">PHPMyAdmin</a></li>
        </ul>
        <div class="dev dev-container">
            <header>Log File:</header>
            <button id="clear-log" class="dev clear log">Clear</button>
            <button id="toggle-log-display" data-action="display" class="dev display button">Display</button>
            <div class="success"></div>
            <div class="display-container"></div>
        </div>
        <div class="dev dev-container">
            <header>Model/Entity Creation:</header>
            <button id="toggle-table_create-display" data-action="display" class="dev display sql button">Display</button>
            <button class="save inactive">Save</button>
            <div class="display-container code sql"></div>
        </div>
    </section>
</article>

<script id="factshift_config" type="application/json"><?= json_encode(Factshift::_()->IoC->EntityMeta->dump()) ?></script>
<script type="text/javascript">
    require([
                '<?= Factshift::_()->IoC->router->generate_url('js-Sm-config')?>',
                '<?= Factshift::_()->IoC->router->generate_url('js-app-config') ?>'
            ], function () {
        require(['Sm-init'], function () {
            Sm.init({Section: ['SectionEntity'], Dimension: ['DimensionEntity'], Page: ['PageEntity']});
            require(['require', 'http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML-full'], function (require) {
                MathJax.Hub.Config({tex2jax: {inlineMath: [["$", "$"]]}});
                Sm.Core.dependencies.add('Vendor_MathJax');
            });
            
            var get_dev_container = function ($child) {
                return $child.closest('.dev-container');
            };
            
            $('#clear-log').on('click', function () {
                var $el = $(this);
                $.get(window.location + 'cl', function (res) {
                    var child = get_dev_container($el).children('.success');
                    res && (res === true) ? child.html('<i class="fa fa-check" aria-hidden="true"></i>') : '';
                })
            });
            $('#toggle-log-display').on('click', function () {
                var $el    = $(this);
                var action = $el[0].dataset.action = $el[0].dataset.action || 'display';
                var $dev_container     = get_dev_container($el);
                var $display_container = $dev_container.children('.display-container');
                switch (action) {
                    case 'display':
                        $.get(window.location + 'get_log/', function (res) {
                            $el[0].dataset.action = 'hide';
                            $el.text("Hide");
                            $display_container.html(res);
                        });
                        break;
                    case 'hide':
                        $el[0].dataset.action = 'display';
                        $el.text("Display");
                        $display_container.html('');
                        break;
                }
            });
            $('#toggle-table_create-display').on('click', function () {
                var $el    = $(this);
                var action = $el[0].dataset.action = $el[0].dataset.action || 'display';
                var $dev_container     = get_dev_container($el);
                var $save              = $dev_container.children('.save');
                var $display_container = $dev_container.children('.display-container');
                switch (action) {
                    case 'display':
                        $.get(window.location + 'me_sql_d/', function (res) {
                            $save.removeClass('inactive');
                            $el.text("Hide");
                            $el[0].dataset.action = 'hide';
                            $display_container.html(res);
                        });
                        break;
                    case 'hide':
                        $save.addClass('inactive');
                        $el[0].dataset.action = 'display';
                        $el.text("Display");
                        $display_container.html('');
                        break;
                }
            });
            require(['require', 'select2'], function (require) {});
            require(['require', 'inflection'], function (require) {});
        });
    });
</script>