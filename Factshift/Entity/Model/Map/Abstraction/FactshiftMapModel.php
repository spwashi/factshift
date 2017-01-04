<?php
/**
 * User: Sam Washington
 * Date: 12/1/16
 * Time: 11:21 PM
 */

namespace Factshift\Entity\Model\Map\Abstraction;


use Factshift\Core\Factshift;
use Factshift\Entity\Model\Abstraction\FactshiftModel;
use Sm\Database\Abstraction\Sql;

/**
 * Class FactshiftMapModel
 *
 * @package Factshift\Entity\Model\Map\Abstraction
 * @property int    $position
 * @property string $context_ent_id
 */
class FactshiftMapModel extends FactshiftModel {
    public function getContextID() {
        if (!$this->hasAttribute('context_ent_id')) return null;
        return $this->context_ent_id;
    }
    /**
     * @return string
     */
    protected function _get_series_where_clause() {
        $where_clause = '';
        $first        = true;
        foreach ($this->attributes as $index => $attribute) {
            if (strpos($index, '_id')) {
                $where_clause .= ($first ? '' : ' AND ') . "`$index`  = $attribute";
                $first = false;
            }
        }
        return $where_clause;
    }
    public function update_series_position($action = 'update') {
        if (!$this->hasAttribute('position')) return true;
        /** @var Sql $sql */
        Factshift::_()->IoC->resolveSql($sql);
        if (!$sql) return false;
        $table_name = static::$table_name;
        $id         = $this->id;
        $position   = max(0, $this->position ?? 0);
        if (!array_key_exists('position', $this->_changed)) $action = $action === 'delete' ? $action : 'update';
        $old_position = $this->_changed['position'] ?? 0;
        switch ($action) {
            case 'update':
                if ($old_position > $position) {
                    $update_action       = ' SET `position` = `position` + 1 ';
                    $update_where_clause = " AND `position` > {$position} AND `position` <= {$old_position} ";
                } elseif ($old_position < $position) {
                    $update_action       = ' SET `position` = `position` - 1 ';
                    $update_where_clause = " AND `position` < {$position} AND `position` >= {$old_position} ";
                } else {
                    $update_action       = ' SET `position` = `position` ';
                    $update_where_clause = ' AND 1=0 ';
                }
                break;
            case 'create':
                $update_action       = " SET `position` = `position` + 1 ";
                $update_where_clause = " AND `position` >= {$position} ";
                break;
            case 'delete':
                $update_action       = " SET `position` = `position` + 1 ";
                $update_where_clause = " AND `position` >= {$position} ";
                break;
        }
        
        $qry = /** @lang MySQL */
            "UPDATE `{$table_name}` {$update_action}" .
            "WHERE " . $this->_get_series_where_clause() . " " .
            $update_where_clause .
            "AND `position` > 0 " .
            "AND `id` <> $id";
        
        
        $sql->setQry($qry);
        $sql->run();
        return $sql->was_successful();
    }
    public function save() : bool {
        Factshift::_()->IoC->connection->beginTransaction();
        $this->update_series_position('update');
        $result = parent::save();
        Factshift::_()->IoC->connection->commitTransaction();
        return $result;
    }
    public function create() :bool {
        Factshift::_()->IoC->connection->beginTransaction();
        $this->update_series_position('create');
        parent::create();
        Factshift::_()->IoC->connection->commitTransaction();
    }
    public function jsonSerialize() {
        $ret = parent::jsonSerialize();
        if (!static::$model_type) return $ret;
        $ret['_model_type'] = str_replace('Map', '', static::$model_type);
        return $ret;
    }
}