/**
 * Created by Sam Washington on 11/6/16.
 */
define(['require', 'Sm', 'Emitter', 'underscore', 'jquery', 'Sm-Core-Core', 'Sm-Abstraction-templates-_template'], function (require, Sm, Emitter, _, $) {
    var is_promise                                  = function (item) {return item && (item instanceof Promise || item.then);};
    var active_functions                            = [];
    /**
     * @class Sm.Abstraction.Garage
     * @alias Sm.Abstraction.Garage
     */
    var Garage                                      = Emitter.extend(
        {
            cached_templates:      null,
            template_object:       null,
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
                settings           = settings || {};
                var is_synchronous = !!settings.is_synchronous;
                var template;
                var Error;

                if (!templates || !templates[0]) {
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
                //This is here so we can use PHPStorm's code completion abilities, which doesn't work if "[" comes after an object key
                template_identifier   = template_identifier.replace('.[', '[');
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
                var Self                  = this;
                var previously_called     = [];
                var previous_call_results = [];
                var result_is_final       = function (result) {
                    return result && (is_promise(result) || typeof result === "string" || Sm.Core.Util.isNode(result) || result instanceof jQuery)
                };
                var resolve               = function (string) {
                    var attributes;
                    if (data.Resource && typeof data.Resource === "object" && data.Resource.getAttributes) {
                        attributes = data.Resource.getAttributes();
                    } else if (data.attributes && typeof data.attributes === "object") {
                        attributes = data.attributes;
                    } else {
                        attributes = data;
                    }

                    var processed_string = string;
                    if (typeof string === "string") {
                        processed_string = data ? Self.fillTemplate(attributes, string) : string;
                        for (var index in replace_object) {
                            if (!replace_object.hasOwnProperty(index)) continue;
                            processed_string = processed_string.replace(index, replace_object[index]);
                        }
                    }
                    return is_synchronous ? processed_string : Promise.resolve(processed_string);
                };
                var search                = function (obj, display_type, intended_display_type) {
                    intended_display_type = intended_display_type || display_type;
                    var result            = false;
                    var obj_can_be_result = result_is_final(obj);

                    if (typeof obj === "boolean" || typeof obj === "number" || !obj) return obj;
                    if (obj_can_be_result) return result = obj;
                    else if (typeof obj === "function" || (typeof obj[display_type] === "function" && (obj = obj[display_type]))) {
                        //Make sure this function doesn't get called more than once;
                        if (active_functions.indexOf(obj) > -1) {
                            return false;
                        }
                        var i = previously_called.indexOf(obj);
                        if (i > -1) {
                            result = previous_call_results[i]
                        } else {
                            active_functions.push(obj);
                            result = obj.apply(Self, [data || {}, intended_display_type, is_synchronous]);
                            active_functions.splice(active_functions.indexOf(obj), 1);

                            previously_called.push(obj);
                            previous_call_results.push(result);
                        }
                    } else if (obj[display_type]) {
                        return result = obj[display_type];
                    }
                    else return false;
                    return result;
                };
                var intended_search_index = null;
                /**
                 * Iterate through the array of whatever we are looking for and try to pull the last string from it.
                 * If we get to a point where we cannot find something that we are looking for, we fallback to a default string.
                 */
                for (var j = 0; j < search_indices.length; j++) {
                    //The current thing that we are looking for
                    var template_search_index   = search_indices[j];
                    //This is the last thing that we looked for
                    var search_results          = [];
                    var _empty_template_indices = [];
                    var other_results_found     = false;
                    var len                     = templates.length;

                    var find_results = function (templates, template_search_index, intended_search_index, search_results) {
                        var other_results_found = false;
                        for (var i = 0; i < templates.length; i++) {
                            var current_template = templates[i];
                            if (!!search_results[i]) continue;
                            var result        = search(current_template, template_search_index, intended_search_index, search_results);
                            search_results[i] = result;
                            if (!other_results_found && result_is_final(result)) return result;
                            other_results_found = other_results_found || !!result;
                        }
                        return null;
                    };
                    var result       = find_results(templates, template_search_index, intended_search_index, search_results);
                    if (!search_results.filter(function (i) {return i;}).length && template_search_index !== 'std') result = find_results(templates, 'std', template_search_index, search_results);
                    if (result) return resolve(result);

                    templates = [].concat(search_results);
                    if (j === search_indices.length - 1 && template_search_index !== 'std') {
                        search_indices.push('std');
                        intended_search_index = template_search_index;
                    } else {
                        intended_search_index = null;
                    }
                }
                return resolve("");
            },
            fillTemplate:          function (attributes, string) {
                if (typeof string !== "string") return string;
                attributes              = this.getAttributesFromData(attributes);
                var underscore_template = _.template(string);
                return underscore_template(attributes);
            },
            generate:              function (template_identifier, data, settings) {
                if (typeof  settings === "boolean") settings = {is_synchronous: settings};
                settings           = settings || {};
                var is_synchronous = settings.is_synchronous || false;
                var Self           = this;
                if (!data) Sm.CONFIG.DEBUG && console.log(arguments);
                var resolve   = function (string) {
                    string = Self.fillTemplate(data, string);
                    return !is_synchronous ? Promise.resolve(string) : string;
                };
                var templates = [this.getTemplateObject(data), this.getTemplateObject(null)];
                var fragment  = this.createFragmentHTML(template_identifier, templates, data, {is_synchronous: is_synchronous});
                return !is_synchronous ? fragment.then(resolve) : resolve(fragment);
            },
            getTemplateObject:     function (data) {
                if (!data)return Sm.Abstraction.templates._template;
                if (this.template_object) return this.template_object;
                var entity_type = Sm.Core.Identifier.getEntityType(data);
                var template_object;
                if (!entity_type && data.Resource) {
                    data        = data.Resource || null;
                    entity_type = Sm.Core.Identifier.getEntityType(data);
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
                data = data || {};
                return data.getAttributes ? data.getAttributes() : data;
            }
        });
    Sm.Abstraction.Garage                           = new Garage(null);
    Sm.Abstraction.Garage.extend                    = Garage.extend.bind(Garage);
    Sm.Abstraction.Garage.Proto                     = Garage;
    Sm.Abstraction.Garage.replaceContentPlaceholder = function (outer, inner, is_synchronous, identifier) {
        if (!is_synchronous) {
            inner = is_promise(inner) ? inner : Promise.resolve(inner);
            outer = is_promise(outer) ? outer : Promise.resolve(outer);
            return outer.then(function (outer_result) {
                return inner.then(function (inner_result) {
                    return Sm.Abstraction.Garage.replaceContentPlaceholder(outer_result, inner_result, true);
                })
            })
        } else {
            var is_correct = function (item) {return item && (typeof item === "string" || item instanceof $ || Sm.Core.Util.isNode(item) || Sm.Core.Util.isArray(item));};
            if (!is_correct(outer)) outer = '__CONTENT__';
            if (!inner) inner = '';
            else if (!is_correct(inner)) inner = '__CONTENT__';
        }
        identifier               = identifier || null;
        var replacement_happened = false;
        if (typeof outer === "string") {
            if (typeof inner === "string" && outer.indexOf('__CONTENT__') > -1) {
                identifier           = null;
                outer                = $(outer.replace('__CONTENT__', inner));
                replacement_happened = true;
            } else {
                identifier = identifier || ("replace-gi-tmp" + Sm.Core.Util.randomString(3, 'abcdefg'));
                outer      = $(outer.replace('__CONTENT__', '<div id="' + identifier + '"></div>'));
            }
        }
        if (identifier && !replacement_happened) {
            var $container;
            if (($container = outer.find('#' + identifier)).length) {
                $container.replaceWith($(inner));
            } else {
                outer.append(inner);
            }
        }
        return outer;
    };
    Sm.Abstraction.Garage.normalizeResult           = function (item, is_synchronous) {
        return Sm.Abstraction.Garage.replaceContentPlaceholder(item, null, is_synchronous);
    };
    Sm.Core.dependencies.add('Abstraction-Garage');
});