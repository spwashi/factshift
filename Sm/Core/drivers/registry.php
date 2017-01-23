<?php
/**
 * User: Sam Washington
 * Date: 3/28/2015
 * Time: 7:05 PM
 */
use Sm\Core\App;
use Sm\Entity\Model\EntityMeta;
use Sm\Environment\Environment;
use Sm\Output\Output;
use Sm\Router\Router;

########################################################################################################################
return [
    'session'           => new Sm\Session\Session,
    'router.app'        => function () { return new Router; },
    'connection'        => Sm\Database\Connection::init(),
    'config_connection' => Sm\Database\Connection::init(),
    'EntityMeta'        => new EntityMeta(),
    'sql'               => function () { return new Sm\Database\Sql(App::_()->IoC->connection); },
    'environment'       => new Environment(Environment::EP_FRONT_END),
    'process_output'    => function ($output_data) { return (new Sm\Output\Output)->process($output_data); },
];
########################################################################################################################