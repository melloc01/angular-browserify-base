'use strict';

var controllersModule = require('../_index');

/**
 * @ngInject
 */
function SignupCtrl($scope, RequestService, $rootScope, $state, StorageService) {

  // ViewModel
  var vm = this;

  vm.submit = submit;

  init();

  function init () {

    vm.cart = StorageService.getItem('cart');
    vm.user = {


    };

    RequestService
      .get('neighborhood', undefined, true)
      .then(
        function success (bairros) {  
          vm.bairros = bairros;
        },
        function error (e) {
          console.error(e);
        }
      );    
  
  }

  function submit () {
 
    RequestService
      .post('customer', vm.user)
      .then(
        function success (user) {
          
          $rootScope.$broadcast('auth:login', user);


          if (vm.cart && vm.cart.products && vm.cart.products.length) {
            $scope.App.notify('success', 'Cadastro efetuado com sucesso!', 'Bem vindo! Agora você pode continuar e concluir seu pedido.');
            $state.go('checkout');
          } else {
            $scope.App.notify('success', 'Cadastro efetuado com sucesso!', 'Bem vindo! Agora você pode fazer seus pedidos com rapidez e segurança.');
            $state.go('home');
          }

        }, 
        function error (e) {
          console.error(e);
        })

  }

}

controllersModule.controller('SignupCtrl', SignupCtrl);