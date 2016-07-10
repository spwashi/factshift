<?php
/**
 * User: Sam Washington
 * Date: 3/26/2015
 * Time: 11:06 PM
 */

namespace Sm\Database\Query\Key;


use Sm\Database\Query\Key\Abstraction\Key;

class IndexKey extends Key{
    protected $key_type = 'INDEX';
    function __construct($name = null) {
        parent::__construct('k_'.$name);
    }
}