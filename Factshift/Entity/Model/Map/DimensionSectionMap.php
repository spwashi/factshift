<?php
/**
 * User: Sam Washington
 * Date: 11/27/16
 * Time: 2:42 PM
 */

namespace Factshift\Entity\Model\Map;


use Factshift\Entity\Model\Map\Abstraction\FactshiftMapModel;

/**
 * Class DimensionSectionMap
 *
 * @package Factshift\Entity\Model\Map
 * @property int    id
 * @property int    section_id
 * @property int    dimension_id
 * @property int    section_type
 * @property int    section_role
 * @property int    position
 * @property string update_dt
 * @property string creation_dt
 */
class DimensionSectionMap extends FactshiftMapModel {
    protected static $table_name;
    protected static $table_prefix;
    protected static $is_init            = false;
    protected static $model_type         = null;
    protected static $default_attributes = [ ];
}