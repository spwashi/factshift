<?php
/**
 * User: Sam Washington
 * Date: 12/1/16
 * Time: 11:50 PM
 */

namespace Factshift\Entity\Validation;


use Factshift\Entity\Model\PageModel;
use Factshift\Entity\Validation\Abstraction\EntityValidator;
use Sm\Entity\Model\ModelNotFoundException;
use Sm\Response\Response;
use Sm\Response\ResponseMessage;
use Sm\Validation\Abstraction\Validator;

class PageValidator extends EntityValidator {
    static $entity_type = 'Page';
    const MAX_DESCRIPTION_LENGTH = 750;
    const MAX_ALIAS_LENGTH       = 20;
    const MIN_ALIAS_LENGTH       = 1;
    const MIN_TITLE_LENGTH       = 1;
    
    public static function validate_description(&$proposed_content) {
        return static::_validate_string($proposed_content, 0, static::MAX_DESCRIPTION_LENGTH);
    }
    public function validate_alias(&$proposed_alias) {
        $Response = static::_validate_string($proposed_alias, static::MIN_ALIAS_LENGTH, static::MAX_ALIAS_LENGTH);
        if ($Response instanceof Response) return $Response;
        $matches = [ ];
        preg_match('/[^a-zA-Z-_\s0-9]/', $proposed_alias, $matches);
        if (!empty($matches)) return new Response(ResponseMessage::init(null, "Alias {$proposed_alias} contains invalid characters"), Validator::VALIDATION_FAIL);
        try {
            $User = PageModel::find([ 'alias' => $proposed_alias ]);
            if ($this->purpose === Validator::PURPOSE_CREATE || $User->get('ent_id') !== $this->Resource->ent_id)
                return new Response(ResponseMessage::init(Validator::E_UNAVAILABLE, "There is already an account with that username"), Validator::VALIDATION_FAIL);
        } catch (ModelNotFoundException $e) {
            return true;
        } catch (\Exception $e) {
        }
        return true;
    }
}