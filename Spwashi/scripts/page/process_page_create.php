<?php
/**
 * User: sam
 * Date: 6/16/15
 * Time: 9:57 PM
 *
 * This is to be a handler to process the 'create' form. This checks to see if the nonce that is received matches the nonce that has been decided upon for this page.
 * So far, all that is implemented is the
 *
 * *Page title
 * *Page Subtitle
 * *Page Description
 * *~Page Alias (Only partially-- users cannot submit their own aliases. They are automatically generated.)
 *
 * CM:IMPLEMENT
 * *Alias
 * *Namespace
 * *ParentID
 * *SectionParentID
 * *MainCategory
 *
 */
use Sm\Response\Http;
use Spwashi\Libs\Form\PageForm;
use Spwashi\Libs\Session\Session;
use Spwashi\Model\Page;

if (!($user = Session::get_user())) {
    return [
        'success' => false,
        'message' => 'Must log in to continue'
    ];
}
#-----------------------------------------------------------------------------------
$form                  = $_POST;
$nonce_name            = 'frm-cp-n';
$form_name             = 'frm-page_create';
$expected_array_values = [
    'title',
    'subtitle',
    'f-generate_alias',
    'alias',
    'ent_id',
    'description',
    'context',
    'main_category',
    $nonce_name
];
#-----------------------------------------------------------------------------------
$F = PageForm::init($expected_array_values, $form);
if (!$F->check_nonce($nonce_name, $F->get_nonce($form_name)))
    return [
        'success' => false,
        'message' => $F->getError()
    ];
#===================================================================================
$page           = Page::init();
$form['alias']  = (boolean)$form['f-generate_alias'] ? Page::generate_alias($form['title'], $form['subtitle']) : strtolower($form['alias']);
$process_result = $F->apply_form_to_model($page, ['context', 'ent_id'], true);
if ($process_result !== true)
    return $process_result;
#-----------------------------------------------------------------------------------
$page->title    = $form['title'];
$page->subtitle = $form['subtitle'];
$page->alias    = $form['alias'];
$page->context  = $user->alias;
$page->ent_id     = Page::generate_ent_id();
$page->user_id  = $user->id;
#-----------------------------------------------------------------------------------
if ($page->create()) {
    $page->createStandardDimensions();
    $success_redirect_location = \Sm\Router\Toute::generate_url('spwashi_page_edit', [$page->context, $page->alias]);
    Http::redirect($success_redirect_location);
    return [
        'success' => 'true',
        'alias'   => $page->alias
    ];
}
return [
    'success' => false,
    'message' => 'Unexpected error'
];