/**
 * Created by Sam Washington on 8/15/2015.
 */
define(['Class'], function (Class) {
    var __arr_slice = Array.prototype.slice;

    /**
     * @class Emitter
     * @alias Emitter
     * @type {Function|Class}
     * @extends Class
     * @prop {Function} on
     * @prop {Function} off
     * @prop {Function} extend
     * @prop {Function} emit
     * @prop {Function} removeListener
     * @prop {Function} removeAllListeners
     * @prop {Function} add_bound
     * @prop {Function} get_bound
     */
    var Emitter = Class.extend({
        /**
         * @constructor
         * @param properties
         */
        init:               function (properties) {
            for (var obj in properties) {
                if (!properties.hasOwnProperty(obj)) continue;
                this[obj] = properties[obj];
            }

            this.events     = [];
            this._callbacks = {}
        },
        on:                 function (event, fn) {
            !this._callbacks && (this._callbacks = {});
            !this._callbacks[event] && (this._callbacks[event] = []);
            typeof fn === 'function' && this._callbacks[event].push(fn);
            return this;
        },
        off:                function (event, fn) {
            if (!this._callbacks || arguments.length === 0) {
                this._callbacks = {};
                return this;
            }
            var callbacks = this._callbacks[event];
            if (!callbacks) return this;

            //todo why not just use the callbacks var
            if (arguments.length === 1) {
                delete this._callbacks[event];
                return this;
            }
            var i, _i, _len;
            var callback;
            for (i = _i = 0, _len = callbacks.length; _i < _len; i = ++_i) {
                callback = callbacks[i];
                if (callback === fn) {
                    callbacks.splice(i, 1);
                    break;
                }
            }
            return this;
        },
        /**
         *
         * @param event
         * @returns {Emitter}
         */
        emit:               function (event) {
            var callbacks = this._prepare_event.apply(this, arguments);
            for (var i = 0; i < callbacks.length; i++) {
                var fn = callbacks[i];
                fn();
            }
            return this;
        },
        _prepare_event:     function (event) {
            var args = (arguments.length >= 2) ? __arr_slice.call(arguments, 1) : [];
            if (!this._callbacks) {
                this._callbacks = {};
                return [];
            }

            var callbacks = this._callbacks[event];
            var callback;
            if (callbacks) {
                for (var _i = 0, _len = callbacks.length; _i < _len; _i++) {
                    callback = callbacks[_i];
                    if (!callback) continue;
                    callbacks[_i] = Function.prototype.bind.apply(callback, [this].concat(args));
                }
            }
            return callbacks || [];
        },
        resolve:            function (event) {
            var count = 0;
            return Promise.all(this._prepare_event.apply(this, arguments).map(function (fn) {
                count++;
                return fn ? fn() : false
            })).then(function (res) {
                return count === 1 ? res[0] : res;
            });
        },
        /**
         * Remove a function from an event
         * @param {String}      e       The name of the event
         * @param {Function}    fn      The function to remove
         */
        removeListener:     function (e, fn) {this.off(e, fn)},
        removeAllListeners: function () {this.off()},
        /**
         * Assure that the function is bound to the correct "this" value. Useful if it's possible that the same function
         * could be passed to another function in multiple different areas, and the function must be the same
         * @param name
         * @param fn
         * @param _self
         * @return {*}
         */
        add_bound:          function (name, fn, _self) {
            this._fns = this._fns || {};
            if (!(typeof fn === "function")) {
                Sm.CONFIG.DEBUG && console.log(name, fn);
                return function () {};
            }
            return this._fns[name] = this._fns[name] || fn.bind(_self || this);
        },
        get_bound:          function (name) {
            return this._fns[name] ? this._fns[name] : function () {}.bind(this);
        }
    });
    return Emitter;
});