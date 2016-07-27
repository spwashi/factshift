<?php
use Sm\Model\ModelMeta;
use Spwashi\Model\Section;

/**
 * @var PDO $connection
 */
$Section = Section::find(2);
$Section->findType("sections");
//Http::make_resource_headers('json',"Section 2");
Kint::dump(ModelMeta::dump());
Kint::dump(ModelMeta::get_potential_relationships(['users', 'universes']));


//while($connection->query($query)){
//	var_dump('h');
//}