/**
 * Created by Sam Washington on 1/4/17.
 */
require(['require', 'Sm-Abstraction-Relationship-_template'], function (require) {
    Sm.Core.dependencies.on_load(['Abstraction-Relationship-_template'], function () {
        Sm.Abstraction.RelationshipIndex.templates           = Sm.Abstraction.RelationshipIndex.templates || {};
        Sm.Abstraction.RelationshipIndex.templates._template = {
            body_outer: {
                element_attributes: {
                    std: function (RelationshipIndex, display_type) {
                        var relationship_index = RelationshipIndex.get_relationship_index();
                        var string             = this.generate('body_outer.element_attributes.[' + display_type + ']', RelationshipIndex, true);
                        string
                            +=
                            'data-relationship_index="' + relationship_index + '"'
                            +
                            'data-ent_id="' + RelationshipIndex.getResource().getEntId() + '"';

                        return string;
                    }
                },
                class_string:       {
                    std: function (RelationshipIndex, display_type) {
                        var relationship_index = RelationshipIndex.get_relationship_index();
                        var string             = this.generate('body_outer.class_string.[' + display_type + ']', RelationshipIndex, true);
                        string += 'relationship_index relationship-container ' + relationship_index + '-container'
                        return string;
                    }

                }
            },
            body:       {
                std: function (data) {
                    var relationship_index_title = _.titleize(data.get_relationship_index());
                    return '<header class="title" data-attribute="title">' + relationship_index_title + '</header>'
                }
            }
        };
    }, 'Abstraction-RelationshipIndex-_template');
});