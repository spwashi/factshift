/**
 * Created by Sam Washington on 7/24/16.
 */
require(['require'], function (require) {
	Sm.loaded.when_loaded('Core_MvWrapper', function () {
		var ConceptWrapper          = Sm.Core.MvWrapper.extend({
			type:       'Concept',
			parentType: null,
			build_MV:   function (settings) {
				//Always prompt for concepts
				Sm.CONFIG.DEBUG && console.log('prompting');
				settings.prompt = true;
				return Sm.Core.MvWrapper.prototype.build_MV.call(this, settings);
			}
		});
		Sm.Entities.Concept.Wrapper = new ConceptWrapper;
		Sm.loaded.add('Entities_Concept_Wrapper');
	}, 'Entities_Concept_Wrapper');
});