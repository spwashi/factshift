/**
 * Created by Sam Washington on 1/4/16.
 */
require(['require', 'Class', 'Sm', 'Sm-Entities-Abstraction-templates-_template'], function (require, Class, Sm) {
    require('Sm');
    require('Class');

    Sm.loaded.when_loaded('Core', function () {
        /**
         * @class Sm.Entities.Abstraction.Garage
         * @alias Sm.Entities.Abstraction.Garage
         * @property {Function} _default        {@link Sm.Entities.Abstraction.Garage._default   }
         * @property {Function} generate        {@link Sm.Entities.Abstraction.Garage.generate   }
         */
        Sm.Entities.Abstraction.Garage = Class.extend(
            {
                relationship_display_type: {
                    universes: 'select',
                    concepts:  'tag'
                },
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
                    this.type = type;
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
                _normalize_data:           function (Mv_, config) {
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
                _combine_string:           function (attributes, string) {
                    var underscore_template = _.template(string);
                    return underscore_template(attributes);
                },
                /**
                 *
                 * @param template_arr
                 * @param template_identifier
                 * @param settings
                 * @param settings.config
                 * @param settings.default_value
                 * @param settings.attributes
                 * @param settings.synchronous
                 */
                generate_one:              function (template_arr, template_identifier, settings) {
                    settings           = settings || {};
                    var is_synchronous = !!settings.synchronous;
                    var default_val    = settings.default_value !== false ? settings.default_value || "full" : false;

                    var template        = template_arr[0];
                    var backup_template = template_arr[1] || template;
                    var original_input  = template_identifier;
                    /**
                     * An array of indices to search for.
                     * We iterate through this array and return the last string that we can
                     * @type {Array}
                     */
                    var to_try          = [];
//Get the subtype (e.g. (edit) from the string inline.modal(edit)
                    var subtype_test    = /\((.+)\)/.exec(template_identifier);
                    var subtype         = !!subtype_test && subtype_test[1] ? subtype_test[1] : false;
                    subtype && (template_identifier = template_identifier.replace(subtype_test[0], ""));

                    var ms_test = /\[(.+)\]/.exec(template_identifier);
                    var m_s     = !!ms_test && ms_test[1] ? ms_test[1] : false;
                    m_s && (template_identifier = template_identifier.replace(ms_test[0], ""));
//What are we looking for? This will generally be something like .modal or .body. If neither were specified, default to "body"
                    var i_a_test = /\.(.*)(\b|$)/.exec(template_identifier);
                    var i_a      = !!i_a_test && i_a_test[1] ? i_a_test[1] : false;
                    if (i_a) template_identifier = template_identifier.replace(i_a_test[0], "");

                    var extra__test = /\{(.+)\}/.exec(template_identifier);
                    var extra_      = !!extra__test && extra__test[1] ? extra__test[1] : false;
                    if (extra_) template_identifier = template_identifier.replace(extra__test[0], "");

                    //.[](){}
//If we didn't specify anything, assume that we are trying to pull the "full" version
                    template_identifier = (template_identifier.length ? template_identifier : "full").replace(".", "");

                    !!i_a && to_try.push(i_a);
                    !!m_s && to_try.push(m_s);
                    !!subtype && to_try.push(subtype);
                    !!extra_ && to_try.push(extra_);
                    template_identifier.length && to_try.push(template_identifier);

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
                            replace_object[index] = this.generate_one([preferred_template, fallback], to_search, settings);
                        }
                    }
                    var self        = this;
                    var last_called = [];
                    var last_result = [];

                    var fn      = function (obj, subtype, previous) {
                        var res = false;
                        if (typeof obj === "boolean" || typeof obj === "number") return obj;
                        if (typeof obj === "string") res = obj;
                        if (obj && subtype) {
                            if (typeof obj === "string") res = obj;
                            else if (typeof obj === "function") {
                                //Make sure this function doesn't get called more than once;
                                var i = last_called.indexOf(obj);
                                if (i < 0) res = obj.apply(self, [to_try, settings.attributes || {}, settings.config]);
                                else res = last_result[i];
                                last_called.push(obj);
                                last_result.push(res);
                            } else if (obj[subtype]) res = obj[subtype];
                            else res = false;
                        }
                        if (!res && !!default_val && previous[0] && subtype != default_val) res = fn(obj, default_val, previous);
                        return res;
                    };
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
                        if (typeof preferred_template === "string") {
                            return resolve(preferred_template);
                        }
                    }
                    return resolve("__CONTENT__");
                },

                /**
                 * @alias Sm.Entities.Abstraction.Garage
                 * @param {string}           type
                 * @param {{}}               data              The MvCombo or object that we are generating an element from
                 * @param {{}=}              settings
                 * @param {{}=}              settings.config
                 * @param {string=}          settings.type
                 * @param {string=}          settings.data
                 * @param {boolean=false}    settings.synchronous
                 * @return {*}
                 */
                generate:       function (type, data, settings) {
                    var config;
                    settings = settings || {};
                    if (typeof type === "object") {
                        settings = type;
                        type     = settings.type;
                        data     = settings.MvCombo || settings.data || {};
                    }
                    config              = settings ? settings.config || {} : {};
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
                            outer = self.generate_one(templates, outer_name, {
                                synchronous: true,
                                config:      config,
                                replace:     {__BUTTON_CONTROL__: "button_control"}
                            });
                        var inner = self.generate_one(templates, type, {synchronous: true, config: config});

                        var attributes = $.extend({}, normalized_data.attributes, config);
                        return self._combine_string(attributes, outer.replace(/__CONTENT__/ig, inner));
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
                    type           = type.replace('ips', 'ip');

                    var relationship_indices = [];
                    //If we didn't specify the relationships that we want, assume that we want all of them
                    var _rels                = Meta.get_named_relationship_indices({
                        relationship_indices: settings.relationship_indices || false
                    });
                    for (var pretty_name in _rels) {
                        if (!_rels.hasOwnProperty(pretty_name)) continue;
                        relationship_indices.push([_rels[pretty_name], pretty_name]);
                    }
//				Sm.CONFIG.DEBUG && console.log(relationship_indices);
                    var __orc_t_nom                  = type.replace(/(relationship)/, '$1_outer');
                    var outer_relationship_container =
                            this.generate_one(templates, __orc_t_nom, {synchronous: true});
                    var relevant_relationships       = {};

                    var callback = settings.on_append || false;
                    if (typeof  callback !== "function") callback = false;

                    var $rel_index_list = [];

                    for (var i = 0; i < relationship_indices.length; i++) {
                        var relationship_index = relationship_indices[i][0];
                        var name               = relationship_indices[i][1];
                        var RelationshipIndex  = MvCombo.getRelationshipIndex(relationship_index);
                        if (!RelationshipIndex) Sm.CONFIG.DEBUG && console.log('abs_gar,_el,-1.5', relationship_index);
                        if (!RelationshipIndex) continue;
                        var $relationship_index_el                 = RelationshipIndex.getView({strict: false}).get_rendered('$Element');
                        relevant_relationships[relationship_index] = [];
                        if ($relationship_index_el) $rel_index_list.push($relationship_index_el);
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
                 * @param parameters.RelationshipIndex
                 * @param parameters.relationship_object
                 * @param parameters.type
                 * @param parameters.display_type
                 * @param parameters.templates
                 * @param parameters.MvCombo
                 * @param parameters.list
                 * @param parameters.appended_views
                 * @param parameters.has_subtypes
                 * @return {*}
                 * @protected
                 */
                _populate_relationship_index:      function (parameters) {
                    var $relationship_index_string = parameters.$relationship_index_string;
                    var relationship_index         = parameters.relationship_index;
                    var RelationshipIndex          = parameters.RelationshipIndex;
                    var relationship_object        = parameters.relationship_object;
                    var type                       = parameters.type || '.relationships';
                    var display_type               = parameters.display_type || 'preview';
                    var templates                  = parameters.templates;
                    var appended_views             = parameters.appended_views;
                    var MvCombo                    = parameters.MvCombo;
                    var Meta                       = Sm.Core.Meta.get_entity(MvCombo.type).Meta;
                    var has_subtypes               = parameters.has_subtypes;
                    var def_map_attrs              = (Meta.get_defaults(Meta.get_map_between(RelationshipIndex.linked_entities)) || {});
                    if (this.relationship_display_type[relationship_index] == 'tag') return this._populate_relationship_index_tags(parameters);
                    var relationship_subindices = false;
                    if (has_subtypes && RelationshipIndex.get_listed_subtype_items) {
                        //context_id
                        relationship_subindices = RelationshipIndex.get_listed_subtype_items(0);
                    }

                    var related_items = relationship_object.items || [];
                    if (!related_items.length) return false;

                    var relationship_template_name = type.replace(/(relationship)/, '$1[relationship](' + relationship_index + ')');
                    var relationship_holder        = $relationship_index_string.children('.content').eq(0) || false;
                    var self                       = this;
                    var append_fn                  = function (container, Relationship, OtherMvCombo) {
                        var relationship_string = self.generate_one(templates, relationship_template_name, {synchronous: true});
                        relationship_string     =
                            relationship_string
                                .replace('__R_ID__', Relationship.Identity.r_id)
                                .replace('__MV_R_ID__', MvCombo ? MvCombo.r_id : 'null')
                                .replace('__CONTENT__', '');
                        self._append_relationship({
                            OtherMvCombo:        OtherMvCombo,
                            relationship_holder: container,
                            relationship_index:  relationship_index,
                            relationship_string: relationship_string,
                            appended_views:      appended_views,
                            display_type:        display_type,
                            properties:          {}
                        });
                    };

                    var relationships;
                    var OtherMvCombo, Relationship;
                    if (!relationship_subindices) {
                        relationships = relationship_object.relationships || [];
                        var _count    = relationship_object.count || 0;
                        for (var k = 0; k < _count; k++) {
                            if (!relationship_holder) Sm.CONFIG.DEBUG && console.log('abs_garage,_rel,-1', $relationship_index_string);
                            if (!relationship_holder) return false;
                            OtherMvCombo = related_items[k];
                            Relationship = relationships[k];
                            append_fn(relationship_holder, Relationship, OtherMvCombo);
                        }
                    } else {
                        for (var subindex in relationship_subindices) {
                            Sm.CONFIG.DEBUG && console.log(relationship_subindices);
                            if (!relationship_subindices.hasOwnProperty(subindex) || !relationship_subindices[subindex]) continue;
                            var subtype_name                 = Meta.get_relationship_type({sub: true, type: 'name'}, subindex);
                            var __ris_subtype_t_nom          = type.replace(/(relationship)/, '$1[relationship_subindex](' + subindex + ')');
//						Sm.CONFIG.DEBUG && console.log(subtype_name, subindex, __ris_subtype_t_nom);
                            var relationship_subindex_string = this.generate_one(templates, __ris_subtype_t_nom, {
                                synchronous: true, config: {
                                    list:         'position' in def_map_attrs,
                                    has_subtypes: 'relationship_subtype' in def_map_attrs
                                }
                            });
                            //Replace the generic "__TITLE__" string with the display name of the relationship
                            relationship_subindex_string     = relationship_subindex_string.replace('__TITLE__', subtype_name).replace('__CONTENT__', '').replace('__TYPE__', subindex);
//						Sm.CONFIG.DEBUG && console.log(relationship_subindex_string);
                            var $rel_subindex                = $(relationship_subindex_string);
//						Sm.CONFIG.DEBUG && console.log($rel_subindex);
//						Sm.CONFIG.DEBUG && console.log(relationship_holder);
                            relationship_holder.append($rel_subindex);
                            var items     = relationship_subindices[subindex].items;
                            relationships = relationship_subindices[subindex].relationships;
                            for (var j = 0; j < items.length; j++) {
                                append_fn($rel_subindex, relationships[j], items[j]);
                            }
                        }
                    }
                    return $relationship_index_string;
                },
                _populate_relationship_index_tags: function (parameters) {
                    var relationship_index  = parameters.relationship_index;
                    var $content            = parameters.$relationship_index_string.children('.' + relationship_index + '-relationships').eq(0);
                    var relationship_object = parameters.relationship_object;
                    var items               = relationship_object.items;
                    var relationships       = relationship_object.relationships;
                    var data                = [];
                    var User                = Sm.Entities.User.Wrapper.get_active();
                    var url                 = Sm.urls.api.generate({MvCombo: User || parameters.MvCombo || false, fetch: relationship_index});
                    var active              = [];
                    for (var i = 0; i < items.length; i++) {
                        var OtherMvCombo = items[i];
                        var Relationship = relationships[i];
                        var r_id         = OtherMvCombo.r_id;
                        var d            = {};
                        d.text           = OtherMvCombo.Model.get('title');
                        d.id             = r_id;
                        d.Relationship   = Relationship;
                        data.push(d);
                        active.push(r_id);
                    }
                    $content.select2(
                        {
                            tags:            true,
                            tokenSeparators: [','],
                            cache:           true,
                            data:            data,
                            ajax:            {
                                url:            url,
                                dataType:       'json',
                                delay:          250,
                                cache:          true,
                                multiple:       true,
                                data:           function (params) {
                                    return {
                                        return_by: 'array',
                                        q:         params.term, // search term
                                        page:      params.page
                                    };
                                },
                                processResults: function (data, params) {
                                    // parse the results into the format expected by Select2
                                    // since we are using custom formatting functions we do not need to
                                    // alter the remote JSON data, except to indicate that infinite
                                    // scrolling can be used
                                    //todo look into pagination
                                    var items = data && data.data && data.data.items ? data.data.items : [];
                                    return {
                                        results:    (items && items[0] ? items : []).map(function (item) {
                                            if (item && item.title) {
                                                var type = item._model_type;
                                                if (!type || !Sm.Entities[type]) return false;
                                                return {
                                                    id:      item.ent_id,
                                                    text:    item.title,
                                                    MvCombo: Sm.Entities[type].Wrapper.init_MvCombo({model: item})
                                                }
                                            }
                                            return false;
                                        }),
                                        pagination: {
                                            more: (params.page * 30) < 100
                                        }
                                    };
                                }
                            },
                            escapeMarkup:    function (markup) {
                                return markup;
                            }, // let our custom formatter work
                            width:           '300px'
                        });
                    $content.on('click-tag', function (evt, props) {
                        props    = props || {};
                        var data = props.data || {};
                        Sm.CONFIG.DEBUG && console.log(evt, props);
                    });
                    $content.val(active).trigger('change');
                    return parameters.$relationship_index_string;
                },
                _append_relationship:              function (parameters) {
                    var OtherMvCombo        = parameters.OtherMvCombo;
                    //The content of the relationship index string
                    var relationship_holder = parameters.relationship_holder;
                    var relationship_index  = parameters.relationship_index;
                    var relationship_string = parameters.relationship_string;
                    var appended_views      = parameters.appended_views;
                    var display_type        = parameters.display_type;
                    var properties          = parameters.properties;
                    display_type            = display_type || "full";
                    var OtherView           =
                            !appended_views[OtherMvCombo.r_id] ?
                                OtherMvCombo.getView()
                                : appended_views[OtherMvCombo.r_id].clone();
                    OtherView.render({synchronous: true, display_type: display_type});
                    var params   = {
                        View:               OtherView,
                        container_element:  relationship_string,
                        relationship_index: relationship_index
                    };
                    var $outer   = $(params.container_element);
                    var $content = $outer.find('.content');
                    if ($content[0]) {
                        var v_element = OtherView.get_rendered('Element');
                        $content[0].appendChild(v_element);
                        if (properties && !!properties.list) {
                            var RelationshipIndex = OtherMvCombo.getRelationshipIndex(relationship_index);
                            var position          = RelationshipIndex.get_listed_items()
                        }
                        relationship_holder[0].appendChild($outer[0]);
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