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
            init:            function (type, type_identifier) {
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
            _default:        function (e) {
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
            _normalize_data: function (Mv_, config) {
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

                var data = {
                    Model:         Model_,
                    attributes:    attributes,
                    subtype:       type,
                    template_type: template_type
                };

                if (!!Mv_.object_type && Mv_.object_type == 'MvCombo') {
                    data.MvCombo = Mv_;
                }
                return data;
            },
            _combine_string: function (attributes, string) {
                var underscore_template = _.template(string);
                return underscore_template(attributes);
            },
            /**
             *
             * @param template_arr
             * @param input
             * @param settings
             * @param settings.default_value
             * @param settings.synchronous
             * @private
             */
            _generate_one:   function (template_arr, input, settings) {
                settings           = settings || {};
                var is_synchronous = !!settings.synchronous;
                var default_val    = settings.default_value !== false ? settings.default_value || "full" : false;

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
            generate:       function (type, data, settings) {
                var config;
                settings = settings || {};
                if (typeof type === "object") {
                    settings = type;
                    type     = settings.type;
                    data     = settings.MvCombo || settings.data || {};
                    config   = settings.config || {};
                }
                var is_synchronous  = !!settings.synchronous || false;
                var normalized_data = this._normalize_data(data, config || {});
                if (type == 'relationships') type = 'full.relationship';
                if (/\.relationship/.test(type)) return this._relationships(type, normalized_data, settings);
                var t      = Sm.Entities[this.type].templates;
                var self   = this;
                var res    = function () {
                    var templates = [
                        t[normalized_data.template_type] || t.standard,
                        t._template
                    ];
                    type          = (type || '').toLowerCase();
                    if (type.indexOf(".") < 0) type += ".body";
                    var outer_name = type.replace(/(body|modal|relationship)/, "$1_outer");
                    var outer      = "__CONTENT__";
                    if (outer_name != type)
                        outer = self._generate_one(templates, outer_name, {
                            synchronous: true,
                            replace:     {__BUTTON_CONTROL__: "button_control"}
                        });
                    var inner = self._generate_one(templates, type, {synchronous: true});

                    return self._combine_string(normalized_data.attributes, outer.replace(/__CONTENT__/ig, inner));
                };
                var result = res();
                return is_synchronous ? result : Promise.resolve(result);
            },
            _relationships: function (type, normalized_data, settings) {
                /** @type {Sm.Core.MvCombo}  */
                var MvCombo = normalized_data.MvCombo;
                var t       = Sm.Entities[this.type].templates;
                var Meta    = Sm.Entities[this.type].Meta;

                var templates  = [t[normalized_data.template_type] || t.standard, t._template];
                var context_id = settings.context_id || 0;
                //If we didn't specify the relationships that we want, assume that we want all of them
                var relationship_indices = settings.relationship_indices || [];
                var _rels                = Meta.get_named_relationship_indices();

                type                             = type.replace('ips', 'ip');

                if (!relationship_indices.length) {
                    for (var pretty_name in _rels) {
                        if (!_rels.hasOwnProperty(pretty_name)) continue;
                        relationship_indices.push([_rels[pretty_name], pretty_name]);
                    }
                }
                var __orc_t_nom                  = type.replace(/(relationship)/, '$1_outer');
                var outer_relationship_container =
                        this._generate_one(templates, __orc_t_nom, {synchronous: true});
                var orc_content                  = '';
                var relevant_relationships       = {};
                var display_type                 = settings.display_type || 'preview';

                var appended_views = {};
                var callback       = settings.on_append || false;
                if (typeof  callback !== "function") callback = false;

                var $rel_index_list = [];

                for (var i = 0; i < relationship_indices.length; i++) {
                    var relationship_index        = relationship_indices[i][0];
                    var name                      = relationship_indices[i][1];
                    var __ris_t_nom               = type.replace(/(relationship)/, '$1[relationship_index](' + relationship_index + ')');
                    var relationship_index_string = this._generate_one(templates, __ris_t_nom, {synchronous: true});
                    //Replace the generic "__TITLE__" string with the display name of the relationship
                    relationship_index_string = relationship_index_string.replace('__TITLE__', name);
                    var RelationshipIndex     = MvCombo.getRelationshipIndex(relationship_index);
                    if (!RelationshipIndex) Sm.CONFIG.DEBUG && console.log('abs_gar,_el,-1.5', relationship_index);
                    if (!RelationshipIndex) continue;
                    var relationship_object = RelationshipIndex.get_listed_items(context_id);

                    relevant_relationships[relationship_index] = [];


                    relationship_index_string =
                        relationship_index_string
                            .replace('__TYPE__', relationship_index)
                            .replace('__R_ID__', MvCombo.r_id)
                            .replace('__CONTENT__', '');

                    var $relationship_index_string = this._populate_relationship_index({
                        $relationship_index_string: $(relationship_index_string),
                        relationship_index:         relationship_index,
                        relationship_object:        relationship_object,
                        type:                       type,
                        display_type:               display_type,
                        appended_views:             appended_views,
                        templates:                  templates,
                        MvCombo:                    MvCombo
                    });
                    if ($relationship_index_string) $rel_index_list.push($relationship_index_string);
                }

                //NOTE: I understand that this is inefficient - it's the result of two separate functions being merged together. I don't have the time right now to correct those errors.

                var result = outer_relationship_container.replace('__CONTENT__', '');
                result     = result.length ? result : '<div class="content"></div>';
                var $elem  = $(result);
                for (var j = 0; j < $rel_index_list.length; j++) {
                    var $rel_index = $rel_index_list[j];
                    $elem.append($rel_index);
                }

                return !!settings.synchronous ? $elem[0] : Promise.resolve($elem[0]);
            },

            /**
             *
             * @param parameters
             * @param parameters.$relationship_index_string
             * @param parameters.relationship_index
             * @param parameters.relationship_object
             * @param parameters.type
             * @param parameters.display_type
             * @param parameters.templates
             * @param parameters.MvCombo
             * @param parameters.appended_views
             * @return {*}
             * @protected
             */
            _populate_relationship_index: function (parameters) {
                var $relationship_index_string = parameters.$relationship_index_string;
                var relationship_index         = parameters.relationship_index;
                var relationship_object        = parameters.relationship_object;
                var type                       = parameters.type || '.relationships';
                var display_type               = parameters.display_type || 'preview';
                var templates                  = parameters.templates;
                var appended_views             = parameters.appended_views;
                var MvCombo                    = parameters.MvCombo;

                var $ris_content = $relationship_index_string.children('.content').eq(0) || false;

                if (!$ris_content) Sm.CONFIG.DEBUG && console.log('abs_garage,_rel,-1', $relationship_index_string);
                if (!$ris_content) return false;

                var related_items = relationship_object.items || [];
                var relationships = relationship_object.relationships || [];
                var _count        = relationship_object.count || 0;
                for (var k = 0; k < _count; k++) {
                    var OtherMvCombo = related_items[k];
                    var Relationship = relationships[k];

                    var relationship_template_name = type.replace(/(relationship)/, '$1[relationship](' + relationship_index + ')');
                    var relationship_string        = this._generate_one(templates, relationship_template_name, {synchronous: true});
                    relationship_string            =
                        relationship_string
                            .replace('__R_ID__', Relationship.Identity.r_id)
                            .replace('__MV_R_ID__', MvCombo ? MvCombo.r_id : 'null')
                            .replace('__CONTENT__', '');
                    this._append_relationship(OtherMvCombo, $ris_content, relationship_index, relationship_string, appended_views, display_type);

                }
                return $relationship_index_string;
            },
            _append_relationship:         function (OtherMvCombo, $ris_content, relationship_index, relationship_string, appended_views, display_type) {
                display_type  = display_type || "full";
                var OtherView =
                        !appended_views[OtherMvCombo.r_id] ?
                            OtherMvCombo.getView()
                            : appended_views[OtherMvCombo.r_id].clone();

                OtherView.render({synchronous: true, display_type: display_type});
                var params    = {
                    View:               OtherView,
                    container_element:  relationship_string,
                    relationship_index: relationship_index
                };
                var $outer    = $(params.container_element);
                var $content  = $outer.find('.content');
                if ($content[0]) {
                    var v_element                     = OtherView.get_rendered('Element');
                    $content[0].appendChild(v_element);
                    $ris_content[0].appendChild($outer[0]);
                    appended_views[OtherMvCombo.r_id] = appended_views[OtherMvCombo.r_id] || OtherView;
                    OtherView.mark_added();
                } else {
                    Sm.CONFIG.DEBUG && console.log($outer, $content, OtherView);
                }
                return true;
            }
        });
        Sm.loaded.add('Entities_Abstraction_Garage');
    }, 'Entities_Abstraction_Garage');
});