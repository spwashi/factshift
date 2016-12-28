<?php
/**
 * User: Sam Washington
 * Date: 3/21/2015
 * Time: 7:07 PM
 */

namespace Sm\View;

use Sm\Core\App;
use Sm\Core\Util;

/**
 * Class View
 ** A class useful for creating views that are either based on files or just plain text
 *
 * @package Sm\View
 */
class View extends Abstraction\View {
    protected $errors   = [ ];
    protected $optional = [ ];
#
    public function __construct($content = '') {
        if ($content instanceof View) {
            $this->content = $content->getContent();
        } else {
            $this->content = $content;
        }
        if (is_array($this->content) || $this->content instanceof \JsonSerializable) {
            $this->content_type = 'json';
        } else {
            $this->content_type = 'html';
        }
    }
    
    public function getContent($is_final = false) {
        foreach ($this->errors as $error_name => $message) {
            if (is_string($message) && is_string($this->content))
                $this->content = $error_name === 0 ? str_replace('{{message}}', $message, $this->content) : str_replace("{{message_{$error_name}}}", $message, $this->content);
        }
        foreach ($this->optional as $error_name => $message) {
            $this->content = str_replace("{{o_{$error_name}}}", (string)$message, $this->content);
        }
        
        $replace = [ '{{title}}', '{{subtitle}}', '{{site_title_short}}', '{{site_title}}' ];
        $values  = [ $this->title, $this->subtitle, App::_()->site_title_short, App::_()->site_title ];
        if ($is_final && is_string($this->content)) {
            $this->content = str_replace($replace, $values, $this->content);
            $this->content = preg_replace('-\{\{message_*[^\}]*\}\}-', '', $this->content);
            $this->content = preg_replace('-\{\{o_*[^\}]*\}\}-', '', $this->content);
        }
        if (is_array($this->content)) {
            return json_encode($this->content);
        } elseif ($this->content instanceof \JsonSerializable) {
            return (json_encode($this->content));
        } else {
            return (string)$this->content;
        }
    }
    
    public function insertContentCreate($content_path, $location = '{{content}}', $is_in_view_path = true) {
        $this->insertContent(static::create($content_path, [ ], $is_in_view_path), $location);
        return $this;
    }
    
    /**
     * Wrap the content with something, usually a tag
     *
     * @param string $start_wrap              What to begin the wrap with (e.g. <b>)
     * @param string $end_wrap                What to end the wrap with (e.g. </b>)
     * @param string $where_to_start_the_wrap Where to begin wrapping (unimplemented)
     * @param string $where_to_end_the_wrap   Where to end the wrapping (unimplemented)
     *
     * @return $this
     */
    public function wrap($start_wrap, $end_wrap = null, $where_to_start_the_wrap = null, $where_to_end_the_wrap = null) {
        if ($where_to_start_the_wrap == null && $where_to_end_the_wrap == null) {
            $this->content = $start_wrap . $this->content . $end_wrap;
        }
        
        return $this;
    }
    
    public function addMessages($name) {
        if (!is_array($name)) return $this;
        foreach ($name as $key => $value) {
            $this->errors[ $key ] = Util::can_be_string($value) ? (string)$value : '';
        }
        return $this;
    }
    
    public function addFeature($name, $value = null) {
        if (!is_array($name)) {
            if (isset($value)) {
                $name = [ $name => $value ];
            } else {
                return $this;
            }
        }
        foreach ($name as $key => $value) {
            $this->optional[ $key ] = $value;
        }
        return $this;
    }
}