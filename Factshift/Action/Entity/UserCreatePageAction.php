<?php
/**
 * User: Sam Washington
 * Date: 12/4/16
 * Time: 1:05 AM
 */

namespace Factshift\Action\Entity;


use Factshift\Core\Factshift;
use Factshift\Entity\Dimension;
use Factshift\Entity\Page;
use Factshift\User\AppUser;
use Sm\Action\Create\CreateActionResponse;
use Sm\Development\Log;
use Sm\Entity\Action\Create\CreateEntityAction;
use Sm\Response\ResponseMessage;

class UserCreatePageAction extends CreateEntityAction {
    /** @var  Page $data */
    protected $data;
    /** @var  Page $Victim */
    protected $Victim;
    /** @var  AppUser $Actor */
    protected $Actor;
    public function execute() {
        $Page              =& $this->Victim;
        $User              =& $this->Actor;
        $Page->context     = $User->alias;
        $this->data->alias = Page::generateAlias($this->data->title, $this->data->subtitle);
        $success           = $this->validate()->getStatus(true);
        
        if (!$success) return $this->getResponse();
################################################
        $CreatePageResponse = $this->Victim->receiveCreateAction($this);
        if (!$CreatePageResponse->getStatus(true)) return $CreatePageResponse;
################################################
        $StandardFirstDimension  = new Dimension;
        $CreateDimensionResponse =
            $this
                ->Actor
                ->initCreateActionAsActor($StandardFirstDimension,
                                          [
                                              'title'       => 'Overview',
                                              'description' => 'Standard information about this concept',
                                          ])
                ->execute();
################################################
        if (!$CreateDimensionResponse->getStatus()) return $CreateDimensionResponse;
        Log::init($StandardFirstDimension)->log_it();
        try {
            $relationship_model_type = Factshift::_()->IoC->EntityMeta->convert_linked_entities_to_model_type([ $Page, $StandardFirstDimension ]);
            $Map                     = Factshift::_()->IoC->EntityMeta->model_type_to_class($relationship_model_type);
            $Map->set([ 'dimension_role' => 1, 'position' => 1 ]);
            $Relationship = $Page->relateEntity('dimensions', $StandardFirstDimension, $Map);
            if ($Relationship) return $User->initCreateActionAsActor($Relationship, $Relationship)->execute();
        } catch (\Exception $e) {
            Log::init($e)->log_it();
        }
        return new CreateActionResponse(ResponseMessage::init(null, "Could not create all necessary page components. The page has been created."), null, $CreatePageResponse->getData());
    }
}