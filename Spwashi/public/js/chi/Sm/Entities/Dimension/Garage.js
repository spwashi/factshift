/**
 * Created by Sam Washington on 1/4/16.
 */
require(['require', 'Sm'], function (require) {
	require('Sm');
	Sm.loaded.when_loaded(['Entities_Abstraction_Garage'], function () {
		/**
		 * @alias Sm.Entities.Dimension.Garage
		 * @extends Sm.Entities.Abstraction.Garage
		 */
		var GarageClass              = Sm.Entities.Abstraction.Garage.extend({});
		Sm.Entities.Dimension.Garage = new GarageClass('Dimension', 'dimension_type');
	}, 'Entities_Dimension_Garage');
});