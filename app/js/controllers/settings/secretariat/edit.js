'use strict';

var controllersModule = require('../../_index');

/**
 * @ngInject
 */

function SecretariatEditCtrl($scope, $stateParams, NotificationService, $state, University, Util, Secretariat) {

  // ViewModel
  var vm = this;

  vm.submit = submit;

  init();

  function init () {
    
  	vm.entity = Secretariat.get({ id: $stateParams.id });
    vm.universities = University.query();

    $scope.header = {
      title : 'Secretarias',
      description: 'Editar Secretaria',
      icon : 'building-o'
    };

  }

  function submit () {
    
    if (Util.formInvalid($scope.form))
      return false;

  	var promise = vm.entity.$update({id : vm.entity.id});

  	promise.then(function (data) {

  		NotificationService.notify(null, 'Secretaria editada com sucesso', 'success');
      $state.go('secretariat.list');

    });

    promise.catch(function (data) {

      NotificationService.notify(null, 'Houve um erro ao editar a secretaria, tente novamente.', 'error');

  	});

  	promise.finally(function (data) {11
  		return true;
  	});


  }

  $scope.cancel = function () {
  
    $state.go('secretariat.list');
  
  }

}

controllersModule.controller('SecretariatEditCtrl', SecretariatEditCtrl);