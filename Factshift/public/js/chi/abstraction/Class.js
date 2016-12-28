/**
 * Created by Sam Washington on 12/17/15.
 */
/* Simple JavaScript Inheritance for ES 5.1 ( includes polyfill for IE < 9 )
 * based on http://ejohn.org/blog/simple-javascript-inheritance/
 *  (inspired by base2 and Prototype)
 * MIT Licensed.
 */
//noinspection ThisExpressionReferencesGlobalObjectJS

/**
 * @class Class
 * @type {Function}
 * @global
 * @prop {Function} extend
 * @prop {Function} _super Call the parent function
 */

var initializing = !1, fnTest = /xyz/.test(function () {xyz}) ? /\b_super\b/ : /.*/, Class = function () {};
Class.extend     = function (t) {
    function _Class() {!initializing && this.init && this.init.apply(this, arguments)}

    var n        = this.prototype;
    initializing = !0;
    var e        = new this;
    initializing = !1;
    for (var r in t)e[r] = "function" == typeof t[r] && "function" == typeof n[r] && fnTest.test(t[r]) ? function (t, i) {
        return function () {
            var e       = this._super;
            this._super = n[t];
            var r       = i.apply(this, arguments);
            return this._super = e, r
        }
    }(r, t[r]) : t[r];
    return _Class.prototype = e, _Class.prototype.constructor = _Class, _Class.extend = arguments.callee, _Class
};
define([], function () {
    return Class;
});