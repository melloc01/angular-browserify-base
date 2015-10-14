'use strict';

var controllersModule = require('../../_index');

/**
 * @ngInject
 */

function SecretariatAddCtrl($scope, Secretariat, NotificationService, Util, $state, University) {

  // ViewModel
  var vm = this;

  vm.submit = submit;

  init();

  function init () {
    	
  	vm.entity = new Secretariat();
    vm.universities = University.query();

    $scope.header = {
      title : 'Secretarias',
      description: 'Cadastrar Secretaria',
      icon : 'building-o'
    };

  }

  function submit () {
      
    if (Util.formInvalid($scope.form))
      return false;

  	var promise = vm.entity.$save();

  	promise.then(function (data) {

  		NotificationService.notify(null, 'Secretaria cadastrada com sucesso', 'success');
      $state.go('secretariat.list');

  	});

  	promise.catch(function (data) {

  		NotificationService.notify(null, 'Houve um erro ao cadastrar a secretaria', 'error');

  	});

  	promise.finally(function (data) {11
  		// always
  	});


  }

  $scope.cancel = function () {

    $state.go('secretariat.list');
  
  }


}

controllersModule.controller('SecretariatAddCtrl', SecretariatAddCtrl);