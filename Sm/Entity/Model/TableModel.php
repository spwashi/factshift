<?php
/**
 * User: Sam Washington
 * Date: 11/20/16
 * Time: 1:29 AM
 */

namespace Sm\Entity\Model;


use Sm\Core\App;
use Sm\Database\Abstraction\Sql;
use Sm\Development\Log;
use Sm\Entity\Model\Abstraction\Model;

/**
 * Class TableModel
 *
 * @package      Sm\Entity\Model
 * @property-read int $id
 */
class TableModel extends Model {
    protected static $default_attributes = [ ];
    protected static $is_init            = false;
    protected static $table_name         = false;

#########################################################
#      Constructors, initializers, static getters       #
#########################################################
    protected static function _init() {
        if (static::$is_init) return true;
        $p               = parent::_init();
        static::$is_init = false;
        if (!$p) return $p;
        static::$table_name = EntityMeta::convert_to_something(static::$model_type, EntityMeta::TYPE_TABLE);
        if (!strlen(static::$table_name)) throw new ModelNotFoundException("Could not map model to table", ModelNotFoundException::REASON_UNIMPLEMENTED);
        static::$table_name;
        static::$is_init = true;
        return true;
    }
    /**
     * Get the tablename that a Model is representative of
     *
     * @return bool
     */
    public static function getTableName() {
        return static::$table_name;
    }
#########################################################
#      Non-static Getters and Setters                   #
#########################################################
    /**
     * @return mixed
     */
    public function getIsExistent() {
        return isset($this->isExistent) ? $this->isExistent : ($this->isExistent = ($this->get('id') ?? false));
    }
#########################################################
#                 CRUD operations                       #
#########################################################
    /**
     * Based on the properties that have been set in the class, save a model
     *
     * @return bool
     */
    public function save():bool {
        $new_val_arr = [ ];
        
        #If there is not an ID associated with this class or there is nothing that's changed, return 0 and don't do anything
        if (!is_numeric($this->id) || empty($this->_changed)) return 0;
        
        #Set the update_dt so we know when this record was last changed
        $this->set([ 'update_dt' => date('Y-m-d H:i:s') ]);
        
        #Iterate through the changed values and add them to the Array of column=>values so we can update them
        foreach ($this->_changed as $key => $previous_value) {
            if (array_key_exists($key, $this->attributes))
                $new_val_arr[ $key ] = (string)$this->attributes[ $key ];
            else
                Log::init('Did not save property ' . $key)->log_it();
        }
        $this->_changed = [ ];
        /** @var \Sm\Database\Sql $sql */
        if (!App::_()->IoC->resolveSql($sql)) return false;
        
        #Return the affected rows
        $query_result =
            $sql->update($new_val_arr)
                ->table(static::$table_name)
                ->where('id = ' . $this->id)
                ->run()
                ->output('row_count');
        return (bool)$query_result;
    }
    /**
     * Based on the properties that have been set in the class, create a model
     *
     * @return bool
     */
    public function create():bool {
        $new_val_arr = [ ];
        $this->set([ 'creation_dt' => date('Y-m-d H:i:s') ]);
        foreach ($this->_changed as $key => $previous_value) {
            if (is_string($this->attributes[ $key ]) || is_numeric($this->attributes[ $key ]))
                $new_val_arr[ $key ] = $this->attributes[ $key ];
        }
        $this->_changed = [ ];
        /** @var \Sm\Database\Sql $sql */
        if (!App::_()->IoC->resolveSql($sql)) return false;
        $qry =
            $sql
                ->insert(array_keys($new_val_arr), array_values($new_val_arr))
                ->table(static::$table_name);
        $query_result = $qry->run()->output('id');
        if ($query_result) $this->set([ 'id' => intval($query_result) ], false);
        else return false;
        
        return (bool)$query_result;
    }
    /**
     * Remove a model from its table based on its ID
     *
     * @return bool
     */
    public function destroy():bool {
        /** @var \Sm\Database\Sql $sql */
        if (!App::_()->IoC->resolveSql($sql)) return false;
        if (!isset($this->id)) return false;
        
        #Return the number of affected rows
        $result = $sql->delete()->table(static::$table_name)->where("id = {$this->id}")->run()->output('row_count');
        return (bool)$result;
    }
#########################################################
#        public, non-static getters and setters         #
#########################################################
    protected static function search_for_models($search, $attributes = null, $find_all = false) {
        static::_init();
        if (!static::$is_init) throw new ModelNotFoundException("Model has not been initialized " . static::$model_type);
        if (!($search === null && static::canFindAll()) && !is_array($search)) throw new ModelNotFoundException([ "Not sure what to do with search", $search ]);
//        throw new ModelNotFoundException("Cannot search for model", ModelNotFoundException::REASON_UNIMPLEMENTED);
        /** @var Sql $sql */
        if (!App::_()->IoC->resolveSql($sql)) throw new \Exception("Could not successfully utilize SQL");
        
        $_is_start = true;
        if (!$search && static::canFindAll()) {
            $sql->where('1=1');
        } else {
            foreach ($search as $column_name => $value) {
                $not = false;
                if (strpos($column_name, '!') === 0) {
                    $column_name = substr($column_name, 1, strlen($column_name) - 1);
                    $not         = true;
                }
                if (!array_key_exists($column_name, static::$default_attributes)) {
                    Log::init([ $column_name . ' not in ' . static::class, $value ])->log_it();
//                continue;
                }
                if (!$_is_start) {
                    $sql->where('AND');
                }
                $_is_start = false;
                $not       = $not ? '!' : '';
                $sql->bind([ $column_name => $value ])->where($column_name . " {$not}= :{$column_name}");
            }
        }
        $query  = $sql->select($attributes ?: '*')->from(static::$table_name)->buildQry()->getQry();
        $output = $sql->run()->output($find_all ? 'all' : 'row');
        return $output;
    }
#########################################################
#                Logging and Serialization              #
#########################################################
    public static function _log_() {
        $log               = parent::_log_();
        $log['table_name'] = static::$table_name;
        return $log;
    }
}