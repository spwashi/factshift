<?php
/**
 * User: Sam Washington
 * Date: 3/24/2015
 * Time: 12:05 AM
 */

namespace Sm\Database\Query\Abstraction;



use Sm\Core\Container;

abstract class  Query extends Container{
    /** @var  string $query_type build|update  */
    protected $query_type;

    /**
     * @return string
     */
    public function getQueryType() {
        return $this->query_type;
    }

    /**
     * @param string $query_type
     */
    public function setQueryType($query_type) {
        $this->query_type = $query_type;
    }
}