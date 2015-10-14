'use strict';

var servicesModule = require('./_index.js');

/**
 * @ngInject
 */
function StorageService($window) {

  var service = 
  {

      setItem     : setItem,
      getItem     : getItem,
      removeItem  : removeItem

  };

  return service;

  function setItem(key, value) 
  {

      $window.localStorage.setItem(key, JSON.stringify(value));

  }

  function getItem(key) 
  {
      
      return JSON.parse($window.localStorage.getItem(key));
  
  }

  function removeItem(key) 
  {
  
      $window.localStorage.removeItem(key);
  
  }

}

servicesModule.service('StorageService', StorageService);