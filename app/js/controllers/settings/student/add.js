'use strict';

var controllersModule = require('../../_index');

/**
 * @ngInject
 */

function StudentAddCtrl($scope, Student, NotificationService, Util, $state, University) {

  // ViewModel
  var vm = this;

  vm.submit = submit;

  init();

  function init () {
    	
  	vm.entity = new Student();
    vm.universities = University.query();

    $scope.header = {
      title : 'Alunos',
      description: 'Cadastrar Aluno',
      icon : 'user'
    };

  }

  function submit () {
      
    if (Util.formInvalid($scope.form))
      return false;

  	var promise = vm.entity.$save();

  	promise.then(function (data) {

  		NotificationService.notify(null, 'Aluno cadastrado com sucesso', 'success');
      $state.go('student.list');

  	});

  	promise.catch(function (data) {

  		NotificationService.notify(null, 'Houve um erro ao cadastrar o aluno', 'error');

  	});

  	promise.finally(function (data) {
  		// always
  	});


  }

  $scope.cancel = function () {

    $state.go('student.list');
  
  }


}

controllersModule.controller('StudentAddCtrl', StudentAddCtrl);