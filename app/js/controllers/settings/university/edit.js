'use strict';

var controllersModule = require('../../_index');

/**
 * @ngInject
 */

function UniversityEditCtrl($scope, $stateParams, NotificationService, $state, University, Util) {

  // ViewModel
  var vm = this;

  vm.submit = submit;

  init();

  function init () {
    
  	vm.entity = University.get({ id: $stateParams.id });

    $scope.header = {
      title : 'Universidades',
      description: 'Editar Universidade',
      icon : 'university'
    };

  }

  function submit () {
    
    if (Util.formInvalid($scope.form))
      return false;

  	var promise = vm.entity.$update({id : vm.entity.id});

  	promise.then(function (data) {

  		NotificationService.notify(null, 'Universidade editada com sucesso', 'success');
      $state.go('university.list');

    });

    promise.catch(function (data) {

      NotificationService.notify(null, 'Houve um erro ao editar a universidade, tente novamente.', 'error');

  	});

  	promise.finally(function (data) {11
  		return true;
  	});


  }

  $scope.cancel = function () {
  
    $state.go('university.list');
  
  }

}

controllersModule.controller('UniversityEditCtrl', UniversityEditCtrl);