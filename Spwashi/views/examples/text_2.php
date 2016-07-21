<?php
use Sm\Core\IoC;

/**
 * @var PDO $connection
 */
$connection = IoC::_()->connection->getConnection();
Kint::dump($connection);
$query = "SELECT * FROM sections";

$res = $connection->query($query);
Kint::dump($res);
foreach ($connection->query($query) as $k => $v) {
	var_dump([$k, $v]);
	if ($k == 4)
		break;
}
foreach ($connection->query($query) as $k => $v) {
	var_dump([$k, $v]);
}


//while($connection->query($query)){
//	var_dump('h');
//}