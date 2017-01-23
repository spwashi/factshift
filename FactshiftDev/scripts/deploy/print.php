<?php
/**
 * User: Sam Washington
 * Date: 10/20/16
 * Time: 10:34 PM
 *
 * I know this is bad, it was just whipped up.
 * Change in the future to use a query-builder.
 * Very tightly coupled with the
 */

use FactshiftDev\Core\FactshiftDev;
use Sm\Core\Inflector;
use Sm\Core\Util;
use Sm\Entity\Model\EntityMeta;

$App = FactshiftDev::_();


$path     = $App->Paths->driver . 'models.php';
$mf_array = [ ];
$models   = include ($path) ?? [ ];
$m_tables = $models['models'] ?? false;
if (!$m_tables) return [ null ];
$tables      = [ ];
$value_table = [ ];
$end_insert  = [ ];
foreach ($m_tables as $model_name => $model_details) {
    $a                = $model_details['properties']['all'] ?? $model_details['properties'];
    $model_properties = [ ];
    foreach ($a as $index => $model_property) {
        if (is_int($index)) $model_properties[] = $model_property;
        else $model_properties[] = $index;
    }
    $table_name = $model_details['table'] ?? '';
    if ($model_properties) {
        if (($model_details['alias_for'] ?? false)) continue;
        $tables[ $table_name ] = [ ];
        $prop_string           = "";
        foreach ($model_properties as $index => $property) {
            if ($property === 'ent_id') $prop_type = 'ent_id';
            else if (Util::endsWith($property, 'position')) $prop_type = 'int';
            else if (Util::endsWith($property, 'status')) $prop_type = 'status';
            else if ($property === 'update_dt') $prop_type = 'u_dt';
            else if ($property === 'description' || $property === 'content') $prop_type = 'text';
            else if ($property === 'creation_dt') $prop_type = 'n_dt';
            else
                $prop_type =
                    Util::endsWith($property, 'id') ? 'id' :
                        (Util::endsWith($property, 'type') ? 'type' :
                            ($property == "alias" ? 'alias' :
                                (Util::endsWith($property, '_dt') ? 'dt' :
                                    (Util::endsWith($property, 'role') ? 'role' : 'vc'))));
            $tables[ $table_name ][ $property ] = $prop_type;
            $prop_string .= ' * @property ';
            switch ($prop_type) {
                case 'ent_id':
                case 'u_dt':
                case 'alias':
                case 'n_dt':
                case 'lvc':
                case 'vc':
                case 'dt':
                    $prop_string .= "string ";
                    break;
                case 'type':
                case 'id':
                case 'tiny_id':
                case 'role':
                case 'status':
                case 'int':
                    $prop_string .= "int    ";
                    break;
            }
            $prop_string .= "{$property} \n";
        };
        $class_name  = $model_name ?? false;
        $description = $model_details['description'] ?? false;
        $properties  = $model_properties;
        if (!$class_name) continue;
        $cn_exp     = explode('\\', $class_name);
        $class_name = array_pop($cn_exp);
        $cn_impl    = implode('\\', $cn_exp);
        $variables  = [ ];
        if ((Util::endsWith($table_name, 'types') || Util::endsWith($table_name, 'roles')) && ($model_details['values']??false)) {
            $values = $model_details['values'];
            ksort($values);
            $insert = "INSERT INTO {$table_name}(id, alias) VALUES ";
            $v      = [ ];
            asort($values);
            foreach ($values as $value => $id) {
                $v[]         = "($id, '" . str_replace('_', '-', strtolower($value)) . "')";
                $variables[] = "\tTYPE_" . strtoupper($value) . "\t= {$id}";
            }
            $insert .= implode(',', $v) . '';
            $end_insert[] = $insert;
        }
    }
}
$aggregate_query_array = [ ];
$secondary_query       = [ ];
$flags                 = [ ];
foreach ($tables as $table => $properties) {
    $query_array        = [ ];
    $end_of_query_array = [ ];
    foreach ($properties as $property_name => $ty) {
        $integer_length = 11;
        switch ($ty) {
            case 'ent_id':
                $query_array[]     = "{$property_name} VARCHAR(25) CHARACTER SET utf8 COLLATE utf8_general_ci UNIQUE NOT NULL";
                $secondary_query[] = "ALTER TABLE {$table} ADD CONSTRAINT {$property_name}_{$other_table}_{$table} FOREIGN KEY ({$property_name}) REFERENCES entities(ent_id) ON UPDATE CASCADE ON DELETE CASCADE;";
                break;
            case 'dt':
                $query_array[] = "{$property_name} DATETIME DEFAULT NULL";
                break;
            case 'u_dt':
                $query_array[] = "{$property_name} DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP";
                break;
            case 'n_dt':
                $query_array[] = "{$property_name} DATETIME DEFAULT CURRENT_TIMESTAMP";
                break;
            case 'type':
            case 'role':
            case 'status':
                /** @noinspection PhpMissingBreakStatementInspection */
            case 'tiny_id':
                $integer_length = 4;
            case 'id':
                if ($property_name === 'id') {
                    $query_array[]        = "{$property_name} INT($integer_length) UNSIGNED AUTO_INCREMENT UNIQUE NOT NULL";
                    $end_of_query_array[] = "PRIMARY KEY ({$property_name})";
                } else {
                    $query_array[] = "{$property_name} INT($integer_length) UNSIGNED NULL";
                    $is_id         = $ty == 'id' || $ty == 'tiny_id';
                    $other_table   = '';
                    if ($is_id) $other_table = $App->IoC->EntityMeta->convert_to_something($property_name, EntityMeta::TYPE_TABLE);
                    if (!$is_id || empty($other_table)) {
                        $other_table = Inflector::pluralize($property_name);
                    }
                    
                    if ($other_table && strlen($other_table))
                        $secondary_query[] = "ALTER TABLE {$table} ADD CONSTRAINT {$property_name}_{$other_table}_{$table} FOREIGN KEY ({$property_name}) REFERENCES {$other_table}(id) ON UPDATE CASCADE ON DELETE CASCADE;";
                    else
                        $flags[] = "Check <b>$table</b> for column <b>{$property_name}</b>. No foreign key to match 'id' in <b>$other_table</b> ($ty)";
                }
                break;
            case 'int':
                $query_array[] = "{$property_name} INT(11) UNSIGNED DEFAULT 0";
                break;
            case 'vc':
                $query_array[] = "{$property_name} VARCHAR(75) CHARACTER SET utf8 COLLATE utf8_general_ci NULL";
                break;
            case 'text':
                $query_array[] = "{$property_name} TEXT CHARACTER SET utf8 COLLATE utf8_general_ci NULL";
                break;
            case 'lvc':
                $query_array[] = "{$property_name} VARCHAR(3000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL";
                break;
            case 'alias':
                $query_array[] = "{$property_name} VARCHAR(40) CHARACTER SET utf8 COLLATE utf8_general_ci UNIQUE NOT NULL";
                break;
        }
    }
    $aggregate_query_array[] = trim("CREATE TABLE IF NOT EXISTS {$table} (\n\t" . implode(",\n\t", array_merge($query_array, $end_of_query_array)), ', ') . "\n)";
}

$secondary_query = array_merge($secondary_query, $end_insert);
$aq_impl         = implode("\n", $aggregate_query_array);
$sq_impl         = implode("\n", $secondary_query);
$f_impl          = implode("\n", $flags);
$res             = "{$aq_impl}\n{$sq_impl}";

/** @var string $res_small Another way to represent the query. Removes all tabs and newlines */
$res_small = str_replace([ "\n", "\t" ], "", $aq_impl) . "\n" . str_replace([ "\n", "\t" ], "", $sq_impl);
/** @var string $res_html Another way to represent the query. Just puts everything in a "pre" tag */
$res_html = "<pre>{$aq_impl}</pre><pre>{$sq_impl}</pre><div><pre>{$f_impl}</pre></div>";
//return '<pre>' . Log::styleArray($mf_array) . '</pre>';

return "<pre>$res_html</pre>";
return array_merge($aggregate_query_array, $secondary_query);
return $res;
return "<pre>$model_file</pre>";
return $res_html;
