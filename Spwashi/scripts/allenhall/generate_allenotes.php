<?php
/**
 * User: Sam Washington
 * Date: 9/8/16
 * Time: 2:48 PM
 */

use Sm\Core\App;
use Sm\Form\Form;

$form                      = $_POST;
$nonce_name                = 'frm-a-n';
$form_name                 = 'frm-allenotes';
$success_redirect_location = App::_()->base_url;

#-----------------------------------------------------------------------------------
$expected_array_values = [
	'weekly_allenotes',
	'regular_allenotes',
	$nonce_name,
];
#---------------------------------------------
$F = Form::init($expected_array_values, $form);
if (!$F->manage_expected(true) || !$F->check_nonce($nonce_name, Form::get_nonce($form_name)))
	return [
		'success' => false,
		'error'   => $F->getError(),
	];

$vals                      = $F->getFormValues();
$vals['weekly_allenotes']  = strlen($vals['weekly_allenotes']) ? $vals['weekly_allenotes'] : false;
$vals['regular_allenotes'] = strlen($vals['regular_allenotes']) ? $vals['regular_allenotes'] : false;

$allenotes        = $vals['weekly_allenotes'] ? fopen(__DIR__ . '/allenotes', 'w') : false;
$allenotes_weekly = $vals['regular_allenotes'] ? fopen(__DIR__ . '/allenotes_weekly', 'w') : false;
$arr              = [];
if (((bool)$vals['weekly_allenotes'] != (bool)$allenotes) || ((bool)$vals['regular_allenotes'] != (bool)$allenotes_weekly)) {
	return [
		'success' => false,
		'message' => [
			'weekly_allenotes'  => 'Could not create file',
			'regular_allenotes' => 'Could Not Create file',
			'values'            => $vals,
			'contents'          => true
		]
	];
} else {
	if (strlen($vals['weekly_allenotes'])) {
		$arr[] = fwrite($allenotes, $vals['weekly_allenotes']);
	}
	if (strlen($vals['regular_allenotes'])) {
		$arr[] = fwrite($allenotes_weekly, $vals['regular_allenotes']);
	}
}
$allenotes && fclose($allenotes);
$allenotes_weekly && fclose($allenotes_weekly);
$res    = [file_get_contents(__DIR__ . '/allenotes_weekly'), file_get_contents(__DIR__ . '/allenotes')];
$o      = [];
$output = exec('/usr/local/bin/python3.3 ' . __DIR__ . '/g_a.py 2>&1', $o);
exec('exit');
return [
	'success' => !!$output,
	'message' => [
		$output,
		'contents' => $o,
	]
];