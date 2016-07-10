/**
 * Created by Sam Washington on 11/27/15.
 */

if (typeof global === "undefined") {var global = typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};}

var event_map = [];
var regex_on  = /^on/;
for (var event_name in global) {
    //noinspection JSUnfilteredForInLoop
    if (regex_on.test(event_name)) {
        //noinspection JSUnfilteredForInLoop
        event_map.push(event_name.slice(2));
    }
}
require(['require', 'Sm'], function (require) {
    require('Sm');
    var addEvent, removeEvent;
    if (!global.addEventListener) {
        addEvent    = function (el, type, fn) {
            return el.attachEvent('on' + type, wrap(el, type, fn));
        };
        removeEvent = function (el, type, fn) {
            var listener = unwrap(el, type, fn);
            if (listener) {
                return el.detachEvent('on' + type, listener);
            }
        }
    } else {
        addEvent    = function (el, type, fn, capturing) {
            if (!el) {
                return false;
            } else {
                return el.addEventListener(type, fn, capturing);
            }
        };
        removeEvent = function (el, type, fn, capturing) {
            if (!el) {
                console.log(arguments);
                return false;
            }
            return el.removeEventListener(type, fn, capturing);
        }
    }
    var hardCache      = [];
    var fabricateEvent = function (el, type, model) {
        var e;

        if (event_map.indexOf(type) === -1) {
            e = new CustomEvent(type, {detail: model});
        } else {
            if (doc.createEvent) {
                e = doc.createEvent('Event');
                e.initEvent(type, true, true);
            } else if (doc.createEventObject) {
                e = doc.createEventObject();
            }
        }

        if (el.dispatchEvent) {
            el.dispatchEvent(e);
        } else {
            el.fireEvent('on' + type, e);
        }
    };
    var wrapperFactory = function (el, type, fn) {
        return function wrapper(originalEvent) {
            var e             = originalEvent || global.event;
            e.target          = e.target || e.srcElement;
            e.preventDefault  = e.preventDefault || function preventDefault() { e.returnValue = false; };
            e.stopPropagation = e.stopPropagation || function stopPropagation() { e.cancelBubble = true; };
            e.which           = e.which || e.keyCode;
            fn.call(el, e);
        };
    };
    var wrap           = function (el, type, fn) {
        var wrapper = unwrap(el, type, fn) || wrapperFactory(el, type, fn);
        hardCache.push({
            wrapper: wrapper,
            element: el,
            type:    type,
            fn:      fn
        });
        return wrapper;
    };
    var unwrap         = function (el, type, fn) {
        var i = find(el, type, fn);
        if (i) {
            var wrapper = hardCache[i].wrapper;
            hardCache.splice(i, 1); // free up a tad of memory
            return wrapper;
        }
    };
    var find           = function (el, type, fn) {
        var i, item;
        for (i = 0; i < hardCache.length; i++) {
            item = hardCache[i];
            if (item.element === el && item.type === type && item.fn === fn) {
                return i;
            }
        }
    };

    Sm.loaded.when_loaded('core_util', function () {
        Sm.Core.util.crossvent = {
            add:       addEvent,
            remove:    removeEvent,
            fabricate: fabricateEvent
        };
        Sm.loaded.add('Core_util_crossvent');
    }, 'Core_util_crossvent');
});