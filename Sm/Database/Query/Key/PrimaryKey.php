<?php
/**
 * User: Sam Washington
 * Date: 3/25/2015
 * Time: 11:02 PM
 */

namespace Sm\Database\Query\Key;


use Sm\Database\Query\Key\Abstraction\Key;

class PrimaryKey extends Key{
    protected $key_type = 'PRIMARY';
    function __construct($name = null) {
        parent::__construct('pk_'.$name);
    }
}