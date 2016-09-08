/**
 * Created by Sam Washington on 7/8/16.
 */
require(['require', 'Class', 'Sm', 'Sm/Extras/Modal'], function (require, Class) {
	Sm.loaded.when_loaded(['Extras_Modal'], function () {
		Sm.Entities.Abstraction.Modal = Sm.Entities.Abstraction.Modal || {};
		/**
		 * @alias Sm.Entities.Abstraction.Modal.AddRelationship
		 * @prop {Array} Sm.Entities.Abstraction.Modal.AddRelationship.EntityArr {@see Sm.Entities.Abstraction.Modal.AddRelationship.EntityArr}
		 */
		Sm.Entities.Abstraction.Modal.AddRelationship = Sm.Extras.Modal.extend(
		{
			init:               function (settings) {
				settings      = settings || {};
				settings.data =
				this.display_type = (settings.display_type || 'full') + '.modal[add_relationship]';
				settings.events_to_trigger = ['open', 'close', 'choose', 'select'];
				return Sm.Extras.Modal.prototype.init.apply(this, arguments);
			},
			////////////////////////////////////////////////////////////////////////
			generate_element:   function (config) {
				if (this.EntityArr.length > 0 && this.EntityArr.length <= 2) {
					config                   = config || {};
					var MvCombo_             = this.EntityArr[0];
					var self_type            = this.self_type;
					var Meta                 = Sm.Entities[self_type].Meta;
					var relationship_indices = Meta.get_named_relationship_indices({
						                                                               relationship_indices: this.EntityArr[1] ? Meta.get_possible_relationship_indices(this.EntityArr[1] || false) : false
					                                                               });
					Sm.CONFIG.DEBUG && console.log('ar_gen_el, -1',relationship_indices);
					var data                 = Sm.Core.util.merge_objects(MvCombo_.Model.attributes, {relationship_indices: relationship_indices});
					try {
						return Sm.Entities[self_type].Garage.generate(this.display_type, data, {config: config}).catch(function (e) {
							Sm.CONFIG.DEBUG && console.log('ar_gen_el,0', e);
						});
					} catch (e) {
						Sm.CONFIG.DEBUG && console.log('ar_gen_el,1', e);
						throw  e;
					}
				}
				return Promise.reject("Could not figure out how to generate this element");
			},
			////////////////////////////////////////////////////////////////////////
			on_open:            function () {
				var content_element = this.content_element;
				var self            = this;
				this.EntityArr.forEach(function (current_element, index) {self.ViewArr.push(current_element.addView(content_element, false, {display_type: self.display_type}));});
			},
			on_select:          function (value, dataset, e) {
				var select  = e.target;
				var $select = $(select);
				if (!$select.hasClass('relationship_index')) return Promise.resolve();
				var $element           = this.get_content_element(true);
				var relationship_index = value;
				var what_to_generate   = this.display_type.replace(/(add_relationship)/ig, "$1_type") + "(" + relationship_index + ")";

				/** @type {Sm.Core.MvCombo}  */
				var MvCombo           = this.EntityArr[0];
				var RelationshipIndex = MvCombo.getRelationshipIndex(relationship_index);
				var listed_items      = {items: [], relationships: []};
				if (RelationshipIndex) listed_items = RelationshipIndex.get_listed_items();
				var relationship_subindices = Sm.Core.Meta.get_named_relationship_indices({sub: true});
				return Sm.Entities[this.self_type].Garage.generate(what_to_generate, {
					items:                   listed_items.items,
					position:                listed_items.count || 0,
					relationship_subindices: relationship_subindices
				}).then(function (res) {
					var $res      = $(res);
					var $continue = $('#modal-continue-2');
					if ($continue[0]) {
						$continue.replaceWith($res);
					} else {
						$res.insertAfter($select.parent());
					}
				}).catch(function (b) {
					Sm.CONFIG.DEBUG && console.log('AddRelationship,os,1', b);
					throw b;
				});
			},
			get_info_from_form: function (qs) {
				return Sm.Extras.Modal.prototype.get_info_from_form.call(this, '.relationship-attribute')
			},
			on_choose:          function (data) {
				var $element = $(this.element);
				this.get_info_from_form();
				Sm.CONFIG.DEBUG && console.log(this.changed_attributes);
				this.promise_object.resolve(this.changed_attributes);
				this.changed_attributes = {};
			},
			on_close:           function () {
				var ViewArr = this.ViewArr;
				for (var i = 0; i < ViewArr.length; i++) {
					var View_ = ViewArr[i];
					View_ && View_.destroy();
				}
			}
		});
	}, 'Entities_Abstraction_Modal_AddRelationship');
});
