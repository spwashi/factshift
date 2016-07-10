/**
 * Created by Sam Washington on 11/1/15.
 */
if (typeof global === "undefined") {var global = typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};}
// Cross browser, backward compatible solution
var raf = window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame;

define(['jquery', 'Sm'], function ($) {
    /**
     * @typedef sm_util
     * @alias Sm.Core.util
     * @type {{getBrowserPrefix: Function, isElement: Function, merge_objects: Function, merge_objects_recursive: Function, switch_: Function, isChildOf: Function, insertAfter: Function, _recurseGetChildElements: Function, getChildElementsByClassName: Function, createElement: Function, camelize: Function, isEmpty: Function, hasClass: Function, getCaretCharacterOffsetWithin: Function, get_rect_width: Function, get_rect_height: Function, get_scroll: Function}}
     */
    Sm.Core.util = {
        getBrowserPrefix: function () {
            if (!this.browserPrefix) {
                return this.browserPrefix;
            }
            var browserPrefix;
            var N = navigator.appName, ua = navigator.userAgent, tem;
            var M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
            if (M && (tem = ua.match(/version\/([\.\d]+)/i)) != null) M[2] = tem[1];
            M = M ? [M[1], M[2]] : [N, navigator.appVersion, '-?'];
            M = M[0];
            if (M == "Chrome") { browserPrefix = "webkit"; }
            if (M == "Firefox") { browserPrefix = "moz"; }
            if (M == "Safari") { browserPrefix = "webkit"; }
            if (M == "MSIE") { browserPrefix = "ms"; }
            this.browserPrefix = browserPrefix;
        },

        /**
         * @alias Sm.Core.util.follow_link
         * @param url
         * @param do_replace
         */
        follow_link: function (url, do_replace) {
            if (!do_replace) {
                var win = window.open(url, '_blank');
                win.focus();
            } else {
                window.location = url;
            }
        },

        /**
         * See if a variable is a DOM node
         * @param o
         * @returns {*}
         */
        isElement:                     function (o) {
            return (
                typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
                o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string"
            );
        },
        /**
         * Return a semi-deep copy of two objects
         * todo add recursion?
         * @param original_object
         * @param overwriting_object
         * @returns {{}}
         */
        merge_objects:                 function (original_object, overwriting_object) {
            var obj3 = {};
            if (!!original_object && typeof original_object === 'object') {
                for (var attr_name in original_object) {
                    if (original_object.hasOwnProperty(attr_name))
                        obj3[attr_name] = original_object[attr_name];
                }
            }
            if (!!overwriting_object && typeof overwriting_object === 'object') {
                for (var attribute_name in overwriting_object) {
                    if (overwriting_object.hasOwnProperty(attribute_name)) {
                        obj3[attribute_name] = overwriting_object[attribute_name];
                    }
                }
            }
            return obj3;
        },
        merge_objects_recursive:       function (original_object, overwriting_object) {
            for (var p in overwriting_object) {
                if (!overwriting_object.hasOwnProperty(p)) continue;
                try {
                    // Property in destination object set; update its value.
                    if (overwriting_object[p].constructor == Object) {
                        original_object[p] = this.merge_objects_recursive(original_object[p], overwriting_object[p]);

                    } else {
                        original_object[p] = overwriting_object[p];

                    }
                } catch (e) {
                    // Property in destination object not set; create it and set its value.
                    original_object[p] = overwriting_object[p];

                }
            }
            return original_object;
        },
        switch_:                       function (sw_statement) {
            for (var argument_name = 0; argument_name < sw_statement.length; argument_name++) {
                var argument = sw_statement[argument_name];
                if (!argument || !(typeof argument == 'object')) continue;
                var c = argument.c;
                var f = argument.f;
                if (!!c && typeof f === "function") {
                    return f();
                }
            }
        },
        /**
         * Check to see if an element is the child of another element
         * @param child
         * @param parent
         * @returns {boolean}
         */
        isChildOf:                     function (child, parent) {
            while ((child = child.parentNode) && child !== parent) {}
            return !!child
        },
        insertAfter:                   function (newNode, referenceNode) {
            if (!!referenceNode.nextSibling && !!referenceNode && !!newNode)
                referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
        },
        _recurseGetChildElements:      function (element, className, found_array) {
            for (var i = 0; i < element.childNodes.length; i++) {
                var el = element.childNodes[i];
                if ($(el).hasClass(className)) {
                    found_array.push(element.childNodes[i]);
                    break;
                }
                this._recurseGetChildElements(element.childNodes[i], className, found_array);
            }
        },
        getChildElementsByClassName:   function (DOM_Element, className) {
            if (typeof className != "string" || !this.isElement(DOM_Element)) {
                return [];
            }
            var els = [];
            this._recurseGetChildElements(DOM_Element, className, els);
            return els;
        },
        createElement:                 function (string, and_append) {
            var div;
            div           = document.createElement("div");
            div.innerHTML = string;
            var child     = div.childNodes[0];
            if (!!and_append) {
                document.body.appendChild(child);
            }
            return child;
        },
        camelize:                      function (str, and_first) {
            str = str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
                if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
                return index == 0 ? match.toLowerCase() : match.toUpperCase();
            });
            if (!!and_first) {
                return str.replace(/\b[a-z]/g, function (letter) {
                    return letter.toUpperCase();
                });
            }
            return str;
        },
        isEmpty:                       function (el) {
            el = $(el);
            return !$.trim(el.html())
        },
        /**
         * Check to see if an element has a class
         * @param ele
         * @param cls
         * @returns {*}
         */
        hasClass:                      function (ele, cls) {
            if (!this.isElement(ele)) {
                return String(ele).match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
            }
            return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
        },
        //http://stackoverflow.com/a/4812022
        getCaretCharacterOffsetWithin: function (element) {
            var caretOffset = 0;
            var doc         = element.ownerDocument || element.document;
            var win         = doc.defaultView || doc.parentWindow;
            var sel;
            if (typeof win.getSelection != "undefined") {
                sel = win.getSelection();
                if (sel.rangeCount > 0) {
                    var range         = win.getSelection().getRangeAt(0);
                    var preCaretRange = range.cloneRange();
                    preCaretRange.selectNodeContents(element);
                    preCaretRange.setEnd(range.endContainer, range.endOffset);
                    caretOffset       = preCaretRange.toString().length;
                }
            } else if ((sel = doc.selection) && sel.type != "Control") {
                var textRange         = sel.createRange();
                var preCaretTextRange = doc.body.createTextRange();
                preCaretTextRange.moveToElementText(element);
                preCaretTextRange.setEndPoint("EndToEnd", textRange);
                caretOffset           = preCaretTextRange.text.length;
            }
            return caretOffset;
        },
        get_rect_width:                function (rect) {
            return rect.width || (rect.right - rect.left);
        },
        get_rect_height:               function (rect) {
            return rect.height || (rect.bottom - rect.top);
        },
        get_scroll:                    function (scrollProp, offsetProp) {
            if (typeof global[offsetProp] !== 'undefined') {
                return global[offsetProp];
            }
            if (document.clientHeight) {
                return document[scrollProp];
            }
            return document.body[scrollProp];
        },
        randomString:                  function (length, chars) {
            chars      = chars || '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';
            var result = '';
            for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
            return result;
        },
        requestAnimationFrame:         raf,
        /**
         * https://gist.github.com/louisremi/1114293#file_anim_loop_x.js
         * @param callback
         * @param element
         */
        create_animation_loop:         function (callback, element) {
            var continue_running = true, lastFrame = +new Date;
            var _raf             = this.requestAnimationFrame;

            function loop(now) {
                if (continue_running !== false) {
                    // Request animation frame, else, fallback to setTimeout
                    _raf ? _raf(loop, element) : setTimeout(loop, 16);
                    // Make sure to use a valid time, since:
                    // - Chrome 10 doesn't return it at all
                    // - setTimeout returns the actual timeout
                    now        = now && now > 1E4 ? now : +new Date;
                    var deltaT = now - lastFrame;
                    // do not render frame when deltaT is too high
                    if (deltaT < 160) {
                        continue_running = callback(deltaT, now);
                    }
                    lastFrame = now;
                }
            }

            loop();
        }
    };
    Sm.loaded.add('Core_util')
});