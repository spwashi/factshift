/**
 * Created by Sam Washington on 1/4/16.
 */
require(['require', 'Sm',
    'Sm-Entities-Page-templates-_template',
    'Sm-Entities-Page-templates-standard'
], function (require) {
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
            relationships:                 function (Mv_, synchronous, settings) {
                settings              = settings || {};
                settings.display_type = 'inline';
                return Sm.Entities.Abstraction.Garage.prototype.relationships.apply(this, [
                    Mv_,
                    synchronous,
                    settings
                ]);
            },
            _continue_relationship_render: function (relevant_relationships, inner_string, is_synchronous, settings) {
                settings                        = settings || {};
                /**
                 * The Element that we are going to be returning in the end - relationship index container
                 * @type {*|jQuery|HTMLElement}
                 */
                var $complete_relationship_elem = $(inner_string);
                var _template                   = Sm.Entities[this.type].templates._template;
                /**
                 * An array of Views that have already been appended to the Element (shouldn't happen).
                 * This is meant to let us know which views need to be cloned
                 * @type {Array}
                 */
                var appendedViews               = [];
                /**
                 * Iterate through the relevant relationships (relationship indices that were not empty) and append the Views
                 */
                for (var loop_rel_index in relevant_relationships) {
                    if (!relevant_relationships.hasOwnProperty(loop_rel_index)) continue;
                    /**
                     * Look in .{index}-container for the place to put the relationship. e.g. children-container or definition-container
                     */
                    var holder = $complete_relationship_elem.find('.' + loop_rel_index + '-container');

                    /**
                     * If we found the element
                     */
                    if (holder[0] && loop_rel_index === 'concepts') {
                        var related_views = relevant_relationships[loop_rel_index];
                        /**
                         * Loop through each of the related Views, render them,  and append them to the element properly
                         */
                        for (var k = 0; k < related_views.length; k++) {
                            var DefinitionView    = related_views[k].View;
                            var DefinitionMvCombo = DefinitionView.MvCombo;
                            if (!DefinitionMvCombo) continue;

                            /**
                             * The element of the View that we are adding
                             * @type {Element|HTMLElement|*}
                             * @private
                             */
                            /** @type {Sm.Core.Relationship} */
                            var Relationship_ = related_views[k].Relationship;
                            /**
                             * If the View has already been added used (this is related in more than one way to an entity - bad- ), clone it and move on.
                             */
                            if (appendedViews.indexOf(DefinitionMvCombo.Identity.r_id) > -1) DefinitionView = DefinitionView.clone();

                            /**
                             * If the MvCombo is a section, use our special outside for it.
                             * @type {*|string}
                             */
                            var rel_outer = (settings.relationship_outer
                                    ? _template[settings.relationship_outer]
                                    : (DefinitionMvCombo.type == "Section"
                                    ? _template.definition_relationship_outer
                                    : _template.relationship_outer)) || '';

                            /**
                             * The Outer String wil get its content emptied (that's where we append the relationships)
                             * THe Title is the optional location where the word being defined will be held.
                             * Each relationship has an R_ID which is the R_ID of the Relationship being referenced
                             * @type {string}
                             */
                            var outer_string = rel_outer
                                .replace('__CONTENT__', '')
                                .replace('__TITLE__', '<%- title && title.trim().length ? title : "-" %>')
                                .replace('__R_ID__', Relationship_.Identity.r_id)
                                .replace('__MV_R_ID__', DefinitionMvCombo.Identity.r_id);
                            outer_string     = _.template(outer_string)(DefinitionMvCombo.Model.attributes);
                            /**
                             * The definition element
                             * @type {*|jQuery|HTMLElement}
                             */
                            Sm.CONFIG.DEBUG && console.log(outer_string);
                            var $outer       = $(outer_string);
                            /**
                             * The total content of the definition
                             */
                            var $content     = $outer.find('.content');

                            /**
                             * We must append the children to the "content" element in order to get their events initialized.
                             * I suppose we could initialize them after, but it honestly isn't worth it
                             */
                            var child = false;
                            try {
                                if ($content[0] && child) {
                                    $content[0].appendChild(child);
                                    $outer[0].addEventListener('click', (function (View_) {
                                        return function (e) {View_.MvCombo.focus(View_);};
                                    })(DefinitionView));
                                    holder[0].appendChild($outer[0]);
                                    appendedViews.push(DefinitionMvCombo.Identity.r_id);
                                } else {
                                    Sm.CONFIG.DEBUG && console.log($outer, $content, DefinitionView.cid);
                                }
                            } catch (e) {
                                Sm.CONFIG.DEBUG && console.log(e);
                            }
                        }
                    } else {
                        //If there was a error, log it
                    }
                }
                var url = Sm.urls.api.generate({
                    type:    'Concept',
                    context: {
                        //todo todo todo
                        user_id: 11
                    }
                });

                /**
                 * todo move this somewhere where it makes sense
                 */
                $($complete_relationship_elem.find('#add-concept')).select2({
                    tags:       true,
                    multiple:   true,
                    allowClear: true,
                    ajax:       {
                        url:            url,
                        dataType:       'json',
                        delay:          250,
                        data:           function (params) {
                            return {q: params.term};
                        },
                        processResults: function (data, params) {
                            var result = [];
                            for (var i = 0; i < data.length; i++) {
                                var dp = data[i];
                                if (dp && !!dp.title) {
                                    result.push({
                                        id:   dp.ent_id,
                                        text: dp.title
                                    })
                                }
                            }
                            Sm.CONFIG.DEBUG && console.log(result);
                            return {results: result};
                        }
                    }
                });

                /**
                 * If we are running this function (semi) synchronously, return the element. Otherwise, return a promise
                 */
                var result = $complete_relationship_elem[0];
                return is_synchronous ? result : Promise.resolve(result);
            }
        });
        Sm.Entities.Page.Garage = new GarageClass('Page', 'page_type');
        Sm.loaded.add('Entities_Page_Garage');
    }, 'Entities_Page_Garage');
});