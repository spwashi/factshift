/**
 * Created by Sam Washington on 12/19/15.
 */
require(['require', 'Sm-Entities-Dimension-main', 'Sm-Core-MvWrapper'], function (require) {
    Sm.loaded.when_loaded('Core_MvWrapper', function () {
        var DimensionWrapper          = Sm.Core.MvWrapper.extend({
            type              : 'Dimension',
            parentType        : null,
            populate_container: function (settings) {},
            get_active        : function () {
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