<?php
/**
 * User: Sam Washington
 * Date: 4/2/2015
 * Time: 2:06 PM
 */

namespace Sm\Output;

use Sm\Response\Http;
use Sm\Response\JsonResponse;
use Sm\View\Abstraction\View;

class Output extends Abstraction\Output {
    public function process($output_data) {
        if ($output_data instanceof View) {
            header("Cache-Control: no-cache, must-revalidate"); //HTTP 1.1
            header("Pragma: no-cache"); //HTTP 1.0
            header("Expires: Sat, 26 Jul 1997 05:00:00 GMT"); // Date in the past
            $content = Http::init($output_data->getContent(true))->setContentType($output_data->getContentType());
        } elseif ($output_data instanceof Http) {
            $content = $output_data;
        } elseif (is_string($output_data) || is_numeric($output_data)) {
            $content = Http::init($output_data);
        } elseif (is_array($output_data) || is_bool($output_data) || (is_object($output_data) && $output_data instanceof \JsonSerializable)) {
            $content = JsonResponse::init($output_data);
        } elseif (is_array($output_data) || is_bool($output_data)) {
            $content = JsonResponse::init($output_data);
        } else {
            $content = Http::init('');
        }
        
        return $content;
    }
}