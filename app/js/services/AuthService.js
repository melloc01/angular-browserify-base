'use strict';

var servicesModule = require('./_index.js');

/**
 * @ngInject
 */
function AuthService(StorageService, $rootScope) {

  var service = {

    token: null,
    user: null,
    logout: logout,
    setUser: setUser,
    getUser: getUser,
    setToken: setToken,
    getToken: getToken,
    isUnsignedState: isUnsignedState,
    isAllowed: isAllowed,
    isLogged: isLogged

  };

  function isLogged () {
    
    return !! (this.getUser());

  }

  function getUser () {
  
    return this.user || StorageService.getItem('user');
  
  }

  function setUser (user) {

    StorageService.setItem('user',user);
    this.user = user;

    return this;
  }

  function setToken (token) {

    StorageService.setItem('token',token);
    this.token = token;

    return this;
  }

  function getToken () {

    return this.token || StorageService.getItem('token');
  
  }

  function logout () {


  
  	return StorageService.removeItem('user') && StorageService.removeItem('token');
  
  }

  function isAllowed (stateName) {
    
    return isUnsignedState(stateName) || userHasAccess(stateName);

  }

  function isUnsignedState (stateName) {
    
    return unsignedStates.indexOf(stateName) != -1;

  }

  function userHasAccess (stateName) {
    
    return service.getUser() && unallowedAccess[service.getUser().role].indexOf(stateName) == -1;

  }
  
  var unsignedStates = [ 'signin' ];

  var unallowedAccess = {

    'admin'       : [],
    
    'university' : [ 

      'university.list', 'university.edit', 'university.add'
    
    ],

    'secretariat' : [ 

      'university.list', 'university.edit', 'university.add', 
      'secretariat.list', 'secretariat.edit', 'secretariat.add'
    
    ],
    
    'professor'        : [ 
    
      'university.list', 'university.edit', 'university.add', 
      'secretariat.list', 'secretariat.edit', 'secretariat.add', 
      'professor.list', 'professor.edit', 'professor.add'
    
    ],
        
    'monitor'        : [ 
    
      'university.list', 'university.edit', 'university.add', 
      'secretariat.list', 'secretariat.edit', 'secretariat.add', 
      'professor.list', 'professor.edit', 'professor.add'
    
    ],
        
    'student'        : [ 
    
      'university.list', 'university.edit', 'university.add', 
      'secretariat.list', 'secretariat.edit', 'secretariat.add', 
      'professor.list', 'professor.edit', 'professor.add', 
      'student.list', 'student.edit', 'student.add',
      'settings'
    
    ]

 
  };


  return service;

}



servicesModule.service('AuthService', AuthService);