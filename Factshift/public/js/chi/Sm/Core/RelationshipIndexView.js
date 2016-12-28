/**
 * Created by Sam Washington on 9/17/16.
 */
require(['require'], function (require) {
	Sm.loaded.when_loaded('Core_SmView', function () {
		Sm.Core.RelationshipIndex.View = Sm.Core.Abstraction.View.extend(
		{
			initialize:                        function () {
				var r             = Sm.Core.Abstraction.View.prototype.initialize.apply(this, arguments)
				this.display_type = '.relationship';
				return r;
			},
			/**
			 * Render the Element
			 * @param settings
			 * @param settings.if_not_rendered      Should we only do this if the Element has not already been rendered?
			 * @param settings.display_type         How are we displaying the View? full
			 * @param settings.synchronous          Return a promise (true) or a rendered element (false)
			 * @param settings.context_id           Context of the relationship index;
			 * @param settings.template_type        Context of the relationship index;
			 * @return {Promise|HTMLElement|*}
			 */
			render:                            function (settings) {
				settings       = settings || {};
				var context_id = settings.context_id || 0;
				if (!this.ReferencedObject || (this.queryStatus('destroyed'))) {
					Sm.CONFIG.DEBUG && console.log(this, ' Does not have an ReferencedObject unless ', this.queryStatus('destroyed'));
					return synchronous ? false : Promise.reject("There is no longer an existent ReferencedObject for this View");
				}

				var synchronous        = !!settings.synchronous;
				this.display_type      = settings.display_type || this.display_type || '.relationship';
				var type               = this.display_type;
				/**
				 *
				 * @type {Sm.Core.RelationshipIndex}
				 */
				var RelationshipIndex  = this.ReferencedObject;
				var EntityType         = RelationshipIndex.MvCombo.type;
				var Entity             = Sm.Entities[EntityType];
				var MvCombo            = RelationshipIndex.MvCombo;
				var relationship_index = MvCombo.get_relationship_index(RelationshipIndex.Identity);
				if (!relationship_index) Sm.CONFIG.DEBUG && console.log(this);
				var Meta = Entity.Meta;
				var t    = Entity.templates;


				var templates = [t[settings.template_type || ''] || t.standard, t._template];

				var __ris_t_nom               = type.replace(/(relationship)/, '$1[relationship_index](' + relationship_index + ')');
				var def_map_attrs             = (Meta.get_defaults(Meta.get_map_between(RelationshipIndex.linked_entities)) || {});
				var relationship_index_string = Entity.Garage.generate_one(templates, __ris_t_nom, {
					synchronous: true, config: {
						list:         'position' in def_map_attrs,
						has_subtypes: 'relationship_subtype' in def_map_attrs
					}
				});
				//Replace the generic "__TITLE__" string with the display name of the relationship
				//todo pretty name
				relationship_index_string = relationship_index_string.replace('__TITLE__', relationship_index);
				var relationship_object   = RelationshipIndex.get_listed_items(context_id);


				relationship_index_string =
				relationship_index_string
				.replace('__TYPE__', relationship_index)
				.replace('__R_ID__', RelationshipIndex.Identity.r_id)
				.replace('__MV_R_ID__', MvCombo.r_id)
				.replace('__CONTENT__', '');
				var appended_views        = {};

				var $relationship_index_string = this._populate_relationship_index({
					                                                                   $relationship_index_string: $(relationship_index_string),
					                                                                   relationship_index:         relationship_index,
					                                                                   RelationshipIndex:          RelationshipIndex,
					                                                                   relationship_object:        relationship_object,
					                                                                   type:                       type,
					                                                                   display_type:               'full',
					                                                                   appended_views:             appended_views,
					                                                                   templates:                  templates,
					                                                                   MvCombo:                    MvCombo,
					                                                                   has_subtypes:               'relationship_subtype' in def_map_attrs
				                                                                   });


				if ((this.queryStatus('rendered') && !!settings.if_not_rendered) || this.queryStatus('rendering')) {
					Sm.CONFIG.DEBUG && console.log('ignore');
					return synchronous ? this.el : Promise.resolve(this.el);
				}
				this.setStatus('rendering', true);
				var ReferencedObject_ = this.ReferencedObject;
				/**@type {Sm.Core.RelationshipIndex.View}*/
				var self              = this;

				var post_render_func = function (result) {
					if (!result) return false;
					var el_1    = result && result[0] && typeof result !== "string" ? result : $(result);
					self.old_el = self.el;
					self.setElement(el_1, 'render');
					self.setStatus({
						               rendered:   true,
						               rendering:  false,
						               up_to_date: true
					               });
					self.init_elements();
					self.delegateEvents(self.events());
					self.init_button_control_events();
					ReferencedObject_.addView(this);
					return el_1[0];
				};


				this.setStatus('modal', (this.display_type.indexOf("modal") >= 0));
				return post_render_func($relationship_index_string);
			},
			/**
			 *
			 * @param parameters
			 * @param parameters.$relationship_index_string
			 * @param parameters.relationship_index
			 * @param parameters.RelationshipIndex
			 * @param parameters.relationship_object
			 * @param parameters.type
			 * @param parameters.display_type
			 * @param parameters.templates
			 * @param parameters.MvCombo
			 * @param parameters.list
			 * @param parameters.appended_views
			 * @param parameters.has_subtypes
			 * @return {*}
			 * @protected
			 */
			_populate_relationship_index:      function (parameters) {
				var RelationshipIndex          = this.ReferencedObject;
				var EntityType                 = RelationshipIndex.MvCombo.type;
				var Entity                     = Sm.Entities[EntityType];
				var Garage                     = Entity.Garage;
				var $relationship_index_string = parameters.$relationship_index_string;
				if (!$relationship_index_string) Sm.CONFIG.DEBUG && console.log('no string', parameters);
				var relationship_index  = parameters.relationship_index;
				var relationship_object = parameters.relationship_object;
				var type                = parameters.type || '.relationships';
				var display_type        = parameters.display_type || 'preview';
				var templates           = parameters.templates;
				var appended_views      = parameters.appended_views;
				var MvCombo             = parameters.MvCombo;
				var Meta                = Sm.Core.Meta.get_entity(MvCombo.type).Meta;
				var has_subtypes        = parameters.has_subtypes;
				var def_map_attrs       = (Meta.get_defaults(Meta.get_map_between(RelationshipIndex.linked_entities)) || {});

				if (relationship_index == 'concepts') return this._populate_relationship_index_tags(parameters);

				var relationship_subindices = false;
				if (has_subtypes && RelationshipIndex.get_listed_subtype_items) {
					//context_id
					relationship_subindices = RelationshipIndex.get_listed_subtype_items(0);
				}

				var related_items = relationship_object.items || [];
				if (!related_items.length) {
					Sm.CONFIG.DEBUG && console.log('no related items');
					return false;
				}

				var relationship_template_name = type.replace(/(relationship)/, '$1[relationship](' + relationship_index + ')');
				var relationship_holder        = $relationship_index_string.children('.content').eq(0) || false;

				var append_fn = function (container, Relationship, OtherMvCombo) {
					var relationship_string = Garage.generate_one(templates, relationship_template_name, {synchronous: true});
					relationship_string     =
					relationship_string
					.replace('__R_ID__', Relationship.Identity.r_id)
					.replace('__MV_R_ID__', MvCombo ? MvCombo.r_id : 'null')
					.replace('__CONTENT__', '');
					Garage._append_relationship({
						                            OtherMvCombo:        OtherMvCombo,
						                            relationship_holder: container,
						                            relationship_index:  relationship_index,
						                            relationship_string: relationship_string,
						                            appended_views:      appended_views,
						                            display_type:        display_type,
						                            properties:          {}
					                            });
				};

				var relationships;
				var OtherMvCombo, Relationship;
				if (!relationship_subindices) {
					relationships = relationship_object.relationships || [];
					var _count    = relationship_object.count || 0;
					for (var k = 0; k < _count; k++) {
						if (!relationship_holder) Sm.CONFIG.DEBUG && console.log('abs_garage,_rel,-1', $relationship_index_string);
						if (!relationship_holder) return false;
						OtherMvCombo = related_items[k];
						Relationship = relationships[k];
						append_fn(relationship_holder, Relationship, OtherMvCombo);
					}
				} else {
					for (var subindex in relationship_subindices) {
						Sm.CONFIG.DEBUG && console.log(relationship_subindices);
						if (!relationship_subindices.hasOwnProperty(subindex) || !relationship_subindices[subindex]) continue;
						var subtype_name                 = Meta.get_relationship_type({sub: true, type: 'name'}, subindex);
						var __ris_subtype_t_nom          = type.replace(/(relationship)/, '$1[relationship_subindex](' + subindex + ')');
//						Sm.CONFIG.DEBUG && console.log(subtype_name, subindex, __ris_subtype_t_nom);
						var relationship_subindex_string = Garage.generate_one(templates, __ris_subtype_t_nom, {
							synchronous: true, config: {
								list:         'position' in def_map_attrs,
								has_subtypes: 'relationship_subtype' in def_map_attrs
							}
						});
						//Replace the generic "__TITLE__" string with the display name of the relationship
						relationship_subindex_string     = relationship_subindex_string.replace('__TITLE__', subtype_name).replace('__CONTENT__', '').replace('__TYPE__', subindex);
//						Sm.CONFIG.DEBUG && console.log(relationship_subindex_string);
						var $rel_subindex                = $(relationship_subindex_string);
//						Sm.CONFIG.DEBUG && console.log($rel_subindex);
//						Sm.CONFIG.DEBUG && console.log(relationship_holder);
						relationship_holder.append($rel_subindex);
						var items     = relationship_subindices[subindex].items;
						relationships = relationship_subindices[subindex].relationships;
						for (var j = 0; j < items.length; j++) {
							append_fn($rel_subindex, relationships[j], items[j]);
						}
					}
				}
				return $relationship_index_string;
			},
			_populate_relationship_index_tags: function (parameters) {
				var relationship_index  = parameters.relationship_index;
				var $content            = parameters.$relationship_index_string.children('.' + relationship_index + '-relationships').eq(0);
				var relationship_object = parameters.relationship_object;
				var items               = relationship_object.items;
				var relationships       = relationship_object.relationships;
				var data                = [];
				var User                = Sm.Entities.User.Wrapper.get_active();
				var url                 = Sm.urls.api.generate({MvCombo: User || parameters.MvCombo || false, fetch: relationship_index});
				var active              = [];
				for (var i = 0; i < items.length; i++) {
					var OtherMvCombo = items[i];
					var Relationship = relationships[i];
					var r_id         = OtherMvCombo.r_id;
					var d            = {};
					d.text           = OtherMvCombo.Model.get('title');
					d.id             = r_id;
					d.Relationship   = Relationship;
					data.push(d);
					active.push(r_id);
				}
				$content.select2(
				{
					tags:            true,
					tokenSeparators: [','],
					cache:           true,
					data:            data,
					ajax:            {
						url:            url,
						dataType:       'json',
						delay:          250,
						cache:          true,
						multiple:       true,
						data:           function (params) {
							return {
								return_by: 'array',
								q:         params.term, // search term
								page:      params.page
							};
						},
						processResults: function (data, params) {
							// parse the results into the format expected by Select2
							// since we are using custom formatting functions we do not need to
							// alter the remote JSON data, except to indicate that infinite
							// scrolling can be used
							//todo look into pagination
							var items = data && data.data && data.data.items ? data.data.items : [];
							return {
								results:    (items && items[0] ? items : []).map(function (item) {
									if (item && item.title) {
										var type = item._model_type;
										if (!type || !Sm.Entities[type]) return false;
										return {
											id:      item.ent_id,
											text:    item.title,
											MvCombo: Sm.Entities[type].Wrapper.init_MvCombo({model: item})
										}
									}
									return false;
								}),
								pagination: {
									more: (params.page * 30) < 100
								}
							};
						}
					},
					escapeMarkup:    function (markup) {
						return markup;
					}, // let our custom formatter work
					width:           '300px'
				});
				$content.on('click-tag', function (evt, props) {
					props    = props || {};
					var data = props.data || {};
					Sm.CONFIG.DEBUG && console.log(evt, props);
				});
				$content.val(active).trigger('change');
				return parameters.$relationship_index_string;
			}
		});
		Sm.loaded.add('Core_RelationshipIndexView');
	});
});