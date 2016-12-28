<?php
/**
 * User: Sam Washington
 * Date: 12/2/16
 * Time: 11:55 PM
 */

namespace Sm\Action\Abstraction;


use Sm\Response\Response;

class ModifyActionResponse extends Response {
    protected $data               = [ ];
    protected $Resource;
    protected $changed_attributes = [
        'success'  => [ ],
        'failed'   => [ ],
        'adjusted' => [ ],
    ];
    public function getData() {
        return array_merge([ 'changed_attributes' => $this->changed_attributes ], (array)$this->data, [ 'entity' => $this->Resource ]);
    }
    public function getResource() {
        return $this->Resource;
    }
    public function setResource($Entity) {
        $this->Resource = $Entity;
    }
    public function setChangedAttributes(array $changed_attributes) {
        if (is_array($changed_attributes)) {
            $this->changed_attributes = array_merge($this->changed_attributes, $changed_attributes);
        }
    }
    
    public function getErrors($strict = true) {
        $errors = parent::getErrors($strict);
        return is_array($errors) ? array_merge($errors, $this->getFailedAttributes(), $this->getAdjustedAttributes()) : $errors;
    }
    
    
    public function getSuccessfulEdits() {
        return $this->changed_attributes['success'];
    }
    public function getFailedAttributes() {
        return $this->changed_attributes['failed'];
    }
    public function getAdjustedAttributes() {
        return $this->changed_attributes['adjusted'];
    }
}