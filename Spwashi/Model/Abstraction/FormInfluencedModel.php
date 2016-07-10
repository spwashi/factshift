<?php
/**
 * User: sam
 * Date: 7/13/15
 * Time: 1:46 PM
 */

namespace Spwashi\Model\Abstraction;

use Sm\Form\Form;

/**
 * Interface FormInfluencedModel
 * Denotes that the class can be influenced by a form
 *
 * @deprecated This is not a great idea- Models should not be responsible for form handling
 * @package    Spwashi\Model\Abstraction
 */
interface FormInfluencedModel {
    public function processFormValues(Form $F, $skip = []);
}