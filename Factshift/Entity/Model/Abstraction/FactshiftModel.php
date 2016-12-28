<?php
/**
 * User: Sam Washington
 * Date: 11/20/16
 * Time: 12:41 AM
 */

namespace Factshift\Entity\Model\Abstraction;


use Factshift\Core\Factshift;
use Sm\Core\Util;
use Sm\Development\Log;
use Sm\Entity\Model\EntityMeta;
use Sm\Entity\Model\TableModel;
use Sm\Identifier\Identifiable;

/**
 * Class FactshiftModel
 *
 * @package Factshift\Entity\Model
 *
 * @property string $ent_id
 * @property string $id
 */
class FactshiftModel extends TableModel {
    const ADDED_ENT_ID_LENGTH = 15;
    const TOTAL_ENT_ID_LENGTH = 25;
    
    protected static $table_name;
    protected static $table_prefix;
    protected static $is_init            = false;
    protected static $model_type         = null;
    protected static $default_attributes = [ ];
    
    protected static function _init() {
        if (static::$is_init) return true;
        parent::_init();
        static::$table_prefix = EntityMeta::convert_to_something(static::class, EntityMeta::TYPE_PREFIX);
        return true;
    }
    
    public function getUniqueIdentifier($type = null) {
        switch ($type) {
            case Identifiable::ENT_ID:
                return $this->ent_id;
                break;
            case Identifiable::GENERIC_IDENTIFIER:
                return $this->Identifier->getR_Id();
            case Identifiable::TYPED_IDENTIFIER:
                return $this->Identifier->getTypedId();
                break;
            default:
                return $this->ent_id ?? ($this->id ? static::$model_type . '|' . $this->id : $this->Identifier->getR_Id());
        }
    }
    
    public function create() : bool {
        if ($this->hasAttribute('ent_id')) {
            $this->ent_id = static::generate_ent_id();
            /** @var \Sm\Database\Sql $sql */
            if (!Factshift::_()->IoC->resolveSql($sql)) return false;
            $qry =
                $sql
                    ->insert([ 'ent_id' ], [ $this->ent_id ])
                    ->table('entities');
            Log::init($qry->buildQry())->log_it();
            
            if (!$qry->run()->was_successful()) {
                Log::init([ 'failed', $this ])->log_it();
                return false;
            }
        }
        return parent::create();
    }
    
    public static function generate_ent_id() {
        $ent_id = Util::generateRandomString(rand(5, static::ADDED_ENT_ID_LENGTH));
        return static::$table_prefix . date('mdy') . $ent_id;
    }
}