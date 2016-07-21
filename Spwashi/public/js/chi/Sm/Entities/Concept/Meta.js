/**
 * Created by Sam Washington on 1/25/16.
 */
require(['require', 'Sm-Core-Meta'], function (require) {
	var ConceptMeta                = Sm.Core.Meta.Proto.extend({
		get_possible_relationship_indices: function (settings) {
			if (!settings) return [];
			settings          = settings || {};
			var OtherMvCombo  = settings.OtherMvCombo;
			var type          = (OtherMvCombo ? OtherMvCombo.type : settings.type) || false;
			var is_reciprocal = !!settings.is_reciprocal;
			if (is_reciprocal) {return [null, 'concepts']}
			if (type == "Page") return ['pages'];
			if (type == "Collection") return ['collections'];
			if (type == "Section") return ['sections'];
			if (type == "Dimension") return ['dimensions'];
			if (type == "Concept") return ['concepts'];

			return [];
		}
	});
	Sm.Entities.Concept.Meta       = new ConceptMeta({type: 'Concept'});
	Sm.Entities.Concept.Meta.Proto = ConceptMeta;
	var self_type                  = 'Concept';
	Sm.loaded.add('Entities_' + self_type + '_Meta');
});