'use strict';

var factoriesModule = require('./_index.js');


/**
 * @ngInject
 */
function University($resource, AppSettings, AuthService) {

		var BaseResource = require('./BaseResource.js');
		var factory = new BaseResource('university', $resource, AppSettings, {});
		return factory;

}

factoriesModule.factory('University', University);