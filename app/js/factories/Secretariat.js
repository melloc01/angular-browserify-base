'use strict';

var factoriesModule = require('./_index.js');


/**
 * @ngInject
 */
function Secretariat($resource, AppSettings, AuthService) {

		var BaseResource = require('./BaseResource.js');
		var factory = new BaseResource('secretariat', $resource, AppSettings, { });
		return factory;

}

factoriesModule.factory('Secretariat', Secretariat);