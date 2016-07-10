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

        var GarageClass               = Sm.Entities.Abstraction.Garage.extend({
            /**
             * @alias {Sm.Entities.Dictionary.Garage#relationships}
             * @override {Sm.Entities.Abstraction.Garage#relationships}
             * @param Mv_
             * @param synchronous
             * @param settings
             * @return {*}
             */
            relationships:      function (Mv_, synchronous, settings) {
                settings                = settings || {};
                settings.display_type   = 'inline';
                settings.always_display = ['definitions'];
                return Sm.Entities.Abstraction.Garage.prototype.relationships.apply(this, [
                    Mv_,
                    synchronous,
                    settings
                ]);
            },
            definition_tooltip: function (Mv_, synchronous, settings) {
                settings             = settings || {};
                var word             = settings.word || false;
                var title            = settings.title || word;
                var Garage_          = this;
                var config           = {
                    relationship_index_list: ['definitions'],
                    /** @type {Sm.Entities.Abstraction.Garage~on_add} on_append */
                    /**
                     * @type {Sm.Entities.Abstraction.Garage~on_add}
                     * @param {Sm.Core.MvCombo}             MvCombo
                     * @param {Sm.Entities.Section.View}    View
                     * @param {string}                      relationship_index
                     */
                    on_append:               function (MvCombo, View, relationship_index) {
                        Sm.CONFIG.DEBUG && console.log(View.queryPermission('view'));
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
                            var def_rels                    = MvCombo_.define_word(word);
                            config.listed_relationships_obj = {
                                definitions: def_rels
                            };
                            return Garage_.relationships(MvCombo_, false, config).then(append_content);
                        });
                    }, Promise.resolve());
                } else {
                    return this.relationships(Mv_, false, config).then(append_content);
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