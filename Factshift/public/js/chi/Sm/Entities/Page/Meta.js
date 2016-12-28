/**
 * Created by Sam Washington on 1/25/16.
 */
require(['require', 'Sm-Core-Meta'], function (require) {
	var PageMeta                = Sm.Core.Meta.Proto.extend({
		get_possible_relationship_indices: function (settings) {
			if (!settings) return [];
			settings          = settings || {};
			var OtherMvCombo  = settings.OtherMvCombo;
			var type          = (OtherMvCombo ? OtherMvCombo.type : settings.type) || false;
			var is_reciprocal = !!settings.is_reciprocal;
			if (is_reciprocal) {return [null, 'pages']}
			if (type == "Page") return ['pages'];
			if (type == "Collection") return ['collections'];
			if (type == "Section") return ['sections'];
			if (type == "Dimension") return ['dimensions'];
			if (type == "Concept") return ['concepts'];

			return [];
		}

	});
	Sm.Entities.Page.Meta       = new PageMeta({type: 'Page'});
	Sm.Entities.Page.Meta.Proto = PageMeta;
	var self_type               = 'Page';
	Sm.loaded.add('Entities_' + self_type + '_Meta');
});