<?php
/**
 * User: Sam Washington
 * Date: 11/20/16
 * Time: 11:26 PM
 */

namespace Factshift\Entity\Model;


class UniverseModel extends Abstraction\FactshiftModel {
    protected static $table_name;
    protected static $table_prefix;
    protected static $is_init            = false;
    protected static $model_type         = null;
    protected static $default_attributes = [ ];
}