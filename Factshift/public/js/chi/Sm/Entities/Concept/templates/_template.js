/**
 * Created by Sam Washington on 1/5/16.
 */
/**
 * Created by Sam Washington on 1/4/16.
 */
require(['require'], function (require) {
	Sm.Entities.Concept.templates._template = {
		body_outer:  '<div class="spwashi-concept preview" data-ent_id="<%- ent_id %>" data-id="<%- id %>" data-title=\'<%- title %>\'>\n    __BUTTON_CONTROL__\n    __CONTENT__\n</div>',
	};
	Sm.loaded.add('Entities_Concept_templates__template');
});