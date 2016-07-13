/**
 * Created by Sam Washington on 1/4/16.
 */
require(['require', 'Class', 'Sm', 'Sm-Entities-Abstraction-templates-_template'], function (require, Class) {
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
                var template_type;
                var type;
                var self_type;
                var attributes;
                if (!Mv_ || typeof Mv_ !== "object") Mv_ = {};
                var Model_ = Mv_.Model;
                try {
                    attributes = Model_ ? Model_.attributes : (Mv_.attributes ? Mv_.attributes : Mv_);
                    if (!attributes) attributes = {};
                    config        = config || {};
                    self_type     = this.type;
                    type          = config.display_subtype || attributes[this.subtype_identifier] || "standard";
                    template_type = Sm.Entities[self_type].Meta.get_type(type, 'index') || "standard";
                    attributes    = Sm.Core.util.merge_objects(attributes, {_type: template_type, type: self_type});
                } catch (e) {
                    Sm.CONFIG.DEBUG && console.log('abstraction_garage_GDFM', e);
                    throw e;
                }
                return {
                    Model:         Model_,
                    attributes:    attributes,
                    subtype:       type,
                    template_type: template_type
                };
            },
            _combine_string:           function (attributes, string) {
                var underscore_template = _.template(string);
                return underscore_template(attributes);
            },
            _generate_one:             function (template_arr, input, settings) {
                settings           = settings || {};
                var is_synchronous = !!settings.synchronous;
                var default_val    = settings.default_value !== false ? settings.default_value || "full" : false;
                var check          = input.indexOf("preview") > -1;

                var template        = template_arr[0];
                var backup_template = template_arr[1] || template;
                var original_input  = input;
                /**
                 * An array of indices to search for.
                 * We iterate through this array and return the last string that we can
                 * @type {Array}
                 */
                var to_try          = [];
//Get the subtype (e.g. (edit) from the string inline.modal(edit)
                var subtype_test = /\((.+)\)/.exec(input);
                var subtype      = !!subtype_test && subtype_test[1] ? subtype_test[1] : false;
                subtype && (input = input.replace(subtype_test[0], ""));

                var ms_test = /\[(.+)\]/.exec(input);
                var m_s     = !!ms_test && ms_test[1] ? ms_test[1] : false;
                m_s && (input = input.replace(ms_test[0], ""));
//What are we looking for? This will generally be something like .modal or .body. If neither were specified, default to "body"
                var i_a_test = /\.(.*)(\b|$)/.exec(input);
                var i_a      = !!i_a_test && i_a_test[1] ? i_a_test[1] : false;
                if (i_a) input = input.replace(i_a_test[0], "");
                //.[]()
//If we didn't specify anything, assume that we are trying to pull the "full" version
                input = (input.length ? input : "full").replace(".", "");

                !!i_a && to_try.push(i_a);
                !!m_s && to_try.push(m_s);
                !!subtype && to_try.push(subtype);
                input.length && to_try.push(input);

                var complete_fallback  = Sm.Entities.Abstraction.templates._template;
                var fallback           = backup_template || complete_fallback;
                var preferred_template = template || backup_template;
                var string             = false;

                var replace_object = {};
                var replace        = settings.replace || false;
                if (replace) {
                    delete  settings.replace;
                    //settings.default_value = false;
                    settings.synchronous = true;
                    for (var index in replace) {
                        if (!replace.hasOwnProperty(index)) continue;
                        var to_search         = original_input.replace(i_a, replace[index]);
                        replace_object[index] = this._generate_one([preferred_template, fallback], to_search, settings);
                    }
                }
                var fn      = function (obj, subtype, previous) {
                    var res = false;
                    if (typeof obj === "boolean" || typeof obj === "number") return obj;
                    if (typeof obj === "string") res = obj;
                    if (obj && subtype) {
                        if (typeof obj === "string") {
                            res = obj;
                        } else if (typeof obj === "function") {
                            res = obj();
                        } else if (obj[subtype]) res = obj[subtype];
                        else res = false;
                    }
                    if (!res && !!default_val && previous[0] && subtype != default_val) res = fn(obj, default_val, previous);
                    return res;
                };
                var self    = this;
                var resolve = function (string) {
                    var processed_string = settings.attributes ? self._combine_string(settings.attributes, string) : string;
                    for (var index in replace_object) {
                        if (!replace_object.hasOwnProperty(index)) continue;
                        processed_string = processed_string.replace(index, replace_object[index]);
                    }
                    return is_synchronous ? processed_string : Promise.resolve(processed_string);
                };
                var p       = [];
                /**
                 * Iterate through the array of whatever we are looking for and try to pull the last string from it.
                 * If we get to a point where we cannot find something that we are looking for, we fallback to a default string.
                 */
                for (var i = 0; i < to_try.length; i++) {
                    //The current thing that we are looking for
                    var tt = to_try[i];
                    //This is the last thing that we looked for
                    p.splice(0, 0, i ? to_try[i - 1] : false);
                    //Top level object, there for everything
                    complete_fallback  = fn(complete_fallback, tt, p) || false;
                    fallback           = fn(fallback, tt, p) || complete_fallback || false;
                    preferred_template = fn(preferred_template, tt, p) || fallback || false;

                    //If the primary object is a string already, we are okay and should stop looking.
                    if (typeof preferred_template === "string") return resolve(preferred_template);
                }
                return resolve("__CONTENT__");
            },

            /**
             * @alias Sm.Entities.Abstraction.Garage
             * @param type
             * @param data              The MvCombo that we are generatng an
             * @param settings
             * @param {{}}              settings.config
             * @param {string}          settings.type
             * @param {string}          settings.data
             * @param {boolean=false}   settings.synchronous
             * @return {*}
             */
            generate: function (type, data, settings) {
                var config;
                settings = settings || {};
                if (typeof type === "object") {
                    settings = type;
                    type     = settings.type;
                    data     = settings.MvCombo || settings.data || {};
                    config   = settings.config || {};
                }
                var is_synchronous = !!settings.synchronous || false;
                if (type == "relationships") return this.relationships(data, is_synchronous, settings);
                var V      = this._get_details_from_MvCombo(data, config || {});
                var t      = Sm.Entities[this.type].templates;
                var self   = this;
                var res    = function () {
                    var templates = [
                        t[V.template_type] || t.standard,
                        t._template
                    ];
                    type          = (type || '').toLowerCase();
                    if (type.indexOf(".") < 0) type += ".body";
                    var outer_name = type.replace(/(body|modal|relationships)/, "$1_outer");
                    var outer      = "__CONTENT__";
                    if (outer_name != type)
                        outer = self._generate_one(templates, outer_name, {
                            synchronous: true,
                            replace:     {__BUTTON_CONTROL__: "button_control"}
                        });
                    var inner = self._generate_one(templates, type, {synchronous: true});

                    return self._combine_string(V.attributes, outer.replace(/__CONTENT__/ig, inner));
                };
                var result = res();
                return is_synchronous ? result : Promise.resolve(result);
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
                                var v = View_.get_rendered('Element');
                                content[0].appendChild(v);
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