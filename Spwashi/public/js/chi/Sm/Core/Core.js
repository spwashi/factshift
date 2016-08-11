/**
 * Created by Sam Washington on 12/28/15.
 */
/**
 * @alias Sm.Core
 * @type {{}}
 */
Sm.Core = {};
require([
	        'require',
	        'Sm-Core-RelationshipIndex',
	        'Sm-Core-Relationship',
	        'Sm-Core-MvWrapper',
	        'Sm-Core-MvCombo',
	        'Sm-Core-Identifier',
	        'Sm-Core-SmModel',
	        'Sm-Core-SmView',
	        'Sm-Core-Meta'
        ], function (require) {

	/**
	 * The Core structure of the Sm Namespace
	 * @type {{}}
	 */
	require(['Sm-Core-RelationshipIndex'], function () {});
	require(['Sm-Core-Relationship'], function () {});
	require(['Sm-Core-MvWrapper'], function () {});
	require(['Sm-Core-MvCombo'], function () {});
	require(['Sm-Core-Identifier'], function () {});
	require(['Sm-Core-SmModel'], function () {});
	require(['Sm-Core-SmView'], function () {});
	require(['Sm-Core-Meta'], function () {});
	Sm.loaded.when_loaded([
		                      'Core_Identifier',
		                      'Core_Meta',
		                      'Core_MvCombo',
		                      'Core_MvWrapper',
		                      'Core_Relationship',
		                      'Core_RelationshipIndex',
		                      'Core_SmModel',
		                      'Core_SmView'
	                      ], function () {}, 'Core').then().catch(function (error) {
		Sm.CONFIG.DEBUG && console.log("ERROR:", error);
	});
});