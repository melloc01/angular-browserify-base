'use strict';

var controllersModule = require('../../_index');

/**
 * @ngInject
 */

function ProfessorEditCtrl($scope, $stateParams, NotificationService, $state, Professor, Util, University) {

  // ViewModel
  var vm = this;

  vm.submit = submit;

  init();

  function init () {
    
  	vm.entity = Professor.get({ id: $stateParams.id });
    vm.universities = University.query();

    $scope.header = {
      title : 'Professores',
      description: 'Editar Professor',
      icon : 'graduation-cap'
    };

  }

  function submit () {
    
    if (Util.formInvalid($scope.form))
      return false;

  	var promise = vm.entity.$update({id : vm.entity.id});

  	promise.then(function (data) {

  		NotificationService.notify(null, 'Docente editada com sucesso', 'success');
      $state.go('professor.list');

    });

    promise.catch(function (data) {

      NotificationService.notify(null, 'Houve um erro ao editar a docente, tente novamente.', 'error');

  	});

  	promise.finally(function (data) {11
  		return true;
  	});


  }

  $scope.cancel = function () {
  
    $state.go('professor.list');
  
  }

}

controllersModule.controller('ProfessorEditCtrl', ProfessorEditCtrl);