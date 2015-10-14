'use strict';

var controllersModule = require('../_index');

/**
 * @ngInject
 */
function SigninCtrl($scope, RequestService, $rootScope, $state, NotificationService) {

  // ViewModel
  var vm = this;

  vm.submit = submit;

  $scope.$watch('form', function (form) {
    init(form);
  });

  function init (form) {
    vm.form = form;

    vm.user = { 
      email : null,
      password: null
    };
  }

  function submit () {

    RequestService
      .post('auth/login', vm.user)
      .then(
        function success (user) {
          
          $rootScope.$broadcast('auth:login', user);
          $state.go('home');

          var msg = "Olá " + user.name + ", bem vindo(a)!";
          NotificationService.toast('Bem vindo!', msg, 'success');

        }, 
        function error (e) {

          if (e.error == 'invalid_credentials')
            NotificationService.toast('Erro','Seu e-mail ou senha estão errados, tente novamente.','warning');

        }
      )

  }

  $scope.canSubmit = function () {
    
    return ! vm.form.$invalid;

  }

}

controllersModule.controller('SigninCtrl', SigninCtrl);