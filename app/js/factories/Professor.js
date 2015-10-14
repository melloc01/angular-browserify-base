'use strict';

var factoriesModule = require('./_index.js');


/**
 * @ngInject
 */
function Professor($resource, AppSettings, AuthService) {

		var BaseResource = require('./BaseResource.js');
		var factory = new BaseResource('professor', $resource, AppSettings, { });
		return factory;

}

factoriesModule.factory('Professor', Professor);