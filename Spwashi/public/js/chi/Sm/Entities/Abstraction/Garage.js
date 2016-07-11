/**
 * Created by Sam Washington on 1/4/16.
 */
require(['require', 'Class', 'Sm'], function (require, Class) {
    require('Sm');
    require('Class');

    Sm.loaded.when_loaded('Core', function () {
        /**
         * @class Sm.Entities.Abstraction.Garage
         * @alias Sm.Entities.Abstraction.Garage
         * @property {Function} _default        {@link Sm.Entities.Abstraction.Garage._default   }
         * @property {Function} generate        {@link Sm.Entities.Abstraction.Garage.generate   }
         */
        Sm.Entities.Abstraction.Garage = Class.extend({
            /**
             * Initializes the singleton for an Entity's Garage class
             * @param type              {string} The type of Entity we are dealing with (e.g. Section)
             * @param type_identifier   {string} The index in the Model's properties that lets us know what kind of Entity subtype we're dealing with.
             *                                   For example, this could be "section_type" letting us know that the section type is what tells us that a section is standard or an image or something like that
             */
            init:                      function (type, type_identifier) {
                /**
                 * The Entity type that the Garage deals with (e.g. Section)
                 * @type {string}
                 */
                this.type               = type;
                /**
                 * The index in the Model's properties that lets us know what kind of Entity subtype we're dealing with.
                 * For example, this could be "section_type" letting us know that the section type is what tells us that a section is standard or an image or something like that
                 * @type {string}
                 */
                this.subtype_identifier = type_identifier;
            },
            /**
             * create a default element
             * @param e
             * @return {Element}
             * @private
             */
            _default:                  function (e) {
                Sm.CONFIG.DEBUG && console.log(e);
                var div       = document.createElement('div');
                div.className = 'empty';
                return div;
            },
            /**
             * Check to see that an MvCombo has all of the properties necessary to deal with it correctly, return everything we need to know about it
             * @param Mv_
             * @param config
             * @return {*}
             * @private
             */
            _get_details_from_MvCombo: function (Mv_, config) {
                if (!Mv_ || typeof Mv_ !== "object") {
                    Mv_ = {};
                }
                var Model_     = Mv_.Model;
                var attributes = Model_ ? Model_.attributes : (Mv_.attributes ? Mv_.attributes : Mv_);
                if (!attributes) attributes = {};
                config                      = config || {};
                var type                    = config.display_subtype || attributes[this.subtype_identifier];
                if (!type) {type = "standard";}
                var template_type = Sm.Entities[this.type].Meta.get_type(type, 'index');
                if (!template_type) template_type = 'standard';
                return {
                    Model:         Model_,
                    attributes:    Sm.Core.util.merge_objects(attributes, {_type: template_type}),
                    subtype:       type,
                    template_type: template_type
                }
            },
            /**
             * Generate a string to create an element based on the attributes of an MV
             * @param MvCombo_or_data
             * @param settings
             * @param settings.inner_string_name        What are we creating? [full, preview, inline, tab, tag?]
             * @param settings.is_modal                 Is this for a modal dialog?
             * @param settings.fallback                 If the function doesn't exist, what should we use as backup?
             * @param settings.outer_string_name
             * @param settings.inner_template_string
             * @param settings.template_index
             * @param settings.config
             * @param settings.outer_template_string
             * @param is_synchronous                    Are we to return a promise?
             * @return {*}
             * @param inner_template_string
             */
            _rt:                       function (MvCombo_or_data, settings, is_synchronous, inner_template_string) {
                settings                  = settings || {};
                var is_modal              = settings.is_modal;
                var fallback              = settings.fallback || 'full';
                var outer_string_name     = settings.outer_string_name || (!!is_modal ? 'modal_outer' : 'outer');
                var outer_template_string = settings.outer_template_string || false;
                var template_index        = (settings.template_index || fallback || '').trim().toLowerCase();
                /**This is the name of the type of element we are creating. full? inline? preview? tab? tag? */
                var inner_string_name     = settings.inner_string_name;
                is_synchronous            = (is_synchronous != undefined) ? !!is_synchronous : true;
                var self                  = this;
                //Try to see if we can use the MvCombo
                var V = this._get_details_from_MvCombo(MvCombo_or_data, settings.config);
                //If it turns out that we couldn't, return a default element
                if (!V) {
                    var def = self._default('could not validate');
                    return !is_synchronous ? (new Promise(function (resolve) {resolve(def);})) : def;
                }
                var self_type           = this.type;
                /**
                 * A copy of the Model's attributes (not a reference)
                 * @type {{}|*}
                 */
                var model_attributes    = V.attributes || MvCombo_or_data;
                model_attributes.config = settings.config || {};
                /**
                 * The name of the subtype we are dealing with. This might be an ID or a string.
                 * @type {string}
                 */
                var subtype             = V.subtype;
                /**
                 * The name of the template type that we are going to use to generate the element. This is a string based on the subtype of the entity (an example would be image for Section)
                 * @type {string}
                 */
                var template_type       = V.template_type;
                var finished_entity_string;
                /**
                 * Whether or not we should continue to try to resolve. If there is a timer going, after a while we should just give up
                 * @type {boolean}
                 */
                var keep_resolving      = true;


                var timer = false;

                /**
                 * This is a function that is run when resolving a promise or when we are ready to return a string (depending on if we are calling this function synchronously
                 * @return {string|boolean}
                 */
                var when_ready_callback = function () {
                    if (!keep_resolving) return false;
                    var body_name = !!is_modal ? 'modal' : 'body',
                        default_template_obj,
                        index_template_obj,
                        body;

                    /**
                     * We only need to do this if there is either no outer template or no inner template
                     */
                    if (!outer_template_string || !inner_template_string) {
                        /**
                         * This is the template index that is tailored to a specific Entity subtype
                         * @type {object}
                         */
                        index_template_obj = Sm.Entities[self_type].templates[template_type];

                        /**
                         * This contains the default object types
                         */
                        default_template_obj = Sm.Entities[self_type].templates._template;
                        /**
                         * If there is no index object and this is NOT the "standard" one,
                         * make the index object the standard. Otherwise, just use the default.
                         */
                        if (!index_template_obj) {
                            if (template_type != 'standard'
                                && Sm.loaded.is_loaded('Entities_' + self_type + '_templates_standard')
                                && Sm.Entities[self_type].templates.standard) {
                                //use the standard template object
                                index_template_obj = Sm.Entities[self_type].templates.standard;
                            } else {
                                //use the default template object as a last-ditch effort to create something
                                index_template_obj = default_template_obj;
                            }
                        }
                        /** If we have an inner string (full, inline, tag, tab) and that kind of thing matters for the index template obj, */
                        if (!!inner_string_name && (index_template_obj[inner_string_name] || '').length) {
                            inner_template_string = index_template_obj[inner_string_name];
                        } else if (!!inner_string_name && (default_template_obj[inner_string_name] || '').length) {
                            /** Otherwise if it exists in the default obj, use that*/
                            inner_template_string = default_template_obj[inner_string_name];
                        }
                    }
                    /**
                     * If there is no outer template string, make one.
                     */
                    if (!outer_template_string) {
                        if (!!index_template_obj[outer_string_name]) {
                            if (typeof index_template_obj[outer_string_name] === "string") {
                                outer_template_string = index_template_obj[outer_string_name];
                            }
                            /**
                             * Check to see if the preferred template has an "outer"
                             */
                            if (!outer_template_string && !!index_template_obj[outer_string_name]
                                && !!index_template_obj[outer_string_name][template_index]) {
                                outer_template_string = index_template_obj[outer_string_name][template_index];
                            } else {
                                Sm.CONFIG.DEBUG && console.log('Error checking ', template_type, ' ', template_index, ' ', outer_string_name);
                            }
                        } else {
                            //Sm.CONFIG.DEBUG && console.log('Does not exist ', index, ' ', template_index, ' ', outer_string_name);
                        }
                        if (!outer_template_string && !!default_template_obj[outer_string_name]) {
                            if (!outer_template_string && typeof default_template_obj[outer_string_name] === "string") {
                                outer_template_string = default_template_obj[outer_string_name];
                            }
                            /**
                             * If the outer template string was not found and we didn't look for it in the fallback index,
                             * look for it in the fallback index of the default template
                             */
                            if (!outer_template_string && !!default_template_obj[outer_string_name][template_index]) {
                                outer_template_string = default_template_obj[outer_string_name][template_index];
                            }
                            if (!outer_template_string && template_index != fallback && !!default_template_obj[outer_string_name][fallback]) {
                                outer_template_string = default_template_obj[outer_string_name][fallback];
                            }
                        }
                    }
//ssh://codozsqq@host32.registrar-servers.com:21098/home/codozsqq/public_html/
                    //default string!
                    if (!outer_template_string) {
                        outer_template_string = '<div>__CONTENT__</div>';
                    }
                    var cache_name = outer_string_name + template_index + (inner_string_name || body_name);
                    if (!outer_template_string.length) outer_template_string = '__CONTENT__';

                    if (!inner_template_string) {
                        index_template_obj.cache = index_template_obj.cache || {};
                        if (!!index_template_obj.cache[cache_name]) {
                            timer && clearTimeout(parseInt(timer));
                            finished_entity_string = index_template_obj.cache[cache_name](model_attributes);
                            return finished_entity_string;
                        }
                        if ((!index_template_obj[body_name] || !index_template_obj[body_name][template_index] )
                            && !!default_template_obj[body_name] && !!default_template_obj[body_name][template_index]) {
                            index_template_obj[body_name]                 = index_template_obj[body_name] || {};
                            index_template_obj[body_name][template_index] = default_template_obj[body_name][template_index]
                        }
                        if (!index_template_obj[body_name]) {
                            if (template_type != 'standard'
                                && Sm.loaded.is_loaded('Entities_' + self_type + '_templates_standard')
                                && Sm.Entities[self_type].templates.standard[body_name]) {
                                index_template_obj[body_name] = Sm.Entities[self_type].templates.standard[body_name];
                            } else {
                                throw "No Index Template  '" + body_name + "'  to match in " + self_type + " Garage";
                            }
                        }
                        body = index_template_obj[body_name][template_index] || index_template_obj[body_name]['full'];

                        if (!default_template_obj) throw "No Template to match " + self_type;
                        if (!body) throw "No Index Template '" + body_name + '.' + template_index + "' to match " + self_type;
                        if (!default_template_obj[outer_string_name]) throw "No Outer Template to match " + outer_string_name + ' - ';
                        inner_template_string = body;
                    }

                    /**
                     * Generate the controls for whatever we just made
                     */
                    {
                        var _it_button_control_obj = !!is_modal && !!index_template_obj.modal_button_control
                            ? index_template_obj.modal_button_control
                            : index_template_obj.button_control;
                        if (!_it_button_control_obj) {
                            _it_button_control_obj = !!is_modal && !!default_template_obj.modal_button_control
                                ? default_template_obj.modal_button_control
                                : default_template_obj.button_control;
                        }
                        var button_control;
                        if (typeof _it_button_control_obj === "string") {
                            button_control = _it_button_control_obj;
                        } else {
                            button_control = _it_button_control_obj ? _it_button_control_obj[template_index] : false;
                        }
                        if (!button_control && template_index != fallback && !!default_template_obj.button_control[fallback]) {
                            button_control = default_template_obj.button_control[fallback];
                        }
                    }

                    outer_template_string =
                        outer_template_string
                            .replace('__CONTENT__', inner_template_string)
                            .replace('__BUTTON_CONTROL__', button_control || '');

                    /**
                     * Cache the Underscore template to be used later
                     * @type {*|{function}}
                     */
                    var underscore_template                              = _.template(outer_template_string);
                    index_template_obj.cache[template_index + body_name] = underscore_template;
                    timer && clearTimeout(parseInt(timer));
                    finished_entity_string                               = underscore_template(model_attributes);
                    return finished_entity_string;
                };

                try {
                    if (!is_synchronous) {
                        var wait = 'Entities_' + self_type + '_templates__template';
                        var name = '_Entities_' + self_type + '_Garage.' + template_index;
                        return Sm.loaded.when_loaded(wait, when_ready_callback, name, 7000).catch(function () {
                            var e = "Could not load '" + wait + "' in time for '" + name + "'";
                            Sm.CONFIG.DEBUG && console.log(e);
                            throw e;
                        });
                    } else {
                        return when_ready_callback();
                    }
                } catch (e) {
                    return this._default(e);
                }
            },

            /**
             *
             * @param type
             * @param Mv_              The MvCombo that we are generatng an
             * @param is_synchronous
             * @param settings
             * @param settings.fallback
             * @param settings.outer_string_name
             * @param settings.inner_string_name
             * @param settings.inner_template_string
             * @param settings.template_type
             * @param settings.outer_template_string
             * @param settings.config
             * @return {*}
             */
            generate: function (type, Mv_, is_synchronous, settings) {
                if (typeof type === "object") {
                    settings       = type;
                    type           = settings.type || settings.outer_string_name;
                    Mv_            = settings.MvCombo || settings.data || {};
                    is_synchronous = settings.synchronous;
                }
                settings                   = settings || {};
                type                       = (type || ' ').toLowerCase();
                var is_modal               = type.indexOf('modal') > -1;
                type                       = type.replace('.modal', '');
                var type_arr               = type.split('.');
                type                       = type_arr[0];
                settings.inner_string_name = type_arr[0] || settings.inner_string_name;
                var _args                  = arguments;
                if (this[type]) return this[type].apply(this, [
                    Mv_, is_synchronous, settings
                ]);

                return this._rt(Mv_, {
                    template_index:        type,
                    is_modal:              is_modal,
                    fallback:              settings.fallback || 'full',
                    outer_string_name:     settings.outer_string_name,
                    inner_string_name:     settings.inner_string_name,
                    inner_template_string: settings.inner_template_string,
                    template_type:         settings.template_type,
                    outer_template_string: settings.outer_template_string,
                    config:                settings.config || {}
                }, !!is_synchronous);
            },

            /**
             *
             * @param {Sm.Core.MvCombo} Mv_
             * @param is_synchronous Are we running this synchronously, or should we return a promise? (Allows for server stuff)
             * @param settings
             * @param settings.relationship_RIDs
             * @param settings.listed_relationships_obj
             * @param settings.always_display
             * @param settings.context_id
             * @param settings.display_type
             * @param {Sm.Entities.Abstraction.Garage~on_add}    settings.on_append
             * @param settings.always_display Relationship indices that we are always going to show (even if empty)
             * @return {*}
             */
            relationships:                 function (Mv_, is_synchronous, settings) {
                settings = settings || {};
                if (!Mv_) return is_synchronous ? false : Promise.resolve(false);
                var relationship_index_list = settings.relationship_index_list || [];
                if (!relationship_index_list.length) {
                    var _rels = Mv_.relationships || [];
                    for (var _rel_name in _rels) {
                        if (!_rels.hasOwnProperty(_rel_name)) continue;
                        relationship_index_list.push(_rel_name);
                    }
                }
                /** @type {{relationship_container: '', relationship_index_container: '', relationship_outer: ''}} The template object of this Entity  */
                var _template                          = Sm.Entities[this.type].templates._template;
                _template.relationship_index_container = _template.relationship_index_container || '__CONTENT__';
                /**
                 * If we can't find the necessary part sof the template, return an empty string
                 */
                if (!_template
                    || !_template.relationship_container
                    || !_template.relationship_outer) {
                    return is_synchronous ? '' : Promise.resolve('');
                }

                /**
                 * The context_id (context of the relationship if applicable) is based on the settings, or it is the default
                 * @type {number}
                 */
                var context_id                  = settings.context_id || 0,
                    rel_index_string            = _template.relationship_index_container,
                    rel_index_inner_string      = '',
                    relevant_relationships      = {},
                    obj_of_listed_relationships = settings.listed_relationships_obj || {};
                for (var i = 0; i < relationship_index_list.length; i++) {
                    var relationship_index = relationship_index_list[i];
                    if (!relationship_index) continue;
                    var relationship_index_content = '';

                    var relationships = [], related_items = [];


                    /**
                     * The relationship index with the first character capitalized
                     * @type {string}
                     */
                    var rel_index_to_upper            = relationship_index.charAt(0).toUpperCase() + relationship_index.slice(1);
                    /**
                     * Each relationship index will get its own element. This is the basic template for that element.
                     * @type {string}
                     * @private
                     */
                    var relationship_container_string =
                            _template.relationship_container
                                .replace('__TITLE__', rel_index_to_upper);
                    /**q
                     * If the relationship_RIDs for this index is a falsey value, there are no relationships that we are going to deal with specifically.
                     * Pull all of the known relationships
                     */
                    /** @type {Sm.Core.RelationshipIndex} The RelationshipIndex that we are going to be dealing with */
                    var RelationshipIndex = Mv_.getRelationshipIndex(relationship_index);
                    if (!RelationshipIndex) continue;

                    var relationship_object                    = obj_of_listed_relationships[relationship_index] || RelationshipIndex.get_listed_items(context_id);
                    related_items                              = relationship_object.items || [];
                    relationships                              = relationship_object.relationships || [];
                    relevant_relationships[relationship_index] = [];
                    var display_type                           = settings.display_type || 'preview';
                    for (var k = 0; k < related_items.length; k++) {
                        /** @type {Sm.Core.MvCombo} The MvCombo that is being related ot the original  */
                        var OtherMvCombo = related_items[k];
                        var Relationship = relationships[k];
                        var OtherView    = OtherMvCombo.getView({display_type: display_type});
                        OtherView.render({synchronous: true, display_type: display_type});

                        relevant_relationships[relationship_index].push({
                            MvCombo:      OtherMvCombo,
                            Relationship: Relationship,
                            View:         OtherView
                        })
                    }


                    rel_index_inner_string += relationship_container_string
                        .replace('__CONTENT__', relationship_index_content)
                        .replace('__TYPE__', relationship_index)
                        .replace('__R_ID__', Mv_.r_id);
                }
                var inner_string = rel_index_string
                    .replace('__BUTTON_CONTROL__', '')
                    .replace('__CONTENT__', rel_index_inner_string);

                return this._continue_relationship_render(relevant_relationships, inner_string, is_synchronous, settings.on_append, Mv_);
            },
            /**
             *
             * @param relevant_relationships
             * @param {string}              inner_string            The string that will serve as the overall container for everything
             * @param {boolean}             is_synchronous          Whether or not we should return a string or a promise
             * @param {function}            callback                A function to be run on every View
             * @return {*}
             * @private
             * @param {Sm.Core.MvCombo}     Mv_                     The MvCombo who the relationships belong to
             */
            _continue_relationship_render: function (relevant_relationships, inner_string, is_synchronous, callback, Mv_) {
                var $elem         = $(inner_string);
                var _template     = Sm.Entities[this.type].templates._template;
                /**
                 * @callback Sm.Entities.Abstraction.Garage~on_add
                 * @param {Sm.Entities.Section.View}    parameters.View
                 * @param {HTMLElement}                 parameters.container_element
                 * @param {string}                      parameters.relationship_index
                 */
                callback          = typeof callback === "function" ? callback : false;
                /**
                 * An array of Views that have already been appended to the Element (shouldn't happen).
                 * This is meant to let us know which views need to be cloned
                 * @type {Array}
                 */
                var appendedViews = [];
                for (var loop_rel_index in relevant_relationships) {
                    if (!relevant_relationships.hasOwnProperty(loop_rel_index)) continue;
                    var holder             = $elem.children('.' + loop_rel_index + '-container');
                    var relationship_outer = _template[loop_rel_index + '_relationship_outer'] ? _template[loop_rel_index + '_relationship_outer'] : _template.relationship_outer;
                    if (holder[0]) {
                        var related_views = relevant_relationships[loop_rel_index];
                        for (var k = 0; k < related_views.length; k++) {
                            var View_         = related_views[k].View;
                            /** @type {Sm.Core.Relationship} */
                            var Relationship_ = related_views[k].Relationship;
                            if (!View_.MvCombo) continue;
                            if (appendedViews.indexOf(View_.MvCombo.r_id) > -1) View_ = View_.clone();

                            var outer_string = relationship_outer.replace('__CONTENT__', '').replace('__R_ID__', Relationship_.Identity.r_id).replace('__MV_R_ID__', Mv_ ? Mv_.r_id : 'null');
                            var params       = {
                                View:               View_,
                                container_element:  outer_string,
                                relationship_index: loop_rel_index
                            };
                            if (callback) callback(params);
                            var $outer  = $(params.container_element);
                            var content = $outer.find('.content');
                            if (content[0]) {
                                content[0].appendChild(View_.get_rendered('Element'));
                                holder[0].appendChild($outer[0]);
                                appendedViews.push(View_.MvCombo.r_id);
                                View_.mark_added();
                            } else {
                                Sm.CONFIG.DEBUG && console.log($outer, content, View_);
                            }
                        }
                    } else {
                        Sm.CONFIG.DEBUG && console.log(holder);
                    }
                }
                var result = $elem[0];
                return is_synchronous ? result : Promise.resolve(result);
            }
        });
        Sm.loaded.add('Entities_Abstraction_Garage');
    }, 'Entities_Abstraction_Garage');
});