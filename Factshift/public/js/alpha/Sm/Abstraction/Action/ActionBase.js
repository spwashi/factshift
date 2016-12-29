/**
 * Created by Sam Washington on 12/26/16.
 */
define(['require', 'Sm', 'Sm-Abstraction-Action'], function (require, Sm) {
    Sm.Abstraction.Action.ActionBase = Emitter.extend({
                                                          type:          'Action',
                                                          actions:       null,
                                                          first_target:  null,
                                                          latest_target: null,
                                                          init:          function () {
                                                              this.Identifier = new Sm.Core.Identifier(this, {object_type: 'ActionBase'});
                                                              this.actions    = [];
                                                          },
                                                          pushAction:    function (Action) {
                                                              this.actions.push(Action);
                                                          }
                                                      });
});

