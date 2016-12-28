/**
 * Created by Sam Washington on 1/25/16.
 */
require(['require', 'Sm-Core-Meta'], function (require) {
	var CollectionMeta                = Sm.Core.Meta.Proto.extend({
		get_possible_relationship_indices: function (settings) {
			if (!settings) return [];
			settings         = settings || {};
			var OtherMvCombo = settings.OtherMvCombo;
			var type         = (OtherMvCombo ? OtherMvCombo.type : settings.type) || false;
			if (type == "Section") return ['sections'];
			return [];
		}
	});
	Sm.Entities.Collection.Meta       = new CollectionMeta({type: 'Collection'});
	Sm.Entities.Collection.Meta.Proto = CollectionMeta;
	var self_type                     = 'Collection';
	Sm.loaded.add('Entities_' + self_type + '_Meta');
});