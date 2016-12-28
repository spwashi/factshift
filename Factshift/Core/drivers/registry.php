<?php
/**
 * User: Sam Washington
 * Date: 3/28/2015
 * Time: 7:05 PM
 */

########################################################################################################################
return [
    'session'    => new Factshift\Libs\Session\Session(),
    'connection' => Sm\Database\Connection::init('localhost',
                                                 'codozsqq',
                                                 '^bzXfxDc!Dl6',
                                                 'factshift')->connect(),
];
########################################################################################################################