/**
 * Created by Sam Washington on 1/4/16.
 */
require(['require',
	'select2',
	'Sm',
	'Sm-Entities-Page-templates-_template',
	'Sm-Entities-Page-templates-standard'
], function (require, select2) {
	require('Sm');
	require('Sm-Entities-Page-templates-_template');
	require('Sm-Entities-Page-templates-standard');

	Sm.loaded.when_loaded([
		'Entities_Abstraction_Garage',
		'Entities_Page_Meta',
		'Entities_Page_templates__template'
	], function () {
		/**
		 * @alias Sm.Entities.Page.Garage
		 * @extends Sm.Entities.Abstraction.Garage
		 */
		var GarageClass         = Sm.Entities.Abstraction.Garage.extend({
			_populate_relationship_index: function (parameters) {
				return Sm.Entities.Abstraction.Garage.prototype._populate_relationship_index.call(this, parameters);
			},
			_append_relationship:         function (OtherMvCombo, $ris_content, relationship_index, relationship_string, appended_views, display_type) {
				return Sm.Entities.Abstraction.Garage.prototype._append_relationship.apply(this, arguments);
			}
		});
		Sm.Entities.Page.Garage = new GarageClass('Page', 'page_type');
		Sm.loaded.add('Entities_Page_Garage');
	}, 'Entities_Page_Garage');
});