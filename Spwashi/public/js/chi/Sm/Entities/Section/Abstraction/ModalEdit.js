/**
 * Created by Sam Washington on 7/10/16.
 */
require(['require', 'Class', 'Sm', 'Sm/Extras/Modal', 'Sm-Entities-Abstraction-ModalEdit'], function (require, Class) {
    Sm.CONFIG.DEBUG && console.log('22 - medit');
    Sm.loaded.when_loaded('Entities_Abstraction_Modal_Edit', function () {
        Sm.Entities.Section.Abstraction            = Sm.Entities.Section.Abstraction || {};
        Sm.Entities.Section.Abstraction.Modal      = Sm.Entities.Section.Abstraction.Modal || {};
        Sm.Entities.Section.Abstraction.Modal.Edit = Sm.Entities.Abstraction.Modal.Edit.extend({
            init:             function (settings) {
                settings = settings || {};
                Sm.CONFIG.DEBUG && console.log(settings);
                if (settings.relationship_object) settings.display_type = 'inline';
                return Sm.Entities.Abstraction.Modal.Edit.prototype.init.apply(this, arguments);
            },
            generate_element: function (config) {
                var c = config || {};
                if (this.MvComboArr.length === 1) {
                    var MvCombo_  = this.MvComboArr[0];
                    var self_type = this.self_type;
                    var self      = this;
                    if ((self.relationship_object && self.relationship_object.other_MV_type == "Dictionary")) {
                        c.change          = {section_type: false};
                        c.display_subtype = Sm.Entities.Section.Meta.get_type("definition", "index")
                    }
                }
                return Sm.Entities.Abstraction.Modal.Edit.prototype.generate_element.call(this, c);
            }
        });
    }, 'Entities_Section_Abstraction_Modal_Edit');
});