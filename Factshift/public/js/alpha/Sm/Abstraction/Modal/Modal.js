/**
 * Created by Sam Washington on 11/15/16.
 */
define(['require', 'Sm', 'Emitter', 'Sm-Abstraction-Views-View'], function (require, Sm, Emitter) {
    Sm.Core.dependencies.on_load(['Abstraction-Views-View'], function () {
        Sm.Abstraction.Modal = {};
        var closeKey         = 27;

        var ModalHandler = {
            OpenModals:        [],
            eventHandlerIsset: false,
            add:               function (Modal) {
                this.OpenModals.splice(0, 0, Modal);
                if (!ModalHandler.eventHandlerIsset) {
                    ModalHandler.eventHandlerIsset = true;
                    document.addEventListener("keydown", ModalHandler.event_handler);
                }
            },
            remove:            function (Modal) {
                var index = ModalHandler.OpenModals.indexOf(Modal);
                if (index < 0) return;
                ModalHandler.OpenModals.splice(index, 1);
                if (!ModalHandler.OpenModals.length) {
                    ModalHandler.eventHandlerIsset = false;
                    document.removeEventListener("keydown", ModalHandler.event_handler);
                }
            },

            event_handler: function (e) {
                var Dialog = ModalHandler.OpenModals[0];
                if (!Dialog) return true;
                if (e.which == closeKey) {
                    Dialog.close();
                }
            }
        };
        /**
         * @class Sm.Abstraction.Modal.Modal
         * @augments Sm.Abstraction.Views.View
         * @augments Emitter
         * @augments Backbone.View
         */
        var Modal        = Sm.Abstraction.Views.View.extend(
            {
                ModalHandler:              ModalHandler,
                form_attribute_identifier: '[data-attribute]',
                resource_form_identifier:  '.form',
                initialize:                function (settings) {
                    settings    = settings || settings;
                    var ret     = Sm.Abstraction.Views.View.prototype.initialize.apply(this, arguments);
                    this.config = settings.config || {};
                    return ret;
                },
                events:                    {
                    click:   function (e) {return this._click(e)},
                    keydown: function (e) {return this._keydown(e)},
                    change:  function (e) {return this._change(e)}
                },
                _change:                   function (e) {
                    var target = e.target;
                    if (target.dataset && target.dataset.action) {
                        var action = 'on_' + target.dataset.action;
                        if (typeof  this[action] === "function") this[action]($(target).val(), e);
                    }

                },
                _outsideClickHandler:      function (e) {
                    var node = e.target;
                    while (node != document.body && node.parentNode) {
                        if (node === this.get_content_element()) return true;
                        node = node.parentNode;
                    }
                    this.close();
                    return false;
                },
                _click:                    function (e) {
                    if (!this._outsideClickHandler(e)) return false;
                    var target = e.target;
                    if (!target) return false;
                    if ('action' in target.dataset) {
                        var action = "on_" + target.dataset.action;
                        if (typeof  this[action] === "function") this[action]('data' in target.dataset ? target.dataset.data : null, e);
                    }
                },
                _keydown:                  function (e) {},
//
                get_content_element:       function (return_jquery) {
                    if (!this.content_element) this.content_element = this.$el ? this.$el.find('.modal-content')[0] || false : false;
                    return this.content_element ? (return_jquery ? $(this.content_element) : this.content_element) : false;
                },
                /**
                 * Get all of the form elements present on the Modal dialog.
                 * @return {jQuery}
                 */
                $get_forms:                function () {
                    return this.get_content_element(true).find(this.resource_form_identifier);
                },
                /**
                 * For each form present on the the Modal Dialog, return an object index by form Resource r_id with the attributes represented
                 * @return {{}}
                 */
                get_form_info:             function () {
                    var form_data = {};
                    var $forms    = this.$get_forms();
                    for (var i = 0; i < $forms.length; i++) {
                        var form      = $forms[i];
                        var form_r_id = 'r_id' in form.dataset ? form.dataset.r_id : false;
                        if (!form_r_id) continue;
                        form_data[form_r_id] = Sm.Abstraction.Views.View.get_attributes_from_form(form, this.form_attribute_identifier);
                    }
                    return form_data;
                },
//
                _generateOuterHTML:        function (is_synchronous) {
                    var template = '<div class="modal">\n    <div class="modal-content">__CONTENT__</div>\n</div>';
                    return is_synchronous ? template : Promise.resolve(template);
                },
                _generateInnerHTML:        function (is_synchronous) {
                    var template = "<div class='content'>This is some text</div>";
                    return is_synchronous ? template : Promise.resolve(template);
                },
//
                /**
                 * Open the Modal Dialog, setting the Promise.resolve and Promise.reject attributes on this Modal dialog
                 * @return {Promise|*}
                 */
                open:                      function () {
                    ModalHandler.add(this);
                    this.emit('open');
                    if (this.queryStatus('rendering') === null) {
                        this.render({is_synchronous: true});
                        try { document.documentElement.appendChild(this.el);} catch (e) {console.log(e) }
                    }
                    var promise_object = {};
                    /**
                     * An object that represents what we should do when the Modal dialog finally resolves or rejects with something
                     * @type {{}}
                     */
                    this.promise_object = promise_object;
                    return (new Promise(function (resolve, reject) {
                        promise_object.resolve = resolve;
                        promise_object.reject  = reject;
                        return this;
                    }));
                },
                /**
                 * Close the Modal Dialog
                 * @return {Promise}
                 */
                close:                     function () {
                    ModalHandler.remove(this);
                    this.el && this.el.parentNode && this.el.parentNode.removeChild(this.el);
                    this.content_element = false;
                    this.emit('close');
                    return Promise.resolve(this);
                },

                /**
                 * Function to run when the Modal Dialog gets canceled
                 */
                on_cancel: function () {
                    this.close();
                }
            });
        Emitter.mixin(Modal.prototype);
        Sm.Abstraction.Modal.Modal = Modal;
    }, 'Abstraction_Modal_Modal')
});