'use strict';

var factoriesModule = require('./_index.js');


/**
 * @ngInject
 */
function User($resource, AppSettings, AuthService) {

		var BaseResource = require('./BaseResource.js');
		var factory = new BaseResource('user', $resource, AppSettings, {});
		return factory;

}

factoriesModule.factory('User', User);