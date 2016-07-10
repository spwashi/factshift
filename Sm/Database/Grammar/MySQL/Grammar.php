<?php
/**
 * User: Sam Washington
 * Date: 3/24/2015
 * Time: 12:13 AM
 */

namespace Sm\Database\Grammar\MySQL;


use Sm\Core\Util;
use Sm\Database\Query\Column\Abstraction\Column;
use Sm\Database\Query\Column\CharColumn;
use Sm\Database\Query\Column\DatetimeColumn;
use Sm\Database\Query\Column\IntegerColumn;
use Sm\Database\Query\Column\TinyintColumn;
use Sm\Database\Query\Column\VarcharColumn;
use Sm\Database\Query\Key\Abstraction\Key;
use Sm\Database\Query\Key\ForeignKey;
use Sm\Database\Query\Key\IndexKey;
use Sm\Database\Query\Key\UniqueKey;
use Sm\Database\Query\SchemaQuery;

class Grammar extends \Sm\Database\Grammar\Abstraction\Grammar {
    public function alterTable(SchemaQuery $schemaQuery, $table_name = null) {
        $table_name = isset($table_name) ? $table_name : $schemaQuery->getTableName();
    }
    public function createTable(SchemaQuery $schemaQuery, $table_name = null) {
        $qry_arr = [];
        $key_arr = [];
        $table_name = isset($table_name) ? $table_name : $schemaQuery->getTableName();
        $table_name = isset($table_name) ? $this->table_name = $table_name : $this->table_name = '';
        foreach ($schemaQuery as $query_portion) {
            $type = $schemaQuery->current()->getType();
            switch ($type):
                case 'TINYINT':
                case 'INTEGER':
                    $integer = $this->createInteger($query_portion);
                    $qry_arr[] = $integer['qry'];
                    if (!empty($integer['key'])) {
                        $key_arr[] = $integer['key'];
                    }
                    break;
                case 'DATETIME':
                    $integer = $this->createDatetime($query_portion);
                    $qry_arr[] = $integer['qry'];
                    if (!empty($integer['key'])) {
                        $key_arr[] = $integer['key'];
                    }
                    break;
                case 'VARCHAR':
                case 'CHAR':
                    $integer = $this->createChar($query_portion);
                    $qry_arr[] = $integer['qry'];
                    if (!empty($integer['key'])) {
                        $key_arr[] = $integer['key'];
                    }
                    break;
                    break;
                case 'TEXT':
                    break;
                case 'PRIMARY':
                case 'UNIQUE':
                case 'FOREIGN':
                case 'INDEX':
                    $key_arr[] = [$query_portion];
                    break;
            endswitch;

        }
        $this->createKeys($key_arr);
        $query = 'CREATE TABLE IF NOT EXISTS ' . $table_name . '(' . PHP_EOL;
        $query .= implode(',' . PHP_EOL, $qry_arr) . ',' . PHP_EOL;
        $query .= implode(',' . PHP_EOL, $key_arr);
        $query = rtrim($query, ',');
        $query .= PHP_EOL . ')ENGINE=InnoDB DEFAULT CHARSET=utf8;';
        $query = str_replace('@table', $table_name, $query);
        return $query;

    }

    private function createKeys(array &$key_arr) {
        $tmp = [];
        foreach ($key_arr as $arr) {
            /** @var Key $value */
            foreach ($arr as $value):
                $type = $value->getType();
                $columns = implode(', ', $value->getColumns());
                $name = $value->getName();
                $comment = $value->getComment() ? 'COMMENT \'' . $value->getComment() . '\'' : '';
                switch ($type):
                    case 'INDEX':
                        $tmp[] = 'KEY ' . $name . ' (' . $columns . ') ' . $comment;
                        break;
                    case 'UNIQUE':
                        $tmp[] = 'UNIQUE KEY ' . $name . ' (' . $columns . ') ' . $comment;
                        break;
                    case 'PRIMARY':
                        array_unshift($tmp, 'PRIMARY KEY (' . $columns . ') ' . $comment);
                        break;
                    case 'FOREIGN':
                        /** @var ForeignKey $value */
                        $tb = $value->getReferencedTable();
                        $ref_cols = $value->getReferencedColumns();
                        $str = 'FOREIGN KEY ' . $name.'_'.Util::generateRandomString(3, 'abcdeABCDE_fghijFGHIJ') . '(' . $columns . ') REFERENCES ' . $tb . '(' . implode(',', $ref_cols) . ') ' . PHP_EOL;
                        $str .= "\t" . 'ON DELETE ' . $value->getOnDelete() . ' ' . PHP_EOL;
                        $str .= "\t" . 'ON UPDATE ' . $value->getOnUpdate() . ' ' ;
                        $tmp[] = $str;
                        $str = null;
                        break;
                endswitch;
            endforeach;
        }
        return $key_arr = $tmp;
    }

