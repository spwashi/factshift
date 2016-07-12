/**
 * Created by Sam Washington on 12/19/15.
 */

/**
 * @module Sm/Entities/Dictionary/MvCombo
 * @exports DictionaryMvCombo
 * @class DictionaryMvCombo
 * @requires MvWrapper
 * @requires RelationshipIndex
 * @requires Sm-Core-MvCombo
 */
require(['require', 'Sm', 'Sm-Entities-Dictionary-Model', 'Sm-Core-MvCombo'], function (require) {
    Sm.loaded.when_loaded('Core_MvCombo', function () {
        /**
         * An MvCombo that represents a Dictionary on the server
         * @alias   Sm.Entities.Dictionary.MvCombo
         * @extends {Sm.Core.MvCombo}
         * @see     Sm.Core.MvCombo
         * @class   Sm.Entities.Dictionary.MvCombo
         */
        Sm.Entities.Dictionary.MvCombo = Sm.Core.MvCombo.extend({
            words:           {},
            check_words:     function (words, r_id) {
                if (!words) words = '';
                words                   = typeof words === "object" && words.constructor === Array ? words.slice(0) : words.split(',');
                var since_deleted_words = [];


                var non_existent_words = [];
                for (var i = 0; i < words.length; i++) {
                    var w = words[i] = words[i].toLowerCase().trim();
                    if (!w.length) continue;
                    if (this.words[w]) {
                        if (r_id && this.words[w].indexOf(r_id) === -1)
                            non_existent_words.push(w);
                    } else {
                        non_existent_words.push(w);
                    }
                }


                if (r_id) {
                    if (this.definition_word_map[r_id]) {
                        for (var k = 0; k < this.definition_word_map[r_id].length; k++) {
                            var word = this.definition_word_map[r_id][k];
                            if (words.indexOf(word) < 0) {
                                since_deleted_words.push(word);
                            }
                        }
                    } else {this.definition_word_map[r_id] = []}
                }


                return {
                    nonexistent_words:   non_existent_words,
                    since_deleted_words: since_deleted_words
                };
            },
            /**
             *
             * @param {Sm.Entities.Section.MvCombo}Definition
             */
            add_definition:  function (Definition) {
                var DefinitionModel = Definition.Model;
                var words           = DefinitionModel.get_words();
                var checked_words   = this.check_words(words, Definition.Identity.r_id);
                var new_ones        = checked_words.nonexistent_words;
                var old_ones        = checked_words.since_deleted_words;
                //Sm.CONFIG.DEBUG && console.log(new_ones, old_ones);
                for (var i = 0; i < new_ones.length; i++) {
                    var word = new_ones[i];
                    Sm.CONFIG.DEBUG && console.log(word);
                    this.add_word(word, Definition);
                }
                for (var j = 0; j < old_ones.length; j++) {
                    var old_word = old_ones[j];
                    this.remove_word(old_word, Definition);
                }
            },
            add_word:        function (word, definition) {
                if (!word.length) return;
                word = word.toLowerCase().trim();
                if (!word.length) return;
                this.words[word] = this.words[word] || [];

                var def_r_id = definition.Identity.r_id;
                if (this.words[word].indexOf(def_r_id) < 0) {
                    this.words[word].push(def_r_id);

                    var arr = this.definition_word_map[def_r_id] = this.definition_word_map[def_r_id] || [];
                    if (arr.indexOf(word) < 0) {
                        arr.push(word);
                    }
                }
                Sm.Entities.Dictionary.Wrapper.add_word(word, this);
            },
            remove_word:     function (word, definition) {
                if (!word || typeof  word !== "string" || !word.length) return false;
                word = word.toLowerCase().trim();
                if (!word.length) return false;
                if (!(word in this.words)) return false;
                var w_in_dic = this.words[word];
                if (!w_in_dic.length || !definition || !definition.Identity) {
                    delete  this.words[word];
                    Sm.Entities.Dictionary.Wrapper.remove_word(word, this)

                } else {
                    if (w_in_dic.indexOf(definition.Identity.r_id) > -1)
                        w_in_dic.splice(w_in_dic.indexOf(definition.Identity.r_id), 1);
                }
            },
            init:            function () {
                Sm.Core.MvCombo.prototype.init.apply(this, arguments);
                this.words               = {};
                this.definition_word_map = {};
                this.on('add_relationship', function (rel_details) {
                    rel_details           = rel_details || {};
                    var SelfMvCombo       = rel_details.SelfMvCombo;
                    var OtherMvCombo      = rel_details.OtherMvCombo;
                    var Relationship      = rel_details.Relationship;
                    var RelationshipIndex = rel_details.RelationshipIndex;
                    var OtherView         = rel_details.OtherView;
                    var map_indices       = rel_details.map_indices;
                    if (OtherMvCombo.type == 'Section' && OtherMvCombo.Model) {
                        Sm.CONFIG.DEBUG && console.log(OtherMvCombo, ' -- add to dictionary');
                        var words = OtherMvCombo.Model.get('words') || '';
                        Sm.CONFIG.DEBUG && console.log(words);
                        if (words.length) {
                            var _words = words.split(',');
                            for (var i = 0; i < _words.length; i++) {
                                var w = _words[i];
                                SelfMvCombo.add_word(w, OtherMvCombo);
                            }
                        }
                    }
                });
            },
            _build_other_MV: function (otherWrapper, settings) {
                settings.model_properties = settings.model_properties || {};
                if (otherWrapper.type == "Section") {
                    settings.model_properties.section_type = Sm.Entities.Section.Meta.types.definition;
                    settings.prompt                        = true;
                }
                return otherWrapper.build_MV(settings);
            },
            /**
             * todo work on multiple different definitions
             * @param word
             * @param case_sensitive
             * @return {{relationships: [], items: []}}
             */
            define_word:     function (word, case_sensitive) {
                case_sensitive    = !!case_sensitive;
                word              = (!case_sensitive ? word.toLowerCase() : word).trim();
                var word_in_dic   = this.words[word];
                var relationships = [];
                var items         = [];
                if (word_in_dic) {
                    for (var w = 0; w < word_in_dic.length; w++) {
                        var def_MvCombo = word_in_dic[w];
                        var definition  = Sm.Core.Identifier.retrieve(def_MvCombo).getResource();
                        var rel         = this.getRelationship(def_MvCombo);
                        if (!rel || !definition) continue;
                        relationships.push(rel);
                        items.push(definition);
                    }
                }
                return {
                    items:         items,
                    relationships: relationships
                }
            }
        });
        Sm.loaded.add('Entities_Dictionary_MvCombo');
    }, 'Entities_Dictionary_MvCombo');
});