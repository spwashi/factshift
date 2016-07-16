<?php
/**
 * User: Sam Washington
 * Date: 3/21/2015
 * Time: 7:08 PM
 */

namespace Sm\View\Abstraction;

use Sm\Core\App;
use Sm\Core\Util;
use Sm\Development\Log;

/**
 * Class View
 * ~ A class to provide a more controlled method of generating page output. Levels of Abstraction take away a lot of repetition and add flexibility to web output.
 *
 * @package Sm\View\Abstraction
 */
abstract class View {
    /** @var  string $type */
    protected $type         = 'html';
    protected $cachable     = false;
    protected $cache_length = 600;
    protected $content;
    protected $template;
    protected $title        = null;
    protected $subtitle     = null;
    protected $site_title   = null;

    public function __toString() {
        return $this->getContent();
    }

    abstract public function __construct($content = null);

    /**
     * Set the actual headers (via header()) for the view
     *
     * @return mixed
     */
    abstract public function makeHeaders();

    /**
     * Shortcut for initialization
     *
     * @param null $content
     *
     * @return static
     */
    public static function init($content = null) {
        return new static($content);
    }

    /**
     * Create a view based on a pre-existing file. This will get overridden by other types later (like if you want to include a JSON file or something like that)
     *
     * @param string $path            The path to the file to be included. Could be an HTML or PHP file- just include the extension
     * @param array  $data            Any variables that must be included for the file to operate correctly. Must be in a key=>value type map with indices matching the name of the variable.
     * @param bool   $is_in_view_path If the view is not going to be in the app-specified view path (like if we are using a view from another app or location) mark this as false to flag the path as
     *                                absolute
     *
     * @return static
     */
    static public function create($path, $data = [], $is_in_view_path = true) {
        $view = new static(null);
        $p    = App::getPathDecision(App::USE_APP_VIEW_PATH, $is_in_view_path);
        $path = $p . $path;
        ob_start();
        $result = Util::includeWithVariables($path, $data, false, false);
        if ($result === 1) {
            $content = ob_get_clean();
        } else {
            $content = $result;
            ob_clean();
        }
        $view->setContent($content);

        return $view;
    }

    /**
     * View content getter
     *
     * @param $is_final
     *
     * @return mixed
     */
    public function getContent($is_final = false) {

        if (is_array($this->content)) {
            return json_encode($this->content);
        } elseif ($this->content instanceof \JsonSerializable) {
            return (json_encode($this->content));
        } else {
            return (string)$this->content;
        }
    }

    /**
     * View content setter
     *
     * @param mixed $content The content to add
     * @return $this
     */
    public function setContent($content) {
        if (is_array($content)) {
            $this->type = 'json';
        }
        $this->content = $content;
        return $this;
    }

    /**
     * This takes the current content of the view, and places it where the Template can accept it. By default, the place to add the content is in a {{content}} style tag (and as of right now, this
     * cannot be changed).
     ** Grab the template file
     ** Add the current view content where the {{content}} in the template is designated if there is such a location, otherwise append it.
     *
     * @param string $template_or_view    The template to use (Could be PHP, HTML, doesn't matter)
     * @param bool   $is_in_template_path Says whether or not the template file is in the standard Template path. If it is, only a relative file path has to be used. Otherwise, the absolute path will
     *                                    be assumed to be used.
     * @param string $location_to_add     Where to add the content in the template (defaults to being in the {{content}} location)
     *
     * @return $this
     *
     */
    public function enforceTemplate($template_or_view, $is_in_template_path = true, $location_to_add = '{{content}}') {
        $content        = $this->content;
        $template_value = 1;
        if (!($template_or_view instanceof View)) {
            if ($is_in_template_path) {
                $template_or_view = App::_()->template_path . $template_or_view;
            }
            ob_start();
            try {
                $template_value = Util::includeWithVariables($template_or_view, [], true, false);
            } catch (\Exception $e) {
                $msg = $e->getMessage();
                Log::init("Error includeWithVariables: {$msg} -- {$template_or_view}", debug_backtrace()[0], 'log')->log_it();
                return $this;
            }
            $get_clean      = ob_get_clean();
            $template_value = $template_value === 1 ? $get_clean : $template_value;
            $this->setContent($template_value);
        } else {
            $this->setContent($template_or_view->getContent());
        }
        $location = strpos($this->content, $location_to_add) !== false && $content != '' ? $location_to_add : null;
        $this->insertContent($content, $location);

        return $this;
    }

    /**
     * Add content to a view. Either insert it into a location (replace some sort of marker with the content to add) or just append it to the end.
     * If the content to add is an array and the content being added to is a string, assume that we are adding multiple values in multiple locations.
     *      ==> ['{{header}}'=>'header string', '{{page_title}}'=> 'This is a page title']
     * If they are incompatible types, just ignore the request (maybe this should throw an error?)
     *
     * @param View|string|array $content_to_add The content to add. Either an array to be merged, a view whose content should be added, or a string.
     * @param string            $location       Where to add the content. If the location is set to '{{END}}', the content will be appended
     *
     * @return $this
     * @todo figure out some way to manage arrays. For now, if the content that is being added to is an array, nothing happens
     */
    public function insertContent($content_to_add, $location = '{{content}}') {

        #If the content we're adding comes from a view, get that content
        $content_to_add = $content_to_add instanceof View ? $content_to_add->getContent() : $content_to_add;

        #Some special cases
        #   If this content is a string but the other content is an array, we're probably trying to populate something like
        #       a template. Iterate through the array as a key=>value thing, and replace values that come up.
        #   Otherwise, if either one of the contents are not strings, don't do anything.
        if (is_string($this->content) && is_array($content_to_add)) {
            $replace_array = [];
            foreach ($content_to_add as $key => $value) {
                if (is_numeric($key)) continue;
                if (is_string($value)) {
                    $replace_array[$key] = $value;
                } elseif ($value instanceof View) {
                    $this->insertContent($value);
                }
            }
        } elseif (!is_string($this->content) || !is_string($content_to_add)) {
            return $this;
        }

        #From here on out, we're going to assume that both the original content
        #if the location to add is === to {{END}}, we're just going to append the content
        if ($location === '{{END}}') {
            $this->content = isset($this->content) ? $this->content . $content_to_add : $content_to_add;
        } else {
            #Otherwise, just replace one string with another
            $this->content = isset($this->content) ? $this->content : '';
            $this->content = str_replace($location, $content_to_add, $this->content);
        }
        return $this;
    }

    /**
     * Set the name with which the file should be downloaded
     *
     * @param mixed $title
     *
     * @param       $secondary_title
     *
     * @return static
     */
    public function setTitle($title, $secondary_title = null) {
        $this->title    = $title;
        $this->subtitle = $secondary_title;
        return $this;
    }

}