<?php
/**
 * User: Sam Washington
 * Date: 4/4/2015
 * Time: 1:56 PM
 */

return [
    'home' => [ 'pattern' => '', 'callback' => 'HomeController@index', ],
    [ 'pattern' => '{method}:[a-zA-Z\d]+', 'callback' => 'HomeController@*', ],
];