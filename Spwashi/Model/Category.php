<?php
/**
 * User: sam
 * Date: 6/11/15
 * Time: 11:15 PM
 */

namespace Spwashi\Model;

use Sm\Model\Model;

/**
 * Class Category
 * @package Spwashi\Model
 * @property $id
 * @property $user_id        The ID of the user who created the category
 * @property $main_parent_id If the category is a subcategory, this is the parent ID
 * @property $name           Name of the category
 * @property $alias          A unique, human-readable alias
 * @property $description    A description of the category
 * @property $ent_id           A unique, random key for identifying a category
 */
class Category extends Model {
    public static $default_properties; public static $api_settable_properties;
    public static $table_name;
    public static $table_prefix;
    public static $main_string_key = 'alias';
}