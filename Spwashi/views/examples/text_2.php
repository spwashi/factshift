<?php
use Sm\Response\Http;
use Spwashi\Model\Section;

/**
 * @var PDO $connection
 */
$Section = Section::find(2);
$Section->findType("sections");
//Http::make_resource_headers('json',"Section 2");
return(($Section));


//while($connection->query($query)){
//	var_dump('h');
//}