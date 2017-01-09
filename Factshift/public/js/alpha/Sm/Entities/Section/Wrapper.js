/**
 * Created by Sam Washington on 11/14/16.
 */
define(['require', 'Sm', 'Sm-Core-Core'], function (require, Sm) {
    Sm.Core.dependencies.on_load(['Core_Wrapper'], function () {
        /**
         * @class Sm.Entities.Section.Wrapper
         */
        var SectionWrapper          = Sm.Core.Wrapper.extend({

                                                             });
        Sm.Entities.Section.Wrapper = new SectionWrapper('Section');
    }, 'Entities-Section-Wrapper');
});