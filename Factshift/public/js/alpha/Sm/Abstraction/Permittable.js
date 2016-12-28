/**
 * Created by Sam Washington on 11/13/16.
 */
define(['require', 'Sm', 'Sm-Core-Core'], function (require, Sm) {
    /**
     * @class Sm.Abstraction.Permittable
     * @property setPermission
     * @property getPermission
     */
    Sm.Abstraction.Permittable = {
        setPermission:   function (permission, value) {
            if (!permission) return false;
            if (typeof permission === "object") {
                for (var name in permission) {
                    if (!permission.hasOwnProperty(name)) continue;
                    this.setPermission(name, permission[name]);
                }
                return true;
            }
            this._permissions             = this._permissions || {};
            this._permissions[permission] = value;
            return true;
        },
        queryPermission: function (permission) {
            this._permissions = this._permissions || {};
            return this._permissions[permission] || null;
        }
    };
    Sm.Core.dependencies.add('Abstraction_Permittable');
});