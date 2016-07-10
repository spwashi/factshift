<?php
/**
 * User: Sam Washington
 * Date: 4/4/2015
 * Time: 5:07 PM
 */

namespace Spwashi\Model;

use Sm\Model\Model;

/**
 * Class Group
 *
 * @package Spwashi\Model
 *          int $founder_id The id of the user who crate the group. null if user has been deleted
 *
 * @property string $alias                    A unique, human readable identifier for the page
 * @property string $name                     The actual name of the group
 * @property string $ent_id                   A unique, random keyidentifier for the group
 * @property string $password                 If the group requires a password, this is it
 * @property int    $group_type               The type of group it is
 * @property int    $group_status             The status of the group
 * @property int    $group_status_reason_id   The reason the group has its status. Null if there is no reason
 * @property int    $profile_image_id         todo
 */
class Group extends Model {
    public static $default_properties;
    public static $api_settable_properties;
    public static $api_gettable_properties;
    public static $table_name;
    public static $table_prefix;
    public static $main_string_key = 'alias';
}