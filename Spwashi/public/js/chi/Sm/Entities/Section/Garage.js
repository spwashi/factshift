/**
 * Created by Sam Washington on 1/4/16.
 */
require(['require', 'underscore', 'Sm',
	'Sm-Entities-Section-templates-_template',
	'Sm-Entities-Section-templates-standard',
	'Sm-Entities-Section-templates-definition',
	'Sm-Entities-Section-templates-image'
], function (require) {
	require('Sm');
	require('Sm-Entities-Section-templates-_template');
	require('Sm-Entities-Section-templates-standard');
	require('Sm-Entities-Section-templates-definition');
	require('Sm-Entities-Section-templates-image');

	Sm.loaded.when_loaded([
		'Entities_Abstraction_Garage',
		'Entities_Section_Meta',
		'Entities_Section_templates__template'
	], function () {
		/**
		 * @alias Sm.Entities.Section.Garage
		 * @extends Sm.Entities.Abstraction.Garage
		 */
		var GarageClass            = Sm.Entities.Abstraction.Garage.extend({
			relationship_display_type: {
				universes: 'select',
				concepts:  'tag'
			}
		});
		Sm.Entities.Section.Garage = new GarageClass('Section', 'section_type');
		return "Entities_Section_Garage";
	}, 'Entities_Section_Garage');
});