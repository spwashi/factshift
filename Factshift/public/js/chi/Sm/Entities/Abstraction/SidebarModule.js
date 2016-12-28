/**
 * Created by Sam Washington on 7/9/16.
 */
require(['require', 'backbone', 'jquery', 'underscore', 'Cocktail', 'Sm-Entities-Abstraction-Modal-ModalEdit'], function (require, Backbone, $, _, Cocktail) {
    Sm.Entities.Abstraction.mixins.SidebarModule = {
        focus:                function () {
            if (this.status.is_focused) return this;
            var MvCombo_    = this.MvCombo;
            var Model_      = MvCombo_.Model;
            var description = Model_.get('description') || '';
            var self        = this;
            var desc        = self.elements.description_container || this.get_rendered('description_container');
            if (desc) {
                Sm.Entities[this.type].Garage.generate('preview', MvCombo_).then(function (result) {
                    self.elements.description_container.innerHTML = result;
                    self.init_button_control_events();
                });
            } else {
                Sm.CONFIG.DEBUG && console.log(this.type, this.elements.description_container, desc);
            }
            return Sm.Core.SmView.prototype.focus.apply(this, arguments);
        },
        blur:                 function () {
            if (!this.MvCombo.queryStatus('focused')) return this;
            this.elements.description_container && (this.elements.description_container.innerHTML = '');
            this.elements.button_control = false;
            return Sm.Core.SmView.prototype.blur.apply(this, arguments);
        },
        _rendering_callbacks: {
            button_control:        function () {
                return (this.elements.button_control = this.elements.button_control || $(this.get_rendered('description_container')).find('.button-control')[0]);
            },
            container:             function () {
                if (!!this.elements.container) return this.elements.container;
                var type = this.type.toLowerCase();
                return (this.elements.container = this.elements.container || $('.' + type + '-container')[0] || false);
            },
            description_container: function () {
                return (this.elements.description_container = this.elements.description_container || $(this.get_rendered('container')).parent().find('.description-container')[0]);
            },
            title_element:         function () {
                if (!!this.elements.title) return this.elements.title;
                var matching = this.get_rendered('$Element').find('.title');
                return this.elements.title = (matching[0] ? matching[0] : false);
            },
            description_element:   function () {
                if (!!this.elements.description) return this.elements.description;
                var matching = this.get_rendered('$Element').find('.description');
                return this.elements.description = (matching[0] ? matching[0] : false);
            }
        }
    };
    Sm.loaded.add('Sm_Entities_Abstraction_mixins_SidebarModule');
});