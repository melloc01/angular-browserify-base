'use strict';

var controllersModule = require('../../_index');

/**
 * @ngInject
 */

function DisciplineEditCtrl($scope, $stateParams, NotificationService, $state, Discipline, Util, University) {

  // ViewModel
  var vm = this;

  vm.submit = submit;

  init();

  function init () {
    
  	vm.entity = Discipline.get({ id: $stateParams.id });
    vm.universities = University.query();

    $scope.header = {
      title : 'Disciplinas',
      description: 'Editar disciplina',
      icon : 'book'
    };

  }

  function submit () {
    
    if (Util.formInvalid($scope.form))
      return false;

  	var promise = vm.entity.$update({id : vm.entity.id});

  	promise.then(function (data) {

  		NotificationService.notify(null, 'Docente editada com sucesso', 'success');
      $state.go('discipline.list');

    });

    promise.catch(function (data) {

      NotificationService.notify(null, 'Houve um erro ao editar a docente, tente novamente.', 'error');

  	});

  	promise.finally(function (data) {11
  		return true;
  	});


  }

  $scope.cancel = function () {
  
    $state.go('discipline.list');
  
  }

}

controllersModule.controller('DisciplineEditCtrl', DisciplineEditCtrl);