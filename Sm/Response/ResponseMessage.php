<?php
/**
 * User: Sam Washington
 * Date: 12/2/16
 * Time: 5:52 PM
 */

namespace Sm\Response;


class ResponseMessage implements \JsonSerializable {
    protected $string;
    protected $localization_code;
    
    public static function init($loc_code, $string = null) {
        return new static($loc_code, $string);
    }
    public function __construct($loc_code = null, $string = null) {
        $this->localization_code = $loc_code;
        $this->string            = $string;
    }
    public function jsonSerialize() {
        return $this->string ?? '';
    }
    public function __toString() {
        return $this->string ?? '';
    }
}