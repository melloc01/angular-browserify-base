'use strict';

var controllersModule = require('../../_index');

/**
 * @ngInject
 */

function DisciplineAddCtrl($scope, Discipline, NotificationService, Util, $state, University, Professor) {

  // ViewModel
  var vm = this;

  vm.submit = submit;

  init();

  function init () {
    	
  	vm.entity = new Discipline();
    vm.universities = University.query();
    vm.professors = Professor.query();

    $scope.header = {
      title : 'Disciplinas',
      description: 'Cadastrar disciplina',
      icon : 'book'
    };

  }

  function submit () {
      
    if (Util.formInvalid($scope.form))
      return false;

  	var promise = vm.entity.$save();

  	promise.then(function (data) {

  		NotificationService.notify(null, 'Discipline cadastrado com sucesso', 'success');
      $state.go('discipline.list');

  	});

  	promise.catch(function (data) {

  		NotificationService.notify(null, 'Houve um erro ao cadastrar o discipline', 'error');

  	});

  	promise.finally(function (data) {
  		// always
  	});


  }

  $scope.cancel = function () {

    $state.go('discipline.list');
  
  }


}

controllersModule.controller('DisciplineAddCtrl', DisciplineAddCtrl);