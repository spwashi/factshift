<?php
/**
 * User: Sam Washington
 * Date: 11/27/16
 * Time: 2:42 PM
 */

namespace Factshift\Entity\Model\Map;


use Factshift\Entity\Model\Map\Abstraction\FactshiftMapModel;

class SectionSectionMap extends FactshiftMapModel {
    protected static $table_name;
    protected static $table_prefix;
    protected static $is_init            = false;
    protected static $model_type         = null;
    protected static $default_attributes = [ ];
}