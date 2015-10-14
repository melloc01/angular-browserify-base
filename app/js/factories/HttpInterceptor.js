'use strict';

var factoriesModule = require('./_index.js');


/**
 * @ngInject
 */
function HttpInterceptor($rootScope, $q, AuthService) {

	var factory = {

		responseError : responseErrorInterceptor,
		request 			: requestInterceptor

	};

	function requestInterceptor (config) {
		
   config.headers = config.headers || {};
	 if (AuthService.getToken()) {
	     config.headers.Authorization = 'Bearer ' + AuthService.getToken();
	 }
	 return config;

	}

	function responseErrorInterceptor (response) {
			
		if (typeof(response.data) == 'object' && response.data.error == 'token_expired') {			
			$rootScope.$broadcast('error:token_expired');
		} 

		return $q.reject(response);

	}

	return factory;
}

factoriesModule.factory('HttpInterceptor', HttpInterceptor);