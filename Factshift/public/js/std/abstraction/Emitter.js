/**
 * Created by Sam Washington on 8/15/2015.
 */
define(['Class'], function (Class) {
    var __arr_slice = Array.prototype.slice;

    /**
     * A class to extend to emit events.
     * Basic implementation of the observer-subscription pattern
     * @class Emitter
     *
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

                                       this.events = [];

                                       this._callbacks = {}
                                   },
                                   /**
                                    * Register a callback to be run whenever this object emits a specified event
                                    * @param {string}   event
                                    * @param {function} fn
                                    * @return {Emitter}
                                    */
                                   on:                 function (event, fn) {
                                       if (!this._callbacks[event] && typeof fn === 'function') {
                                           this._callbacks[event] = [];
                                       }
                                       this._callbacks[event].push(fn);
                                       return this;
                                   },
                                   /**
                                    * Register a callback to be run once when this object emits an event
                                    * @param {string}   event
                                    * @param {function} fn
                                    * @return {Emitter}
                                    */
                                   once:               function (event, fn) {
                                       /** @type {int} count If this is more than one, don't run the function */
                                       var count = 0;
                                       // Register the callback in a wrapper that prevents it from being executed more than once
                                       return this.on(event, function () {if (!(count++))return fn();});
                                   },
                                   /**
                                    * Stop a callback from being executed when this object emits a specified event
                                    * @param {string}   event   The event that we are removing
                                    * @param {function=} fn      The callback to remoove
                                    * @return {Emitter}
                                    */
                                   off:                function (event, fn) {
                                       // Return this
                                       if (!this._callbacks || arguments.length === 0) {
                                           this._callbacks = {};
                                           return this;
                                       }
                                       // If there aren't any callbacks registered at this index, return
                                       var callbacks = this._callbacks[event];
                                       if (!callbacks) return this;

                                       // If we didn't specify a callback to remove, delete callback from the registry
                                       if (arguments.length === 1) {
                                           delete this._callbacks[event];
                                           return this;
                                       }
                                       var i, _i, _len;
                                       var callback;

                                       // Iterate through the callbacks and remove the callback.
                                       // There are two loop variables so we don't have to decrement the counter?
                                       // tbh, don't remember why
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
                                    * Emit an event
                                    * @param {string=}   event
                                    * @returns {Emitter}
                                    */
                                   emit:               function (event) {
                                       var args      = (arguments.length >= 2) ? __arr_slice.call(arguments, 1) : [];
                                       var callbacks = this._callbacks[event];
                                       var callback;
                                       if (callbacks) {
                                           for (var _i = 0, _len = callbacks.length; _i < _len; _i++) {
                                               callback = callbacks[_i];
                                               callback.apply(this, args);
                                           }
                                       }
                                       return this;
                                   },
                                   /**
                                    * Alias for this.off
                                    */
                                   removeAllListeners: function () {this.off()},

                                   /**
                                    * Add a function, binding it to this. The name allows us to reference it later.
                                    * The purpose of this is so we can add or remove an function but retain a consistent reference to it
                                    * @param {string}       name    What we should name the callback
                                    * @param {function}     fn      The callback to name
                                    * @param {function|{}}  _self   The "this" to use
                                    * @return {function}
                                    */
                                   add_bound: function (name, fn, _self) {
                                       this._fns = this._fns || {};
                                       if (!(typeof fn === "function")) {
                                           console.log(fn, name);
                                           return function () {};
                                       }
                                       // Don't bind a function more than once
                                       return this._fns[name] = this._fns[name] || fn.bind(_self || this);
                                   },
                                   /**
                                    * Get the callback stored at a name. Otherwise, return a no-op
                                    * @param name
                                    * @return {function(this:Emitter)}
                                    */
                                   get_bound: function (name) {
                                       return this._fns[name] ? this._fns[name] : function () {}.bind(this);
                                   }
                               });
    return Emitter;
});