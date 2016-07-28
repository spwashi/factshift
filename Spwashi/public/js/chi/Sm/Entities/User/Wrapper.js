/**
 * Created by Sam Washington on 7/26/16.
 */
/**
 * Created by Sam Washington on 12/19/15.
 */
require(['require', 'Sm-Core-MvWrapper'], function (require) {

	Sm.loaded.when_loaded('Core_MvWrapper', function () {
		/**
		 * @alias Sm.Entities.User.Wrapper
		 */
		var UserWrapper          = Sm.Core.MvWrapper.extend({
			type:              'User',
			parentType:        null,
			highlighted_words: {},
			words:             {},
			hydrate:           function (settings) {
				var res        = Sm.Core.MvWrapper.prototype.hydrate.apply(this, arguments);
				settings       = settings || {};
				var users      = settings.elements || [];
				var user_id_el = document.getElementById('usr_id');
				if (user_id_el) {
					var search   = 'User|' + user_id_el.value;
					/** @type {Sm.Core.MvCombo|boolean|*}  */
					var Identity = Sm.Core.Identifier.identify(search);
					if (Identity && Identity.activate) Identity.activate();
				}
				return res;
			}
		});
		Sm.Entities.User.Wrapper = new UserWrapper;
		Sm.loaded.add('Entities_User_Wrapper');
	}, 'Entities_User_Wrapper');
});