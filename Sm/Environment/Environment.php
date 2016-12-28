<?php
/**
 * User: Sam Washington
 * Date: 12/3/16
 * Time: 5:17 PM
 */

namespace Sm\Environment;


class Environment implements \JsonSerializable {
    const ENV_DEV        = 1;
    const ENV_STAGING    = 2;
    const ENV_PRODUCTION = 3;
    
    const EP_MANUAL    = 'manual';
    const EP_API       = 'api';
    const EP_FRONT_END = 'front_end';
    
    protected $entry_point;
    protected $dev_status = Environment::ENV_DEV;
    /**
     * Environment constructor.
     *
     * @param     $entry_point
     * @param int $development_status
     */
    public function __construct($entry_point, $development_status = Environment::ENV_PRODUCTION) {
        $this->entry_point = $entry_point;
        $this->dev_status  = $development_status;
    }
    /**
     * @return mixed
     */
    public function getEntryPoint() {
        return $this->entry_point;
    }
    public function getDevStatus() {
        return $this->dev_status;
    }
    /**
     * @param mixed $entry_point
     */
    public function setEntryPoint($entry_point) {
        $this->entry_point = $entry_point;
    }
    /**
     * Set the development status of the environment
     *
     * @param $dev_status
     *
     * @return $this
     */
    public function setDevStatus($dev_status) {
        $this->dev_status = $dev_status;
        return $this;
    }
    
    public function jsonSerialize() {
        return [
            '_object_type' => 'Context',
            'ep'           => $this->entry_point,
        ];
    }
}