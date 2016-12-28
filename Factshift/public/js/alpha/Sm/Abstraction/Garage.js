/**
 * Created by Sam Washington on 11/6/16.
 */
define(['require', 'Sm', 'Emitter', 'underscore', 'Sm-Core-Core', 'Sm-Abstraction-templates-_template'], function (require, Sm, Emitter, _) {
    Sm.Abstraction.Garage = Emitter.extend(
        {
            cached_templates: {},

            init:                  function (entity_type) {
                this.entity_type = entity_type || null;
            },
            _createDefaultElement: function () {
                var Div       = document.createElement('div');
                Div.className = 'empty';
                return Div;
            },
            /**
             *
             * @param template_identifier
             * @param templates
             * @param data
             * @param settings
             * @param settings.is_synchronous
             * @param settings.replace                      An object ordered key=>template name that we're supposed to replace. FLAWED
             * @param settings.default_template_value
             *
             * @throws Sm.Exceptions.Error
             */
            createFragmentHTML:    function (template_identifier, templates, data, settings) {
                settings             = settings || {};
                var is_synchronous   = !!settings.is_synchronous;
                var template, backup_template;
                var Error;
                var _template_is_arr = Sm.Core.Util.isArray(templates);

                template        = _template_is_arr ? templates[0] || false : templates;
                backup_template = _template_is_arr ? templates[1] || {} : {};
                if (!template) {
                    Error = new Sm.Exceptions.Error("No template for " + template_identifier, arguments);
                    if (is_synchronous) throw Error;
                    return Promise.reject(Error);
                }
                //.[](){}
                var patterns_to_match = [
                    /\.([^\[\(\{$)]*)/,     //  .index
                    /\[(.+)\]/,         //  [index]
                    /\((.+)\)/,         //  (index)
                    /\{(.+)\}/          //  {index}
                ];
                var original_input    = template_identifier;
                /**
                 * An array of indices to search for.
                 * We iterate through this array and return the last string that we can
                 * @type {Array}
                 */
                var search_indices    = [];
                for (var i = 0; i < patterns_to_match.length; i++) {
                    var pattern      = patterns_to_match[i];
                    var matches      = pattern.exec(template_identifier);
                    var search_index =
                            !!matches && matches[1]
                                ? matches[1]
                                : null;
                    if (!!search_index) {
                        template_identifier = template_identifier.replace(matches[0], '');
                        search_indices.push(search_index);
                    }
                }

                //If we didn't specify anything, assume that we are trying to pull the "full" version
                template_identifier = template_identifier.length ? template_identifier.replace(".", "") : '';

                !!template_identifier.length && search_indices.splice(0, 0, template_identifier);
                var replace_object = {};
                var replace        = settings.replace || false;
                if (replace) {
                    delete  settings.replace;
                    for (var index in replace) {
                        if (!replace.hasOwnProperty(index)) continue;
                        var replace_template_identifier = original_input.replace(search_indices[0] || 'null', replace[index]);

                        try {
                            (replace_object[index] = this.createFragmentHTML(replace_template_identifier,
                                                                             templates.slice(),
                                                                             data,
                                                                             {is_synchronous: true}));
                        } catch (e) {Sm.CONFIG.DEBUG && console.log(e);}
                    }
                }
                var Self        = this;
                var last_called = [];
                var last_result = [];

                var fn            = function (obj, subtype, previous) {
                    var res = false;
                    if (typeof obj === "boolean" || typeof obj === "number") return obj;
                    if (typeof obj === "string") res = obj;
                    if (obj && subtype) {
                        if (typeof obj === "string") res = obj;
                        else if (typeof obj === "function" || (typeof obj[subtype] === "function" && (obj = obj[subtype]))) {
                            //Make sure this function doesn't get called more than once;
                            var i = last_called.indexOf(obj);
                            try {
                                if (i < 0) {
                                    res = obj.apply(Self, [data]);
                                    last_called.push(obj);
                                    last_result.push(res);
                                }
                                else res = last_result[i];
                            } catch (e) {
                                Sm.CONFIG.DEBUG && console.log(e);
                            }

                        } else if (obj[subtype]) res = obj[subtype];
                        else res = false;
                    }
                    return res;
                };
                var resolve       = function (string) {
                    var processed_string = data ? Self.fillTemplate(data, string) : string;
                    for (var index in replace_object) {
                        if (!replace_object.hasOwnProperty(index)) continue;
                        processed_string = processed_string.replace(index, replace_object[index]);
                    }
                    return is_synchronous ? processed_string : Promise.resolve(processed_string);
                };
                var last_searched = [];
                /**
                 * Iterate through the array of whatever we are looking for and try to pull the last string from it.
                 * If we get to a point where we cannot find something that we are looking for, we fallback to a default string.
                 */
                for (var j = 0; j < search_indices.length; j++) {
                    //The current thing that we are looking for
                    var template_search_index = search_indices[j];
                    //This is the last thing that we looked for
                    last_searched.splice(0, 0, j ? search_indices[j - 1] : false);
                    var search_result           = null;
                    var _empty_template_indices = [];
                    for (var k = 0; k < templates.length; k++) {
                        templates[k] = search_result = fn(templates[k], template_search_index, last_searched);
                        if (typeof search_result === "string") return resolve(search_result);
                        if (!search_result) _empty_template_indices.forEach(function (index) {templates[index] = search_result;});
                        _empty_template_indices.push(k);
                    }
                    //If the primary object is a string already, we are okay and should stop looking.
                }
                return resolve("__CONTENT__");
            },
            fillTemplate:          function (attributes, string) {
                attributes              = this.getAttributesFromData(attributes);
                var underscore_template = _.template(string);
                return underscore_template(attributes);
            },
            generate:              function (template_identifier, data, settings) {
                settings           = settings || {};
                var is_synchronous = settings.is_synchronous || false;
                var Self           = this;
                var resolve        = function (template) {
                    template = Self.fillTemplate(data, template);
                    return !is_synchronous ? Promise.resolve(template) : template;
                };
                var templates      = [this.getTemplateObject(data), this.getTemplateObject()];
                var fragment       = this.createFragmentHTML(template_identifier, templates, data, {
                    is_synchronous: is_synchronous,
                    replace:        {__BUTTON_CONTROL__: "button_control"}
                });
                return !is_synchronous ? fragment.then(resolve) : resolve(fragment);
            },
            getTemplateObject:     function (data) {
                if (!data)return Sm.Abstraction.templates._template;
                var entity_type = Sm.Core.Meta.getEntityType(data);
                var template_object;
                if (!entity_type && data.Resource) {
                    data        = data.Resource || null;
                    entity_type = Sm.Core.Meta.getEntityType(data);
                }
                var SmEntity = Sm.Core.Meta.getSmEntity(entity_type);
                if (!SmEntity || !data) return Sm.Abstraction.templates._template;
                var subtype = SmEntity.Meta.getEntitySubtype(data);
                if (subtype) template_object = (SmEntity.templates || Sm.Abstraction.templates)[subtype];
                return template_object || SmEntity.templates._template || Sm.Abstraction.templates._template;
            },

            /**
             *
             * @param {Sm.Abstraction.Entity|Sm.Core.Identifier.Identifiable|{}}    data
             * @return {*}
             */
            getAttributesFromData: function (data) {
                return data.getAttributes ? data.getAttributes() : data;
            }
        });
    Sm.Core.dependencies.add('Abstraction-Garage');
});