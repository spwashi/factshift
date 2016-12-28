/**
 * Created by Sam Washington on 12/19/15.
 */
require(['require'], function (require) {
	Sm.loaded.when_loaded('Core_SmView', function () {
		Sm.Entities.Page.View = Sm.Core.SmView.extend({
			type:                 'Page',
			identifier:           '.spwashi-page',
			_rendering_callbacks: {
				button_control: function () {
					if (!!this.elements.button_control) return this.elements.button_control;
					var matching = this.get_rendered('$Element').find('>header>.button-control');
					return this.elements.button_control = (matching[0] ? matching[0] : false);
				}
			},
			/**
			 * This is a basic click handler that operates based only on the target of the click.
			 * * Adding Sections to the active dictionary
			 * @param target The target of the click
			 * @return {boolean}
			 */
			handle_click:         function (target) {
				var $target = $(target);
				if ($target.hasClass('add-section-button')) {
					var Dimension = Sm.Entities.Dimension.Wrapper.get_active();
					if (Dimension) {
						var dView = Dimension.getView();
						dView.prompt_add_relationship({type: 'Section'});
					}
				}
			}
		});
		Sm.loaded.add('Entities_Page_View');
	}, 'Entities_Page_View');
});