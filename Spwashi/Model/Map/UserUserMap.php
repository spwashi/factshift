<?php
/**
 * User: Sam Washington
 * Date: 3/22/2015
 * Time: 8:30 PM
 */

namespace Spwashi\Model\Map;

use Sm\Model\Model;

class UserUserMap extends Model {
    public static $table_name         = 'user_user_map';
    public static $default_properties = [];
    protected     $id;
    /** @var  int ID of the user who initiated the relationship */
    protected $primary_user_id;
    /** @var  int ID of the user in the sub-dominant or receiving position */
    protected $secondary_user_id;
    /** @var string The type of relationship the users are in */
    protected $primary_relationship_type;
    /** @var  int The status of the user's relationship */
    protected $primary_relationship_status;
}