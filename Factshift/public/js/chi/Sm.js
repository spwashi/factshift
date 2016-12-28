/**
 * Created by Sam Washington on 12/19/15.
 */
/**
 * @global
 * @alias Sm
 */
var Sm = {};
define([
	'require',
	'jquery',
	'Cocktail',
	'backbone'
],
       /**
        * @lends Sm
        * @param require
        * @param $
        * @param Cocktail
        * @param backbone
        * @return {{}}
        */
       function (require, $, Cocktail, backbone) {
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


	var spwashi_config_el = document.getElementById('spwashi_config');
	/**
	 *
	 * @type {{entities: {}, prefixes: {}, mapped_properties: {}}}
	 */
	Sm.spwashi_config     = spwashi_config_el ? JSON.parse(spwashi_config_el.textContent) : {};

	Sm.rbt = Sm.rbt || {};


	Sm.CONFIG = {
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
		_correct_name:         function (name) {
			return name.toLowerCase().trim().replace(/(\s|_|-)/g, '_');
		},
		_correct_dependencies: function (dependencies) {
			var corrected = [];
			if (dependencies.constructor !== Array) {
				dependencies = [dependencies];
			}
			for (var i = 0; i < dependencies.length; i++) {
				var d = dependencies[i];
				d     = this._correct_name(d);
				if (!this.is_loaded(d)) {
					corrected.push(d);
				}
			}
			return corrected;
		},
		add:                   function (name, from, ld) {
			name = name.toLowerCase().trim();
			if (this._loaded[name]) return true;
			this._loaded[name]      = true;
			this.resolve(name, ld || false, from);
			var waiting_names       = this._unloaded[name];
			var latest_dependencies = false;
			if (waiting_names) {
				var len = waiting_names.length;
				for (var i = 0; i < len; i++) {
					var w_name  = waiting_names[i];
					w_name      = this._correct_name(w_name);
					var waiting = this._waiting[w_name];
					if (typeof waiting !== "object" || waiting.timeout === false) continue;
					latest_dependencies  = waiting.dependencies;
					waiting.dependencies = this._correct_dependencies(waiting.dependencies);
					if (!waiting.dependencies.length) this.add(w_name, name, latest_dependencies);
				}
				delete this._unloaded[name];
			}
			if (this._waiting[name]) delete this._waiting[name];
			return true;
		},
		resolve:               function (name, ld, from) {
			var waiting = this._waiting[name];
			//Sm.CONFIG.DEBUG && console.log('res - ', [name, from]);
			if (!waiting || waiting.timeout === false) return false;
			//Sm.CONFIG.DEBUG && console.log('name - ', name, ' - from - ', from);
			clearTimeout(waiting.timeout);
			var fn      = waiting.fn;
			delete this._waiting[name];
			fn(ld || false);
		},
		_bb:                   {},
		when_loaded:           function (dependencies, fn, name, time_out) {
			var self = Sm.loaded;
			var latest_dependencies = false;
			return new Promise(function (p_res, reject) {
				latest_dependencies = dependencies;
				dependencies        = self._correct_dependencies(dependencies);
				//name the ones that don't have a name based on their dependencies. Add a random string to avoid clobbering
				if (!name) name = dependencies.join ? dependencies.join(',') + '-boonman' : dependencies + '-boonman';
				name = self._correct_name(name);
				if (self.is_loaded(name)) p_res([]);
				var n_r = function (fn_, ld) {
					p_res(name, ld || latest_dependencies || false);
					var s = fn_(ld || latest_dependencies || false);
					//Sm.CONFIG.DEBUG && console.log(name, ' -- added - ', s ? s : ' ');
					return s;
				};
				var rej = function (arg) {
					reject();
					Sm.CONFIG.DEBUG && console.log('rejecting ', name, ' because of ', arg);
				};

				var n_i = dependencies.indexOf(name);
				if (n_i > -1) dependencies.splice(n_i, 1);
				var other_fn = fn;
				if (typeof fn !== "function") fn = function () {
					Sm.CONFIG.DEBUG && console.log('no_fn ' + name);
					return other_fn;
				};
				if (!dependencies.length) {
					var r_ = n_r(fn, '_');
					self.add(name, 'when_loaded', latest_dependencies);
					return r_;
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
							latest_dependencies = waiting.dependencies;
							var d_s             = self._correct_dependencies(waiting.dependencies);
							if (!d_s.length || (d_s.length === 1 && d_s[0] == name)) {
								var res = n_r(fn, latest_dependencies);
								self.add(name, 'timeout', latest_dependencies);
								return res;
							}
							self._waiting[name].timeout = false;
							Sm.CONFIG.DEBUG && console.log('timeout -- ', d_s, ' -- ', name);
							return rej(d_s);
						}, time_out || 10000),
						fn:           n_r.bind(null, fn, latest_dependencies),
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
	require(['Sm-Core-Core']);
	require(['tooltipster']);
	require(['SmHighlight']);
	require(['Cocktail']);
	require(['Sm-Entities-Abstraction-SmEntity']);
	require(['Sm-Entities-Abstraction-Garage']);
	Cocktail.patch(backbone);


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
			} else {
				var n = Sm.Core.Identifier.retrieve(val);
				if (n) Sm.CONFIG.DEBUG && console.log(n.getResource());
			}
		};
		button.addEventListener('click', fn);
		debug.addEventListener('keyup', function (e) {
			if (e.keyCode == 13)fn();
		});
	}, 'Sm_debug_handler');


	dnd_el && dnd_el.addEventListener('change', function () {Sm.CONFIG.DRAG_MODE = this.checked;});
	return Sm;
});