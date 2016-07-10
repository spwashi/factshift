/**
 /**
 * Created by Sam Washington on 12/19/15.
 */
require(['require', 'Sm-Core-SmView', 'Sm-Entities-Abstraction-mixins-SidebarModule'], function (require) {
    require('Sm-Core-SmView');
    require('Sm-Entities-Abstraction-mixins-SidebarModule');
    Sm.loaded.when_loaded(['Core', 'Sm_Entities_Abstraction_mixins_SidebarModule'], function () {
        Sm.Entities.Dictionary.View = Sm.Core.SmView.extend({
            type:                          'Dictionary',
            mixins:                        [Sm.Entities.Abstraction.mixins.SidebarModule],
            identifier:                    '.spwashi-dictionary',
            additional_events:             {
                click: function (e) {
                    var target  = e.target;
                    var $target = $(target);
                    var MvCombo = this.MvCombo;

                    if (target.tagName == 'INPUT' && target.type == 'checkbox') {
                        if (!MvCombo.queryStatus('active') && target.checked) {
                            Sm.CONFIG.DEBUG && console.log('activate');
                            MvCombo.activate(this);
                            Sm.CONFIG.DEBUG && console.log(MvCombo.words);
                        } else {
                            MvCombo.deactivate(this);
                        }
                    } else if ($target.hasClass('spwashi-dictionary')) {
                        !this.MvCombo.queryStatus('focused') ? this.MvCombo.focus(this) : this.MvCombo.blur(this);
                        e.stopPropagation();
                    }

                    if (this.queryPermission('edit') && $target.hasClass('edit') && $target.hasClass('button')) {
                        this.prompt_edit();
                    }

                }
            },
            relationship_index_obj:        {
                definitions: 'definitions_container'
            },
            _rendering_callbacks:          {
                definitions_container_element: function () {
                    if (!!this.elements.definitions_container) return this.elements.definitions_container;
                    var matching = this.get_rendered('$Element').find('.definitions-container');
                    var content_element;
                    if (matching[0]) return this.elements.definitions_container = matching[0];
                    else if (content_element = this.get_rendered('description')) {
                        var definitions_container           = document.createElement('div');
                        definitions_container.className     = 'definitions-container';
                        Sm.Core.util.insertAfter(definitions_container, content_element);
                        this.elements.definitions_container = definitions_container;
                        return this.elements.definitions_container;
                    }
                    return false;
                }
            },
            wrap_element_for_relationship: function (View, relationship_index, Relationship_) {
                if (relationship_index == "definitions") {
                    var MvCombo_ = View.MvCombo;
                    var outer    = Sm.Entities.Dictionary.templates._template.definition_relationship_outer;
                    outer        = outer
                        .replace('__MV_R_ID__', MvCombo_.Identity.r_id)
                        .replace('__R_ID__', Relationship_.Identity.r_id)
                        .replace('__CONTENT__', '')
                        .replace('__TITLE__', MvCombo_.Model.get('title') || '_');
                    var $outer   = $(outer);
                    if ($outer[0]) {
                        var $content = $outer.find('.content');
                        if ($content[0]) {
                            $content[0].appendChild(View.get_rendered('Element'));
                            return $outer[0];
                        }
                    }
                }
                return View.get_rendered('Element');
            },
            handle:                        undefined
        });
        Sm.loaded.add('Entities_Dictionary_View');
    }, 'Entities_Dictionary_View');
});