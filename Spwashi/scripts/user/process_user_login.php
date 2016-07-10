<?php
/**
 * User: sam
 * Date: 6/13/15
 * Time: 9:18 PM
 *
 * Handler for user login\
 * Note: This does not follow the standard login procedure because it only has two values to check, and those are rather specific to the module
 */

use Sm\Core\App;
use Sm\Form\Form;
use Sm\Router\Toute;
use Spwashi\Libs\Session\Session;
use Spwashi\Libs\Validator\UserValidator;
use Spwashi\Model\User;

#-----------------------------------------------------------------------------------
$form                      = $_POST;
$nonce_name                = 'frm-li-n';
$form_name                 = 'frm-user_login';
$success_redirect_location = App::_()->base_url;
#-----------------------------------------------------------------------------------
$expected_array_values = [
    'alias',
    'password',
    $nonce_name,
];
#---------------------------------------------
$F = Form::init($expected_array_values, $form);
if (!$F->manage_expected(true) || !$F->check_nonce($nonce_name, Form::get_nonce($form_name)))
    return [
        'success' => false,
        'error'   => $F->getError(),
    ];
#===================================================================================
#If the index that they've supplied is a valid email, search for email. Otherwise, search for an alias
$index = filter_var($form['alias'], FILTER_VALIDATE_EMAIL) ? 'email' : 'alias';
try {
    if (UserValidator::getPasswordValidity($form['password']) !== true) {
        throw new Exception('Username, Email, or Password not valid.');
    }
    $user = User::find([$index => $form['alias']]);
    if (!User::passwords_are_equal($form['password'], $user->password)) {
        throw new Exception('Username, Email, or Password not valid');
    }
} catch (Exception $e) {
    $return = [
        'success' => false,
        'message' => $e->getMessage(),
    ];
    return $return;
}
Session::set('user', $user);

$home_url = Toute::generate_url('spwashi_user_home');
$goto     = isset($_GET['goto']) ? $_GET['goto'] : $home_url;
$p        = parse_url($goto, PHP_URL_HOST);

if ($p !== App::_()->base_url) {
    $goto = $home_url;
}

Sm\Response\Http::redirect($goto);