'use strict';

var factoriesModule = require('./_index.js');


/**
 * @ngInject
 */
function Discipline($resource, AppSettings, AuthService) {

		var BaseResource = require('./BaseResource.js');
		var factory = new BaseResource('discipline', $resource, AppSettings, {});
		return factory;

}

factoriesModule.factory('Discipline', Discipline);