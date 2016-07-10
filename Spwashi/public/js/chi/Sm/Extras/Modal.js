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
                save:  false,
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
             * @param settings.click_events
             * @param settings.events
             * @param settings.closeKey
             */
            init: function (settings) {
                settings = settings || {};

                /** @type {HTMLElement|null} */
                this.element                   = null;
                default_settings.click_events  = [];
                this.settings                  = Sm.Core.util.merge_objects(default_settings, settings);
                this.settings.action_classname = 'modal-button';

                Sm.Extras.Modal.open_modals = Sm.Extras.Modal.open_modals || [];
                Sm.Extras.ViewAid.prototype.init.apply(this, arguments);
            },

            init_events:         function () {
                if (Sm.Extras.ViewAid.prototype.init_events.apply(this, arguments)) {
                    document.addEventListener("keydown", top_level_modal_handler);
                }
            },
            /**
             *
             * @param and_$
             * @return {HTMLElement|Node|$}
             */
            get_content_element: function (and_$) {
                this.$content_element = this.$content_element || $(this.content_element);
                return !!and_$ ? this.$content_element : this.content_element;
            },
            close:               function () {
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
            open:                function () {
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
            set_errors:          function (attr_name, reason, actual_value) {
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
            clear_errors:        function () {
                var all_errors = this.get_content_element(true).find('.error');
                for (var j = 0; j < all_errors.length; j++) {
                    var el = all_errors[j];
                    el && (el.innerHTML = '');
                }
            }
        });

        //In case there are multiple modal dialogs open, interact only with the topmost one
        Sm.loaded.add('Extras_Modal');
    }, 'Extras_Modal');
});