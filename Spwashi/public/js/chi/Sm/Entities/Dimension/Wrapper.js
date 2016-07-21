/**
 * Created by Sam Washington on 12/19/15.
 */
require(['require', 'Sm-Core-MvWrapper'], function (require) {
	Sm.loaded.when_loaded('Core_MvWrapper', function () {
		var DimensionWrapper          = Sm.Core.MvWrapper.extend({
			type:               'Dimension',
			parentType:         null,
			populate_container: function (settings) {},
			hydrate:            function (settings) {
				var res        = Sm.Core.MvWrapper.prototype.hydrate.call(this, settings);
				var active_MVS = this.get_active();
				for (var MV_ID in active_MVS) {
					if (!active_MVS.hasOwnProperty(MV_ID)) continue;
					if (active_MVS[MV_ID].MvCombo) {
						active_MVS[MV_ID].MvCombo.focus();
						break;
					}
				}
				return res;
			},
			get_active:         function () {
				var active_dimensions = this.MvMaps.active_MVs;
				for (var dimension in active_dimensions) {
					if (!active_dimensions.hasOwnProperty(dimension)) continue;
					return active_dimensions[dimension].getResource();
				}
			}
		});
		Sm.Entities.Dimension.Wrapper = new DimensionWrapper;
		Sm.loaded.add('Entities_Dimension_Wrapper');
	}, 'Entities_Dimension_Wrapper');
});