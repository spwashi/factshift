<?php
/**
 * User: sam
 * Date: 6/13/15
 * Time: 9:18 PM
 */

use Sm\Core\App;
use Sm\Development\Log;
use Sm\Router\Toute;
use Spwashi\Libs\DataHandling\UserHandler;
use Spwashi\Libs\Form\UserForm;
use Spwashi\Libs\Session\Session;
use Spwashi\Model\User;

$form_values = $_POST;
#-----
$nonce_name                = 'frm-su-n';
$form_name                 = 'frm-user_signup';
$success_redirect_location = App::_()->base_url;
#-----------------------------------------------------------------------------------
$expected_array_values   = [
	'first_name', 'last_name', 'alias', 'email', 'password', 'password_verify', $nonce_name
];
$form_values['password'] = trim($form_values['password']);
#---------------------------------------------

$user = new User;
$G    = UserHandler::init($user, false, $expected_array_values);
$G->process($form_values, [$nonce_name]);
$G->set_model_properties();
if (!Session::check_nonce($form_name, $form_values[$nonce_name]))
	return ['success' => false, 'message' => 'Could not verify form source'];
$user->set([
	           'ent_id'    => Spwashi\Model\User::generate_ent_id(),
	           'password'  => Spwashi\Model\User::hash_password($form_values['password']),
	           'user_type' => Spwashi\Model\Type\UserType::TYPE_ALL_POWERFUL,
           ]);
Log::init([$G, $user])->log_it();
$F = UserForm::init($expected_array_values, $form_values);
if (!$G->can_continue()) {
	Log::init($G->get_error_array())->log_it();
	return [
		'success' => false,
		'message' => $G->get_error_array()
	];
}

#===============================================================================================================
if ($user->create()) {
	Session::set('user', $user);
	$user->create_folder_structure();
	$res = $user->create_universe();
	Log::init([$res, $user])->log_it();
	Sm\Response\Http::redirect(Toute::generate_url('spwashi_user_home'));
};
return [
	'success' => false,
	'message' => 'Unexpected error'
];