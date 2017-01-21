<?php
/**
 * User: sam
 * Date: 6/13/15
 * Time: 6:28 PM
 */
use Factshift\Core\Factshift;

?>
<article id="main" class="module">
    <header>
        <h1 class="title">
            {{title}}
        </h1>
        
        <h2 class="subtitle"> {{subtitle}} </h2>
    </header>
    <section class="content">
        <table>
            <tr>
                <td>Clear log file:</td>
                <td>
                    <button id="clear-log" class="dev clear log">Clear</button>
                </td>
                <td id="success"></td>
            </tr>
        </table>
    </section>
</article>
<script type="text/javascript">
    require(['<?= Factshift::_()->base_url ?>resource/js/alpha/require_config.js'], function () {
        require(['Promise', 'jquery', 'Sm', 'Sm-init'], function (P, $, Sm, init) {
            if (!Promise) {P.polyfill();}
            init();
            $('#clear-log').on('click', function () {
                var $el = $(this);
                $.get(window.location + 'cl', function (res) {
                    Sm.CONFIG.DEBUG && console.log(res);
                    var child = $el.closest('tr').children('#success');
                    Sm.CONFIG.DEBUG && console.log(child);
                    res && (res === true) ? child.html('<i class="fa fa-check" aria-hidden="true"></i>') : '';
                })
            });
            require(['require', 'select2'], function (require) {});
            require(['require', 'inflection'], function (require) {});
        });
    });
</script>