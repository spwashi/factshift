/**
 * Created by Sam Washington on 11/1/15.
 */
if (typeof global === "undefined") {var global = typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};}

define(['jquery', 'Sm'], function ($, Sm) {
    /**
     *
     * @alias Sm.Core.Util
     */
    Sm.Core.Util = {
        isNumeric:                   function (number) {
            return $.isNumeric(number);
        },
        isArray:                     function (item) {return $.isArray(item);},
        arrayDiff:                   function (arr, subtract_array) {
            return arr.filter(function (i) {return subtract_array.indexOf(i) < 0;});
        },
        mixin:                       function (mixin_proto, item, overwrite, literal) {
            overwrite = !!overwrite;
            for (var property in mixin_proto) {
                if (!mixin_proto.hasOwnProperty(property)) continue;
                var actual_item = literal ? item : item.prototype;
                if (overwrite || !(property in actual_item)) {
                    actual_item[property] = mixin_proto[property];
                }
            }
        },
        randomString:                function (length, chars) {
            chars      = chars || '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';
            var result = '';
            for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
            return result;
        },
        /**
         * Return a semi-deep copy of two objects
         * todo add recursion?
         * @param original_object
         * @param overwriting_object
         * @returns {{}}
         */
        merge_objects:               function (original_object, overwriting_object) {
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
        iterateUnknownSynchronicity: function (items, is_synchronous, callback, on_complete) {
            callback    = typeof  callback === "function" ? callback : function (item, previous) {return item};
            items       = Sm.Core.Util.isArray(items) ? items : [items];
            on_complete = typeof  on_complete === "function" ? on_complete : function (item) {return item};
            var results = [];

            if (!is_synchronous) {
                var MainPromise = Promise.resolve();
                for (var k = 0; k < items.length; k++) {
                    var fn      = (function (item, item_index) {
                        return function (previous) {
                            item_index && results.push(previous);
                            return callback(item, previous);
                        }
                    })(items[k], k);
                    MainPromise = (MainPromise).then(fn);

                }
                return MainPromise.then(function (previous) {
                    results.push(previous);
                    return on_complete(previous, results);
                });
            } else {
                var last_result = null;
                for (var i = 0; i < items.length; i++) {
                    last_result = callback(items[i], last_result);
                    results.push(last_result)
                }
                return on_complete(last_result, results);
            }
        },
        combineJqueryArray:          function (results) {
            var len = 1;
            if (results && !Sm.Core.Util.isArray(results)) results = [results];
            else len = results.length;
            if (!results || !len) return $();
            var $incident = $(results.shift() || null);
            for (var i = 0; i < len; i++) {$incident = $incident.add(results[i]);}
            return $incident;
        },
        createElement:               function (string) {
            var div;
            div           = document.createElement("div");
            div.innerHTML = string;
            var child     = div.childNodes[0];
            return child;
        },
        /**
         * Determine whether something is an element
         * @link http://stackoverflow.com/a/384380/1930695
         * @param el
         * @return {*}
         */
        isElement:                   function (el) {
            return (
                typeof HTMLElement === "object" ? el instanceof HTMLElement : //DOM2
                el && typeof el === "object" && el !== null && el.nodeType === 1 && typeof el.nodeName === "string"
            );
        },
        /**
         * Determine whether something is a Node.
         * @link http://stackoverflow.com/a/384380/1930695
         * @param el
         * @return {*}
         */
        isNode:                      function (el) {
            return (
                typeof Node === "object" ? el instanceof Node :
                el && typeof el === "object" && typeof el.nodeType === "number" && typeof el.nodeName === "string"
            );
        }
    };
    Sm.Core.dependencies.add('Core_util')
});