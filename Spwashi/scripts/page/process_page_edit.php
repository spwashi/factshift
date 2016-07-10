<?php
/**
 * User: sam
 * Date: 6/16/15
 * Time: 9:57 PM
 *
 * Process the submissions of the Page Edit form(s)
 * I have not fully thought through the editing of a page alias. It should work fine, but there is still some work to be done
 */

use Sm\Model\ModelNotFoundException;
use Spwashi\Libs\Form\PageForm;
use Spwashi\Libs\Session\Session;
use Spwashi\Model\Page;

#-----
//<editor-fold desc="//-Standard Form Information and Processing">
$form                  = $_POST;
$nonce_name            = 'frm-pe-n';
$form_name             = 'frm-page_edit';
$expected_array_values = [
    'title',
    'subtitle',
    'alias',
    'ent_id',
    'description',
    'context',
    'main_category',
    $nonce_name
];
//</editor-fold>
#-----
if (!($user = Session::get_user())) {
    return [
        'success' => false,
        'message' => 'Must log in to continue'
    ];
}
#-----

#try to find the page we are editing
#If we can't find the page we want to edit, something is wrong. Undefined error, maybe log it
try {
    $oldPage = Page::find(['ent_id' => $form['ent_id']]);
} catch (ModelNotFoundException $e) {
    return [
        'success' => false,
        'message' => 'Undefined error'
    ];
}

#Assert that the user can edit the page (if they have the write permission in relation to it)
//$user_permissions = $oldPage->get_user_permissions($user);
//if (!in_array('write', $user_permissions)) return [
//    'success' => false,
//    'message' => 'Sorry, user not authorized to edit this resource'
//];

#-------------------------------------------------------------------------------------
$F = PageForm::init($expected_array_values, $form);
if (!$F->check_nonce($nonce_name, $F->get_nonce($form_name))) {
    return [
        'success' => false,
        'message' => $F->getError()
    ];
}

$result = $F->apply_form_to_model($oldPage, [], false);
if ($result !== true) {
    return $result;
}
//$alias         = $oldPage->generate_alias($oldPage->title, $oldPage->subtitle);
//$alias_changed = false;
//if ($alias != $oldPage->alias) {
//    $oldPage->alias = $alias;
//    $alias_changed  = true;
//};

if ($oldPage->save()) {
    return [
        'success' => true,
        'page'    => $oldPage
    ];
} else {
    return [
        'success' => false,
        'message' => 'Unexpected error'
    ];
}