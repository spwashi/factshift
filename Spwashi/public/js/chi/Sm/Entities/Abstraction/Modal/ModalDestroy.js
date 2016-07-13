/**
 * Created by Sam Washington on 7/8/16.
 */
require(['require', 'Class', 'Sm', 'Sm/Extras/Modal'], function (require, Class) {
    Sm.loaded.when_loaded(['Extras_Modal'], function () {
        Sm.Entities.Abstraction.Modal         = Sm.Entities.Abstraction.Modal || {};
        /**
         * @alias Sm.Entities.Abstraction.Modal.Destroy
         * @prop {Array} Sm.Entities.Abstraction.Modal.Destroy.MvComboArr {@see Sm.Entities.Abstraction.Modal.Destroy.MvComboArr}
         */
        Sm.Entities.Abstraction.Modal.Destroy = Sm.Extras.Modal.extend({
            init:      function (settings) {
                settings                   = settings || {};
                this.display_type          = (settings.display_type || 'full') + '.modal[destroy]';
                settings.events_to_trigger = ['open', 'close', 'choose'];
                return Sm.Extras.Modal.prototype.init.apply(this, arguments);
            },
            ////////////////////////////////////////////////////////////////////////
            on_open:   function () {
                var content_element = this.content_element;
                var self            = this;
                this.MvComboArr.forEach(function (current_element, index) {self.ViewArr.push(current_element.addView(content_element, false, {display_type: self.display_type}));});
            },
            on_choose: function (data) {
                Sm.CONFIG.DEBUG && console.log(data);
                return data == "true" ? this.promise_object.resolve(true) : this.promise_object.reject(false);
            },
            on_close:  function () {
                var ViewArr = this.ViewArr;
                for (var i = 0; i < ViewArr.length; i++) {
                    var View_ = ViewArr[i];
                    View_ && View_.destroy();
                }
            }
        });
    }, 'Entities_Abstraction_Modal_Destroy');
});
