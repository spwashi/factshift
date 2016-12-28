<?php
/**
 * User: Sam Washington
 * Date: 11/20/16
 * Time: 11:26 PM
 */

namespace Factshift\Entity\Model;


class SectionModel extends Abstraction\FactshiftModel {
    const TYPE_STANDARD = 1;
    const TYPE_IMAGE    = 2;
    const TYPE_VIDEO    = 3;
    const TYPE_AUDIO    = 4;
    const TYPE_TABLE    = 6;
    const TYPE_LIST     = 7;
    const TYPE_MIRROR   = 8;
    
    
    protected static $table_name;
    protected static $table_prefix;
    protected static $is_init            = false;
    protected static $model_type         = null;
    protected static $default_attributes = [ ];
}