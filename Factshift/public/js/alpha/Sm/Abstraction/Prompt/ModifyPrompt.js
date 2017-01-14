/**
 * Created by Sam Washington on 12/5/16.
 */
define(['require', 'Sm', 'Sm-Abstraction-Prompt-Prompt', 'Sm-Abstraction-Modal-Modal'], function (require, Sm) {
    Sm.Core.dependencies.on_load(['Abstraction-Modal-Modal', 'Abstraction-Prompt-Prompt'], function () {
        Sm.Abstraction.Prompt.ModifyPrompt = Sm.Abstraction.Modal.Modal.extend(
            {
                action:     'edit',
                initialize: function (settings) {
                    var ret      = Sm.Abstraction.Modal.Modal.prototype.initialize.apply(this, arguments);
                    var Resource = this.getResource();
                    var Self     = this;
                    if (Resource) {
                        Resource.on && Resource.on('update', function (changed) {Self.render()});
                        var entity_type = Resource.getEntityType();
                        if (entity_type) {
                            entity_type                                = entity_type.toLowerCase();
                            this['on_change_' + entity_type + '_type'] = this['on_change_' + entity_type + '_type'] || this.on_change_type;
                        }
                    }
                    return ret;
                },

                _generateInnerHTML:   function (is_synchronous) {
                    var Resource       = this.getResource();
                    var Garage         = Sm.Core.Identifier.getRootObjectAttribute(Resource, 'Garage') || (Sm.Abstraction.Garage);
                    var ReferencePoint = this.getReferencePoint();

                    var outer = Garage.generate('modal_outer.' + this.action, {Resource: Resource, ReferencePoint: ReferencePoint}, {is_synchronous: is_synchronous});
                    var inner = Garage.generate('body.form', {Resource: Resource}, {is_synchronous: is_synchronous});
                    var html  = Sm.Abstraction.Garage.replaceContentPlaceholder(outer, inner, is_synchronous);
                    return html;
                },
                _keydown:             function (e) {
                    var Self = this;
                    if (e.ctrlKey && e.which == 83) {
                        if (!!this.ModalHandler._saving) return true;
                        this.ModalHandler._saving = this;
                        e.stopPropagation();
                        e.preventDefault();
                        this.on_save().then(function () {Self.ModalHandler._saving = false});
                    }
                },
                on_change_type:       function (new_type, e) {
                    var Self = this;
                    if (new_type) {
                        return this.on_save().then(function (response) {
                            Self.render();
                            return response;
                        })
                    } else {
                        return Promise.resolve();
                    }
                },
                refresh:              function () {
                    var res = Sm.Abstraction.Modal.Modal.prototype.refresh.apply(this, arguments);
                    if (this.get_content_element()) this._init_button_control();
                    return res;
                },
                _init_button_control: function () {
                    var Self            = this;
                    var content_element = Self.get_content_element(true);
                    if (!content_element) return false;
                    var button_control = content_element.find('.button-control')[0];
                    if (!button_control) return false;
                    var Resource = Self.getResource();
                    Resource &&
                    Resource.initNewView &&
                    Resource.initNewView(button_control, this.getReferencePoint() || null);
                },
                /**
                 * @inheritDoc
                 * @param settings
                 * @return {*}
                 */
                render:               function (settings) {
                    settings        = settings || {};
                    var errors      = settings.errors || null;
                    var Self        = this;
                    var post_render = function (result) {
                        Self._init_button_control();
                        if (!errors) return result;
                        var $forms = Self.$get_forms();
                        for (var i = 0; i < $forms.length; i++) {
                            var form = $forms[i];
                            Sm.Abstraction.Views.View.update_form(form,
                                                                  Self.form_attribute_identifier,
                                                                  errors,
                                                                  null);
                        }
                        return result;
                    };
                    var result      = Sm.Abstraction.Modal.Modal.prototype.render.apply(this, arguments);
                    return settings.is_synchronous ? post_render(result) : result.then(post_render);
                },
                on_save:              function () {
                    var Self     = this;
                    var Resource = this.getResource();
                    if (Resource && Resource.isEditable) {
                        var $content_el = Self.get_content_element(true);
                        $content_el.addClass('saving');

                        var form_data = this.get_form_info();
                        for (var r_id in form_data) {
                            if (!form_data.hasOwnProperty(r_id)) continue;
                            if (r_id === Resource.getR_ID()) {
                                var attributes = form_data[r_id];
                                if (Resource.setAttributes) Resource.setAttributes(attributes);
                                else return Promise.reject(new Sm.Exceptions.Error("Cannot set attributes", [attributes, Resource]))
                            }
                        }
                        return Resource.save()
                                       .catch(function (response) {return null})
                                       .then(function (response) {
                                           $content_el.removeClass('saving');
                                           /** @type {Sm.edit_api_response_data} data */
                                           var data     = (response && response.data) || {};
                                           var failures = data.changed_attributes ? data.changed_attributes.failed : null;
                                           return Self.render({errors: failures}).then(function () {return response});
                                       })
                    }
                    return Promise.reject(new Sm.Exceptions.Error("Cannot save non-editable resource"));
                }
            });
        Sm.Abstraction.Prompt.makePrompt(Sm.Abstraction.Prompt.ModifyPrompt);
    }, 'Abstraction-Prompt-ModifyPrompt');
});