/**
 * Created by Sam Washington on 1/25/16.
 */
require(['require', 'Sm-Core-Meta'], function (require) {
	var DimensionMeta                = Sm.Core.Meta.Proto.extend({
		get_possible_relationship_indices: function (settings) {
			if (!settings) return [];
			settings          = settings || {};
			var OtherMvCombo  = settings.OtherMvCombo;
			var type          = (OtherMvCombo ? OtherMvCombo.type : settings.type) || false;
			var is_reciprocal = !!settings.is_reciprocal;
			if (is_reciprocal) {return [null, 'dimensions']}
			if (type == "Section") return ['sections'];
			if (type == "Page") return ['pages'];
			return [];
		}
	});
	Sm.Entities.Dimension.Meta       = new DimensionMeta({type: 'Dimension'});
	Sm.Entities.Dimension.Meta.Proto = DimensionMeta;
	var self_type                    = 'Dimension';
	Sm.loaded.add('Entities_' + self_type + '_Meta');
});