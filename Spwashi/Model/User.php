<?php
/**
 * User: Sam Washington
 * Date: 4/4/2015
 * Time: 5:06 PM
 */
namespace Spwashi\Model;

use Sm\Core\App;
use Sm\Model\Model;
use Spwashi\Model\Type\UserType;

/**
 * Class User
 *
 * @package Spwashi\Model
 * @property int          $id
 * @property string       $alias                   User's username (or unique identifier that is humanly readable)
 * @property string       $ent_id                  User's ent_id (Unique identifier, useful if strings are necessary. Also files are based on this)
 * @property string       $password                User's password
 * @property string       $confirmation_ent_id     Ent_id used for confirmation purposes (verification links)
 * @property string       $email                   User's email address
 * @property string       $first_name              User's first name
 * @property string       $last_name               User's last name
 * @property int|UserType $user_type               The type the user is. Always going to be an integer, based on UserType types
 * @property int          $user_status             Status of the user. Verified, not verified, suspended
 * @property int          $profile_image_id
 * @property int          $user_status_reason_id   The reason their account has that status
 */
class User extends Model implements \JsonSerializable {
    const USER_DIRECTORY_PATH = 'spwashi_users/';

    public static $default_properties;
    public static $api_settable_properties;
    public static $table_name;
    public static $table_prefix;
    public static $main_string_key = 'alias';

#--------------------------------------| PASSWORD FUNCTIONS
    static public function hash_password($password) {
        return $password = password_hash($password, PASSWORD_BCRYPT);
    }
    static public function passwords_are_equal($password_to_compare, $hashed_password) {
        return password_verify($password_to_compare, $hashed_password);
    }

#--------------------------------------| CREATION FUNCTIONS
    public function create_folder_structure() {
        $user_path = App::_()->user_path;
        if (isset($this->ent_id) && $user_path != '') {
            $path                = $user_path . $this->ent_id;
            $directory_structure = ['', '/data', '/data/css', '/files', '/images'];
            $success             = [];
            foreach ($directory_structure as $folder) {
                if (file_exists($path . $folder)) {
                    $success[] = true;
                    continue;
                }
                if (mkdir($path . $folder, 0755, true)) {
                    $success[] = true;
                };
            }
            if (count($success) == count($directory_structure)) {
                return true;
            }
        }
        return false;
    }

#--------------------------------------| INFORMATION RETRIEVAL
    public function get_available_user_contexts() {
        $available_user_contexts                = [];
        $available_group_contexts               = [];
        $available_collection_contexts          = [];
        $available_user_contexts[$this->ent_id] = ['ent_id' => $this->ent_id, 'alias' => $this->alias];
        return ['users' => $available_user_contexts, 'groups' => $available_group_contexts, 'collections' => $available_collection_contexts];
    }

#--------------------------------------| MISCELLANEOUS
    function jsonSerialize() {
        $stuff                  = $this->_properties;
        $stuff['relationships'] = $this->_relationships;
        unset($stuff['password']);
        unset($stuff['user_type']);
        unset($stuff['user_status']);
        unset($stuff['user_status_reason_id']);
        return $stuff;
    }
}