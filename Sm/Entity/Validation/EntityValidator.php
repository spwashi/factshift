<?php
/**
 * User: Sam Washington
 * Date: 12/2/16
 * Time: 7:32 PM
 */

namespace Sm\Entity\Validation;


use Sm\Core\App;
use Sm\Entity\Abstraction\Entity;
use Sm\Entity\Model\Abstraction\Model;
use Sm\Entity\Model\EntityMeta;
use Sm\Environment\Environment;
use Sm\Response\Response;
use Sm\Response\ResponseMessage;
use Sm\Validation\Abstraction\Validator;

class EntityValidator extends Validator {
    protected $_validating_properties = [ ];
    protected $resultant_properties   = [ ];
    ##
    protected $validated_okay      = [ ];
    protected $validated_errors    = [ ];
    protected $validated_corrected = [ ];
    protected $validated_not_set   = [ ];
    ##
    protected        $Resource            = null;
    protected static $entity_type         = null;
    protected        $required_attributes = null;
    protected        $allowed_attributes  = null;
    
    public static function init(Entity $entity = null) {
        return new static($entity);
    }
    public function __construct(Entity $entity = null) {
        $this->Resource            = $entity;
        $this->required_attributes = $this->required_attributes ?? [ ];
        try {
            /** @var Environment $environment */
            $environment        = App::_()->Environment;
            $environment_is_api = $environment->getEntryPoint() === Environment::EP_API;
            $entity_type        = static::$entity_type ? static::$entity_type : ($this->Resource ? $this->Resource->getEntityType() : null);
            if ($environment_is_api)
                $this->allowed_attributes = EntityMeta::get_entity_type_properties($entity_type, EntityMeta::FIND_API_SETTABLE);
        } catch (\Exception $e) {
        }
    }
    public function setAttributes($attributes) {
        if ($attributes instanceof Entity) {
            $attributes = $attributes->getAttributes();
        } else if (!is_array($attributes)) {
            $attributes = [ ];
        }
        $this->_validating_properties = $attributes;
        return $this;
    }
    public function setPurpose($purpose) {
        $res = parent::setPurpose($purpose);
        $this->initRequirements();
        return $res;
    }
    public function initRequirements() {
        return $this->required_attributes = $this->required_attributes ?? [ ];
    }
    public function getSuccesses() {
        return $this->resultant_properties;
    }
    public function getNotSet() {
        return $this->validated_not_set;
    }
    public function getSoftErrors() {
        return $this->validated_corrected;
    }
    public function getErrors() {
        return $this->validated_errors;
    }
    
    
    public function setRequiredAttributes(array  $required_attributes) {
        $this->required_attributes = $required_attributes;
    }
    public function setAllowedAttributes(array  $allowed_attributes) {
        $this->allowed_attributes = $allowed_attributes;
    }
    
    
    public function validate($attributes = null) : Validator {
        $corrected_properties = [ ];
        if (is_array($attributes)) {
            $this->_validating_properties = $attributes;
        } else if ($attributes instanceof Entity || $attributes instanceof Model) {
            $this->_validating_properties = $attributes->getAttributes();
        }
        foreach ($this->_validating_properties as $index => $property) {
            if (!method_exists($this, "validate_{$index}")) {
                $this->validated_not_set[ $index ] = new Response(ResponseMessage::init(null, "Unable to set property."), null);
            } else if ($this->allowed_attributes && (!in_array($index, $this->allowed_attributes))) {
                $this->validated_not_set[ $index ] = new Response(ResponseMessage::init(null, "Cannot set property."), false);
            } else {
                $result = call_user_func_array([ $this, "validate_{$index}" ], [ &$property ]);
                if ($result === true) {
                    $this->validated_okay[]         = $index;
                    $corrected_properties[ $index ] = $property;
                } else if ($result instanceof Response) {
                    $success = $result->getStatus();
                    if ($success === null) {
                        $this->validated_corrected[ $index ] = $result;
                        $corrected_properties[ $index ]      = $result->getData();
                    } else if ($success === Validator::VALIDATION_NOT_SET) {
                        $this->validated_not_set[ $index ] = $result;
                    } else if ($success === Validator::VALIDATION_FAIL) {
                        $this->validated_errors [ $index ] = $result;
                    }
                }
            }
        }
        $required_attributes = $this->required_attributes ?? [ ];
        foreach ($required_attributes as $attr) {
            if (!isset($corrected_properties[ $attr ]) && !isset($this->validated_errors[ $attr ])) {
                $message                         =
                    ($this->validated_not_set[ $attr ] ?? false)
                        ? $this->validated_not_set[ $attr ]
                        : ResponseMessage::init(null, "Could not set property");
                $this->validated_errors[ $attr ] = new Response($message, Validator::VALIDATION_FAIL);
            }
        }
        $this->resultant_properties = $corrected_properties;
        return $this;
    }
    
    public function validate_id(&$proposed_id) {
        if (!$proposed_id || empty($proposed_id)) return null;
        return static::_validate_numeric($proposed_id);
    }
    public function validate_ent_id(&$proposed_ent_id) {
        return new Response(ResponseMessage::init(null, "Could not set property"), Validator::VALIDATION_NOT_SET);
    }
}