    private function arrangeColumnKeys(Column $column) {
        $key = [];
        $nm = $column->getName();
        if ($column->isKey()) {
            $key[] = IndexKey::init($nm)->setColumns($nm);
        }
        if ($column->isUnique()) {
            $key[] = UniqueKey::init($nm)->setColumns($nm);
        }
        $fk = $column->getForeignKey();
        if (!empty($fk) && isset($fk['table']) && isset($fk['column'])) {
            $key[] = ForeignKey::init($fk['table'], $nm)->setColumns($nm)->setReferencedColumns($fk['column']);
        }
        return $key;
    }

    /**
     * @param IntegerColumn|TinyintColumn $column
     * @return array
     */

    private function createInteger($column) {
        $dv = $column->getDefaultValue();
        $cm = $column->getComment();
        $nm = $column->getName();
        $l = $column->getLength();
        if (!$nm) {
            return ['qry' => null, 'key' => []];
        }
        $string = $nm . ' ' . $column->getType();
        $string .= $l ? '(' . $l . ') ' : ' ';
        $string .= $column->isUnsigned() ? 'UNSIGNED ' : '';
        $string .= $column->isZeroFill() ? 'ZEROFILL ' : '';
        $string .= $column->isNullable() ? '' : 'NOT NULL ';
        $string .= $dv && !$column->isAutoIncrement() ? 'DEFAULT \'' . $dv . '\' ' : '';
        $string .= $column->isAutoIncrement() ? 'AUTO_INCREMENT ' : '';
        $string .= $cm ? 'COMMENT \'' . $cm . '\' ' : '';
        return ['qry' => $string, 'key' => $this->arrangeColumnKeys($column)];
    }

    /**
     * @param CharColumn|VarCharColumn $column
     * @return array
     */
    private function createChar($column) {
        $dv = $column->getDefaultValue();
        $nm = $column->getName();
        $l = $column->getLength();
        $cm = $column->getComment();
        $cs = $column->getCharacterSet();
        $col = $column->getCollation();
        if (!$nm) {
            return ['qry' => null, 'key' => []];
        }
        $string = $nm . ' ' . $column->getType();
        $string .= $l ? '(' . $l . ') ' : ' ';
        $string .= $column->isBinary() ? 'BINARY ' : '';
        $string .= $cs ? 'CHARACTER SET ' . $cs . ' ' : '';
        $string .= $col ? 'COLLATE ' . $col . ' ' : '';
        $string .= $column->isNullable() ? '' : 'NOT NULL ';
        $string .= $dv ? 'DEFAULT \'' . $dv . '\' ' : '';
        $string .= $cm ? 'COMMENT \'' . $cm . '\' ' : '';
        return ['qry' => $string, 'key' => $this->arrangeColumnKeys($column)];
    }

    private function createDatetime(DatetimeColumn $column) {
        $dv = $column->getDefaultValue();
        $cm = $column->getComment();
        $nm = $column->getName();
        $l = $column->getLength();
        if (!$nm) {
            return ['qry' => null, 'key' => []];
        }
        $string = $nm . ' DATETIME ';
        $string .= $l ? '(' . $l . ') ' : ' ';
        $string .= $column->isNullable() ? '' : 'NOT NULL ';
        $string .= $column->isDefaultNow() ? 'DEFAULT CURRENT_TIMESTAMP ' : 'DEFAULT NULL ';
        $string .= $column->isUpdateNow() ? 'ON UPDATE CURRENT_TIMESTAMP ' : '';
        $string .= $cm ? 'COMMENT \'' . $cm . '\' ' : '';
        return ['qry' => $string, 'key' => $this->arrangeColumnKeys($column)];
    }

}