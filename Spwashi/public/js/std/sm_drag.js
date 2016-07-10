/**
 * Created by Sam Washington on 11/27/15.
 */
'use strict';


if (typeof global === "undefined") {var global = typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};}
//-------------------------------------------------------------------------------------------------------------------------------------------------------
define(['Emitter', 'jquery', 'crossvent', 'sm_util'], function (Emitter, $, crossvent, u) {
    var doc             = document;
    var body            = doc.body;
    var documentElement = doc.documentElement;


    var $html_body               = $('html, body');
    var $_window                 = $(window);
    var pn_touch                 = function (el, op, type, fn) {
        var touch     = {
            mouseup  : 'touchend',
            mousedown: 'touchstart',
            mousemove: 'touchmove'
        };
        var microsoft = {
            mouseup  : 'MSPointerUp',
            mousedown: 'MSPointerDown',
            mousemove: 'MSPointerMove'
        };
        if (global.navigator.msPointerEnabled) {
            crossvent[op](el, microsoft[type], fn);
        }
        crossvent[op](el, touch[type], fn);
        crossvent[op](el, type, fn);
    };
    var get_event_host           = function (e) {
        // on touchend event, we have to use `e.changedTouches`
        // see http://stackoverflow.com/questions/7192563/touchend-event-properties
        // see https://github.com/bevacqua/dragula/issues/34
        if (e.targetTouches && e.targetTouches.length) {
            return e.targetTouches[0];
        }
        if (e.changedTouches && e.changedTouches.length) {
            return e.changedTouches[0];
        }
        return e;
    };
    var get_coordinate           = function (coordinate, e) {
        var host    = get_event_host(e);
        var missMap = {
            pageX: 'clientX', // IE8
            pageY: 'clientY' // IE8
        };
        if (coordinate in missMap && !(coordinate in host) && missMap[coordinate] in host) {
            coordinate = missMap[coordinate];
        }
        return host[coordinate];
    };
    var get_element_behind_point = function (point, pos_obj) {
        var x = pos_obj.x;
        var y = pos_obj.y;

        var p     = $(point || {});
        var state = (point || {}).className || '';

        var el;
        p.addClass('gu-hide');

        el                      = doc.elementFromPoint(x, y);
        (point || {}).className = state;
        return el;
    };
    var next_el                  = function (el) {
        return el.nextElementSibling || manually();
        function manually() {
            var sibling = el;
            do {
                sibling = sibling.nextSibling;
            } while (sibling && sibling.nodeType !== 1);
            return sibling;
        }
    };
    var get_rect_width           = function (rect) {
        return rect.width || (rect.right - rect.left);
    };
    var get_rect_height          = function (rect) {
        return rect.height || (rect.bottom - rect.top);
    };
    var is_input                 = function (el) {
        return el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT';
    };
    var get_scroll               = function (scrollProp, offsetProp) {
        if (typeof global[offsetProp] !== 'undefined') {
            return global[offsetProp];
        }
        if (documentElement.clientHeight) {
            return documentElement[scrollProp];
        }
        return body[scrollProp];
    };
    var get_offset               = function (el, mirror, pos_obj) {
        var rect   = el.getBoundingClientRect();
        var m_rect = (mirror.getBoundingClientRect());

        var left = rect.left + get_scroll('scrollLeft', 'pageXOffset');
        var top  = rect.top + get_scroll('scrollTop', 'pageYOffset');

        var len    = pos_obj.x - left;
        var height = pos_obj.y - top;


        var w_ratio = m_rect.width / rect.width;
        var h_ratio = m_rect.height / rect.height;


        return {
            left: pos_obj.x - (len * w_ratio),
            top : pos_obj.y - (height * h_ratio)
        };
    };
    var get_parent               = function (el) {
        return !el || el.parentNode === doc ? null : el.parentNode;
    };
    var which_mouse_button       = function (e) {
        if (e.touches !== void 0) { return e.touches.length; }
        if (e.buttons !== void 0) { return e.buttons; }
        if (e.which !== void 0) { return e.which; }
        var button = e.button;
        if (button !== void 0) { // see https://github.com/jquery/jquery/blob/99e8ff1baa7ae341e94bb89c3e84570c7c3ad9ea/src/event.js#L573-L575
            //noinspection JSBitwiseOperatorUsage
            return button & 1 ? 1 : button & 2 ? 3 : (button & 4 ? 2 : 0);
        }
    };
    var get_immediate_child      = function (drop_target, target) {
        var immediate = target;
        while ((immediate !== drop_target) && (get_parent(immediate) !== drop_target)) {
            immediate = get_parent(immediate);
        }
        if (immediate === documentElement) return null;
        return immediate;
    };

    var yes_func = function () { return true; };
    var no_func  = function () { return false; };


    var window_sm_drag = {
        status: {
            dragging: null
        }
    };

    var top_obj       = window;
    //window.Sm         = window.Sm || {};
    //window.Sm.dragger = window.Sm.dragger || window_sm_drag;

    var drag_has_been_called = false;

    var SmDrag = Emitter.extend({
        elements: {},
        position: {},
        settings: {},
        status  : {},
        timers  : {},

        init        : function (initial_containers, options) {
            var len = arguments.length;
            if (len === 1 && Array.isArray(initial_containers) === false) {
                options            = initial_containers;
                initial_containers = [];
            }
            options = options || {};

            var drag_proto = doc.createElement('div');


            this.elements   = {
                mirror                : null,                       //  The element that stays in place of the dragged element - mirror
                mirror_container      : body,                       //  The container of the mirror element - where the mirror is appended (usually body)
                item                  : null,                       //  The item being dragged
                source                : null,                       //  source container
                initial_sibling       : null,                       //  Reference sibling
                sibling               : null,                       //  Current reference sibling
                copy                  : null,                       //  Item used by copying
                last_drop_target      : null,                       //  Last container the item was over,
                last_first_drop_target: null,                       //  The last initial container the item was over
                containers            : initial_containers || [],   //  Dragging and dropping containers
                placeholder           : null,
                placeholder_container : null,
                next_potential        : null
            };
            this.settings   = {
                moves                      : yes_func,
                accepts                    : yes_func,
                can_start                  : no_func,
                is_container               : no_func,
                insert_before_and_after    : yes_func,
                is_copy                    : false,
                copy_sort_source           : false,
                revert_on_spill            : false,
                remove_on_spill            : false,
                iterate_hover              : false,
                direction                  : 'vertical',
                wrap                       : drag_proto,
                wrap_placeholder           : false,
                can_accept_drops           : no_func,
                ignore_input_text_selection: true
            };
            this.timers     = {
                render_timer: null,
                drag_timer  : null
            };
            this.position   = {
                offset       : {
                    x: 0,
                    y: 0
                },
                move         : {
                    x: 0,
                    y: 0
                },
                last_position: {
                    x: null,
                    y: null
                }
            };
            this.status     = {
                grabbed        : undefined,
                is_dragging    : undefined,
                has_mirror     : false,
                has_placeholder: false,
                relative_where : [null, null]
            };
            this._callbacks = {};
            this.fns        = {};

            function r_int(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }

            this.id = r_int(r_int(0, 14), r_int(50, 900));

            this.elements = u.merge_objects(this.elements, options.elements || {});
            !!options.elements && delete options.elements;
            this.settings = u.merge_objects(this.settings, options);


            var containers = this.elements.containers = initial_containers;
            for (var i = 0; i < containers.length; i++) {
                var obj     = containers[i];
                obj.dragger = this;
            }

            if (this.settings.remove_on_spill === true) {
                var s_over = this.add_bound(this.spill_over, 'spill_over');
                var s_out  = this.add_bound(this.spill_out, 'spill_out');
                this.on('over', s_over).on('out', s_out);
            }

            if (typeof this.settings.iterate_hover === "function") {
                this.drag_fn = this.start_drag;
            } else {
                this.drag_fn = this.drag;
            }

            this.events();
        },
        is_container: function (el) {
            return (this.elements.containers.indexOf(el) !== -1) || this.settings.is_container(el);
        },
        is_copy     : function (item, container) {
            return (typeof this.settings.is_copy === 'boolean') ? (this.settings.is_copy) : this.settings.is_copy(item, container);
        },

        add_bound: function (fn, name) {
            this.fns = this.fns || {};
            if (!(typeof fn === "function")) {
                console.log(fn, name);
                return function () {};
            }
            return this.fns[name] = this.fns[name] || fn.bind(this);
        },
        get_bound: function (name) {
            return this.fns[name] ? this.fns[name] : function () {}.bind(this);
        },

        events            : function (remove) {
            var operation = !!remove ? 'remove' : 'add';

            pn_touch(documentElement, operation, 'mousedown', this.add_bound(this.grab, 'grab'));
            pn_touch(documentElement, operation, 'keydown', this.add_bound(this.cancel_key_listener, 'cancel_key_listener'));
            pn_touch(documentElement, operation, 'mouseup', this.add_bound(this.release, 'release'));
        },
        eventual_movements: function (remove) {
            var operation = !!remove ? 'remove' : 'add';

            pn_touch(documentElement, operation, 'mousemove', this.add_bound(this.start_because_moved, 'start_because_moved'));
        },

        movements: function (remove) {
            var operation         = !!remove ? 'remove' : 'add';
            var s_prevent_grabbed = this.add_bound(this.prevent_grabbed, 'prevent_grabbed');

            pn_touch(documentElement, operation, 'selectstart', s_prevent_grabbed);
            pn_touch(documentElement, operation, 'click', s_prevent_grabbed);
        },


        prevent_grabbed    : function (e) {
            if (this.status.grabbed) {
                e.preventDefault();
            }
        },
        start_because_moved: function (e) {
            if (!this.status.grabbed) return;

            if (which_mouse_button(e) === 0) {
                this.release({});
                return;
            }
            var _move_x = this.position.move.x;
            var _move_y = this.position.move.y;

            if ((e.clientX !== undefined) && (e.clientX === _move_x) && (e.clientY !== undefined) && (e.clientY === _move_y)) {
                return;
            }

            if (this.settings.ignore_input_text_selection) {
                var client_x              = get_coordinate('clientX', e);
                var client_y              = get_coordinate('clientY', e);
                var element_behind_cursor = doc.elementFromPoint(client_x, client_y);

                if (is_input(element_behind_cursor)) {
                    return;
                }
            }

            var _grabbed = this.status.grabbed; //call to this.end() unsets this.status.grabbed
            this.eventual_movements(true);
            this.movements();

            this.end();
            var result   = this.start(_grabbed);


            if (result == false) {
                this.cancel();
                return;
            }

            var _copy              = this.elements.copy;


            $(_copy || this.elements.item).addClass('sm-transit');
            this.render_mirror_image();
            var g_o                = (typeof this.settings.get_offset === "function") ? this.settings.get_offset : get_offset;
            var offset             = g_o(this.elements.item, this.elements.mirror, {x: e.pageX, y: e.pageY});
            this.position.offset.x = get_coordinate('pageX', e) - offset.left;
            this.position.offset.y = get_coordinate('pageY', e) - offset.top;

            this.drag_fn(e);
        },
        can_start          : function (item) {
            var _mirror = this.elements.mirror;
            if (this.status.is_dragging && _mirror) return;
            if (this.is_container(item)) return; //don't drag the container itself

            var handle           = item;
            var typeof_can_start = typeof this.settings.can_start;
            var tmp_parent;

            var can_start = (typeof_can_start === "function") || (typeof_can_start === 'boolean') ? this.settings.can_start : false;
            if (!can_start) return;
            while (get_parent(item) && (this.is_container(get_parent(item)) === false)) {
                if (can_start === true) break;
                if (can_start !== false) {
                    var res = can_start(item, handle);
                    if (res === null) {
                        return false;
                    }
                    if (res) {
                        break;
                    }
                }
                tmp_parent = get_parent(item);

                item = tmp_parent;
                if (!item) {
                    return;
                }
            }
            if (!can_start(item)) {
                return;
            }
            var source = get_parent(item);
            if (!source) return;

            var movable = (typeof this.settings.moves === "function") ? this.settings.moves(item, source, handle, next_el(item)) : !!this.settings.moves;
            if (!movable) return;

            return {
                item  : item,
                source: source
            }
        },

        manual_start: function (item) {
            var context = this.can_start(item);
            if (context) {
                this.start(context);
            }
        },
        start       : function (context) {
            if (this.is_copy(context.item, context.source)) {
                this.elements.copy = context.item.cloneNode(true);
                this.emit('cloned', this.elements.copy, context.item, 'copy');
            }


            if (!!top_obj.Sm.dragger.status.dragging) {
                //var t_item = top_obj.sm.dragger.status.dragging.elements.item;
                return false;
            }
            this.elements.source          = context.source;
            this.elements.item            = context.item;
            this.elements.initial_sibling = this.elements.sibling = next_el(context.item);


            this.status.is_dragging            = true;
            top_obj.Sm.dragger.status.dragging = this;

            this.emit('drag', this.elements.item, this.elements.source);
            return true;
        },
        end         : function () {
            if (!this.status.is_dragging) return;
            var item = this.elements.copy || this.elements.item;
            this.drop(item, get_parent(item));
        },

        grab               : function (e) {
            if (drag_has_been_called) {
                return;
            }
            drag_has_been_called = true;
            this.position.move.x = e.clientX;
            this.position.move.y = e.clientY;

            var ignore = (which_mouse_button(e) !== 1) || e.metaKey || e.ctrlKey;
            if (ignore) return; // we only care about actual left clicks and touch events
            var item    = e.target;
            var context = this.can_start(item);

            if (!context) {
                return;
            }
            e.stopPropagation();

            this.status.grabbed = context;
            this.eventual_movements();
            if (e.type === 'mousedown') {
                if (is_input(item)) {
                    item.focus();
                } else {
                    e.preventDefault();
                }
            }
            return false;
        },
        ungrab             : function () {
            this.status.grabbed = false;
            this.eventual_movements(true);
            this.movements(true);
        },
        release            : function (el) {
            drag_has_been_called = false;
            this.ungrab();
            if (!this.status.is_dragging) return;
            var _settings   = this.settings;
            var item        = this.elements.copy || this.elements.item;
            var client_x    = get_coordinate('clientX', el);
            var client_y    = get_coordinate('clientY', el);
            var coordinates = {
                x: client_x,
                y: client_y
            };
            var pos_obj     = {x: client_x, y: client_y};
            var drop_target = this.elements.last_drop_target || this.find_drop_target(pos_obj);
            if (drop_target && ((this.elements.copy && _settings.copy_sort_source) || (!this.elements.copy || drop_target !== this.elements.source))) {
                this.drop(item, drop_target);
            } else if (this.settings.remove_on_spill) {
                this.remove();
            } else {
                this.cancel();
            }
        },
        drop               : function (item, target) {
            var parent           = get_parent(item);
            var _copy            = this.elements.copy;
            var _settings        = this.settings;
            var _source          = this.elements.source;
            var _current_sibling = this.elements.sibling;
            console.log('drop');

            if ((_copy && _settings.copy_sort_source) && (target === _source)) {
                parent.removeChild(this.elements.item);
            }
            if (this.is_initial_placement(target)) {
                this.emit('cancel', item, _source, _source);
            } else {
                if (this.status.has_placeholder && this.elements.placeholder == target) {
                    target = this.elements.next_potential || target;
                }
                this.emit('drop', item, target, _source, _current_sibling, this.status.relative_where);
            }
            this.cleanup();
        },
        remove             : function () {
            console.log('remove');
            if (!this.status.is_dragging) return;
            var item   = this.elements.copy || this.elements.item;
            var parent = get_parent(item);

            !!parent && parent.removeChild(item);
            this.emit(!!this.elements.copy ? 'cancel' : 'remove', item, parent, this.elements.source);
            this.cleanup();
        },
        destroy            : function () {
            this.events(true);
            this.release({});
        },
        cancel             : function (rvrt) {
            if (!this.status.is_dragging) return;
            var reverts          = (arguments.length > 0) ? rvrt : this.settings.revert_on_spill;
            var _copy            = this.elements.copy;
            var _source          = this.elements.source;
            var _current_sibling = this.elements.sibling;
            var item             = _copy || this.elements.item;
            //if (!item) return;

            var parent = get_parent(item);
            if ((parent === _source) && !!_copy) {
                parent.removeChild(_copy);
            }

            var initial = this.is_initial_placement(parent);
            if ((initial === false) && !_copy && reverts) {
                _source.insertBefore(item, this.elements.initial_sibling);
            }

            if (initial || reverts) {
                this.emit('cancel', item, _source, _source);
            } else {
                this.emit('drop', item, target, _source, _current_sibling, this.status.relative_where);
            }
            this.cleanup();
        },
        cancel_key_listener: function (e) {
            if (e.which == 27) {
                var item   = this.elements.copy || this.elements.item;
                var parent = get_parent(item);
                this.emit('cancel', item, parent, this.elements.source);
            }
        },
        cleanup            : function () {
            var _copy             = this.elements.copy;
            var _source           = this.elements.source;
            var _last_drop_target = this.elements.last_drop_target;
            var item              = _copy || this.elements.item;

            this.ungrab();
            this.remove_mirror_image();

            if (item) $(item).removeClass('sm-transit');
            if (this.timers.render_timer) clearTimeout(this.timers.render_timer);
            if (this.timers.drag_timer) clearTimeout(this.timers.drag_timer);

            this.status.is_dragging = false;
            if (top_obj.Sm.dragger.status.dragging === this) {
                top_obj.Sm.dragger.status.dragging = null;
            }
            var self        = this;
            var emitter_obj = {
                item            : item,
                last_drop_target: self.elements.last_drop_target,
                mirror          : self.elements.mirror,
                source          : _source,
                _copy           : _copy,
                timers          : self.timers
            };
            if (_last_drop_target) this.emit('out', emitter_obj);
            if (this.status.relative_where) {
                this.emit('cancel_border', emitter_obj);
                this.remove_placeholder_image(this.elements.last_drop_target);
            }

            this.emit('dragend', item);

            this.position.last_position = {x: null, y: null};

            this.elements.source
                = this.elements.item
                = this.elements.next_potential
                = this.elements.copy
                = this.elements.initial_sibling
                = this.elements.sibling
                = this.timers.render_timer
                = this.elements.last_first_drop_target
                = this.elements.last_drop_target = null;
        },

        is_initial_placement          : function (target, s) {
            var _mirror          = this.elements.mirror;
            var _current_sibling = this.elements.sibling;
            var _copy            = this.elements.copy;
            var _source          = this.elements.source;
            var _initial_sibling = this.elements.initial_sibling;


            var sibling;
            if (s !== void 0) {
                sibling = s;
            } else if (!!_mirror) {
                sibling = _current_sibling;
            } else {
                sibling = next_el(_copy || this.elements.item);
            }

            return (target === _source) && (sibling === _initial_sibling);
        },
        mirror_contains          : function (ele) {
            if (!!this.elements.mirror) {
                if (ele == this.elements.mirror) return true;
                while (ele = ele.parentElement) {
                    if (ele == this.elements.mirror) return true;
                }
            }
            return false
        },
        get_first_drop_object_at_point: function (pos_obj) {
            var x       = pos_obj.x;
            var y       = pos_obj.y;
            var list    = [];
            var display = [];
            var ele     = document.elementFromPoint(x, y);

            var drop;
            var potential_drops = [];
            var item            = this.elements.item;
            while (ele && (ele !== body) && (ele !== window) && (ele !== document) && (ele !== document.documentElement)) {
                list.push(ele);
                display.push(ele.style.visibility);
                ele.style.visibility = "hidden";
                ele                  = document.elementFromPoint(x, y);
                if ((!!this.settings.can_accept_drops && this.settings.can_accept_drops(ele, item)) || ele == this.elements.placeholder) {
                    potential_drops.push(ele);
                }
            }
            // restore display property
            for (var i = 0; i < list.length; i++) {
                list[i].style.visibility = display[i];
            }
            if (potential_drops.length) {
                for (var j = 0; j < potential_drops.length; j++) {
                    var obj = potential_drops[j];
                    if (!this.element_is_in_mirror(obj) && (!drop)) {
                        drop = obj;
                        if (!!potential_drops[j + 1] && drop == this.elements.placeholder) {
                            this.elements.next_potential = potential_drops[j + 1];
                        } else {
                            this.elements.next_potential = false;
                        }
                    }
                }
            }
            return drop;
        },
        find_drop_target              : function (pos_obj) {
            var boon = this.get_first_drop_object_at_point(pos_obj);
            if (!!boon) return boon;
            return null;
        },

        start_drag: function (e) {
            if (!this.elements.mirror) return;

            e.preventDefault();

            var client_x = get_coordinate('clientX', e);
            var client_y = get_coordinate('clientY', e);


            this.cache = this.cache || {};
            var xx     = this.cache.window_height = this.cache.window_height || $_window.innerHeight();

            if (Math.abs(xx - e.clientY) < 70) {
                window.scrollBy(e.clientX, 20);
            } else if (e.clientY < 70) {
                window.scrollBy(e.clientX, -20);
            }

            var x = client_x - this.position.offset.x;
            var y = client_y - this.position.offset.y;

            var _mirror        = this.elements.mirror;
            _mirror.style.left = x + 'px';
            _mirror.style.top  = y + 'px';


            var last_position = this.position.last_position;

            if ((!!last_position.x && !!last_position.y) && (Math.abs(last_position.x - client_x) < 25 && (Math.abs(last_position.y - client_y)) < 25)) {
                return;
            }
            last_position.x = client_x;
            last_position.y = client_y;

            var _copy   = this.elements.copy;
            var item    = _copy || this.elements.item;
            var pos_obj = {x: client_x, y: client_y};

            var start          = this.get_first_drop_object_at_point(pos_obj);
            var has_changed    = (start != this.elements.last_first_drop_target);
            var _self          = this;
            var was_first_time = !this.elements.last_first_drop_target;
            if (has_changed) {
                var drag_emitter_obj = {
                    item            : item,
                    mirror          : _self.elements.mirror,
                    last_drop_target: _self.elements.last_drop_target,
                    source          : _self.elements.source,
                    e               : e,
                    timers          : _self.timers,
                    self            : _self
                };
                if (this.elements.last_drop_target) _self.emit('out', drag_emitter_obj);
                drag_emitter_obj.last_drop_target =
                    this.elements.last_first_drop_target =
                        drag_emitter_obj.last_first_drop_target =
                            this.elements.last_drop_target =
                                start;
                was_first_time = true;
                _self.emit('over', drag_emitter_obj);
                if (this.timers.drag_timer) clearTimeout(this.timers.drag_timer);
            }
            if (!was_first_time) return;
            var drag_check_obj = {
                item            : item,
                mirror          : _self.elements.mirror,
                last_drop_target: _self.elements.last_drop_target,
                source          : _self.elements.source,
                timers          : _self.timers,
                self            : _self
            };
            var check_drag     = this.settings.iterate_hover;
            check_drag(drag_check_obj, this.continue_drag.bind(this));
        },

        continue_drag: function (ele) {
            var item = this.elements.item;
            if (!!this.settings.can_accept_drops && this.settings.can_accept_drops(ele, item)) {
                var check_drag                 = this.settings.iterate_hover;
                this.elements.last_drop_target = ele;
                var _self                      = this;
                var drag_check_obj             = {
                    item            : item,
                    mirror          : _self.elements.mirror,
                    last_drop_target: _self.elements.last_drop_target,
                    source          : _self.elements.source,
                    timers          : _self.timers,
                    self            : _self
                };
                check_drag(drag_check_obj, this.continue_drag.bind(this));
            }
        },

        drag      : function (e) {
            if (!this.elements.mirror) return;

            e.preventDefault();

            var client_x = get_coordinate('clientX', e);
            var client_y = get_coordinate('clientY', e);


            this.cache = this.cache || {};
            var xx     = this.cache.window_height = this.cache.window_height || $_window.innerHeight();

            if (Math.abs(xx - e.clientY) < 70) {
                window.scrollBy(e.clientX, 20);
            } else if (e.clientY < 70) {
                window.scrollBy(e.clientX, -20);
            }


            var x = client_x - this.position.offset.x;
            var y = client_y - this.position.offset.y;

            var _mirror        = this.elements.mirror;
            _mirror.style.left = x + 'px';
            _mirror.style.top  = y + 'px';


            var last_position = this.position.last_position;

            if ((!!last_position.x && !!last_position.y) && (Math.abs(last_position.x - client_x) < 25 && (Math.abs(last_position.y - client_y)) < 25)) {
                return;
            }
            last_position.x = client_x;
            last_position.y = client_y;


            var _copy       = this.elements.copy;
            var item        = _copy || this.elements.item;
            var pos_obj     = {x: client_x, y: client_y};
            var drop_target = this.find_drop_target(pos_obj);
            var has_changed = (drop_target !== this.elements.last_drop_target);
            var _self       = this;


            var drag_emitter_obj = {
                item            : item,
                mirror          : _self.elements.mirror,
                last_drop_target: _self.elements.last_drop_target,
                source          : _self.elements.source,
                timers          : _self.timers,
                relative_where  : _self.status.relative_where,
                next_potential  : this.elements.next_potential
            };

            var created_placeholder = false;
            var where               = [null, null];
            if (drop_target && (drop_target != this.elements.placeholder) && this.settings.insert_before_and_after(drop_target, item)) {
                var target_bounding = drop_target.getBoundingClientRect();
                var mouseY          = window.Sm.mouse.position.y;
                var el_y            = target_bounding.top;
                var el_size_y       = target_bounding.height;
                var sub_y           = Math.abs(el_y - mouseY);
                var min_pos_y       = el_size_y * .25;
                var max_pos_y       = el_size_y * .75;
                var mouseX          = window.Sm.mouse.position.x;
                var el_x            = target_bounding.left;
                var el_size_x       = target_bounding.width;
                var sub_x           = Math.abs(el_x - mouseX);
                var min_pos_x       = el_size_x * .25;
                var max_pos_x       = el_size_x * .75;


                if (sub_y < min_pos_y || sub_y > max_pos_y) {
                    if (sub_y < min_pos_y) {
                        where[1] = 'top';
                    } else {
                        where[1] = 'bottom';
                    }
                }
                if (sub_x < min_pos_x || sub_x > max_pos_x) {
                    if (sub_x < min_pos_x) {
                        where[0] = 'left';
                    } else {
                        where[0] = 'right';
                    }
                }


                if ((where[0] && where[0] != this.status.relative_where[0] ||
                    where[1] && where[1] != this.status.relative_where[1])) {
                    has_changed                     = true;
                    drag_emitter_obj.relative_where = this.status.relative_where = where;
                    this.emit('border', drag_emitter_obj);
                    this.render_placeholder_image(drop_target, where);
                    created_placeholder = true;
                }
            }
            if (!created_placeholder &&
                (this.status.relative_where[0] || this.status.relative_where[1]) &&
                (drop_target != this.elements.placeholder) &&
                (where[0] != this.status.relative_where[0] ||
                where[1] != this.status.relative_where[1])
            ) {
                this.status.relative_where = [null, null];
                this.remove_placeholder_image(drop_target);
            }

            if (has_changed || drop_target === null) {
                has_changed && _self.emit('out', drag_emitter_obj);
                var actual = drop_target;
                if (this.status.has_placeholder) {
                    if (drop_target == this.elements.last_drop_target) {
                        actual = this.elements.next_potential;
                    }
                    drop_target = this.elements.placeholder;
                }
                drag_emitter_obj.last_drop_target = this.elements.last_drop_target = drop_target;
                drag_emitter_obj.last_drop_target = actual;
                has_changed && _self.emit('over', drag_emitter_obj);
            }
        },
        spill_over: function (el) {
            $(el).removeClass('sm-hide');
        },
        spill_out : function (el) {
            if (this.status.is_dragging) $(el).addClass('sm-hide');
        },

        render_mirror_image     : function () {
            if (this.elements.mirror || this.status.has_mirror) return;

            this.count = this.count || 0;

            var rect  = this.elements.item.getBoundingClientRect();
            var clone = this.elements.item.cloneNode(true);

            if (!!this.settings.wrap) {
                var t_wrap = typeof this.settings.wrap;
                var wrap   = this.settings.wrap;
                if (t_wrap === "function") {
                    this.elements.mirror = wrap(clone, rect);
                } else if (!!wrap.cloneNode) {
                    var ele              = wrap.cloneNode(true);
                    ele.appendChild(clone);
                    this.elements.mirror = ele;
                }
            }
            if (!this.elements.mirror) {
                clone.style.width    = get_rect_width(rect) + 'px';
                clone.style.height   = get_rect_height(rect) + 'px';
                this.elements.mirror = clone;
            }
            this.status.has_mirror = true;

            var _$mirror = $(this.elements.mirror);


            $(clone).removeClass('sm-transit');
            _$mirror.addClass('sm-mirror');


            this.elements.mirror_container.appendChild(this.elements.mirror);


            pn_touch(documentElement, 'add', 'mousemove', this.add_bound(this.drag_fn, 'drag'));
            $(this.elements.mirror_container).addClass('sm-unselectable');
            this.emit('cloned', this.elements.mirror, this.elements.item, 'mirror');
        },
        render_placeholder_image: function (reference, location) {
            if (this.elements.placeholder || this.status.has_placeholder) return;

            this.count = this.count || 0;

            if (!!this.settings.create_placeholder) {
                var t_wrap_placeholder = typeof this.settings.create_placeholder;
                var wrap_placeholder   = this.settings.create_placeholder;
                if (t_wrap_placeholder === "function") {
                    this.elements.placeholder = wrap_placeholder(reference, location);
                } else if (!!wrap_placeholder.cloneNode) {
                    var ele                   = wrap_placeholder.cloneNode(true);
                    this.elements.placeholder = ele;
                }
            }
            if (!this.elements.placeholder) {
                var clone                   = document.createElement('div');
                clone.style.width           = '100%';
                clone.style.height          = '20px';
                clone.style.backgroundColor = '#ccc';
                this.elements.placeholder   = clone;
            }
            this.status.has_placeholder = true;
            var _$placeholder           = $(this.elements.placeholder);
            _$placeholder.addClass('sm-placeholder');
            var _$reference             = $(reference);

            if (!location[0]) {
                _$reference.parent().closest('.sm-entity').addClass('sm-drag-insert');
                if (location[1] == 'top') {
                    reference.parentNode.insertBefore(this.elements.placeholder, reference);
                } else if (location[1] == 'bottom') {
                    u.insertAfter(this.elements.placeholder, reference);
                }
            } else {
                _$reference.addClass('sm-drag-insert');
                var placeholder = this.elements.placeholder;

                var childPos = _$reference.offset();

                placeholder.style.position = 'absolute';
                placeholder.style.height   = reference.offsetHeight + 'px';
                placeholder.style.width    = '50px';
                //placeholder.backgroundColor = 'red';
                placeholder.style.left = childPos.left + 'px';
                placeholder.style.top  = childPos.top + 'px';
                if (location[0] == 'right') {
                    placeholder.style.left = childPos.left + reference.offsetWidth - 50 + 'px';
                }
                documentElement.appendChild(placeholder);
            }

        },
        remove_mirror_image     : function () {
            if (this.elements.mirror) {
                $(this.elements.mirror_container).removeClass('sm-unselectable');
                pn_touch(documentElement, 'remove', 'mousemove', this.add_bound(this.drag_fn, 'drag'));

                var parent = get_parent(this.elements.mirror);
                parent && parent.removeChild(this.elements.mirror);

                this.status.has_mirror = false;
                this.elements.mirror   = null;
            }
        },
        remove_placeholder_image: function (reference) {
            if (this.elements.placeholder) {
                reference       = reference || this.elements.last_drop_target;
                var _$reference = $(reference);
                _$reference.removeClass('sm-drag-insert');
                _$reference.closest('.sm-drag-insert').removeClass('sm-drag-insert');
                var parent      = get_parent(this.elements.placeholder);
                parent && parent.removeChild(this.elements.placeholder);

                this.status.has_placeholder = false;
                this.elements.placeholder   = null;
            }
        },

        get_reference: function (drop_target, target, pos_obj) {
            var dir_is_horizontal = (this.settings.direction === 'horizontal');

            var x = pos_obj.x;
            var y = pos_obj.y;

            var outside = function () { // slower, but able to figure out any position
                var len = drop_target.children.length;
                var i;
                var el;
                var rect;
                for (i = 0; i < len; i++) {
                    el   = drop_target.children[i];
                    rect = el.getBoundingClientRect();
                    if (dir_is_horizontal && rect.left > x) { return el; }
                    if (!dir_is_horizontal && rect.top > y) { return el; }
                }
                return null;
            };
            var inside  = function () { // faster, but only available if dropped inside a child element
                var rect = target.getBoundingClientRect();
                if (dir_is_horizontal) {
                    return resolve(x > rect.left + get_rect_width(rect) / 2);
                }
                return resolve(y > rect.top + get_rect_height(rect) / 2);
            };
            var resolve = function (after) {
                return after ? next_el(target) : target;
            };
            return (target !== drop_target) ? inside() : outside();
        }
    });
    return SmDrag;
});