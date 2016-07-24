/**
 * Created by Sam Washington on 7/8/16.
 */
require(['require', 'Class', 'Sm', 'Sm/Extras/Modal'], function (require, Class) {
	Sm.loaded.when_loaded(['Extras_Modal'], function () {
		Sm.Entities.Abstraction.Modal         = Sm.Entities.Abstraction.Modal || {};
		/**
		 * @alias Sm.Entities.Abstraction.Modal.Destroy
		 * @prop {Array} Sm.Entities.Abstraction.Modal.Destroy.EntityArr {@see Sm.Entities.Abstraction.Modal.Destroy.EntityArr}
		 */
		Sm.Entities.Abstraction.Modal.Destroy = Sm.Extras.Modal.extend({
			init:             function (settings) {
				settings                   = settings || {};
				this.display_type          = (settings.display_type || 'full') + '.modal[destroy]';
				settings.events_to_trigger = ['before_open', 'open', 'close', 'choose'];
				this.self_type             = this.self_type || 'Abstraction';
				return Sm.Extras.Modal.prototype.init.apply(this, arguments);
			},
			generate_element: function () {
				return Sm.Entities[this.self_type].Garage.generate(this.display_type).catch(function (e) {
					Sm.CONFIG.DEBUG && console.log('OK,m_dest,gme,1', e);
					throw  e;
				});
			},
			////////////////////////////////////////////////////////////////////////
			on_before_open:   function () {
				var self              = this;
				var EntityArr         = self.EntityArr;
				var $el               = $(self.element);
				var $e_list_container = $el.find('.spwashi-entities-list');
				Sm.CONFIG.DEBUG && console.log(self.element, $e_list_container);
				for (var i = 0; i < EntityArr.length; i++) {
					var _MvCombo = EntityArr[i];
					var View     = _MvCombo.getView({reference_element: self.element});
					View.render({synchronous: true, display_type: 'tag'});
					View.setPermission('focus', false);
					var li       = document.createElement('li');
					li.appendChild(View.el);
					$e_list_container.append(li);
				}
			},
			on_open:          function () {
				var content_element = this.content_element;
				var self            = this;
				this.EntityArr.forEach(function (current_element, index) {self.ViewArr.push(current_element.addView(content_element, false, {display_type: self.display_type}));});
			},
			on_choose:        function (data) {
				Sm.CONFIG.DEBUG && console.log(data);
				return data == "true" ? this.promise_object.resolve(true) : this.promise_object.reject(false);
			},
			on_close:         function () {
				var ViewArr = this.ViewArr;
				for (var i = 0; i < ViewArr.length; i++) {
					var View_ = ViewArr[i];
					View_ && View_.destroy();
				}
			}
		});
	}, 'Entities_Abstraction_Modal_Destroy');
});
