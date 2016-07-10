<?php
/**
 * User: Sam Washington
 * Date: 4/4/2015
 * Time: 5:06 PM
 */

namespace Spwashi\Model;

use Sm\Model\Model;

/**
 * Class RelationshipStatus
 * @package Spwashi\Model
 */
class RelationshipStatus extends Model {

    public static $default_properties = [];
    public static $table_name      = 'relationship_statuses';
    public static $main_string_key = 'value';

    const STATUS_TENTATIVE = 1;
    const STATUS_CONFIRMED = 2;
    const STATUS_REJECTED  = 3;

    protected $id;
    /** @var  string The value of the relationship status */
    protected $value;
    /** @var  string A description of what the status means */
    protected $description;
}