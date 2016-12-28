<?php
/**
 * User: Sam Washington
 * Date: 11/20/16
 * Time: 11:26 PM
 */

namespace Factshift\Entity\Model;


/**
 * Class UserModel
 *
 * @package Factshift\Entity\Model
 * @property string $alias
 * @property int    $id
 * @property string $ent_id
 * @property string $first_name
 * @property string $last_name
 * @property string $password
 */
class UserModel extends Abstraction\FactshiftModel {
    protected static $table_name;
    protected static $table_prefix;
    protected static $is_init            = false;
    protected static $model_type         = null;
    protected static $default_attributes = [ ];
}