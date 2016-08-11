/**
 * Created by Sam Washington on 7/30/16.
 */
define(['require', 'Sm'], function (require, Sm) {
	Sm.loaded.when_loaded('Entities_Section_View', function () {
		var definition = {
			Model: {},
			View:  {
				render: function () {
					Sm.CONFIG.DEBUG && console.log('boonman');
					return Sm.Entities.Section.View.prototype.render.apply(this, arguments);
				}
			}
		};
		Sm.Entities.Section.add_subtype('definition', definition);
	}, 'Entities-Section-subtypes-definition-main');
});