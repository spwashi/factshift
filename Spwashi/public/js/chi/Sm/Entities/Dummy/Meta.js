/**
 * Created by Sam Washington on 1/25/16.
 */
require(['require', 'Sm-Core-Meta'], function (require) {
    var DummyMeta                           = Sm.Core.Meta.Proto.extend({
        relationship_type_obj: {

            /**
             * @type {relationship_type_info_obj}
             */
            sections: {
                model_type:          'Section',
                index:           'section',
                id:              null,
                primary_key:     'dummy_id',
                secondary_key:   'section_id',
                is_reciprocal:   false,
                linked_entities: ['Dummy', 'Section']
            },

            /**
             * @type {relationship_type_info_obj}
             */
            dummys: {
                model_type:          'Section',
                index:           'section',
                id:              null,
                primary_key:     'section_id',
                secondary_key:   'dummy_id',
                is_reciprocal:   true,
                linked_entities: ['Dummy', 'Section']
            }
        }
    });
    Sm.Entities.Dummy.Meta                  = new DummyMeta({type: 'Dummy'});
    Sm.Entities.Dummy.Meta.Proto = DummyMeta;
});