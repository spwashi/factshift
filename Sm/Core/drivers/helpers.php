<?php
/**
 * User: Sam Washington
 * Date: 4/2/2015
 * Time: 12:20 AM
 */


return [
    [
        \Sm\Helper\Helper::PRE_PROCESS,
        function () { },
    ],
    [
        \Sm\Helper\Helper::PRE_OUTPUT,
        function (&$content = null) { /* This is where you would mutate the $content variable */ },
    ],
];