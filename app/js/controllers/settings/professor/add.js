'use strict';

var controllersModule = require('../../_index');

/**
 * @ngInject
 */

function ProfessorAddCtrl($scope, Professor, NotificationService, Util, $state, University) {

  // ViewModel
  var vm = this;

  vm.submit = submit;

  init();

  function init () {
    	
  	vm.entity = new Professor();
    vm.universities = University.query();

    $scope.header = {
      title : 'Professores',
      description: 'Cadastrar Professor',
      icon : 'graduation-cap'
    };

  }

  function submit () {
      
    if (Util.formInvalid($scope.form))
      return false;

  	var promise = vm.entity.$save();

  	promise.then(function (data) {

  		NotificationService.notify(null, 'Professor cadastrado com sucesso', 'success');
      $state.go('professor.list');

  	});

  	promise.catch(function (data) {

  		NotificationService.notify(null, 'Houve um erro ao cadastrar o professor', 'error');

  	});

  	promise.finally(function (data) {
  		// always
  	});


  }

  $scope.cancel = function () {

    $state.go('professor.list');
  
  }


}

controllersModule.controller('ProfessorAddCtrl', ProfessorAddCtrl);