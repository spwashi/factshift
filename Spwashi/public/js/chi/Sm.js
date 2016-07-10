/**
 * Created by Sam Washington on 12/19/15.
 */
/**
 * @alias window.Sm
 * @global
 */
var Sm = {};
require([
    'require',
    'jquery',
    'Cocktail',
    'backbone'
], function (require, $, Cocktail, backbone) {
    /**
     * @type {{}}
     * @global
     */
    window.Sm = Sm || {};

    ////////////////////////////
    var dnd_el            = document.getElementById('drag_n_drop');
    var can_drag_and_drop = (!!dnd_el && dnd_el.checked);
    var dl_el             = document.getElementById('d_l');
    var is_edit_el        = document.getElementById('i_e');
    var is_edit_bool      = is_edit_el ? is_edit_el.value : false;
    var debug_level       = dl_el ? dl_el.value : false;
    Sm.CONFIG             = {
        DRAG_MODE: can_drag_and_drop,
        EDIT:      is_edit_bool,
        DEBUG:     parseInt(debug_level) + 1
    };
    ////////////////////////////
    /**
     * Add something as loaded
     * @name Sm.loaded
     * @type {{}}
     * @props {Function} add {@link Sm.loaded.add}
     */
    Sm.loaded = {
        _loaded:               {},
        _unloaded:             {},
        _waiting:              {},
        _correct_dependencies: function (dependencies) {
            var corrected = [];
            if (dependencies.constructor !== Array) {
                dependencies = [dependencies];
            }
            for (var i = 0; i < dependencies.length; i++) {
                var d = dependencies[i];
                d     = d.toLowerCase().trim();
                if (!this.is_loaded(d)) {
                    corrected.push(d);
                }
            }
            return corrected;
        },
        add:                   function (name, from) {
            name = name.toLowerCase().trim();
            if (this._loaded[name]) return true;
            this._loaded[name] = true;
            this.resolve(name, from || 'add');
            var waiting_names  = this._unloaded[name];
            if (waiting_names) {
                var len = waiting_names.length;
                for (var i = 0; i < len; i++) {
                    var w_name  = waiting_names[i];
                    w_name      = w_name.toLowerCase().trim();
                    var waiting = this._waiting[w_name];
                    if (typeof waiting !== "object" || waiting.timeout === false) continue;
                    waiting.dependencies = this._correct_dependencies(waiting.dependencies);
                    if (!waiting.dependencies.length) this.add(w_name, name);
                }
                delete this._unloaded[name];
            }
            return true;
        },
        resolve:               function (name, from) {
            var waiting = this._waiting[name];
            //Sm.CONFIG.DEBUG && console.log('res - ', [name, from]);
            if (!waiting || waiting.timeout === false) return false;
            clearTimeout(waiting.timeout);
            var fn      = waiting.fn;
            delete this._waiting[name];
            return fn();
        },
        _bb:                   {},
        when_loaded:           function (dependencies, fn, name, time_out) {
            var self = Sm.loaded;
            if (name)this._bb[name] = true;
            return new Promise(function (p_res, reject) {
                var n_r      = function (fn_) { p_res(fn_());};
                dependencies = self._correct_dependencies(dependencies);
                if (!name) name = dependencies.join ? dependencies.join(',') : dependencies + '-';
                name         = name.toLowerCase().trim();
                var other_fn = fn;
                if (typeof fn !== "function") fn = function () {return other_fn;};
                if (!dependencies.length) {
                    self.add(name);
                    return n_r(fn);
                } else {
                    for (var i = 0; i < dependencies.length; i++) {
                        var d             = dependencies[i];
                        self._unloaded[d] = self._unloaded[d] || [];
                        self._unloaded[d].push(name);
                    }
                    self._waiting[name] = {
                        timeout:      setTimeout(function () {
                            var waiting = self._waiting[name];
                            if (!waiting || waiting.timeout === false) return;
                            var d_s = self._correct_dependencies(waiting.dependencies);
                            if (!d_s.length) return p_res(self.add(name, 'timeout'));
                            self._waiting[name].timeout = false;
                            return reject(d_s);
                        }, time_out || 15000),
                        fn:           n_r.bind(null, fn),
                        dependencies: dependencies
                    }
                }
            });
        },
        is_loaded:             function (name) {
            if (name.constructor === Array) {
                for (var i = 0; i < name.length; i++) {
                    var m = name[i];
                    if (!this.is_loaded(m)) {
                        return false;
                    }
                }
                return true;
            }
            name = name.toLowerCase().trim();
            return !!this._loaded[name];
        }
    };


//-------------------------------------------------------------------------
    window.Sm.Extras       = window.Sm.Extras || {};
    Sm.Extras.visual_debug = function (add, classname) {
        var debug_el = document.getElementById('debug_el');
        if (debug_el) {
            var append       = document.createElement('li');
            append.innerHTML = '' + add;
            debug_el.appendChild(append);
        }
    };
//-------------------------------------------------------------------------
    /**
     * The Core structure of the Sm Namespace
     * @type {{}}
     */
    window.Sm.Core                 = {};
    require(['Sm-Core-Core']);
    require(['tooltipster']);
    require(['SmHighlight']);
    require(['Cocktail']);
    Cocktail.patch(backbone);
    /**
     * A container for the Model/View/ representations
     * @type {Sm.Entities|{}}
     */
    Sm.Entities                    = Sm.Entities || {};
    Sm.Entities.Abstraction        = Sm.Entities.Abstraction || {};
    Sm.Entities.Abstraction.mixins = Sm.Entities.Abstraction.mixins || {};


//-------------------------------------------------------------------------
    var NonexistentModelError       = function (message) {
        this.name    = 'NonexistentModelError';
        this.message = message || 'Model does not exist';
        this.stack   = (new Error()).stack;
    };
    NonexistentModelError.prototype = new Error;
    Sm.Errors                       = {};
    Sm.Errors.NonexistentModelError = NonexistentModelError;
    Sm.loaded.add('Errors');


    Sm.CONFIG.DEBUG && Sm.loaded.when_loaded('Core_Identifier', function () {
        var debug = document.getElementById('debug_identifier');
        if (!debug) return;
        var button = document.getElementById('debug_identifier_button');
        if (!button) return;
        var fn = function () {
            var val = debug.value;
            val     = val.trim();
            if (val.indexOf('MvWrapper') > -1) {
                var expl = val.split('.');
                expl.shift();
                if (expl.length)
                    Sm.CONFIG.DEBUG && console.log(Sm.Core.MvWrapper[expl.join('.')]);
                else
                    Sm.CONFIG.DEBUG && console.log(Sm.Core.MvWrapper);
            } else
                Sm.CONFIG.DEBUG && console.log(Sm.Core.Identifier.retrieve(val));
        };
        button.addEventListener('click', fn);
        debug.addEventListener('keyup', function (e) {
            if (e.keyCode == 13)fn();
        });
    }, 'Sm_debug_handler');


    dnd_el && dnd_el.addEventListener('change', function () {Sm.CONFIG.DRAG_MODE = this.checked;});
});