/**
 * Created by Sam Washington on 7/8/16.
 */
require(['require', 'Class', 'Sm', 'Sm/Extras/Modal'], function (require, Class) {
    Sm.loaded.when_loaded('Extras_Modal', function () {

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
             */
            init:                function (settings) {
                settings       = settings || {};
                var MvComboArr = settings.MvCombo;
                this.self_type = settings.self_type || false;
                if (!!MvComboArr && MvComboArr.constructor !== Array) {
                    MvComboArr = [MvComboArr];
                }
                this.display_type = settings.display_type || 'full.modal';
                /**
                 * @alias Sm.Entities.Abstraction.Modal.Destroy.MvComboArr
                 * @type {Array<Sm.Core.MvCombo>}
                 */
                this.MvComboArr   = MvComboArr || false;
                this.ViewArr      = [];

                var res = Sm.Extras.Modal.prototype.init.apply(this, arguments);
                Sm.Entities.Abstraction.Modal.Destroy.generate_element.call(this).then(function (result) {
                    Sm.CONFIG.DEBUG && console.log(result);
                });
                ///
                var events = ['save', 'before_save', 'after_save', 'open', 'close', 'view_relationships', 'add_entity', 'select'];
                for (var i = 0; i < events.length; i++) {
                    var ev_name = events[i];
                    var fn      = Sm.Entities.Abstraction.Modal.Destroy['on_' + ev_name] || function () {};
                    this.on(ev_name, fn.bind(this));
                }
                this.changed_attributes = {};
                return res;
            },
            /**
             *
             * @param and_$
             * @return {HTMLElement|$|Node}
             */
            get_content_element: function (and_$) {
                this.$content_element = this.$content_element || $(this.content_element);
                return !!and_$ ? this.$content_element : this.content_element;
            },
            clear_errors:        function () {
                var all_errors = this.get_content_element(true).find('.error');
                for (var j = 0; j < all_errors.length; j++) {
                    var el = all_errors[j];
                    el && (el.innerHTML = '');
                }
            },
            update:              function () {
                Sm.CONFIG.DEBUG && console.log("Not sure how to update this View");
            },
            /**
             * @this Sm.Entities.Abstraction.Modal.Destroy
             * @param response
             * @param changed_attributes
             */
            success:             function (response, changed_attributes) {
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

                    var errors = response.message.errors || {};
                    var _Model = MvCombo_.Model || {};


                    _Model.set(response_model, {silent: true});
                    this.update();
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

                        }
                    }
                    var self = this;
                    MvCombo_.forEachView(function () {
                        /** @type {Sm.Core.SmView|*}  */
                        var View = this;
                        if (!View || (SelfView && self.cid == View.cid)) return;
                        View.update();
                        View.refresh_all();
                    });
                }
            },
            get_info_from_form:  function () {
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
            }
        });

        Sm.Entities.Abstraction.Modal.Destroy.generate_element = function () {
            if (this.MvComboArr.length === 1) {
                var MvCombo_  = this.MvComboArr[0];
                var self      = this;
                var self_type = this.self_type;
                return Sm.Entities[self_type].Garage.generate(this.display_type + '.modal', MvCombo_).catch(function (reason) {
                    alert('There was an error - 1 - ' + reason);
                }).then(function (result) {
                    if (self.status.is_open) {
                        var fn = (function () {self._changeElement(result);}).bind(self);
                        self.on('before_save', fn);
                        self.emit('save');
                        self.off('before_save', fn);
                    } else {
                        self.element = result;
                        self.setElement(result);
                    }
                }).catch(function (reason) {
                    alert('There was an error - ' + reason);
                });
            }
            return Promise.reject("Could ot figure out what to do");
        };

        /**
         * @typedef {function}  Sm.Entities.Abstraction.Modal.Destroy.on_event
         */

        Sm.Entities.Abstraction.Modal.Destroy.on_before_save        = function () {
            this.clear_errors();
            var $content_element    = this.get_content_element(true);
            $content_element.addClass('saving')
            this.changed_attributes = this.get_info_from_form();
        };
        /**
         * @type Sm.Entities.Abstraction.Modal.Destroy.on_event
         */
        Sm.Entities.Abstraction.Modal.Destroy.on_save               = function () {
            this.emit('before_save', this, this.content_element);
            var self       = this;
            var MvComboArr = this.MvComboArr;
            if (MvComboArr.length === 1) {
                var MvCombo_ = MvComboArr[0];
                return MvCombo_.save({
                    silent: true,
                    patch:  true
                }).then(function (result) {
                    return self.emit('after_save', result);
                });
            }
            return Promise.reject("Not sure what to do with multiple MvCombos yet");
        };
        Sm.Entities.Abstraction.Modal.Destroy.on_after_save         = function (result) {
            this.$content_element.removeClass('saving');
            this.success(result, this.changed_attributes);
        };
        Sm.Entities.Abstraction.Modal.Destroy.on_open               = function () {
            var content_element = this.content_element;
            var self            = this;
            this.MvComboArr.forEach(function (current_element, index) {
                self.ViewArr.push(current_element.addView(content_element, false, {display_type: self.display_type}));
            });
        };
        Sm.Entities.Abstraction.Modal.Destroy.on_close              = function () {
            Sm.CONFIG.DEBUG && console.log("Remove this from memory!!");
        };
        Sm.Entities.Abstraction.Modal.Destroy.on_view_relationships = function () {
            if (!this.self_type) return;
            if (this.MvComboArr.length !== 1) {
                Sm.CONFIG.DEBUG && console.log("Not sure what to do in this situation!");
                return;
            }
            var self_type              = this.self_type;
            var MvCombo_               = this.MvComboArr[0];
            var $modalContent          = this.get_content_element(true);
            var relationship_container = $modalContent.find('.view_relationship-container')[0];
            Sm.Entities[self_type]
            && Sm.Entities[self_type].Garage.generate('relationships', MvCombo_).catch(function (errr) {
                Sm.CONFIG.DEBUG && console.log(errr);
            }).then(function (result) {
                if (relationship_container) {
                    if (typeof result == 'string') {
                        Sm.CONFIG.DEBUG && console.log(result);
                        relationship_container.innerHTML = '<hr>' + result;
                    } else {
                        relationship_container.innerHTML = '<hr>';
                        try {
                            relationship_container.appendChild(result);
                        } catch (e) {
                            Sm.CONFIG.DEBUG && console.log(e);
                        }
                    }
                }
            }).catch(function (e) {
                Sm.CONFIG.DEBUG && console.log(e);
            });
        };
        Sm.Entities.Abstraction.Modal.Destroy.on_add_entity         = function () {};
        Sm.Entities.Abstraction.Modal.Destroy.on_select             = function () {
            Sm.Entities.Abstraction.Modal.Destroy.generate_element.call(this);

        };

        Sm.loaded.add('Entities_Abstraction_Modal_Destroy');
    });

});
