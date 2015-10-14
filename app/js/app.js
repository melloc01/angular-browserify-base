
'use strict';




/**
 * @ngInject
 */
function AppController($scope, AuthService, AppSettings, $state, $rootScope, RequestService, $modal, $translate, NotificationService) {

  var vm = this;

  vm.user 						= AuthService.getUser();
  vm.AppSettings 			= AppSettings;
  vm.logout 					= logout;
  vm.state 						= $state;
  vm.changeLanguage   = changeLanguage;
  vm.isAllowed   = isAllowed;
  vm.cbState 					= '';
  init();

	function logout () {

		$rootScope.$broadcast('logout');

  }


	function changeLanguage (locale) {

		$translate.use('pt_BR');

	}

  function init () {

    authWatchers();
  	routeWatchers();


	  vm.userSignedStates = [
	  	'account'
	  ];

	  vm.adminUserSignedStates = [
	  	'admin-home',
	  	'pdv'
	  ];	
	}

  function authWatchers (argument) {

 		$scope.$on('error:token_expired', function(event){

 			NotificationService.notify('Token expirado', 'Seu token perdeu a validade, por favor, refaça o login', 'warning');
      vm.logout();
 			vm.cbState = $state.current.name;

 		});

    $scope.$on('auth:login', function(event, user) {

      var token = angular.copy(user.token);
      delete user.token;

      AuthService.setUser(user);
      AuthService.setToken(token);
      
      vm.user = user;

    });

    $scope.$on('logout', function(event, user) {

      AuthService.logout();
      delete vm.user;
      $state.go('signin');

    });

  }

  function isAllowed (stateName) {
      
    return AuthService.isAllowed(stateName);

  }

  function routeWatchers () {

    //$state change watcher
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

        if (!AuthService.isAllowed(toState.name)) {

          NotificationService.toast('Acesso Proibido', 'Acesso restrito.', 'error');
          event.preventDefault();

        }

        if (vm.cbState != '') {

          var _state = vm.cbState + '';
          vm.cbState = '';
          $state.go(_state);
          event.preventDefault();

        }

        if (! AuthService.isLogged() && ! AuthService.isUnsignedState(toState.name)){
          
          $state.go('signin');
          event.preventDefault();
          
        }

     });  

  }

}

module.exports = AppController;