<?php
use Sm\Core\App;
use Sm\Model\ModelMeta;
use Spwashi\Libs\Session\Session;
use Spwashi\Model\User;

$r          = require(App::_()->path . '/drivers/_models.php');
$res        = ModelMeta::_register($r);
$to_iterate = [
	ModelMeta::TYPE_TABLE,
	ModelMeta::TYPE_CLASSNAME,
	ModelMeta::TYPE_PREFIX,
	ModelMeta::TYPE_MODEL_TYPE,
	ModelMeta::TYPE_PROPERTIES,
];
foreach ($res as $k => $v) {
	foreach ($v as $key => $value) {
		$arr = [];
		foreach ($to_iterate as $const) {
			$arr[$const] = ModelMeta::convert_to_something($key, $const);
		}
//		Kint::dump([$key => $arr]);
	}
}
Kint::dump(ModelMeta::dump());
$user = Session::get_user();
try {
	if ($user) $user->findType('sections');
} catch (Exception $e) {
};
$dictionaries = 'sections';
$dic          = User::find(11);
//$dic = Dictionary::find(9);
$v = $dic->findType($dictionaries)->maps->{$dictionaries};
var_dump($v);
#ModelMeta::get_map_between(Page::class, new Concept(), ModelMeta::TYPE_TABLE)
#+Kint::dump($res);
