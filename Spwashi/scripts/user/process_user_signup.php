<?php
/**
 * User: sam
 * Date: 6/13/15
 * Time: 9:18 PM
 */

use Sm\Core\App;
use Sm\Router\Toute;
use Spwashi\Libs\Form\UserForm;
use Spwashi\Libs\Session\Session;
use Spwashi\Model\User;

$form = $_POST;
#-----
$nonce_name                = 'frm-su-n';
$form_name                 = 'frm-user_signup';
$success_redirect_location = App::_()->base_url;
#-----------------------------------------------------------------------------------
$expected_array_values = [
    'first_name',
    'last_name',
    'alias',
    'email',
    'password',
    'password_verify',
    $nonce_name
];
#---------------------------------------------
$F = UserForm::init($expected_array_values, $form);
if (!$F->check_nonce($nonce_name, $F->get_nonce($form_name))) {
    return [
        'success' => false,
        'message' => $F->getError()
    ];
}
$user          = User::init();
$return_values = $F->apply_form_to_model($user, ['password_verify', $nonce_name], false);
if ($return_values !== true) {
    return $return_values;
}
$form['password'] = trim($form['password']);
#===============================================================================================================
$user->set([
               'first_name' => $form['first_name'],
               'last_name'  => $form['last_name'],
               'alias'      => $form['alias'],
               'email'      => $form['email'],
               'user_type'  => Spwashi\Model\Type\UserType::TYPE_ALL_POWERFUL,
               'ent_id'     => Spwashi\Model\User::generate_ent_id(),
               'password'   => Spwashi\Model\User::hash_password($form['password']),
           ]);
if ($user->create()) {
    Session::set('user', $user);
    $user->create_folder_structure();
    Sm\Response\Http::redirect(Toute::generate_url('spwashi_user_home'));
};
return [
    'success' => false,
    'message' => 'Unexpected error'
];