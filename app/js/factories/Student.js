'use strict';

var factoriesModule = require('./_index.js');


/**
 * @ngInject
 */
function Student($resource, AppSettings, AuthService) {

		var BaseResource = require('./BaseResource.js');
		var factory = new BaseResource('student', $resource, AppSettings, { });
		return factory;

}

factoriesModule.factory('Student', Student);