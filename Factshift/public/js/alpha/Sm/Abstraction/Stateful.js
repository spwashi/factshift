/**
 * Created by Sam Washington on 11/13/16.
 */
define(['require', 'Sm', 'Sm-Core-Core'], function (require, Sm) {
    /**
     * @class Sm.Abstraction.Stateful
     * @property setStatus
     * @property getStatus
     */
    Sm.Abstraction.Stateful = {
        setStatus:   function (status, value) {
            if (!status) return false;
            if (arguments.length === 1) value = true;
            if (typeof status === "object") {
                for (var name in status) {
                    if (!status.hasOwnProperty(name)) continue;
                    this.setStatus(name, status[name]);
                }
                return true;
            }
            this.statuses         = this.statuses || {};
            this.statuses[status] = value;
            return true;
        },
        queryStatus: function (status) {
            this.statuses = this.statuses || {};
            return this.statuses[status] || null;
        }
    };
    Sm.Core.dependencies.add('Abstraction_Stateful');
});