<?php
/**
 * User: Sam Washington
 * Date: 11/24/16
 * Time: 11:31 AM
 */

namespace Sm\Iterator;


use Sm\Identifier\Identifiable;
use Sm\Identifier\UnidentifiableError;

abstract class Iterator implements \Iterator, \JsonSerializable {
    protected $position         = 0;
    protected $item_identifiers = [ ];
    protected $items            = [ ];
    
    public function length() {
        return count($this->item_identifiers);
    }
    public function locate($locate) {
        foreach ($this->items as $index => $item) {
            if ($item === $locate) return $index;
        }
        return false;
    }
    
    public function getItem($index) {
        return $this->items[ $index ] ?? null;
    }
    public function getItems($type = null) {
        return $this->items;
    }
    
    /**
     * @param Identifiable|Identifiable[]|mixed $item
     * @param null                              $index
     *
     * @throws \Sm\Identifier\UnidentifiableError
     */
    public function push(&$item, $index = null) {
        if ($item instanceof Identifiable) {
            $identifier = $index??$item->getUniqueIdentifier();
            if ($identifier === false) throw new UnidentifiableError([ "Could not identify item", $item, ]);
            if ($identifier) {
                $this->item_identifiers[]   = $identifier;
                $this->items[ $identifier ] = $item;
                return;
            }
        }
        if (is_array($item)) {
            $count = 0;
            foreach ($item as $key => $value) {
                # The key only matters if it isn't an id
                $this->push($value, $key == $count ? null : $key);
                $count++;
            }
        } else {
            $index                    = $index ?? count($this->item_identifiers);
            $this->item_identifiers[] = $index;
            $this->items[ $index ]    = $item;
        }
    }
    function rewind() {
        $this->position = 0;
    }
    function current() {
        return $this->items[ $this->item_identifiers[ $this->position ] ];
    }
    function key() {
        return $this->item_identifiers[ $this->position ];
    }
    function next() {
        ++$this->position;
    }
    function valid() {
        if (isset($this->item_identifiers[ $this->position ])) {
            $position = $this->item_identifiers[ $this->position ];
        } else return false;
        return isset($this->items[ $position ]);
    }
    
    function jsonSerialize() {
        $return_array = [ ];
        foreach ($this->item_identifiers as $position => $id) {
            $return_array[ $id ] = $this->items[ $id ];
        }
        return $return_array;
    }
    public function __toString() {
        return json_encode($this);
    }
}