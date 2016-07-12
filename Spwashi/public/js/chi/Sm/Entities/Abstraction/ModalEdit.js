/**
 * Created by Sam Washington on 7/8/16.
 */
require(['require', 'Class', 'Sm', 'Sm/Extras/Modal'], function (require, Class) {
    Sm.loaded.when_loaded(['Extras_Modal'], function () {
        Sm.Entities.Abstraction.Modal      = Sm.Entities.Abstraction.Modal || {};
        /**
         * @alias Sm.Entities.Abstraction.Modal.Edit
         * @prop {Array} Sm.Entities.Abstraction.Modal.Edit.MvComboArr {@see Sm.Entities.Abstraction.Modal.Edit.MvComboArr}
         */
        Sm.Entities.Abstraction.Modal.Edit = Sm.Extras.Modal.extend({
            /**
             *
             * @param settings
             * @param settings.MvCombo
             * @param settings.self_type
             * @param settings.display_type
             * @param settings.relationship_object
             */
            init:                 function (settings) {
                settings       = settings || {};
                var MvComboArr = settings.MvCombo;
                this.self_type = settings.self_type || false;
                if (!!MvComboArr && MvComboArr.constructor !== Array) MvComboArr = [MvComboArr];
                if (settings.relationship_object) this.relationship_object = settings.relationship_object;
                this.display_type = (settings.display_type || 'full') + '.modal[edit]';
                /**
                 * @alias Sm.Entities.Abstraction.Modal.Edit.MvComboArr
                 * @type {Array<Sm.Core.MvCombo>}
                 */
                this.MvComboArr   = MvComboArr || false;
                this.ViewArr      = [];

                var res    = Sm.Extras.Modal.prototype.init.apply(this, arguments);
                this.create_modal_element();
                var events = ['save', 'before_save', 'after_save', 'open', 'close', 'view_relationships', 'add_entity', 'select'];
                for (var i = 0; i < events.length; i++) {
                    var ev_name = events[i];
                    var fn      = Sm.Entities.Abstraction.Modal.Edit['on_' + ev_name] || function () {};
                    this.on(ev_name, fn.bind(this));
                }
                this.changed_attributes = {};
                return res;
            },
            update:               function () {
                //Sm.CONFIG.DEBUG && console.log("Not sure how to update this View");
            },
            /**
             * @this Sm.Entities.Abstraction.Modal.Edit
             * @param response
             * @param changed_attributes
             */
            success:              function (response, changed_attributes) {
                var $modal_content = this.get_content_element(true);

                /** @type {Sm.Entities.Abstraction.Edit.MvComboArr}  */
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
            get_info_from_form:   function () {
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
         * @typedef {function}  Sm.Entities.Abstraction.Modal.Edit.on_event
         */

        Sm.Entities.Abstraction.Modal.Edit.on_before_save        = function () {
            this.clear_errors();
            var $content_element    = this.get_content_element(true);
            $content_element.addClass('saving');
            this.changed_attributes = this.get_info_from_form();
        };
        /**
         * @type Sm.Entities.Abstraction.Modal.Edit.on_event
         */
        Sm.Entities.Abstraction.Modal.Edit.on_save               = function () {
            this.emit('before_save', this, this.content_element);
            var self       = this;
            var MvComboArr = this.MvComboArr;
            if (MvComboArr.length === 1) {
                var MvCombo_ = MvComboArr[0];
                return MvCombo_.save({
                    silent: true,
                    patch:  true
                }).then(function (result) {
                    return self.resolve('after_save', result);
                });
            }
            return Promise.reject("Not sure what to do with multiple MvCombos yet");
        };
        Sm.Entities.Abstraction.Modal.Edit.on_after_save         = function (result) {
            this.$content_element.removeClass('saving');
            Sm.CONFIG.DEBUG && console.log(result);
            this.success(result, this.changed_attributes);
            this.changed_attributes = {};
            return result;
        };
        Sm.Entities.Abstraction.Modal.Edit.on_open               = function () {
            var content_element = this.content_element;
            var self            = this;
            this.MvComboArr.forEach(function (current_element, index) {
                self.ViewArr.push(current_element.addView(content_element, false, {display_type: self.display_type}));
            });
        };
        Sm.Entities.Abstraction.Modal.Edit.on_close              = function () {
            var ViewArr = this.ViewArr;
            for (var i = 0; i < ViewArr.length; i++) {
                var View_ = ViewArr[i];
                View_ && View_.destroy();
            }
        };
        Sm.Entities.Abstraction.Modal.Edit.on_view_relationships = function () {
            if (!this.self_type) {
                Sm.CONFIG.DEBUG && console.log("No self type in this modal!");
                return;
            }
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
        Sm.Entities.Abstraction.Modal.Edit.on_add_entity         = function () {
            Sm.CONFIG.DEBUG && console.log(arguments);
        };
        Sm.Entities.Abstraction.Modal.Edit.on_select             = function () {
            var self = this;
            this.resolve('save').then(function (res) {
                self.create_modal_element();
            }).catch(function (res) {
                Sm.CONFIG.DEBUG && console.log(res);
            });
        };
    }, 'Entities_Abstraction_Modal_Edit');
});
