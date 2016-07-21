/**
 * Created by Sam Washington on 12/19/15.
 */
require(['require', 'Sm-Core-MvWrapper'], function (require) {

    Sm.loaded.when_loaded('Core_MvWrapper', function () {
        /**
         * @alias Sm.Entities.Dictionary.Wrapper
         */
        var DictionaryWrapper          = Sm.Core.MvWrapper.extend({
            type:              'Dictionary',
            parentType:        null,
            highlighted_words: {},
            words:             {},
            add_word:          function (word, dictionary) {
                word             = word.toLowerCase().trim();
                this.words[word] = this.words[word] || [];
                var dic_r_id     = dictionary.Identity.r_id;
                if (!this.words[word].length) {
                    this.highlight_word(word, {element: document.getElementById('main')});
                }
                if (this.words[word].indexOf(dic_r_id) < 0) {
                    this.words[word].push(dic_r_id);
                }
            },
            remove_word:       function (word, dictionary) {
                word = word.toLowerCase().trim();
                if (!(word in this.words)) return false;
                var w_in_dic = this.words[word];
                if (!word.length || !dictionary || !dictionary.Identity) {
                    delete  this.words[word];
                    this.unhighlight_word(word, {element: document.getElementById('main')});
                } else {
                    w_in_dic.splice(w_in_dic.indexOf(dictionary.Identity.r_id), 1);
                }
            },
            /**
             * @alias Sm.Entities.Dictionary.Wrapper.init_tooltips
             * @param element
             * @return {boolean}
             */
            init_tooltips:     function (element) {
                var $element     = $(element);
                var Garage       = Sm.Entities.Dictionary.Garage;
                var DicTemplates = Sm.Entities.Dictionary.templates;
                if (!Garage || !DicTemplates) return false;
                $element.find('.sm-highlight').each(function () {
                    var $highlight = $(this);
                    $highlight.tooltipster({
                        content:        'Loading',
                        interactive:    true,
                        animation:      'grow',
                        speed:          0,
                        debug:          false,
                        touchDevices:   false,
                        //temporary
                        trigger:        'click',
                        functionBefore: function ($origin, continueTooltip) {
                            Sm.CONFIG.DEBUG && console.log('attempt');
                            if ($origin.parent().hasClass('tooltipstered')) $origin.parent().tooltipster('hide');
                            var active_dict_rids = Sm.Entities.Dictionary.Wrapper.MvMaps.active_MVs;
                            if (active_dict_rids) {
                                var active_dictionaries = [];
                                for (var dictionary_r_id in active_dict_rids) {
                                    if (!active_dict_rids.hasOwnProperty(dictionary_r_id)) continue;
                                    var Identity = active_dict_rids[dictionary_r_id];
                                    if (Identity)   active_dictionaries.push(Identity.getResource());
                                }
                                if (active_dictionaries.length) {
                                    continueTooltip();
                                    Sm.Entities.Dictionary.Garage.definition_tooltip(active_dictionaries, false, {
                                        word:  $origin.data('word'),
                                        title: $origin.text()
                                    }).then(function (content) {
                                        $origin.tooltipster('content', $(content));
                                    })
                                }
                            }
                        }
                    });
                });
            },
            /**
             * @alias Sm.Entities.Dictionary.Wrapper.unhighlight_word
             * @param word_or_words
             * @param settings
             */
            unhighlight_word:  function (word_or_words, settings) {
                settings = settings || {};
                if (typeof word_or_words === "object" && word_or_words.constructor === Array) {
                    for (var i = 0; i < word_or_words.length; i++) {
                        var word = word_or_words[i];
                        this.unhighlight_word(word)
                    }
                } else {
                    if (!word_or_words || !word_or_words.length)
                        var element                       = settings.element || document.body;
                    Sm.CONFIG.DEBUG && console.log(word_or_words);
                    this.highlighted_words                = this.highlighted_words || {};
                    this.highlighted_words[word_or_words] = false;
                    Sm.Extras.Highlight.un_highlight({
                        word:    word_or_words,
                        element: element
                    });
                }
            },
            /**
             * @alias Sm.Entities.Dictionary.Wrapper.highlight_word
             * @param word_or_words
             * @param settings
             */
            highlight_word:    function (word_or_words, settings) {
                settings = settings || {};
                if (word_or_words === null) word_or_words = Object.keys(this.highlighted_words);
                if (word_or_words.constructor === Array) {
                    for (var i = 0; i < word_or_words.length; i++) {
                        var word = word_or_words[i];
                        this.highlight_word(word, settings)
                    }
                } else {
                    var element                           = settings.element || document.body;
                    this.highlighted_words[word_or_words] = true;
                    Sm.Extras.Highlight.highlight({
                        word:    word_or_words,
                        element: element
                    });
                    this.init_tooltips(element)
                }
            },

            change_word_highlight_status: function (highlight, word, DictionaryMvCombo_) {
                word      = word.trim().toLowerCase();
                highlight = !!highlight;
                if (!word || !DictionaryMvCombo_ || !word.trim().length) return false;
                var dic_r_id           = DictionaryMvCombo_.Identity.r_id;
                var word_in_dictionary = this.highlighted_words[word] = this.highlighted_words[word] || [];
                if (!highlight) {
                    var pos;
                    if (word_in_dictionary && (pos = word_in_dictionary.indexOf(dic_r_id)) > -1) {
                        word_in_dictionary.splice(pos, 1);
                        return true;
                    }
                    return false;
                } else {
                    if (word_in_dictionary.indexOf(dic_r_id) < 0) {
                        word_in_dictionary.push(dic_r_id);
                    }
                    return true;
                }

            }
        });
        Sm.Entities.Dictionary.Wrapper = new DictionaryWrapper;
        Sm.loaded.add('Entities_Dictionary_Wrapper');
    }, 'Entities_Dictionary_Wrapper');
});