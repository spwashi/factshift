<?php
/**
 * User: sam
 * Date: 6/11/15
 * Time: 11:15 PM
 */

namespace Spwashi\Model;

use Sm\Model\Model;

class Flair extends Model {
    public static $table_name      = 'flairs';
    public static $main_string_key = 'title';
    public static $default_properties = [];
    protected $id;
    protected $title;
    protected $subtitle;
    /** @var  int If there is a page that is described by this flair.. */
    protected $page_id;
    protected $description;
}