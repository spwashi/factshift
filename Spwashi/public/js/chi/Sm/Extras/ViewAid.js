/**
 * Created by Sam Washington on 6/10/16.
 */
require(['require', 'Emitter', 'Sm'],
        /**
         * @lends Emitter
         * @param require
         * @param Emitter
         */
        function (require, Emitter) {
            require('Sm');
            Sm.loaded.when_loaded('Core', function () {
                "use strict";
                Sm.Extras.ViewAid = Emitter.extend({
                    init:                  function (settings) {
                        settings              = settings || {};
                        this.settings         = this.settings || settings;
                        this.html             = '';
                        this._callbacks       = this._callbacks || {};
                        this.status           = {
                            is_open: false
                        };
                        this.init_emitter_events();
                        this.element          = settings.element;
                        this.action_classname = 'view_aid-button';
                        if (!Array.isArray(this.settings.click_events)) this.settings.click_events = [this.settings.click_events];
                        this.settings.click_events.splice(0, 0, this.default_click_handler.bind(this));

                        this.click_events = this.settings.click_events;
                        var el            = this.element;
                        this.html         = Sm.Core.util.isElement(el) ? el.innerHTML : (typeof el === 'string' ? el : '');
                        if (settings.is_open) {
                            this.status.is_open = true;
                            this.init_events();
                        }
                    },
                    _click_handler:        function (e) {
                        if (this.status.is_open) {
                            var click_events = this.settings.click_events;
                            for (var i = 0; i < click_events.length; i++) {
                                var event_handler = click_events[i];
                                if (!(typeof event_handler === "function")) continue;
                                if (false === event_handler(e)) break;
                            }
                        }
                        return true;
                    },
                    init_events:           function () {
                        if (!this.element) return false;
                        var _outsideClickHandler = this.add_bound('outside_click', this._outsideClickHandler);
                        this.element.addEventListener("click", _outsideClickHandler);
                        var bo                   = this.add_bound('click_handler', this._click_handler);
                        this.element.addEventListener('click', bo, true);
                        return true;
                    },
                    setElement:            function (element) {
                        this.html = Sm.Core.util.isElement(element) ? element.innerHTML : (typeof element === 'string' ? element : '');
                    },
                    _changeElement:        function (element) {
                        this.html           = Sm.Core.util.isElement(element) ? element.innerHTML : (typeof element === 'string' ? element : '');
                        var content_element = this.get_content_element();
                        if (content_element)
                            content_element.innerHTML = this.html;
                        this.init_events();
                        this.emit('open');
                    },
                    open:                  function () {
                        this.emit('before_open', this);
                        this.status.is_open = true;
                        this.init_events();
                        this.emit('open', this, this.content_element);
                    },
                    close:                 function () {
                        this.emit('before_close', this, this.content_element);
                        //this.element = this.content_element = null;
                        this.element && $(this.element).remove();
                        this.status.is_open = false;
                        this.emit('close', this, this.content_element);
                    },
                    _outsideClickHandler:  function (e) {
                        var node = e.target;
                        while (node != document.body && node.parentNode) {
                            if (node === this.get_content_element()) return;
                            node = node.parentNode;
                        }
                        this.close();
                    },
                    default_click_handler: function (e) {
                        var target  = e.target;
                        var $target = $(target);

                        var self       = this;
                        var target_has = false;
                        var parents    = false;
                        var sw         = [
                            {
                                c: $target.hasClass('edit') && $target.hasClass(this.action_classname),
                                f: function () { self.emit('edit', self, self.get_content_element()) }
                            },
                            {
                                c: $target.hasClass('save') && $target.hasClass(this.action_classname),
                                f: function () { self.emit('save', self, self.get_content_element()); }
                            },
                            {
                                c: $target.hasClass('add') && $target.hasClass(this.action_classname),
                                f: function () { self.emit('add', self, self.get_content_element())}
                            },
                            {
                                c: $target.hasClass('close') && $target.hasClass(this.action_classname),
                                f: function () { self.close() }
                            },
                            {
                                c: (target_has = $target.hasClass('action')) || (parents = $target.parents('.action')).length,
                                f: function () {
                                    if (!target_has) {
                                        $target = parents[0];
                                        target  = $target;
                                    }
                                    target.dataset.action && self.emit(target.dataset.action, target.dataset.data || '', target.dataset, e);
                                    target.dataset.action && e.stopPropagation();
                                    return true;
                                }
                            }
                        ];
                        return Sm.Core.util.switch_(sw);
                    },
                    /**
                     *
                     * @param and_$
                     * @return {HTMLElement|Node|$}
                     */
                    get_content_element:   function (and_$) {
                        this.$element = this.$element || $(this.element);
                        return !!and_$ ? this.$element : this.element;
                    },
                    init_emitter_events:   function () {
                        var events = this.settings.events;

                        for (var e_name in events) {
                            if (!events.hasOwnProperty(e_name)) continue;
                            var e_callback_fn_or_arr = events[e_name];
                            var fn, fn_;
                            if (e_callback_fn_or_arr.constructor === Array) {
                                for (var j = 0; j < e_callback_fn_or_arr.length; j++) {
                                    fn = e_callback_fn_or_arr[j];
                                    if (!fn || typeof fn.bind !== "function") {
                                        Sm.CONFIG.DEBUG && console.log(fn);
                                        continue;
                                    }
                                    this.on(e_name, fn.bind(this));
                                }
                            } else {
                                fn = e_callback_fn_or_arr;
                                if (!fn || typeof fn.bind !== "function") {
                                    Sm.CONFIG.DEBUG && console.log(fn);
                                    continue;
                                }
                                this.on(e_name, fn.bind(this));
                            }
                        }
                        var self = this;
                        this.on('open', function () {
                            var content_element = self.get_content_element();
                            var selects         = $(content_element).find('select');
                            for (var i = 0; i < selects.length; i++) {
                                var select_element = selects[i];
                                select_element.addEventListener('change', function (e) {
                                    self.emit('select', e);
                                })
                            }
                        });
                    }
                });
                Sm.loaded.add('Extras_ViewAid');
            }, 'Extras_ViewAid');
        });