<?php
/**
 * User: Sam Washington
 * Date: 4/4/2015
 * Time: 1:56 PM
 */

return [
	['pattern' => '/', 'callback' => 'HomeController@index', 'name' => 'spwashi_home'],

	['pattern' => 'user$', 'callback' => 'User\UserController@home', 'name' => 'spwashi_user_home'],
	['pattern' => 'user/login', 'callback' => 'User\UserController@login', 'name' => 'spwashi_login'],
	['pattern' => 'user/logout', 'callback' => 'User\UserController@logout', 'name' => 'spwashi_logout'],
	['pattern' => 'user/signup', 'callback' => 'User\UserController@signup', 'name' => 'spwashi_signup'],

	['pattern' => 'p/{context}:[a-zA-Z\d_-]+/{alias}:[a-zA-Z\d-]+', 'callback' => 'Page\PageController@view', 'name' => 'spwashi_page_view'],
	['pattern' => 'p/{ent_id}:[a-zA-Z\d_-]+', 'callback' => 'Page\PageController@view', 'name' => 'spwashi_page_view_ent'],
	['pattern' => 'p$', 'callback' => 'Page\PageController@index', 'name' => 'spwashi_page_home'],
	['pattern' => 'api/', 'callback' => 'API\API@route', 'name' => 'spwashi_api'],
	['pattern' => 'p/create', 'callback' => 'Page\PageController@create', 'name' => 'spwashi_page_create'],
	['pattern' => 't1', 'callback' => 'Page\PageController@test'],
	#
	#---USER RELATED ROUTES---------------------------------------------------------------#
	#
	['pattern' => 'e8hq2R83.html', 'callback' => 'HomeController@example'],
	['pattern' => 'user/{method}', 'callback' => 'User\UserController@*',],
	['pattern' => 'user/{method}', 'callback' => 'User\UserController@*',],
	#
	#---PAGE RELATED ROUTES---------------------------------------------------------------#
	#
	#---FOR THE SAKE OF DEPLOYMENT SCRIPTS------------------------------------------------#
	#
	['pattern' => 'deploy/{method}', 'callback' => 'deploy@*',],
	['pattern' => 'test/{method}', 'callback' => 'test@*',],
	#
	#---FOR TESTING PURPOSES ONLY---------------------------------------------------------#
	#
	['pattern' => 'example/text', 'callback' => 'HomeController@example',],
	['pattern' => 'example/text2', 'callback' => 'HomeController@example_2',],
	#
	#---TO BE USED FOR PUBLIC RESOURCES LIKE CSS, JAVASCRIPT, AND MAYBE IMAGE FILES-------#
	#
	['pattern' => 'resource/css/{file}', 'callback' => 'File\Resource@css', 'name' => 'css'],
	['pattern' => 'resource/img/{file}', 'callback' => 'File\Resource@img', 'name' => 'img'],
	['pattern' => 'resource/font/{file}', 'callback' => 'File\Resource@font', 'name' => 'img'],
	['pattern' => 'resource/js/{file}', 'callback' => 'File\Resource@js', 'name' => 'js'],
];