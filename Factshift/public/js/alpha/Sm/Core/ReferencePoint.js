/**
 * Created by Sam Washington on 11/6/16.
 */
require(['require', 'Class', 'Sm', 'Sm-Core-Util'], function (require, Class, Sm) {
    var Util = Sm.Core.Util;

    var ReferencePoint = Sm.Core.ReferencePoint = Sm.Core.Identifier.extend(
        {
            object_type: 'ReferencePoint',
            entity_type: null,
            replace:     function (Replacement) {
                if (Replacement && ReferencePoint.getObjectType(Replacement) !== ReferencePoint.getObjectType(this)) return Replacement.update();
                Sm.Core.Identifier._register(this.getR_ID(), Replacement);
                return Replacement;
            },
            update:      function () {
                var config_id = locate_callback(this.Resource, ReferencePoint._updaters);
                return config_id ? this.replace(config_id(this)) : this;
            }
        });
    ReferencePoint._handlers     = {};
    ReferencePoint._updaters     = {};
    ReferencePoint.getObjectType = function (Resource) {
        var object_type = Resource && typeof  Resource === "object" ? (Resource.object_type ? Resource.object_type : (Resource.getObjectType ? Resource.getObjectType() : null)) : null;
        if (!object_type && Sm.Core.Util.isElement(Resource)) object_type = 'HTMLElement';
        return object_type;
    };

    var locate_callback                         = function (Resource, object) {
        var object_type = ReferencePoint.getObjectType(Resource);
        if (object_type && object_type in object) {
            if (Sm.Core.Util.isArray(object[object_type])) {
                var arr = object[object_type];
                return function () {
                    var result = null;
                    for (var i = arr.length; i--;) {
                        if (typeof arr[i] === "function" && (result = arr[i].apply(null, arguments))) return result;
                    }
                    return null;
                }
            }
            return object[object_type];
        }
        if (!object.unnamed) return null;
        var unnamed = object.unnamed;
        for (var i = unnamed.length; i--;) {
            var callback = unnamed[i];
            if (callback.compare(Resource)) return callback.callback;
        }
        return null;
    };
    var register_object_callback                = function (object_type, callback, container) {
        if (typeof callback !== "function") return null;
        if (typeof object_type === "function") {
            container.unnamed = container.unnamed || [];
            container.unnamed.push({compare: object_type, callback: callback});
        } else {
            if (container[object_type]) {
                if (!Sm.Core.Util.isArray(container[object_type])) container[object_type] = [container[object_type]];
                container[object_type].push(callback)
            } else container[object_type] = callback;
        }
    };
    ReferencePoint.register_object_type_handler = function (object_type, handler) {
        return register_object_callback(object_type, handler, ReferencePoint._handlers);
    };
    ReferencePoint.register_object_type_updater = function (object_type, updater) {
        return register_object_callback(object_type, updater, ReferencePoint._updaters);
    };
    ReferencePoint.init                         = function (Resource, identification_object) {
        identification_object = {};
        var object_type       = ReferencePoint.getObjectType(Resource);
        if (object_type === 'ReferencePoint') return Resource;
        var config_id = locate_callback(Resource, ReferencePoint._handlers);
        if (config_id) {
            config_id(Resource, identification_object);
        } else {
            identification_object.r_id = Sm.Core.Identifier._generate_r_id(object_type);
        }
        if (typeof Resource === "string") identification_object.r_id = Resource;
        if (identification_object.r_id) identification_object.r_id = 'Reference:' + (identification_object.r_id || '');

        var Identifier = Sm.Core.Identifier.retrieve(identification_object) || new ReferencePoint(Resource, identification_object);
        for (var index in identification_object) {
            if (!identification_object.hasOwnProperty(index)) continue;
            Identifier[index] = identification_object;
        }
        return Identifier;
    };
    ReferencePoint.compare                      = function (First, Second) {
        var result = (First = ReferencePoint.init(First).update()) === (Second = ReferencePoint.init(Second).update());
        return result;
    };

    ReferencePoint.register_object_type_handler('HTMLElement', function (item, identification_obj) {
        identification_obj.r_id = item.dataset['factshift_el_id'] = item.dataset['factshift_el_id'] || Sm.Core.Identifier._generate_r_id('HTMLElement');
    });
    Sm.Core.dependencies.add('Core-ReferencePoint');
});