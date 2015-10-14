'use strict';

var factoriesModule = require('./_index.js');


/**
 * @ngInject
 */
function Monitor($resource, AppSettings, AuthService) {

		var BaseResource = require('./BaseResource.js');
		var factory = new BaseResource('monitor', $resource, AppSettings, { });
		return factory;

}

factoriesModule.factory('Monitor', Monitor);