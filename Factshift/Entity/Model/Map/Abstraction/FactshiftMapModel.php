<?php
/**
 * User: Sam Washington
 * Date: 12/1/16
 * Time: 11:21 PM
 */

namespace Factshift\Entity\Model\Map\Abstraction;


use Factshift\Entity\Model\Abstraction\FactshiftModel;

class FactshiftMapModel extends FactshiftModel {
    public function jsonSerialize() {
        $ret = parent::jsonSerialize();
        if (!static::$model_type) return $ret;
        $ret['_model_type'] = str_replace('Map', '', static::$model_type);
        return $ret;
    }
}