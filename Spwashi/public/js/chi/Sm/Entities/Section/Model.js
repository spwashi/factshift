/**
 * Created by Sam Washington on 12/20/15.
 */
require(['require', 'Sm-Core-SmModel'], function (require) {
	require('Sm-Core-SmModel');
	/**
	 * An Model that represents a Section on the server
	 * @alias   Sm.Entities.Section.Model
	 * @extends {Sm.Core.SmModel}
	 * @see     Sm.Core.SmModel
	 * @class   Sm.Entities.Section.Model
	 */
	var SectionModel                         = Sm.Core.SmModel.extend({
		                                                                  defaults:   Sm.Core.Meta.get_defaults('Section'),
		                                                                  set:        function (attributes, options) {
			                                                                  Sm.Core.SmModel.prototype.set.call(this, attributes, options);
			                                                                  this.init_words();

			                                                                  if (!(typeof attributes === "string" && attributes == 'words') && !( typeof attributes === "object" && attributes.words)) return;
			                                                                  if (this.get('section_type') == Sm.Entities.Section.Meta.types.definition && this.MvCombo) {
				                                                                  /** @type {Sm.Core.RelationshipIndex} The relationshipIndex that we are going to be dealing with */
				                                                                  var dictionary_relationship_index = this.MvCombo.getRelationshipIndex('dictionaries');
				                                                                  if (!dictionary_relationship_index) return;
				                                                                  var relationships    = dictionary_relationship_index.get_listed_items();
				                                                                  var dictionary_array = relationships.items;
				                                                                  if (relationships.count) {
					                                                                  for (var i = 0; i < dictionary_array.length; i++) {
						                                                                  /** @type {Sm.Entities.Dictionary.MvCombo} The Dictionary we are going to try to add words to */
						                                                                  var DictionaryMvCombo = dictionary_array[i];
						                                                                  if (!DictionaryMvCombo || !DictionaryMvCombo.add_definition) continue;
						                                                                  DictionaryMvCombo.add_definition(this.MvCombo);
					                                                                  }
				                                                                  }
			                                                                  }

		                                                                  },
		                                                                  init_words: function () {
			                                                                  var words        = [];
			                                                                  var section_type = this.get('section_type');
			                                                                  if (section_type == Sm.Entities.Section.Meta.types.definition) {
				                                                                  words = this.get('words') || '';
				                                                                  if (typeof  words === "string" && words.trim().length) {
					                                                                  words = words.split(',');
				                                                                  } else if (words.constructor !== Array) {
					                                                                  words = [];
				                                                                  }
				                                                                  for (var i = 0; i < words.length; i++) {
					                                                                  var w    = words[i];
					                                                                  words[i] = w.trim();
				                                                                  }
				                                                                  this._words = words;
			                                                                  }
			                                                                  return words;
		                                                                  },
		                                                                  get_words:  function () {
			                                                                  this.init_words();
			                                                                  return this._words || [];
		                                                                  },
		                                                                  initialize: function () {
			                                                                  this._words = [];
			                                                                  Sm.Core.SmModel.prototype.initialize.apply(this, arguments);
		                                                                  }
	                                                                  });
	Sm.Entities.Section.Model                = SectionModel;
	Sm.Entities.Section.Model.prototype.type = 'Section';
	Sm.loaded.add('Entities_Section_Model');
	return SectionModel;
});