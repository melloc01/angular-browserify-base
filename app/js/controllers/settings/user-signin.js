'use strict';

var controllersModule = require('../_index');

/**
 * @ngInject
 */
function UserSigninCtrl($scope, RequestService, $rootScope, $state) {

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
      .post('admin/auth/login', vm.user)
      .then(
        function success (user) {

          $rootScope.$broadcast('auth:login', user);
          $state.go('admin-home');

          var msg = "Olá " + user.name + ", bem vindo(a)!";
          $scope.App.notify('success', '', msg);

        },
        function error (e) {

          if (e.error == 'invalid_credentials')
            $scope.App.notify('warning', '', 'Seu e-mail ou senha estão errados, tente novamente.');

        }
      )

  }

  $scope.canSubmit = function () {

    return ! vm.form.$invalid;

  }

}

controllersModule.controller('UserSigninCtrl', UserSigninCtrl);