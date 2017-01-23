/**
 * Created by Sam Washington on 11/6/16.
 */
/**
 * @global
 * @type {{Core:{}, Extras: {}, Entities: {}, CONFIG:{}, Abstraction: {}, Exceptions: {}}}
 */
var Sm = window.Sm = {};
define([
           'require',
           'jquery',
           'Cocktail',
           'backbone'
       ],
       /**
        * @param require
        * @param $
        * @param Cocktail
        * @param backbone
        * @return {{}}
        */
       function (require, $, Cocktail, backbone) {
           var dl_el               = document.getElementById('d_l');
           var debug_level         = dl_el ? dl_el.value : false;
           var factshift_config_el = document.getElementById('factshift_config');
           Sm.CONFIG               = {DEBUG: parseInt(debug_level) + 1};
           Sm.Core                 = {};
           Sm.Extras               = {};
           Sm.Abstraction          = {};
           Sm.Entities             = {
               _info: factshift_config_el ? JSON.parse(factshift_config_el.textContent) : {entities: {}}
           };
           /**
            * An object to keep track of which objects have been loaded
            * @property add         {Function}  Add an object as loaded {@link Sm.Core.dependencies.add}
            * @property when_loaded {Function}  Add an object as loaded {@link Sm.Core.dependencies.add}
            * @property is_loaded   {Function}  Return whether the object has been loaded {@link Sm.Core.dependencies.add}
            */
           Sm.Core.dependencies = {
               _loaded:               {},
               _unloaded:             {},
               _waiting:              {},
               _correct_name:         function (name) {
                   return name.toLowerCase().trim().replace(/(\s|_|-)/g, '_');
               },
               _correct_dependencies: function (dependencies) {
                   var corrected = [];
                   if (!dependencies)return [];
                   if (dependencies.constructor !== Array) {
                       dependencies = [dependencies];
                   }
                   for (var i = 0; i < dependencies.length; i++) {
                       var d = this._correct_name(dependencies[i]);
                       if (!this.is_loaded(d)) corrected.push(d);
                   }
                   return corrected;
               },
               add:                   function (name) {
                   // Make sure he name is in the correct format
                   name = this._correct_name(name);

                   // If this has already been loaded, we good fam
                   if (this._loaded[name]) return true;

                   this._loaded[name] = true;

                   // Run the function
                   this.resolve(name);

                   // Iterate through the names of the functions that were waiting on this dependency and resolve them if we can
                   var waiting_names = this._unloaded[name];

                   // If this has any dependencies
                   if (waiting_names) {
                       var len = waiting_names.length;

                       for (var i = 0; i < len; i++) {
                           var w_name  = waiting_names[i];
                           var waiting = this._waiting[w_name];

                           if (!waiting) continue;
                           var _is_obj = typeof waiting === "object";
                           if (!_is_obj || waiting.timeout === false) {
                               Sm.CONFIG.DEBUG && console.log(w_name, (waiting), ' could not be resolved because it ', !_is_obj ? "is malformed" : " has timed out");
                               continue;
                           }
                           waiting.dependencies = this._correct_dependencies(waiting.dependencies);

                           // If all dependencies have been resolved, add the name
                           if (!waiting.dependencies.length) this.add(w_name);
                       }
                       delete this._unloaded[name];
                   }
                   if (this._waiting[name]) this._waiting[name] = null;
                   return true;
               },
               /**
                * Resolve the function
                * @param {string}       name
                * @return {boolean}
                * @private
                */
               resolve:               function (name) {
                   var waiting = this._waiting[name];
                   if (!waiting || waiting.timeout === false) return false;

                   // There is no reason to have the timeout function anymore
                   clearTimeout(waiting.timeout);

                   // Call the function
                   var fn = waiting.fn;
                   delete this._waiting[name];
                   fn(name);
               },
               _bb:                   {},
               on_load:               function (dependencies, fn, name, timeout, other) {
                   // format all of the dependencies, removing the ones that already have been loaded
                   dependencies = this._correct_dependencies(dependencies);
                   if (typeof fn === "string") {
                       name = fn;
                       fn   = false;
                   }

                   // Make sure the name is in the right format
                   if (name) name = this._correct_name(name);

                   // Just in case there isn't a name, assign it a temporary (random) name for the sake of resolution
                   // Here, we append a random string to avoid naming collisions
                   var tmp_name = name || ((dependencies.join ? dependencies.join(',') : dependencies) + Math.random());

                   // If there isn't a function, make something that we can run
                   fn = fn || function () {};

                   var Self = this;
                   return new Promise(function (resolve_promise, reject) {
                       /**
                        * Run the function and resolve the promise.
                        * @return {*}
                        */
                       var resolve = function () {
                           try {
                               var res = fn();
                               resolve_promise(res);
                               return res;
                           } catch (e) {
                               reject();
                               throw new Sm.Exceptions.Error("Error", null, null, e)
                           }
                       };
                       // If the dependant is already loaded, resolve the function
                       if (name && Self.is_loaded(name)) return resolve();

                       // If there are no more dependencies, resolve the function
                       if (!dependencies.length) {
                           var res = resolve();
                           if (!name) return res;
                           Self.add(name);
                           return res;
                       } else {
                           // Iterate through the dependencies and
                           for (var i = 0; i < dependencies.length; i++) {
                               var d             = dependencies[i];
                               Self._unloaded[d] = Self._unloaded[d] || [];
                               Self._unloaded[d].push(tmp_name);
                           }

                           // Register the dependant object
                           Self._waiting[tmp_name] = Self._create_dependant_obj(tmp_name,
                                                                                name,
                                                                                dependencies,
                                                                                resolve,
                                                                                reject,
                                                                                other)
                       }
                   });
               },
               _create_dependant_obj: function (tmp_name, name, dependencies, resolve, reject, other) {
                   var Self = this;
                   return {
                       timeout:      setTimeout(function () {
                           var waiting = Self._waiting[name];
                           if (!waiting || waiting.timeout === false) return;

                           // Check to make se if the dependencies have been met
                           var d_s = Self._correct_dependencies(waiting.dependencies);
                           if (!d_s.length || (d_s.length === 1 && d_s[0] == name)) {
                               var res = resolve();
                               if (!name)return res;
                               Self.add(name);
                               return res;
                           }

                           // Mark the function as having timed out
                           Self._waiting[tmp_name].timeout = false;

                           Sm.CONFIG.DEBUG && console.log('timeout -- ', d_s, ' -- ', tmp_name);

                           // Reject the promise
                           return reject('timeout -- ', d_s, ' -- ', tmp_name);
                       }, 10000),
                       dependencies: dependencies,
                       fn:           resolve,
                       other:        other,
                       name:         name,
                       tmp_name:     tmp_name,
                       has_tmp_name: !name
                   };
               },
               is_loaded:             function (name) {
                   if (name.constructor === Array) {
                       for (var i = 0; i < name.length; i++) {
                           var m = name[i];
                           if (!this.is_loaded(m)) return false;
                       }
                       return true;
                   }
                   name = this._correct_name(name);
                   return !!this._loaded[name];
               }
           };
           require(['Sm-Core-Core']);
           require(['Sm-urls-api']);
           require(['Cocktail']);
           Cocktail.patch(backbone);
           Sm.Exceptions                   = {};
           Sm.Exceptions.Error             = function (msg, details, id, e) {
               details    = details || null;
               this.stack = (new Error()).stack;
               if (Sm.urls && Sm.urls.base_url) {
                   this.stack = this.stack.replace(Sm.urls.js, '');
               }
               Sm.CONFIG.DEBUG && console.group(msg);
               details && Sm.CONFIG.DEBUG && console.log(details);
               Sm.CONFIG.DEBUG && console.log(this.stack.split('\n').slice(1, 3).join(' \n'));
               id && Sm.CONFIG.DEBUG && console.log(id);
               e = e || this;
               if (e && (typeof e === 'object') && e.message) {
                   Sm.CONFIG.DEBUG && console.log(e.name);
                   Sm.CONFIG.DEBUG && console.log(e.message);
                   e.lineNumber && Sm.CONFIG.DEBUG && console.log(e.lineNumber);
                   Sm.CONFIG.DEBUG && console.log(e.stack.split('\n')[1]);
                   e.fileName && Sm.CONFIG.DEBUG && console.log(e.fileName);
               }
               Sm.CONFIG.DEBUG && console.groupEnd();
           };
           Sm.Exceptions.Error.prototype   = Object.create(Error.prototype);
           Sm.Exceptions.Error.constructor = Object.create(Sm.Exceptions.Error);

           Sm.CONFIG.DEBUG && Sm.Core.dependencies.on_load('Core_Identifier', function () {
               var debug = document.getElementById('debug_identifier');
               if (!debug) return;
               var button = document.getElementById('debug_identifier_button');
               if (!button) return;
               var fn = function () {
                   var val = debug.value;
                   val     = val.trim();
                   Sm.CONFIG.DEBUG && console.log('--');
                   if (val == 'loaded') {
                       Sm.CONFIG.DEBUG && console.log(Sm.Core.dependencies._loaded);
                       return;
                   } else if (val in Sm.Entities) {
                       Sm.CONFIG.DEBUG && console.log(Sm.Entities[val]);
                       var v              = {};
                       var entityStatuses = Sm.Entities[val].Wrapper.entityStatuses;
                       var loaded         = entityStatuses.loaded;
                       for (var r_id in loaded) {
                           if (!loaded.hasOwnProperty(r_id)) continue;
                           v[loaded[r_id].getId() + '|' + loaded[r_id].getR_ID()] = loaded[r_id];
                       }
                       Sm.CONFIG.DEBUG && console.log(v);
                       Sm.CONFIG.DEBUG && console.log({entities: Sm.Entities[val].Wrapper.entityStatuses});
                       return;
                   }
                   var n = Sm.Core.Identifier.retrieve(val);
                   if (n) Sm.CONFIG.DEBUG && console.log(n.getResource());
               };
               button.addEventListener('click', fn);
               debug.addEventListener('keyup', function (e) {
                   if (e.keyCode == 13)fn();
               });
           }, 'Sm_debug_handler');
           Sm.CONFIG.DEBUG && console.log(Sm);
           return Sm;
       });