/**
 * Created by Sam Washington on 11/13/16.
 */
define(['require', 'Sm', 'Sm-Abstraction-Views-View', 'Sm-Abstraction-Action-ReplaceAction'], function (require, Sm) {
    Sm.Core.dependencies.on_load(['Abstraction_Views_View'], function () {
        var OneView;
        var TwoView;
        var global_registry           = {};
        var register_global_handler   = function (event, callback) {
            var rand = Sm.Core.Util.randomString(5);
            Sm.CONFIG.DEBUG && console.log('add - ', rand);
            global_registry[rand] = {
                event: event, callback: function () {
                    if (!!global_registry[rand]) {callback.apply(this, arguments)} else {
                    }
                }
            };
            $(document).on(event, "*", global_registry[rand].callback);
            return rand;
        };
        var is_registered_globally    = function (id) {return !!global_registry[id]};
        var unregister_global_handler = function (id) {
            if (is_registered_globally(id)) {
                Sm.CONFIG.DEBUG && console.log('delete - ', id)
                $(document).off(global_registry[id].event, "*", global_registry[id].callback);
                delete global_registry[id];
                return true
            }
            return false;
        };
        /**
         * @class Sm.Entities.Section.View
         * @extends Sm.Abstraction.Views.EntityView
         * @extends Sm.Abstraction.Views.View
         * @mixes Emitter
         * @property {Sm.Abstraction.Entity} Resource
         */
        Sm.Entities.Section.View = Sm.Abstraction.Views.EntityView.extend(
            {
                setAttributeElement_section_type: function (value) {
                    var Entity = this.getResource();
                    var Meta   = Sm.Core.Identifier.getRootObjectAttribute(Entity, 'Meta');
                    if (!Meta) return false;
                    var subtype = Meta.getEntitySubtype(Entity);
                    this.render({is_synchronous: false});
                    return false;
                },
                setAttributeElement:              function () {
                    this.render();
                },
                _click:                           function (e) {
                    if (this.event_was_cancelled(e)) return null;
                    var result = Sm.Abstraction.Views.EntityView.prototype._click.apply(this, arguments);
                    if (result && this.display_type === 'full' || this.display_type === 'std') {
                        this.focus();
                        this.cancel_event(e);
                        return null;
                    }
                    return result;
                },
                _keydown:                         function (e) {
                    var result = Sm.Abstraction.Views.EntityView.prototype._click.apply(this, arguments);
                    /**@this Sm.Entities.Section.View */
                    var Entity = this.getResource();

                    return result;
                },
                scale_macro:                      function () {return this.scale(true)},
                scale_micro:                      function () {return this.scale(false)},
                scale:                            function (do_scale_up, context_id) {
                    var Entity = this.getResource();
                    if (!Entity) return null;
                    this.blur();
                    var relationship_index = (do_scale_up ? 'reciprocal_' : '') + 'micros';
                    var RelationshipIndex  = Entity.getRelationshipIndex(relationship_index);
                    var RelatedEntities    = RelationshipIndex.getAllInSeries(context_id);
                    var Self               = this;
                    var ReferencePoint     = this.getReferencePoint();
                    var all_replacements = RelatedEntities.map(function (Entity) {
                        var OtherView = Entity.convertToView(null, ReferencePoint);
                        return OtherView.replaceWithRelationshipIndex(relationship_index);
                    });
                    var all_resolved     = Promise.all(all_replacements).then(function (items) {return [].concat.apply([], items);});
                    return all_resolved
                        .then(function (Views) {
                            (Views[0] && Views[0].focus ? Views[0] : Self).focus();
                        })
                        .then(function () {
                            return all_resolved;
                        });
                },
                _document_interaction:            function (e) {
                    var Self = this;
                    var el   = this.el;
                    if (Self.event_was_cancelled(e)) return null;
                    var closest = $(e.target).closest('.factshift-entity');
                    if (closest[0] !== el) Self.blur();
                },
                _document_keydown:                function (e) {
                    var Self = this;
                    if (Self.event_was_cancelled(e)) return null;
                    var key_code     = e.which;
                    var key_is_right = key_code === 39;
                    var key_is_left  = key_code === 37;
                    if (key_is_right || key_is_left) {
                        Self.cancel_event(e);
                        key_is_left ? Self.scale_macro() : Self.scale_micro();
                        return null;
                    }
                },
                focus:                            function () {
                    this.$el.addClass('focused');
                    var el = this.el;
                    Sm.Entities.Section.Wrapper.focus(this);
                    this.setStatus('focused', true);
                    var Self = this;
                    Sm.Abstraction.Views.DocumentView.on('interact', this.add_bound('document_interaction', this._document_interaction));
                    Sm.Abstraction.Views.DocumentView.on('keydown', this.add_bound('_document_keydown', this._document_keydown));
                    this.trigger('focus');
                    return this;
                },
                blur:                             function () {
                    if (!this.queryStatus('focused')) return this;
                    Sm.Abstraction.Views.DocumentView.off('interact', this.get_bound('document_interaction'));
                    Sm.Abstraction.Views.DocumentView.off('keydown', this.get_bound('_document_keydown'));
                    Sm.Entities.Section.Wrapper.blur(this);
                    this.setStatus('focused', false);
                    this.$el.removeClass('focused');
                    this.trigger('blur');
                    return this;
                }
            });
        var b = function (e) {
            var to_left = (e.keyCode === 37 ? true : (e.keyCode === 39 ? false : null));
            if (!(OneView && TwoView)) return;
            var Action = new Sm.Abstraction.Action.ReplaceAction(to_left ? OneView : TwoView, !to_left ? OneView : TwoView);
            Action.execute();
        };
    }, 'Entities-Section-View');
});