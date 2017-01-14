/**
 * Created by Sam Washington on 1/4/17.
 */
require(['require', 'Sm-Abstraction-Relationship-_template'], function (require) {
    Sm.Core.dependencies.on_load(['Abstraction-Relationship-_template'], function () {
        Sm.Abstraction.RelationshipIndex.templates           = Sm.Abstraction.RelationshipIndex.templates || {};
        Sm.Abstraction.RelationshipIndex.templates._template = {
            body_outer:   {
                std: function (RelationshipIndex) {
                    var relationship_index = RelationshipIndex.get_relationship_index();
                    var ent_id             = RelationshipIndex.getResource().getEntId();
                    var template           = [
                        '<div data-ent_id="' + ent_id + '" data-relationship_index="' + relationship_index + '" class="relationship_index ' + relationship_index + '-container entity-container">',
                        '__CONTENT__',
                        '</div>'
                    ];
                    return template.join('');
                }
            },
            relationship: {
                std: function (data) {
                    data                  = data || {};
                    var Relationship      = data.Relationship;
                    var RelationshipIndex = data.RelationshipIndex;
                    var OtherView         = data.OtherView;
                    if (!OtherView) return '<div class="error"></div>';
                    var RelationshipGarage = Sm.Core.Identifier.getRootObjectAttribute(Relationship || 'Relationship', 'Garage');
                    var outer              = RelationshipGarage.generate('body_outer.std', Relationship, {is_synchronous: true});
                    var OtherEl            = OtherView.render({is_synchronous: true, only_unrendered: true});
                    outer                  = outer.replace('__CONTENT__', '');
                    var $outer             = $(outer).eq(0);
                    // Sm.CONFIG.DEBUG && console.log('--', data, outer, $outer[0]);
                    $outer.append(OtherEl);
                    return $outer[0];
                }
            },
            body:         {
                std: function (data) {
                    var relationship_index_title = _.titleize(data.get_relationship_index());
                    return '<header class="title" data-attribute="title">' + relationship_index_title + '</header>'
                }
            }
        };
    }, 'Abstraction-RelationshipIndex-_template');
});