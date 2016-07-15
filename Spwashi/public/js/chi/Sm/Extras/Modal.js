/**
 * Created by Sam Washington on 1/4/16.
 */
require(['require', 'Emitter', 'Sm'], function (require, Emitter) {
    require('Sm');
    require(['require', 'Sm/Extras/ViewAid'], function () {});
    Sm.loaded.when_loaded('Extras_ViewAid', function () {
        "use strict";
        var _f               = function () {};
        /**
         * These are the default settings for the Modal Dialog class
         * @type {{template_string: string, content_element_selector: string, click_events: Array, events: {save: Function, open: Function, close: Function, edit: Function, add: Function}, closeKey: number}}
         */
        var default_settings = {
            template_string:          '<div class="modal">\n    <div class="modal-content"></div>\n</div>',
            content_element_selector: '.modal-content',
            click_events:             [],
            events:                   {
                save:  _f,
                open:  _f,
                close: _f,
                edit:  _f,
                add:   _f
            },
            closeKey:                 27
        };

        /**
         * A function to be used as a click handler
         * Checks to see which Modal should take the
         * @param e
         * @return {boolean}
         */
        var top_level_modal_handler = function (e) {
            /** @type {Sm.Extras.Modal} The to level modal dialog */
            var modal = Sm.Extras.Modal.open_modals[Sm.Extras.Modal.open_modals.length - 1];
            if (!modal) return true;
            if (typeof modal.settings.closeKey !== "number") modal.settings.closeKey = 27;
            if (e.which == 27) {
                modal.close();
            } else if (e.ctrlKey && e.which == 83) { //s - save
                e.stopPropagation();
                e.preventDefault();
                if (!!Sm.Extras.Modal.sm_modal_save) return false;
                Sm.Extras.Modal.sm_modal_save = true;
                modal.emit('save', modal, modal.content_element);
                window.setTimeout(function () {
                    Sm.Extras.Modal.sm_modal_save = false;
                }, 1500);
                return false;
            }
        };
        Sm.Extras.Modal             = Sm.Extras.ViewAid.extend({
            /**
             *
             * @param settings
             * @param settings.template_string
             * @param settings.content_element_selector
             * @param settings.relationship_object
             * @param settings.click_events
             * @param settings.events
             * @param settings.self_type
             * @param settings.events_to_trigger
             * @param settings.promise_object
             * @param settings.closeKey
             */
            init:                 function (settings) {
                try {
                    settings               = settings || {};
                    this.self_type         = settings.self_type || false;
                    this.events_to_trigger = settings.events_to_trigger || [];
                    var MvComboArr         = settings.MvCombo;
                    if (!!MvComboArr && MvComboArr.constructor !== Array) MvComboArr = [MvComboArr];
                    this.MvComboArr = MvComboArr || false;

                    if (settings.relationship_object) this.relationship_object = settings.relationship_object;
                    this.display_type = this.display_type || ((settings.display_type || 'full') + '.modal');


                    this.promise_object         = settings.promise_object || {};
                    this.promise_object.resolve = this.promise_object.resolve || function () {return true};
                    this.promise_object.reject  = this.promise_object.reject || function () {return false};

                    this.ViewArr                   = [];
                    /** @type {HTMLElement|null} */
                    this.element                   = null;
                    default_settings.click_events  = [];
                    this.settings                  = Sm.Core.util.merge_objects(default_settings, settings);
                    this.settings.action_classname = 'modal-button';

                    Sm.Extras.Modal.open_modals = Sm.Extras.Modal.open_modals || [];
                    Sm.Extras.ViewAid.prototype.init.apply(this, arguments);
                    for (var i              = 0; i < this.events_to_trigger.length; i++) {
                        var ev_name = this.events_to_trigger[i];
                        var fn      = this['on_' + ev_name] || function () {};
                        this.on(ev_name, fn.bind(this));
                    }
                    this.create_modal_element().catch(function (e) {
                        Sm.CONFIG.DEBUG && console.log('modal,init,0', e);
                        throw e;
                    });
                    this.changed_attributes = {};
                } catch (e) {
                    Sm.CONFIG.DEBUG && console.log('modal,init,1', e);
                }
            },
            init_events:          function () {
                if (Sm.Extras.ViewAid.prototype.init_events.apply(this, arguments)) {
                    document.addEventListener("keydown", top_level_modal_handler);
                }
            },
            /**
             *
             * @param and_$
             * @return {HTMLElement|Node|$}
             */
            get_content_element:  function (and_$) {
                this.$content_element = this.$content_element || $(this.content_element);
                return !!and_$ ? this.$content_element : this.content_element;
            },
            close:                function () {
                $('body').removeClass('modal-blur');

                this.element.removeEventListener('click', this.get_bound('click_handler'));
                this.element && this.element.parentNode.removeChild(this.element);
                this.emit('before_close', this, this.content_element);
                this.element = this.content_element = null;
                this.status.is_open = false;
                Sm.Extras.Modal.open_modals.splice(Sm.Extras.Modal.open_modals.indexOf(this), 1);
                if (!Sm.Extras.Modal.open_modals.length) {
                    document.removeEventListener("keydown", top_level_modal_handler);
                }
                this.emit('close', this, this.content_element);
            },
            get_info_from_form:   function (query_selector) {
                var $modal_content = this.get_content_element(true);
                if (this.MvComboArr.length === 1) {
                    var _Model    = this.MvComboArr[0].Model;
                    var edit      = $modal_content.find(query_selector);
                    var set_thing = {};
                    for (var i = 0; i < edit.length; i++) {
                        var $elem = $(edit[i]);
                        var elem  = edit[i];
                        var val   = $elem.val();
                        val.trim && (val = val.trim());
                        var name  = $elem.attr('name');
                        if (name == 'has_title') val = !!elem.checked ? 1 : 0;

                        if (!!name) set_thing[name] = val;
                        var o   = {};
                        o[name] = val + '';
                    }
                }
                return (this.changed_attributes = set_thing);
            },
            create_modal_element: function () {
                var self      = this;
                var self_type = this.self_type;
                try {
                    return this.generate_element().catch(function (reason) {
                        Sm.CONFIG.DEBUG && console.log('modal,CMA,0', reason);
                        throw reason;
                    }).then(function (result) {
                        if (self.status.is_open) {
                            self._changeElement(result);
                        } else {
                            self.element = result;
                            self.setElement(result);
                        }
                    }).catch(function (reason) {
                        Sm.CONFIG.DEBUG && console.log('modal,CMA,1', reason);
                        throw  reason;
                    });
                } catch (e) {
                    Sm.CONFIG.DEBUG && console.log('modal,cme,0', e);
                    throw e;
                }
            },
            generate_element:     function (config) {
                try {
                    if (this.MvComboArr.length === 1) {
                        var MvCombo_  = this.MvComboArr[0];
                        var self_type = this.self_type;
                        return Sm.Entities[self_type].Garage.generate(this.display_type, MvCombo_, {config: config});
                    }
                } catch (e) {
                    Sm.CONFIG.DEBUG && console.log('Modal,ge,0', e);
                    return Promise.reject(e);
                }
                return Promise.reject("Could not figure out how to generate this element");
            },
            open:                 function () {
                this.emit('before_open', this);
                this.element = (typeof this.settings.template_string === "string")
                    ? Sm.Core.util.createElement(_.template(this.settings.template_string)(), true)
                    : false;
                if (!this.element) {
                    Sm.CONFIG.DEBUG && console.log('no open');
                    return false;
                }
                $('body').addClass('modal-blur');
                var $modal   = $(this.element);
                var m_c      = this.content_element = $modal.find(this.settings.content_element_selector)[0];
                if (m_c) this.content_element.innerHTML = this.html;
                if (!this.content_element) return false;
                this.init_events();
                this.status.is_open                     = true;
                Sm.Extras.Modal.open_modals.push(this);
                try { document.documentElement.appendChild(this.element);} catch (e) {console.log(e) }
                this.emit('open', this, this.content_element);
            },
            success:              function () {return Promise.reject("There is no implementation for this method - Modal.success")},
            update:               function () {},
            set_errors:           function (attr_name, reason, actual_value) {
                var $modal_content = this.get_content_element(true);
                if (actual_value != undefined) {
                    var potential_els = $modal_content.find('[data-attribute=' + attr_name + ']');
                    for (var i = 0; i < potential_els.length; i++) {
                        var element          = potential_els[i];
                        var el_parent        = element.parentNode;
                        var potential_errors = $(el_parent).find('.error');
                        var error            = potential_errors[0];

                        if (element.hasOwnProperty('checked')) {
                            element.checked = !!actual_value
                        } else {
                            $(element).val(actual_value);
                            element.innerHTML && (element.innerHTML = actual_value);
                        }
                        error && (error.innerHTML = reason);
                    }
                }
            },
            clear_errors:         function () {
                var all_errors = this.get_content_element(true).find('.error');
                for (var j = 0; j < all_errors.length; j++) {
                    var el = all_errors[j];
                    el && (el.innerHTML = '');
                }
            }
        });

        Sm.loaded.add('Extras_Modal');
    }, 'Extras_Modal');
});