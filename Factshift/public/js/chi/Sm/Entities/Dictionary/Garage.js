/**
 * Created by Sam Washington on 1/4/16.
 */
require(['require', 'Sm',
	        'Sm-Entities-Dictionary-templates-_template',
	        'Sm-Entities-Dictionary-templates-standard'
        ], function (require) {
	require('Sm');

	require('Sm-Entities-Dictionary-templates-_template');
	require('Sm-Entities-Dictionary-templates-standard');

	Sm.loaded.when_loaded([
		                      'Entities_Abstraction_Garage',
		                      'Entities_Dictionary_Meta',
		                      'Entities_Dictionary_templates__template'
	                      ], function () {

		var GarageClass = Sm.Entities.Abstraction.Garage.extend(
		{
			_append_relationship: function (parameters) {
				var OtherMvCombo        = parameters.OtherMvCombo;
				var relationship_index  = parameters.relationship_index;
				var relationship_string = parameters.relationship_string;
				Sm.CONFIG.DEBUG && console.log(OtherMvCombo);
				if (relationship_index && relationship_index == 'definitions') {
					var title                      = OtherMvCombo.Model.get('title') || ' - ';
					parameters.relationship_string = relationship_string.replace('__TITLE__', title)
				} else {
				}
				return Sm.Entities.Abstraction.Garage.prototype._append_relationship.apply(this, arguments);
			},
			definition_tooltip:   function (Mv_, synchronous, settings) {
				settings             = settings || {};
				var word             = settings.word || false;
				var title            = settings.title || word;
				var Garage_          = this;
				var parameters       = {
					on_append: function (parameters) {
						var View = parameters.View;
						View.setPermission('focus', false);
						View.mark_added();
					}
				};
				var string           = Sm.Entities.Dictionary.templates._template.tooltip_outer || '';
				string               = string
				.replace('__CONTENT__', '')
				.replace('__TITLE__', '')
				.replace('__SUBTITLE__', '');
				var $tooltip_element = $(string);

				var content_element = $tooltip_element.find('.content');
				content_element     = content_element[0] || false;
				var append_content  = function (content) {
					if (content_element) content_element.appendChild(content);
					return $tooltip_element[0];
				};

				if (Object.prototype.toString.call(Mv_) === '[object Array]') {
					if (!word && Mv_[0] && Mv_[0].Model) word = Mv_[0].Model.get('title');
					var title_element = $tooltip_element.find('.title');
					title_element     = title_element[0] || false;
					if (title_element) title_element.innerHTML = title;

					return Mv_.reduce(function (P, MvCombo_) {
						return P.then(function () {
							return Garage_.generate('relationships', MvCombo_).then(append_content);
						});
					}, Promise.resolve());
				} else {
					return Garage_.generate('relationships', Mv_).then(append_content);
				}
			}
		});
		/**
		 * @alias Sm.Entities.Dictionary.Garage
		 * @extends Sm.Entities.Abstraction.Garage
		 */
		Sm.Entities.Dictionary.Garage = new GarageClass('Dictionary', 'dictionary_type');
		Sm.loaded.add('Entities_Dictionary_Garage');
	}, 'Entities_Dictionary_Garage');
});