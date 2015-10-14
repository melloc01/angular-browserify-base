'use strict';

var servicesModule = require('./_index.js');

/**
 * @ngInject
 */
function RequestService($q, $http, AppSettings, AuthService, $rootScope) {

  var service = {

    apiUrl: AppSettings.apiUrl,
    cached: {},
    getCachedRequest: getCachedRequest,
    setCachedRequest: setCachedRequest

  };

  $http.transformResponse = function  (argument) {
    
    console.warn('argument');
    console.warn(argument);

  };

  /*
   *
   *  function get
   *
   *  route   - uri to api
   *  params  - url encoded params
   *
   *
   */
  service.get = function(route, params, activeCache) {

    var deferred    = $q.defer();
    var uri         = route;
    var route       = this.apiUrl + route;
    var token       = AuthService.getUser() && AuthService.getUser().token;
    var cached      = this.getCachedRequest(route);
    var cachedRoute = route;

    var _this = this;

    if (cached && activeCache) {
    
      deferred.promise =  { 
        then : function (pass, fail) {
          pass(cached);
        }
      };

      return deferred.promise;

    } 

    if (token)
      route += '?token=' + token;

    $http.get(route).success(function(data) {

        if (activeCache)
          _this.setCachedRequest(cachedRoute, data);

        deferred.resolve(data);

    }).error(function(err, status) {

        deferred.reject(err, status);

        if (err.error && err.error == 'token_expired') {
          service.refreshToken();
        }

    });

    return deferred.promise;

  };

  /*
   *
   *  function post
   *
   *  uri   - uri to api
   *  data  - POJO data 
   *
   */
  service.post = function(uri, data) {

    var deferred = $q.defer();
    var route =  this.apiUrl + uri;

    $http.post(route, data).success(function(data) {

        deferred.resolve(data);

    }).error(function(err, status) {

        deferred.reject(err, status);
        if (err && err.error && err.error == 'token_expired') {
          service.refreshToken();
        }

    });

    return deferred.promise;

  };

  /*
   *
   *  function put
   *
   *  route  - uri to api
   *  data   - POJO data 
   *
   */
  service.put = function(route, data) {

    var deferred = $q.defer();
    var uri = route;

    //route param
    if (data.id)
      route += "/" + data.id;

    //token
    var token = AuthService.getUser() && AuthService.getUser().token;
    if (token)
      route += '?token=' + token;

    var route =  this.apiUrl + route;

    $http.put(route, data).success(function(data) {

        deferred.resolve(data);

    }).error(function(err, status) {

        deferred.reject(err, status);
        if (err.error && err.error == 'token_expired') {
          service.refreshToken();
        }

    });

    return deferred.promise;

  };

  /*
   *
   *  function del
   *
   *  route   - uri to api
   *  data  - POJO data 
   *
   */
  service.del = function(route, data) {

    var deferred = $q.defer();
    var uri = route;

    //route param
    if (data.id)
      route += "/" + data.id;

    //token
    var token = AuthService.getUser() && AuthService.getUser().token;

    if (token)
      route += '?token=' + token;

    var route =  this.apiUrl + route;

    $http.delete(route, data).success(function(data) {

        deferred.resolve(data);

    }).error(function(err, status) {

        deferred.reject(err, status);
        if (err.error && err.error == 'token_expired') {
          service.refreshToken();
        }

    });

    return deferred.promise;

  };

  service.refreshToken = function () {

    $rootScope.$broadcast('auth:token_expired');
  
  };

  //only GET
  function getCachedRequest (route) {
    
    var i = hash(route);

    if (typeof(this.cached[i]) == 'undefined')
      return null;

    return this.cached[i];

  }

  function hash (s) {
    
    var hash = 0, i, char, l;

    if (s.length == 0) return hash;
    
    for (i = 0, l = s.length; i < l; i++) {
      char = s.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash |= 0; // Convert to 32bit integer
    }
    
    return hash;
  }
  
  function setCachedRequest (route, data) {
      
    var i = hash(route);
    this.cached[i] = data;

  }

  function getIgnoredUris () {
    
    //string
    return 'sale ';

  }

  return service;

}

servicesModule.service('RequestService', RequestService);