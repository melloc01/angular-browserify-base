'use strict';

var factoriesModule = require('./_index.js');

/**
 * @ngInject
 */
function ExampleFactory($q, $http) {

  var factory = {};

  factory.get = function() {
    var deferred = $q.defer();

    $http.get('apiPath').success(function(data) {
        deferred.resolve(data);
    }).error(function(err, status) {
        deferred.reject(err, status);
    });

    return deferred.promise;
  };

  return factory;

}

factoriesModule.factory('ExampleFactory', ExampleFactory);