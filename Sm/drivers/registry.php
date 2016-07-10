<?php
/**
 * User: Sam Washington
 * Date: 3/28/2015
 * Time: 7:05 PM
 */
use Sm\Core\IoC;

########################################################################################################################
return [
    'session'    => new Sm\Session\Session,
    'connection' => Sm\Database\Connection::init('localhost', 'codozsqq', '^bzXfxDc!Dl6', 'codozsqq_spwashi2')->connect(),
    'sql'        => function () {
        return new Sm\Database\Sql(IoC::resolve('connection'));
    },
    'grammar'    => function () {
        return new Sm\Database\Grammar\MySQL\Grammar();
    }
];
########################################################################################################################