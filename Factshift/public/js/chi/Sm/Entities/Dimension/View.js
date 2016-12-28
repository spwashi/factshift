/**
 * Created by Sam Washington on 12/19/15.
 */
require(['require'], function (require) {
    Sm.loaded.when_loaded('Core_SmView', function () {
        Sm.Entities.Dimension.View = Sm.Core.SmView.extend({
            type:                   'Dimension',
            identifier:             '.spwashi-dimension',
            relationship_index_obj: {
                sections: 'section_holder'
            },
            initialize:             function (settings) {
                this._touch_data               = {
                    start:        {
                        x:    0,
                        y:    0,
                        time: 0
                    },
                    threshold:    150, //required min distance traveled to be considered swipe
                    allowed_time: 200 // maximum time allowed to travel that distance
                };
                var self_view                  = this;
                Sm.Core.SmView.prototype.initialize.apply(this, arguments);
                this.elements                  = Sm.Core.util.merge_objects({
                    title:          null,
                    description:    null,
                    content:        null,
                    section_holder: null
                }, this.elements);
            },
            _rendering_callbacks : {
                title_element:       function () {
                    if (!!this.elements.title) return this.elements.title;
                    var matching_element_list = Sm.Core.util.getChildElementsByClassName(this.el, 'title');
                    if (!matching_element_list.length) return false;
                    return this.elements.title = matching_element_list[0];
                },
                content_element:     function () {
                    if (!!this.elements.content) return this.elements.content;
                    var matching_element_list = Sm.Core.util.getChildElementsByClassName(this.el, 'content');
                    if (!matching_element_list.length) return false;
                    return this.elements.content = matching_element_list[0];
                },
                description_element: function () {
                    if (!!this.elements.description) return this.elements.description;
                    var matching_element_list = Sm.Core.util.getChildElementsByClassName(this.el, 'description');
                    if (!matching_element_list.length) return false;
                    return this.elements.description = matching_element_list[0];
                },
                section_holder_element: function () {
                    if (!!this.elements.section_holder) return this.elements.section_holder;
                    if (!this.MvCombo || !this.MvCombo.Identity.ent_id || !this.MvCombo.Identity.ent_id.length) return false;
                    var matching_element_list = $('.section-container[data-ent_id=' + this.MvCombo.Identity.ent_id + ']');
                    if (!matching_element_list.length) {return false;}
                        return this.elements.section_holder = matching_element_list[0];
                }
            },
            focus:                  function () {
                var add_button_list = document.getElementsByClassName('add-section-button');
                if (add_button_list.length) {
                    add_button_list[0].addEventListener('click', this.add_bound('begin_add_rel', this.prompt_add_relationship.bind(this, {type: 'Section'})));
                }
                return Sm.Core.SmView.prototype.focus.apply(this, arguments);
            }
        });
        Sm.loaded.add('Entities_Dimension_View');
    }, 'Entities_Dimension_View');
});