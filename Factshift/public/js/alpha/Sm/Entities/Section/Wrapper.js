/**
 * Created by Sam Washington on 11/14/16.
 */
define(['require', 'Sm', 'Sm-Core-Core'], function (require, Sm) {
    Sm.Core.dependencies.on_load(['Core_Wrapper'], function () {
        /**
         * @class Sm.Entities.Section.Wrapper
         */
        var SectionWrapper          = Sm.Core.Wrapper.extend({
                                                                 /**
                                                                  * @var {Array<Sm.Entities.Section.View>}
                                                                  */
                                                                 _focusedSectionViews: [],
                                                                 /**
                                                                  *
                                                                  * @param {Sm.Entities.Section.View}    SectionView
                                                                  */
                                                                 focusView:            function (SectionView) {
                                                                     var focusedSectionViews = this._focusedSectionViews;
                                                                     var index               = focusedSectionViews.indexOf(SectionView);
                                                                     if (index > -1)return this;
                                                                     for (var i = 0; i < focusedSectionViews.length; i++) {
                                                                         var FocusedSectionView = focusedSectionViews[i];
                                                                         FocusedSectionView.blur();
                                                                     }
                                                                     this._focusedSectionViews.push(SectionView);
                                                                 },
                                                                 blurView:             function (SectionView) {
                                                                     var focusedSectionViews = this._focusedSectionViews;
                                                                     for (var i = 0; i < focusedSectionViews.length; i++) {
                                                                         var FocusedSectionView = focusedSectionViews[i];
                                                                         if (SectionView !== FocusedSectionView) continue;
                                                                         this._focusedSectionViews.splice(i--, 1);
                                                                     }
                                                                     return this;
                                                                 }
                                                             });
        Sm.Entities.Section.Wrapper = new SectionWrapper('Section');
    }, 'Entities-Section-Wrapper');
});