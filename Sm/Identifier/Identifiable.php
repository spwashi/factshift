<?php
/**
 * User: Sam Washington
 * Date: 11/24/16
 * Time: 11:33 AM
 */

namespace Sm\Identifier;


interface Identifiable {
    const GENERIC_IDENTIFIER = 1;
    const TYPED_IDENTIFIER   = 2;
    const ENT_ID             = 3;
    /**
     * Return a string that can uniquely identify the object
     *
     * @param $type
     *
     * @return mixed
     */
    public function getUniqueIdentifier($type = null);
}