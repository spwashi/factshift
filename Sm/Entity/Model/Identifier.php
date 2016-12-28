<?php
/**
 * User: Sam Washington
 * Date: 11/19/16
 * Time: 10:24 PM
 */

namespace Sm\Entity\Model;


use Sm\Core\Util;
use Sm\Development\Log;

class Identifier {
    protected $id;
    /** @var string $ent_id */
    protected $ent_id;
    /** @var  string $entity_type */
    protected $entity_type;
    /** @var string $typed_id */
    protected $typed_id = null;
    protected $r_id;
    
    /**
     * Identifier constructor.
     *
     * @param $id
     * @param $ent_id
     * @param $entity_type
     */
    public function __construct($id = null, $ent_id = null, $entity_type = null) {
        if (EntityMeta::is_ent_id($id)) {
            $ent_id = $id;
            $id     = null;
        }
        if (isset($id)) $this->setId($id);
        if (isset($ent_id)) $this->setEntId($ent_id);
        if (isset($entity_type)) $this->setEntityType($entity_type);
        $this->r_id = Util::generateRandomString(10);
    }
    
    //<editor-fold desc="Getters and Setters">
    /**
     * @return string
     */
    public function getR_Id(): string {
        return $this->r_id;
    }
    /**
     * @return int|null
     */
    public function getId() {
        return $this->id;
    }
    /**
     * @param mixed $id
     */
    public function setId($id) {
        if (!is_int($id)) {
            Log::init([ $id, EntityMeta::is_ent_id($id), substr($id, 0, 4) ])->log_it();
            return;
        }
        $this->id = $id;
        if (!$this->typed_id && $this->id) $this->setTypedId();
    }
    /**
     * @return string|null
     */
    public function getEntId() {
        return $this->ent_id;
    }
    /**
     * @param string $ent_id
     */
    public function setEntId(string $ent_id) {
        $this->ent_id = $ent_id;
    }
    /**
     * @return string|null
     */
    public function getEntityType() {
        return $this->entity_type;
    }
    /**
     * @param string $entity_type
     */
    public function setEntityType(string $entity_type) {
        $this->entity_type = $entity_type;
        if (!$this->typed_id && $this->id) $this->setTypedId();
    }
    /**
     * @return string|null
     */
    public function getTypedId() {
        return $this->typed_id;
    }
    protected function setTypedId() {
        if (!$this->entity_type || !$this->id) return;
        $this->typed_id = $this->entity_type . '|' . $this->id;
    }
    //</editor-fold>
    
}