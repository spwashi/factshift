<?php
/**
 * User: Sam Washington
 * Date: 4/4/2015
 * Time: 1:56 PM
 */

return [
    'home' => [ 'pattern' => '', 'callback' => 'HomeController@index', ],
    
    'user_home' => [ 'pattern' => 'user$', 'callback' => 'User\UserController@home', ],
    'login'     => [ 'pattern' => 'user/login', 'callback' => 'User\UserController@login', ],
    'logout'    => [ 'pattern' => 'user/logout', 'callback' => 'User\UserController@logout', ],
    'signup'    => [ 'pattern' => 'user/signup', 'callback' => 'User\UserController@signup', ],
    
    'page_view'     => [ 'pattern' => 'p/{universe}:[a-zA-Z\d_-]+/{alias}:[a-zA-Z\d-]+', 'callback' => 'Page\PageController@view', ],
    'page_view_ent' => [ 'pattern' => 'p/{ent_id}:[a-zA-Z\d_-]+', 'callback' => 'Page\PageController@view', ],
    'page_home'     => [ 'pattern' => 'p$', 'callback' => 'Page\PageController@index', ],
    'page_create'   => [ 'pattern' => 'p/create', 'callback' => 'Page\PageController@create', ],
    
    'api' => [ 'pattern' => 'api/', 'callback' => 'Sm\Controller\API\API@route', ],
    
    
    'css'  => [ 'pattern' => 'resource/css/{file}', 'callback' => 'File\Resource@css', ],
    'img'  => [ 'pattern' => 'resource/img/{file}', 'callback' => 'File\Resource@img', ],
    'font' => [ 'pattern' => 'resource/font/{file}', 'callback' => 'File\Resource@font', ],
    'js'   => [ 'pattern' => 'resource/js/{file}', 'callback' => 'File\Resource@js', ],
    
    [ 'pattern' => 'user/{method}', 'callback' => 'User\UserController@*', ],
    
    #---FOR THE SAKE OF DEPLOYMENT SCRIPTS------------------------------------------------#
    [ 'pattern' => 'dev/{method}', 'callback' => 'Dev@*', ],
    [ 'pattern' => 'test/{method}', 'callback' => 'test@*', ],
    
    #---FOR TESTING PURPOSES ONLY---------------------------------------------------------#
    [ 'pattern' => 'example/text', 'callback' => 'HomeController@example', ],
    [ 'pattern' => 'example/text2', 'callback' => 'HomeController@example_2', ],
];