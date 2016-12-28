/**
 * Created by Sam Washington on 11/6/16.
 */
require([
    'require',
    'Sm-Core-Identifier',
    'Sm-Core-Meta',
    'Sm-Core-Util',
    'Sm-Core-Identifier',
    'Sm-Core-SmEntity',
    'Sm-Core-Wrapper'
], function (require) {
    require(['Sm-Core-Identifier']);
    require(['Sm-Core-Meta']);
    require(['Sm-Core-Util']);
    require(['Sm-Core-SmEntity']);
    require(['Sm-Core-Identifier']);
    require(['Sm-Core-Wrapper']);
    Sm.Core.dependencies
        .on_load([
            'Core_Identifier',
            'Core_Meta',
            'Core_SmEntity',
            'Core_Util',
            'Core_Identifier',
            'Core_Wrapper'], null, 'Sm-Core')
        .catch(function (error) {Sm.CONFIG.DEBUG && console.log('Error: ', error)});
});