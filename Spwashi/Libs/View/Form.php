<?php
/**
 * User: Sam Washington
 * Date: 12/5/15
 * Time: 3:52 PM
 */

namespace Spwashi\Libs\View;

use Sm\View\View;

class Form extends View {
    public static function generate($form_details = [], $input_details = []) {
        $form_class        = isset($form_details['class']) ? $form_details['class'] : 'aligned';
        $form_method       = isset($form_details['method']) ? $form_details['method'] : 'post';
        $form_action       = isset($form_details['action']) ? $form_details['action'] : '';
        $form_id           = isset($form_details['id']) ? $form_details['id'] : false;
        $form_autocomplete = isset($form_details['autocomplete']) ? $form_details['autocomplete'] : 'off';
        $view              = View::create('templates/form.html')->addFeature([
                                                                                 'class'        => $form_class,
                                                                                 'autocomplete' => $form_autocomplete,
                                                                                 'id'           => $form_id,
                                                                                 'action'       => $form_action,
                                                                                 'method'       => $form_method
                                                                             ]);
        if (!empty($input_details)) {

        }
    }
}