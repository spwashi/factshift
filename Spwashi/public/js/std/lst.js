/**
 * Created by sam on 7/3/15.
 */
define(['jquery', 'sm_util'], function ($, u) {
    "use strict";

    //<editor-fold desc="Utility or Default">
    var no_op    = function () {};
    var _utility = {
        produceDomFromHTML:          function (string, tag_type) {
            tag_type = !!tag_type ? tag_type : 'div';
            var el;
            if (u.isElement(string)) {
                el = document.createElement(tag_type);
                el.appendChild(string);
                return el;
            } else {
                el           = document.createElement(tag_type);
                el.innerHTML = String(string);
                return el;
            }
        },
        getChildElementsByClassName: function (DOMelement, class_name) {
            if (typeof class_name != "string" || !u.isElement(DOMelement)) {
                return [];
            }
            var els = [];
            for (var i = 0; i < DOMelement.childNodes.length; i++) {
                var obj = DOMelement.childNodes[i];
                if (obj.classList.contains(class_name)) {
                    els.push(obj);
                }
            }
            return els;
        }
    };
    var defaults = {
        multi_list:       false,
        is_select:        false,
        confirm_delete:   true,
        read_only:        false,
        tag_limit:        false,
        allow_spaces:     false,
        case_sensitive:   false,
        allow_duplicates: false,
        on_tag_click:     no_op,
        on_tag_dbl_click: no_op,
        on_focus:         no_op,
        on_blur:          no_op,
        on_remove:        no_op,
        on_add:           no_op,
        container_class:  'sm-tag-lst',
        url:              false,
        values:           [],
        max_tags:         -1,
        confirm_keys:     [13],
        cache:            {
            length: 60,
            on:     false
        },
        match_field:      'text',
        id_field:         'id',
        init_from_html:   false,
        get_id:           function (item, self) {
            var id;
            if (item.toString().match(/^\s*$/))
                return;
            if (typeof item === 'object') {
                id = (self.settings.id_field in item) ? String(item[self.settings.id_field]) : item.toString();
            } else {
                id = item;
            }
            return id;
        },
        get_value:        function (item, self) {
            if (typeof item == 'string' || typeof item == 'number') {
                return item;
            } else if (typeof item == 'object' && (self.settings.match_field in item)) {
                var match = item[self.settings.match_field];
                return this.get_value(match);
            }
            return item.toString();
        }
    };
    //</editor-fold>

    /**
     * Meant to take objects or strings and represent them as a list. Also, keep track of availability
     * @param container_element
     * @param settings
     * @constructor
     */
    var Lst = function (container_element, settings) {
        if (!container_element) {return;}
        /** @type {HTMLElement}     */
        this.container_element = null;
        this.tag_holder        = null;
        this.content           = {};
        this.cache             = {};
        this.settings          = defaults;
        this.duplicate_ids     = {};
        this.values            = [];
        this.focused_id        = false;
        this.delete_once       = false;
        this.backspace_once    = false;
        //////////////////////////////////////////////////////////////////////////////
        //JQ
        this.container_element = u.isElement(container_element) ? container_element : $(container_element)[0];
        var self               = this;
        this.tag_holder        = this.container_element.querySelector('ul.container');
        this.result_display    = this.container_element.querySelector('ul.reveal');
        var input              = this.container_element.getElementsByTagName('input');
        if (!!input) { this.initAdder(input[0] || null); }

        //////////////////////////////////////////////////////////////////////////////

        if (!!settings && typeof settings == 'object') {
            this.settings = u.merge_objects(this.settings, settings);
        }

        if (this.tag_holder) {
            var child_nodes = this.tag_holder.getElementsByTagName('li');
            if (typeof this.settings.init_from_html == 'function') {
                this.settings.init_from_html(child_nodes, self);
            } else if (!!this.settings.init_from_html) {
                for (var i = 0; i < child_nodes.length; i++) {
                    var obj = child_nodes[i];
                    if ('lstId' in obj.dataset) {
                        var id                             = obj.dataset.lstId;
                        var add_obj                        = {};
                        add_obj[this.settings.match_field] = obj.innerHTML;
                        add_obj[this.settings.id_field]    = id;
                        obj.parentNode.removeChild(obj);
                        this.add(add_obj);
                        if (u.hasClass(obj, 'highlight')) {
                            this.focused_id = id;
                        }
                    }
                }
            }
        }
        this.values = this.settings.values;
    };

    //<editor-fold desc="Unimplemented, meant for option display">
    /**
     * Retrieve results from a get request to the url provided, produce a display of the results once successful;
     * Not good.
     * fixme
     * @param q
     * @returns {boolean}
     */
    Lst.prototype.pull = function (q) {
        if (!this.settings.url) {
            return false;
        }
        var self = this;
        //JQ
        $.ajax({
            url:     this.settings.url,
            data:    q,
            success: function (data) {
                self.values = data;
                self.produce(data);
            }
        });
    };

    /**
     * Display a list of the results from a pull (or from previously entered values cached in this.values.
     * Not good
     * fixme
     */
    Lst.prototype.produce = function () {
        var data = this.values;
        var rev  = this.result_display;
        if (!rev) {
            return;
        }
        rev.style.display = 'block';
        rev.innerHTML     = '';
        for (var obj in data) {
            if (!data.hasOwnProperty(obj)) {
                continue;
            }
            var add         = String(data[obj]);
            var child       = document.createElement('li');
            child.innerHTML = add;
            rev.appendChild(child);
        }
    };

    /**
     * Hide the display of list values
     */
    Lst.prototype.hide_display = function () {
        var rev = this.result_display;
        if (!rev) {
            return;
        }
        rev.innerHTML     = '';
        rev.style.display = 'none';
    };

    /**
     * If there is an input field that could be used to send info to the pull function, initialize it
     * @param element
     */
    Lst.prototype.initAdder = function (element) {
        var self = this;
        if (!element || !this.container_element) return;
        if (!u.isElement(element)) {
            element = this.container_element.querySelector(element.toString());
        }

        element.addEventListener('keyup', function (e) {
            if (self.settings.confirm_keys.indexOf(e.keyCode) != -1 && self.add(element.value)) {
                element.value = '';
            }
        });
        element.addEventListener('focus', function (e) {
            if (self.settings.url) {
                self.pull();
            } else {
                self.produce();
            }
        });
    };
    //</editor-fold>

    //<editor-fold desc="Manage Item Representations">
    Lst.prototype.get_id = function (item) {
        return this.settings.get_id(item, this);
    };

    /**
     * When presented with an object representation of an item or its id, return the ID of the element
     * @param item_or_id
     * @returns {*}
     */
    Lst.prototype.convert_to_id = function (item_or_id) {
        var id;
        if (typeof item_or_id == 'object') {
            id = this.get_id(item_or_id, this);
            if (id === false || !id in this.content) {
                return false;
            }
        } else {
            id = String(item_or_id);
            if (!item_or_id in this.content) {
                return false;
            }
        }
        return id;
    };

    Lst.prototype.toString = function () {
        var arr = [];
        for (var i = 0; i < this.content.length; i++) {
            var item = this.content[i];
            if (typeof item == 'object' && this.settings.match_field in item) {
                var match_setting = this.settings.match_field;
                arr.push(item[match_setting]);
            }
        }
        arr.join(', ');
    };
    //</editor-fold>

    //<editor-fold desc="Manage List Items">
    /**
     * Add an item to the list
     * @param item The item to add to the list
     * @param position Position to add the item in the list. Defaults to the end
     * @returns {boolean} Success?
     */
    Lst.prototype.add = function (item, position) {
        var id;
        id = this.get_id(item, this);
        //if we cannot get the id of the item, don't add the item to the list (no index to identify it)
        if (id === false) return false;
        id = String(id);
        //if the id is already in the content, ocus on that element if we allow duplicates. Otherwise, do nothing
        if (id in this.content) {
            if (!!this.settings.allow_duplicates) {
                this.duplicate_ids[id] = (id in this.duplicate_ids) ? ++this.duplicate_ids[id] : 1;
                this.focus(id);
                return true;
            } else {
                return false;
            }
        } else {
            //Try to create the HTML tag that will be added to the DOM
            var tag = this.create_tag(item, id);
            if (!!tag && typeof tag == 'object' && 'dataset' in tag) {
                tag.dataset.lstId = id;
                if (this.tag_holder) {
                    if (!!position || position === 0) {
                        this.append_tag(tag, position, true)
                    } else {
                        this.tag_holder.appendChild(tag);
                    }
                    this.content[id] = item;
                }
            }
            //Run a user-set function on the completion of the add
            this.settings.on_add(item, this);
            //If the add was successful, return true
            if (id in this.content) {
                return true;
            }
        }
        //return false because there was some sort of an error
        return false;
    };

    /**
     * Locate all elements that are a part of the list, return an object or array of them
     * @param [as_arr=false] {boolean} If the user wants to iterate through the list as a 0-indexed array, set this to true
     * @returns {*}
     */
    Lst.prototype.find_all_tags = function (as_arr) {
        as_arr          = !!as_arr;
        var tags        = as_arr ? [] : {};
        var search_area = this.tag_holder;
        if (!search_area) {
            return tags;
        }
        for (var i = 0; i < search_area.childNodes.length; i++) {
            var obj = search_area.childNodes[i];
            if ('dataset' in obj && 'lstId' in obj.dataset) {
                if (obj.dataset.lstId in this.content) {
                    if (!as_arr)
                        tags[obj.dataset.lstId] = obj;
                    else
                        tags.push(obj);
                }
            }
        }
        return tags;
    };

    /**
     * Add a tag to the DOM at a specified position
     * @param tag {HTMLElement} The tag to add to the DOM
     * @param position {int} The location to append the tag
     * @param [before=false] {boolean} Do you want to add the tag before or after the element at the index?
     */
    Lst.prototype.append_tag = function (tag, position, before) {
        before = !!before;
        if (typeof position == 'number') {
            if (position >= this.content.length) {
                this.tag_holder.appendChild(tag);
            } else {
                var element_list = this.find_all_tags(true);
                if (element_list.length == 0 || !(position in element_list)) {
                    this.tag_holder.appendChild(tag);
                    return;
                }
                var referenceNode = element_list[position];
                if (!before)
                    referenceNode.parentNode.insertBefore(tag, referenceNode.nextSibling);
                else
                    referenceNode.parentNode.insertBefore(tag, referenceNode);
            }
        } else {
            this.tag_holder.appendChild(tag);
        }
    };

    /**
     * Find the HTMLElement representation of the list item with id ___
     * @param id The id to search for
     * @returns {null|HTMLElement}
     */
    Lst.prototype.find_html_tag = function (id) {
        if (!(id in this.content)) {
            return null;
        }
        var data_lst_ids = this.container_element.querySelector('ul > [data-lst-id="' + id + '"]');

        return !data_lst_ids ? null : data_lst_ids;

    };

    /**
     * Create a DOM representation of an item
     * @param item The item to represent as an element
     * @param id The lst-id to give to the tag
     * @param additional_class_string {string=}
     * @returns {*}
     */
    Lst.prototype.create_tag = function (item, id, additional_class_string) {
        var self  = this;
        var value = this.settings.get_value(item, self);
        if (!value) return false;
        var element     = _utility.produceDomFromHTML(value, 'li');
        if (!!element && !!id) {
            element.dataset.lstId = id;
        }
        u.addClass(element, 'lst-tag');
        element.onclick = function (e) {
            self.settings.on_tag_click(item, self, e);
            self.focus(item);
        };

        element.ondblclick = function (e) {
            self.settings.on_tag_dbl_click(item, self, e);
        };
        return element;
    };

    /**
     * Remove an item from the Lst, destroy the element on success
     * @param key
     * @returns {boolean}
     */
    Lst.prototype.remove = function (key) {
        var node = this.find_html_tag(this.convert_to_id(key));
        if (!node) {
            return true;
        }
        //Run the optionally set on_remove callback. If this function returns false, don't delete the list ite
        if (this.settings.on_remove(this.content[key], this) === false) return false;
        //remove the node from the DOM
        var removed_node = node.parentNode.removeChild(node);
        if ('dataset' in node && 'lstId' in node.dataset && removed_node.dataset.lstId == key) {
            if (this.settings.allow_duplicates && key in this.duplicate_ids && --this.duplicate_ids[key] <= 0) {
                delete this.duplicate_ids[key];
            } else {
                delete this.content[key];
            }
        }
        this.blur(key);
        //focus on the next available entry
        for (var obj in this.content) {
            if (this.content.hasOwnProperty(obj)) {
                this.focus(this.content[obj]);
                break;
            }
        }
        return true;
    };
    //</editor-fold>

    //<editor-fold desc="Manage Item Focus">
    /**
     * Add focus to an item in the list
     * @param item_or_id The item to add focus to- specify id or provide actal object
     * @returns {*}
     */
    Lst.prototype.focus = function (item_or_id) {
        var id = this.convert_to_id(item_or_id);
        if (!id || id == this.focused_id) return false;
        if (this.tag_holder) {
            var other = this.tag_holder.querySelectorAll('.highlight');
            if (other.length) {
                for (var i = 0; i < other.length; i++) {
                    var obj = other[i];
                    this.blur(obj.dataset.lstId);
                }
            }
        }

        var el          = this.find_html_tag(id);
        if (!el) return false;
        this.settings.on_focus(this.content[id], this);
        this.focused_id = id;
        return u.addClass(el, 'highlight');

    };

    /**
     * Remove focus from an item
     * @param item_or_id
     * @returns {boolean}
     */
    Lst.prototype.blur = function (item_or_id) {
        var id = this.convert_to_id(item_or_id);
        if (!id) return false;
        if (this.focused_id != id) {return false;}
        var el          = this.find_html_tag(id);
        if (!el) return false;
        this.settings.on_blur(this.content[id], this);
        this.focused_id = false;
        u.removeClass(el, 'highlight');
    };

    /**
     * Get the ID of the focused item
     * @returns {boolean|string|*|id}
     */
    Lst.prototype.get_focused_item_id = function () {
        return this.focused_id;
    };

    /**
     * Retrieve an item from the list by specifying either the item or the ID
     * @param item_or_id
     * @returns {*}
     */
    Lst.prototype.get_item = function (item_or_id) {
        var id = this.convert_to_id(item_or_id);
        if (!id || !(id in this.content)) return false;
        return this.content[id];
    };
    //</editor-fold>

    return Lst;
});