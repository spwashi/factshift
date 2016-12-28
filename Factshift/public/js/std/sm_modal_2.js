define(['sm_util', 'Class', 'underscore', 'Emitter', 'jquery'], function (u, Class, _, Emitter, $) {
    "use strict";
    var _default_settings = {
        modal:         null,
        modalTemplate: '<div class="modal">\n    <div class="modal-content"></div>\n</div>',
        modalContent:  ".modal-content",
        element:       null,
        visibleClass:  "visible",
        loadClass:     "",
        closeKey:      27,
        events:        ['save', 'select', 'close', 'edit', 'add', 'load'],
        on_event:      {
            save: function () {
                return 'save!';
            }
        },
        onBeforeOpen:  function () { },
        onBeforeClose: function () { },
        onClose:       function () { }
    };

    document.open_modals = [];

    var dd = function (e) {
        var modal = document.open_modals[document.open_modals.length - 1];
        if (!modal) return;
        if (typeof modal.settings.closeKey !== "number") return;
        if (e.which === modal.settings.closeKey && modal.isOpen === true) {
            e.preventDefault();
            e.stopPropagation();
            if (!!document.sm_modal_close) return false;
            document.sm_modal_close = true;
            modal.close();
            window.setTimeout(function () {
                document.sm_modal_close = false;
            }, 1500);
            return false;
        } else if (e.ctrlKey && e.which == 83) { //s - save
            e.stopPropagation();
            e.preventDefault();
            if (!!document.sm_modal_save) return false;
            document.sm_modal_save = true;
            modal.emit('save', modal, modal.modalContent);
            window.setTimeout(function () {
                document.sm_modal_save = false;
            }, 1500);
            return false;
        }
    };

    /**
     * @class Modal
     * @version 1.1.2
     * @author Ben Ceglowski, Sam Washington
     * @param {Object} [userSettings]
     */
    var Modal = Emitter.extend({
        initialize_settings: function (userSettings) {
            this.settings = u.merge_objects(this.settings, userSettings);
            this.current  =
                u.isElement(this.settings.element) ? this.settings.element.innerHTML : (typeof this.settings.element === 'string') ? this.settings.element : null;
        },
        initialize:          function (userSettings) {
            //this._resetNode();
            this.initialize_settings(userSettings);
            this.error  = false;
            this.fns    = {};
            this.isOpen = false;
            this._setupDomNodes();
            this._destroy_events();
            if (!this.error) {
                $(this.modal).addClass(this.settings.loadClass);
                this._initEvents();
                this.emit('init', this, this.modalContent);
            } else {
                console.error("Please fix errors before proceeding.");
            }
        },
        init:                function (userSettings) {
            this.settings = _default_settings;
            this.close    = this.close.bind(this);
            this.open     = this.open.bind(this);
            this.initialize(userSettings);
        },

        add_bound: function (fn, name) {
            this.fns = this.fns || {};
            if (!(typeof fn === "function")) {
                console.log(fn, name);
                return function () {};
            }
            return this.fns[name] = this.fns[name] || fn.bind(this);
        },
        get_bound: function (name) {
            return this.fns[name] ? this.fns[name] : function () {}.bind(this);
        },

        _getNode:                function (selector, parent) {
            if (u.isElement(selector)) {
                return selector;
            }
            var targetNode = parent || document;
            var node       = targetNode.querySelector(selector);
            if (!node) {
                this.error = true;
                return console.error(selector + " not found in document.");
            }
            return node;
        },
        _setupDomNodes:          function () {
            this.modal = (typeof this.settings.modalTemplate === 'string' )
                ? u.createElement(_.template(this.settings.modalTemplate)(), true)
                : this._getNode(this.settings.modal);

            this.modalContent = this._getNode(this.settings.modalContent, this.modal);
        },
        _changeElement:          function (element) {
            this.modalContent.innerHTML =
                u.isElement(element) ? element.innerHTML : (typeof element === 'string') ? element : null;
            this.emit('load', this, this.modalContent);
        },
        open:                    function () {
            document.open_modals.push(this);
            this._resetNode();
            if (typeof this.settings.onBeforeOpen === "function") this.settings.onBeforeOpen.call(this);
            this.modalContent.innerHTML = this.current;
            $(this.modal).addClass(this.settings.visibleClass);
            this.isOpen                 = true;
            this.emit('load', this, this.modalContent);
        },
        close:                   function () {
            if (typeof this.settings.onBeforeClose === "function") this.settings.onBeforeClose.call(this);
            document.open_modals.splice(document.open_modals.indexOf(this), 1);
            $(this.modal).removeClass(this.settings.visibleClass);
            this._closeModal();
        },
        _closeModal:             function () {
            this._releaseNode();
            this.isOpen = false;
            this.emit('close', this, this.modalContent);
            this._destroy_events();
        },
        _resetNode:              function () {
            if (this.modalContent) this.modalContent.innerHTML = '';
        },
        _releaseNode:            function () {
            if (!!this.modal) this.modal.parentNode.removeChild(this.modal);
        },
        /**
         * @type {Function}
         * @param e
         * @private
         */
        _outsideClickHandler:    function (e) {
            var node = e.target;
            while (node != document.body) {
                if (node === this.modalContent) return;
                node = node.parentNode;
            }
            this.close();
        },
        _destroy_events:         function () {
            this.removeAllListeners();
            this.modal.removeEventListener("click", this.get_bound('outside_click'));
            document.removeEventListener("keydown", this.get_bound('close_key'));
        },
        _internal_click_handler: function (e) {
            var $target = $(e.target);
            var self    = this;
            var sw      = [
                {
                    c: $target.hasClass('edit') && $target.hasClass('modal-button'),
                    f: function () { self.emit('edit', self, self.modalContent) }
                },
                {
                    c: $target.hasClass('save') && $target.hasClass('modal-button'),
                    f: function () { self.emit('save', self, self.modalContent); }
                },
                {
                    c: $target.hasClass('add') && $target.hasClass('modal-button'),
                    f: function () { self.emit('add', self, self.modalContent)}
                },
                {
                    c: $target.hasClass('close') && $target.hasClass('modal-button'),
                    f: function () { self.emit('close', self, self.modalContent) }
                }
            ];
            u.switch_(sw);
        },

        _initEvents: function () {
            var events          = this.settings.events;
            var events_len      = events.length;
            var event_callbacks = this.settings.on_event;
            var i               = 0;
            for (i = 0; i < events_len; i++) {
                var e_name = events[i];
                if (!(e_name in event_callbacks)) continue;
                var e_callback_fn_or_arr = event_callbacks[e_name];
                var fn, fn_;
                if (e_callback_fn_or_arr.constructor === Array) {
                    for (var j = 0; j < e_callback_fn_or_arr.length; j++) {
                        fn  = e_callback_fn_or_arr[j];
                        fn_ = !fn.no_bind ? fn.bind(this) : fn;
                        this.on(e_name, fn_);
                    }
                } else {
                    fn  = e_callback_fn_or_arr;
                    fn_ = !fn.no_bind ? fn.bind(this) : fn;
                    this.on(e_name, fn_);

                }
            }
            var _outsideClickHandler = this.add_bound(this._outsideClickHandler, 'outside_click');
            var self                 = this;

            this.modal.addEventListener('click', this.add_bound(this._internal_click_handler, 'internal_click'));

            this.on('load', function () {
                var selects = $(self.modalContent).find('select');
                if ('select' in self.settings.on_event) {
                    for (i = 0; i < selects.length; i++) {
                        var select_element = selects[i];
                        select_element.addEventListener('change', function (e) {
                            self.emit('select', self, self.modal, e);
                        })
                    }
                }
            });

            this.modal.addEventListener("click", _outsideClickHandler);
            document.addEventListener("keydown", dd);
        }
    });
    return Modal;
});