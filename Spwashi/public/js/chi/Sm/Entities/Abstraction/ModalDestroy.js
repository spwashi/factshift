/**
 * Created by Sam Washington on 7/8/16.
 */
require(['require', 'Class', 'Sm', 'Sm/Extras/Modal'], function (require, Class) {
    Sm.loaded.when_loaded(['Extras_Modal'], function () {
        Sm.CONFIG.DEBUG && console.log('HERE AND READY');
        Sm.Entities.Abstraction.Modal         = Sm.Entities.Abstraction.Modal || {};
        /**
         * @alias Sm.Entities.Abstraction.Modal.Destroy
         * @prop {Array} Sm.Entities.Abstraction.Modal.Destroy.MvComboArr {@see Sm.Entities.Abstraction.Modal.Destroy.MvComboArr}
         */
        Sm.Entities.Abstraction.Modal.Destroy = Sm.Extras.Modal.extend({
            /**
             *
             * @param settings
             * @param settings.MvCombo
             * @param settings.self_type
             * @param settings.display_type
             * @param settings.relationship_object
             * @param settings.promise_object
             */
            init:               function (settings) {
                settings       = settings || {};
                var MvComboArr = settings.MvCombo;
                this.self_type = settings.self_type || false;
                if (!!MvComboArr && MvComboArr.constructor !== Array) MvComboArr = [MvComboArr];
                if (settings.relationship_object) this.relationship_object = settings.relationship_object;
                this.display_type           = (settings.display_type || 'full') + '.modal[destroy]';
                this.promise_object         = settings.promise_object || {};
                this.promise_object.resolve = this.promise_object.resolve || function () {
                        Sm.CONFIG.DEBUG && console.log(true);
                        return true
                    };
                this.promise_object.reject  = this.promise_object.reject || function () {return false};
                /**
                 * @alias Sm.Entities.Abstraction.Modal.Destroy.MvComboArr
                 * @type {Array<Sm.Core.MvCombo>}
                 */
                this.MvComboArr             = MvComboArr || false;
                this.ViewArr                = [];

                var res    = Sm.Extras.Modal.prototype.init.apply(this, arguments);
                this.create_modal_element();
                var events = ['open', 'close', 'choose'];
                for (var i = 0; i < events.length; i++) {
                    var ev_name = events[i];
                    var fn      = Sm.Entities.Abstraction.Modal.Destroy['on_' + ev_name] || function () {};
                    this.on(ev_name, fn.bind(this));
                }
                this.changed_attributes = {};
                return res;
            },
            update:             function () {
                //Sm.CONFIG.DEBUG && console.log("Not sure how to update this View");
            },
            /**
             * @this Sm.Entities.Abstraction.Modal.Destroy
             * @param response
             * @param changed_attributes
             */
            success:            function (response, changed_attributes) {
                var $modal_content = this.get_content_element(true);

                /** @type {Sm.Entities.Abstraction.Destroy.MvComboArr}  */
                var MvComboArr = this.MvComboArr;
                if (MvComboArr.length === 1) {
                    var MvCombo_              = MvComboArr[0];
                    var SelfView              = this.ViewArr[0];
                    response                  = response || {
                            message: {
                                text:      'Undefined error',
                                changed:   [],
                                defaulted: [],
                                deferred:  [],
                                errors:    []
                            },
                            success: false
                        };
                    response.message          = response.message || {};
                    var changed_on_server_arr = response.message.changed || [];
                    var response_model        = response.message.model || {};
                    var defaulted             = response.message.defaulted || {};

                    var errors      = response.message.errors || {};
                    var _Model      = MvCombo_.Model || {};

                    _Model.clear({silent: true});
                    _Model.set(response_model, {silent: true});
                    this.update();
                    var changed_arr = [];
                    for (var attr in changed_attributes) {
                        if (!changed_attributes.hasOwnProperty(attr)) continue;
                        if (changed_on_server_arr.indexOf(attr) < 0) {
                            var reason = "Unknown error (1)";
                            if (defaulted[attr]) {
                                reason = defaulted[attr];
                            } else if (errors[attr]) {
                                reason = errors[attr];
                            }
                            var actual_value = response_model[attr];
                            this.set_errors(attr, reason, actual_value);
                        } else {
                            changed_arr.push(attr);
                        }
                    }
                    var self = this;
                    MvCombo_.forEachView(function () {
                        /** @type {Sm.Core.SmView|*}  */
                        var View = this;
                        if (!View || (SelfView && self.cid == View.cid)) return;
                        View.update(changed_arr);
                        View.refresh_all();
                    });
                    return Promise.resolve(changed_arr);
                }
                return Promise.reject("Not sure what to do with multiple MvCombos");
            },
            get_info_from_form: function () {
                var $modal_content = this.get_content_element(true);
                if (this.MvComboArr.length === 1) {
                    var edit      = $modal_content.find('.model.edit');
                    var set_thing = {};
                    var _Model    = this.MvComboArr[0].Model;
                    for (var i = 0; i < edit.length; i++) {
                        var $elem = $(edit[i]);
                        var elem  = edit[i];
                        var val   = $elem.val();
                        val.trim && (val = val.trim());
                        var name  = $elem.attr('name');
                        if (name == 'has_title') val = !!elem.checked ? 1 : 0;

                        if (!!name && val != _Model.get(name)) set_thing[name] = val;
                        var o   = {};
                        o[name] = val + '';
                    }
                    _Model.set(set_thing);
                    return (this.changed_attributes = _Model.changedAttributes());
                }
                return {};
            },

            create_modal_element: function () {
                var self      = this;
                var self_type = this.self_type;
                return this.generate_element().catch(function (reason) {
                    alert('There was an error - 1 - ' + reason);
                }).then(function (result) {
                    if (self.status.is_open) {
                        self._changeElement(result);
                    } else {
                        self.element = result;
                        self.setElement(result);
                    }
                }).catch(function (reason) {
                    alert('There was an error - ' + reason);
                });
            },
            generate_element:     function (config) {
                if (this.MvComboArr.length === 1) {
                    var MvCombo_  = this.MvComboArr[0];
                    var self_type = this.self_type;
                    Sm.CONFIG.DEBUG && console.log(config);
                    return Sm.Entities[self_type].Garage.generate(this.display_type, MvCombo_, {
                        config: config
                    });
                }
                return Promise.reject("Could not figure out how to generate this element");
            }
        });


        /**
         * @typedef {function}  Sm.Entities.Abstraction.Modal.Destroy.on_event
         */

        /**
         * @type Sm.Entities.Abstraction.Modal.Destroy.on_event
         */
        Sm.Entities.Abstraction.Modal.Destroy.on_open   = function () {
            var content_element = this.content_element;
            var self            = this;
            this.MvComboArr.forEach(function (current_element, index) {self.ViewArr.push(current_element.addView(content_element, false, {display_type: self.display_type}));});
        };
        Sm.Entities.Abstraction.Modal.Destroy.on_choose = function (data) {
            Sm.CONFIG.DEBUG && console.log(data);
            return data == "true" ? this.promise_object.resolve(true) : this.promise_object.reject(false);
        };
        Sm.Entities.Abstraction.Modal.Destroy.on_close  = function () {
            var ViewArr = this.ViewArr;
            for (var i = 0; i < ViewArr.length; i++) {
                var View_ = ViewArr[i];
                View_ && View_.destroy();
            }
        };
    }, 'Entities_Abstraction_Modal_Destroy');
});
