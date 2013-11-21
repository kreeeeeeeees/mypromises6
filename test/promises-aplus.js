var Promise = require('../mypromises6');

describe('Promises/A+ Tests', function () {
	require('promises-aplus-tests').mocha({
		deferred : function () {
			var promise = new Promise();
			return {
				promise : promise,
				resolve : function (value) {
					promise.resolve(value);
				},
				reject : function (reason) {
					promise.reject(reason);
				}
			};
		}
	});
});
