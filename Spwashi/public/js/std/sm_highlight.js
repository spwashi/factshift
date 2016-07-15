/**
 * Created by Sam Washington on 11/12/15.
 */


require(['jquery'], function ($) {
    Sm.Extras.Highlight = {
        highlight:    function (settings, event_settings) {
            settings              = !!settings && typeof  settings === 'object' ? settings : {};
            event_settings        = (!!event_settings && typeof event_settings === 'object') ? event_settings : {};
            var element_to_search = settings.element || document.body;

            //
            if (!Sm.Core.util.isElement(element_to_search)) return;

            var target    = settings.target || false;
            var word      = settings.word;
            var classname = settings.className || '';
            classname += ' sm-highlight';
            var dataset   = settings.dataset || {};
            dataset.word  = dataset.word || word;
            if (!word.trim) Sm.CONFIG.DEBUG && console.log(word);
            word                = word.trim();
            var word_len        = word.length;
            var number_of_nodes = 0;

            var on_init = !!event_settings.on_init && typeof  event_settings.on_init === "function" ? event_settings.on_init : false;

            function flattenChildren(element, array, plain_array, len_array, obj) {
                var c_n = element.childNodes;
                if (!!c_n && c_n.length) {
                    for (var i = 0; i < c_n.length; i++) {
                        var node = c_n[i];
                        //console.log(node);
                        if ($(node).hasClass('sm-highlight')) {
                            if (node.childNodes.length === 1 && !!node.childNodes[0].textContent) {
                                if (node.childNodes[0].textContent.toLowerCase() == word.toLowerCase()) {
                                    continue;
                                }
                            }
                        }
                        flattenChildren(node, array, plain_array, len_array, obj)
                    }
                } else {
                    var text               = element.textContent || element.innerHTML;
                    if (!element.splitText || !text || !text.length) return array;
                    array.push(element);
                    plain_array.push(text);
                    len_array.push(text.length);
                    obj[number_of_nodes++] = {start: [], end: [], node: text};
                }
                return array;
            }

            var node_arr = [], plain_arr = [], length_arr = [], index_object = {};
            flattenChildren(element_to_search, node_arr, plain_arr, length_arr, index_object);


            function getIndicesOf(searchStr, str) {
                var match;
                var searchStrLen = searchStr.length;
                var re           = new RegExp(searchStr + '\\b', 'gi');
                var s_index, e_index;

                var indixes = [], end_indices = [];
                while ((match = re.exec(str)) != null) {
                    s_index = match.index;
                    e_index = s_index + searchStrLen - 1;
                    indixes.push(s_index);
                    end_indices.push(e_index);
                }
                return [indixes, end_indices];
            }

            //function getIndicesOf(searchStr, str, caseSensitive) {
            //    var startIndex     = 0, searchStrLen = searchStr.length;
            //    var index, indices = [], end_indices = [];
            //    if (!caseSensitive) {
            //        str       = str.toLowerCase();
            //        searchStr = searchStr.toLowerCase();
            //    }
            //    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
            //        indices.push(index);
            //        startIndex = index + searchStrLen;
            //        end_indices.push(startIndex - 1);
            //    }
            //    return [indices, end_indices];
            //}

            var join          = plain_arr.join('');
            var g_i           = getIndicesOf(word, join);
            var start_indices = g_i[0], end_indices = g_i[1];
            if (!start_indices && !end_indices) {
                return;
            }
            var find_index_and_node = function (char_array, plaintext_array, return_object, type) {
                var _node_iterator = 0, index_in_node = 0;
                var plain_string   = plaintext_array[0];
                if (!plain_string) {
                    return;
                }
                var plain_string_len = plain_string.length, _absolute_char_position;
                var total_string_len = plain_string_len;
                var reverse_offset_in_node;


                for (var j = 0; j < char_array.length; j++) {
                    _absolute_char_position = char_array[j];
                    reverse_offset_in_node  = total_string_len - _absolute_char_position;
                    while ((_absolute_char_position >= total_string_len) && (plaintext_array[_node_iterator])) {
                        _node_iterator++;
                        plain_string           = plaintext_array[_node_iterator];
                        plain_string_len       = plain_string.length;
                        total_string_len += plain_string_len;
                        reverse_offset_in_node = total_string_len - _absolute_char_position;
                    }
                    index_in_node = plain_string_len - (reverse_offset_in_node);
                    if (index_in_node < 0) {
                        continue;
                    }
                    if (type) {
                        if (index_in_node - word_len < 0)
                            return_object[_node_iterator].end.push(index_in_node);
                    } else {
                        return_object[_node_iterator].start.push(index_in_node);
                    }
                }
            };
            find_index_and_node(start_indices, plain_arr, index_object, 0);
            find_index_and_node(end_indices, plain_arr, index_object, 1);

            for (var iterator = number_of_nodes - 1; !!(iterator + 1); iterator--) {
                var actual_node                 = node_arr[iterator];
                var node_length                 = length_arr[iterator];
                var word_start_character_offset = index_object[iterator].start;
                var word_end_character_offset   = index_object[iterator].end;
                var pos                         = 0;

                var span_node, word_text_node;


                if (!!word_start_character_offset.length) {
                    for (var i = word_start_character_offset.length - 1; !!(i + 1); i--) {
                        pos            = word_start_character_offset[i];
                        var assumed_end;
                        if (pos + word_len > node_length) {
                            assumed_end = node_length;
                        } else {
                            assumed_end = pos + word_len;
                        }
                        actual_node.splitText(assumed_end);
                        word_text_node = actual_node.splitText(pos);
                        actual_node.normalize();
                        if (!target) {
                            span_node = document.createElement('span');
                        } else {
                            span_node = document.createElement('a');
                            span_node.setAttribute('href', target);
                        }
                        span_node.className = classname;
                        var m_o_clone       = word_text_node.cloneNode(true);
                        span_node.appendChild(m_o_clone);
                        dataset.word && (span_node.dataset.word = dataset.word);
                        Sm.CONFIG.DEBUG && console.log(dataset.word);
                        word_text_node.parentNode.replaceChild(span_node, word_text_node);

                        if (on_init)
                            on_init(span_node)
                    }
                }
                //THIS WAS MEANT TO BE A WAY TO OVERLAP TAGS
                /* //THIS PART HAS BEEN REMOVED BECAUSE OF AN ERROR WITH node.normalize(); THAT WAS NOT CONJOINING THE TEXT NODES ... PROBABLY OKAY
                 if (!!word_end_character_offset.length) {
                 for (var j = word_end_character_offset.length - 1; !!(j + 1); j--) {
                 pos                    = word_end_character_offset[j];
                 pos                    = pos > node_length ? node_length - 1 : pos;
                 actual_node.splitText(pos + 1);
                 var word_end_text_node = actual_node.splitText(0);
                 span_node              = document.createElement('span');
                 span_node.className    = classname;
                 var word_end_clone     = word_end_text_node.cloneNode(true);
                 span_node.appendChild(word_end_clone);
                 word_end_text_node.parentNode.replaceChild(span_node, word_end_text_node);
                 }
                 }*/
            }

        },
        un_highlight: function (settings, event_settings) {
            settings              = !!settings && typeof  settings === 'object' ? settings : {};
            event_settings        = (!!event_settings && typeof event_settings === 'object') ? event_settings : {};
            var element_to_remove = settings.element || document.body;

            //
            if (!Sm.Core.util.isElement(element_to_remove)) return;
            var word               = settings.word;
            var dataset            = settings.dataset || {word: [], dictionary_ids: []};
            dataset.word           = dataset.word || [word];
            dataset.dictionary_ids = dataset.dictionary_ids || [];
            word                   = word.trim();

            var $element_to_remove = $(element_to_remove);
            var find               = $element_to_remove.find('.sm-highlight[data-word=' + word + ']');
            for (var i = 0; i < find.length; i++) {
                var instance = find[i];
                $(instance).replaceWith(instance.childNodes);
            }
            return true;
        }
    };
    Sm.loaded.add('Extras_SmHighlight');
});